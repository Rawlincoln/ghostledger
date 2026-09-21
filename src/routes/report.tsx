import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CopyLetter, CopyShare } from "@/components/ghost/copy-share";
import { namedPeople, inCountry } from "@/lib/ghost/catalog";
import { atiLetter, haversineM, kes, shareObservation, stampHash } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { listProjects, submitReport } from "@/lib/ghost/queries";
import { useGhost } from "@/lib/ghost/store";
import type { Observation } from "@/lib/ghost/types";

type Search = { slug?: string };

export const Route = createFileRoute("/report")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    slug: typeof s.slug === "string" ? s.slug : undefined,
  }),
  loader: () => listProjects(),
  component: ReportPage,
});

function ReportPage() {
  const all = Route.useLoaderData();
  const { slug: qSlug } = Route.useSearch();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const projects = inCountry(all, country);
  const [slug, setSlug] = useState(qSlug ?? "");
  const [observation, setObservation] = useState<Observation | "">("");
  const [note, setNote] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ hash: string; id: number } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [responsibleName, setResponsibleName] = useState("");
  const [responsibleRole, setResponsibleRole] = useState("");

  const project = useMemo(
    () => projects.find((p) => p.slug === slug) ?? null,
    [projects, slug],
  );

  useEffect(() => {
    if (slug && !projects.some((p) => p.slug === slug)) setSlug("");
  }, [projects, slug]);

  const distance =
    project && lat != null && lng != null
      ? Math.round(haversineM(lat, lng, project.lat, project.lng))
      : null;

  const distanceLabel =
    distance == null
      ? null
      : distance <= 150
        ? c.onPlot
        : distance <= 2000
          ? c.nearPlot
          : c.farPlot;

  async function tagGps() {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError(c.gpsUnavailable);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => setGpsError(c.gpsDenied),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!slug) {
      setFormError(c.needProject);
      return;
    }
    if (!observation) {
      setFormError(c.needObs);
      return;
    }
    setBusy(true);
    try {
      const hash = await stampHash([
        slug,
        observation,
        String(lat ?? ""),
        String(lng ?? ""),
        note.trim().slice(0, 280),
        responsibleName.trim(),
        responsibleRole.trim(),
        new Date().toISOString(),
      ]);
      const res = await submitReport({
        data: {
          slug,
          observation,
          lat,
          lng,
          distance_m: distance,
          note: note.trim(),
          evidence_hash: hash,
          responsible_name: responsibleName.trim(),
          responsible_role: responsibleRole.trim(),
        },
      });
      if (!res.ok) {
        setFormError(res.error);
        return;
      }
      const record = {
        id: res.id,
        hash,
        slug,
        observation,
        at: res.created_at,
      };
      localStorage.setItem(`ghostledger-obs-${res.id}`, JSON.stringify(record));
      setDone({ hash, id: res.id });
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const share = project
      ? shareObservation({
          name: lang !== "en" ? project.nameSw : project.name,
          ward: project.ward,
          county: project.county,
          hash: done.hash,
          url:
            typeof window !== "undefined"
              ? `${window.location.origin}/ledger/${project.slug}`
              : "",
        })
      : done.hash;
    const letter = project
      ? atiLetter(
          {
            name: lang !== "en" ? project.nameSw : project.name,
            ward: project.ward,
            county: project.county,
            fy: project.fy,
            allocated: kes(project.allocatedKes, lang, country),
            hash: done.hash,
          },
          lang,
          country,
        )
      : done.hash;
    return (
      <main className="mx-auto max-w-xl px-4 py-12 md:px-6">
        <p className="rubber-stamp text-sm">{c.stamped}</p>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">{c.stamped}</h1>
        <p className="mt-4 text-muted">{c.stampedBody}</p>
        <p className="mt-6 font-mono text-sm break-all">
          {c.hashLabel}: {done.hash}
        </p>
        <p className="mt-2 text-sm text-muted">#{done.id}</p>
        <CopyShare hash={done.hash} shareText={share} />
        {project ? (
          <>
            <h2 className="mt-10 text-lg font-bold">{c.letterTitle}</h2>
            <CopyLetter text={letter} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ledger/$slug"
                params={{ slug: project.slug }}
                className="inline-flex min-h-11 items-center border border-ink px-4 py-2 text-sm font-bold no-underline hover:bg-ink hover:text-canvas"
              >
                {c.openProject}
              </Link>
              <Link
                to="/named"
                className="inline-flex min-h-11 items-center bg-accent px-4 py-2 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
              >
                {c.namedSeeList}
              </Link>
              <Link
                to="/act"
                className="inline-flex min-h-11 items-center border border-ink px-4 py-2 text-sm font-bold no-underline hover:bg-ink hover:text-canvas"
              >
                {c.takeAct}
              </Link>
            </div>
          </>
        ) : (
          <Link
            to="/act"
            className="mt-8 inline-flex min-h-11 items-center bg-accent px-4 py-2 text-sm font-bold text-accent-ink no-underline"
          >
            {c.takeAct}
          </Link>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{c.reportTitle}</h1>
      <p className="mt-3 text-muted">{c.reportIntro}</p>

      <aside className="mt-6 border border-line bg-paper p-4">
        <p className="font-bold">{c.safetyTitle}</p>
        <p className="mt-2 text-sm text-muted">{c.safetyBody}</p>
        <p className="mt-3">
          <Link to="/safe" className="text-sm font-bold">
            {c.navSafe}
          </Link>
        </p>
      </aside>

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.pickProject}</span>
          <select
            className="min-h-11 w-full px-3 py-2"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          >
            <option value="">{c.pickProject}</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {lang !== "en" ? p.nameSw : p.name} ({p.county})
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="mb-2 block text-sm font-bold">{c.observation}</legend>
          <div className="space-y-2">
            {(
              [
                ["not_found", c.obsMissing],
                ["incomplete", c.obsIncomplete],
                ["complete", c.obsComplete],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex min-h-11 items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="observation"
                  value={value}
                  checked={observation === value}
                  onChange={() => setObservation(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.note}</span>
          <textarea
            className="w-full px-3 py-2"
            rows={4}
            maxLength={280}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={c.notePh}
          />
          <span className="mt-1 block text-xs text-muted">{note.length}/280</span>
        </label>

        <div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={tagGps}
              className="min-h-11 border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-canvas"
            >
              {c.useGps}
            </button>
            {lat != null ? (
              <button
                type="button"
                onClick={() => {
                  setLat(null);
                  setLng(null);
                }}
                className="min-h-11 border border-line px-4 py-2 text-sm hover:border-ink"
              >
                {c.skipGps}
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted">{c.gpsHint}</p>
          {lat != null && lng != null ? (
            <p className="mt-2 font-mono text-xs">
              {lat.toFixed(5)}, {lng.toFixed(5)}
              {distance != null ? ` · ${distance}m` : ""}
              {distanceLabel ? ` · ${distanceLabel}` : ""}
            </p>
          ) : null}
          {gpsError ? <p className="mt-2 text-sm text-ghost">{gpsError}</p> : null}
        </div>

        <fieldset className="border border-line bg-paper p-4">
          <legend className="px-1 text-sm font-bold">{c.namedIndicate}</legend>
          <label className="mt-2 block text-sm">
            <span className="mb-1 block font-bold">{c.namedPersonName}</span>
            <input
              list="named-people"
              maxLength={80}
              className="w-full px-3 py-2"
              value={responsibleName}
              onChange={(e) => setResponsibleName(e.target.value)}
              placeholder={c.namedPersonPh}
              autoComplete="off"
            />
            <datalist id="named-people">
              {namedPeople(country).map((p) => (
                <option key={p.name} value={p.name} />
              ))}
            </datalist>
          </label>
          <label className="mt-4 block text-sm">
            <span className="mb-1 block font-bold">{c.namedPersonRole}</span>
            <input
              maxLength={80}
              className="w-full px-3 py-2"
              value={responsibleRole}
              onChange={(e) => setResponsibleRole(e.target.value)}
              placeholder={c.namedRolePh}
            />
          </label>
          <p className="mt-2 text-xs text-muted">{c.namedIndicateHint}</p>
        </fieldset>

        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.photoLocal}</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? null)}
          />
          {photoName ? (
            <span className="mt-1 block text-xs text-muted">{photoName}</span>
          ) : null}
        </label>

        {formError ? <p className="text-sm text-ghost">{formError}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="min-h-12 bg-accent px-5 py-3 text-sm font-bold text-accent-ink hover:brightness-95 disabled:opacity-50"
        >
          {busy ? c.submitting : c.submit}
        </button>
      </form>
    </main>
  );
}
