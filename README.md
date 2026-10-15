# Taaza TV — main website

The new website for **Taaza TV**, a national Hindi and English news channel from eastern India
("News in your language, from your state"). Built with Next.js (App Router) and deployed on Vercel.

- **Live site:** https://main-website-brown.vercel.app
- **Old site (still the newsroom / CMS):** https://taazatv.com
- **Repository:** https://github.com/taazatv/main-website

> The new site does **not** have its own database. News, articles, the header banner and the sports
> tiles are read from **taazatv.com** and refreshed automatically; videos come from the channel's
> **YouTube** feeds. Journalists keep publishing in the old site's admin panel.

---

## Contents

1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Getting started](#getting-started)
4. [Project structure](#project-structure)
5. [How the content gets in](#how-the-content-gets-in)
6. [Pages and routes](#pages-and-routes)
7. [Design and theming](#design-and-theming)
8. [Configuration](#configuration)
9. [Deployment](#deployment)
10. [Cloudflare and the old site (important)](#cloudflare-and-the-old-site-important)
11. [Common tasks](#common-tasks)
12. [Troubleshooting](#troubleshooting)
13. [Known limitations and next steps](#known-limitations-and-next-steps)

---

## Features

- **Real news from taazatv.com** — top story, latest updates, breaking-news ticker, National,
  International, Entertainment, Sports, Health, Premium, and a separate edition for each state
  (West Bengal, Bihar, Jharkhand, Uttar Pradesh). Refreshed every 5 minutes.
- **Full article pages** — headline, highlights, photo, full text, tags, "Also Read", and
  WhatsApp / Facebook / X share links.
- **24×7 live TV** — the channel's HLS stream plays on the Live TV page and, muted with an unmute
  button, in the home page's *Watch Live* box.
- **"On air now"** — the Live TV schedule highlights the current show using India time (IST).
- **YouTube Shorts and videos** — from [@taazatv1632](https://www.youtube.com/@taazatv1632), played in
  an on-page overlay (Shorts on the home page; Shorts / Videos / Live tabs on `/video`).
- **Header banner** — the same strip banner as taazatv.com, managed from the old admin panel.
- **English / Hindi switch, light / dark theme, state picker.**
- **Phone layout styled like the Taaza TV iOS app** — headline above the lead photo, list rows with
  date on top, bold headline and a thumbnail on the right. The laptop layout is unchanged.
- **About** (with Mission & Vision) and **Contact** (with Advertise and Careers) pages.
- **Safe fallbacks** — if taazatv.com can't be reached, pages keep their last good version, and
  articles hand the reader to the same story on taazatv.com instead of showing a 404.

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | One hand-written stylesheet, `app/globals.css` (neumorphic design system, no CSS framework) |
| Font | Archivo via `next/font/google` |
| Live video | [hls.js](https://github.com/video-dev/hls.js) (native HLS on iPhone Safari) |
| HTML cleaning | [sanitize-html](https://github.com/apostrophecms/sanitize-html) for imported article bodies |
| Hosting | Vercel |

> **Note for contributors and AI agents:** this Next.js version has breaking changes from older
> releases. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework code
> (see `AGENTS.md`).

## Getting started

Requirements: **Node.js 20+** (developed on Node 22) and npm.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npx tsc --noEmit` | Type-check the project |

### Viewing on a phone during development

- **Same Wi-Fi:** open `http://<your-PC-IP>:3000` on the phone (for example `http://192.168.29.6:3000`).
  Next.js only serves dev assets to origins listed in `allowedDevOrigins` in `next.config.ts`, so add
  your PC's current IP there if it changes.
- **Any network:** run a temporary tunnel, e.g. `cloudflared tunnel --url http://localhost:3000`, and
  open the `*.trycloudflare.com` link. `*.trycloudflare.com` is already allowed in `next.config.ts`.
  Anyone with the link can see your dev server while it runs, so stop it with `Ctrl+C` when done.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, header (ticker + banner), footer, state modal
  page.tsx                Home page (server) → loads all home news, renders <HomePage>
  globals.css             The entire design system and responsive rules
  article/[slug]/page.tsx Article page: real story (/article/<id>-<slug>) or built-in sample story
  article/page.tsx        Redirects the bare /article URL to a story
  category/[slug]/page.tsx Category listing (real stories, up to 3 pages from the old site)
  live-tv/page.tsx        Live TV page
  video/page.tsx          Videos & Shorts (YouTube feeds)
  about/page.tsx          About us + Mission & Vision
  contact/page.tsx        Contact, Advertise, Careers
  partner-img/route.ts    Serves the header banner image from this site's own URL

components/
  Header.tsx              Logo row, socials, dark nav bar, breaking ticker, header banner
  Footer.tsx              App download, socials, link groups, group companies, legal links
  HomePage.tsx            Home page sections (real data with sample fallback)
  RealArticle.tsx         Renders a story imported from taazatv.com
  ArticlePage.tsx         Renders a built-in sample story
  ArticleFallback.tsx     "Opening the story…" hand-off to taazatv.com when a story can't be fetched
  CategoryPage.tsx        Category listing
  LiveTvPage.tsx          Player, channels, schedule
  LivePlayer.tsx          HLS player (hls.js / native), compact mode with mute toggle
  VideoGrid.tsx           YouTube grid + on-page player overlay
  VideoPage.tsx           Shorts / Videos / Live tabs
  AboutPage.tsx, ContactPage.tsx
  AppProvider.tsx         Client context: language, theme, selected state
  StateModal.tsx          "Choose your state" dialog
  AppLinks.tsx            Google Play / App Store buttons
  useOnAir.ts             Which schedule slot is on air now (IST)
  ui.tsx                  <Ph> (background-image photo) and <SecHead> (section heading)

lib/
  taaza.ts                Server-only loaders for taazatv.com (fetch + cache + sanitising)
  taaza-parse.ts          Pure HTML parsers for the old site's pages (lists, articles, videos)
  youtube.ts              Server-only loader for the channel's public YouTube feeds
  links.ts                Real channel details: live stream, app links, contact, group companies
  data.ts                 UI strings (EN/HI), navigation, categories, socials, sample content
  stories.ts              Built-in sample stories (used only as a fallback)
  stateShapes.ts          SVG outlines for the state picker

public/taaza/             Logo and fallback images
next.config.ts            allowedDevOrigins for phone testing
```

## How the content gets in

### News from taazatv.com

```
visitor ──► Next.js page (server) ──► lib/taaza.ts  page()  ──► https://taazatv.com/<page>.php
                                          │                        (HTML)
                                          ▼
                                   lib/taaza-parse.ts  ──► titles, photos, dates, article ids
                                          │
                                          ▼
                                   React components render the new design
```

1. **Fetch.** `page()` in `lib/taaza.ts` downloads the old site's pages: `breaking.php`,
   `category.php?na=…`, `state.php?sa=…`, `index.php` (banner, sports tiles), `video.php` and
   `article/news&<id>&en&West Bengal`.
2. **Parse.** `lib/taaza-parse.ts` reads that HTML and extracts each story's id, title, photo and date
   (`parseList`), or a full article (`parseArticle`). Article bodies are cleaned with `sanitize-html`
   (only text formatting, links, images and YouTube embeds survive).
3. **Cache (ISR).** Every fetch uses `next: { revalidate: 300 }`. For 5 minutes all visitors get the
   cached copy; after that, the next visitor still gets the cached page instantly while Next.js fetches
   fresh data in the background. So anything published on taazatv.com appears here within ~5 minutes.
4. **Links.** Imported stories link to `/article/<old-site id>-<slug>`. The article page detects the
   5+ digit id prefix and loads that story from taazatv.com.

Category slugs map to old-site category names in `OLD_CATEGORY` (`lib/taaza.ts`):

| New slug | Old-site category |
|---|---|
| `national` | National |
| `state` | State |
| `international-news` | International News |
| `entertainment` | Entertainment |
| `sports` | Sports |
| `health` | Health |
| `premium` | Premium |
| `election-2026` | ELECTION 2026 |
| `medha-samman-2026` | Medha Samman 2026 |

### Header banner and sports tiles

- The **header banner** comes from the `web-banner` / `mobile-banner` slots on taazatv.com's home page
  (`getHeaderAd`). It is served through `/partner-img?f=<file>` so ad blockers, which hide URLs
  containing `/ads/`, don't blank it out. Change it in the old admin panel; it updates here
  automatically.
- The **Cricket / Football / Hockey / Tennis** tiles use the photo the old home page shows for each
  sport, which is that sport's latest story photo (`getSportTiles`).

### Videos from YouTube

`lib/youtube.ts` reads the channel's public feeds (no API key needed), refreshed every 10 minutes:

| Feed | Playlist id prefix | Used for |
|---|---|---|
| Shorts | `UUSH` | Home *Video News*, `/video` Shorts tab |
| Long videos | `UULF` | `/video` Videos tab |
| Past live streams | `UULV` | `/video` Live tab |

Channel id: `UC9Mu8P0qwwqQeXTl2sVaK6A` (@taazatv1632).

### Live TV

`LIVE_STREAM.hls` in `lib/links.ts` (`https://live.we2live.in/taazatv/live/playlist.m3u8`). `LivePlayer`
uses hls.js wherever the browser has MediaSource and the native player on iPhone Safari. It starts
muted because browsers block autoplay with sound. The stream has a single 1080p rendition (~4 Mbps).

### Fallbacks

| Situation | What happens |
|---|---|
| Old site unreachable while a cached page refreshes | The loader throws, so ISR keeps serving the last good page |
| Old site unreachable during `next build` | The page renders with sample content so the deploy still succeeds; real news returns on the next successful refresh |
| A story can't be fetched | `ArticleFallback` shows "Opening the story…" and sends the reader to the same story on taazatv.com |
| No banner from the old site | The Medha Samman banner (`public/taaza/medha-samman-banner.jpg`) is shown |
| No headlines | The ticker shows the channel tagline instead of sample headlines |

## Pages and routes

| Route | Description | Data source |
|---|---|---|
| `/` | Home page | taazatv.com + YouTube Shorts + live stream |
| `/article/<id>-<slug>` | Imported story | taazatv.com |
| `/article/<sample-slug>` | Built-in sample story (fallback only) | `lib/stories.ts` |
| `/category/<slug>` | Category listing | taazatv.com |
| `/live-tv` | Live player and schedule | Live stream; schedule is sample data |
| `/video` | Shorts / Videos / Live tabs | YouTube feeds |
| `/about` | About us, Mission & Vision | Static text from the old site |
| `/contact` | Contact, Advertise (`#advertise`), Careers (`#careers`) | `lib/links.ts` |
| `/partner-img?f=<file>` | Header banner image proxy (only files from the old site's banner folder) | taazatv.com |

## Design and theming

- All styles live in `app/globals.css`. Colour and shadow tokens are CSS variables on `:root`, with a
  dark theme under `:root[data-theme="dark"]` (toggled from the moon/sun button in the nav bar).
- The laptop layout is the design baseline above **1100px**. Below that, rules under
  `@media (max-width: 1100px)`, `900px` and `600px` adapt it. The app-style phone feed is the block
  marked *"Phone: news-feed look of the Taaza TV iOS app"*.
- `html { text-size-adjust: 100% }` stops iPhone Safari from enlarging text in wide elements such as
  the ticker.
- Language (`en` / `hi`), theme and selected state live in `AppProvider` on the client. UI strings are in
  `lib/data.ts` (`en` and `hi` dictionaries).

## Configuration

### Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `TAAZA_FEED_KEY` | Recommended in production | Sent as the `X-Taaza-Feed` header on every request to taazatv.com, so a Cloudflare WAF rule can let this site through (see below). |

Set it in Vercel under **Project → Settings → Environment Variables**. Locally, put it in `.env.local`
(git-ignored).

### Channel details

Edit `lib/links.ts` for the live stream URL, app store links, contact email / phones / WhatsApp, group
companies and legal links. Social profiles (`SOCIALS`) are in `lib/data.ts`.

## Deployment

The project is deployed to the Vercel project **main-website** (team *prince-rajputt's projects*) with
the Vercel CLI:

```bash
npx vercel login              # once
npx vercel deploy --prod      # build on Vercel and publish to production
```

The Vercel project is **not** connected to the GitHub repository yet, so pushing to GitHub does not
deploy by itself. To enable automatic deploys, the owner of the `taazatv` GitHub account must install the
[Vercel GitHub App](https://github.com/apps/vercel) on `taazatv/main-website`, then connect the repo in
Vercel under **Settings → Git**. (On the Hobby plan, deploying from a repository owned by another account
may be restricted.)

If a build fails, Vercel keeps the previous production deployment live.

## Cloudflare and the old site (important)

taazatv.com is behind Cloudflare, and Cloudflare's bot protection intermittently returns **403 Forbidden**
to Vercel's servers (data-centre IPs). Requests from a home or office connection are not affected, which
is why everything works on a developer's PC. Vercel's logs show it as lines like
`[taaza] 403 breaking.php?...`.

While this happens, news refreshes may be late and many articles open on taazatv.com instead of here.
To fix it, in taazatv.com's Cloudflare dashboard either:

1. **Recommended:** create **Security → WAF → Custom rules** → condition *Request Header* `X-Taaza-Feed`
   *equals* a long secret, action **Skip** (bot protection, rate limiting, managed rules). Then set the same
   secret as `TAAZA_FEED_KEY` in Vercel and redeploy.
2. **Simpler, less strict:** turn off **Security → Bots → Bot Fight Mode**.

## Common tasks

- **Change the header banner:** upload it in taazatv.com's admin panel. For phones, upload a taller image
  (for example 1000×300) in the *mobile banner* slot; the 1000×124 strip is small on phones.
- **Add a category:** add it to `CATEGORIES` and `NAV` in `lib/data.ts` and map its slug in `OLD_CATEGORY`
  in `lib/taaza.ts`.
- **Change refresh times:** `REVALIDATE` in `lib/taaza.ts` (news, 300s) and `revalidate` in
  `lib/youtube.ts` (videos, 600s), plus the `export const revalidate` in each page.
- **Update contact details or links:** `lib/links.ts`; social profiles in `SOCIALS` in `lib/data.ts`.
- **Real TV schedule:** replace the sample `schedule` in `content()` in `lib/data.ts`. The *On air now*
  highlight follows it automatically.

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Sample stories on the live site | taazatv.com blocked Vercel during the last build or refresh. Fix Cloudflare (above); real news returns on the next successful refresh. |
| Articles open on taazatv.com | Same Cloudflare block. |
| News stopped updating | Check Vercel logs for `[taaza]` lines; the old site's HTML may have changed, in which case `lib/taaza-parse.ts` needs updating. |
| Header banner box is empty | Usually an ad blocker; the banner is already served from `/partner-img` to avoid this. Hard-refresh the page. |
| Phone can't open the dev server on Wi-Fi | Different network or router client isolation; the PC's IP must be in `allowedDevOrigins`. Use a tunnel instead. |
| Text looks huge on iPhone | iOS text autosizing; keep `text-size-adjust: 100%` on `html`. |
| `AGENTS.md` / `CLAUDE.md` reappear | `next dev` regenerates them; set `agentRules: false` in `next.config.ts` to stop it. |

## Known limitations and next steps

- **Depends on the old site's HTML.** If taazatv.com's markup changes, the parsers need updating. A JSON
  API from the old admin panel would make this far more robust.
- **Hindi news is not imported yet.** The old site's Hindi pages don't include the story lists in their
  HTML, so the Hindi switch translates the interface but news stays in English.
- **Instagram reels** can't be read without Meta's Instagram API (business account plus an access token);
  YouTube Shorts are used instead.
- **Live TV schedule and extra channel tiles** on `/live-tv` are sample data until a real schedule is
  provided.
- **Most Watched** shows recent stories; the old site has no view counts.
- **Bandwidth:** the live stream is 1080p only, so the always-on home player uses ~1.5–2 GB per hour on
  mobile data while visible.
- **Comments and "Saved"** on sample articles are stored only in the visitor's browser.
