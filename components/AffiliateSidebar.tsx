import type { SkillId } from "@/lib/data";
import { captureAffiliateClick } from "@/lib/analytics";
import affiliatesData from "@/data/affiliates.json";

interface Affiliate {
  name: string;
  url: string;
  blurb: string;
}

const affiliates = affiliatesData as Record<string, Affiliate[]>;

interface AffiliateSidebarProps {
  skill: SkillId;
  skillLabel: string;
}

export default function AffiliateSidebar({ skill, skillLabel }: AffiliateSidebarProps) {
  const entries = affiliates[skill] ?? affiliates["_default"];

  return (
    <div className="mt-8 border-t border-rule pt-6">
      <p className="text-muted text-[13px] font-medium">
        Tools other {skillLabel.toLowerCase()} freelancers use to get paid
      </p>

      <ul className="mt-3 space-y-3">
        {entries.map((a) => (
          <li key={a.name}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-[15px] font-medium hover:underline"
              onClick={() => captureAffiliateClick(skill, a.name)}
            >
              {a.name} &#x2197;
            </a>
            <span className="text-muted text-[13px] ml-2">{a.blurb}</span>
          </li>
        ))}
      </ul>

      <p className="text-muted text-[12px] mt-4">
        Affiliate links — disclosed.
      </p>
    </div>
  );
}
