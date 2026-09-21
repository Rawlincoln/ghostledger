import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PersonMark } from "@/components/ghost/person-mark";
import { SourceLine } from "@/components/ghost/missing-clock";
import { missingList, peopleOn, scandalList } from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t, type Copy } from "@/lib/ghost/i18n";
import { listNamedBoard, namedStats } from "@/lib/ghost/named";
import type { NamedBoardRow, NamedSort, NamedView } from "@/lib/ghost/named-types";
import { type MoneyItem } from "@/lib/ghost/record";
import { useGhost } from "@/lib/ghost/store";
import type { Lang } from "@/lib/ghost/types";

type Search = { view?: NamedView; sort?: NamedSort };

export const Route = createFileRoute("/named")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    view: s.view === "missing" || s.view === "people" ? s.view : "scandals",
    sort: s.sort === "earliest" || s.sort === "reports" ? s.sort : "amount",
  }),
  loaderDeps: ({ search }: { search: Search }) => ({
    view: search.view ?? "scandals",
    sort: search.sort ?? "amount",
  }),
  loader: async ({ deps }) => {
    const [stats, rows] = await Promise.all([
      namedStats(),
      listNamedBoard({ data: { sort: deps.sort } }),
    ]);
    return { stats, rows };
  },
  component: NamedBoard,
});

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function kindLabel(kind: MoneyItem["kind"], c: Copy): string {
  switch (kind) {
    case "unaccounted":
      return c.kindUnaccounted;
    case "scandal_paid":
      return c.kindPaid;
    case "audit_query":
      return c.kindAudit;
    case "disputed":
      return c.kindDisputed;
    case "dismissed":
      return c.kindDismissed;
    default:
      return c.kindExcluded;
  }
}

