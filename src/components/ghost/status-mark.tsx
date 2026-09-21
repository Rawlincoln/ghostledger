"use client";

import type { ProjectStatus } from "@/lib/ghost/types";
import { t } from "@/lib/ghost/i18n";
import { useGhost } from "@/lib/ghost/store";

const TONE: Record<ProjectStatus, string> = {
  ghost: "bg-ghost",
  incomplete: "bg-delayed",
  delayed: "bg-delayed",
  verified: "bg-verified",
};

export function StatusMark({ status }: { status: ProjectStatus }) {
  const lang = useGhost((s) => s.lang);
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold tracking-tight">
      <span className={`size-2 shrink-0 ${TONE[status]}`} aria-hidden />
      {c.status[status]}
    </span>
  );
}
