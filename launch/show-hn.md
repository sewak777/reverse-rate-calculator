# Show HN: The Reverse Rate Calculator — what freelancers actually charge

## Title

Show HN: The Reverse Rate Calculator — real freelancer rates with the receipts

## Body

I built a tool that answers "how much should I charge?" with actual data instead of math.

Every rate calculator I found asks you for an income goal and divides by hours. That's a budget tool, not a benchmark. The real data exists — scattered across YunoJuno surveys, Ruul.io reports, platform aggregators, and Reddit threads — but nobody puts it in one place.

The Reverse Rate Calculator does:

- Pick skill, region, experience → get hourly low/median/high
- Every number footnoted with a named, dated public source
- Project rate derived from skill-specific hour multipliers
- No accounts, no paywall for the core tool

Four skills live now (web design, web dev, copywriting, AI/ML consulting) across four regions. Adding eight more skills before public launch.

Stack: Next.js 15, static JSON, Tailwind v4, Vercel. No backend, no database. The whole product is one page over a JSON file.

The trust contract: no LLM-generated rates, no undated sources. If we can't tell you when the data was collected, we don't show the number.

thegaplist.com

Would love feedback on: (1) whether the data presentation feels trustworthy, (2) skills/regions you'd want to see next.

## Pre-written comments

**On "why not just use Google?"**
> The data exists on Google — in eight different tabs, behind jargon, mixed with content-mill SEO pages that cite each other. The value here is curation and citation, not novel data.

**On "how do you keep it fresh?"**
> Calendar event on the first Monday of each quarter. Re-pull every cited source. If the source updated, the cell updates. If it hasn't, a stale-data warning renders automatically after six months.

**On "how do you make money?"**
> Three ways, all disclosed on the page: (1) affiliate links to invoicing/contract tools, tagged as affiliate; (2) $9 niche rate reports per skill with every region and tier; (3) eventually a weekly newsletter. The core calculator is free and stays free.
