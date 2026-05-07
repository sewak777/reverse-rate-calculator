import { listSkills, listRegions, listExperiences } from "@/lib/data";
import type { SkillId, Region, ExperienceTier } from "@/lib/data";

type Field = "skill" | "region" | "experience";

interface DropdownGroupProps {
  skill: SkillId | null;
  region: Region | null;
  experience: ExperienceTier | null;
  onChange: (field: Field, value: string | null) => void;
}

const skills = listSkills();
const regions = listRegions();
const experiences = listExperiences();

const selectClass = [
  "w-full appearance-none rounded border border-rule bg-surface px-3 py-2.5",
  "text-ink text-[15px] font-medium",
  "cursor-pointer",
  "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20fill%3D%22%235C5C58%22%20d%3D%22M6%208L0%200h12z%22%2F%3E%3C%2Fsvg%3E')]",
  "bg-[length:12px_8px] bg-[right_12px_center] bg-no-repeat",
].join(" ");

export default function DropdownGroup({
  skill,
  region,
  experience,
  onChange,
}: DropdownGroupProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div>
        <label htmlFor="skill-select" className="sr-only">
          Skill
        </label>
        <select
          id="skill-select"
          aria-label="Pick your skill"
          className={selectClass}
          value={skill ?? ""}
          onChange={(e) =>
            onChange("skill", e.target.value || null)
          }
        >
          <option value="" disabled>
            Pick your skill
          </option>
          {skills.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="region-select" className="sr-only">
          Region
        </label>
        <select
          id="region-select"
          aria-label="Pick your region"
          className={selectClass}
          value={region ?? ""}
          onChange={(e) =>
            onChange("region", e.target.value || null)
          }
        >
          <option value="" disabled>
            Pick your region
          </option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="experience-select" className="sr-only">
          Experience
        </label>
        <select
          id="experience-select"
          aria-label="Pick your experience"
          className={selectClass}
          value={experience ?? ""}
          onChange={(e) =>
            onChange("experience", e.target.value || null)
          }
        >
          <option value="" disabled>
            Pick your experience
          </option>
          {experiences.map((x) => (
            <option key={x.id} value={x.id}>
              {x.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
