export type ProfessionCategory =
  | "welding"
  | "electrical"
  | "construction"
  | "quality"
  | "engineering"
  | "support";

export type Profession = {
  slug: string;
  title: string;
  category: ProfessionCategory;
  /** Короткое описание для витрины заказчика */
  summary: string;
  /** Разряды, допуски, аттестации */
  qualifications: string[];
  /** Типовой срок подбора и вывода на объект */
  mobilization: string;
};

export const professionCategories: Record<
  ProfessionCategory,
  { title: string; description: string }
> = {
  welding: {
    title: "Сварочно-монтажный персонал",
    description: "Трубопроводы, металлоконструкции, резервуары, технологическая обвязка.",
  },
  electrical: {
    title: "Электромонтаж и КИПиА",
    description: "Силовые сети, вторичная коммутация, автоматика и телемеханика.",
  },
  construction: {
    title: "Строительные специальности",
    description: "Земляные работы, фундаменты, бетон, отделка, благоустройство.",
  },
  quality: {
    title: "Контроль качества",
    description: "Неразрушающий контроль, входной контроль, исполнительная документация.",
  },
  engineering: {
    title: "ИТР и линейный менеджмент",
    description: "Организация работ, ПТО, охрана труда, геодезия, снабжение.",
  },
  support: {
    title: "Вспомогательный персонал",
    description: "Обеспечение работ, склад, бытовые городки, транспорт.",
  },
};

export const professions: Profession[] = [
  {
    slug: "svarshchik-naks",
    title: "Сварщик НАКС",
    category: "welding",
    summary:
      "Ручная дуговая, аргонодуговая и полуавтоматическая сварка технологических трубопроводов и металлоконструкций.",
    qualifications: [
      "Аттестация НАКС I–II уровня",
      "Способы РД, РАД, МП, АПГ",
      "Разряд 4–6",
      "Опыт работы по ГОСТ 16037, СП 86.13330",
    ],
    mobilization: "от 5 дней",
  },
  {
    slug: "montazhnik-truboprovodov",
    title: "Монтажник технологических трубопроводов",
    category: "welding",
    summary: "Сборка, центровка и монтаж трубопроводов и обвязки под сварку.",
    qualifications: ["Разряд 4–6", "Работа на высоте 2–3 группа", "Стропальные работы"],
    mobilization: "от 5 дней",
  },
  {
    slug: "montazhnik-metallokonstrukciy",
    title: "Монтажник металлоконструкций",
    category: "welding",
    summary: "Монтаж каркасов, эстакад, площадок обслуживания, укрупнительная сборка.",
    qualifications: ["Разряд 3–6", "Удостоверение по работе на высоте", "Опыт монтажа с крана"],
    mobilization: "от 7 дней",
  },
  {
    slug: "izolirovshchik",
    title: "Изолировщик",
    category: "welding",
    summary: "Тепловая и антикоррозионная изоляция трубопроводов и оборудования.",
    qualifications: ["Разряд 3–5", "Работа на высоте", "Опыт с ППУ и минватой"],
    mobilization: "от 7 дней",
  },
  {
    slug: "elektromontazhnik",
    title: "Электромонтажник",
    category: "electrical",
    summary: "Монтаж кабельных трасс, щитового оборудования, освещения и заземления.",
    qualifications: ["Разряд 4–6", "Группа по электробезопасности III–V", "Работа на высоте"],
    mobilization: "от 5 дней",
  },
  {
    slug: "slesar-kipia",
    title: "Слесарь КИПиА",
    category: "electrical",
    summary: "Монтаж и наладка приборов контроля, датчиков, шкафов автоматики.",
    qualifications: ["Разряд 4–6", "Группа по электробезопасности III–IV", "Опыт пусконаладки"],
    mobilization: "от 7 дней",
  },
  {
    slug: "betonshchik-armaturshchik",
    title: "Бетонщик-арматурщик",
    category: "construction",
    summary: "Опалубка, армирование, укладка и уход за бетоном на фундаментах и площадках.",
    qualifications: ["Разряд 3–5", "Опыт монолитных работ", "Стропальные работы"],
    mobilization: "от 5 дней",
  },
  {
    slug: "mashinist-spectehniki",
    title: "Машинист спецтехники",
    category: "construction",
    summary: "Экскаваторы, бульдозеры, автокраны, погрузчики, трубоукладчики.",
    qualifications: ["Удостоверение тракториста-машиниста", "Опыт на Севере", "Категории по технике"],
    mobilization: "от 10 дней",
  },
  {
    slug: "defektoskopist",
    title: "Дефектоскопист",
    category: "quality",
    summary: "Неразрушающий контроль сварных соединений: ВИК, УЗК, РК, ПВК.",
    qualifications: ["Аттестация НОАП/СДАНК II уровня", "Опыт оформления заключений"],
    mobilization: "от 10 дней",
  },
  {
    slug: "inzhener-pto",
    title: "Инженер ПТО",
    category: "engineering",
    summary: "Исполнительная документация, объёмы, КС-2/КС-3, взаимодействие с заказчиком.",
    qualifications: ["Высшее профильное образование", "AutoCAD, Гранд-Смета", "Опыт от 3 лет"],
    mobilization: "от 10 дней",
  },
  {
    slug: "master-smr",
    title: "Мастер / прораб СМР",
    category: "engineering",
    summary: "Организация работ бригад, выдача нарядов-допусков, контроль сроков и качества.",
    qualifications: ["Опыт от 3 лет на промышленных объектах", "Обучение по ОТ, ПБ, ГО и ЧС"],
    mobilization: "от 10 дней",
  },
  {
    slug: "specialist-ot",
    title: "Специалист по охране труда",
    category: "engineering",
    summary: "Инструктажи, наряд-допуски, контроль СИЗ, взаимодействие со службой ПБ заказчика.",
    qualifications: ["Обучение по ОТ (программы А, Б, В)", "Опыт на опасных производственных объектах"],
    mobilization: "от 14 дней",
  },
  {
    slug: "stropalshchik",
    title: "Стропальщик",
    category: "support",
    summary: "Строповка и перемещение грузов, обслуживание грузоподъёмных механизмов.",
    qualifications: ["Удостоверение стропальщика", "Разряд 3–5"],
    mobilization: "от 3 дней",
  },
  {
    slug: "raznorabochiy",
    title: "Разнорабочий",
    category: "support",
    summary: "Подсобные работы, погрузка-разгрузка, уборка территории, помощь бригадам.",
    qualifications: ["Без опыта", "Медкомиссия", "Вводный инструктаж на объекте"],
    mobilization: "от 3 дней",
  },
];

export function getProfession(slug: string): Profession | undefined {
  return professions.find((profession) => profession.slug === slug);
}

export const professionsByCategory = (
  Object.keys(professionCategories) as ProfessionCategory[]
).map((category) => ({
  category,
  ...professionCategories[category],
  items: professions.filter((profession) => profession.category === category),
}));
