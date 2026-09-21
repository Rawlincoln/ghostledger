import type { CountryId, Lang } from "./types";

export type { CountryId };

export type CountryGroup = "east" | "west" | "central";

export type CountryMeta = {
  id: CountryId;
  code: string;
  name: string;
  nameSw: string;
  nameFr: string;
  group: CountryGroup;
  defaultLang: Lang;
  languages: Lang[];
  currency: string;
  currencySw: string;
  locale: string;
  localeSw: string;
  localeFr: string;
  regionEn: string;
  regionSw: string;
  regionFr: string;
  regionsEn: string;
  regionsSw: string;
  regionsFr: string;
  compiled: string;
  atiDays: number;
  atiLaw: string;
  atiLawSw: string;
  ifmis: string;
};

export const COUNTRIES: Record<CountryId, CountryMeta> = {
  ke: {
    id: "ke",
    code: "KE",
    name: "Kenya",
    nameSw: "Kenya",
    nameFr: "Kenya",
    group: "east",
    defaultLang: "en",
    languages: ["en", "sw"],
    currency: "KES",
    currencySw: "KSh",
    locale: "en-KE",
    localeSw: "sw-KE",
    localeFr: "fr-FR",
    regionEn: "County",
    regionSw: "Kaunti",
    regionFr: "Comté",
    regionsEn: "Counties",
    regionsSw: "Kaunti",
    regionsFr: "Comtés",
    compiled: "2026-09-16",
    atiDays: 21,
    atiLaw: "Access to Information Act, 2016",
    atiLawSw: "Sheria ya Upatikanaji wa Taarifa, 2016",
    ifmis: "IFMIS",
  },
  ug: {
    id: "ug",
    code: "UG",
    name: "Uganda",
    nameSw: "Uganda",
    nameFr: "Ouganda",
    group: "east",
    defaultLang: "en",
    languages: ["en", "sw"],
    currency: "UGX",
    currencySw: "USh",
    locale: "en-UG",
    localeSw: "sw-UG",
    localeFr: "fr-FR",
    regionEn: "District",
    regionSw: "Wilaya",
    regionFr: "District",
    regionsEn: "Districts",
    regionsSw: "Wilaya",
    regionsFr: "Districts",
    compiled: "2026-09-21",
    atiDays: 21,
    atiLaw: "Access to Information Act, 2005",
    atiLawSw: "Sheria ya Upatikanaji wa Taarifa, 2005",
    ifmis: "IFMS",
  },
  tz: {
    id: "tz",
    code: "TZ",
    name: "Tanzania",
    nameSw: "Tanzania",
    nameFr: "Tanzanie",
    group: "east",
    defaultLang: "sw",
    languages: ["sw", "en"],
    currency: "TZS",
    currencySw: "TSh",
    locale: "en-TZ",
    localeSw: "sw-TZ",
    localeFr: "fr-FR",
    regionEn: "Region",
    regionSw: "Mkoa",
    regionFr: "Région",
    regionsEn: "Regions",
    regionsSw: "Mikoa",
    regionsFr: "Régions",
    compiled: "2026-09-21",
    atiDays: 30,
    atiLaw: "Access to Information Act, 2016 (Tanzania)",
    atiLawSw: "Sheria ya Upatikanaji wa Taarifa, 2016 (Tanzania)",
    ifmis: "MUSE",
  },
  gh: {
    id: "gh",
    code: "GH",
    name: "Ghana",
    nameSw: "Ghana",
    nameFr: "Ghana",
    group: "west",
    defaultLang: "en",
    languages: ["en"],
    currency: "GHS",
    currencySw: "GH₵",
    locale: "en-GH",
    localeSw: "en-GH",
    localeFr: "fr-FR",
    regionEn: "Region",
    regionSw: "Mkoa",
    regionFr: "Région",
    regionsEn: "Regions",
    regionsSw: "Mikoa",
    regionsFr: "Régions",
    compiled: "2026-09-21",
    atiDays: 14,
    atiLaw: "Right to Information Act, 2019 (Act 989)",
    atiLawSw: "Right to Information Act, 2019 (Act 989)",
    ifmis: "GIFMIS",
  },
  sn: {
    id: "sn",
    code: "SN",
    name: "Senegal",
    nameSw: "Senegal",
    nameFr: "Sénégal",
    group: "west",
    defaultLang: "fr",
    languages: ["fr", "en"],
    currency: "XOF",
    currencySw: "F CFA",
    locale: "en-SN",
    localeSw: "fr-SN",
    localeFr: "fr-SN",
    regionEn: "Region",
    regionSw: "Mkoa",
    regionFr: "Région",
    regionsEn: "Regions",
    regionsSw: "Mikoa",
    regionsFr: "Régions",
    compiled: "2026-09-21",
    atiDays: 30,
    atiLaw: "Loi d'accès à l'information / Cour des comptes / OFNAC",
    atiLawSw: "Loi d'accès à l'information / Cour des comptes / OFNAC",
    ifmis: "SIGFIP",
  },
  tg: {
    id: "tg",
    code: "TG",
    name: "Togo",
    nameSw: "Togo",
    nameFr: "Togo",
    group: "west",
    defaultLang: "fr",
    languages: ["fr", "en"],
    currency: "XOF",
    currencySw: "F CFA",
    locale: "en-TG",
    localeSw: "fr-TG",
    localeFr: "fr-TG",
    regionEn: "Region",
    regionSw: "Mkoa",
    regionFr: "Région",
    regionsEn: "Regions",
    regionsSw: "Mikoa",
    regionsFr: "Régions",
    compiled: "2026-09-21",
    atiDays: 30,
    atiLaw: "Cour des comptes / HAPLUCIA",
    atiLawSw: "Cour des comptes / HAPLUCIA",
    ifmis: "SIGFIP",
  },
  zm: {
    id: "zm",
    code: "ZM",
    name: "Zambia",
    nameSw: "Zambia",
    nameFr: "Zambie",
    group: "central",
    defaultLang: "en",
    languages: ["en"],
    currency: "ZMW",
    currencySw: "K",
    locale: "en-ZM",
    localeSw: "en-ZM",
    localeFr: "fr-FR",
    regionEn: "Province",
    regionSw: "Mkoa",
    regionFr: "Province",
    regionsEn: "Provinces",
    regionsSw: "Mikoa",
    regionsFr: "Provinces",
    compiled: "2026-09-21",
    atiDays: 30,
    atiLaw: "Access to Information Act, 2013",
    atiLawSw: "Access to Information Act, 2013",
    ifmis: "IFMIS",
  },
  mw: {
    id: "mw",
    code: "MW",
    name: "Malawi",
    nameSw: "Malawi",
    nameFr: "Malawi",
    group: "central",
    defaultLang: "en",
    languages: ["en"],
    currency: "MWK",
    currencySw: "MK",
    locale: "en-MW",
    localeSw: "en-MW",
    localeFr: "fr-FR",
    regionEn: "District",
    regionSw: "Wilaya",
    regionFr: "District",
    regionsEn: "Districts",
    regionsSw: "Wilaya",
    regionsFr: "Districts",
    compiled: "2026-09-21",
    atiDays: 30,
    atiLaw: "Access to Information Act, 2017",
    atiLawSw: "Access to Information Act, 2017",
    ifmis: "IFMIS",
  },
};

