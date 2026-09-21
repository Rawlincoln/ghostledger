import { createFileRoute, Link } from "@tanstack/react-router";
import { BarList } from "@/components/ghost/bar-list";
import { SourceLine } from "@/components/ghost/missing-clock";
import {
  administrations,
  clockCallout,
  courtEvents,
  inClock,
  officeBoard,
  outOfClock,
} from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t, type Copy } from "@/lib/ghost/i18n";
import type { MoneyItem } from "@/lib/ghost/record";
import { useGhost } from "@/lib/ghost/store";
import type { Lang } from "@/lib/ghost/types";

export const Route = createFileRoute("/record")({
  component: RecordPage,
});

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

function RecordPage() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const offices = officeBoard(country);
  const clocked = inClock(country);
  const excluded = outOfClock(country);
  const dismissed = clockCallout(country);
  const admins = administrations(country);
  const events = courtEvents(country);

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.recordTitle}</h1>
          <p className="mt-4 max-w-[70ch] text-muted">{c.recordIntro}</p>
          <p className="mt-3 max-w-[70ch] text-sm text-muted">{c.sourcesCredit}</p>
        </div>
      </section>

      {dismissed ? (
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.dismissedTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-muted">
            {lang !== "en" ? dismissed.summarySw : dismissed.summary}
          </p>
          <ul className="mt-4 space-y-1">
            {dismissed.sources.map((s, i) => (
                <li key={`dismissed-${i}`}>
                  <SourceLine {...s} lang={lang} />
                </li>
              ))}
          </ul>
        </div>
      </section>
      ) : null}

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.missingTitle}</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {clocked.map((item) => (
              <MoneyRow key={item.id} item={item} lang={lang} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.excludedTitle}</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {excluded.map((item) => (
              <MoneyRow key={item.id} item={item} lang={lang} c={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.officeBoardTitle}</h2>
          <p className="mt-3 max-w-[62ch] text-muted">{c.officeBoardNote}</p>
          <div className="mt-6 max-w-3xl">
            <BarList
              rows={offices.map((row) => ({
                key: row.key,
                label: lang !== "en" ? row.officeSw : row.office,
                value: row.value,
              }))}
              tone="ghost"
            />
          </div>
        </div>
      </section>

      {admins.length > 0 ? (
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.adminTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-muted">{c.adminNote}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-line font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                <tr>
                  <th className="py-3 pr-4 font-medium">{c.colName}</th>
                  <th className="py-3 pr-4 font-medium">{c.colPeriod}</th>
                  <th className="py-3 pr-4 text-right font-medium">{c.colAdded}</th>
                  <th className="py-3 font-medium">{c.sources}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {admins.map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 pr-4 font-bold">{row.name}</td>
                    <td className="py-3 pr-4 text-muted">
                      {row.period} · {row.years} yrs
                    </td>
                    <td className="py-3 pr-4 text-right font-mono tabular-nums">
                      +{kesShort(row.addedKes, country)}
                    </td>
                    <td className="py-3">
                      {row.sources.map((s, i) => (
                        <div key={`${row.name}-src-${i}`}>
                          <a href={s.url} target="_blank" rel="noreferrer" className="font-bold">
                            {s.name}
                          </a>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      ) : (
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.adminTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-muted">{c.adminNote}</p>
        </div>
      </section>
      )}

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.namedPageTitle}</h2>
          <p className="mt-3 max-w-[70ch] text-muted">{c.namedPageIntro}</p>
          <p className="mt-4">
            <Link to="/named" className="font-bold">
              {c.namedSeeList}
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.courtTitle}</h2>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {events.map((ev) => (
              <li key={ev.id} className="grid gap-2 py-5 md:grid-cols-12 md:items-baseline">
                <p className="font-mono text-sm tabular-nums md:col-span-2">{ev.date}</p>
                <div className="md:col-span-10">
                  <p className="font-bold">{lang !== "en" ? ev.titleSw : ev.title}</p>
                  <p className="mt-1 max-w-[70ch] text-sm text-muted">
                    {lang !== "en" ? ev.effectSw : ev.effect}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {ev.sources.map((s) => (
                      <li key={s.url}>
                        <SourceLine {...s} lang={lang} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="max-w-[70ch] text-sm text-muted">{c.clockDisclaimer}</p>
          <p className="mt-6">
            <Link to="/method" className="font-bold">
              {c.clockMethod}
            </Link>
            {" · "}
            <Link to="/report" className="font-bold">
              {c.ctaReport}
            </Link>
          </p>
          <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
        </div>
      </section>
    </main>
  );
}

function MoneyRow({ item, lang, c }: { item: MoneyItem; lang: Lang; c: Copy }) {
  const country = useGhost((s) => s.country);
  return (
    <article className="grid gap-3 py-6 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          {kindLabel(item.kind, c)} · {item.period}
        </p>
        <h3 className="mt-1 text-lg font-bold">
          {lang !== "en" ? item.titleSw : item.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-sm text-muted">
          {lang !== "en" ? item.summarySw : item.summary}
        </p>
        {item.courtNote ? (
          <p className="mt-2 max-w-[62ch] text-sm">
            {lang !== "en" ? item.courtNoteSw : item.courtNote}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted">
          {lang !== "en" ? item.officeSw : item.office}
        </p>
      </div>
      <div className="md:col-span-5">
        <p className="font-mono text-2xl tracking-tight tabular-nums">
          {item.amountKes === 0 ? "—" : kes(item.amountKes, lang, country)}
        </p>
        <ul className="mt-3 space-y-2">
          {item.sources.map((s, i) => (
            <li key={`${item.id}-${i}`}>
              <SourceLine {...s} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
