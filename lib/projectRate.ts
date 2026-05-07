import type { RateCell } from "./data";

export function projectRange(cell: RateCell): { low: number; high: number } {
  const m = cell.projectMultiplier ?? { low: 12, high: 60 };
  return {
    low: Math.round((cell.hourly.low * m.low) / 100) * 100,
    high: Math.round((cell.hourly.high * m.high) / 100) * 100,
  };
}