function NamedBoard() {
  const initial = Route.useLoaderData();
  const { view = "scandals", sort = "amount" } = Route.useSearch();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const [rows, setRows] = useState<NamedBoardRow[]>(initial.rows);
  const [stats, setStats] = useState(initial.stats);

  useEffect(() => {
    let cancelled = false;
    void listNamedBoard({ data: { sort, country } })
      .then((list) => {
        if (!cancelled) setRows(list);
      })
      .catch(() => undefined);
    void namedStats({ data: { country } })
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [sort, country]);

  const views = [
    { id: "scandals" as const, label: c.namedTabScandals },
    { id: "missing" as const, label: c.namedTabMissing },
    { id: "people" as const, label: c.namedTabPeople },
  ];
  const sorts = [
    { id: "amount" as const, label: c.namedHighest },
    { id: "earliest" as const, label: c.namedEarliest },
    { id: "reports" as const, label: c.namedMostReports },
  ];
  const items = view === "missing" ? missingList(country) : scandalList(country);
  const ledgerPeople = rows.filter((r) => !r.isPublic);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.namedPageTitle}</h1>
      <p className="mt-3 max-w-[62ch] text-muted">{c.namedPageIntro}</p>

      <dl className="mt-8 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {[
          [stats.scandals, c.namedTabScandals],
          [stats.missing, c.namedTabMissing],
          [stats.people, c.namedPeople],
          [stats.reports, c.namedReports],
        ].map(([n, label]) => (
          <div key={String(label)} className="bg-canvas px-4 py-4">
            <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">{label}</dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums">{n}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap gap-2 border-y border-line py-3">
        {views.map((item) => (
          <Link
            key={item.id}
            to="/named"
            search={{ view: item.id, sort }}
            className={
              view === item.id
                ? "inline-flex min-h-11 items-center text-sm font-bold underline decoration-accent decoration-2 underline-offset-4"
                : "inline-flex min-h-11 items-center text-sm text-muted no-underline hover:text-ink"
            }
          >
            {item.label}
          </Link>
        ))}
      </div>

      {view === "people" ? (
        <>
          <div className="mt-2 flex flex-wrap gap-2 py-3">
            {sorts.map((item) => (
              <Link
                key={item.id}
                to="/named"
                search={{ view: "people", sort: item.id }}
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
          <PeopleList rows={rows} lang={lang} c={c} />
        </>
      ) : (
        <>
          <p className="mt-6 max-w-[62ch] text-sm text-muted">
            {view === "missing" ? c.namedMissingIntro : c.namedScandalIntro}
          </p>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {items.map((item, i) => (
              <ScandalRow key={item.id} item={item} rank={i + 1} lang={lang} c={c} />
            ))}
          </ol>
          {ledgerPeople.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight">{c.namedFromLedger}</h2>
              <p className="mt-3 max-w-[62ch] text-sm text-muted">{c.namedFromLedgerIntro}</p>
              <PeopleList rows={ledgerPeople} lang={lang} c={c} />
            </section>
          ) : null}
        </>
      )}

      <p className="mt-8 max-w-[70ch] text-sm text-muted">{c.namedNote}</p>
      <p className="mt-4">
        <Link to="/report" className="font-bold">
          {c.ctaReport}
        </Link>
        {" · "}
        <Link to="/record" className="font-bold">
          {c.ctaRecord}
        </Link>
      </p>
      <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
    </main>
  );
}

function ScandalRow({
  item,
  rank,
  lang,
  c,
}: {
  item: MoneyItem;
  rank: number;
  lang: Lang;
  c: Copy;
}) {
  const country = useGhost((s) => s.country);
  const people = peopleOn(country, item.id);
  return (
    <li className="grid gap-3 py-6 md:grid-cols-[2.5rem_1fr_auto] md:items-start">
      <span className="pt-1 font-mono text-sm tabular-nums text-muted">{rank}</span>
      <div className="min-w-0">
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          {kindLabel(item.kind, c)} · {item.period}
        </p>
        <h2 className="mt-1 text-lg font-bold tracking-tight">
          {lang !== "en" ? item.titleSw : item.title}
        </h2>
        <p className="mt-2 max-w-[62ch] text-sm text-muted">
          {lang !== "en" ? item.summarySw : item.summary}
        </p>
        <p className="mt-2 text-sm">{lang !== "en" ? item.officeSw : item.office}</p>
        <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          {c.namedResponsible}
        </p>
        {people.length === 0 ? (
          <p className="mt-2 text-sm text-muted">{c.namedNoPeople}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {people.map((p) => (
              <li key={p.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <PersonMark status={p.status} />
                <span className="font-bold">{p.name}</span>
                <span className="text-sm text-muted">{lang !== "en" ? p.roleSw : p.role}</span>
                <span className="font-mono text-[11px] text-muted uppercase">
                  {c.namedSince} {p.since}
                </span>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-3 space-y-1">
          {item.sources.map((s, i) => (
            <li key={`${item.id}-s-${i}`}>
              <SourceLine {...s} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-2xl tracking-tight text-ghost tabular-nums md:text-right">
        {item.amountKes === 0 ? "—" : kes(item.amountKes, lang, country)}
      </p>
    </li>
  );
}

function PeopleList({ rows, lang, c }: { rows: NamedBoardRow[]; lang: Lang; c: Copy }) {
  const country = useGhost((s) => s.country);
  if (rows.length === 0) {
    return <p className="mt-8 text-muted">{c.namedNone}</p>;
  }
  return (
    <ol className="mt-2 divide-y divide-line border-b border-line">
      {rows.map((row, i) => {
        const matter = lang !== "en" ? row.matterSw : row.matter;
        const role = lang !== "en" ? row.roleSw : row.role;
        return (
          <li
            key={row.key}
            className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 md:grid-cols-[2.5rem_3rem_1fr_auto] md:items-start"
          >
            <span className="pt-2 font-mono text-sm tabular-nums text-muted">{i + 1}</span>
            <span
              className="hidden size-10 shrink-0 items-center justify-center bg-ink font-mono text-xs text-canvas md:inline-flex"
              aria-hidden
            >
              {initials(row.name)}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <PersonMark status={row.status} />
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {c.namedSince} {row.since}
                </span>
              </div>
              <p className="mt-2 text-lg font-bold leading-snug tracking-tight">{row.name}</p>
              <p className="mt-1 text-sm text-muted">{role}</p>
              <p className="mt-2 max-w-[62ch] text-sm">{matter}</p>
              {row.projects.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {row.projects.map((p) => (
                    <li key={p.slug} className="text-sm">
                      <Link to="/ledger/$slug" params={{ slug: p.slug }} className="font-bold">
                        {lang !== "en" ? p.nameSw : p.name}
                      </Link>
                      <span className="text-muted">
                        {" "}
                        · {p.county} · {kesShort(p.kes, country)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {row.sources.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {row.sources.map((s, si) => (
                    <li key={`${row.key}-s-${si}`} className="text-xs text-muted">
                      <a href={s.url} target="_blank" rel="noreferrer" className="font-bold text-ink">
                        {s.name}
                      </a>
                      <span className="font-mono"> · {s.published}</span>
                      {" — "}
                      {s.what}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-xs text-muted">{c.namedCitizenNote}</p>
              )}
              {row.reports > 0 ? (
                <p className="mt-2 font-mono text-[11px] text-muted">
                  {row.reports} {c.namedReports}
                </p>
              ) : null}
            </div>
            <p className="font-mono text-2xl tracking-tight text-ghost tabular-nums md:text-right">
              {row.amountKes === 0 ? "—" : kes(row.amountKes, lang, country)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
