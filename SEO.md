# SEO.md - Scrambled Legs Discoverability Plan

_Last updated: 2026-04-28. Author: planning doc, not yet implemented in code._

This document is the master plan for making
[thescrambledlegs.com](https://thescrambledlegs.com/) findable on Google
(and Bing, and Slack/iMessage previews) for Duluth-area mountain bike
searches. It is honest about what a client-rendered React SPA on GitHub
Pages can and cannot do, sticks to free tools, and is sized for a
hobbyist team site, not an enterprise SaaS.

---

## TL;DR

- The site is currently **almost invisible** to search engines and link
  unfurlers: minimal `<head>`, no per-route meta, no Open Graph, no
  structured data, no `sitemap.xml`, no `robots.txt`. Even the homepage
  title is just "Scrambled Legs."
- The single biggest free win is a richer `public/index.html` plus a
  small `react-helmet-async` wrapper (`<SEO />`) used on every page. That
  alone fixes social sharing, gives Google something to ingest on the
  first crawl wave, and costs nothing.
- **GitHub Pages + CRA can't do SSR**, but Googlebot does render JS. The
  realistic outcome is "indexed correctly within a few weeks if we feed
  it a sitemap and helpful per-route titles." Bing and social crawlers
  are weaker JS renderers, so we should still put good fallback meta in
  the static HTML.
- Realistic timeline: **3-6 months** to start ranking for long-tail
  Duluth MTB queries; **never** for "mountain bike" alone (REI/Trek own
  that). Brand queries ("scrambled legs duluth") should rank within
  weeks.
- Hard constraint: every recommendation in this doc is free. Anything
  paid is flagged and given a free alternative.

---

## Reality check: SPA SEO on GitHub Pages

### What actually happens when Googlebot visits a CRA app

Google uses a two-wave indexing process for JavaScript-heavy sites. In
wave 1, Googlebot fetches `index.html`, sees the empty `<div id="root">`
shell and the meta tags, and indexes that immediately. In wave 2 (often
days later, sometimes weeks), the Web Rendering Service runs the JS,
renders the DOM, and re-indexes whatever it now sees. This is well
documented in Google's Search Central JS basics and in 2025 case studies.

**Practical implications:**

1. The static `<head>` in `public/index.html` is the **only** thing
   guaranteed to be seen on the first pass. Make it count: title,
   description, OG, Twitter, canonical, JSON-LD Organization.
2. Per-route titles set by `react-helmet-async` arrive in wave 2. Google
   handles this fine in 2025-2026 for sites of our size, but Bing,
   DuckDuckGo, Slack, iMessage, and Facebook's link unfurler are
   **weaker JS renderers**. They will see only the static head.
3. We have no SSR. CRA does not support it. Migrating to Next.js is out
   of scope. Pre-rendering with `react-snap` is technically possible but
   adds build complexity and is no longer actively maintained
   (last meaningful release ~2020). **Recommendation: skip
   pre-rendering. Just write good static head content + per-route
   helmet.** If link previews continue to look bad after we ship the
   plan, revisit pre-rendering as a phase 2.

### What GitHub Pages can and can't do for SEO

| Capability | GitHub Pages? | Notes |
|---|---|---|
| Custom domain | yes | Already in place (`thescrambledlegs.com`). |
| HTTPS | yes | GH Pages auto-provisions Let's Encrypt. |
| Static `robots.txt` | yes | Drop in `public/robots.txt`, served at root. |
| Static `sitemap.xml` | yes | Drop in `public/sitemap.xml`, served at root. |
| Custom HTTP headers (`Cache-Control`, `Link:` preload) | NO | GH Pages serves with fixed headers. We can't add HSTS, CSP, Link headers, etc. |
| Server redirects (301/302) | NO | Only client-side redirects (the SPA fallback hack already in `index.html`). |
| Edge caching tuning | NO | Whatever Fastly/GH gives us. |
| `.well-known/` files | yes | Served as static. |
| 404 page | yes | `404.html`. The repo already uses the SPA-on-GH-Pages redirect trick. |

The "no custom headers" thing is the only big limitation. It means we
can't issue real 301s for old paths (we already work around this with
`<Navigate>` in `App.js`), and we can't push CSP/HSTS for a stronger
trust signal. Search engines tolerate this fine.

### One quirky thing about the current setup

`public/index.html` currently sets aggressive cache-busting meta tags:

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

These are mostly ignored by modern browsers and don't affect search
indexing, but they **do** hurt repeat-visit performance (every asset
re-downloaded). They were probably added to dodge a stale-deploy bug.
**Recommend removing them** as part of the perf hygiene pass. Cache
busting is already handled by CRA's content-hashed filenames.

---

## Target keywords

Keyword research is judgement-driven here. There are no rich keyword
volume numbers without paid tools (SEMrush/Ahrefs cost $99-$129/mo
minimum). Free alternatives we can use: Google Search Console (after
verification), Google autocomplete, "People also ask," Reddit thread
counts in r/Duluth, and the COGGS site to see what local language
people use.

The site is a hobby club. Realistic goals: rank for **brand** queries
immediately, **brand+geo** queries within 1-2 months, and **long-tail
local** queries within 3-6 months. We will not rank for "mountain bike"
or "Duluth" alone, and we should not try.

### Tier 1 - Brand and brand-defense (must own these)

