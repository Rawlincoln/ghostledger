import { createFileRoute, Link } from "@tanstack/react-router";
import { BarList } from "@/components/ghost/bar-list";
import { PaperCertificate } from "@/components/ghost/certificate";
import { MissingClock } from "@/components/ghost/missing-clock";
import { ProjectMap } from "@/components/ghost/project-map";
import { RecoveredFunds } from "@/components/ghost/recovered-funds";
import { StatusMark } from "@/components/ghost/status-mark";
import {
  bountyPool,
  ghostByCounty,
  ghostPaid,
  openBounties,
  paidBySector,
  visitCount,
} from "@/lib/ghost/analytics";
import { inCountry, officeBoard } from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { getClockExtras, listProjects } from "@/lib/ghost/instant";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [projects, extras] = await Promise.all([listProjects(), getClockExtras()]);
    return { projects, extras };
  },
  component: Home,
});

function Home() {
  const { projects: allProjects, extras: extrasByCountry } = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const lowData = useGhost((s) => s.lowData);
  const c = t(lang, country);
  const projects = inCountry(allProjects, country);
  const extras = extrasByCountry[country] ?? {
    citizenConfirmedKes: 0,
    confirmedProjects: 0,
    reportCount: 0,
  };
  const ghosts = projects.filter((p) => p.status === "ghost");
  const featured = ghosts[0] ?? projects[0];
  const missingKes = ghostPaid(projects);
  const pool = bountyPool(projects);
  const visits = visitCount(projects);
  const bounties = openBounties(projects).slice(0, 4);
  const offices = officeBoard(country).slice(0, 5);

  return (
    <main>
      <MissingClock extras={extras} />
      <RecoveredFunds />
      <ProjectMap projects={projects} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-px bg-line md:grid-cols-4">
          <DashStat label={c.dashGhost} value={String(ghosts.length)} />
          <DashStat label={c.dashProjects} value={String(projects.length)} />
          <DashStat label={c.bountyPoolLabel} value={kesShort(pool, country)} />
          <DashStat label={c.dashVisits} value={String(visits)} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{c.officeBoardTitle}</h2>
            <p className="mt-2 max-w-[46ch] text-sm text-muted">{c.officeBoardNote}</p>
            <div className="mt-5">
              <BarList
                rows={offices.map((row) => ({
                  key: row.key,
                  label: lang !== "en" ? row.officeSw : row.office,
                  value: row.value,
                }))}
                tone="ghost"
              />
            </div>
            <p className="mt-4">
              <Link to="/record" className="font-bold">
                {c.ctaRecord}
              </Link>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{c.analyticsCounty}</h2>
            <p className="mt-2 max-w-[46ch] text-sm text-muted">
              {kes(missingKes, lang, country)} {c.missingLabel}.
            </p>
            <div className="mt-5">
              <BarList rows={ghostByCounty(projects)} tone="ghost" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-xl font-bold tracking-tight">{c.analyticsSector}</h2>
          <div className="mt-5 max-w-xl">
            <BarList rows={paidBySector(projects, c)} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-px bg-line md:grid-cols-3">
          <Link to="/bounties" className="bg-canvas p-6 no-underline hover:bg-paper">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              {c.navBounties}
            </p>
            <p className="mt-2 font-bold">
              {kesShort(pool, country)} {c.bountyPoolLabel}
            </p>
            <p className="mt-2 text-sm text-muted">{c.bountiesIntro}</p>
          </Link>
          <Link to="/tour" className="bg-canvas p-6 no-underline hover:bg-paper">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              {c.navTour}
            </p>
            <p className="mt-2 font-bold">{c.tourPlan}</p>
            <p className="mt-2 text-sm text-muted">{c.tourIntro}</p>
          </Link>
          <Link to="/named" className="bg-canvas p-6 no-underline hover:bg-paper">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
              {c.navNamed}
            </p>
            <p className="mt-2 font-bold">{c.namedPageTitle}</p>
            <p className="mt-2 text-sm text-muted">{c.namedPageIntro}</p>
          </Link>
        </div>
      </section>

      {featured ? (
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-6xl md:grid-cols-[1fr_6px_1fr]">
            <PaperCertificate project={featured} lang={lang} />
            <div className="tape hidden md:block" aria-hidden />
            <figure className="field-photo min-h-[280px] bg-ink">
              {!lowData ? (
                <img
                  src={featured.photo}
                  alt={lang !== "en" ? featured.groundNoteSw : featured.groundNote}
                  className="h-full max-h-[520px] w-full object-cover"
                  width={1792}
                  height={1008}
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-end p-6 text-canvas">
                  <p className="max-w-[40ch] text-sm">
                    {lang !== "en" ? featured.groundNoteSw : featured.groundNote}
                  </p>
                </div>
              )}
              <figcaption className="border-t border-line bg-canvas px-5 py-3 text-xs text-muted md:px-6">
                <span className="font-bold text-ink">{c.ground}. </span>
                {lang !== "en" ? featured.groundNoteSw : featured.groundNote}
              </figcaption>
            </figure>
          </div>
          <div className="tape h-1.5 w-full md:hidden" aria-hidden />
        </section>
      ) : null}

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.stripTitle}</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {ghosts.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/ledger/$slug"
                  params={{ slug: p.slug }}
                  className="grid grid-cols-1 gap-1 py-4 no-underline hover:bg-paper md:grid-cols-12 md:items-baseline md:gap-4"
                >
                  <span className="font-bold text-ink md:col-span-5">
                    {lang !== "en" ? p.nameSw : p.name}
                  </span>
                  <span className="text-sm text-muted md:col-span-2">
                    {p.ward}, {p.county}
                  </span>
                  <span className="font-mono text-sm md:col-span-2">
                    {kesShort(p.disbursedKes, country)}
                  </span>
                  <span className="md:col-span-3">
                    <StatusMark status={p.status} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight">{c.bountiesTitle}</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {bounties.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/bounties"
                  className="flex flex-wrap items-baseline justify-between gap-2 py-4 no-underline hover:bg-paper"
                >
                  <span className="font-bold">{lang !== "en" ? p.nameSw : p.name}</span>
                  <span className="font-mono text-sm">{kes(p.bountyKes, lang, country)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
        </div>
      </section>
    </main>
  );
}

function DashStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas px-4 py-5 md:px-6">
      <p className="font-mono text-2xl tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
