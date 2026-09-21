"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { compiledOn, clockValueFor, documentedStock, perSecond, tickAmount } from "@/lib/ghost/catalog";
import { currencyCode, kes, kesDigits, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import type { Lang } from "@/lib/ghost/types";

export type ClockExtras = {
  citizenConfirmedKes: number;
  confirmedProjects: number;
  reportCount: number;
};

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => setNow(Date.now()), reduced ? 1000 : 80);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function MissingClock({ extras }: { extras: ClockExtras }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const now = useNow();
  const opened = useRef<number | null>(null);
  useEffect(() => {
    if (opened.current === null) opened.current = Date.now();
  }, []);
  const openedAt = opened.current ?? now;

  const total = clockValueFor(country, now, extras.citizenConfirmedKes);
  const since = Math.max(0, total - clockValueFor(country, openedAt, extras.citizenConfirmedKes));
  const elapsedSec = Math.max(0, Math.floor((now - openedAt) / 1000));
  const stock = documentedStock(country);
  const tick = tickAmount(country, now);
  const perSec = perSecond(country);

  return (
    <section className="clock-alarm border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex max-w-full flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-ghost uppercase">
            <span className="live-dot live-dot-fast" aria-hidden />
            {c.clockLive} · {c.clockAlarmKicker}
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-canvas/70 uppercase">
            {c.demoShort} · {compiledOn(country)}
          </span>
        </div>
        <p className="mt-8 font-mono text-xs tracking-[0.28em] text-ghost uppercase md:text-sm">
          {currencyCode(lang, country)}
        </p>
        <p
          suppressHydrationWarning
          aria-live="polite"
          className="clock-digits mt-2 font-mono leading-none font-medium tracking-tight tabular-nums"
        >
          {kesDigits(total, country)}
        </p>
        <h1 className="mt-6 max-w-[22ch] text-xl font-bold tracking-tight text-canvas md:text-2xl">
          {c.clockAlarmTitle}
        </h1>
        <p className="mt-2 max-w-[62ch] text-sm text-canvas/75">{c.clockNotDebt}</p>
      </div>
      <div className="h-2 w-full bg-ghost" aria-hidden />
      <div className="grid gap-px bg-ink md:grid-cols-3">
        <ClockStat
          label={c.clockSince}
          value={kes(since, lang, country)}
          hint={`${elapsedSec} ${c.seconds}`}
          pulse={since > 0}
        />
        <ClockStat
          label={c.clockPerSecond}
          value={perSec ? kes(perSec, lang, country) : "—"}
          hint={perSec ? c.clockTickLabel : c.clockStock}
        />
        <ClockStat
          label={c.clockCitizen}
          value={kes(extras.citizenConfirmedKes, lang, country)}
          hint={`${extras.reportCount} ${c.dashVisits.toLowerCase()}`}
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <ul className="grid gap-3 text-sm md:grid-cols-3">
          <li className="flex items-baseline justify-between gap-4 border-b border-white/15 py-2">
            <span>{c.clockStock}</span>
            <span className="font-mono tabular-nums">{kesShort(stock, country)}</span>
          </li>
          <li className="flex items-baseline justify-between gap-4 border-b border-white/15 py-2">
            <span>{c.clockTickLabel}</span>
            <span className="font-mono tabular-nums" suppressHydrationWarning>
              {tick ? kesShort(tick, country) : "—"}
            </span>
          </li>
          <li className="flex items-baseline justify-between gap-4 border-b border-white/15 py-2">
            <span>{c.clockCitizen}</span>
            <span className="font-mono tabular-nums">{kesShort(extras.citizenConfirmedKes, country)}</span>
          </li>
        </ul>
        <p className="mt-6 max-w-[70ch] text-sm text-canvas/70">{c.clockDisclaimer}</p>
        <p className="mt-3 max-w-[70ch] text-sm text-canvas/70">{c.sourcesCredit}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/record"
            className="inline-flex min-h-12 items-center bg-ghost px-5 py-3 text-sm font-bold text-canvas no-underline hover:brightness-110"
          >
            {c.ctaRecord}
          </Link>
          <Link
            to="/report"
            className="inline-flex min-h-12 items-center border border-canvas px-5 py-3 text-sm font-bold text-canvas no-underline hover:bg-canvas hover:text-ink"
          >
            {c.ctaReport}
          </Link>
          <Link
            to="/method"
            className="inline-flex min-h-12 items-center px-5 py-3 text-sm font-bold text-canvas no-underline hover:underline"
          >
            {c.clockMethod}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClockStat({
  label,
  value,
  hint,
  pulse,
}: {
  label: string;
  value: string;
  hint: string;
  pulse?: boolean;
}) {
  return (
    <div className="bg-ink px-4 py-5 text-canvas md:px-6">
      <p className="font-mono text-[11px] tracking-[0.14em] text-canvas/55 uppercase">{label}</p>
      <p
        suppressHydrationWarning
        className={`mt-2 font-mono text-xl tracking-tight tabular-nums md:text-2xl ${pulse ? "text-ghost" : ""}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-canvas/55">{hint}</p>
    </div>
  );
}

export function SourceLine({
  name,
  url,
  published,
  what,
  lang,
}: {
  name: string;
  url: string;
  published: string;
  what: string;
  lang: Lang;
}) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="text-sm">
      <span className="font-bold">{name}</span>
      <span className="text-muted">
        {" "}
        · {published} · {what}
      </span>
    </a>
  );
}