export const COUNTRY_GROUPS: { id: CountryGroup; en: string; sw: string; fr: string; countries: CountryId[] }[] = [
  {
    id: "east",
    en: "East Africa",
    sw: "Afrika Mashariki",
    fr: "Afrique de l'Est",
    countries: ["ke", "ug", "tz"],
  },
  {
    id: "west",
    en: "West Africa",
    sw: "Afrika Magharibi",
    fr: "Afrique de l'Ouest",
    countries: ["gh", "sn", "tg"],
  },
  {
    id: "central",
    en: "Central Africa",
    sw: "Afrika ya Kati",
    fr: "Afrique centrale",
    countries: ["zm", "mw"],
  },
];

export const COUNTRY_LIST: CountryMeta[] = COUNTRY_GROUPS.flatMap((g) =>
  g.countries.map((id) => COUNTRIES[id]),
);

/** Default map view before project bounds load. */
export const MAP_VIEW: Record<CountryId, { center: [number, number]; zoom: number }> = {
  ke: { center: [-0.23, 37.86], zoom: 6 },
  ug: { center: [1.37, 32.29], zoom: 7 },
  tz: { center: [-6.37, 34.89], zoom: 6 },
  gh: { center: [7.95, -1.02], zoom: 7 },
  sn: { center: [14.5, -14.45], zoom: 7 },
  tg: { center: [8.62, 0.82], zoom: 7 },
  zm: { center: [-13.13, 27.85], zoom: 6 },
  mw: { center: [-13.25, 34.3], zoom: 7 },
};

