import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { allProjects } from "./catalog";
import { asCountry, emptyClockMap, type CountryId } from "./country";
import type { Observation, Project, ReportRow } from "./types";

let seeded = false;

async function ensureSeed() {
  if (seeded) return;
  const sql = await getSql();
  for (const p of allProjects()) {
    const payload = JSON.stringify({
      sources: p.sources,
      nextSteps: p.nextSteps,
    });
    const country = p.country ?? "ke";
    const existing = await sql<{ slug: string }>`select slug from gl_projects where slug = ${p.slug} limit 1`;
    if (!existing[0]) {
      await sql`
        insert into gl_projects (
          slug, name, name_sw, county, ward, sector, status, fy,
          allocated_kes, disbursed_kes, contractor, promised, promised_sw,
          paper_claim, paper_claim_sw, ground_note, ground_note_sw,
          lat, lng, photo, last_official, payload, seed_reports, country
        ) values (
          ${p.slug}, ${p.name}, ${p.nameSw}, ${p.county}, ${p.ward}, ${p.sector},
          ${p.status}, ${p.fy}, ${p.allocatedKes}, ${p.disbursedKes}, ${p.contractor},
          ${p.promised}, ${p.promisedSw}, ${p.paperClaim}, ${p.paperClaimSw},
          ${p.groundNote}, ${p.groundNoteSw}, ${p.lat}, ${p.lng}, ${p.photo},
          ${p.lastOfficial}, ${payload}::jsonb, ${p.seedReports}, ${country}
        )
      `;
    } else {
      await sql`
        update gl_projects
        set photo = ${p.photo}, country = ${country}
        where slug = ${p.slug}
      `;
    }
  }
  seeded = true;
}

type ProjectRow = {
  slug: string;
  name: string;
  name_sw: string;
  county: string;
  ward: string;
  sector: string;
  status: string;
  fy: string;
  allocated_kes: number;
  disbursed_kes: number;
  contractor: string;
  promised: string;
  promised_sw: string;
  paper_claim: string;
  paper_claim_sw: string;
  ground_note: string;
  ground_note_sw: string;
  lat: number;
  lng: number;
  photo: string;
  last_official: string;
  payload: unknown;
  seed_reports: number;
  visit_count: number;
  country?: string;
};

function parsePayload(raw: unknown): { sources: Project["sources"]; nextSteps: Project["nextSteps"] } {
  const value = typeof raw === "string" ? JSON.parse(raw) : raw;
  const obj = value as { sources?: Project["sources"]; nextSteps?: Project["nextSteps"] };
  return { sources: obj.sources ?? [], nextSteps: obj.nextSteps ?? [] };
}

function asProject(row: ProjectRow): Project {
  const payload = parsePayload(row.payload);
  const seed = allProjects().find((p) => p.slug === row.slug);
  const country = asCountry(row.country ?? seed?.country);
  return {
    slug: row.slug,
    name: row.name,
    nameSw: row.name_sw,
    county: row.county,
    ward: row.ward,
    sector: row.sector as Project["sector"],
    status: row.status as Project["status"],
    fy: row.fy,
    allocatedKes: Number(row.allocated_kes),
    disbursedKes: Number(row.disbursed_kes),
    contractor: row.contractor,
    promised: row.promised,
    promisedSw: row.promised_sw,
    paperClaim: row.paper_claim,
    paperClaimSw: row.paper_claim_sw,
    groundNote: row.ground_note,
    groundNoteSw: row.ground_note_sw,
    lat: Number(row.lat),
    lng: Number(row.lng),
    photo: seed?.photo ?? row.photo,
    lastOfficial: String(row.last_official).slice(0, 10),
    sources: payload.sources,
    nextSteps: payload.nextSteps,
    seedReports: Number(row.seed_reports) + Number(row.visit_count),
    bountyKes: seed?.bountyKes ?? 0,
    responsible: seed?.responsible ?? [],
    country,
  };
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<ProjectRow>`
    select p.*,
      (select count(*)::int from gl_reports r where r.project_slug = p.slug) as visit_count
    from gl_projects p
    order by
      case p.status when 'ghost' then 0 when 'incomplete' then 1 when 'delayed' then 2 else 3 end,
      p.allocated_kes desc
  `;
  return rows.map(asProject);
});

