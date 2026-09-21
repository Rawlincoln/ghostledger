import { Link, createFileRoute } from "@tanstack/react-router";
import { CopyLetter } from "@/components/ghost/copy-share";
import { COUNTRIES, countryName } from "@/lib/ghost/country";
import { t } from "@/lib/ghost/i18n";
import { protectionLetter, SAFE_PATH, safeText, type SafeChannel } from "@/lib/ghost/safe-path";
import { useGhost } from "@/lib/ghost/store";

export const Route = createFileRoute("/safe")({ component: SafePathPage });

const KIND_LABEL: Record<
  SafeChannel["kind"],
  "programme" | "court" | "prosecutor" | "police" | "rights" | "aid"
> = {
  programme: "programme",
  court: "court",
  prosecutor: "prosecutor",
  police_watch: "police",
  rights: "rights",
  aid: "aid",
};

function SafePathPage() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const pack = SAFE_PATH[country];
  const meta = COUNTRIES[country];
  const letter = protectionLetter(country, lang);
  const kindLabel = {
    programme: c.safeKindProgramme,
    court: c.safeKindCourt,
    prosecutor: c.safeKindProsecutor,
    police: c.safeKindPolice,
    rights: c.safeKindRights,
    aid: c.safeKindAid,
  } as const;

  const statusWord =
    pack.status === "programme"
      ? c.safeStatusProgramme
      : pack.status === "whistleblower"
        ? c.safeStatusWhistle
        : c.safeStatusCourt;

  const steps = [
    ["01", c.safeLedgerT, c.safeLedgerB],
    ["02", c.safeLawT, safeText(pack.lawNote, lang)],
    ["03", c.safeApplyT, safeText(pack.apply, lang)],
    ["04", c.safeCourtT, safeText(pack.court, lang)],
    ["05", c.safePoliceT, safeText(pack.police, lang)],
    ["06", c.safeIfPoliceT, safeText(pack.ifPolice, lang)],
  ] as const;

  return (
    <main>
      <section className="border-b border-line bg-ink text-canvas">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ghost uppercase">{c.safeKicker}</p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-canvas/60 uppercase">
            {countryName(country, lang)} · {statusWord} · {c.lastUpdated} {meta.compiled}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{c.safeTitle}</h1>
          <p className="mt-5 max-w-[42ch] text-lg font-bold text-canvas">{c.safeLead}</p>
          <p className="mt-4 max-w-[62ch] text-sm text-canvas/75">{c.safeNever}</p>
          <p className="mt-6 font-mono text-sm text-ghost">{c.safeEmergency}: {pack.emergency}</p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{c.safeLawName}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">
            <a href={pack.lawUrl} target="_blank" rel="noreferrer">
              {pack.lawName}
            </a>
          </h2>
          <ol className="mt-8 space-y-8">
            {steps.map(([n, title, body]) => (
              <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line pt-6">
                <span className="font-mono text-sm text-muted">{n}</span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 max-w-[62ch] text-sm text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <h2 className="text-xl font-bold tracking-tight">{c.safeChannelsT}</h2>
          <p className="mt-2 max-w-[62ch] text-sm text-muted">{c.safeChannelsB}</p>
          <ul className="mt-8 space-y-6">
            {pack.channels.map((ch) => (
              <li key={ch.name} className="border-t border-line pt-5">
                <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {kindLabel[KIND_LABEL[ch.kind]]}
                </p>
                <h3 className="mt-1 text-lg font-bold">
                  <a href={ch.url} target="_blank" rel="noreferrer">
                    {ch.name}
                  </a>
                </h3>
                <p className="mt-2 max-w-[54ch] text-sm text-muted">
                  {lang === "fr" ? ch.fr : lang === "sw" ? ch.sw : ch.en}
                </p>
                <p className="mt-2 font-mono text-xs break-all">{ch.contact}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <h2 className="text-xl font-bold tracking-tight">{c.safeLetterT}</h2>
          <p className="mt-2 max-w-[62ch] text-sm text-muted">{c.safeLetterHint}</p>
          <CopyLetter text={letter} />
          <p className="mt-8 max-w-[62ch] text-sm text-muted">{c.safeLimitB}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/report"
              className="inline-flex min-h-11 items-center bg-accent px-4 py-2 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
            >
              {c.ctaReport}
            </Link>
            <Link
              to="/act"
              className="inline-flex min-h-11 items-center border border-ink px-4 py-2 text-sm font-bold no-underline hover:bg-ink hover:text-canvas"
            >
              {c.navAct}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
