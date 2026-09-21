"use client";

import type { BountyStatus } from "@/lib/ghost/bounty-types";
import type { Copy } from "@/lib/ghost/i18n";

export function EscrowTrack({
  status,
  pending,
  c,
}: {
  status: BountyStatus;
  pending: boolean;
  c: Copy;
}) {
  const lock = true;
  const review = status === "paid" || (status === "open" && pending);
  const release = status === "paid";
  const refund = status === "closed";
  const steps = [
    { on: lock, label: c.bountyStepLock },
    { on: review, label: c.bountyStepReview },
    { on: release || refund, label: refund ? c.bountyClosed : c.bountyStepRelease },
  ];
  return (
    <ol className="grid grid-cols-3 gap-px bg-line" aria-label={c.bountyEscrow}>
      {steps.map((step, i) => (
        <li
          key={step.label}
          className="flex items-center gap-2 bg-canvas px-3 py-3"
        >
          <span
            className={`size-2 shrink-0 ${step.on ? (i === 2 && release ? "bg-verified" : "bg-accent") : "bg-line"}`}
            aria-hidden
          />
          <span className={step.on ? "text-sm font-bold" : "text-sm text-muted"}>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}
