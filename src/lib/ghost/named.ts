import { createServerFn } from "@tanstack/react-start";
import { embeddedDbOff, getSql } from "@/lib/db";
import { missingList, namedPeople, scandalList } from "./catalog";
import { asCountry, type CountryId } from "./country";
import { memoryReportHits } from "./queries";
import type { NamedPerson } from "./record";
import type { NamedBoardRow, NamedProjectHit, NamedSort } from "./named-types";

export function personKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function yearOf(iso: string): string {
  const y = iso.slice(0, 4);
  return /^\d{4}$/.test(y) ? y : iso.slice(0, 10);
}

type ReportHit = {
  responsible_name: string;
  responsible_role: string | null;
  project_slug: string;
  created_at: string;
  disbursed_kes: number;
  name: string;
  name_sw: string;
  county: string;
  country: string;
};

function mergeBoard(
  hits: ReportHit[],
  sort: NamedSort,
  people: NamedPerson[],
): NamedBoardRow[] {
  const map = new Map<string, NamedBoardRow>();

  for (const person of people) {
    const key = personKey(person.name);
    map.set(key, {
      key,
      name: person.name,
      role: person.role,
      roleSw: person.roleSw,
      status: person.status,
      matter: person.matter,
      matterSw: person.matterSw,
      amountKes: person.amountKes,
      publicKes: person.amountKes,
      reportKes: 0,
      reports: 0,
      since: person.since,
      sources: person.sources,
      projects: [],
      isPublic: true,
    });
  }

  for (const hit of hits) {
    const name = hit.responsible_name.trim();
    if (name.length < 2) continue;
    const key = personKey(name);
    const project: NamedProjectHit = {
      slug: hit.project_slug,
      name: hit.name,
      nameSw: hit.name_sw,
      county: hit.county,
      kes: Number(hit.disbursed_kes),
    };
    const existing = map.get(key);
    if (existing) {
      existing.reports += 1;
      if (!existing.projects.some((p) => p.slug === project.slug)) {
        existing.projects.push(project);
        existing.reportKes += project.kes;
      }
      const reportYear = yearOf(hit.created_at);
      if (!existing.isPublic && reportYear < existing.since) existing.since = reportYear;
      if (!existing.role && hit.responsible_role) {
        existing.role = hit.responsible_role;
        existing.roleSw = hit.responsible_role;
      }
    } else {
      const role = hit.responsible_role?.trim() || "Indicated as responsible";
      map.set(key, {
        key,
        name,
        role,
        roleSw: role,
        status: "citizen_indicated",
        matter: project.name,
        matterSw: project.nameSw,
        amountKes: project.kes,
        publicKes: 0,
        reportKes: project.kes,
        reports: 1,
        since: yearOf(hit.created_at),
        sources: [],
        projects: [project],
        isPublic: false,
      });
    }
  }

  for (const row of map.values()) {
    if (row.isPublic) row.amountKes = row.publicKes;
    else row.amountKes = row.reportKes;
    if (!row.isPublic && row.projects.length > 1) {
      row.matter = row.projects.map((p) => p.name).join("; ");
      row.matterSw = row.projects.map((p) => p.nameSw).join("; ");
    }
  }

  const rows = [...map.values()];
  if (sort === "earliest") {
    rows.sort((a, b) => a.since.localeCompare(b.since) || b.amountKes - a.amountKes);
  } else if (sort === "reports") {
    rows.sort((a, b) => b.reports - a.reports || b.amountKes - a.amountKes);
  } else {
    rows.sort((a, b) => b.amountKes - a.amountKes || a.name.localeCompare(b.name));
  }
  return rows;
}

async function loadHits(): Promise<ReportHit[]> {
  if (embeddedDbOff) return memoryReportHits();
  const sql = await getSql();
  try {
    return await sql<ReportHit>`
      select r.responsible_name, r.responsible_role, r.project_slug,
        r.created_at::text as created_at, p.disbursed_kes, p.name, p.name_sw, p.county,
        coalesce(p.country, 'ke') as country
      from gl_reports r
      join gl_projects p on p.slug = r.project_slug
      where r.responsible_name is not null and trim(r.responsible_name) <> ''
    `;
  } catch {
    return [];
  }
}

function hitsFor(hits: ReportHit[], country: CountryId): ReportHit[] {
  return hits.filter((h) => asCountry(h.country) === country);
}

export const listNamedBoard = createServerFn({ method: "GET" })
  .validator((input: { sort?: NamedSort; country?: CountryId } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<NamedBoardRow[]> => {
    const sort: NamedSort =
      data.sort === "earliest" || data.sort === "reports" ? data.sort : "amount";
    const country = asCountry(data.country);
    const hits = hitsFor(await loadHits(), country);
    return mergeBoard(hits, sort, namedPeople(country));
  });

export const namedStats = createServerFn({ method: "GET" })
  .validator((input: { country?: CountryId } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    const country = asCountry(data.country);
    const rows = mergeBoard(hitsFor(await loadHits(), country), "amount", namedPeople(country));
    return {
      people: rows.length,
      publicCount: rows.filter((r) => r.isPublic).length,
      reportKes: rows.reduce((n, r) => n + r.reportKes, 0),
      reports: rows.reduce((n, r) => n + r.reports, 0),
      scandals: scandalList(country).length,
      missing: missingList(country).length,
    };
  });

export const namedSuggestions = createServerFn({ method: "GET" })
  .validator((input: { country?: CountryId } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    const country = asCountry(data.country);
    const hits = hitsFor(await loadHits(), country);
    const extra = hits.map((h) => h.responsible_name.trim()).filter((n) => n.length > 1);
    return [...new Set([...namedPeople(country).map((p) => p.name), ...extra])];
  });