These should rank #1 within weeks once indexed. If we don't rank for
our own name, nothing else matters.

| Keyword | Intent | Difficulty | Realistic? |
|---|---|---|---|
| scrambled legs | nav | trivial | yes, #1 |
| scrambled legs duluth | nav | trivial | yes, #1 |
| scrambled legs mountain bike | nav | trivial | yes, #1 |
| scrambled legs mtb | nav | trivial | yes, #1 |
| scrambled legs bike team | nav | trivial | yes, #1 |
| scrambled legs racing | nav | trivial | yes |
| stoked and yoked | brand tagline | low | yes |
| scrambled legs duluth mn | nav | trivial | yes |
| the scrambled legs | nav | trivial | yes |
| scrambledlegs | nav | trivial | yes |

### Tier 2 - High-intent local (the real prize)

These are the queries someone in Duluth types when they want to find a
team to ride with. Long-tail, low-volume, but **high conversion**.
Realistic to rank in the top 10 within 3-6 months given thin local
competition.

| Keyword | Intent | Difficulty | Realistic? |
|---|---|---|---|
| duluth mountain bike team | nav/info | low | yes, top 5 |
| duluth mountain bike club | info | low | yes, top 10 |
| duluth mtb team | nav | low | yes, top 5 |
| duluth mtb club | info | low | yes, top 10 |
| mountain bike team duluth mn | nav | low | yes |
| mountain bike club duluth mn | info | low | yes |
| join duluth mountain bike club | trans | low | yes |
| duluth bike racing team | info | low | yes |
| duluth mountain bike racing team | nav | low | yes |
| twin ports mountain bike team | nav | low | yes |
| twin ports mtb club | info | low | yes |
| duluth group mountain bike rides | info | medium | maybe top 10 |
| duluth wednesday night mountain bike ride | info | low | yes |
| mountain bike group rides duluth | info | low | yes |
| duluth mtb group ride | info | low | yes |
| duluth mountain bike events | info | low | yes |
| duluth mountain bike race calendar | info | medium | maybe |
| beginner mountain bike duluth | info | medium | tough (COGGS owns) |
| women's mountain bike duluth | info | medium | maybe |
| coggs duluth ride partners | info | medium | tough |

### Tier 3 - Trail-name long-tail (write a page per trail)

These work because trail names are specific and not many sites cover
them at depth. Lester Park already has its own page; the rest are
content opportunities.

| Keyword | Intent | Difficulty | Realistic? |
|---|---|---|---|
| lester park mountain biking | info | medium | yes (existing page) |
| lester park mtb trails | info | medium | yes |
| lester park trail conditions | info | medium | yes |
| lester park duluth biking | info | low | yes |
| hartley park mountain biking | info | medium | maybe |
| hartley mtb duluth | info | low | yes |
| hartley trail conditions | info | low | yes |
| piedmont mountain biking duluth | info | medium | maybe |
| piedmont mtb trails | info | low | yes |
| brewer park mtb | info | low | yes |
| mission creek mountain biking | info | medium | maybe |
| mission creek mtb duluth | info | low | yes |
| spirit mountain mtb trails | info | medium | maybe |
| duluth traverse mtb | info | medium | tough (COGGS owns) |
| duluth traverse trail map | info | medium | tough |
| duluth single track | info | medium | tough |
| duluth flow trails | info | low | yes |
| duluth IMBA gold ride center | info | low | yes |

### Tier 4 - Regional / North Shore

Broader queries where we won't dominate but can get a foothold.

| Keyword | Intent | Difficulty | Realistic? |
|---|---|---|---|
| north shore minnesota mountain biking | info | high | unlikely top 10 |
| northern minnesota mtb team | info | medium | maybe |
| superior wi mountain biking | info | medium | maybe |
| twin ports cycling team | info | low | yes |
| arrowhead mtb minnesota | info | medium | maybe |
| minnesota mountain bike team | info | high | no |
| midwest mountain bike race team | info | high | no |

### Tier 5 - Informational / "ride with us"

Pages we should write, that match what new riders search.