export const getProject = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const sql = await getSql();
    const rows = await sql<ProjectRow>`
      select p.*,
        (select count(*)::int from gl_reports r where r.project_slug = p.slug) as visit_count
      from gl_projects p
      where p.slug = ${data.slug}
      limit 1
    `;
    const project = rows[0] ? asProject(rows[0]) : null;
    if (!project) return { project: null, reports: [] as ReportRow[] };
    let reports: ReportRow[] = [];
    try {
      reports = await sql<ReportRow>`
        select id, project_slug, observation, lat, lng, distance_m, note, evidence_hash,
          responsible_name, responsible_role, created_at::text as created_at
        from gl_reports
        where project_slug = ${data.slug}
        order by created_at desc
        limit 40
      `;
    } catch {
      const legacy = await sql<Omit<ReportRow, "responsible_name" | "responsible_role">>`
        select id, project_slug, observation, lat, lng, distance_m, note, evidence_hash,
          created_at::text as created_at
        from gl_reports
        where project_slug = ${data.slug}
        order by created_at desc
        limit 40
      `;
      reports = legacy.map((r) => ({ ...r, responsible_name: null, responsible_role: null }));
    }
    return { project, reports };
  });

export const submitReport = createServerFn({ method: "POST" })
  .validator((input: {
    slug: string;
    observation: Observation;
    lat: number | null;
    lng: number | null;
    distance_m: number | null;
    note: string;
    evidence_hash: string;
    responsible_name?: string;
    responsible_role?: string;
  }) => input)
  .handler(async ({ data }) => {
    await ensureSeed();
    const note = data.note.trim().slice(0, 280);
    const responsibleName = (data.responsible_name ?? "").trim().slice(0, 80);
    const responsibleRole = (data.responsible_role ?? "").trim().slice(0, 80);
    if (!data.slug || !data.observation || !data.evidence_hash) {
      return { ok: false as const, error: "Incomplete observation." };
    }
    const sql = await getSql();
    const exists = await sql<{ slug: string }>`select slug from gl_projects where slug = ${data.slug} limit 1`;
    if (!exists[0]) return { ok: false as const, error: "Unknown project." };
    const rows = await sql<{ id: number; created_at: string }>`
      insert into gl_reports (
        project_slug, observation, lat, lng, distance_m, note, evidence_hash,
        responsible_name, responsible_role
      )
      values (
        ${data.slug}, ${data.observation}, ${data.lat}, ${data.lng},
        ${data.distance_m}, ${note || null}, ${data.evidence_hash},
        ${responsibleName || null}, ${responsibleRole || null}
      )
      returning id, created_at::text as created_at
    `;
    return { ok: true as const, id: rows[0].id, created_at: rows[0].created_at };
  });

export type ClockExtras = {
  citizenConfirmedKes: number;
  confirmedProjects: number;
  reportCount: number;
};

const emptyExtras = (): ClockExtras => ({
  citizenConfirmedKes: 0,
  confirmedProjects: 0,
  reportCount: 0,
});

export const getClockExtras = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeed();
  const sql = await getSql();
  const confirmed = await sql<{ country: string; kes: number; n: number }>`
    select coalesce(p.country, 'ke') as country,
           coalesce(sum(p.disbursed_kes), 0)::float as kes,
           count(*)::int as n
    from gl_projects p
    where exists (
      select 1 from gl_reports r
      where r.project_slug = p.slug and r.observation = 'not_found'
    )
    group by coalesce(p.country, 'ke')
  `;
  const reports = await sql<{ country: string; n: number }>`
    select coalesce(p.country, 'ke') as country, count(*)::int as n
    from gl_reports r
    join gl_projects p on p.slug = r.project_slug
    group by coalesce(p.country, 'ke')
  `;
  const byCountry: Record<CountryId, ClockExtras> = emptyClockMap(emptyExtras);
  for (const row of confirmed) {
    const id = asCountry(row.country);
    byCountry[id].citizenConfirmedKes = Number(row.kes ?? 0);
    byCountry[id].confirmedProjects = Number(row.n ?? 0);
  }
  for (const row of reports) {
    const id = asCountry(row.country);
    byCountry[id].reportCount = Number(row.n ?? 0);
  }
  return byCountry;
});
