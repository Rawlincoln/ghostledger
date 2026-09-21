import { Link, createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { BountyMark } from "@/components/ghost/bounty-mark";
import { EscrowTrack } from "@/components/ghost/escrow-track";
import { formatDate, isPast, kes, timeLeft } from "@/lib/ghost/format";
import { guestName } from "@/lib/ghost/guest";
import { t } from "@/lib/ghost/i18n";
import { listProjects } from "@/lib/ghost/queries";
import { demoBanner } from "@/lib/ghost/country";
import { useGhost } from "@/lib/ghost/store";
import {
  addDemoTourVisit,
  getTour,
  logTourVisit,
  reclaimTour,
  reviewTourVisit,
} from "@/lib/ghost/tours";
import { useGuestId } from "@/lib/ghost/use-guest";

export const Route = createFileRoute("/tour/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw notFound();
    const [data, projects] = await Promise.all([getTour({ data: { id } }), listProjects()]);
    if (!data.tour) throw notFound();
    return { ...data, projects };
  },
  component: TourDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p>That audit tour is not on this board.</p>
    </main>
  ),
});

function TourDetail() {
  const { tour: row, visits, projects } = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const guestId = useGuestId();
  const router = useRouter();
  const [findings, setFindings] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [stopSlug, setStopSlug] = useState(row.projectSlugs[0] ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const isOwner = Boolean(guestId && guestId === row.plannerUserId);
  const ended = row.status === "open" && isPast(row.deadline);
  const canLog = Boolean(guestId && !isOwner && row.status === "open" && !ended);
  const already = visits.some((v) => v.loggerUserId === guestId && v.status === "pending");
  const pending = visits.some((v) => v.status === "pending");
  const title = lang !== "en" ? row.titleSw : row.title;
  const linked = projects.filter((p) => row.projectSlugs.includes(p.slug));

  async function refresh() {
    await router.invalidate();
  }

  async function onLog(e: React.FormEvent) {
    e.preventDefault();
    if (!guestId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await logTourVisit({
        data: {
          tourId: row.id,
          findings,
          videoUrl,
          projectSlug: stopSlug || null,
          loggerName: guestName(),
          guestId,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setFindings("");
      setVideoUrl("");
      setNote(c.tourLogged);
      await refresh();
    } catch {
      setError(c.loginError);
    } finally {
      setBusy(false);
    }
  }

  async function onReview(visitId: number, accept: boolean) {
    if (!guestId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await reviewTourVisit({
        data: { tourId: row.id, visitId, accept, guestId },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setNote(res.released ? c.tourReleased : c.bountyReject);
      await refresh();
    } catch {
      setError(c.loginError);
    } finally {
      setBusy(false);
    }
  }

  async function onDemo() {
    if (!guestId) return;
    setBusy(true);
    try {
      const res = await addDemoTourVisit({ data: { tourId: row.id, guestId } });
      if (!res.ok) setError(res.error);
      else await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function onReclaim() {
    if (!guestId) return;
    setBusy(true);
    try {
      const res = await reclaimTour({ data: { tourId: row.id, guestId } });
      if (!res.ok) setError(res.error);
      else await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <p className="text-sm text-muted">
        <Link to="/tour" className="text-ink">
          {c.tourTitle}
        </Link>
        <span aria-hidden> / </span>
        {row.county}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-start">
        <div>
          {row.status === "paid" ? (
            <p className="font-mono text-[11px] tracking-[0.14em] text-verified uppercase">
              {c.tourAwarded}
            </p>
          ) : (
            <BountyMark status={row.status} deadline={row.deadline} />
          )}
          <h1 className="mt-3 max-w-[28ch] text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-muted">
            {row.plannerName} · {c.bountyPostedOn} {formatDate(row.createdAt, lang, country)}
          </p>

          <div className="mt-6 lg:hidden">
            <p className="font-mono text-3xl tracking-tight text-verified tabular-nums">
              {kes(row.budgetKes, lang, country)}
            </p>
            <p className="mt-1 text-sm text-muted">
              {c.tourEscrow}: {kes(row.escrowKes, lang, country)}
            </p>
          </div>

          <div className="mt-8">
            <EscrowTrack status={row.status} pending={pending} c={c} />
          </div>

          {row.status === "paid" ? (
            <p className="mt-6 max-w-[62ch] text-muted">{c.tourAwardedBody}</p>
          ) : (
            <p className="mt-6 max-w-[62ch] text-muted">{c.tourOpenBody}</p>
          )}

          <h2 className="mt-10 text-lg font-bold">{c.tourInvestigation}</h2>
          <p className="mt-2 max-w-[62ch]">{row.investigation}</p>

          {linked.length > 0 ? (
            <>
              <h2 className="mt-8 text-lg font-bold">{c.tourStops}</h2>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {linked.map((p) => (
                  <li key={p.slug} className="py-3">
                    <Link
                      to="/ledger/$slug"
                      params={{ slug: p.slug }}
                      className="font-bold"
                    >
                      {lang !== "en" ? p.nameSw : p.name}
                    </Link>
                    <p className="text-sm text-muted">
                      {p.ward} · {p.county} · {kes(p.disbursedKes, lang, country)} {c.paidOf}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {note ? <p className="mt-6 font-bold">{note}</p> : null}
          {error ? <p className="mt-4 text-sm text-ghost">{error}</p> : null}

          {isOwner && row.status === "open" && ended ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onReclaim()}
              className="mt-6 min-h-11 border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-canvas disabled:opacity-50"
            >
              {c.tourReclaim}
            </button>
          ) : null}

          {isOwner && row.status === "open" && !ended ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onDemo()}
              className="mt-6 min-h-11 border border-line px-4 py-2 text-sm font-bold hover:border-ink disabled:opacity-50"
            >
              {c.tourDemoVisit}
            </button>
          ) : null}

          {canLog && !already ? (
            <form id="visit" className="mt-8 scroll-mt-24 space-y-4 border-t border-line pt-8" onSubmit={onLog}>
              <h2 className="text-lg font-bold">{c.tourLog}</h2>
              {linked.length > 0 ? (
                <label className="block text-sm">
                  <span className="mb-1 block font-bold">{c.tourLinkStop}</span>
                  <select
                    className="w-full px-3 py-2"
                    value={stopSlug}
                    onChange={(e) => setStopSlug(e.target.value)}
                  >
                    {linked.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {lang !== "en" ? p.nameSw : p.name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label className="block text-sm">
                <span className="mb-1 block font-bold">{c.tourFindings}</span>
                <textarea
                  required
                  maxLength={800}
                  rows={4}
                  className="w-full px-3 py-2"
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder={c.tourFindingsPh}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-bold">{c.tourVideo}</span>
                <input
                  required
                  type="url"
                  className="w-full px-3 py-2 font-mono text-sm"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder={c.tourVideoPh}
                />
                <span className="mt-1 block text-xs text-muted">{c.tourVideoHint}</span>
              </label>
              <button
                type="submit"
                disabled={busy}
                className="min-h-11 bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:brightness-95 disabled:opacity-50"
              >
                {busy ? "…" : c.tourLog}
              </button>
            </form>
          ) : null}

          <h2 className="mt-10 text-lg font-bold">{c.tourVisits}</h2>
          {visits.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{c.tourNoneVisits}</p>
          ) : (
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {visits.map((v) => (
                <li key={v.id} className="py-4">
                  <p className="font-bold">{v.loggerName}</p>
                  <p className="mt-1 text-muted">{v.findings}</p>
                  <p className="mt-2">
                    <a
                      href={v.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold"
                    >
                      {c.tourVideo}
                    </a>
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {v.status} · {formatDate(v.createdAt, lang, country)}
                    {v.projectSlug ? ` · ${v.projectSlug}` : ""}
                  </p>
                  {isOwner && row.status === "open" && v.status === "pending" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onReview(v.id, true)}
                        className="min-h-11 bg-accent px-4 py-2 text-sm font-bold text-accent-ink disabled:opacity-50"
                      >
                        {c.tourAccept}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onReview(v.id, false)}
                        className="min-h-11 border border-ink px-4 py-2 text-sm font-bold disabled:opacity-50"
                      >
                        {c.tourReject}
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="hidden border border-line bg-paper p-5 lg:block">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            {c.tourBudget}
          </p>
          <p className="mt-2 font-mono text-3xl tracking-tight text-verified tabular-nums">
            {kes(row.budgetKes, lang, country)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {c.tourEscrow}: {kes(row.escrowKes, lang, country)}
          </p>
          <p className="mt-3 font-mono text-xs text-muted">{timeLeft(row.deadline, lang)}</p>
          <p className="mt-1 font-mono text-xs text-muted">
            {row.visitCount} {c.tourVisits}
          </p>
          {canLog && !already ? (
            <a
              href="#visit"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center bg-accent px-4 text-sm font-bold text-accent-ink no-underline hover:brightness-95"
            >
              {c.tourLog}
            </a>
          ) : null}
        </aside>
      </div>
      <p className="mt-10 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
    </main>
  );
}
