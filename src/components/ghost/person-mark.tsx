"use client";

import { personStatusLabel, type PersonStatus } from "@/lib/ghost/record";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

export function PersonMark({ status }: { status: PersonStatus | "citizen_indicated" }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  const label =
    status === "citizen_indicated" ? c.namedCitizen : personStatusLabel(status, lang);
  const tone =
    status === "convicted"
      ? "bg-ghost"
      : status === "acquitted" || status === "freed" || status === "deceased_before_verdict"
        ? "bg-muted"
        : status === "citizen_indicated"
          ? "bg-ink"
          : "bg-delayed";
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold tracking-tight">
      <span className={`size-2 shrink-0 ${tone}`} aria-hidden />
      {label}
    </span>
  );
}
