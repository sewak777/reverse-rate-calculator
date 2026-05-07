import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — The Reverse Rate Calculator",
  description:
    "How we source freelancer rate data: real reports, no LLM-generated numbers, no undated sources.",
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-12">
      <a
        href="/"
        className="text-accent text-[13px] font-medium hover:underline"
      >
        &larr; Back to the calculator
      </a>

      <h1 className="type-display text-ink mt-6">How we collect this data</h1>

      <div className="mt-8 space-y-6 text-ink text-[16px] leading-relaxed">
        <p>
          Every rate cell in the calculator is extracted from a named, dated,
          publicly available source. We pull from annual freelancer surveys
          (YunoJuno, Web Designer Academy), platform-published rate reports
          (Ruul.io, Index.dev), aggregator studies (Clockify, CalcStack), and
          large community threads on Reddit where freelancers self-report
          rates with enough context to verify.
        </p>

        <h2 className="type-h2 text-ink">What we do</h2>
        <ul className="list-disc pl-6 space-y-2 text-[15px]">
          <li>
            Cross-reference at least two independent sources per anchor cell
            (the US / 3&ndash;7yr tier for each skill).
          </li>
          <li>
            Scale other tiers and regions using documented multipliers derived
            from the same source set, not invented.
          </li>
          <li>
            Stamp every cell with a <code className="type-mono-rate text-[13px]">lastUpdated</code> date
            so you know exactly how fresh the number is.
          </li>
          <li>
            Re-pull every cited source on the first Monday of each quarter. If
            the source has updated, the cell updates. If it hasn&apos;t, the
            cell keeps its existing date and will eventually trigger a
            stale-data warning.
          </li>
        </ul>

        <h2 className="type-h2 text-ink">What we will not do</h2>
        <ul className="list-disc pl-6 space-y-2 text-[15px]">
          <li>
            <strong>No LLM-generated rates.</strong> Language models can
            summarize, format, and explain — but the actual dollar values come
            from human-curated extraction. We do not ask an AI &ldquo;what do
            copywriters charge?&rdquo; and publish the answer.
          </li>
          <li>
            <strong>No undated sources.</strong> If we cannot tell you when the
            data was collected, we do not show the number. A rate without a
            date is an opinion.
          </li>
          <li>
            <strong>No fabricated cells.</strong> If we lack data for a
            skill/region/experience combination, we say so and show the closest
            match — we never fill gaps with guesses.
          </li>
        </ul>

        <h2 className="type-h2 text-ink">How to spot a stale cell</h2>
        <p>
          Any cell whose <code className="type-mono-rate text-[13px]">lastUpdated</code> date
          is more than six months old automatically renders a warning banner:
          &ldquo;Heads up — this rate hasn&apos;t been refreshed
          since&nbsp;[date]. Treat as a directional signal.&rdquo; If you see
          that warning, the number is still real — it just may not reflect the
          current market.
        </p>

        <h2 className="type-h2 text-ink">Suggest a correction</h2>
        <p>
          If you spot a number that looks wrong, a source that has updated, or
          a skill/region we should add, email{" "}
          <a
            href="mailto:corrections@thegaplist.com"
            className="text-accent hover:underline"
          >
            corrections@thegaplist.com
          </a>
          . Include the cell (skill + region + experience), the number you
          think is wrong, and a link to a public source with the correct one.
          We will verify and update within one business day.
        </p>
      </div>

      <footer className="mt-12 border-t border-rule pt-6">
        <a
          href="/"
          className="text-accent text-[13px] font-medium hover:underline"
        >
          &larr; Back to the calculator
        </a>
      </footer>
    </main>
  );
}
