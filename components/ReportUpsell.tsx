import type { SkillId } from "@/lib/data";
import { captureReportCta } from "@/lib/analytics";

interface ReportUpsellProps {
  skill: SkillId;
  skillLabel: string;
}

export default function ReportUpsell({ skill, skillLabel }: ReportUpsellProps) {
  const base = process.env.NEXT_PUBLIC_STRIPE_REPORT_LINK ?? "#";
  const href = `${base}?skill=${encodeURIComponent(skill)}`;

  return (
    <div className="mt-8 rounded border border-rule bg-surface px-6 py-6">
      <p className="text-ink text-[15px]">
        Want every {skillLabel.toLowerCase()} rate cell, every region, every
        tier, with quarterly updates? The 2026 {skillLabel} Rate Report. $9.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-accent px-5 py-2.5 text-[15px] font-medium text-white hover:opacity-90"
        onClick={() => captureReportCta(skill)}
      >
        Buy &rarr;
      </a>
    </div>
  );
}
