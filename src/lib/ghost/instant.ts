/**
 * Public record that runs in the browser. Render's free instance is too slow
 * if every page waits on a Node server, so the clock, ledger, names, bounties,
 * and tours read the compiled catalog here. Reports stay in this browser.
 */
import { allProjects, missingList, namedPeople, scandalList } from "./catalog";
import { asCountry, emptyClockMap, type CountryId } from "./country";
import { SEED_BOUNTIES } from "./bounty-seed";
import {
  DEMO_CREDIT_KES,
  MIN_BOUNTY_KES,
  SEED_POSTER,
  type BountyRow,
  type BountySort,
  type BountySub,
  type Wallet,
} from "./bounty-types";
import type { NamedBoardRow, NamedSort } from "./named-types";
import { SEED_TOURS } from "./tour-seed";
import { MIN_TOUR_KES, SEED_TOUR_PLANNER, type TourRow, type TourSort, type TourVisit } from "./tour-types";
import type { Observation, Project, ReportRow } from "./types";

const REPORTS_KEY = "ghostledger-reports";
const EXTRA_KEY = "ghostledger-local-board";

type ExtraState = {
  bounties: BountyRow[];
  subs: BountySub[];
  tours: TourRow[];
  visits: TourVisit[];
  spent: number;
  nextId: number;
};

function emptyExtra(): ExtraState {
  return { bounties: [], subs: [], tours: [], visits: [], spent: 0, nextId: 1000 };
}

function readReports(): ReportRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REPORTS_KEY);
    return raw ? (JSON.parse(raw) as ReportRow[]) : [];
  } catch {
    return [];
  }
}

function writeReports(rows: ReportRow[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REPORTS_KEY, JSON.stringify(rows));
}

function readExtra(): ExtraState {
  if (typeof window === "undefined") return emptyExtra();
  try {
    const raw = window.localStorage.getItem(EXTRA_KEY);
    return raw ? { ...emptyExtra(), ...(JSON.parse(raw) as ExtraState) } : emptyExtra();
  } catch {
    return emptyExtra();
  }
}

function writeExtra(state: ExtraState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EXTRA_KEY, JSON.stringify(state));
}

function dataOf<T>(input: { data?: T } | undefined): T {
  return (input?.data ?? {}) as T;
}

