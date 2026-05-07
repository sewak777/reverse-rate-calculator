import type { RateCell, Source } from "@/lib/data";
import SourcesList from "./SourcesList";

interface ResultsCardProps {
  cell: RateCell;
  sources: Source[];
  project: { low: number; high: number };
}

function isStale(lastUpdated: string): boolean {
  const [year, month] = lastUpdated.split("-").map(Number);
  const updated = new Date(year, month - 1);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return updated < sixMonthsAgo;
}

function formatDollars(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export default function ResultsCard({ cell, sources, project }: ResultsCardProps) {
  const stale = isStale(cell.lastUpdated);

  return (
    <div className="animate-fade-in rounded border border-rule bg-surface px-6 py-6">
      {stale && (
        <p className="text-warning text-[13px] font-medium mb-4 px-3 py-2 rounded bg-warning/10">
          Heads up — this rate hasn&apos;t been refreshed since {cell.lastUpdated}.
          Treat as a directional signal.
        </p>
      )}

      <div className="flex items-baseline gap-8">
        <div className="text-center">
          <p className="type-mono-rate text-ink">{formatDollars(cell.hourly.low)}</p>
          <p className="text-muted text-[13px] font-medium mt-1">low</p>
        </div>
        <div className="text-center">
          <p className="type-mono-rate text-highlight">{formatDollars(cell.hourly.median)}</p>
          <p className="text-muted text-[13px] font-medium mt-1">median</p>
        </div>
        <div className="text-center">
          <p className="type-mono-rate text-ink">{formatDollars(cell.hourly.high)}</p>
          <p className="text-muted text-[13px] font-medium mt-1">high</p>
        </div>
      </div>

      <p className="text-ink mt-5">
        Project rate: {formatDollars(project.low)} – {formatDollars(project.high)}
      </p>

      <SourcesList sources={sources} />

      <p className="text-muted text-[12px] border-t border-rule pt-3 mt-4">
        Last updated &middot; {cell.lastUpdated}
      </p>
    </div>
  );
}
