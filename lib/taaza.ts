import "server-only";
import sanitizeHtml from "sanitize-html";
import { ORIGIN, parseArticle, parseList, parseVideos, type Article, type NewsItem, type VideoItem } from "./taaza-parse";
import type { StateName } from "./data";
import { getYouTube, type YtVideo } from "./youtube";

export type { Article, NewsItem, VideoItem };

/** New-site category slug → category name on the old site. */
export const OLD_CATEGORY: Record<string, string> = {
  national: "National",
  state: "State",
  "international-news": "International News",
  entertainment: "Entertainment",
  sports: "Sports",
  health: "Health",
  premium: "Premium",
  "election-2026": "ELECTION 2026",
  "medha-samman-2026": "Medha Samman 2026",
};

const REVALIDATE = 300; // seconds; the old site's admin panel stays the newsroom

async function page(path: string): Promise<string | null> {
  try {
    const res = await fetch(`${ORIGIN}/${path}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TaazaTV-Next/1.0)",
        // Lets taazatv.com's Cloudflare WAF skip bot checks for this site (set the same value in a WAF skip rule)
        ...(process.env.TAAZA_FEED_KEY ? { "X-Taaza-Feed": process.env.TAAZA_FEED_KEY } : {}),
      },
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) console.error(`[taaza] ${res.status} ${path}`);
    return res.ok ? await res.text() : null;
  } catch (e) {
    console.error(`[taaza] fetch failed ${path}:`, e instanceof Error ? e.message : e);
    return null;
  }
}

const q = (s: string) => encodeURIComponent(s);
const DEFAULT_STATE: StateName = "West Bengal";

export async function getCategory(slug: string, pageNo = 1): Promise<NewsItem[]> {
  const name = OLD_CATEGORY[slug];
  if (!name) return [];
  const html = await page(`category.php?na=${q(name)}&state=${q(DEFAULT_STATE)}&usr_lang=en${pageNo > 1 ? `&page=${pageNo}` : ""}`);
  return html ? parseList(html) : [];
}

/** First few pages of a category, de-duplicated. */
export async function getCategoryDeep(slug: string, pages = 2): Promise<NewsItem[]> {
  const lists = await Promise.all(Array.from({ length: pages }, (_, i) => getCategory(slug, i + 1)));
  return dedupe(lists.flat());
}

export async function getBreaking(): Promise<NewsItem[]> {
  const [a, b] = await Promise.all([
    page(`breaking.php?na=Breaking&state=${q(DEFAULT_STATE)}&usr_lang=en`),
    page(`breaking.php?na=Breaking&state=${q(DEFAULT_STATE)}&usr_lang=en&page=2`),
  ]);
  return dedupe([...(a ? parseList(a) : []), ...(b ? parseList(b) : [])]);
}

export async function getStateNews(state: StateName): Promise<NewsItem[]> {
  const html = await page(`state.php?sa=${q(state)}&usr_lang=en`);
  return html ? parseList(html) : [];
}

export async function getVideos(): Promise<{ videos: VideoItem[]; stories: NewsItem[] }> {
  const html = await page(`video.php?na=Video&state=${q(DEFAULT_STATE)}&usr_lang=en`);
  return html ? { videos: parseVideos(html), stories: parseList(html) } : { videos: [], stories: [] };
}

export async function getArticle(id: string): Promise<Article | null> {
  if (!/^\d+$/.test(id)) return null;
  const html = await page(`article/news&${id}&en&${q(DEFAULT_STATE)}`);
  const a = html ? parseArticle(id, html) : null;
  if (!a) {
    if (html) console.error(`[taaza] article ${id}: could not parse (${html.length} bytes) ${html.slice(0, 200).replace(/\s+/g, " ")}`);
    return null;
  }
  return { ...a, bodyHtml: clean(a.bodyHtml) };
}

function dedupe(items: NewsItem[]) {
  const seen = new Set<string>();
  return items.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
}

/** Article HTML from the old CMS: keep text formatting, links, images and YouTube embeds only. */
function clean(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a", "img", "iframe", "figure", "figcaption"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"], iframe: ["src", "allowfullscreen", "title"] },
    allowedSchemes: ["https", "http", "mailto"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, src: attribs.src?.startsWith("/") ? ORIGIN + attribs.src : attribs.src, loading: "lazy" } as Record<string, string> }),
    },
    exclusiveFilter: (frame) => ["p", "li"].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren?.length,
  }).trim();
}

export type HomeNews = {
  breaking: NewsItem[];
  national: NewsItem[];
  world: NewsItem[];
  entertainment: NewsItem[];
  sports: NewsItem[];
  health: NewsItem[];
  premium: NewsItem[];
  states: Record<StateName, NewsItem[]>;
  videos: VideoItem[];
  videoStories: NewsItem[];
  shorts: YtVideo[];
  sportTiles: SportTile[];
};

/** Thrown when taazatv.com can't be reached, so a cached page keeps its last good news instead of sample content. */
export class SourceUnavailable extends Error {}

/**
 * During `next build` there is no earlier version to keep, so let the page render (with its fallback
 * content) instead of failing the deploy; at runtime, fail so ISR keeps serving the last good page.
 */
export function failIfUnavailable(unavailable: boolean, what: string) {
  if (unavailable && process.env.NEXT_PHASE !== "phase-production-build") throw new SourceUnavailable(what);
}

export async function getHomeNews(): Promise<HomeNews> {
  const [breaking, national, world, entertainment, sports, health, premium, wb, bihar, jh, up, vid, shorts, sportTiles] = await Promise.all([
    getBreaking(),
    getCategory("national"),
    getCategory("international-news"),
    getCategory("entertainment"),
    getCategory("sports"),
    getCategory("health"),
    getCategory("premium"),
    getStateNews("West Bengal"),
    getStateNews("Bihar"),
    getStateNews("Jharkhand"),
    getStateNews("Uttar Pradesh"),
    getVideos(),
    getYouTube("shorts"),
    getSportTiles(),
  ]);
  failIfUnavailable(breaking.length === 0 && national.length === 0, "taazatv.com unreachable");
  return {
    breaking, national, world, entertainment, sports, health, premium,
    states: { "West Bengal": wb, Bihar: bihar, Jharkhand: jh, "Uttar Pradesh": up },
    videos: vid.videos,
    videoStories: vid.stories,
    shorts,
    sportTiles,
  };
}

export type HeaderAd = { href: string; web: string; mobile: string };

/** The strip banner under the navbar on taazatv.com (its admin has separate web and mobile slots). */
export async function getHeaderAd(): Promise<HeaderAd | null> {
  const html = await page(`index.php?state=${q(DEFAULT_STATE)}&usr_lang=en`);
  if (!html) return null;
  const slot = (cls: string) => {
    const m = html.match(new RegExp(String.raw`<a[^>]*href="([^"]+)"[^>]*>\s*<img[^>]*class="[^"]*${cls}[^"]*"[^>]*>`));
    if (!m) return null;
    const src = m[0].match(/src="([^"]+)"/)?.[1];
    const file = src?.split("/admin/resources/ads/")[1];
    // proxied through /partner-img so ad blockers don't hide it (see app/partner-img/route.ts)
    return file ? { href: m[1], src: `/partner-img?f=${encodeURIComponent(decodeURIComponent(file))}` } : null;
  };
  const web = slot("web-banner");
  const mobile = slot("mobile-banner");
  if (!web && !mobile) return null;
  return { href: (web ?? mobile)!.href, web: (web ?? mobile)!.src, mobile: (mobile ?? web)!.src };
}

export type SportTile = { label: string; img: string };

/** Cricket / Football / Hockey / Tennis tiles from the taazatv.com home page (each shows its latest story photo). */
export async function getSportTiles(): Promise<SportTile[]> {
  const html = await page(`index.php?state=${q(DEFAULT_STATE)}&usr_lang=en`);
  if (!html) return [];
  const tiles = new Map<string, string>();
  for (const m of html.matchAll(/href="subcat\.php\?na=([A-Za-z ]+)[^"]*"\s*>\s*<img[^>]*src="([^"]+)"/g)) {
    if (!tiles.has(m[1])) tiles.set(m[1], m[2].replace(/ /g, "%20"));
  }
  const order = ["Cricket", "Football", "Hockey", "Tennis"];
  return order.filter((l) => tiles.has(l)).map((label) => ({ label, img: tiles.get(label)! }));
}