function rankStatus(status: string): number {
  if (status === "ghost") return 0;
  if (status === "incomplete") return 1;
  if (status === "delayed") return 2;
  return 3;
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

export async function listProjects(): Promise<Project[]> {
  const reports = readReports();
  return [...allProjects()]
    .sort((a, b) => rankStatus(a.status) - rankStatus(b.status) || b.allocatedKes - a.allocatedKes)
    .map((p) => ({
      ...p,
      seedReports: p.seedReports + reports.filter((r) => r.project_slug === p.slug).length,
    }));
}

export async function getProject(input: { data: { slug: string } }) {
  const projects = await listProjects();
  const project = projects.find((p) => p.slug === input.data.slug) ?? null;
  const reports = readReports().filter((r) => r.project_slug === input.data.slug);
  return { project, reports };
}

export async function submitReport(input: {
  data: {
    slug: string;
    observation: Observation;
    lat: number | null;
    lng: number | null;
    distance_m: number | null;
    note: string;
    evidence_hash: string;
    responsible_name?: string;
    responsible_role?: string;
  };
}) {
  const data = input.data;
  const note = data.note.trim().slice(0, 280);
  const responsibleName = (data.responsible_name ?? "").trim().slice(0, 80);
  const responsibleRole = (data.responsible_role ?? "").trim().slice(0, 80);
  if (!data.slug || !data.observation || !data.evidence_hash) {
    return { ok: false as const, error: "Incomplete observation." };
  }
  if (!allProjects().some((p) => p.slug === data.slug)) {
    return { ok: false as const, error: "Unknown project." };
  }
  const created_at = new Date().toISOString();
  const rows = readReports();
  const id = rows.reduce((n, r) => Math.max(n, r.id), 0) + 1;
  rows.unshift({
    id,
    project_slug: data.slug,
    observation: data.observation,
    lat: data.lat,
    lng: data.lng,
    distance_m: data.distance_m,
    note: note || null,
    evidence_hash: data.evidence_hash,
    responsible_name: responsibleName || null,
    responsible_role: responsibleRole || null,
    created_at,
  });
  writeReports(rows);
  return { ok: true as const, id, created_at };
}

export async function getClockExtras() {
  const byCountry = emptyClockMap(() => ({
    citizenConfirmedKes: 0,
    confirmedProjects: 0,
    reportCount: 0,
  }));
  const seen = new Set<string>();
  for (const report of readReports()) {
    const project = allProjects().find((p) => p.slug === report.project_slug);
    const id = asCountry(project?.country);
    byCountry[id].reportCount += 1;
    if (report.observation === "not_found" && project && !seen.has(project.slug)) {
      seen.add(project.slug);
      byCountry[id].citizenConfirmedKes += project.disbursedKes;
      byCountry[id].confirmedProjects += 1;
    }
  }
  return byCountry;
}

export async function listNamedBoard(input?: { data?: { sort?: NamedSort; country?: CountryId } }) {
  const data = dataOf(input);
  const sort: NamedSort = data.sort === "earliest" || data.sort === "reports" ? data.sort : "amount";
  const country = asCountry(data.country);
  const rows: NamedBoardRow[] = namedPeople(country).map((p) => ({
    key: p.name.trim().toLowerCase().replace(/\s+/g, " "),
    name: p.name,
    role: p.role,
    roleSw: p.roleSw,
    status: p.status,
    matter: p.matter,
    matterSw: p.matterSw,
    amountKes: p.amountKes,
    publicKes: p.amountKes,
    reportKes: 0,
    reports: 0,
    since: p.since,
    sources: p.sources,
    projects: [],
    isPublic: true,
  }));
  if (sort === "earliest") rows.sort((a, b) => a.since.localeCompare(b.since) || b.amountKes - a.amountKes);
  else rows.sort((a, b) => b.amountKes - a.amountKes || a.name.localeCompare(b.name));
  return rows;
}

export async function namedStats(input?: { data?: { country?: CountryId } }) {
  const country = asCountry(dataOf(input).country);
  const rows = await listNamedBoard({ data: { country, sort: "amount" } });
  return {
    people: rows.length,
    publicCount: rows.filter((r) => r.isPublic).length,
    reportKes: 0,
    reports: readReports().length,
    scandals: scandalList(country).length,
    missing: missingList(country).length,
  };
}

function seedBounties(): BountyRow[] {
  const createdAt = "2026-01-01T00:00:00.000Z";
  return SEED_BOUNTIES.map((b, i) => ({
    id: i + 1,
    slug: b.slug,
    posterUserId: SEED_POSTER,
    posterName: b.posterName,
    title: b.title,
    titleSw: b.titleSw,
    description: b.description,
    deliverables: b.deliverables,
    projectSlug: b.projectSlug,
    county: b.county,
    country: asCountry(b.country),
    rewardKes: b.rewardKes,
    escrowKes: b.status === "open" ? b.rewardKes : 0,
    status: b.status,
    deadline: daysFromNow(b.days),
    winnerSubId: null,
    isDemo: true,
    createdAt,
    subCount: b.subs.length,
  }));
}

function allBounties(): BountyRow[] {
  return [...seedBounties(), ...readExtra().bounties];
}

function subsFor(id: number): BountySub[] {
  const seed = SEED_BOUNTIES[id - 1];
  const seeded: BountySub[] = (seed?.subs ?? []).map((s, i) => ({
    id: i + 1,
    bountyId: id,
    hunterUserId: s.hunter,
    hunterName: s.name,
    proof: s.proof,
    status: s.status,
    createdAt: "2026-01-01T00:00:00.000Z",
  }));
  return [...seeded, ...readExtra().subs.filter((s) => s.bountyId === id)];
}

export async function bountyStats(input?: { data?: { country?: string } }) {
  const country = asCountry(dataOf(input).country);
  const rows = allBounties().filter((b) => b.country === country);
  return {
    live: rows.filter((b) => b.status === "open").length,
    unclaimedKes: rows.filter((b) => b.status === "open").reduce((n, b) => n + b.escrowKes, 0),
    submissions: rows.reduce((n, b) => n + subsFor(b.id).length, 0),
    paidOutKes: rows.filter((b) => b.status === "paid").reduce((n, b) => n + b.rewardKes, 0),
  };
}

export async function listBounties(input: {
  data: { tab: "open" | "paid"; sort: BountySort; county?: string | null; country?: string };
}) {
  const country = asCountry(input.data.country);
  let rows = allBounties().filter((b) => b.status === input.data.tab && b.country === country);
  if (input.data.county?.trim()) rows = rows.filter((b) => b.county === input.data.county);
  if (input.data.sort === "newest") rows.sort((a, b) => b.id - a.id);
  else if (input.data.sort === "ending") rows.sort((a, b) => a.deadline.localeCompare(b.deadline));
  else rows.sort((a, b) => b.rewardKes - a.rewardKes);
  return rows;
}

export async function listMyBounties(input: { data: { sort: BountySort; guestId?: string } }) {
  const uid = input.data.guestId;
  if (!uid) return [];
  return allBounties()
    .filter((b) => b.posterUserId === uid)
    .sort((a, b) => b.rewardKes - a.rewardKes);
}

export async function listPayouts(input?: { data?: { country?: string } }) {
  const country = asCountry(dataOf(input).country);
  return allBounties()
    .filter((b) => b.country === country)
    .flatMap((b) =>
      subsFor(b.id)
        .filter((s) => s.status === "accepted")
        .map((s) => ({ hunterName: s.hunterName, amountKes: b.rewardKes, title: b.title, at: s.createdAt })),
    );
}

export async function listLeaders(input?: { data?: { country?: string } }) {
  const country = asCountry(dataOf(input).country);
  const rows = allBounties().filter((b) => b.country === country);
  const earned = new Map<string, number>();
  const spent = new Map<string, number>();
  for (const b of rows) {
    spent.set(b.posterName, (spent.get(b.posterName) ?? 0) + b.rewardKes);
    for (const s of subsFor(b.id)) {
      if (s.status === "accepted") earned.set(s.hunterName, (earned.get(s.hunterName) ?? 0) + b.rewardKes);
    }
  }
  const rank = (map: Map<string, number>) =>
    [...map.entries()]
      .map(([name, amountKes]) => ({ name, amountKes }))
      .sort((a, b) => b.amountKes - a.amountKes)
      .slice(0, 5);
  return { earners: rank(earned), spenders: rank(spent) };
}

export async function getBounty(input: { data: { id: number } }) {
  const bounty = allBounties().find((b) => b.id === input.data.id) ?? null;
  if (!bounty) return { bounty: null, submissions: [] as BountySub[] };
  return { bounty, submissions: subsFor(bounty.id) };
}

export async function getWallet(_input?: { data?: { guestId?: string } }): Promise<Wallet> {
  return { balanceKes: Math.max(0, DEMO_CREDIT_KES - readExtra().spent) };
}

export async function createBounty(input: {
  data: {
    title: string;
    description: string;
    deliverables: string;
    projectSlug: string | null;
    county: string | null;
    country?: string;
    rewardKes: number;
    days: number;
    posterName: string;
    guestId?: string;
  };
}) {
  const data = input.data;
  const title = data.title.trim().slice(0, 120);
  const description = data.description.trim().slice(0, 800);
  const deliverables = data.deliverables.trim().slice(0, 400);
  const reward = Math.round(data.rewardKes);
  if (!title || !description || !deliverables) {
    return { ok: false as const, error: "Title, description, and deliverables are required." };
  }
  if (!Number.isFinite(reward) || reward < MIN_BOUNTY_KES) {
    return { ok: false as const, error: `Minimum bounty is ${MIN_BOUNTY_KES} KES.` };
  }
  const extra = readExtra();
  if (DEMO_CREDIT_KES - extra.spent < reward) {
    return { ok: false as const, error: "Not enough demo credit to lock this bounty." };
  }
  const id = extra.nextId++;
  extra.spent += reward;
  extra.bounties.push({
    id,
    slug: `local-${id}`,
    posterUserId: data.guestId || "guest",
    posterName: data.posterName.trim().slice(0, 80) || "Monitor",
    title,
    titleSw: title,
    description,
    deliverables,
    projectSlug: data.projectSlug,
    county: data.county,
    country: asCountry(data.country),
    rewardKes: reward,
    escrowKes: reward,
    status: "open",
    deadline: daysFromNow([3, 7, 14, 30].includes(data.days) ? data.days : 14),
    winnerSubId: null,
    isDemo: false,
    createdAt: new Date().toISOString(),
    subCount: 0,
  });
  writeExtra(extra);
  return { ok: true as const, id };
}

export async function submitBounty(input: {
  data: { bountyId: number; proof: string; hunterName: string; guestId?: string };
}) {
  const proof = input.data.proof.trim().slice(0, 400);
  if (!proof) return { ok: false as const, error: "Write what you found." };
  const bounty = allBounties().find((b) => b.id === input.data.bountyId);
  if (!bounty || bounty.status !== "open") return { ok: false as const, error: "This bounty is not open." };
  const extra = readExtra();
  extra.subs.push({
    id: extra.nextId++,
    bountyId: bounty.id,
    hunterUserId: input.data.guestId || "guest",
    hunterName: input.data.hunterName.trim().slice(0, 80) || "Monitor",
    proof,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  writeExtra(extra);
  return { ok: true as const };
}

export async function addDemoSubmission(input: { data: { bountyId: number; guestId?: string } }) {
  return submitBounty({
    data: {
      bountyId: input.data.bountyId,
      proof: "Demo note filed in this browser. No faces. GPS on the public alignment.",
      hunterName: "Monitor",
      guestId: input.data.guestId,
    },
  });
}

export async function reviewSubmission(input: {
  data: { bountyId: number; submissionId: number; accept: boolean; guestId?: string };
}) {
  const extra = readExtra();
  const sub = extra.subs.find((s) => s.id === input.data.submissionId && s.bountyId === input.data.bountyId);
  if (!sub) return { ok: false as const, error: "Submission is not on this browser.", released: false };
  sub.status = input.data.accept ? "accepted" : "rejected";
  writeExtra(extra);
  return { ok: true as const, released: input.data.accept };
}

export async function reclaimBounty(input: { data: { bountyId: number; guestId?: string } }) {
  const extra = readExtra();
  const bounty = extra.bounties.find((b) => b.id === input.data.bountyId);
  if (!bounty || bounty.status !== "open") return { ok: false as const, error: "Nothing to reclaim." };
  bounty.status = "closed";
  bounty.escrowKes = 0;
  extra.spent = Math.max(0, extra.spent - bounty.rewardKes);
  writeExtra(extra);
  return { ok: true as const };
}

function seedTours(): TourRow[] {
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

function allTours(): TourRow[] {
  return [...seedTours(), ...readExtra().tours];
}

function visitsFor(id: number): TourVisit[] {
  const seed = SEED_TOURS[id - 1];
  const seeded: TourVisit[] = (seed?.visits ?? []).map((v, i) => ({
    id: i + 1,
    tourId: id,
    loggerUserId: v.logger,
    loggerName: v.name,
    projectSlug: v.projectSlug,
    findings: v.findings,
    videoUrl: v.videoUrl,
    status: v.status,
    createdAt: "2026-01-01T00:00:00.000Z",
  }));
  return [...seeded, ...readExtra().visits.filter((v) => v.tourId === id)];
}

export async function tourStats(input?: { data?: { country?: string } }) {
  const country = asCountry(dataOf(input).country);
  const rows = allTours().filter((t) => t.country === country);
  return {
    live: rows.filter((t) => t.status === "open").length,
    unclaimedKes: rows.filter((t) => t.status === "open").reduce((n, t) => n + t.escrowKes, 0),
    visits: rows.reduce((n, t) => n + visitsFor(t.id).length, 0),
    paidOutKes: rows.filter((t) => t.status === "paid").reduce((n, t) => n + t.budgetKes, 0),
  };
}

export async function listTours(input: { data: { tab: "open" | "paid"; sort: TourSort; country?: string } }) {
  const country = asCountry(input.data.country);
  const rows = allTours().filter((t) => t.status === input.data.tab && t.country === country);
  if (input.data.sort === "newest") rows.sort((a, b) => b.id - a.id);
  else if (input.data.sort === "ending") rows.sort((a, b) => a.deadline.localeCompare(b.deadline));
  else rows.sort((a, b) => b.budgetKes - a.budgetKes);
  return rows;
}

export async function listMyTours(input: { data: { sort: TourSort; guestId?: string } }) {
  const uid = input.data.guestId;
  if (!uid) return [];
  return allTours().filter((t) => t.plannerUserId === uid);
}

export async function getTour(input: { data: { id: number } }) {
  const tour = allTours().find((t) => t.id === input.data.id) ?? null;
  if (!tour) return { tour: null, visits: [] as TourVisit[] };
  return { tour, visits: visitsFor(tour.id) };
}

export async function getTourWallet(_input?: { data?: { guestId?: string } }): Promise<Wallet> {
  return getWallet();
}

export async function createTour(input: {
  data: {
    title: string;
    investigation: string;
    county: string;
    country?: string;
    projectSlugs: string[];
    budgetKes: number;
    days: number;
    plannerName: string;
    guestId?: string;
  };
}) {
  const data = input.data;
  const title = data.title.trim().slice(0, 120);
  const investigation = data.investigation.trim().slice(0, 800);
  const budget = Math.round(data.budgetKes);
  if (!title || !investigation) return { ok: false as const, error: "Title and investigation are required." };
  if (!Number.isFinite(budget) || budget < MIN_TOUR_KES) {
    return { ok: false as const, error: `Minimum tour budget is ${MIN_TOUR_KES} KES.` };
  }
  const extra = readExtra();
  if (DEMO_CREDIT_KES - extra.spent < budget) {
    return { ok: false as const, error: "Not enough demo credit to lock this tour." };
  }
  const id = extra.nextId++;
  extra.spent += budget;
  extra.tours.push({
    id,
    slug: `local-tour-${id}`,
    plannerUserId: data.guestId || "guest",
    plannerName: data.plannerName.trim().slice(0, 80) || "Monitor",
    title,
    titleSw: title,
    investigation,
    county: data.county,
    country: asCountry(data.country),
    projectSlugs: data.projectSlugs,
    budgetKes: budget,
    escrowKes: budget,
    status: "open",
    deadline: daysFromNow([3, 7, 14, 30].includes(data.days) ? data.days : 14),
    winnerVisitId: null,
    isDemo: false,
    createdAt: new Date().toISOString(),
    visitCount: 0,
  });
  writeExtra(extra);
  return { ok: true as const, id };
}

export async function logTourVisit(input: {
  data: {
    tourId: number;
    projectSlug: string | null;
    findings: string;
    videoUrl: string;
    loggerName: string;
    guestId?: string;
  };
}) {
  const findings = input.data.findings.trim().slice(0, 400);
  if (!findings) return { ok: false as const, error: "Write what you saw." };
  const tour = allTours().find((t) => t.id === input.data.tourId);
  if (!tour || tour.status !== "open") return { ok: false as const, error: "This tour is not open." };
  const extra = readExtra();
  extra.visits.push({
    id: extra.nextId++,
    tourId: tour.id,
    loggerUserId: input.data.guestId || "guest",
    loggerName: input.data.loggerName.trim().slice(0, 80) || "Monitor",
    projectSlug: input.data.projectSlug,
    findings,
    videoUrl: input.data.videoUrl.trim().slice(0, 300),
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  writeExtra(extra);
  return { ok: true as const };
}

export async function addDemoTourVisit(input: { data: { tourId: number; guestId?: string } }) {
  return logTourVisit({
    data: {
      tourId: input.data.tourId,
      projectSlug: null,
      findings: "Demo visit filed in this browser.",
      videoUrl: "",
      loggerName: "Monitor",
      guestId: input.data.guestId,
    },
  });
}

export async function reviewTourVisit(input: {
  data: { tourId: number; visitId: number; accept: boolean; guestId?: string };
}) {
  const extra = readExtra();
  const visit = extra.visits.find((v) => v.id === input.data.visitId && v.tourId === input.data.tourId);
  if (!visit) return { ok: false as const, error: "Visit is not on this browser.", released: false };
  visit.status = input.data.accept ? "accepted" : "rejected";
  writeExtra(extra);
  return { ok: true as const, released: input.data.accept };
}

export async function reclaimTour(input: { data: { tourId: number; guestId?: string } }) {
  const extra = readExtra();
  const tour = extra.tours.find((t) => t.id === input.data.tourId);
  if (!tour || tour.status !== "open") return { ok: false as const, error: "Nothing to reclaim." };
  tour.status = "closed";
  tour.escrowKes = 0;
  extra.spent = Math.max(0, extra.spent - tour.budgetKes);
  writeExtra(extra);
  return { ok: true as const };
}
