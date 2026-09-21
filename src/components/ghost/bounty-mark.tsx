"use client";

import { isPast } from "@/lib/ghost/format";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export function BountyMark({
  status,
  deadline,
}: {
  status: "open" | "paid" | "closed";
  deadline?: string;
}) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const ended = status === "open" && deadline ? isPast(deadline) : false;
  const label = ended ? c.bountyEnded : status === "paid" ? c.bountyPaid : status === "closed" ? c.bountyClosed : c.bountyOpen;
  const tone = ended || status === "closed" ? "bg-muted" : status === "paid" ? "bg-verified" : "bg-accent";
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold tracking-tight">
      <span className={`size-2 shrink-0 ${tone}`} aria-hidden />
      {label}
    </span>
  );
}
