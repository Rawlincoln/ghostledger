import { createServerFn } from "@tanstack/react-start";
import { embeddedDbOff, getSql } from "@/lib/db";
import { parseGuestId } from "./guest";
import { asCountry } from "./country";
import { DEMO_CREDIT_KES, type Wallet } from "./bounty-types";
import { SEED_TOURS } from "./tour-seed";
import {
  MIN_TOUR_KES,
  SEED_TOUR_LOGGER,
  SEED_TOUR_PLANNER,
  type TourRow,
  type TourSort,
  type TourStats,
  type TourStatus,
  type TourVisit,
  type TourVisitStatus,
} from "./tour-types";

let seeded = false;

type TourSql = {
  id: number;
  slug: string;
  planner_user_id: string;
  planner_name: string;
  title: string;
  title_sw: string;
  investigation: string;
  county: string;
  country?: string;
  project_slugs: string;
  budget_kes: number;
  escrow_kes: number;
  status: string;
  deadline: string;
  winner_visit_id: number | null;
  is_demo: boolean;
  created_at: string;
  visit_count: number;
};

type VisitSql = {
  id: number;
  tour_id: number;
  logger_user_id: string;
  logger_name: string;
  project_slug: string | null;
  findings: string;
  video_url: string;
  status: string;
  created_at: string;
};

