import type { PersonStatus, RecordSource } from "./record";

export type NamedSort = "amount" | "earliest" | "reports";
export type NamedView = "scandals" | "missing" | "people";

export type NamedProjectHit = {
  slug: string;
  name: string;
  nameSw: string;
  county: string;
  kes: number;
};

export type NamedBoardRow = {
  key: string;
  name: string;
  role: string;
  roleSw: string;
  status: PersonStatus | "citizen_indicated";
  matter: string;
  matterSw: string;
  amountKes: number;
  publicKes: number;
  reportKes: number;
  reports: number;
  since: string;
  sources: RecordSource[];
  projects: NamedProjectHit[];
  isPublic: boolean;
};
