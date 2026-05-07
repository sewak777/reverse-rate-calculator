import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (initialized) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    persistence: "localStorage",
  });
  initialized = true;
}

export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!initialized) initAnalytics();
  posthog.capture(event, properties);
}

export function captureQuery(skill: string, region: string, experience: string) {
  capture("query_submitted", { skill, region, experience });
}

export function captureSourceClick(sourceId: string) {
  capture("source_clicked", { source_id: sourceId });
}

export function captureAffiliateClick(skill: string, name: string) {
  capture("affiliate_clicked", { skill, name });
}

export function captureReportCta(skill: string) {
  capture("report_cta_clicked", { skill });
}
