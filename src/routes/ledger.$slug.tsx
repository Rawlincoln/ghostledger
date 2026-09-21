import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CopyLetter } from "@/components/ghost/copy-share";
import { ExplainButton } from "@/components/ghost/explain-button";
import { MoneyBar } from "@/components/ghost/money-bar";
import { StatusMark } from "@/components/ghost/status-mark";
import { demoBanner } from "@/lib/ghost/country";
import { atiLetter, formatDate, kes, mapsUrl } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { getProject } from "@/lib/ghost/queries";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/ledger/$slug")({
  loader: async ({ params }) => {
    const data = await getProject({ data: { slug: params.slug } });
    if (!data.project) throw notFound();
    return { project: data.project, reports: data.reports };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <p>That project is not on this ledger.</p>
    </main>
  ),
});

function ProjectPage() {
  const { project: p, reports } = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const lowData = useGhost((s) => s.lowData);
  const c = t(lang, country);
  const unpaid = Math.max(0, p.allocatedKes - p.disbursedKes);
  const letter = atiLetter(
    {
      name: lang !== "en" ? p.nameSw : p.name,
      ward: p.ward,
      county: p.county,
      fy: p.fy,
      allocated: kes(p.allocatedKes, lang, country),
    },
    lang,
    country,
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <p className="text-sm text-muted">
        <Link to="/ledger" className="text-ink">
          {c.ledgerTitle}
        </Link>
        <span aria-hidden> / </span>
        {p.county}
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="max-w-[22ch] text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
          {lang !== "en" ? p.nameSw : p.name}
        </h1>
        <StatusMark status={p.status} />
      </div>
      <p className="mt-2 text-muted">
        {p.ward} · {c.sector[p.sector]} · {p.fy}
      </p>
      <p className="mt-1 text-sm text-muted">{c.statusHint[p.status]}</p>

      <div className="mt-10 grid border-t border-line lg:grid-cols-[1fr_6px_1fr]">
        <section className="pt-8 lg:pr-8">
          <h2 className="text-xl font-bold">{c.paper}</h2>
          <p className="mt-3 max-w-[52ch]">
            {lang !== "en" ? p.paperClaimSw : p.paperClaim}
          </p>
          <p className="mt-4 max-w-[52ch] text-muted">
            <span className="font-bold text-ink">{c.promised}. </span>
            {lang !== "en" ? p.promisedSw : p.promised}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-y-4 border-y border-line py-5">
            <dt className="text-sm text-muted">{c.allocated}</dt>
            <dd className="font-mono text-lg">{kes(p.allocatedKes, lang, country)}</dd>
            <dt className="text-sm text-muted">{c.disbursed}</dt>
            <dd className="font-mono text-lg">{kes(p.disbursedKes, lang, country)}</dd>
            <dt className="text-sm text-muted">{c.unpaid}</dt>
            <dd className="font-mono text-lg">{kes(unpaid, lang, country)}</dd>
            <dt className="text-sm text-muted">{c.contractor}</dt>
            <dd className="text-sm">{p.contractor}</dd>
            <dt className="text-sm text-muted">{c.lastOfficial}</dt>
            <dd className="font-mono text-sm">{formatDate(p.lastOfficial, lang, country)}</dd>
          </dl>
          <div className="mt-4">
            <MoneyBar
              allocated={p.allocatedKes}
              disbursed={p.disbursedKes}
              status={p.status}
              label={`${Math.round((p.disbursedKes / p.allocatedKes) * 100)}% ${c.paidOf}`}
            />
          </div>
          <h3 className="mt-8 text-lg font-bold">{c.sources}</h3>
          <ul className="mt-3 space-y-3">
            {p.sources.map((s) => (
              <li key={s.url + s.name} className="text-sm">
                <a href={s.url} className="font-bold text-ink" target="_blank" rel="noreferrer">
                  {s.name}
                </a>
                <span className="text-muted"> · {s.published}</span>
                <p className="mt-1 text-muted">{s.what}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="tape hidden lg:block" aria-hidden />

        <section className="border-t border-line pt-8 lg:border-t-0 lg:pl-8">
          <h2 className="text-xl font-bold">{c.ground}</h2>
          {!lowData ? (
            <img
              src={p.photo}
              alt={lang !== "en" ? p.groundNoteSw : p.groundNote}
              className="field-photo mt-4 w-full object-cover"
              width={1792}
              height={1008}
            />
          ) : null}
          <p className="mt-4 max-w-[52ch]">
            {lang !== "en" ? p.groundNoteSw : p.groundNote}
          </p>
          <p className="mt-3 font-mono text-xs text-muted">
            {c.coords}: {p.lat.toFixed(4)}, {p.lng.toFixed(4)} · {p.seedReports}{" "}
            {c.colReports.toLowerCase()}
            {p.bountyKes > 0 ? ` · ${c.bountiesTitle} ${kes(p.bountyKes, lang, country)}` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={mapsUrl(p.lat, p.lng)}
              className="inline-flex min-h-11 items-center border border-line px-4 py-2 text-sm text-ink no-underline hover:border-ink"
              target="_blank"
              rel="noreferrer"
            >
              {c.openMaps}
            </a>
            <Link
              to="/report"
              search={{ slug: p.slug }}
              className="inline-flex min-h-11 items-center bg-accent px-4 py-2 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
            >
              {c.fileThis}
            </Link>
          </div>

          <h3 className="mt-10 text-lg font-bold">{c.visits}</h3>
          {reports.length === 0 ? (
            <p className="mt-2 text-sm text-muted">
              {lang === "sw"
                ? "Hakuna ushuhuda uliowekwa katika sesheni hii bado. Idadi ya ziara ya demo ni "
                : "No stamped observations in this session yet. Demo visit count is "}
              {p.seedReports}.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {reports.map((r) => (
                <li key={r.id} className="py-3 text-sm">
                  <p className="font-bold">{r.observation.replace("_", " ")}</p>
                  {r.note ? <p className="text-muted">{r.note}</p> : null}
                  {r.responsible_name ? (
                    <p className="mt-1 text-sm">
                      {c.namedOnProject}: <span className="font-bold">{r.responsible_name}</span>
                      {r.responsible_role ? ` · ${r.responsible_role}` : ""}
                    </p>
                  ) : null}
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {c.hashLabel} {r.evidence_hash}
                    {r.distance_m != null ? ` · ${r.distance_m}m` : ""} ·{" "}
                    {formatDate(r.created_at, lang, country)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-xl font-bold">{c.responsibleTitle}</h2>
        <p className="mt-2 max-w-[62ch] text-sm text-muted">{c.responsibleNote}</p>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {p.responsible.map((office) => (
            <li key={office.office} className="py-4">
              <p className="font-bold">{lang !== "en" ? office.officeSw : office.office}</p>
              <p className="mt-1 max-w-[54ch] text-muted">
                {lang !== "en" ? office.dutySw : office.duty}
              </p>
            </li>
          ))}
        </ul>
        {reports.some((r) => r.responsible_name) ? (
          <p className="mt-4">
            <Link to="/named" className="font-bold">
              {c.namedSeeList}
            </Link>
          </p>
        ) : null}
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-xl font-bold">{c.next}</h2>
        <ul className="mt-5 grid gap-6 md:grid-cols-2">
          {p.nextSteps.map((step) => (
            <li key={step.office} className="border-t border-line pt-4">
              <p className="font-bold">{step.office}</p>
              <p className="mt-2 max-w-[50ch] text-muted">
                {lang !== "en" ? step.actionSw : step.action}
              </p>
              <p className="mt-2 font-mono text-xs">{step.contact}</p>
              <a
                href={step.url}
                className="mt-2 inline-block text-sm font-bold"
                target="_blank"
                rel="noreferrer"
              >
                {step.office}
              </a>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                {step.needs.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-lg font-bold">{c.letterTitle}</h3>
        <CopyLetter text={letter} />
        <div className="mt-8 no-print">
          <ExplainButton slug={p.slug} />
        </div>
        <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
      </section>
    </main>
  );
}
