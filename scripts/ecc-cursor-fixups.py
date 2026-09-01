#!/usr/bin/env python3
"""Re-apply this repo's fixups to the checked-in ECC Cursor adapter.

`install.sh --target cursor` produces a tree that Cursor only partly reads, so
the install in .cursor/ carries five adjustments on top of upstream. Re-running
the installer overwrites them; run this afterwards to restore them.

Every step is idempotent and reports what it did. Steps that no longer match
upstream's shape are reported as SKIP with a non-zero exit rather than being
guessed at, since that means upstream changed and the fixup needs review.

Usage:
    python3 scripts/ecc-cursor-fixups.py [--check]

--check reports what would change without writing.
"""

import argparse
import collections
import json
import pathlib
import re
import shutil
import sys

CURSOR_DIR = pathlib.Path(".cursor")
ADAPTER = CURSOR_DIR / "hooks" / "adapter.js"
HOOKS_JSON = CURSOR_DIR / "hooks.json"
RULES_DIR = CURSOR_DIR / "rules"
CODE_REVIEW_RULE = RULES_DIR / "common-code-review.mdc"
FOREIGN_PAYLOADS = (CURSOR_DIR / ".agents", CURSOR_DIR / ".pi")

UPSTREAM_PLUGIN_ROOT = """function getPluginRoot() {
  return path.resolve(__dirname, '..', '..');
}"""

PATCHED_PLUGIN_ROOT = """// The shared hook runtime sits at <root>/scripts/hooks. That root is the repo
// root when these hooks run inside the ECC checkout, but `--target cursor`
// installs the runtime under .cursor/, so probe both layouts.
function getPluginRoot() {
  const cursorDir = path.resolve(__dirname, '..');
  const projectRoot = path.resolve(cursorDir, '..');

  for (const candidate of [cursorDir, projectRoot]) {
    if (fs.existsSync(path.join(candidate, 'scripts', 'hooks'))) {
      return candidate;
    }
  }

  return projectRoot;
}"""

UPSTREAM_ADAPTER_REQUIRES = """const { execFileSync } = require('child_process');
const path = require('path');"""

PATCHED_ADAPTER_REQUIRES = """const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');"""

SESSION_ENV_HOOK = collections.OrderedDict([
    ("command", "node .cursor/scripts/hooks/cursor-session-env.js"),
    ("event", "sessionStart"),
    ("description", "Pin ECC_AGENT_DATA_HOME for the session so memory stays out of ~/.claude"),
])

CODE_REVIEW_FRONTMATTER = """---
description: "Code review standards: review triggers, checklist, security triggers, severity levels"
alwaysApply: false
---
"""

RULE_PATHS_PREFIX = "---\npaths:\n"
RULE_LIST_ITEM = re.compile(r'^  - "(?P<pattern>[^"]+)"$')


class Reporter:
    """Collects per-step outcomes and tracks whether anything needs review."""

    def __init__(self, check_only):
        self.check_only = check_only
        self.needs_review = False
        self.changed = False

    def ok(self, message):
        print(f"OK    {message}")

    def fixed(self, message):
        verb = "WOULD" if self.check_only else "FIXED"
        print(f"{verb:5} {message}")
        self.changed = True

    def skip(self, message):
        print(f"SKIP  {message}")
        self.needs_review = True


def patch_hook_adapter(report):
    """Make the hook adapter find the runtime that --target cursor installs."""
    if not ADAPTER.exists():
        report.skip(f"{ADAPTER} is missing")
        return

    text = ADAPTER.read_text()
    if PATCHED_PLUGIN_ROOT in text:
        report.ok(f"{ADAPTER} already resolves the installed hook runtime")
        return
    if UPSTREAM_PLUGIN_ROOT not in text or UPSTREAM_ADAPTER_REQUIRES not in text:
        report.skip(f"{ADAPTER} no longer matches the upstream shape this fixup patches")
        return

    report.fixed(f"{ADAPTER}: resolve the hook runtime under .cursor/ before the project root")
    if report.check_only:
        return

    text = text.replace(UPSTREAM_ADAPTER_REQUIRES, PATCHED_ADAPTER_REQUIRES, 1)
    text = text.replace(UPSTREAM_PLUGIN_ROOT, PATCHED_PLUGIN_ROOT, 1)
    ADAPTER.write_text(text)


