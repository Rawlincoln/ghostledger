"use client";

import { t } from "@/lib/ghost/i18n";
import type { Lang, Project } from "@/lib/ghost/types";
import { kes } from "@/lib/ghost/format";
import { useGhost } from "@/lib/ghost/store";

export function PaperCertificate({
  project,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const country = useGhost((s) => s.country);
  const c = t(lang, country);
  return (
    <article className="certificate relative h-full bg-paper px-5 py-6 md:px-7 md:py-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        {c.certNo}
      </p>
      <h2 className="mt-4 max-w-[22ch] text-2xl font-bold leading-[1.15] tracking-tight">
        {lang !== "en" ? project.nameSw : project.name}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {project.ward} · {project.county} · {project.fy}
      </p>
      <dl className="mt-6 grid grid-cols-[1fr_auto] gap-y-3 border-y border-line py-5 font-mono text-sm">
        <dt className="text-muted">{c.allocated}</dt>
        <dd>{kes(project.allocatedKes, lang, country)}</dd>
        <dt className="text-muted">{c.disbursed}</dt>
        <dd>{kes(project.disbursedKes, lang, country)}</dd>
      </dl>
      <p className="mt-5 max-w-[46ch] text-sm">
        {lang !== "en" ? project.paperClaimSw : project.paperClaim}
      </p>
      <p className="rubber-stamp mt-8 text-[13px]">{c.certComplete}</p>
    </article>
  );
}
