"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  COUNTRIES,
  COUNTRY_GROUPS,
  countryName,
  groupLabel,
  langLabel,
} from "@/lib/ghost/country";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export function Shell({ children }: { children: React.ReactNode }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const lowData = useGhost((s) => s.lowData);
  const largeText = useGhost((s) => s.largeText);
  const toggleLowData = useGhost((s) => s.toggleLowData);
  const toggleLargeText = useGhost((s) => s.toggleLargeText);
  const setCountry = useGhost((s) => s.setCountry);
  const setLang = useGhost((s) => s.setLang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const c = t(lang, country);
  const meta = COUNTRIES[country];
  const langs = meta.languages;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.country = country;
    document.documentElement.classList.toggle("low-data", lowData);
    document.documentElement.classList.toggle("large-text", largeText);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [lang, country, lowData, largeText]);

  const nav = [
    { to: "/", label: c.navClock },
    { to: "/about", label: c.navAbout },
    { to: "/ledger", label: c.navLedger },
    { to: "/report", label: c.navReport },
    { to: "/named", label: c.navNamed },
    { to: "/bounties", label: c.navBounties },
    { to: "/tour", label: c.navTour },
    { to: "/record", label: c.navRecord },
    { to: "/act", label: c.navAct },
  ] as const;

  function navOn(to: string) {
    if (to === "/") return pathname === "/";
    return pathname === to || pathname.startsWith(`${to}/`);
  }

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <header className="border-b border-line">
        <div className="border-b border-line bg-paper">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase md:px-6">
            <span className="flex flex-wrap items-center gap-2">
              <span>
                {c.vol} · {countryName(country, lang)} · {langLabel(lang)}
              </span>
              <span aria-hidden>·</span>
              <span>
                {c.lastUpdated} {meta.compiled}
              </span>
            </span>
            <span className="truncate">{c.demoShort}</span>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link to="/" className="flex items-baseline gap-3 no-underline">
            <span className="font-mono text-[12px] font-medium tracking-[0.2em] text-ink">
              {c.name.toUpperCase()}
            </span>
            <span className="hidden text-sm text-muted sm:inline">{c.tag}</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleLargeText}
              className="min-h-11 border border-line bg-paper px-3 text-xs text-ink hover:border-ink"
              aria-pressed={largeText}
            >
              {largeText ? c.largeTextOn : c.largeText}
            </button>
            <button
              type="button"
              onClick={toggleLowData}
              className="min-h-11 border border-line bg-paper px-3 text-xs text-ink hover:border-ink"
              aria-pressed={lowData}
            >
              {lowData ? c.lowDataOn : c.lowData}
            </button>
            {langs.length > 1 ? (
              <div
                className="inline-flex min-h-11 items-stretch border border-ink"
                role="radiogroup"
                aria-label={c.constraintLangT}
              >
                {langs.map((id) => {
                  const active = lang === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setLang(id)}
                      className={
                        active
                          ? "min-h-11 px-3 text-xs font-bold text-canvas bg-ink"
                          : "min-h-11 px-3 text-xs text-ink hover:bg-paper"
                      }
                    >
                      {langLabel(id)}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-end gap-x-6 gap-y-2 px-4 pb-3 md:px-6">
          {COUNTRY_GROUPS.map((group) => (
            <div key={group.id} className="min-w-0">
              <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                {groupLabel(group.id, lang)}
              </p>
              <div
                className="inline-flex min-h-11 items-stretch border border-line bg-paper"
                role="radiogroup"
                aria-label={groupLabel(group.id, lang)}
              >
                {group.countries.map((id) => {
                  const item = COUNTRIES[id];
                  const active = country === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={countryName(id, lang)}
                      title={countryName(id, lang)}
                      onClick={() => setCountry(id)}
                      className={
                        active
                          ? "min-h-11 min-w-11 px-2.5 font-mono text-xs font-bold text-accent-ink bg-accent"
                          : "min-h-11 min-w-11 px-2.5 font-mono text-xs text-muted hover:text-ink"
                      }
                    >
                      {item.code}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <nav className="mx-auto flex w-full max-w-6xl min-w-0 gap-x-4 overflow-x-auto whitespace-nowrap px-4 pb-2 text-sm md:px-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                navOn(item.to)
                  ? "inline-flex min-h-11 shrink-0 items-center font-bold text-ink underline decoration-accent decoration-2 underline-offset-4"
                  : "inline-flex min-h-11 shrink-0 items-center text-ink no-underline hover:underline hover:decoration-line hover:underline-offset-4"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <div id="main">{children}</div>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted md:px-6">
          <p className="max-w-[62ch]">{c.footer}</p>
          <p className="mt-3 max-w-[62ch]">{c.privacyFooter}</p>
          <p className="mt-4">
            <Link to="/method" className="font-bold text-ink">
              {c.constraintTitle}
            </Link>
            {" · "}
            <Link to="/about" className="font-bold text-ink">
              {c.navAbout}
            </Link>
            {" · "}
            <Link to="/" className="font-bold text-ink">
              {c.navClock}
            </Link>
            {" · "}
            <Link to="/named" className="font-bold text-ink">
              {c.navNamed}
            </Link>
            {" · "}
            <Link to="/record" className="font-bold text-ink">
              {c.navRecord}
            </Link>
            {" · "}
            <Link to="/act" className="font-bold text-ink">
              {c.navAct}
            </Link>
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-wide">
            GHOSTLEDGER · {meta.code} · {meta.languages.map(langLabel).join("/")} · {c.track.toUpperCase()}
          </p>
        </div>
      </footer>
    </div>
  );
}