| Keyword | Intent | Difficulty | Realistic? |
|---|---|---|---|
| how to start mountain biking duluth | info | medium | maybe |
| best mountain bike trails for beginners duluth | info | medium | tough |
| where to mountain bike in duluth | info | medium | maybe |
| duluth mountain bike trails map | info | medium | tough |
| mountain bike rentals duluth | trans | medium | no (we don't rent) |
| mountain bike skills clinic duluth | info | low | yes if we run them |
| youth mountain bike duluth | info | medium | maybe |
| junior mtb team duluth | info | low | yes |
| nica minnesota | info | medium | tough |
| nica northern minnesota | info | low | yes |

### Tier 6 - Event-specific (huge once `/events/:eventId` ships)

Each event page becomes a long-tail magnet **if** we mark up `Event`
JSON-LD properly. Google indexes these into the events feature in
search and sometimes Maps.

| Pattern | Example | Why |
|---|---|---|
| `[event name] duluth` | "saturday shred duluth" | Brand+geo |
| `[event name] [date]` | "scrambled legs gravel grinder may 2026" | Calendar searchers |
| `[trail] group ride [day]` | "lester park group ride saturday" | Local-intent |
| `mountain bike race duluth [year]` | "mountain bike race duluth 2026" | Annual recurring |
| `duluth mtb race [season]` | "duluth mtb race summer 2026" | Seasonal |
| `kids mountain bike race duluth` | - | Niche-low-comp |

**Rough total: ~95 keywords across the tiers.** That should be plenty
to seed copy on each page without the user having to brainstorm.

---

## Quick wins (free, mostly meta)

These are doable in 1-2 evenings of work. None require new dependencies
beyond `react-helmet-async`. Listed in priority order.

### 1. Title and description per route

Right now every route renders with title "Scrambled Legs" and
description "Home of the Twin Ports premier mountain bike team." That's
fine for the homepage, terrible for `/lester-park` and `/events/:id`.

**Fix:** install `react-helmet-async` (~5KB gzipped, MIT, actively
maintained, the community-standard fork that handles React 18 and
concurrent mode correctly). Wrap `<App />` in `<HelmetProvider>` once.
Add a thin `<SEO />` wrapper component (defined below) used by every
page.

Per-route copy guidance:

- **Home (`/`)** -
  - title: `Scrambled Legs - Duluth, MN Mountain Bike Team`
  - description: `Duluth's stoked-and-yoked mountain bike team. Group rides, race calendar, trail conditions, and the legendary hot dog counter. Twin Ports MTB.`
- **`/lester-park`** -
  - title: `Lester Park Trail Conditions - Scrambled Legs`
  - description: `Live-ish Lester Park mountain bike trail conditions in Duluth, MN. Rideable today? Check before you load up.`
- **`/hotdog-counter`** -
  - title: `Hot Dog Counter - Scrambled Legs`
  - description: `Counting hot dogs since whenever. Don't ask. The official Scrambled Legs hot dog tally.`
  - **`<meta name="robots" content="noindex">`** - this is a gag, don't waste crawl budget on it.
- **`/admin1`** -
  - **`<meta name="robots" content="noindex, nofollow">`** - admin
    page, gated, never indexed.
- **`/events/:eventId`** (planned) -
  - title: `${event.name} - ${formattedDate} - Scrambled Legs`
  - description: First 155 chars of event description, dynamic.
  - JSON-LD `Event` markup (see section 3).

### 2. Open Graph and Twitter cards

Currently zero OG tags. Sharing the site to Slack, iMessage, Discord,
Facebook, or Twitter/X produces no preview at all.

**Required tags for every page** (Twitter falls back to OG, so we
mostly only need OG plus one Twitter tag):

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Scrambled Legs">
<meta property="og:title" content="…">
<meta property="og:description" content="…">
<meta property="og:url" content="https://thescrambledlegs.com/…">
<meta property="og:image" content="https://thescrambledlegs.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Scrambled Legs - Duluth MTB team logo">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image:alt" content="Scrambled Legs - Duluth MTB team logo">
```

**Image asset to produce:** a single `og-image.png` at **1200x630**
(the standard 1.91:1 OG image dimension). PNG ok, WebP not universally
supported by unfurlers. Keep under 1MB. Should feature the Scrambled
Legs logo, the egg/hot-dog motif, and readable text saying "Scrambled
Legs - Duluth MTB." Drop it in `public/og-image.png`. Per-page custom
images can come later (e.g. `og-lester.png` for the Lester page) but
one universal image is enough to start.

### 3. JSON-LD structured data

Two types of structured data have meaningful payoff for this site:

**A. `SportsOrganization` (or `SportsClub`) for the site as a whole.**
Embed in `public/index.html` so it's in the static HTML and seen on the
first crawl wave. This is what tells Google "this is a sports
organization in Duluth, MN" - the foundation of our local relevance
signal.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Scrambled Legs",
  "alternateName": ["The Scrambled Legs", "Scrambled Legs MTB"],
  "url": "https://thescrambledlegs.com/",
  "logo": "https://thescrambledlegs.com/logo512.png",
  "description": "Duluth's premier mountain bike race team. Stoked and yoked. Group rides, races, and trail conditions for Lester Park, Hartley, Piedmont, and Mission Creek.",
  "sport": "Mountain biking",
  "areaServed": {
    "@type": "City",
    "name": "Duluth",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Minnesota"
    }
  },
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Duluth",
      "addressRegion": "MN",
      "addressCountry": "US"
    }
  },
  "sameAs": [
    "https://www.instagram.com/scrambledlegs/",
    "https://www.strava.com/clubs/scrambled-legs"
  ]
}
</script>
```

(The `sameAs` URLs are placeholders - put in whatever real social/Strava
URLs the team has. The more authoritative cross-references, the better.)

Note: Google does not currently render rich results _specifically_ for
`SportsOrganization`, but it uses the markup as a context/knowledge
graph signal. There's no downside to including it.

**B. `Event` for each ride/race once `/events/:eventId` exists.** This
**does** unlock rich results - Google has a dedicated events feature in
search and Maps, and small local clubs benefit disproportionately
because event-rich results have low competition.

Sample, fully validated against Google's Rich Results Test (the spec
favours `Event`, not `SportsEvent` - see Google's structured data
policy):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Wednesday Night Lester Lap",
  "description": "Casual no-drop group ride at Lester Park. All paces. Show up, get yoked. Helmets and good vibes required. Meet at the Lester chalet parking lot.",
  "startDate": "2026-06-03T18:00:00-05:00",
  "endDate": "2026-06-03T20:00:00-05:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Lester Park Trailhead",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5300 Lester River Rd",
      "addressLocality": "Duluth",
      "addressRegion": "MN",
      "postalCode": "55804",
      "addressCountry": "US"
    }
  },
  "image": [
    "https://thescrambledlegs.com/events/wnll-1x1.jpg",
    "https://thescrambledlegs.com/events/wnll-4x3.jpg",
    "https://thescrambledlegs.com/events/wnll-16x9.jpg"
  ],
  "organizer": {
    "@type": "SportsOrganization",
    "name": "Scrambled Legs",
    "url": "https://thescrambledlegs.com/"
  },
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://thescrambledlegs.com/events/wnll-2026-06-03",
    "validFrom": "2026-04-01T00:00:00-05:00"
  },
  "performer": {
    "@type": "SportsTeam",
    "name": "Scrambled Legs"
  }
}
```

Google requires these properties for the events rich result: `name`,
`startDate`, `location`. Everything else is bonus. The `image` array
giving 1:1, 4:3, and 16:9 ratios is recommended but not required.

Validate every event with the
[Rich Results Test](https://search.google.com/test/rich-results) before
publishing. Costs nothing.

### 4. sitemap.xml + robots.txt

Both files live in `public/` and are served at the site root by GH
Pages.

**Proposed `public/robots.txt`:**

```
# robots.txt for thescrambledlegs.com

