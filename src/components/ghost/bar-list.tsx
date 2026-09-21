"use client";

import { kesShort } from "@/lib/ghost/format";
import { useGhost } from "@/lib/ghost/store";

export function BarList({
  rows,
  tone = "ink",
}: {
  rows: { key: string; label: string; value: number }[];
  tone?: "ink" | "ghost";
}) {
  const country = useGhost((s) => s.country);
  const max = Math.max(...rows.map((r) => r.value), 1);
  const fill = tone === "ghost" ? "bg-ghost" : "bg-ink";
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span>{row.label}</span>
            <span className="font-mono tabular-nums">{row.value === 0 ? "—" : kesShort(row.value, country)}</span>
          </div>
          <div className="mt-1 h-1.5 bg-line">
            <div
              className={`h-full ${fill}`}
              style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
