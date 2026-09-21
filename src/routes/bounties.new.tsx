import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createBounty, getWallet } from "@/lib/ghost/bounties";
import { MIN_BOUNTY_KES } from "@/lib/ghost/bounty-types";
import { inCountry, regionsFor } from "@/lib/ghost/catalog";
import { kes } from "@/lib/ghost/format";
import { guestName } from "@/lib/ghost/guest";
import { t } from "@/lib/ghost/i18n";
import { listProjects } from "@/lib/ghost/queries";
import { useGhost } from "@/lib/ghost/store";
import { useGuestId } from "@/lib/ghost/use-guest";

export const Route = createFileRoute("/bounties/new")({
  loader: () => listProjects(),
  component: NewBounty,
});

function NewBounty() {
  const all = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const projects = inCountry(all, country);
  const guestId = useGuestId();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [projectSlug, setProjectSlug] = useState("");
  const [county, setCounty] = useState("");
  const [reward, setReward] = useState(2000);
  const [days, setDays] = useState(14);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!guestId) return;
    void getWallet({ data: { guestId } })
      .then((w) => setBalance(w.balanceKes))
      .catch(() => setBalance(null));
  }, [guestId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestId) return;
    setError(null);
    setBusy(true);
    try {
      const res = await createBounty({
        data: {
          title,
          description,
          deliverables,
          projectSlug: projectSlug || null,
          county: county || null,
          rewardKes: reward,
          days,
          posterName: guestName(),
          guestId,
          country,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      await navigate({ to: "/bounties/$id", params: { id: String(res.id) } });
    } catch {
      setError(c.loginError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-6">
      <p className="text-sm text-muted">
        <Link to="/bounties" className="text-ink">
          {c.bountiesTitle}
        </Link>
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">{c.bountyPost}</h1>
      <p className="mt-3 text-muted">{c.bountyEscrowHint}</p>

      <ol className="mt-6 grid gap-px bg-line sm:grid-cols-2">
        {[c.bountyHow1, c.bountyHow2, c.bountyHow3, c.bountyHow4].map((line, i) => (
          <li key={line} className="bg-canvas px-3 py-3">
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {i + 1}
            </span>
            <p className="mt-1 text-sm">{line}</p>
          </li>
        ))}
      </ol>

      {balance != null ? (
        <p className="mt-6 font-mono text-sm">
          {c.bountyWallet}: {kes(balance, lang, country)}
          <span className="ml-2 text-muted">{c.bountyWalletHint}</span>
        </p>
      ) : null}
      <p className="mt-1 text-xs text-muted">{c.bountyCredit}</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.bountyTitleField}</span>
          <input
            required
            maxLength={120}
            className="w-full px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={lang !== "en" ? "Piga picha paisho la barabara" : "Photograph the grade-stop"}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.bountyDesc}</span>
          <textarea
            required
            maxLength={800}
            rows={4}
            className="w-full px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.bountyDeliver}</span>
          <textarea
            required
            maxLength={400}
            rows={3}
            className="w-full px-3 py-2"
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder={c.bountyProofPh}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.bountyLinkProject}</span>
          <select
            className="w-full px-3 py-2"
            value={projectSlug}
            onChange={(e) => {
              setProjectSlug(e.target.value);
              const p = projects.find((row) => row.slug === e.target.value);
              if (p) setCounty(p.county);
            }}
          >
            <option value="">{c.bountyNoProject}</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {lang !== "en" ? p.nameSw : p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.colCounty}</span>
          <select
            className="w-full px-3 py-2"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
          >
            <option value="">{c.allCounties}</option>
            {regionsFor(country).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.bountyReward}</span>
          <input
            type="number"
            required
            min={MIN_BOUNTY_KES}
            step={100}
            className="w-full px-3 py-2 font-mono"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
          />
          <span className="mt-1 block text-xs text-muted">{c.bountyMin}</span>
        </label>
        <fieldset>
          <legend className="mb-2 text-sm font-bold">{c.bountyDeadline}</legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                [3, c.bountyDays3],
                [7, c.bountyDays7],
                [14, c.bountyDays14],
                [30, c.bountyDays30],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="inline-flex min-h-11 items-center gap-2 border border-line px-3 text-sm">
                <input
                  type="radio"
                  name="days"
                  checked={days === value}
                  onChange={() => setDays(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-ghost">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="min-h-11 w-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:brightness-95 disabled:opacity-50"
        >
          {busy ? "…" : c.bountyLock}
        </button>
      </form>
    </main>
  );
}