User-agent: *
Allow: /

# Don't index the admin or the gag counter
Disallow: /admin1
Disallow: /admin1/
Disallow: /hotdog-counter
Disallow: /hot-dog-counter
Disallow: /hd.html

# IndexNow key file (Bing/Yandex/etc. fast indexing)
# Allow: /<your-indexnow-key>.txt

Sitemap: https://thescrambledlegs.com/sitemap.xml
```

(We could also let `/hotdog-counter` be indexed for the lulz, but it
dilutes our topical relevance. Recommend Disallow.)

**Proposed `public/sitemap.xml`:** static for now, regenerated by hand
or by a build script when routes change. For ~5 routes, by-hand is
totally fine. We can graduate to the
[`cicirello/generate-sitemap`](https://github.com/cicirello/generate-sitemap)
GitHub Action later if we add many event pages.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://thescrambledlegs.com/</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://thescrambledlegs.com/lester-park</loc>
    <lastmod>2026-04-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- /events/:eventId pages get added dynamically here when the
       calendar ships. One <url> entry per published event. -->
</urlset>
```

Notes:
- `priority` and `changefreq` are mostly ignored by Google in 2025 but
  cost nothing to include and Bing still reads them.
- `lastmod` does still matter and Google honors it; bump it whenever
  page content changes.
- Do **not** include `/admin1`, `/hotdog-counter`, or any redirects.
- Add a `.nojekyll` file at the repo root if it isn't there - GH Pages
  defaults to Jekyll, which can mangle files starting with `_`. Already
  a known footgun for sitemaps.

### 5. Canonical URLs

For every page, output:

```html
<link rel="canonical" href="https://thescrambledlegs.com/<route>">
```

Why: prevents duplicate-content confusion if the site is ever accessed
via the `username.github.io/sl/` GH Pages default domain, or via
`http://` vs `https://`, or with trailing slashes. The `<SEO />`
component (below) handles this.

### 6. Manifest enrichment

Current `manifest.json` is presumably the CRA default. Make sure it
includes:

