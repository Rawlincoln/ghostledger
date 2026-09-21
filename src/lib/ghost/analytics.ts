import type { Project, Sector } from "./types";
import type { Copy } from "./i18n";

export type BarRow = { key: string; label: string; value: number };

export function sumDisbursed(projects: Project[]): number {
  return projects.reduce((n, p) => n + p.disbursedKes, 0);
}

export function ghostPaid(projects: Project[]): number {
  return sumDisbursed(projects.filter((p) => p.status === "ghost"));
}

export function bountyPool(projects: Project[]): number {
  return projects.reduce((n, p) => n + p.bountyKes, 0);
}

export function visitCount(projects: Project[]): number {
  return projects.reduce((n, p) => n + p.seedReports, 0);
}

function groupSum(
  projects: Project[],
  keyFn: (p: Project) => string,
  valueFn: (p: Project) => number,
): BarRow[] {
  const map = new Map<string, number>();
  for (const p of projects) {
    const key = keyFn(p);
    map.set(key, (map.get(key) ?? 0) + valueFn(p));
  }
  return [...map.entries()]
    .map(([key, value]) => ({ key, label: key, value }))
    .sort((a, b) => b.value - a.value);
}

export function ghostByCounty(projects: Project[]): BarRow[] {
  return groupSum(
    projects.filter((p) => p.status === "ghost"),
    (p) => p.county,
    (p) => p.disbursedKes,
  );
}

export function paidBySector(projects: Project[], copy: Copy): BarRow[] {
  return groupSum(projects, (p) => p.sector, (p) => p.disbursedKes).map((row) => ({
    ...row,
    label: copy.sector[row.key as Sector],
  }));
}

export function tourStops(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.status === "ghost")
    .sort((a, b) => b.disbursedKes - a.disbursedKes);
}

export function openBounties(projects: Project[]): Project[] {
  return projects
    .filter((p) => p.bountyKes > 0)
    .sort((a, b) => b.bountyKes - a.bountyKes);
}
