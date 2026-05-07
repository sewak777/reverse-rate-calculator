import dataset from "../data/rates.json";

type Source = { id: string; name: string; url: string; publishedAt: string; notes?: string };
type Cell = {
  skill: string;
  region: string;
  experience: string;
  hourly: { low: number; median: number; high: number };
  projectMultiplier?: { low: number; high: number };
  sources: string[];
  lastUpdated: string;
};

const sources = dataset.sources as Source[];
const cells = dataset.cells as Cell[];
const sourceIds = new Set(sources.map((s) => s.id));
let errors = 0;

for (const cell of cells) {
  const label = `${cell.skill}/${cell.region}/${cell.experience}`;

  for (const sid of cell.sources) {
    if (!sourceIds.has(sid)) {
      console.error(`[FAIL] ${label}: source "${sid}" not found`);
      errors++;
    }
  }

  if (!cell.lastUpdated) {
    console.error(`[FAIL] ${label}: missing lastUpdated`);
    errors++;
  }

  if (cell.hourly.low > cell.hourly.median || cell.hourly.median > cell.hourly.high) {
    console.error(
      `[FAIL] ${label}: rate ordering violation (${cell.hourly.low} / ${cell.hourly.median} / ${cell.hourly.high})`,
    );
    errors++;
  }
}

// Project-range assertions for all cells with a known multiplier
for (const cell of cells) {
  const label = `${cell.skill}/${cell.region}/${cell.experience}`;
  const m = cell.projectMultiplier ?? { low: 12, high: 60 };
  const pLow = Math.round((cell.hourly.low * m.low) / 100) * 100;
  const pHigh = Math.round((cell.hourly.high * m.high) / 100) * 100;

  if (pLow <= 0 || pHigh <= 0) {
    console.error(`[FAIL] ${label}: project range not positive (${pLow}–${pHigh})`);
    errors++;
  }
  if (pLow % 100 !== 0 || pHigh % 100 !== 0) {
    console.error(`[FAIL] ${label}: project range not rounded to 100 (${pLow}–${pHigh})`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} error(s) found.`);
  process.exit(1);
} else {
  console.log(`All ${cells.length} cells passed. ${sources.length} sources verified.`);
}