- `"name": "Scrambled Legs"`
- `"short_name": "Scrambled Legs"`
- `"description": "Duluth's mountain bike team"`
- `"start_url": "/"`
- `"display": "standalone"`
- `"theme_color": "#FF8800"` (matches index.html)
- `"background_color": "#2c3539"` (matches noscript fallback)
- icons: 192x192 and 512x512 (PWA minimum), plus a `maskable` variant for
  Android adaptive icons. Use [maskable.app](https://maskable.app) (free)
  to generate the maskable.

This barely affects search, but it's listed in Lighthouse and it makes
the "Add to Home Screen" UX on iOS/Android non-embarrassing.

---

## Content opportunities

### Per-route copy improvements

Search engines need actual on-page text to match keywords against.
"Stoked and yoked" by itself isn't enough.

- **Home** - add a paragraph above the fold (or in a meta-description-
  visible spot) that names: Duluth, MN; mountain bike; the team; group
  rides; the trails (Lester, Hartley, Piedmont, Mission Creek);
  COGGS membership/affiliation if applicable. Don't keyword-stuff;
  write like a human. Two short sentences is enough.
- **`/lester-park`** - the page exists but presumably it's just a
  conditions widget. Add a plain-English paragraph: "Lester Park is
  one of the five core trail clusters in the Duluth Traverse system,
  built and maintained by COGGS. The mountain bike trails are best
  ridden when dry; check status above before loading up." That single
  paragraph is the kind of helpful, original content the
  March-2024-and-later Helpful Content System rewards.
- **`/hotdog-counter`** - leave it as a noindex gag. No SEO value, but
  the site charm is part of the brand and that's fine.
- **About page (recommended new route, e.g. `/about`)** - the single
  highest-leverage piece of content we don't have. An "About the
  Scrambled Legs" page with: who we are, where we ride, when we ride,
  how to join, photo, links to Strava/Instagram, COGGS link. Targets
  Tier 2 keywords directly. This is the page Google's E-E-A-T
  signals reward. Add `Person` schema for any named members if comfort
  level allows.
- **Trail pages (one per cluster, future work)** -
  `/trails/hartley`, `/trails/piedmont`, `/trails/mission-creek`,
  `/trails/spirit-mountain`. Each becomes a long-tail magnet. Even a
  300-word page with a photo, a quick description, "best for: …",
  parking, and our team's favourite line, is enough.

### `/events/:id` - the JSON-LD payoff

The single best SEO investment after the meta basics. Each event page
gets:
1. Per-event `<title>` and meta description (helmet).
2. Per-event Open Graph image if we have one (event flyer).
3. `Event` JSON-LD (template above).
4. The page URL added to `sitemap.xml` when the event is published.

Done well, individual event pages can rank in their own right and show
up in the dedicated Google "Events" feature in the SERP.

### About page geo signals

If we add an About page, sprinkle these naturally (not as a list):

- "Based in Duluth, Minnesota, on the western tip of Lake Superior."
- "We ride the COGGS trails - Lester Park, Hartley, Piedmont-Brewer, and
  Mission Creek - including the Duluth Traverse spine."
- "Twin Ports area" / "North Shore" mentions.
- A `Place` JSON-LD or just plain copy saying "based in Duluth, MN."

Geo signals + name signals + topic signals = local relevance.

---

## Per-route prescription table

The canonical reference. Every existing or planned route, with its
title, description, OG image, JSON-LD type, and canonical.

| Route | Title (≤60 chars) | Description (≤155 chars) | og:image | JSON-LD type | robots |
|---|---|---|---|---|---|
| `/` | Scrambled Legs - Duluth, MN Mountain Bike Team | Duluth's stoked-and-yoked MTB team. Group rides, race calendar, trail conditions for Lester, Hartley, Piedmont, Mission Creek. | `/og-image.png` | SportsOrganization (in static head) + WebSite | index, follow |
| `/lester-park` | Lester Park Trail Conditions - Scrambled Legs | Live Lester Park mountain bike trail conditions in Duluth, MN. Rideable today? Check before you load up. | `/og-lester.png` (future) | TouristAttraction or Place (optional) | index, follow |
| `/hotdog-counter` | Hot Dog Counter - Scrambled Legs | The official Scrambled Legs hot dog tally. Don't ask. | `/og-image.png` | none | **noindex** |
| `/admin1` | (default) | (default) | (none) | none | **noindex, nofollow** |
| `/events/:eventId` | `${event.name} - ${date} - Scrambled Legs` | First ~150 chars of event description. | `/events/${id}.png` if available, else `/og-image.png` | Event | index, follow |
| `/about` (future) | About - Duluth Mountain Bike Team \| Scrambled Legs | Who we are, where we ride, how to join Duluth's friendliest MTB crew. | `/og-image.png` | SportsOrganization + AboutPage | index, follow |
| `/trails/hartley` (future) | Hartley Park Mountain Biking - Scrambled Legs | Trail notes, parking, and our favorite Hartley lines from Duluth's Scrambled Legs MTB team. | `/og-hartley.png` | TouristAttraction or Place | index, follow |

Same template applies for any other future trail page.

---

## Implementation file map

The following files will need to change or be created. **This doc does
not yet write code.** Treat this as the spec for a follow-up PR.

| File | Action | Reason |
|---|---|---|
| `public/index.html` | edit | Add base meta (description, theme-color stays), full OG/Twitter set with sensible site-wide defaults, canonical, JSON-LD `SportsOrganization`. Remove the cache-busting meta. |
| `public/robots.txt` | **new** | See section "Quick wins / 4". |
| `public/sitemap.xml` | **new** | See section "Quick wins / 4". Hand-maintained for now. |
| `public/og-image.png` | **new asset** | 1200x630 site-wide social image. |
| `public/.nojekyll` | new (if absent) | Ensure GH Pages doesn't try to Jekyll-process the site and break sitemap/robots serving. |
| `public/manifest.json` | edit | Real name/desc, theme/background colors, 192/512 + maskable icons. |
| `package.json` | edit | Add `react-helmet-async` dependency (only new dep). |
| `src/index.js` | edit | Wrap `<App />` in `<HelmetProvider>`. |
| `src/components/SEO.jsx` | **new** | Reusable `<SEO />` component, see template below. |
| `src/pages/Home.js` | edit | Use `<SEO />` with home title/description. |
| `src/pages/LesterPark.js` | edit | Use `<SEO />` with Lester title/description. |
| `src/pages/HotDogCounter.js` | edit | Use `<SEO noindex />`. |
| `src/pages/AdminPage.js` | edit | Use `<SEO noindex nofollow />`. |
| (future) `src/pages/Event.js` | new | Use `<SEO />` and emit Event JSON-LD per event. |
| `.github/workflows/*.yml` | maybe edit later | Add a step to regenerate sitemap.xml from a routes/events list, if/when manual maintenance gets old. Optional. |

### Proposed `<SEO />` component

This is the spec. Not yet code. Drop in `src/components/SEO.jsx` when
implementing.

```jsx
// src/components/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://thescrambledlegs.com';
const DEFAULT_TITLE = 'Scrambled Legs - Duluth, MN Mountain Bike Team';
const DEFAULT_DESCRIPTION =
  "Duluth's stoked-and-yoked mountain bike team. Group rides, race calendar, and trail conditions for Lester, Hartley, Piedmont, and Mission Creek.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  nofollow = false,
  jsonLd, // pass arbitrary JSON-LD object(s); array allowed
}) {
  const fullTitle = title
    ? `${title} - Scrambled Legs`
    : DEFAULT_TITLE;
  const url = `${SITE_URL}${path}`;
  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');
  const jsonLdArray = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
    ? [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Scrambled Legs" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Scrambled Legs - Duluth MTB" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:alt" content="Scrambled Legs - Duluth MTB" />

      {jsonLdArray.map((obj, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
```

### Per-page usage example

```jsx
// src/pages/LesterPark.js
import SEO from '../components/SEO';

export default function LesterPark() {
  return (
    <>
      <SEO
        title="Lester Park Trail Conditions"
        description="Live Lester Park mountain bike trail conditions in Duluth, MN. Rideable today? Check before you load up."
        path="/lester-park"
      />
      {/* ...rest of page... */}
    </>
  );
}
```

---

## Performance hygiene checklist

Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) are a real but
modest ranking factor. For a small site, these are mostly about not
embarrassing ourselves. Quick wins:

