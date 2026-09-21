import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { parseGuestId } from "./guest";
import { SEED_BOUNTIES } from "./bounty-seed";
import { asCountry } from "./country";
import {
  DEMO_CREDIT_KES,
  MIN_BOUNTY_KES,
  SEED_HUNTER,
  SEED_POSTER,
  type BountyRow,
  type BountySort,
  type BountyStats,
  type BountyStatus,
  type BountySub,
  type SubStatus,
  type Wallet,
} from "./bounty-types";

let seeded = false;

type BountySql = {
  id: number;
  slug: string;
  poster_user_id: string;
  poster_name: string;
  title: string;
  title_sw: string;
  description: string;
  deliverables: string;
  project_slug: string | null;
  county: string | null;
  country?: string;
  reward_kes: number;
  escrow_kes: number;
  status: string;
  deadline: string;
  winner_sub_id: number | null;
  is_demo: boolean;
  created_at: string;
  sub_count: number;
};

type SubSql = {
  id: number;
  bounty_id: number;
  hunter_user_id: string;
  hunter_name: string;
  proof: string;
  status: string;
  created_at: string;
};

function asBounty(row: BountySql): BountyRow {
  return {
    id: Number(row.id),
    slug: row.slug,
    posterUserId: row.poster_user_id,
    posterName: row.poster_name,
    title: row.title,
    titleSw: row.title_sw,
    description: row.description,
    deliverables: row.deliverables,
    projectSlug: row.project_slug,
    county: row.county,
    country: asCountry(row.country),
    rewardKes: Number(row.reward_kes),
    escrowKes: Number(row.escrow_kes),
    status: row.status as BountyStatus,
    deadline: String(row.deadline),
    winnerSubId: row.winner_sub_id == null ? null : Number(row.winner_sub_id),
    isDemo: Boolean(row.is_demo),
    createdAt: String(row.created_at),
    subCount: Number(row.sub_count ?? 0),
  };
}

function asSub(row: SubSql): BountySub {
  return {
    id: Number(row.id),
    bountyId: Number(row.bounty_id),
    hunterUserId: row.hunter_user_id,
    hunterName: row.hunter_name,
    proof: row.proof,
    status: row.status as SubStatus,
    createdAt: String(row.created_at),
  };
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString();
}

async function ensureBountySeed() {
  if (seeded) return;
  const sql = await getSql();
  for (const b of SEED_BOUNTIES) {
    const existing = await sql<{ id: number }>`
      select id from gl_bounties where slug = ${b.slug} limit 1
    `;
    if (existing[0]) continue;
    const escrow = b.status === "open" ? b.rewardKes : 0;
    const inserted = await sql<{ id: number }>`
      insert into gl_bounties (
        slug, poster_user_id, poster_name, title, title_sw, description, deliverables,
        project_slug, county, reward_kes, escrow_kes, status, deadline, is_demo, country
      ) values (
        ${b.slug}, ${SEED_POSTER}, ${b.posterName}, ${b.title}, ${b.titleSw},
        ${b.description}, ${b.deliverables}, ${b.projectSlug}, ${b.county},
        ${b.rewardKes}, ${escrow}, ${b.status}, ${daysFromNow(b.days)}, true, ${b.country ?? "ke"}
      )
      on conflict (slug) do nothing
      returning id
    `;
    const bountyId = inserted[0]?.id;
    if (!bountyId) continue;
    let winnerId: number | null = null;
    for (const s of b.subs) {
      const sub = await sql<{ id: number }>`
        insert into gl_bounty_subs (bounty_id, hunter_user_id, hunter_name, proof, status)
        values (${bountyId}, ${s.hunter}, ${s.name}, ${s.proof}, ${s.status})
        returning id
      `;
      if (s.status === "accepted") winnerId = sub[0]?.id ?? null;
    }
    if (winnerId != null) {
      await sql`update gl_bounties set winner_sub_id = ${winnerId} where id = ${bountyId}`;
    }
  }
  seeded = true;
}

