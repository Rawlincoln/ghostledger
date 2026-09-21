export type BountyStatus = "open" | "paid" | "closed";
export type SubStatus = "pending" | "accepted" | "rejected";
export type BountySort = "reward" | "newest" | "ending" | "near";
export type BountyTab = "open" | "paid" | "mine";

export type BountyRow = {
  id: number;
  slug: string;
  posterUserId: string;
  posterName: string;
  title: string;
  titleSw: string;
  description: string;
  deliverables: string;
  projectSlug: string | null;
  county: string | null;
  country: string;
  rewardKes: number;
  escrowKes: number;
  status: BountyStatus;
  deadline: string;
  winnerSubId: number | null;
  isDemo: boolean;
  createdAt: string;
  subCount: number;
};

export type BountySub = {
  id: number;
  bountyId: number;
  hunterUserId: string;
  hunterName: string;
  proof: string;
  status: SubStatus;
  createdAt: string;
};

export type BountyStats = {
  live: number;
  unclaimedKes: number;
  submissions: number;
  paidOutKes: number;
};

export type Wallet = {
  balanceKes: number;
};

export const DEMO_CREDIT_KES = 50_000;
export const MIN_BOUNTY_KES = 500;
export const SEED_POSTER = "seed-desk";
export const SEED_HUNTER = "seed-hunter";
