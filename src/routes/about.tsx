import { Link, createFileRoute } from "@tanstack/react-router";
import { documentedStock, namedPeople, projectsFor } from "@/lib/ghost/catalog";
import { COUNTRIES, countryName, demoBanner, langLabel } from "@/lib/ghost/country";
import { kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const meta = COUNTRIES[country];
  const stock = documentedStock(country);
  const namedCount = namedPeople(country).length;
  const projectCount = projectsFor(country).length;

  const pillars = [
    {
      n: "01",
      title: c.aboutPillarNamed,
      body: c.aboutPillarNamedBody,
      to: "/named" as const,
      cta: c.aboutOpenNamed,
    },
    {
      n: "02",
      title: c.aboutPillarProjects,
      body: c.aboutPillarProjectsBody,
      to: "/ledger" as const,
      cta: c.aboutOpenProjects,
    },
    {
      n: "03",
      title: c.aboutPillarEvidence,
      body: c.aboutPillarEvidenceBody,
      to: "/report" as const,
      cta: c.aboutOpenReport,
    },
  ];

  const constraints = [
    ["trust", c.constraintTrustT, c.constraintTrustB],
    ["bandwidth", c.constraintBandT, c.constraintBandB],
    ["access", c.constraintA11yT, c.constraintA11yB],
    ["privacy", c.constraintPrivT, c.constraintPrivB],
    ["language", c.constraintLangT, c.constraintLangB],
    ["local", c.constraintLocalT, c.constraintLocalB],
    ["next", c.constraintNextT, c.constraintNextB],
  ] as const;

  return (
    <main>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            {c.aboutKicker}
          </p>
          <p className="mt-2 text-sm text-muted">
            {countryName(country, lang)} · {langLabel(lang)} · {c.lastUpdated} {meta.compiled}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <span className="block">{c.aboutSlogan1}</span>
            <span className="block">{c.aboutSlogan2}</span>
            <span className="block">{c.aboutSlogan3}</span>
          </h1>
          <div className="tape mt-8 h-1.5 w-24" aria-hidden />
          <p className="mt-8 max-w-[28ch] text-2xl font-bold tracking-tight md:max-w-[40ch] md:text-3xl">
            {c.aboutLead}
          </p>
          <p className="mt-4 font-mono text-sm tracking-[0.08em] uppercase text-ghost">
            {c.aboutSee}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center bg-accent px-5 py-3 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
            >
              {c.aboutOpenClock}
            </Link>
            <Link
              to="/act"
              className="inline-flex min-h-12 items-center border border-ink px-5 py-3 text-sm font-bold text-ink no-underline hover:bg-ink hover:text-canvas"
            >
              {c.aboutOpenAct}
            </Link>
            <Link
              to="/report"
              className="inline-flex min-h-12 items-center px-5 py-3 text-sm font-bold text-ink no-underline hover:underline"
            >
              {c.aboutOpenReport}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-px bg-line md:grid-cols-3">
          <Link to="/clock" className="bg-canvas px-4 py-5 no-underline hover:bg-paper md:px-6">
            <p className="font-mono text-2xl tabular-nums text-ghost">{kesShort(stock, country)}</p>
            <p className="mt-1 text-sm text-muted">{c.aboutStock}</p>
          </Link>
          <Link to="/named" className="bg-canvas px-4 py-5 no-underline hover:bg-paper md:px-6">
            <p className="font-mono text-2xl tabular-nums">{namedCount}</p>
            <p className="mt-1 text-sm text-muted">{c.aboutPillarNamed}</p>
          </Link>
          <Link to="/ledger" className="bg-canvas px-4 py-5 no-underline hover:bg-paper md:px-6">
            <p className="font-mono text-2xl tabular-nums">{projectCount}</p>
            <p className="mt-1 text-sm text-muted">{c.aboutPillarProjects}</p>
          </Link>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="max-w-[62ch] text-lg">{c.aboutIntro}</p>
          <h2 className="mt-10 text-2xl font-bold tracking-tight">{c.aboutCrisis}</h2>
          <p className="mt-3 max-w-[62ch] text-muted">{c.aboutCrisisBody}</p>
          <h2 className="mt-10 text-2xl font-bold tracking-tight">{c.aboutBuilt}</h2>
          <p className="mt-3 max-w-[62ch] text-muted">{c.aboutBuiltBody}</p>
          <p className="mt-6 max-w-[62ch] text-sm text-muted">{c.privacyFooter}</p>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <ol className="divide-y divide-line border-y border-line">
            {pillars.map((item) => (
              <li key={item.n} className="grid gap-3 py-8 md:grid-cols-[4rem_1fr_auto] md:items-start">
                <span className="font-mono text-sm tabular-nums text-muted">{item.n}</span>
                <div className="min-w-0 max-w-[62ch]">
                  <h2 className="text-xl font-bold tracking-tight">{item.title}</h2>
                  <p className="mt-2 text-muted">{item.body}</p>
                </div>
                <Link
                  to={item.to}
                  className="inline-flex min-h-11 items-center font-bold md:justify-self-end"
                >
                  {item.cta}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{c.osfKicker}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{c.constraintTitle}</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            {constraints.map(([id, title, body], i) => (
              <li key={id} className="border-t border-line pt-4">
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-bold">
                  <Link to="/method" hash={id} className="text-ink">
                    {title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[54ch] text-sm text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <p className="max-w-[70ch] text-sm text-muted">{c.aboutCaution}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/clock" className="font-bold">
              {c.aboutOpenClock}
            </Link>
            <Link to="/record" className="font-bold">
              {c.aboutOpenRecord}
            </Link>
            <Link to="/act" className="font-bold">
              {c.aboutOpenAct}
            </Link>
            <Link to="/method" className="font-bold">
              {c.navMethod}
            </Link>
          </p>
          <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
        </div>
      </section>
    </main>
  );
}
