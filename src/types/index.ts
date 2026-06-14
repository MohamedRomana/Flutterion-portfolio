/* ---------------------------------------------------------------- */
/*  Shared, editable content types for the Flutterion portfolio.     */
/*  All site copy lives in src/data/* and conforms to these types.   */
/* ---------------------------------------------------------------- */

export type Theme = "dark" | "light";

export type Platform = "ios" | "android" | "both";

export type ProjectCategory =
  | "Enterprise / GovTech"
  | "Service Marketplace"
  | "E-commerce"
  | "Delivery"
  | "On-Demand Services"
  | "Roadside Assistance"
  | "Travel"
  | "EdTech"
  | "Productivity"
  | "Islamic / Lifestyle"
  | "Health / Accessibility"
  | "Restaurant";

export interface ProjectLinks {
  /** Placeholder values (e.g. "#") are intentional — replace with real URLs. */
  appStore?: string;
  playStore?: string;
  /** Google Drive distribution link (APK) for apps not on a public store. */
  drive?: string;
  github?: string;
  website?: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short one-line positioning shown on cards. */
  tagline: string;
  category: ProjectCategory;
  platform: Platform;
  /** Brand accent for the card glow — hsl/hex string. */
  accent: string;
  /** Number of screenshots available in /public/screens/<slug>/{n}.jpg */
  imageCount: number;
  featured: boolean;
  /** Government / NDA work with no public links. */
  isPrivate: boolean;
  /**
   * True when the description is NOT sourced from the CV and needs the
   * owner to confirm copy. Surfaced as an editorial note in the data file.
   */
  needsContentReview?: boolean;
  links: ProjectLinks;

  overview: string;
  problem: string;
  solution: string;
  role: string;
  features: string[];
  stack: string[];
  decisions: string[];
  challenges: ChallengeSolution[];
}

export interface SkillGroup {
  title: string;
  icon: string; // lucide icon name
  skills: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string; // lucide icon name
  features: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education";
  current?: boolean;
}

export interface Stat {
  /** Numeric value for count-up; null for text-only stats. */
  value: number | null;
  display: string;
  label: string;
  suffix?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface Profile {
  name: string;
  brand: string;
  tagline: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  shortBio: string;
  longBio: string[];
}