- [ ] **Remove the no-cache meta tags** from `public/index.html`. They
      hurt repeat-visit LCP and don't actually do anything search engines
      care about. CRA already content-hashes assets.
- [ ] **Set explicit `width` and `height` on every `<img>`** including
      the logo, the egg, and any future event flyer thumbnails. This is
      the #1 free CLS win.
- [ ] **Add `loading="lazy"` and `decoding="async"`** to all
      below-the-fold images.
- [ ] **Preload the Fredoka and Inter font files**, not just preconnect.
      Add `<link rel="preload" as="font" type="font/woff2" crossorigin>`
      for the actual woff2 URLs (look them up once via the Google Fonts
      stylesheet response). This is meaningful LCP improvement on slow
      connections.
- [ ] **`font-display: swap`** is already implicit in the Google Fonts
      `&display=swap` query string. Good.
- [ ] **Remove the duplicate `&display=swap`** from the Google Fonts
      URL in `index.html` line 21 - it's listed twice, harmless but
      sloppy.
- [ ] **Tree-shake / lazy-load the Hot Dog Counter and Admin pages.**
      Use `React.lazy()` and `<Suspense>`. There's no reason a homepage
      visitor downloads admin code. Probably saves 30-100KB of bundle.
- [ ] **Run Lighthouse** (Chrome DevTools, free) once and fix anything
      red. Target 90+ on Performance and 100 on SEO.
