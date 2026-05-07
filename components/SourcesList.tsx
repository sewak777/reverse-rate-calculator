import type { Source } from "@/lib/data";
import { captureSourceClick } from "@/lib/analytics";

interface SourcesListProps {
  sources: Source[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  return (
    <div>
      <p className="text-muted text-[13px] font-medium border-t border-rule pt-3 mt-4">
        Sources ({sources.length})
      </p>
      <ul className="mt-2 space-y-1.5">
        {sources.map((s) => (
          <li key={s.id} className="text-[13px]">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open source: ${s.name} (opens in new tab)`}
              className="text-accent hover:underline"
              onClick={() => captureSourceClick(s.id)}
            >
              {s.name} &middot; {s.publishedAt} &middot; &#x2197;
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
