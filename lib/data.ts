import dataset from "../data/rates.json";

// -- Types (TECH.md section 3) ------------------------------------------------

export type ExperienceTier = "<1yr" | "1-3yr" | "3-7yr" | "7+yr";
export type Region = "US" | "UK" | "EU" | "CA" | "AU" | "LATAM" | "ASIA" | "AFRICA";
export type SkillId =
  | "web-design"
  | "web-development"
  | "copywriting"
  | "graphic-design"
  | "seo-consulting"
  | "video-editing"
  | "ai-ml-consulting"
  | "voiceover"
  | "social-media"
  | "bookkeeping"
  | "translation"
  | "photography";

export interface Source {
  id: string;
  name: string;
  url: string;
  publishedAt: string;
  notes?: string;
}

export interface RateCell {
  skill: SkillId;
  region: Region;
  experience: ExperienceTier;
  hourly: { low: number; median: number; high: number };
  projectMultiplier?: { low: number; high: number };
  sources: string[];
  lastUpdated: string;
}

export interface Dataset {
  sources: Source[];
  cells: RateCell[];
}

// -- Label maps ---------------------------------------------------------------

const SKILL_LABELS: Record<SkillId, string> = {
  "web-design": "Web design",
  "web-development": "Web development",
  copywriting: "Copywriting",
  "graphic-design": "Graphic design",
  "seo-consulting": "SEO consulting",
  "video-editing": "Video editing",
  "ai-ml-consulting": "AI / ML consulting",
  voiceover: "Voiceover",
  "social-media": "Social media",
  bookkeeping: "Bookkeeping",
  translation: "Translation",
  photography: "Photography",
};

const REGION_LABELS: Record<Region, string> = {
  US: "United States",
  UK: "United Kingdom",
  EU: "European Union",
  CA: "Canada",
  AU: "Australia",
  LATAM: "Latin America",
  ASIA: "Asia",
  AFRICA: "Africa",
};

const EXPERIENCE_LABELS: Record<ExperienceTier, string> = {
  "<1yr": "Less than 1 year",
  "1-3yr": "1\u20133 years",
  "3-7yr": "3\u20137 years",
  "7+yr": "7+ years",
};

// -- Data loader --------------------------------------------------------------

const data: Dataset = {
  sources: dataset.sources as Source[],
  cells: dataset.cells as RateCell[],
};

const sourceIndex = new Map(data.sources.map((s) => [s.id, s]));

// -- Public API ---------------------------------------------------------------

export function getSource(id: string): Source | undefined {
  return sourceIndex.get(id);
}

export function findCell(
  skill: SkillId,
  region: Region,
  experience: ExperienceTier,
): RateCell | null {
  return (
    data.cells.find(
      (c) =>
        c.skill === skill && c.region === region && c.experience === experience,
    ) ?? null
  );
}

export function findClosest(
  skill: SkillId,
  region: Region,
  experience: ExperienceTier,
): { cell: RateCell; reason: string } | null {
  const exact = findCell(skill, region, experience);
  if (exact) return { cell: exact, reason: "exact" };

  const sameSkillRegion = data.cells.find(
    (c) => c.skill === skill && c.region === region,
  );
  if (sameSkillRegion) {
    return {
      cell: sameSkillRegion,
      reason: `Showing ${EXPERIENCE_LABELS[sameSkillRegion.experience]} in ${REGION_LABELS[sameSkillRegion.region]} instead`,
    };
  }

  const sameSkill = data.cells.find((c) => c.skill === skill);
  if (sameSkill) {
    return {
      cell: sameSkill,
      reason: `Showing ${SKILL_LABELS[sameSkill.skill]} in ${REGION_LABELS[sameSkill.region]} instead`,
    };
  }

  return null;
}

export function listSkills(): { id: SkillId; label: string }[] {
  const present = new Set(data.cells.map((c) => c.skill));
  return (Object.keys(SKILL_LABELS) as SkillId[])
    .filter((id) => present.has(id))
    .map((id) => ({ id, label: SKILL_LABELS[id] }));
}

export function listRegions(): { id: Region; label: string }[] {
  const present = new Set(data.cells.map((c) => c.region));
  return (Object.keys(REGION_LABELS) as Region[])
    .filter((id) => present.has(id))
    .map((id) => ({ id, label: REGION_LABELS[id] }));
}

export function listExperiences(): { id: ExperienceTier; label: string }[] {
  return (Object.keys(EXPERIENCE_LABELS) as ExperienceTier[]).map((id) => ({
    id,
    label: EXPERIENCE_LABELS[id],
  }));
}
