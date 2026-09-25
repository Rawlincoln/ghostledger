import { createFileRoute, Link, Outlet, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MoneyBar } from "@/components/ghost/money-bar";
import { StatusMark } from "@/components/ghost/status-mark";
import { inCountry, regionsFor } from "@/lib/ghost/catalog";
import { demoBanner } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { listProjects } from "@/lib/ghost/instant";
import { SECTORS } from "@/lib/ghost/seed";
import { useGhost } from "@/lib/ghost/store";
import type { ProjectStatus, Sector } from "@/lib/ghost/types";

export const Route = createFileRoute("/ledger")({
  loader: () => listProjects(),
  component: LedgerLayout,
});

function LedgerLayout() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  if (slug) return <Outlet />;
  return <Ledger />;
}

function Ledger() {
  const all = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const projects = inCountry(all, country);
  const regions = regionsFor(country);
  const [q, setQ] = useState("");
  const [county, setCounty] = useState("");
  const [sector, setSector] = useState<"" | Sector>("");
  const [status, setStatus] = useState<"" | ProjectStatus>("");

  useEffect(() => {
    setCounty("");
  }, [country]);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (county && p.county !== county) return false;
      if (sector && p.sector !== sector) return false;
      if (status && p.status !== status) return false;
      if (!query) return true;
      const hay = `${p.name} ${p.nameSw} ${p.ward} ${p.county} ${p.contractor}`.toLowerCase();
      return hay.includes(query);
    });
  }, [projects, q, county, sector, status]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{c.ledgerTitle}</h1>
      <p className="mt-3 max-w-[60ch] text-muted">{c.ledgerIntro}</p>

      <form className="mt-6 grid gap-3 md:grid-cols-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">{c.search}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="min-h-11 w-full px-3 py-2"
            placeholder={c.search}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">{c.colCounty}</span>
          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="min-h-11 w-full px-3 py-2"
          >
            <option value="">{c.allCounties}</option>
            {regions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">{c.allSectors}</span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as "" | Sector)}
            className="min-h-11 w-full px-3 py-2"
          >
            <option value="">{c.allSectors}</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {c.sector[s]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">{c.colStatus}</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "" | ProjectStatus)}
            className="min-h-11 w-full px-3 py-2"
          >
            <option value="">{c.allStatus}</option>
            {(["ghost", "incomplete", "delayed", "verified"] as const).map((s) => (
              <option key={s} value={s}>
                {c.status[s]}
              </option>
            ))}
          </select>
        </label>
      </form>

      <p className="mt-4 font-mono text-xs text-muted">
        {rows.length} / {projects.length}
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 text-muted">{c.empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {rows.map((p) => (
            <li key={p.slug}>
              <Link
                to="/ledger/$slug"
                params={{ slug: p.slug }}
                className="grid grid-cols-1 gap-2 py-4 no-underline hover:bg-paper md:grid-cols-12 md:items-center md:gap-4"
              >
                <span className="md:col-span-4">
                  <span className="block font-bold text-ink">
                    {lang !== "en" ? p.nameSw : p.name}
                  </span>
                  <span className="text-sm text-muted">
                    {p.ward} · {c.sector[p.sector]} · {p.fy}
                  </span>
                </span>
                <span className="text-sm md:col-span-2">{p.county}</span>
                <span className="md:col-span-3">
                  <span className="block font-mono text-sm">{kes(p.allocatedKes, lang, country)}</span>
                  <MoneyBar
                    allocated={p.allocatedKes}
                    disbursed={p.disbursedKes}
                    status={p.status}
                    label={`${kesShort(p.disbursedKes, country)} ${c.paidOf}`}
                  />
                </span>
                <span className="flex items-center justify-between gap-3 md:col-span-3">
                  <StatusMark status={p.status} />
                  <span className="font-mono text-xs text-muted">{p.seedReports}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
    </main>
  );
}
