export type Lang = "en" | "sw" | "fr";

export type CountryId = "ke" | "tz" | "ug" | "gh" | "sn" | "tg" | "zm" | "mw";

export type ProjectStatus = "ghost" | "incomplete" | "delayed" | "verified";

export type Sector =
  | "water"
  | "health"
  | "education"
  | "roads"
  | "energy"
  | "housing";

export type Observation = "not_found" | "incomplete" | "complete";

export type Source = {
  name: string;
  url: string;
  published: string;
  what: string;
};

export type NextStep = {
  office: string;
  action: string;
  actionSw: string;
  contact: string;
  url: string;
  needs: string[];
};

export type ResponsibleOffice = {
  office: string;
  officeSw: string;
  duty: string;
  dutySw: string;
};

export type Project = {
  slug: string;
  name: string;
  nameSw: string;
  county: string;
  ward: string;
  sector: Sector;
  status: ProjectStatus;
  fy: string;
  allocatedKes: number;
  disbursedKes: number;
  contractor: string;
  promised: string;
  promisedSw: string;
  paperClaim: string;
  paperClaimSw: string;
  groundNote: string;
  groundNoteSw: string;
  lat: number;
  lng: number;
  photo: string;
  lastOfficial: string;
  sources: Source[];
  nextSteps: NextStep[];
  seedReports: number;
  bountyKes: number;
  responsible: ResponsibleOffice[];
  country?: CountryId;
};

export type ReportRow = {
  id: number;
  project_slug: string;
  observation: Observation;
  lat: number | null;
  lng: number | null;
  distance_m: number | null;
  note: string | null;
  evidence_hash: string;
  responsible_name: string | null;
  responsible_role: string | null;
  created_at: string;
};
