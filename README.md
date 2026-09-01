# bookingbot

## Cursor agent configuration (ECC)

This repo checks in the Cursor adapter from [Everything Claude Code](https://github.com/affaan-m/ECC)
(ECC) v2.2.1, installed from commit `ca185ef` with:

```bash
git clone --depth 1 https://github.com/affaan-m/ECC.git
cd ECC && ./install.sh --target cursor --profile core --enable-hooks   # run from the repo root
```

Everything lives under `.cursor/`, so opening the repo in Cursor is all it takes:
122 rules, 68 agents, 94 commands, 58 skills, and 15 hook events backed by ECC's
shared Node hook runtime in `.cursor/scripts/`. The hook runtime needs Node 18+
on `PATH` and no npm dependencies.

Only install ECC from its [official channels](https://github.com/affaan-m/ECC#readme).
Third-party mirrors are unreviewed.

### What the install does at runtime

- **Rules.** 10 always-applied rules (coding style, security, testing, git
  workflow, agent orchestration) plus 111 auto-attached rules scoped by glob to
  the language or framework they cover, so language guidance only loads for
  matching files. Code review standards are agent-requested rather than
  always-applied, to keep them out of every request.
- **Hooks.** `.cursor/hooks.json` wires all 15 Cursor hook events. Ten act inline
  (secret detection in prompts, blocking reads of `.env`/`.key`/`.pem`, blocking
  `--no-verify`, MCP audit logging); the rest delegate to the shared runtime for
  session summaries, learned-skill capture, cost tracking, auto-format and the
  `console.log` audit. Gate them at runtime with `ECC_HOOK_PROFILE`
  (`minimal`/`standard`/`strict`) and `ECC_DISABLED_HOOKS`.
- **Memory.** Session summaries, learned skills and metrics go to `~/.cursor/ecc`,
  not `~/.claude`, so ECC in Cursor and ECC in Claude Code do not overwrite each
  other. `.cursor/ecc-agent-data.json` overrides the location; it only accepts
  paths under `~/.cursor/ecc` or `~/.claude`.
- **MCP.** `.cursor/mcp.json` declares one server, `chrome-devtools`, which Cursor
  runs via `npx` once enabled. `.cursor/mcp-configs/mcp-servers.json` is a
  reference catalog of 35 more; nothing there is active until you copy it across.

### Local adjustments

`.cursor/` is not a verbatim copy of the installer output. Five adjustments make
the install work as documented under Cursor; see the commits on this branch for
the reasoning behind each.

| Adjustment | Why |
|---|---|
| `.cursor/hooks/adapter.js` resolves the hook runtime under `.cursor/` | Upstream looks for it at the project root, so six delegating hooks silently did nothing |
| `cursor-session-env.js` runs first on `sessionStart` | Pins the memory root; the installer only emits this on its legacy language-based path |
| 81 language rules use `globs:` instead of `paths:` | Cursor does not read `paths:`, so those rules never auto-attached |
| `common-code-review.mdc` gained frontmatter | It shipped bare and was therefore unloadable |
| `.cursor/.agents/` and `.cursor/.pi/` removed | Antigravity and Pi payloads, ~936 KB that Cursor never reads |

These edit installer-owned files, so reinstalling reverts them. To update ECC:

```bash
./install.sh --target cursor --profile core --enable-hooks   # from the ECC checkout
python3 scripts/ecc-cursor-fixups.py                        # from this repo root
git diff
```

The script is idempotent, and `--check` reports pending work without writing.
A step that no longer matches upstream's shape reports `SKIP` and exits non-zero
instead of guessing, which is the signal to review that fixup against the new
ECC version.

`.cursor/ecc-install-state.json` is gitignored: it records the absolute paths of
the machine that ran the installer, and its content hashes describe the
unadjusted tree.