const IDS = new Set<string>(Object.keys(COUNTRIES));

export function isCountryId(value: unknown): value is CountryId {
  return typeof value === "string" && IDS.has(value);
}

export function asCountry(value: unknown): CountryId {
  return isCountryId(value) ? value : "ke";
}

export function countryName(id: CountryId, lang: Lang): string {
  const meta = COUNTRIES[id];
  if (lang === "fr") return meta.nameFr;
  if (lang === "sw") return meta.nameSw;
  return meta.name;
}

export function groupLabel(id: CountryGroup, lang: Lang): string {
  const g = COUNTRY_GROUPS.find((row) => row.id === id);
  if (!g) return id;
  if (lang === "fr") return g.fr;
  if (lang === "sw") return g.sw;
  return g.en;
}

export function regionWord(id: CountryId, lang: Lang, plural = false): string {
  const meta = COUNTRIES[id];
  if (lang === "fr") return plural ? meta.regionsFr : meta.regionFr;
  if (lang === "sw") return plural ? meta.regionsSw : meta.regionSw;
  return plural ? meta.regionsEn : meta.regionEn;
}

export function langLabel(lang: Lang): string {
  if (lang === "sw") return "Kiswahili";
  if (lang === "fr") return "Français";
  return "English";
}

export function nextLang(country: CountryId, lang: Lang): Lang {
  const list = COUNTRIES[country].languages;
  const i = list.indexOf(lang);
  return list[(i + 1) % list.length] ?? list[0] ?? "en";
}

export function loc(lang: Lang, en: string, alt: string): string {
  return lang === "en" ? en : alt;
}

export function emptyClockMap<T>(make: () => T): Record<CountryId, T> {
  return {
    ke: make(),
    tz: make(),
    ug: make(),
    gh: make(),
    sn: make(),
    tg: make(),
    zm: make(),
    mw: make(),
  };
}

export function demoBanner(country: CountryId): string {
  const meta = COUNTRIES[country];
  const auditor =
    country === "tz"
      ? "Controller and Auditor General (NAOT) and PAC"
      : country === "ug"
        ? "Office of the Auditor General and IGG"
        : country === "gh"
          ? "Ghana Audit Service and CHRAJ"
          : country === "sn"
            ? "Cour des comptes and OFNAC"
            : country === "tg"
              ? "Cour des comptes and HAPLUCIA"
              : country === "zm"
                ? "Auditor-General and ACC"
                : country === "mw"
                  ? "National Audit Office and ACB"
                  : "Auditor-General and Controller of Budget";
  return `These records are a working proof of concept. Amounts, bounties, and site notes are illustrative composites patterned on published ${auditor} problems. They are not live ${meta.ifmis} extracts. Offices are named, not people. Contractor names are labelled as demo names.`;
}
