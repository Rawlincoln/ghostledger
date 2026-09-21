import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BountyCard } from "@/components/ghost/bounty-card";
import {
  bountyStats,
  getWallet,
  listBounties,
  listLeaders,
  listMyBounties,
  listPayouts,
} from "@/lib/ghost/bounties";
import type { BountyRow, BountySort, Wallet } from "@/lib/ghost/bounty-types";
import { regionsFor } from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import { useGuestId } from "@/lib/ghost/use-guest";

type Search = {
  tab?: "open" | "paid" | "mine";
  sort?: BountySort;
  q?: string;
  county?: string;
};

export const Route = createFileRoute("/bounties/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    tab: s.tab === "paid" || s.tab === "mine" ? s.tab : "open",
    sort:
      s.sort === "newest" || s.sort === "ending" || s.sort === "near" ? s.sort : "reward",
    q: typeof s.q === "string" ? s.q : undefined,
    county: typeof s.county === "string" ? s.county : undefined,
  }),
  loader: async () => {
    const [stats, payouts, leaders, rows] = await Promise.all([
      bountyStats(),
      listPayouts(),
      listLeaders(),
      listBounties({ data: { tab: "open", sort: "reward" } }),
    ]);
    return { stats, payouts, leaders, rows };
  },
  component: Board,
});