function displayName(user: { displayName?: string | null; primaryEmail?: string | null; userId: string }): string {
  if (user.displayName?.trim()) return user.displayName.trim().slice(0, 80);
  if (user.primaryEmail?.trim()) return user.primaryEmail.split("@")[0] ?? "Monitor";
  return `Monitor ${user.userId.slice(-4)}`;
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


export const bountyStats = createServerFn({ method: "GET" })
  .validator((input: { country?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<BountyStats> => {
    await ensureBountySeed();
    const sql = await getSql();
    const country = asCountry(data.country);
    const rows = await sql<{
      live: number;
      unclaimed: number;
      submissions: number;
      paid_out: number;
    }>`
    select
      (select count(*)::int from gl_bounties where status = 'open' and country = ${country}) as live,
      (select coalesce(sum(escrow_kes), 0)::bigint from gl_bounties where status = 'open' and country = ${country}) as unclaimed,
      (select count(*)::int from gl_bounty_subs s join gl_bounties b on b.id = s.bounty_id where b.country = ${country}) as submissions,
      (select coalesce(sum(reward_kes), 0)::bigint from gl_bounties where status = 'paid' and country = ${country}) as paid_out
  `;
  const r = rows[0];
  return {
    live: Number(r?.live ?? 0),
    unclaimedKes: Number(r?.unclaimed ?? 0),
    submissions: Number(r?.submissions ?? 0),
    paidOutKes: Number(r?.paid_out ?? 0),
  };
});

export const listBounties = createServerFn({ method: "GET" })
  .validator((input: { tab: "open" | "paid"; sort: BountySort; county?: string | null; country?: string }) => input)
  .handler(async ({ data }): Promise<BountyRow[]> => {
    await ensureBountySeed();
    const sql = await getSql();
    const status = data.tab;
    const county = data.county?.trim() || null;
    const country = asCountry(data.country);
    const rows =
      data.sort === "newest"
        ? county
          ? await sql<BountySql>`
              select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
              from gl_bounties b
              where b.status = ${status} and b.county = ${county}
              order by b.created_at desc`
          : await sql<BountySql>`
              select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
              from gl_bounties b where b.status = ${status} order by b.created_at desc`
        : data.sort === "ending"
          ? county
            ? await sql<BountySql>`
                select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
                from gl_bounties b
                where b.status = ${status} and b.county = ${county}
                order by b.deadline asc`
            : await sql<BountySql>`
                select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
                from gl_bounties b where b.status = ${status} order by b.deadline asc`
          : county
            ? await sql<BountySql>`
                select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
                from gl_bounties b
                where b.status = ${status} and b.county = ${county}
                order by b.reward_kes desc`
            : await sql<BountySql>`
                select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
                from gl_bounties b where b.status = ${status} order by b.reward_kes desc`;
    return rows.map(asBounty).filter((b) => b.country === country);
  });

export const listMyBounties = createServerFn({ method: "GET" })
  .validator((input: { sort: BountySort; guestId?: string }) => input)
  .handler(async ({ data }): Promise<BountyRow[]> => {
    await ensureBountySeed();
    const sql = await getSql();
    const uid = parseGuestId(data.guestId);
    const rows =
      data.sort === "newest"
        ? await sql<BountySql>`
            select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
            from gl_bounties b where b.poster_user_id = ${uid} order by b.created_at desc`
        : data.sort === "ending"
          ? await sql<BountySql>`
            select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
            from gl_bounties b where b.poster_user_id = ${uid} order by b.deadline asc`
          : await sql<BountySql>`
            select b.*, (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
            from gl_bounties b where b.poster_user_id = ${uid} order by b.reward_kes desc`;
    return rows.map(asBounty);
  });

export const listPayouts = createServerFn({ method: "GET" })
  .validator((input: { country?: string } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const sql = await getSql();
    const country = asCountry(data.country);
    const rows = await sql<{
      hunter_name: string;
      amount: number;
      title: string;
      created_at: string;
    }>`
    select s.hunter_name, b.reward_kes as amount, b.title, s.created_at::text as created_at
    from gl_bounty_subs s
    join gl_bounties b on b.id = s.bounty_id
    where s.status = 'accepted' and coalesce(b.country, 'ke') = ${country}
    order by s.created_at desc
    limit 8
  `;
    return rows.map((r) => ({
      hunterName: r.hunter_name,
      amountKes: Number(r.amount),
      title: r.title,
      at: String(r.created_at),
    }));
  });

export const listLeaders = createServerFn({ method: "GET" })
  .validator((input: { country?: string } | undefined) => input ?? {})
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const sql = await getSql();
    const country = asCountry(data.country);
    const earners = await sql<{ name: string; amount: number }>`
    select s.hunter_name as name, coalesce(sum(b.reward_kes), 0)::bigint as amount
    from gl_bounty_subs s
    join gl_bounties b on b.id = s.bounty_id
    where s.status = 'accepted' and coalesce(b.country, 'ke') = ${country}
    group by s.hunter_name
    order by amount desc
    limit 5
  `;
    const spenders = await sql<{ name: string; amount: number }>`
    select poster_name as name, coalesce(sum(reward_kes), 0)::bigint as amount
    from gl_bounties
    where coalesce(country, 'ke') = ${country}
    group by poster_name
    order by amount desc
    limit 5
  `;
    return {
      earners: earners.map((r) => ({ name: r.name, amountKes: Number(r.amount) })),
      spenders: spenders.map((r) => ({ name: r.name, amountKes: Number(r.amount) })),
    };
  });

export const getBounty = createServerFn({ method: "GET" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const sql = await getSql();
    const rows = await sql<BountySql>`
      select b.*,
        (select count(*)::int from gl_bounty_subs s where s.bounty_id = b.id) as sub_count
      from gl_bounties b
      where b.id = ${data.id}
      limit 1
    `;
    const bounty = rows[0] ? asBounty(rows[0]) : null;
    if (!bounty) return { bounty: null, submissions: [] as BountySub[] };
    const submissions = await sql<SubSql>`
      select id, bounty_id, hunter_user_id, hunter_name, proof, status, created_at::text as created_at
      from gl_bounty_subs
      where bounty_id = ${data.id}
      order by created_at desc
    `;
    return { bounty, submissions: submissions.map(asSub) };
  });

export const getWallet = createServerFn({ method: "GET" })
  .validator((input: { guestId?: string } | undefined) => input ?? {})
  .handler(async ({ data }): Promise<Wallet> => {
    await ensureBountySeed();
    return ensureWallet(parseGuestId(data.guestId));
  });

export const createBounty = createServerFn({ method: "POST" })
  .validator((input: {
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
  }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const userId = parseGuestId(data.guestId);
    const title = data.title.trim().slice(0, 120);
    const description = data.description.trim().slice(0, 800);
    const deliverables = data.deliverables.trim().slice(0, 400);
    const reward = Math.round(data.rewardKes);
    const days = [3, 7, 14, 30].includes(data.days) ? data.days : 14;
    if (!title || !description || !deliverables) {
      return { ok: false as const, error: "Title, description, and deliverables are required." };
    }
    if (!Number.isFinite(reward) || reward < MIN_BOUNTY_KES) {
      return { ok: false as const, error: `Minimum bounty is ${MIN_BOUNTY_KES} KES.` };
    }
    const wallet = await ensureWallet(userId);
    if (wallet.balanceKes < reward) {
      return { ok: false as const, error: "Not enough demo credit to lock this bounty." };
    }
    const sql = await getSql();
    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40)}-${Date.now().toString(36)}`;
    const name = data.posterName.trim().slice(0, 80) || displayName({ userId, displayName: data.posterName });
    const inserted = await sql<{ id: number }>`
      insert into gl_bounties (
        slug, poster_user_id, poster_name, title, title_sw, description, deliverables,
        project_slug, county, reward_kes, escrow_kes, status, deadline, is_demo, country
      ) values (
        ${slug}, ${userId}, ${name}, ${title}, ${title},
        ${description}, ${deliverables}, ${data.projectSlug || null}, ${data.county || null},
        ${reward}, ${reward}, 'open', ${daysFromNow(days)}, false, ${asCountry(data.country)}
      )
      returning id
    `;
    const id = inserted[0]?.id;
    if (!id) return { ok: false as const, error: "Could not post the bounty." };
    await sql`
      update gl_wallets
      set balance_kes = balance_kes - ${reward}, updated_at = now()
      where user_id = ${userId} and balance_kes >= ${reward}
    `;
    await sql`
      insert into gl_escrow_events (bounty_id, user_id, kind, amount_kes)
      values (${id}, ${userId}, 'lock', ${reward})
    `;
    return { ok: true as const, id };
  });

export const submitBounty = createServerFn({ method: "POST" })
  .validator((input: { bountyId: number; proof: string; hunterName: string; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const userId = parseGuestId(data.guestId);
    const proof = data.proof.trim().slice(0, 400);
    if (!proof) return { ok: false as const, error: "Write what you found." };
    const sql = await getSql();
    const rows = await sql<{ id: number; poster_user_id: string; status: string; deadline: string }>`
      select id, poster_user_id, status, deadline::text as deadline from gl_bounties where id = ${data.bountyId} limit 1
    `;
    const b = rows[0];
    if (!b) return { ok: false as const, error: "Unknown bounty." };
    if (b.status !== "open") return { ok: false as const, error: "This bounty is not open." };
    if (new Date(b.deadline).getTime() <= Date.now()) {
      return { ok: false as const, error: "This bounty has ended." };
    }
    if (b.poster_user_id === userId) {
      return { ok: false as const, error: "You cannot submit to a bounty you posted." };
    }
    const existing = await sql<{ id: number }>`
      select id from gl_bounty_subs
      where bounty_id = ${data.bountyId} and hunter_user_id = ${userId} and status = 'pending'
      limit 1
    `;
    if (existing[0]) return { ok: false as const, error: "You already have a pending submission." };
    const name = data.hunterName.trim().slice(0, 80) || `Monitor ${userId.slice(-4)}`;
    await sql`
      insert into gl_bounty_subs (bounty_id, hunter_user_id, hunter_name, proof, status)
      values (${data.bountyId}, ${userId}, ${name}, ${proof}, 'pending')
    `;
    return { ok: true as const };
  });

export const addDemoSubmission = createServerFn({ method: "POST" })
  .validator((input: { bountyId: number; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const rows = await sql<{ id: number; poster_user_id: string; status: string }>`
      select id, poster_user_id, status from gl_bounties where id = ${data.bountyId} limit 1
    `;
    const b = rows[0];
    if (!b || b.poster_user_id !== userId) {
      return { ok: false as const, error: "Only the poster can request a demo submission." };
    }
    if (b.status !== "open") return { ok: false as const, error: "This bounty is not open." };
    await sql`
      insert into gl_bounty_subs (bounty_id, hunter_user_id, hunter_name, proof, status)
      values (
        ${data.bountyId},
        ${SEED_HUNTER},
        ${"Demo field monitor"},
        ${"Visited the listed plot. Photograph stayed on the phone. GPS tagged. Ready for review."},
        'pending'
      )
    `;
    return { ok: true as const };
  });

export const reviewSubmission = createServerFn({ method: "POST" })
  .validator((input: { bountyId: number; submissionId: number; accept: boolean; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const bounties = await sql<{
      id: number;
      poster_user_id: string;
      status: string;
      escrow_kes: number;
      reward_kes: number;
    }>`
      select id, poster_user_id, status, escrow_kes, reward_kes
      from gl_bounties where id = ${data.bountyId} limit 1
    `;
    const bounty = bounties[0];
    if (!bounty || bounty.poster_user_id !== userId) {
      return { ok: false as const, error: "Only the poster can release or reject." };
    }
    if (bounty.status !== "open") return { ok: false as const, error: "This bounty is not open." };
    const subs = await sql<{ id: number; hunter_user_id: string; status: string }>`
      select id, hunter_user_id, status from gl_bounty_subs
      where id = ${data.submissionId} and bounty_id = ${data.bountyId} limit 1
    `;
    const sub = subs[0];
    if (!sub || sub.status !== "pending") return { ok: false as const, error: "Unknown submission." };
    if (sub.hunter_user_id === userId) {
      return { ok: false as const, error: "You cannot pay yourself." };
    }
    if (!data.accept) {
      await sql`update gl_bounty_subs set status = 'rejected' where id = ${sub.id}`;
      return { ok: true as const, released: false };
    }
    const amount = Number(bounty.escrow_kes);
    await sql`update gl_bounty_subs set status = 'accepted' where id = ${sub.id}`;
    await sql`update gl_bounty_subs set status = 'rejected' where bounty_id = ${bounty.id} and id <> ${sub.id} and status = 'pending'`;
    await sql`
      update gl_bounties
      set status = 'paid', escrow_kes = 0, winner_sub_id = ${sub.id}
      where id = ${bounty.id} and poster_user_id = ${userId}
    `;
    await ensureWallet(sub.hunter_user_id);
    await sql`
      update gl_wallets
      set balance_kes = balance_kes + ${amount}, updated_at = now()
      where user_id = ${sub.hunter_user_id}
    `;
    await sql`
      insert into gl_escrow_events (bounty_id, user_id, kind, amount_kes)
      values (${bounty.id}, ${sub.hunter_user_id}, 'release', ${amount})
    `;
    return { ok: true as const, released: true };
  });

export const reclaimBounty = createServerFn({ method: "POST" })
  .validator((input: { bountyId: number; guestId?: string }) => input)
  .handler(async ({ data }) => {
    await ensureBountySeed();
    const userId = parseGuestId(data.guestId);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      poster_user_id: string;
      status: string;
      deadline: string;
      escrow_kes: number;
    }>`
      select id, poster_user_id, status, deadline::text as deadline, escrow_kes
      from gl_bounties where id = ${data.bountyId} limit 1
    `;
    const b = rows[0];
    if (!b || b.poster_user_id !== userId) {
      return { ok: false as const, error: "Only the poster can reclaim escrow." };
    }
    if (b.status !== "open") return { ok: false as const, error: "This bounty is not open." };
    if (new Date(b.deadline).getTime() > Date.now()) {
      return { ok: false as const, error: "Escrow stays locked until the deadline." };
    }
    const amount = Number(b.escrow_kes);
    await sql`
      update gl_bounties
      set status = 'closed', escrow_kes = 0
      where id = ${b.id} and poster_user_id = ${userId}
    `;
    await sql`
      update gl_wallets
      set balance_kes = balance_kes + ${amount}, updated_at = now()
      where user_id = ${userId}
    `;
    await sql`
      insert into gl_escrow_events (bounty_id, user_id, kind, amount_kes)
      values (${b.id}, ${userId}, 'refund', ${amount})
    `;
    return { ok: true as const };
  });
