import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { inCountry, regionsFor } from "@/lib/ghost/catalog";
import { kes } from "@/lib/ghost/format";
import { guestName } from "@/lib/ghost/guest";
import { t } from "@/lib/ghost/i18n";
import { listProjects } from "@/lib/ghost/queries";
import { useGhost } from "@/lib/ghost/store";
import { MIN_TOUR_KES } from "@/lib/ghost/tour-types";
import { createTour, getTourWallet } from "@/lib/ghost/tours";
import { useGuestId } from "@/lib/ghost/use-guest";

export const Route = createFileRoute("/tour/new")({
  loader: () => listProjects(),
  component: PlanTour,
});

function PlanTour() {
  const all = Route.useLoaderData();
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const projects = inCountry(all, country);
  const guestId = useGuestId();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [county, setCounty] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState(8_000);
  const [days, setDays] = useState(14);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!guestId) return;
    void getTourWallet({ data: { guestId } })
      .then((w) => setBalance(w.balanceKes))
      .catch(() => setBalance(null));
  }, [guestId]);

  const inCounty = county ? projects.filter((p) => p.county === county) : projects;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestId) return;
    setError(null);
    if (selected.length === 0) {
      setError(c.tourNeedProjects);
      return;
    }
    setBusy(true);
    try {
      const res = await createTour({
        data: {
          title,
          investigation,
          county,
          projectSlugs: selected,
          budgetKes: budget,
          days,
          plannerName: guestName(),
          guestId,
          country,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      await navigate({ to: "/tour/$id", params: { id: String(res.id) } });
    } catch {
      setError(c.loginError);
    } finally {
      setBusy(false);
    }
  }

  function toggleSlug(slug: string) {
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug].slice(0, 8)));
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 md:px-6">
      <p className="text-sm text-muted">
        <Link to="/tour" className="text-ink">
          {c.tourTitle}
        </Link>
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">{c.tourPlan}</h1>
      <p className="mt-3 text-muted">{c.tourHow1}</p>
      {balance != null ? (
        <p className="mt-4 font-mono text-sm">
          {c.tourWallet}: {kes(balance, lang, country)}
        </p>
      ) : null}
      <p className="mt-1 text-xs text-muted">{c.bountyCredit}</p>

      <ol className="mt-8 grid gap-px bg-line sm:grid-cols-4">
        {[c.tourHow1, c.tourHow2, c.tourHow3, c.tourHow4].map((line, i) => (
          <li key={line} className="bg-canvas px-3 py-3">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{i + 1}</p>
            <p className="mt-2 text-sm">{line}</p>
          </li>
        ))}
      </ol>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.tourTitleField}</span>
          <input
            required
            maxLength={140}
            className="w-full px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              lang === "sw"
                ? "Ukaguzi wa maji: Lurambi na Kitui"
                : "Western water audit: Lurambi and Kitui"
            }
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.tourGoals}</span>
          <textarea
            required
            maxLength={800}
            rows={4}
            className="w-full px-3 py-2"
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
            placeholder={c.tourGoalsPh}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.tourCounty}</span>
          <select
            required
            className="w-full px-3 py-2"
            value={county}
            onChange={(e) => {
              setCounty(e.target.value);
              setSelected([]);
            }}
          >
            <option value="">{c.tourCountyPick}</option>
            {regionsFor(country).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="mb-2 text-sm font-bold">{c.tourPickProjects}</legend>
          <ul className="max-h-56 space-y-1 overflow-y-auto border border-line p-2">
            {inCounty.map((p) => (
              <li key={p.slug}>
                <label className="flex min-h-11 cursor-pointer items-center gap-2 px-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selected.includes(p.slug)}
                    onChange={() => toggleSlug(p.slug)}
                  />
                  <span>
                    {lang !== "en" ? p.nameSw : p.name}
                    <span className="ml-2 text-muted">{p.ward}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <label className="block text-sm">
          <span className="mb-1 block font-bold">{c.tourBudget}</span>
          <input
            type="number"
            required
            min={MIN_TOUR_KES}
            step={500}
            className="w-full px-3 py-2 font-mono"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
          <span className="mt-1 block text-xs text-muted">
            {c.tourBudgetHint} {c.tourMin}
          </span>
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
          className="min-h-11 bg-accent px-5 py-2.5 text-sm font-bold text-accent-ink hover:brightness-95 disabled:opacity-50"
        >
          {busy ? "…" : c.tourLock}
        </button>
      </form>
    </main>
  );
}