function Board() {
  const initial = Route.useLoaderData();
  const { tab = "open", sort = "reward", q = "", county } = Route.useSearch();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const guestId = useGuestId();
  const [rows, setRows] = useState<BountyRow[]>(() =>
    initial.rows.filter((b) => (b.country ?? "ke") === country),
  );
  const [stats, setStats] = useState(initial.stats);
  const [payouts, setPayouts] = useState(initial.payouts);
  const [leaders, setLeaders] = useState(initial.leaders);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (tab === "mine") {
          if (!guestId) {
            if (!cancelled) setRows([]);
            return;
          }
          const mine = await listMyBounties({
            data: { sort: sort === "near" ? "reward" : sort, guestId },
          });
          if (!cancelled) setRows(mine.filter((b) => (b.country ?? "ke") === country));
          return;
        }
        const list = await listBounties({
          data: {
            tab: tab === "paid" ? "paid" : "open",
            sort: sort === "near" ? "reward" : sort,
            county: sort === "near" ? county || null : county || null,
            country,
          },
        });
        if (!cancelled) setRows(list);
      } catch {
        if (!cancelled) setRows([]);
      }
    }
    void load();
    void bountyStats({ data: { country } })
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => undefined);
    void listPayouts({ data: { country } })
      .then((list) => {
        if (!cancelled) setPayouts(list);
      })
      .catch(() => undefined);
    void listLeaders({ data: { country } })
      .then((board) => {
        if (!cancelled) setLeaders(board);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [tab, sort, county, guestId, country]);

  useEffect(() => {
    if (!guestId) {
      setWallet(null);
      return;
    }
    void getWallet({ data: { guestId } })
      .then(setWallet)
      .catch(() => setWallet(null));
  }, [guestId]);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let next = rows;
    if (needle) {
      next = next.filter((b) => {
        const hay = `${b.title} ${b.titleSw} ${b.posterName} ${b.county ?? ""} ${b.county ?? ""}`.toLowerCase();
        return hay.includes(needle);
      });
    }
    if (county && tab !== "mine") {
      next = next.filter((b) => b.county === county);
    }
    return next;
  }, [rows, query, county, tab]);

  const tabs = [
    { id: "open" as const, label: c.bountyOpen },
    { id: "paid" as const, label: c.bountyPaid },
    { id: "mine" as const, label: c.bountyMine },
  ];
  const sorts = [
    { id: "reward" as const, label: c.bountyHighest },
    { id: "newest" as const, label: c.bountyNewest },
    { id: "ending" as const, label: c.bountyEnding },
    { id: "near" as const, label: c.bountyNear },
  ];

  const postClass =
    "inline-flex min-h-11 items-center justify-center bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink no-underline hover:brightness-95";

  return (
    <main className="mx-auto max-w-6xl px-4 pt-8 pb-24 md:px-6 md:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.bountiesTitle}</h1>
          <p className="mt-3 max-w-[62ch] text-muted">{c.bountiesIntro}</p>
        </div>
        <Link to="/bounties/new" className={`hidden md:inline-flex ${postClass}`}>
          {c.bountyPost}
        </Link>
      </div>

      <label className="mt-6 block">
        <span className="sr-only">{c.bountySearchPh}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={c.bountySearchPh}
          className="w-full px-3 py-3"
        />
      </label>

      <dl className="mt-6 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {[
          [stats.live, c.bountyLive],
          [kesShort(stats.unclaimedKes), c.bountyUnclaimed],
          [stats.submissions, c.bountySubsAcross],
          [kesShort(stats.paidOutKes), c.bountyPaidOut],
        ].map(([n, label], i) => (
          <div key={String(label)} className="bg-canvas px-4 py-4">
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</dt>
            <dd
              className={`mt-1 font-mono text-2xl tabular-nums ${i === 1 || i === 3 ? "text-verified" : ""}`}
            >
              {n}
            </dd>
          </div>
        ))}
      </dl>

      {wallet ? (
        <p className="mt-4 font-mono text-sm">
          {c.bountyWallet}: {kes(wallet.balanceKes, lang, country)}
          <span className="ml-2 text-muted">{c.bountyWalletHint}</span>
        </p>
      ) : null}

      {payouts.length > 0 ? (
        <p className="mt-4 overflow-x-auto whitespace-nowrap font-mono text-xs text-muted">
          {payouts.slice(0, 6).map((p) => (
            <span key={p.at + p.hunterName} className="mr-5">
              {p.hunterName}
              <span className="text-verified"> +{kes(p.amountKes, lang, country)}</span>
            </span>
          ))}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <Link
              key={item.id}
              to="/bounties"
              search={{ tab: item.id, sort, q: query || undefined, county }}
              className={
                tab === item.id
                  ? "inline-flex min-h-11 items-center bg-ink px-3 text-sm font-bold text-canvas no-underline"
                  : "inline-flex min-h-11 items-center border border-line px-3 text-sm no-underline hover:border-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {sorts.map((item) => (
            <Link
              key={item.id}
              to="/bounties"
              search={{ tab, sort: item.id, q: query || undefined, county }}
              className={
                sort === item.id
                  ? "inline-flex min-h-11 items-center text-sm font-bold underline decoration-accent decoration-2 underline-offset-4"
                  : "inline-flex min-h-11 items-center text-sm text-muted no-underline hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[13rem_1fr_15rem]">
          <aside className="hidden lg:block">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {c.bountyFilters}
            </h2>
            <p className="mt-3 text-sm font-bold">{c.bountyHighestOpen}</p>
            <p className="mt-2">
              <Link
                to="/bounties"
                search={{ tab: "open", sort: "reward", q: query || undefined }}
                className="text-sm"
              >
                {c.bountyAllOpen} →
              </Link>
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {c.colCounty}
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <Link
                  to="/bounties"
                  search={{ tab, sort, q: query || undefined, county: undefined }}
                  className={`block py-1 text-sm no-underline ${county ? "text-muted" : "font-bold"}`}
                >
                  {c.allCounties}
                </Link>
              </li>
              {regionsFor(country).map((name) => (
                <li key={name}>
                  <Link
                    to="/bounties"
                    search={{ tab, sort: sort === "near" ? "near" : sort, q: query || undefined, county: name }}
                    className={`block py-1 text-sm no-underline ${county === name ? "font-bold" : "text-muted hover:text-ink"}`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <section>
            {sort === "near" ? (
              <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
                <p className="w-full text-sm text-muted">{c.bountyPickCounty}</p>
                {regionsFor(country).map((name) => (
                  <Link
                    key={name}
                    to="/bounties"
                    search={{ tab, sort: "near", q: query || undefined, county: name }}
                    className={
                      county === name
                        ? "inline-flex min-h-11 items-center bg-ink px-3 text-sm text-canvas no-underline"
                        : "inline-flex min-h-11 items-center border border-line px-3 text-sm no-underline"
                    }
                  >
                    {name}
                  </Link>
                ))}
              </div>
            ) : null}
            {list.length === 0 ? (
              <p className="text-muted">{c.bountyNone}</p>
            ) : (
              <ul className="border-t border-line">
                {list.map((b) => (
                  <li key={b.id}>
                    <BountyCard bounty={b} lang={lang} c={c} />
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-mono text-xs text-muted">
              {list.length} {c.bountyShown}
            </p>
          </section>

          <aside>
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {c.bountyRecent}
            </h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {payouts.map((p) => (
                <li key={p.at + p.hunterName} className="py-3">
                  <p className="font-bold">{p.hunterName}</p>
                  <p className="font-mono text-sm text-verified">+ {kes(p.amountKes, lang, country)}</p>
                  <p className="text-xs text-muted">{p.title}</p>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {c.bountyEarners}
            </h2>
            <ul className="mt-3 space-y-2">
              {leaders.earners.map((row) => (
                <li key={row.name} className="flex justify-between gap-3 text-sm">
                  <span>{row.name}</span>
                  <span className="font-mono tabular-nums text-verified">{kesShort(row.amountKes)}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {c.bountySpenders}
            </h2>
            <ul className="mt-3 space-y-2">
              {leaders.spenders.map((row) => (
                <li key={row.name} className="flex justify-between gap-3 text-sm">
                  <span>{row.name}</span>
                  <span className="font-mono tabular-nums">{kesShort(row.amountKes)}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-xl font-bold">{c.bountyHowTitle}</h2>
        <ol className="mt-5 space-y-3">
          {[c.bountyHow1, c.bountyHow2, c.bountyHow3, c.bountyHow4].map((line, i) => (
            <li key={line} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="font-mono text-sm text-muted">{i + 1}</span>
              <p className="max-w-[62ch] text-muted">{line}</p>
            </li>
          ))}
        </ol>
      </section>
      <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-canvas p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Link to="/bounties/new" className={`flex w-full ${postClass}`}>
          {c.bountyPost}
        </Link>
      </div>
    </main>
  );
}