- [ ] **Run [PageSpeed Insights](https://pagespeed.web.dev/)** on the
      production site. Free, gives field data from CrUX once we have
      enough traffic.
- [ ] **Defer non-critical scripts.** Firebase init can run after first
      paint if it's not blocking. CRA's default chunking handles much
      of this; just verify the homepage doesn't pull the whole Firebase
      SDK.
- [ ] **Image format**: convert any logo PNGs over 50KB to WebP or
      AVIF. WebP is universal in 2025-2026.
- [ ] **The OG image should be PNG/JPG**, not WebP. Some unfurlers still
      choke on WebP.

A note on Core Web Vitals data: Google only reports field data once a
site has sustained CrUX traffic (~28 days at some minimum visitor
threshold). A small site may show "Insufficient data" forever. That's
fine - Lighthouse lab data is enough to optimize against.

---

## Off-site / linkbuilding levers

Backlinks remain the single strongest ranking signal Google uses, and
they're the lever a small hobby site has the most trouble pulling.
Realistic free options:

| Source | Effort | Likely backlink? | Notes |
|---|---|---|---|
| **COGGS** ([coggs.com](https://www.coggs.com)) | low | medium | Ask if they list affiliated teams or have a "rides" page. Even a no-follow link is a relevance signal. |
| **Visit Duluth** ([visitduluth.com](https://visitduluth.com)) | medium | low | They publish a mountain biking guide. Pitch a guest write-up or a "rides this weekend" tip. |
| **Destination Duluth** ([destinationduluth.org](https://destinationduluth.org)) | medium | low | Local boosterism; they cover MTB community stories. |
| **City of Duluth Parks** ([duluthmn.gov](https://duluthmn.gov/parks/)) | low | low | Unlikely to link out, but listing matters. |
| **r/Duluth, r/MTB, r/MinnesotaMtb** | low (ongoing) | low | Comments with helpful answers + occasional link. **Don't spam.** Reddit nofollows links but search visibility from Reddit threads themselves is high. |
| **Strava Club** | low | yes (nofollow) | Create/maintain a Strava club, link out from it. Strava clubs themselves rank for "[city] mtb club" sometimes. |
| **Instagram bio link** | trivial | yes (nofollow) | Standard practice. |
| **Facebook page / group** | low | yes (nofollow) | Even a sleepy FB page gives Google another sameAs node. |
| **Local bike shops** (Continental, Ski Hut, Twin Ports Cyclery) | medium | medium | Ask if they'd put a "local clubs" section on their site. Reciprocate by mentioning them as sponsors/supporters on our about page. |
| **NICA / Minnesota Cycling League** (if relevant) | medium | medium | Affiliated team listings. |
| **Local news** (Duluth News Tribune, Perfect Duluth Day) | high | high if landed | Pitch a story angle: "Local volunteer race team turns 5," etc. PDD especially links freely. |
| **Podcasts / blogs** about local MTB | high | medium | Interview = backlink + audience. |
| **GitHub README** of this repo | trivial | yes | A backlink from the project README to the live site is a small but free signal. |

Tactic that **does not work**: paid link directories, "submit your URL"
sites, and any of the spammy "100 backlinks for $5" Fiverr stuff. Worse
than useless.

The "sameAs" array in the SportsOrganization JSON-LD does double duty:
it both tells Google those identities are us, and creates a small
relevance graph.

---

## Monitoring

### Free tools to set up (in this order)

1. **Google Search Console** - free, mandatory.
   - Use **Domain property** (covers `https`, `http`, all subdomains).
     Verify via DNS TXT record at the registrar - takes one record and
     ~10 minutes. Do **not** use URL-prefix property; you'll only see
     half your data.
   - Submit `sitemap.xml` once verified.
   - First useful data appears in 3-7 days.
2. **Bing Webmaster Tools** - free, low effort, real ranking gains.
   Submit the sitemap; bonus, importing from Google Search Console
   takes 30 seconds.
3. **IndexNow** - free protocol pinged by Bing/Yandex/Naver/etc. Drop
   a `<key>.txt` file at `public/<key>.txt` and ping the IndexNow
   endpoint when content changes. For a low-update site this is
   overkill in v1, but worth knowing about for the events feed.
4. **Google Rich Results Test** - browser tool, free. Validate every
   JSON-LD payload before merging.
5. **Schema.org Validator** - browser tool, free. Stricter than
   Google's; catches typos.
6. **PageSpeed Insights** - free, runs Lighthouse + CrUX.
7. **Lighthouse in Chrome DevTools** - free, run locally before each
   release.
8. **Browser link unfurl debuggers** -
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/),
   [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   (deprecated but cards still work),
   [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/),
   plus generic [opengraph.xyz](https://www.opengraph.xyz/). Use after
   any OG image change.

Avoid: paid Ahrefs/SEMrush/Moz subscriptions ($99-$200+/mo each). For a
hobbyist site they're massive overkill. The free tier of
[Ubersuggest](https://neilpatel.com/ubersuggest/) gives 3 free searches
a day and is plenty for monthly keyword check-ins.

### What to watch over the first 3 months

| Metric | Where | Healthy looks like |
|---|---|---|
| Indexed pages | GSC > Indexing > Pages | All public routes indexed within 4-6 weeks |
| Brand impressions | GSC > Performance > Queries | Steady growth on "scrambled legs" variants |
| Local impressions | GSC > Performance > Queries | First "duluth mountain bike …" impressions within 4-8 weeks |
| Avg position | GSC > Performance | Brand queries top 5; local queries top 30 within 3 months |
| CTR | GSC > Performance | 5%+ on impressions where we rank ≤ 10 |
| LCP / INP / CLS | PageSpeed Insights | All in "Good" |
| Rich result eligibility | GSC > Enhancements > Events (after launch) | Zero errors, all events listed |
| Crawl errors | GSC > Indexing > Pages > "Why pages aren't indexed" | Empty or only `/admin1` and `/hotdog-counter` |

If after 3 months we have zero impressions for any local query, the
problem is almost certainly thin/no content (not a meta-tag bug).
That's when the trail pages and About page become urgent.

---

## Prioritized "do this first" list

The 10 things to ship in order. Stop after each and re-measure.

1. **Add real `<title>` and `<meta name="description">`** site-wide in
   `public/index.html`. (5 min, 80% of static-head SEO value.)
2. **Add Open Graph + Twitter Card meta** site-wide in `index.html`,
   point at a 1200x630 `og-image.png` placed in `public/`. (30 min,
   fixes link previews everywhere.)
3. **Add `<link rel="canonical">`** site-wide in `index.html`. (1 min.)
4. **Add `SportsOrganization` JSON-LD** in `index.html`. (10 min, free
   knowledge-graph signal.)
5. **Create `public/robots.txt` and `public/sitemap.xml`** with the
   templates above. (10 min.)
6. **Verify Google Search Console** as Domain property and submit the
   sitemap. **Verify Bing Webmaster Tools** and submit too. (20 min.)
7. **Install `react-helmet-async`** and add the `<SEO />` component;
   wire it through Home, LesterPark, HotDogCounter (noindex), Admin
   (noindex). (1-2 hours.)
8. **Remove the cache-busting meta tags** from `index.html` and **fix
   the duplicate `&display=swap`** in the Google Fonts URL. (2 min.)
9. **Set image dimensions and `loading="lazy"`** on every image in the
   app to fix CLS. (30 min.)
10. **Write a real About page** with the Duluth/COGGS/trails copy. This
    is the single most valuable content investment after meta basics.
    (1 evening.)

After those 10, the next phase is the events page and `Event` JSON-LD,
plus per-trail pages.

---

## Open decisions

Things the user/team should decide before implementation:

1. **Strava club URL?** Need the canonical link to plug into `sameAs`.
   If no club exists, recommend creating one (free).
2. **Instagram / Facebook / TikTok / YouTube handles** for `sameAs`.
3. **OG image content** - what should the universal social image
   actually show? Logo + tagline? Action shot + logo? Decide before
   producing the 1200x630.
4. **Are you a registered nonprofit / 501(c)(3)?** If so, switch
   `SportsOrganization` to `NonprofitOrganization` (or use both via an
   `additionalType`). Different Google knowledge graph treatment.
5. **Do you have a real address (P.O. box, captain's address)?**
   Improves `LocalBusiness`/`SportsClub` signals but optional. City+state
   is enough.
6. **Affiliated with COGGS?** If yes, add a `memberOf` property in the
   JSON-LD pointing at a COGGS organization node. Adds a significant
   local-relevance signal.
7. **NICA team?** Same logic.
8. **About page tone** - serious club bio, or stay weird with the
   stoked-and-yoked / hot dog vibe? Either works for SEO; pick what's
   true to the brand and stay consistent.
9. **Trail-page strategy** - one trail per page? Or a single
   `/trails` aggregate page? Recommend separate pages: more SEO surface
   area, more shareable URLs, only marginally more work. Start with
   Hartley as it's the most-searched after Lester.
10. **Events feed source** - Firebase already powers Lester, presumably
    will power events. Need a build- or render-time hook to update
    `sitemap.xml` when events are added. Acceptable v1: hand-edit
    `sitemap.xml` when publishing an event. Acceptable v2: GitHub
    Action that regenerates from the Firebase events list on cron.

---

## Things explicitly NOT recommended

For the record, so we don't relitigate later:

- **Don't migrate to Next.js / Gatsby / Remix.** Out of scope, too
  disruptive, and the SEO upside is real but small for a 5-page site.
  The static-head + helmet approach gets us 80% there.
- **Don't add `react-snap` pre-rendering** in v1. Marginal value, build
  complexity, project hasn't seen meaningful updates since 2020. Revisit
  only if link previews or Google indexing remain broken after the
  basics ship.
- **Don't pay for Ahrefs / SEMrush / Moz / SE Ranking.** GSC + Bing
  WMT + manual brain are sufficient at this scale.
- **Don't use a Google Business Profile.** Hobby teams without a
  physical storefront/address routinely get rejected, and the "service
  area business" pathway has gotten stricter in 2024-2026. Local SEO
  for us comes from on-page geo signals, structured data, and local
  backlinks.
- **Don't keyword-stuff.** Helpful Content updates (March 2024,
  December 2025) are aggressive about thin/repetitive content. Write
  for humans, name the trails, and stop.
- **Don't promise rankings on a timeline.** New sites take 3-6 months
  to gain organic traction even when everything's right. Brand queries
  are the exception (1-2 weeks).
- **Don't index the hot dog counter or admin.** Already covered in the
  robots/meta plan.
- **Don't use AI-generated copy as the bulk of pages.** Google
  doesn't outright penalize AI content (per their Feb 2023 policy and
  2024-2025 reaffirmations) but the Helpful Content System penalizes
  *unhelpful* content, and unedited LLM output usually qualifies. Use
  Claude/ChatGPT to draft and then **rewrite in your own voice**.

---

## Sources

- [Google Search Central - JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central - Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Google Search Central - Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [web.dev - Core Web Vitals (LCP, INP, CLS)](https://web.dev/articles/vitals)
- [web.dev - Pre-rendering with react-snap](https://web.dev/articles/prerender-with-react-snap) (background only; we are not pre-rendering)
- [Schema.org - SportsOrganization](https://schema.org/SportsOrganization)
- [Schema.org - SportsTeam](https://schema.org/SportsTeam)
- [Schema.org - Event](https://schema.org/Event)
- [Schema.org - SportsEvent](https://schema.org/SportsEvent)
- [Bing IndexNow](https://www.bing.com/indexnow)
- [GitHub Docs - Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [cicirello/generate-sitemap GitHub Action](https://github.com/cicirello/generate-sitemap)
- [react-helmet-async on GitHub](https://github.com/staylor/react-helmet-async)
- [Search Engine Land - How to fix technical SEO issues on client-side React apps (2025)](https://searchengineland.com/how-to-fix-technical-seo-issues-on-client-side-react-apps-455124)
- [SEMrush - AI Overviews 2025 study](https://www.semrush.com/blog/semrush-ai-overviews-study/)
- [seoClarity - AI Overviews impact research](https://www.seoclarity.net/research/ai-overviews-impact)
- [COGGS - Cyclists of Gitchee Gumee Shores (trails reference)](https://www.coggs.com/trails)
- [Visit Duluth - Mountain Biking Trail Guide](https://visitduluth.com/itinerary/mountain-biking-trail-guide/)
- [Krumzi - Open Graph image sizes 2025 guide](https://www.krumzi.com/blog/open-graph-image-sizes-for-social-media-the-complete-2025-guide)
- [Coywolf - Open Graph and Twitter Card optimization](https://coywolf.com/guides/open-graph-twitter-card-image-optimization/)
- [Backlinko - Local SEO definitive guide](https://backlinko.com/local-seo-guide)
- [Amsive - 10 Ways to Earn Local Backlinks](https://www.amsive.com/insights/seo/10-ways-any-business-can-earn-local-backlinks/)

_End of plan. Implementation lives in a follow-up PR; do not touch
`src/` or `public/` from this document._
