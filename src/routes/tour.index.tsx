import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BountyMark } from "@/components/ghost/bounty-mark";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort, timeLeft } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import { listMyTours, listTours, tourStats } from "@/lib/ghost/tours";
import type { TourRow, TourSort } from "@/lib/ghost/tour-types";
import { useGuestId } from "@/lib/ghost/use-guest";

type Search = { tab?: "open" | "paid" | "mine"; sort?: TourSort };

export const Route = createFileRoute("/tour/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    tab: s.tab === "paid" || s.tab === "mine" ? s.tab : "open",
    sort: s.sort === "newest" || s.sort === "ending" ? s.sort : "reward",
  }),
  loader: async () => {
    const [stats, rows] = await Promise.all([
      tourStats(),
      listTours({ data: { tab: "open", sort: "reward" } }),
    ]);
    return { stats, rows };
  },
  component: TourBoard,
});

function TourBoard() {
  const initial = Route.useLoaderData();
  const { tab = "open", sort = "reward" } = Route.useSearch();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const guestId = useGuestId();
  const [rows, setRows] = useState<TourRow[]>(initial.rows);
  const [stats, setStats] = useState(initial.stats);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (tab === "mine") {
          if (!guestId) {
            if (!cancelled) setRows([]);
            return;
          }
          const mine = await listMyTours({ data: { sort, guestId } });
          if (!cancelled) setRows(mine.filter((row) => (row.country ?? "ke") === country));
          return;
        }
        const list = await listTours({
          data: { tab: tab === "paid" ? "paid" : "open", sort, country },
        });
        if (!cancelled) setRows(list);
      } catch {
        if (!cancelled) setRows([]);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [tab, sort, guestId, country]);

  useEffect(() => {
    void tourStats({ data: { country } })
      .then(setStats)
      .catch(() => undefined);
  }, [tab, country]);

  const tabs = [
    { id: "open" as const, label: c.tourOpen },
    { id: "paid" as const, label: c.tourPaid },
    { id: "mine" as const, label: c.tourMine },
  ];
  const sorts = [
    { id: "reward" as const, label: c.tourHighest },
    { id: "newest" as const, label: c.tourNewest },
    { id: "ending" as const, label: c.tourEnding },
  ];
  const postClass =
    "inline-flex min-h-11 items-center justify-center bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink no-underline hover:brightness-95";

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 pb-24 md:px-6 md:pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.tourTitle}</h1>
          <p className="mt-3 max-w-[62ch] text-muted">{c.tourIntro}</p>
        </div>
        <Link to="/tour/new" className={`hidden md:inline-flex ${postClass}`}>
          {c.tourPlan}
        </Link>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {[
          [stats.live, c.tourLive],
          [kesShort(stats.unclaimedKes), c.tourUnclaimed],
          [stats.visits, c.tourVisits],
          [kesShort(stats.paidOutKes), c.tourPaidOut],
        ].map(([n, label]) => (
          <div key={String(label)} className="bg-canvas px-4 py-4">
            <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">{label}</dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums">{n}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <Link
              key={item.id}
              to="/tour"
              search={{ tab: item.id, sort }}
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
              to="/tour"
              search={{ tab, sort: item.id }}
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

      <section className="mt-6">
          {rows.length === 0 ? (
            <p className="text-muted">{c.tourNone}</p>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {rows.map((row) => {
                const title = lang !== "en" ? row.titleSw : row.title;
                return (
                  <li key={row.id}>
                    <Link
                      to="/tour/$id"
                      params={{ id: String(row.id) }}
                      className="grid grid-cols-1 gap-3 py-5 no-underline hover:bg-paper md:grid-cols-[3rem_1fr_auto] md:items-start"
                    >
                      <span
                        className="inline-flex size-10 shrink-0 items-center justify-center bg-ink font-mono text-xs text-canvas"
                        aria-hidden
                      >
                        {row.plannerName
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-3">
                          <BountyMark status={row.status} deadline={row.deadline} />
                          <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                            {row.county}
                          </span>
                        </span>
                        <span className="mt-2 block text-lg font-bold leading-snug tracking-tight text-ink">
                          {title}
                        </span>
                        <span className="mt-1 block text-sm text-muted">
                          {row.plannerName} · {row.visitCount} {c.tourVisits}
                        </span>
                      </span>
                      <span className="shrink-0 md:text-right">
                        <span className="block font-mono text-2xl tracking-tight text-verified tabular-nums">
                          {kes(row.budgetKes, lang, country)}
                        </span>
                        <span className="mt-1 block font-mono text-xs text-muted">
                          {timeLeft(row.deadline, lang)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-3 font-mono text-xs text-muted">
            {rows.length} {c.tourShown}
          </p>
        </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-xl font-bold">{c.tourHowTitle}</h2>
        <ol className="mt-5 space-y-3">
          {[c.tourHow1, c.tourHow2, c.tourHow3, c.tourHow4].map((line, i) => (
            <li key={line} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="font-mono text-sm text-muted">{i + 1}</span>
              <p className="max-w-[62ch] text-muted">{line}</p>
            </li>
          ))}
        </ol>
      </section>
      <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-canvas p-3 md:hidden">
        <Link to="/tour/new" className={`flex w-full ${postClass}`}>
          {c.tourPlan}
        </Link>
      </div>
    </main>
  );
}
