import type { CountryId } from "./country";
import {
  ADMINISTRATIONS,
  COMPILED,
  COURT_EVENTS,
  GHOST_LEARNER_FROM,
  GHOST_LEARNER_PER_YEAR,
  METHOD_LINKS,
  MONEY,
  NAMED,
  SECONDS_PER_YEAR,
  type Administration,
  type CourtEvent,
  type MoneyItem,
  type NamedPerson,
  type OfficeRow,
  type RecordSource,
  documentedStockKes,
  ghostLearnerKes,
  matterScandalId as keMatterId,
  missingFundItems as keMissing,
  officeLeaderboard as keOffices,
  peopleOnScandal as kePeople,
  scandalItems as keScandals,
} from "./record";
import {
  PILOT_COMPILED,
  PILOT_RECORD,
} from "./record-pilot";
import {
  TZ_ADMIN,
  TZ_COMPILED,
  TZ_COURT,
  TZ_METHOD,
  TZ_MONEY,
  TZ_NAMED,
} from "./record-tz";
import { COUNTIES, PROJECTS } from "./seed";
import { PILOT_PROJECTS, PILOT_REGIONS } from "./seed-pilot";
import { TZ_PROJECTS, TZ_REGIONS } from "./seed-tz";
import type { Project } from "./types";
import { recoveredItems, recoveredStock } from "./recovered";

export { recoveredItems, recoveredStock };

export function allProjects(): Project[] {
  return [...PROJECTS, ...TZ_PROJECTS, ...PILOT_PROJECTS];
}

export function projectsFor(country: CountryId): Project[] {
  return allProjects().filter((p) => (p.country ?? "ke") === country);
}

export function regionsFor(country: CountryId): string[] {
  if (country === "ke") return COUNTIES;
  if (country === "tz") return TZ_REGIONS;
  return PILOT_REGIONS[country];
}

export function moneyItems(country: CountryId): MoneyItem[] {
  if (country === "ke") return MONEY;
  if (country === "tz") return TZ_MONEY;
  return PILOT_RECORD[country].money;
}

export function namedPeople(country: CountryId): NamedPerson[] {
  if (country === "ke") return NAMED;
  if (country === "tz") return TZ_NAMED;
  return PILOT_RECORD[country].named;
}

function uniqueSources(items: MoneyItem[]): RecordSource[] {
  const seen = new Set<string>();
  const out: RecordSource[] = [];
  for (const item of items) {
    for (const src of item.sources) {
      if (seen.has(src.url)) continue;
      seen.add(src.url);
      out.push(src);
    }
  }
  return out;
}

export function methodLinks(country: CountryId): RecordSource[] {
  if (country === "ke") return METHOD_LINKS;
  if (country === "tz") return TZ_METHOD;
  return uniqueSources(PILOT_RECORD[country].money);
}

export function courtEvents(country: CountryId): CourtEvent[] {
  if (country === "ke") return COURT_EVENTS;
  if (country === "tz") return TZ_COURT;
  return [];
}

export function administrations(country: CountryId): Administration[] {
  if (country === "ke") return ADMINISTRATIONS;
  if (country === "tz") return TZ_ADMIN;
  return [];
}

export function compiledOn(country: CountryId): string {
  if (country === "ke") return COMPILED;
  if (country === "tz") return TZ_COMPILED;
  return PILOT_COMPILED;
}

export function documentedStock(country: CountryId): number {
  return moneyItems(country)
    .filter((item) => item.inClock)
    .reduce((n, item) => n + item.amountKes, 0);
}

export function tickAmount(country: CountryId, nowMs: number): number {
  if (country !== "ke") return 0;
  return ghostLearnerKes(nowMs);
}

export function perSecond(country: CountryId): number {
  if (country !== "ke") return 0;
  return GHOST_LEARNER_PER_YEAR / SECONDS_PER_YEAR;
}

export function clockValueFor(
  country: CountryId,
  nowMs: number,
  citizenConfirmed: number,
): number {
  return documentedStock(country) + tickAmount(country, nowMs) + citizenConfirmed;
}

export function officeBoard(country: CountryId): OfficeRow[] {
  if (country === "ke") return keOffices();
  const map = new Map<string, OfficeRow>();
  for (const item of moneyItems(country).filter((m) => m.inClock)) {
    const row = map.get(item.office);
    if (row) row.value += item.amountKes;
    else {
      map.set(item.office, {
        key: item.office,
        office: item.office,
        officeSw: item.officeSw,
        value: item.amountKes,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.value - a.value);
}

export function inClock(country: CountryId): MoneyItem[] {
  return moneyItems(country)
    .filter((m) => m.inClock)
    .sort((a, b) => b.amountKes - a.amountKes);
}

export function outOfClock(country: CountryId): MoneyItem[] {
  return moneyItems(country)
    .filter((m) => !m.inClock)
    .sort((a, b) => b.amountKes - a.amountKes);
}

export function scandalList(country: CountryId): MoneyItem[] {
  if (country === "ke") return keScandals();
  return moneyItems(country)
    .filter((m) => m.kind === "scandal_paid")
    .sort((a, b) => b.amountKes - a.amountKes);
}

export function missingList(country: CountryId): MoneyItem[] {
  if (country === "ke") return keMissing();
  return moneyItems(country)
    .filter((m) => m.kind === "audit_query" || m.kind === "unaccounted" || m.kind === "disputed")
    .sort((a, b) => b.amountKes - a.amountKes);
}

export function matterId(matter: string, country: CountryId): string {
  if (country === "ke") return keMatterId(matter);
  if (country === "tz") {
    const m = matter.toLowerCase();
    if (m.includes("escrow") || m.includes("iptl") || m.includes("tegeta")) return "escrow-tegeta";
    if (m.includes("richmond") || m.includes("dowans")) return "richmond";
    if (m.includes("epa")) return "epa-bot";
    return "";
  }
  return PILOT_RECORD[country].matterId(matter);
}

export function peopleOn(country: CountryId, id: string): NamedPerson[] {
  if (country === "ke") return kePeople(id);
  return namedPeople(country).filter((p) => {
    const key = matterId(p.matter, country);
    if (country === "tz" && id === "iptl-overcharge") return key === "escrow-tegeta";
    return key === id;
  });
}

export function clockCallout(country: CountryId): MoneyItem | undefined {
  const excluded = outOfClock(country);
  return (
    excluded.find((m) => m.kind === "dismissed") ??
    excluded.find((m) => m.id === "richmond")
  );
}

export function inCountry<T extends { country?: CountryId | string | null }>(
  rows: T[],
  country: CountryId,
): T[] {
  return rows.filter((row) => (row.country ?? "ke") === country);
}

/** Kenya clock helpers kept for any leftover imports. */
export { documentedStockKes, GHOST_LEARNER_FROM };
