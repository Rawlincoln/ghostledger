"use client";

import { documentedStock, recoveredItems, recoveredStock } from "@/lib/ghost/catalog";
import { kes, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export function RecoveredFunds() {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const items = recoveredItems(country);
  const recovered = recoveredStock(country);
  const missing = documentedStock(country);
  const pair = recovered + missing;
  const recPct = pair > 0 ? (recovered / pair) * 100 : 0;

  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.16em] text-verified uppercase">{c.recoveredKicker}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{c.recoveredTitle}</h2>
        <p className="mt-3 max-w-[62ch] text-muted">{c.recoveredIntro}</p>

        <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
          <div className="bg-canvas px-4 py-5 md:px-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-ghost uppercase">{c.recoveredStill}</p>
            <p className="mt-2 font-mono text-3xl tracking-tight tabular-nums text-ghost">{kesShort(missing, country)}</p>
            <p className="mt-1 text-sm text-muted">{kes(missing, lang, country)}</p>
          </div>
          <div className="bg-canvas px-4 py-5 md:px-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-verified uppercase">{c.recoveredBack}</p>
            <p className="mt-2 font-mono text-3xl tracking-tight tabular-nums text-verified">
              {recovered ? kesShort(recovered, country) : "—"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {recovered ? kes(recovered, lang, country) : c.recoveredEmpty}
            </p>
          </div>
        </div>

        {pair > 0 ? (
          <div className="mt-6">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{c.recoveredVs}</p>
            <div className="mt-2 flex h-3 w-full bg-ghost" aria-hidden>
              <div className="h-full bg-verified" style={{ width: `${Math.max(recPct, recovered ? 0.4 : 0)}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">
              {c.recoveredShare} {recPct < 1 && recovered ? "<1%" : `${recPct.toFixed(1)}%`}
            </p>
          </div>
        ) : null}

        {items.length ? (
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.id} className="grid gap-2 py-6 md:grid-cols-[8rem_1fr]">
                <p className="font-mono text-lg tabular-nums text-verified">{kesShort(item.amountKes, country)}</p>
                <div className="min-w-0">
                  <h3 className="font-bold tracking-tight">{lang === "en" ? item.title : item.titleSw}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {lang === "en" ? item.office : item.officeSw} · {item.period} · {c.recoveredKind[item.kind]}
                  </p>
                  <p className="mt-2 max-w-[62ch] text-sm">{lang === "en" ? item.summary : item.summarySw}</p>
                  <p className="mt-2 text-sm">
                    {item.sources.map((src, i) => (
                      <span key={src.url}>
                        {i > 0 ? " · " : null}
                        <a href={src.url} target="_blank" rel="noreferrer" className="font-bold">
                          {src.name}
                        </a>
                        <span className="text-muted"> {src.published}</span>
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-8 max-w-[62ch] border-t border-line pt-6 text-sm text-muted">{c.recoveredEmpty}</p>
        )}
      </div>
    </section>
  );
}
