"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { MAP_VIEW } from "@/lib/ghost/country";
import { kes, kesShort } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import type { Project, ProjectStatus } from "@/lib/ghost/types";
import { StatusMark } from "./status-mark";

function cssTone(status: ProjectStatus): string {
  const root = getComputedStyle(document.documentElement);
  const key =
    status === "ghost" ? "--color-ghost" : status === "verified" ? "--color-verified" : "--color-delayed";
  return root.getPropertyValue(key).trim();
}

export function ProjectMap({ projects }: { projects: Project[] }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const lowData = useGhost((s) => s.lowData);
  const c = t(lang, country);
  const [picked, setPicked] = useState<string | null>(null);
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{
    map: import("leaflet").Map;
    marks: Map<string, import("leaflet").CircleMarker>;
  } | null>(null);

  const selected = useMemo(
    () => projects.find((p) => p.slug === picked) ?? null,
    [picked, projects],
  );

  useEffect(() => {
    setPicked(null);
  }, [country]);

  useEffect(() => {
    if (lowData || !host.current || !projects.length) return;
    let dead = false;
    const hostEl = host.current;

    async function boot() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (dead || !hostEl) return;
      hostEl.replaceChildren();
      const view = MAP_VIEW[country];
      const map = L.map(hostEl, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
      }).setView(view.center, view.zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);
      const marks = new Map<string, import("leaflet").CircleMarker>();
      const bounds = L.latLngBounds([]);
      for (const p of projects) {
        const color = cssTone(p.status);
        const mark = L.circleMarker([p.lat, p.lng], {
          radius: 8,
          color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.85,
        }).addTo(map);
        mark.bindTooltip(lang === "en" ? p.name : p.nameSw, { direction: "top" });
        mark.on("click", () => setPicked(p.slug));
        marks.set(p.slug, mark);
        bounds.extend([p.lat, p.lng]);
      }
      if (projects.length > 1 && bounds.isValid()) {
        map.fitBounds(bounds.pad(0.18), { maxZoom: 11 });
      }
      requestAnimationFrame(() => map.invalidateSize());
      mapRef.current = { map, marks };
    }

    void boot();
    return () => {
      dead = true;
      mapRef.current?.map.remove();
      mapRef.current = null;
    };
  }, [country, lang, lowData, projects]);

  useEffect(() => {
    const pack = mapRef.current;
    if (!pack) return;
    for (const [slug, mark] of pack.marks) {
      const on = slug === picked;
      mark.setRadius(on ? 12 : 8);
      mark.setStyle({ weight: on ? 3 : 2 });
    }
    if (picked) {
      const mark = pack.marks.get(picked);
      if (mark) pack.map.panTo(mark.getLatLng(), { animate: true });
    }
  }, [picked]);

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{c.mapKicker}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{c.mapTitle}</h2>
        <p className="mt-3 max-w-[62ch] text-muted">{c.mapIntro}</p>
        <div className="mt-6 grid gap-px bg-line lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
          {lowData || !projects.length ? (
            <div className="project-map flex items-end bg-paper p-6">
              <p className="max-w-[46ch] text-sm text-muted">
                {lowData ? c.mapLowData : c.mapEmpty}
              </p>
            </div>
          ) : (
            <div ref={host} className="project-map z-0 max-w-full overflow-hidden bg-paper" role="application" aria-label={c.mapTitle} />
          )}
          <aside className="bg-canvas p-5">
            {selected ? (
              <div>
                <StatusMark status={selected.status} />
                <h3 className="mt-3 text-lg font-bold tracking-tight">
                  {lang === "en" ? selected.name : selected.nameSw}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {selected.ward}, {selected.county} · {selected.fy}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4 border-b border-line py-1">
                    <dt className="text-muted">{c.allocated}</dt>
                    <dd className="font-mono tabular-nums">{kes(selected.allocatedKes, lang, country)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line py-1">
                    <dt className="text-muted">{c.disbursed}</dt>
                    <dd className="font-mono tabular-nums">{kes(selected.disbursedKes, lang, country)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm">
                  {lang === "en" ? selected.groundNote : selected.groundNoteSw}
                </p>
                <p className="mt-4">
                  <Link
                    to="/ledger/$slug"
                    params={{ slug: selected.slug }}
                    className="inline-flex min-h-11 items-center font-bold"
                  >
                    {c.mapOpen}
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold">{c.mapPick}</p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {projects.slice(0, 6).map((p) => (
                    <li key={p.slug}>
                      <button
                        type="button"
                        onClick={() => {
                          setPicked(p.slug);
                          const mark = mapRef.current?.marks.get(p.slug);
                          if (mark) {
                            mapRef.current?.map.setView(mark.getLatLng(), Math.max(mapRef.current.map.getZoom(), 12));
                          }
                        }}
                        className="flex min-h-11 w-full items-baseline justify-between gap-3 py-3 text-left"
                      >
                        <span className="min-w-0 truncate font-bold">{lang === "en" ? p.name : p.nameSw}</span>
                        <span className="shrink-0 font-mono text-sm tabular-nums">
                          {kesShort(p.disbursedKes, country)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted">
          {c.mapLegendGhost} · {c.mapLegendIncomplete} · {c.mapLegendVerified}
        </p>
      </div>
    </section>
  );
}