function splitSlugs(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function asTour(row: TourSql): TourRow {
  return {
    id: Number(row.id),
    slug: row.slug,
    plannerUserId: row.planner_user_id,
    plannerName: row.planner_name,
    title: row.title,
    titleSw: row.title_sw,
    investigation: row.investigation,
    county: row.county,
    country: asCountry(row.country),
    projectSlugs: splitSlugs(row.project_slugs ?? ""),
    budgetKes: Number(row.budget_kes),
    escrowKes: Number(row.escrow_kes),
    status: row.status as TourStatus,
    deadline: String(row.deadline),
    winnerVisitId: row.winner_visit_id == null ? null : Number(row.winner_visit_id),
    isDemo: Boolean(row.is_demo),
    createdAt: String(row.created_at),
    visitCount: Number(row.visit_count ?? 0),
  };
}

function asVisit(row: VisitSql): TourVisit {
  return {
    id: Number(row.id),
    tourId: Number(row.tour_id),
    loggerUserId: row.logger_user_id,
    loggerName: row.logger_name,
    projectSlug: row.project_slug,
    findings: row.findings,
    videoUrl: row.video_url,
    status: row.status as TourVisitStatus,
    createdAt: String(row.created_at),
  };
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

function memoryTours(): TourRow[] {
  return SEED_TOURS.map((t, i) => ({
    id: i + 1,
    slug: t.slug,
    plannerUserId: SEED_TOUR_PLANNER,
    plannerName: t.plannerName,
    title: t.title,
    titleSw: t.titleSw,
    investigation: t.investigation,
    county: t.county,
    country: asCountry(t.country),
    projectSlugs: t.projectSlugs,
    budgetKes: t.budgetKes,
    escrowKes: t.status === "open" ? t.budgetKes : 0,
    status: t.status,
    deadline: daysFromNow(t.days),
    winnerVisitId: null,
    isDemo: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    visitCount: t.visits.length,
  }));
}

function displayName(user: {
  displayName?: string | null;
  primaryEmail?: string | null;
  userId: string;
}): string {
  if (user.displayName?.trim()) return user.displayName.trim().slice(0, 80);
  if (user.primaryEmail?.trim()) return user.primaryEmail.split("@")[0] ?? "Monitor";
  return `Monitor ${user.userId.slice(-4)}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function ensureWallet(userId: string): Promise<Wallet> {
  const sql = await getSql();
  await sql`
    insert into gl_wallets (user_id, balance_kes)
    values (${userId}, ${DEMO_CREDIT_KES})
    on conflict (user_id) do nothing
  `;
  const rows = await sql<{ balance_kes: number }>`
    select balance_kes from gl_wallets where user_id = ${userId} limit 1
  `;
  return { balanceKes: Number(rows[0]?.balance_kes ?? 0) };
}

async function ensureTourSeed() {
  if (seeded) return;
  const sql = await getSql();
  for (const t of SEED_TOURS) {
    const existing = await sql<{ id: number }>`
      select id from gl_tours where slug = ${t.slug} limit 1
    `;
    if (existing[0]) continue;
    const escrow = t.status === "open" ? t.budgetKes : 0;
    const slugs = t.projectSlugs.join(",");
    const inserted = await sql<{ id: number }>`
      insert into gl_tours (
        slug, planner_user_id, planner_name, title, title_sw, investigation,
        county, project_slugs, budget_kes, escrow_kes, status, deadline, is_demo, country
      ) values (
        ${t.slug}, ${SEED_TOUR_PLANNER}, ${t.plannerName}, ${t.title}, ${t.titleSw},
        ${t.investigation}, ${t.county}, ${slugs}, ${t.budgetKes}, ${escrow},
        ${t.status}, ${daysFromNow(t.days)}, true, ${t.country ?? "ke"}
      )
      on conflict (slug) do nothing
      returning id
    `;
    const tourId = inserted[0]?.id;
    if (!tourId) continue;
    let winnerId: number | null = null;
    for (const v of t.visits) {
      const visit = await sql<{ id: number }>`
        insert into gl_tour_visits (
          tour_id, logger_user_id, logger_name, project_slug, findings, video_url, status
        ) values (
          ${tourId}, ${v.logger}, ${v.name}, ${v.projectSlug}, ${v.findings},
          ${v.videoUrl}, ${v.status}
        )
        returning id
      `;
      if (v.status === "accepted") winnerId = visit[0]?.id ?? null;
    }
    if (winnerId != null) {
      await sql`update gl_tours set winner_visit_id = ${winnerId} where id = ${tourId}`;
    }
  }
  seeded = true;
}

export const tourStats = createServerFn({ method: "GET" })
  .validator((input: { country?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<TourStats> => {
    if (embeddedDbOff) {
      const country = asCountry(data.country);
      const rows = memoryTours().filter((t) => t.country === country);
      const seeds = SEED_TOURS.filter((t) => asCountry(t.country) === country);
      return {
        live: rows.filter((t) => t.status === "open").length,
        unclaimedKes: rows.filter((t) => t.status === "open").reduce((n, t) => n + t.escrowKes, 0),
        visits: seeds.reduce((n, t) => n + t.visits.length, 0),
        paidOutKes: rows.filter((t) => t.status === "paid").reduce((n, t) => n + t.budgetKes, 0),
      };
    }
    await ensureTourSeed();
    const sql = await getSql();
    const country = asCountry(data.country);
    const rows = await sql<{
      live: number;
      unclaimed: number;
      visits: number;
      paid_out: number;
    }>`
    select
      (select count(*)::int from gl_tours where status = 'open' and country = ${country}) as live,
      (select coalesce(sum(escrow_kes), 0)::bigint from gl_tours where status = 'open' and country = ${country}) as unclaimed,
      (select count(*)::int from gl_tour_visits v join gl_tours t on t.id = v.tour_id where t.country = ${country}) as visits,
      (select coalesce(sum(budget_kes), 0)::bigint from gl_tours where status = 'paid' and country = ${country}) as paid_out
  `;
  const r = rows[0];
  return {
    live: Number(r?.live ?? 0),
    unclaimedKes: Number(r?.unclaimed ?? 0),
    visits: Number(r?.visits ?? 0),
    paidOutKes: Number(r?.paid_out ?? 0),
  };
});

export const listTours = createServerFn({ method: "GET" })
  .validator((input: { tab: "open" | "paid"; sort: TourSort; country?: string }) => input)
  .handler(async ({ data }): Promise<TourRow[]> => {
    if (embeddedDbOff) {
      const country = asCountry(data.country);
      const rows = memoryTours().filter((t) => t.status === data.tab && t.country === country);
      if (data.sort === "newest") rows.sort((a, b) => b.id - a.id);
      else if (data.sort === "ending") rows.sort((a, b) => a.deadline.localeCompare(b.deadline));
      else rows.sort((a, b) => b.budgetKes - a.budgetKes);
      return rows;
    }
    await ensureTourSeed();
    const sql = await getSql();
    const status = data.tab;
    const country = asCountry(data.country);
    const rows =
      data.sort === "newest"
        ? await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.status = ${status} order by t.created_at desc`
        : data.sort === "ending"
          ? await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.status = ${status} order by t.deadline asc`
          : await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.status = ${status} order by t.budget_kes desc`;
    return rows.map(asTour).filter((row) => row.country === country);
  });

export const listMyTours = createServerFn({ method: "GET" })
  .validator((input: { sort: TourSort; guestId?: string }) => input)
  .handler(async ({ data }): Promise<TourRow[]> => {
    if (embeddedDbOff) return [];
    await ensureTourSeed();
    const sql = await getSql();
    const uid = parseGuestId(data.guestId);
    const rows =
      data.sort === "newest"
        ? await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.planner_user_id = ${uid} order by t.created_at desc`
        : data.sort === "ending"
          ? await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.planner_user_id = ${uid} order by t.deadline asc`
          : await sql<TourSql>`
            select t.*, (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
            from gl_tours t where t.planner_user_id = ${uid} order by t.budget_kes desc`;
    return rows.map(asTour);
  });

export const getTour = createServerFn({ method: "GET" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    if (embeddedDbOff) {
      const tour = memoryTours().find((t) => t.id === data.id) ?? null;
      if (!tour) return { tour: null, visits: [] as TourVisit[] };
      const seed = SEED_TOURS[data.id - 1];
      const visits: TourVisit[] = (seed?.visits ?? []).map((v, i) => ({
        id: i + 1,
        tourId: tour.id,
        loggerUserId: v.logger,
        loggerName: v.name,
        projectSlug: v.projectSlug,
        findings: v.findings,
        videoUrl: v.videoUrl,
        status: v.status,
        createdAt: "2026-01-01T00:00:00.000Z",
      }));
      return { tour, visits };
    }
    await ensureTourSeed();
    const sql = await getSql();
    const rows = await sql<TourSql>`
      select t.*,
        (select count(*)::int from gl_tour_visits v where v.tour_id = t.id) as visit_count
      from gl_tours t
      where t.id = ${data.id}
      limit 1
    `;
    const tour = rows[0] ? asTour(rows[0]) : null;
    if (!tour) return { tour: null, visits: [] as TourVisit[] };
    const visits = await sql<VisitSql>`
      select id, tour_id, logger_user_id, logger_name, project_slug, findings, video_url,
        status, created_at::text as created_at
      from gl_tour_visits
      where tour_id = ${data.id}
      order by created_at desc
    `;
    return { tour, visits: visits.map(asVisit) };
  });

export const getTourWallet = createServerFn({ method: "GET" })
  .validator((input: { guestId?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<Wallet> => {
    if (embeddedDbOff) return { balanceKes: DEMO_CREDIT_KES };
    await ensureTourSeed();
    return ensureWallet(parseGuestId(data.guestId));
  });

export const createTour = createServerFn({ method: "POST" })
  .validator((input: {
    title: string;
    investigation: string;
    county: string;
    projectSlugs: string[];
    budgetKes: number;
    days: number;
    plannerName: string;
    guestId?: string;
    country?: string;
  }) => input)
  .handler(async ({ data }) => {
    await ensureTourSeed();
    const userId = parseGuestId(data.guestId);
    const title = data.title.trim().slice(0, 140);
    const investigation = data.investigation.trim().slice(0, 800);
    const county = data.county.trim().slice(0, 80);
    const budget = Math.round(data.budgetKes);
    const days = [3, 7, 14, 30].includes(data.days) ? data.days : 14;
    const slugs = data.projectSlugs.map((s) => s.trim()).filter(Boolean).slice(0, 8);
    if (!title || !investigation || !county) {
      return { ok: false as const, error: "Title, county, and investigation are required." };
    }
    if (slugs.length === 0) {
      return { ok: false as const, error: "Pick at least one project on the route." };
    }
    if (!Number.isFinite(budget) || budget < MIN_TOUR_KES) {
      return { ok: false as const, error: `Minimum tour budget is ${MIN_TOUR_KES} KES.` };
    }
    const wallet = await ensureWallet(userId);
    if (wallet.balanceKes < budget) {
      return { ok: false as const, error: "Not enough demo credit to lock this tour budget." };
    }
    const sql = await getSql();
    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40)}-${Date.now().toString(36)}`;
    const name =
      data.plannerName.trim().slice(0, 80) ||
      displayName({ userId, displayName: data.plannerName });
    const joined = slugs.join(",");
    const inserted = await sql<{ id: number }>`
      insert into gl_tours (
        slug, planner_user_id, planner_name, title, title_sw, investigation,
        county, project_slugs, budget_kes, escrow_kes, status, deadline, is_demo, country
      ) values (
        ${slug}, ${userId}, ${name}, ${title}, ${title},
        ${investigation}, ${county}, ${joined}, ${budget}, ${budget},
        'open', ${daysFromNow(days)}, false, ${asCountry(data.country)}
      )
      returning id
    `;
    const id = inserted[0]?.id;
    if (!id) return { ok: false as const, error: "Could not plan the tour." };
    await sql`
      update gl_wallets
      set balance_kes = balance_kes - ${budget}, updated_at = now()
      where user_id = ${userId} and balance_kes >= ${budget}
    `;
    await sql`
      insert into gl_tour_events (tour_id, user_id, kind, amount_kes)
      values (${id}, ${userId}, 'lock', ${budget})
    `;
    return { ok: true as const, id };
  });

export const logTourVisit = createServerFn({ method: "POST" })
  .validator((input: {
    tourId: number;
    findings: string;
    videoUrl: string;
    projectSlug: string | null;
    loggerName: string;
    guestId?: string;
  }) => input)
  .handler(async ({ data }) => {
    await ensureTourSeed();
    const userId = parseGuestId(data.guestId);
    const findings = data.findings.trim().slice(0, 800);
    const videoUrl = data.videoUrl.trim().slice(0, 400);
    if (!findings) return { ok: false as const, error: "Write what you found on the ground." };
    if (!isHttpUrl(videoUrl)) return { ok: false as const, error: "Paste a public video link." };
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      planner_user_id: string;
      status: string;
      deadline: string;
    }>`
      select id, planner_user_id, status, deadline::text as deadline
      from gl_tours where id = ${data.tourId} limit 1
    `;
    const tour = rows[0];
    if (!tour) return { ok: false as const, error: "Unknown tour." };
    if (tour.status !== "open") return { ok: false as const, error: "This tour is not open." };
    if (new Date(tour.deadline).getTime() <= Date.now()) {
      return { ok: false as const, error: "This tour has ended." };
    }
    if (tour.planner_user_id === userId) {
      return { ok: false as const, error: "You cannot log a paid visit on a tour you planned." };
    }
    const existing = await sql<{ id: number }>`
      select id from gl_tour_visits
      where tour_id = ${data.tourId} and logger_user_id = ${userId} and status = 'pending'
      limit 1
    `;
    if (existing[0]) return { ok: false as const, error: "You already have a pending visit on this tour." };
    const name = data.loggerName.trim().slice(0, 80) || `Monitor ${userId.slice(-4)}`;
    await sql`
      insert into gl_tour_visits (
        tour_id, logger_user_id, logger_name, project_slug, findings, video_url, status
      ) values (
        ${data.tourId}, ${userId}, ${name}, ${data.projectSlug || null},
        ${findings}, ${videoUrl}, 'pending'
      )
    `;
    return { ok: true as const };
  });

export const addDemoTourVisit = createServerFn({ method: "POST" })
  .validator((input: { tourId: number; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureTourSeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const rows = await sql<{ id: number; planner_user_id: string; status: string }>`
      select id, planner_user_id, status from gl_tours where id = ${data.tourId} limit 1
    `;
    const tour = rows[0];
    if (!tour || tour.planner_user_id !== userId) {
      return { ok: false as const, error: "Only the planner can request a demo visit." };
    }
    if (tour.status !== "open") return { ok: false as const, error: "This tour is not open." };
    await sql`
      insert into gl_tour_visits (
        tour_id, logger_user_id, logger_name, project_slug, findings, video_url, status
      ) values (
        ${data.tourId},
        ${SEED_TOUR_LOGGER},
        ${"Demo field monitor"},
        ${null},
        ${"Walked the listed plot. GPS tagged. Video from the public alignment. Photograph stayed on the phone."},
        ${"https://www.youtube.com/watch?v=ghostledger-demo-01"},
        'pending'
      )
    `;
    return { ok: true as const };
  });

export const reviewTourVisit = createServerFn({ method: "POST" })
  .validator((input: { tourId: number; visitId: number; accept: boolean; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureTourSeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const tours = await sql<{
      id: number;
      planner_user_id: string;
      status: string;
      escrow_kes: number;
    }>`
      select id, planner_user_id, status, escrow_kes
      from gl_tours where id = ${data.tourId} limit 1
    `;
    const tour = tours[0];
    if (!tour || tour.planner_user_id !== userId) {
      return { ok: false as const, error: "Only the planner can release or reject." };
    }
    if (tour.status !== "open") return { ok: false as const, error: "This tour is not open." };
    const visits = await sql<{ id: number; logger_user_id: string; status: string }>`
      select id, logger_user_id, status from gl_tour_visits
      where id = ${data.visitId} and tour_id = ${data.tourId} limit 1
    `;
    const visit = visits[0];
    if (!visit || visit.status !== "pending") return { ok: false as const, error: "Unknown visit." };
    if (visit.logger_user_id === userId) {
      return { ok: false as const, error: "You cannot pay yourself." };
    }
    if (!data.accept) {
      await sql`update gl_tour_visits set status = 'rejected' where id = ${visit.id}`;
      return { ok: true as const, released: false };
    }
    const amount = Number(tour.escrow_kes);
    await sql`update gl_tour_visits set status = 'accepted' where id = ${visit.id}`;
    await sql`update gl_tour_visits set status = 'rejected' where tour_id = ${tour.id} and id <> ${visit.id} and status = 'pending'`;
    await sql`
      update gl_tours
      set status = 'paid', escrow_kes = 0, winner_visit_id = ${visit.id}
      where id = ${tour.id} and planner_user_id = ${userId}
    `;
    await ensureWallet(visit.logger_user_id);
    await sql`
      update gl_wallets
      set balance_kes = balance_kes + ${amount}, updated_at = now()
      where user_id = ${visit.logger_user_id}
    `;
    await sql`
      insert into gl_tour_events (tour_id, user_id, kind, amount_kes)
      values (${tour.id}, ${visit.logger_user_id}, 'release', ${amount})
    `;
    return { ok: true as const, released: true };
  });

export const reclaimTour = createServerFn({ method: "POST" })
  .validator((input: { tourId: number; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureTourSeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      planner_user_id: string;
      status: string;
      deadline: string;
      escrow_kes: number;
    }>`
      select id, planner_user_id, status, deadline::text as deadline, escrow_kes
      from gl_tours where id = ${data.tourId} limit 1
    `;
    const tour = rows[0];
    if (!tour || tour.planner_user_id !== userId) {
      return { ok: false as const, error: "Only the planner can reclaim escrow." };
    }
    if (tour.status !== "open") return { ok: false as const, error: "This tour is not open." };
    if (new Date(tour.deadline).getTime() > Date.now()) {
      return { ok: false as const, error: "Escrow stays locked until the deadline." };
    }
    const amount = Number(tour.escrow_kes);
    await sql`
      update gl_tours
      set status = 'closed', escrow_kes = 0
      where id = ${tour.id} and planner_user_id = ${userId}
    `;
    await sql`
      update gl_wallets
      set balance_kes = balance_kes + ${amount}, updated_at = now()
      where user_id = ${userId}
    `;
    await sql`
      insert into gl_tour_events (tour_id, user_id, kind, amount_kes)
      values (${tour.id}, ${userId}, 'refund', ${amount})
    `;
    return { ok: true as const };
  });
