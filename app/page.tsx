"use client";

import { Suspense, useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DropdownGroup from "@/components/DropdownGroup";
import ResultsCard from "@/components/ResultsCard";
import AffiliateSidebar from "@/components/AffiliateSidebar";
import ReportUpsell from "@/components/ReportUpsell";
import {
  findCell,
  findClosest,
  getSource,
  listSkills,
  listRegions,
  listExperiences,
} from "@/lib/data";
import { projectRange } from "@/lib/projectRate";
import { initAnalytics, captureQuery } from "@/lib/analytics";
import type { SkillId, Region, ExperienceTier } from "@/lib/data";

function buildFaqSchema() {
  const skills = listSkills();
  const regions = listRegions();
  const questions: { q: string; a: string }[] = [];

  for (const s of skills) {
    for (const r of regions) {
      const cell = findCell(s.id, r.id, "3-7yr");
      if (!cell) continue;
      questions.push({
        q: `What do ${s.label.toLowerCase()} freelancers in ${r.label} charge?`,
        a: `The median hourly rate for ${s.label.toLowerCase()} freelancers in ${r.label} with 3\u20137 years of experience is $${cell.hourly.median}/hr (as of ${cell.lastUpdated}).`,
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };
}

const faqSchema = buildFaqSchema();

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}

function EmptyStateSilhouette() {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto mb-4"
      width="200"
      height="64"
      viewBox="0 0 200 64"
      fill="none"
    >
      <rect x="0" y="8" width="120" height="10" rx="3" fill="currentColor" opacity="0.06" />
      <rect x="0" y="26" width="160" height="10" rx="3" fill="currentColor" opacity="0.06" />
      <rect x="0" y="44" width="90" height="10" rx="3" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

function HomeInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    initAnalytics();
  }, []);

  const skill = (params.get("skill") as SkillId) || null;
  const region = (params.get("region") as Region) || null;
  const experience = (params.get("exp") as ExperienceTier) || null;

  const handleChange = useCallback(
    (field: "skill" | "region" | "experience", value: string | null) => {
      const next = new URLSearchParams(params.toString());
      const key = field === "experience" ? "exp" : field;
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      router.replace(`?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const allSelected = skill && region && experience;

  const skillLabel = useMemo(() => {
    if (!skill) return "";
    return listSkills().find((s) => s.id === skill)?.label ?? skill;
  }, [skill]);

  const result = useMemo(() => {
    if (!allSelected) return null;

    const exact = findCell(skill, region, experience);
    if (exact) {
      return { cell: exact, fallbackReason: null };
    }

    const closest = findClosest(skill, region, experience);
    if (closest && closest.reason !== "exact") {
      return { cell: closest.cell, fallbackReason: closest.reason };
    }

    return null;
  }, [allSelected, skill, region, experience]);

  useEffect(() => {
    if (allSelected) {
      captureQuery(skill, region, experience);
    }
  }, [allSelected, skill, region, experience]);

  const closestLabel = useMemo(() => {
    if (!result?.fallbackReason) return null;
    const c = result.cell;
    const sLabel =
      listSkills().find((s) => s.id === c.skill)?.label ?? c.skill;
    const rLabel =
      listRegions().find((r) => r.id === c.region)?.label ?? c.region;
    return `${sLabel} in ${rLabel}`;
  }, [result]);

  const resolvedSources = useMemo(() => {
    if (!result) return [];
    return result.cell.sources
      .map((id) => getSource(id))
      .filter((s) => s != null);
  }, [result]);

  const project = useMemo(() => {
    if (!result) return null;
    return projectRange(result.cell);
  }, [result]);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p className="text-muted text-[13px] font-medium tracking-wide uppercase">
        The Gap List &middot; #001
      </p>

      <h1 className="type-display text-ink mt-4">What should I charge?</h1>

      <p className="text-muted mt-2 text-lg">
        Real market rates, by skill and region. With the receipts.
      </p>

      <div className="mt-8">
        <DropdownGroup
          skill={skill}
          region={region}
          experience={experience}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8">
        {!allSelected && (
          <div className="rounded border border-rule bg-surface px-6 py-8 text-center text-muted">
            <EmptyStateSilhouette />
            Pick all three to see real rates.
          </div>
        )}

        {allSelected && !result && (
          <div className="rounded border border-rule bg-surface px-6 py-8 text-center text-muted">
            We don&apos;t have enough data for this combination yet.
          </div>
        )}

        {allSelected && result && (
          <>
            {result.fallbackReason && (
              <p className="text-ink text-[14px] mb-3 border-l-2 border-warning pl-3 py-1 bg-warning/10 rounded-r">
                We don&apos;t have enough data for this combination yet. The
                closest match is {closestLabel}, showing below.
              </p>
            )}
            <ResultsCard
              cell={result.cell}
              sources={resolvedSources}
              project={project!}
            />
          </>
        )}
      </div>

      {allSelected && result && (
        <>
          <p className="text-muted mt-8 italic text-[15px]">
            This is what people are charging. What you charge is up to you.
          </p>

          <AffiliateSidebar skill={result.cell.skill} skillLabel={skillLabel} />
          <ReportUpsell skill={result.cell.skill} skillLabel={skillLabel} />
        </>
      )}

      <footer className="mt-12 border-t border-rule pt-6">
        <a
          href="/methodology"
          className="text-accent text-[13px] font-medium hover:underline"
        >
          How we collect this data &rarr;
        </a>
      </footer>
    </main>
  );
}
