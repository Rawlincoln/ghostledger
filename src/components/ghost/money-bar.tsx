import { paidRatio } from "@/lib/ghost/format";
import type { ProjectStatus } from "@/lib/ghost/types";

export function MoneyBar({
  allocated,
  disbursed,
  status,
  label,
}: {
  allocated: number;
  disbursed: number;
  status: ProjectStatus;
  label?: string;
}) {
  const pct = Math.round(paidRatio(allocated, disbursed) * 100);
  const tone =
    status === "ghost" ? "bg-ghost" : status === "verified" ? "bg-verified" : "bg-ink";
  return (
    <div>
      <div className="flex h-1.5 w-full bg-line" aria-hidden>
        <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
      </div>
      {label ? (
        <p className="mt-1 font-mono text-[11px] text-muted">{label}</p>
      ) : (
        <span className="sr-only">{pct} percent disbursed</span>
      )}
    </div>
  );
}
