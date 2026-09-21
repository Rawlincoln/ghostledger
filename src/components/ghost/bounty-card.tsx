"use client";

import { Link } from "@tanstack/react-router";
import { BountyMark } from "@/components/ghost/bounty-mark";
import type { BountyRow } from "@/lib/ghost/bounty-types";
import { kes, timeLeft } from "@/lib/ghost/format";
import type { Copy } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";
import type { Lang } from "@/lib/ghost/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
  return letters || "GL";
}

export function BountyCard({
  bounty: b,
  lang,
  c,
}: {
  bounty: BountyRow;
  lang: Lang;
  c: Copy;
}) {
  const title = lang !== "en" ? b.titleSw : b.title;
  const country = useGhost((s) => s.country);
  return (
    <Link
      to="/bounties/$id"
      params={{ id: String(b.id) }}
      className="grid grid-cols-[2.5rem_1fr] items-start gap-3 border-b border-line py-5 no-underline transition-colors duration-200 hover:bg-paper md:grid-cols-[2.5rem_1fr_auto]"
    >
      <span
        className="inline-flex size-10 items-center justify-center bg-ink font-mono text-[11px] tracking-wide text-canvas"
        aria-hidden
      >
        {initials(b.posterName)}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <BountyMark status={b.status} deadline={b.deadline} />
          {b.county ? (
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {b.county}
            </span>
          ) : null}
        </span>
        <span className="mt-2 block text-lg font-bold leading-snug tracking-tight text-ink">
          {title}
        </span>
        <span className="mt-1 block text-sm text-muted">{b.posterName}</span>
        <span className="mt-2 flex flex-wrap gap-x-4 font-mono text-xs text-muted md:hidden">
          <span>{timeLeft(b.deadline, lang)}</span>
          <span>
            {b.subCount} {c.bountySubs}
          </span>
        </span>
      </span>
      <span className="col-span-2 mt-1 flex items-end justify-between gap-4 md:col-span-1 md:mt-0 md:min-w-[9.5rem] md:flex-col md:items-end">
        <span className="font-mono text-2xl font-medium tabular-nums text-verified">
          {kes(b.rewardKes, lang, country)}
        </span>
        <span className="hidden text-right font-mono text-xs text-muted md:block">
          <span className="block">{timeLeft(b.deadline, lang)}</span>
          <span className="block">
            {b.subCount} {c.bountySubs}
          </span>
        </span>
      </span>
    </Link>
  );
}
