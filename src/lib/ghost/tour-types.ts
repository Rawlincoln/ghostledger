export type TourStatus = "open" | "paid" | "closed";
export type TourVisitStatus = "pending" | "accepted" | "rejected";
export type TourSort = "reward" | "newest" | "ending";
export type TourTab = "open" | "paid" | "mine";

export type TourRow = {
  id: number;
  slug: string;
  plannerUserId: string;
  plannerName: string;
  title: string;
  titleSw: string;
  investigation: string;
  county: string;
  country: string;
  projectSlugs: string[];
  budgetKes: number;
  escrowKes: number;
  status: TourStatus;
  deadline: string;
  winnerVisitId: number | null;
  isDemo: boolean;
  createdAt: string;
  visitCount: number;
};

export type TourVisit = {
  id: number;
  tourId: number;
  loggerUserId: string;
  loggerName: string;
  projectSlug: string | null;
  findings: string;
  videoUrl: string;
  status: TourVisitStatus;
  createdAt: string;
};

export type TourStats = {
  live: number;
  unclaimedKes: number;
  visits: number;
  paidOutKes: number;
};

export const MIN_TOUR_KES = 2_000;
export const SEED_TOUR_PLANNER = "seed-desk";
export const SEED_TOUR_LOGGER = "seed-hunter";