def add_session_env_hook(report):
    """Pin ECC_AGENT_DATA_HOME before the memory hooks run."""
    if not HOOKS_JSON.exists():
        report.skip(f"{HOOKS_JSON} is missing")
        return

    data = json.loads(HOOKS_JSON.read_text(), object_pairs_hook=collections.OrderedDict)
    session_start = data.get("hooks", {}).get("sessionStart")
    if session_start is None:
        report.skip(f"{HOOKS_JSON} has no sessionStart hooks to extend")
        return
    if any(entry.get("command") == SESSION_ENV_HOOK["command"] for entry in session_start):
        report.ok(f"{HOOKS_JSON} already pins ECC_AGENT_DATA_HOME on sessionStart")
        return

    report.fixed(f"{HOOKS_JSON}: run cursor-session-env.js first on sessionStart")
    if report.check_only:
        return

    session_start.insert(0, SESSION_ENV_HOOK)
    HOOKS_JSON.write_text(json.dumps(data, indent=2) + "\n")


def convert_rule_scope(report):
    """Rewrite `paths:` rule scope into the `globs:` key Cursor reads."""
    pending = sorted(p for p in RULES_DIR.glob("*.mdc") if p.read_text().startswith(RULE_PATHS_PREFIX))
    if not pending:
        report.ok(f"{RULES_DIR}: no rules left using the paths: key")
        return

    report.fixed(f"{RULES_DIR}: convert {len(pending)} rule(s) from paths: to globs:")
    if report.check_only:
        return

    for path in pending:
        text = path.read_text()
        end = text.index("\n---\n", 3)
        frontmatter = text[4:end].splitlines()
        body = text[end + len("\n---\n"):]

        patterns = []
        for line in frontmatter[1:]:
            item = RULE_LIST_ITEM.match(line)
            if not item:
                report.skip(f"{path}: unrecognised frontmatter line {line!r}")
                return
            patterns.append(item.group("pattern"))

        if not patterns:
            report.skip(f"{path}: paths: has no entries")
            return

        globs = ", ".join(f'"{pattern}"' for pattern in patterns)
        path.write_text(f"---\nglobs: [{globs}]\nalwaysApply: false\n---\n{body}")


def add_code_review_frontmatter(report):
    """Register the bare common-code-review rule as agent-requested."""
    if not CODE_REVIEW_RULE.exists():
        report.skip(f"{CODE_REVIEW_RULE} is missing")
        return

    text = CODE_REVIEW_RULE.read_text()
    if text.startswith("---\n"):
        report.ok(f"{CODE_REVIEW_RULE} already has frontmatter")
        return

    report.fixed(f"{CODE_REVIEW_RULE}: add agent-requested frontmatter")
    if not report.check_only:
        CODE_REVIEW_RULE.write_text(CODE_REVIEW_FRONTMATTER + text)


def prune_foreign_payloads(report):
    """Remove the Antigravity and Pi trees that the Cursor target copies in."""
    present = [path for path in FOREIGN_PAYLOADS if path.exists()]
    if not present:
        report.ok("no Antigravity or Pi payloads under .cursor/")
        return

    for path in present:
        report.fixed(f"{path}: remove payload that Cursor does not read")
        if not report.check_only:
            shutil.rmtree(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--check", action="store_true", help="report needed changes without writing")
    args = parser.parse_args()

    if not CURSOR_DIR.is_dir():
        print(f"error: {CURSOR_DIR} not found; run this from the repository root", file=sys.stderr)
        return 2

    report = Reporter(args.check)
    patch_hook_adapter(report)
    add_session_env_hook(report)
    convert_rule_scope(report)
    add_code_review_frontmatter(report)
    prune_foreign_payloads(report)

    if report.needs_review:
        print("\nsome fixups did not apply; review them against the installed ECC version")
        return 1
    if args.check and report.changed:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
