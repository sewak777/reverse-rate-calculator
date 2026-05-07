# Reddit Launch Posts

## r/freelance — "I scraped 9 public rate reports so you can answer 'what should I charge?' in 10 seconds"

Every freelancer rate calculator asks you for an income goal and does division. That's budgeting, not benchmarking.

I built the Reverse Rate Calculator — pick your skill, region, and experience level, and get the actual hourly low/median/high that freelancers charge, with every number sourced and dated.

**What's in it:**
- 4 skills (web design, web dev, copywriting, AI/ML consulting), 4 regions, 4 experience tiers
- Every cell footnoted with the public source (YunoJuno, Ruul.io, SoloPricing, etc.)
- Project rate ranges derived from skill-specific hour multipliers
- Free, no signup

**What's not in it:**
- No LLM-generated numbers. The dollar values are human-extracted from published reports.
- No undated sources. If we don't know when it was collected, it doesn't go in.

thegaplist.com

Expanding to 12 skills soon — what would you want to see next?

---

## r/forhire — "Free tool: look up what freelancers in your skill actually charge (with sources)"

I kept seeing "what should I charge?" posts here, so I built a thing.

The Reverse Rate Calculator pulls from 9 public freelancer rate reports and shows you the hourly low/median/high for your skill + region + experience. Every number is sourced. No signup required.

Currently covers web design, web development, copywriting, and AI/ML consulting across US, UK, EU, and Latin America.

thegaplist.com

Not selling anything — the core tool is free. Happy to add skills if there's demand.

---

## r/SideProject — "Weekend build: a rate calculator that works backwards — starts from what people charge, not what you want to earn"

**Problem:** Every freelance rate calculator is a budget tool. You enter a salary goal and it divides by hours. A first-year freelancer has no benchmark, so they lock in undercharging.

**Solution:** The Reverse Rate Calculator. Three dropdowns (skill, region, experience) → real market rates from 9 public sources, with citations.

**Stack:** Next.js 15, static JSON, Tailwind v4, Vercel. No backend. The whole product is one page reading a JSON file.

**What I learned building it:**
- The data exists but is wildly scattered. The curation is the product.
- Trust is the moat. Mono-spaced numbers + visible citations + last-updated stamps make the data feel like evidence, not opinion.
- Static JSON > database for this. Quarterly manual refresh is a feature, not a limitation — it forces re-verification.

thegaplist.com — feedback welcome, especially on what skills to add next.
