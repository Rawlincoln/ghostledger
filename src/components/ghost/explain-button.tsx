"use client";

import { useState } from "react";
import { explainProject } from "@/lib/ghost/ai";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export function ExplainButton({ slug }: { slug: string }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      const res = await explainProject({ data: { slug, lang } });
      if (res.ok) setText(res.text);
      else setError(c.explainFail);
    } catch {
      setError(c.explainFail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border-t border-line pt-6">
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="bg-ink px-4 py-2.5 text-sm font-bold text-canvas hover:bg-accent hover:text-accent-ink disabled:opacity-50"
      >
        {busy ? c.explaining : c.explain}
      </button>
      {text ? (
        <div className="mt-4 max-w-[65ch] space-y-3 whitespace-pre-wrap text-base leading-relaxed">
          {text}
        </div>
      ) : null}
      {error ? <p className="mt-3 text-sm text-ghost">{error}</p> : null}
    </div>
  );
}
