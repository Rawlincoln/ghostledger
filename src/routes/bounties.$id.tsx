import { Link, createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { BountyMark } from "@/components/ghost/bounty-mark";
import { EscrowTrack } from "@/components/ghost/escrow-track";
import {
  addDemoSubmission,
  getBounty,
  reclaimBounty,
  reviewSubmission,
  submitBounty,
} from "@/lib/ghost/bounties";
import { formatDate, isPast, kes, timeLeft } from "@/lib/ghost/format";
import { guestName } from "@/lib/ghost/guest";
import { t } from "@/lib/ghost/i18n";
import { demoBanner } from "@/lib/ghost/country";
import { useGhost } from "@/lib/ghost/store";
import { useGuestId } from "@/lib/ghost/use-guest";

export const Route = createFileRoute("/bounties/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) throw notFound();
    const data = await getBounty({ data: { id } });
    if (!data.bounty) throw notFound();
    return data;
  },
  component: BountyDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p>That bounty is not on this board.</p>
    </main>
  ),
});

function BountyDetail() {
  const { bounty: b, submissions } = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const guestId = useGuestId();
  const router = useRouter();
  const [proof, setProof] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const isOwner = Boolean(guestId && guestId === b.posterUserId);
  const ended = b.status === "open" && isPast(b.deadline);
  const canSubmit = Boolean(guestId && !isOwner && b.status === "open" && !ended);
  const already = submissions.some((s) => s.hunterUserId === guestId && s.status === "pending");
  const pending = submissions.some((s) => s.status === "pending");
  const deliverables = b.deliverables
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  async function refresh() {
    await router.invalidate();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await submitBounty({
        data: {
          bountyId: b.id,
          proof,
          hunterName: guestName(),
          guestId,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setProof("");
      setNote(c.bountyPending);
      await refresh();
    } catch {
      setError(c.loginError);
    } finally {
      setBusy(false);
    }
  }

  async function onReview(submissionId: number, accept: boolean) {
    if (!guestId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await reviewSubmission({
        data: { bountyId: b.id, submissionId, accept, guestId },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setNote(res.released ? c.bountyReleased : c.bountyReject);
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
      const res = await addDemoSubmission({ data: { bountyId: b.id, guestId } });
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
      const res = await reclaimBounty({ data: { bountyId: b.id, guestId } });
      if (!res.ok) setError(res.error);
      else await refresh();
    } finally {
      setBusy(false);
    }
  }

  const statusBanner =
    b.status === "paid" ? c.bountyAwarded : b.status === "closed" ? c.bountyRefunded : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <p className="text-sm text-muted">
        <Link to="/bounties" className="text-ink">
          {c.bountiesTitle}
        </Link>
        <span aria-hidden> / </span>
        {b.county ?? "Kenya"}
      </p>

      {statusBanner ? (
        <p className="mt-6 border border-line bg-paper px-4 py-3 font-bold">{statusBanner}</p>
      ) : null}

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="max-w-[28ch] text-3xl font-bold leading-[1.15] tracking-tight">
              {lang !== "en" ? b.titleSw : b.title}
            </h1>
            <BountyMark status={b.status} deadline={b.deadline} />
          </div>
          <p className="mt-2 text-muted">
            {b.posterName} · {c.bountyPostedOn} {formatDate(b.createdAt, lang)}
          </p>
          <p className="mt-6 max-w-[62ch]">{b.description}</p>

          <h2 className="mt-8 text-lg font-bold">{c.bountyDeliver}</h2>
          {deliverables.length > 1 ? (
            <ol className="mt-3 max-w-[62ch] space-y-2 text-muted">
              {deliverables.map((line, i) => (
                <li key={line} className="grid grid-cols-[1.5rem_1fr] gap-2">
                  <span className="font-mono text-sm">{i + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-2 max-w-[62ch] text-muted">{b.deliverables}</p>
          )}

          {b.projectSlug ? (
            <p className="mt-6">
              <Link to="/ledger/$slug" params={{ slug: b.projectSlug }} className="font-bold">
                {c.openProject}
              </Link>
            </p>
          ) : null}

          {note ? <p className="mt-6 font-bold">{note}</p> : null}
          {error ? <p className="mt-4 text-sm text-ghost">{error}</p> : null}

          {isOwner && b.status === "open" && ended ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onReclaim()}
              className="mt-6 min-h-11 border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-canvas disabled:opacity-50"
            >
              {c.bountyReclaim}
            </button>
          ) : null}

          {isOwner && b.status === "open" && !ended ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => void onDemo()}
              className="mt-6 min-h-11 border border-line px-4 py-2 text-sm font-bold hover:border-ink disabled:opacity-50"
            >
              {c.bountyDemoSub}
            </button>
          ) : null}

          {canSubmit && !already ? (
            <form id="proof" className="mt-8 scroll-mt-6 space-y-4 border-t border-line pt-8" onSubmit={onSubmit}>
              <h2 className="text-lg font-bold">{c.bountyClaim}</h2>
              <label className="block text-sm">
                <span className="mb-1 block font-bold">{c.bountyProof}</span>
                <textarea
                  required
                  maxLength={400}
                  rows={4}
                  className="w-full px-3 py-2"
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  placeholder={c.bountyProofPh}
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                className="min-h-11 bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:brightness-95 disabled:opacity-50"
              >
                {busy ? "…" : c.bountyClaim}
              </button>
            </form>
          ) : null}

          <h2 className="mt-10 text-lg font-bold">{c.bountySubs}</h2>
          {submissions.length === 0 ? (
            <p className="mt-2 text-sm text-muted">{c.bountyNone}</p>
          ) : (
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {submissions.map((s) => (
                <li key={s.id} className="py-4">
                  <p className="font-bold">{s.hunterName}</p>
                  <p className="mt-1 text-muted">{s.proof}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {s.status} · {formatDate(s.createdAt, lang)}
                  </p>
                  {isOwner && b.status === "open" && s.status === "pending" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onReview(s.id, true)}
                        className="min-h-11 bg-accent px-4 py-2 text-sm font-bold text-accent-ink disabled:opacity-50"
                      >
                        {c.bountyAccept}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onReview(s.id, false)}
                        className="min-h-11 border border-ink px-4 py-2 text-sm font-bold disabled:opacity-50"
                      >
                        {c.bountyReject}
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          {isOwner && pending ? (
            <p className="mt-4 max-w-[62ch] text-sm text-muted">{c.bountyReleaseHint}</p>
          ) : null}
        </div>

        <aside className="h-fit border border-line bg-paper p-5 lg:sticky lg:top-4">
          <p className="font-mono text-3xl tabular-nums text-verified">{kes(b.rewardKes, lang, country)}</p>
          <p className="mt-1 text-sm text-muted">
            {c.bountyEscrow}: {kes(b.escrowKes, lang, country)}
          </p>
          <p className="mt-2 font-mono text-xs text-muted">
            {timeLeft(b.deadline, lang)} · {b.subCount} {c.bountySubs}
          </p>
          <div className="mt-5">
            <EscrowTrack status={b.status} pending={pending} c={c} />
          </div>
          <p className="mt-4 text-xs text-muted">
            {b.status === "paid"
              ? c.bountyAwardedBody
              : b.status === "closed"
                ? c.bountyRefunded
                : c.bountyHeldUntil}
          </p>
          {b.status === "open" && !ended && !isOwner && canSubmit && !already ? (
            <a
              href="#proof"
              className="mt-5 flex min-h-11 items-center justify-center bg-accent px-4 text-sm font-bold text-accent-ink no-underline"
            >
              {c.bountyClaim}
            </a>
          ) : null}
        </aside>
      </div>
      <p className="mt-10 max-w-[70ch] text-xs text-muted">{demoBanner(country)}</p>
    </main>
  );
}
