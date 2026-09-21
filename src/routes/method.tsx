import { createFileRoute, Link } from "@tanstack/react-router";
import { compiledOn, methodLinks } from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/method")({ component: MethodPage });

function MethodPage() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const constraints = [
    { id: "trust", title: c.constraintTrustT, body: c.constraintTrustB },
    { id: "bandwidth", title: c.constraintBandT, body: c.constraintBandB },
    { id: "access", title: c.constraintA11yT, body: c.constraintA11yB },
    { id: "privacy", title: c.constraintPrivT, body: c.constraintPrivB },
    { id: "language", title: c.constraintLangT, body: c.constraintLangB },
    { id: "local", title: c.constraintLocalT, body: c.constraintLocalB },
    { id: "next", title: c.constraintNextT, body: c.constraintNextB },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{c.osfKicker}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{c.methodTitle}</h1>
      <p className="mt-4 max-w-[62ch] text-muted">{c.methodIntro}</p>
      <p className="mt-4 max-w-[62ch] text-muted">{c.clockDisclaimer}</p>
      <p className="mt-3 font-mono text-xs text-muted">
        {c.lastUpdated} · {compiledOn(country)}
      </p>

      <h2 className="mt-10 text-xl font-bold">{c.constraintTitle}</h2>
      <ol className="mt-6 space-y-8">
        {constraints.map((item, i) => (
          <li key={item.id} id={item.id} className="scroll-mt-24 border-t border-line pt-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 max-w-[62ch] text-muted">{item.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-10 text-xl font-bold">{c.clockMethod}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.recordIntro}</p>
      <p className="mt-3">
        <Link to="/record" className="font-bold">
          {c.ctaRecord}
        </Link>
      </p>

      <h2 className="mt-10 text-xl font-bold">{c.judgesTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.judgesBody}</p>

      <h2 className="mt-10 text-xl font-bold">{c.sourcesTitle}</h2>
      <p className="mt-2 text-sm text-muted">{c.verifyHint}</p>
      <ul className="mt-4 space-y-3">
        {methodLinks(country).map((src) => (
          <li key={src.url}>
            <a href={src.url} target="_blank" rel="noreferrer" className="font-bold">
              {src.name}
            </a>
            <p className="text-sm text-muted">
              {src.published} — {src.what}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-bold">{c.privacyTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.privacyBody}</p>

      <h2 className="mt-10 text-xl font-bold">{c.offlineTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.offlineBody}</p>

      <h2 className="mt-10 text-xl font-bold">{c.scaleTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.scaleBody}</p>

      <h2 className="mt-10 text-xl font-bold">{c.aiTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-muted">{c.aiBody}</p>

      <p className="mt-10">
        <Link to="/act" className="font-bold">
          {c.takeAct}
        </Link>
      </p>
      <p className="mt-10 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
    </main>
  );
}
