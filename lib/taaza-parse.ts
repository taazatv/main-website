/* Parsers for the old taazatv.com PHP pages. Pure string functions so they can be tested in isolation. */

export type NewsItem = {
  id: string;
  title: string;
  img?: string;
  date?: string;
  /** Path on the new site */
  href: string;
};

export type VideoItem = { id: string; title: string; youtube: string; img: string };

export type Article = {
  id: string;
  title: string;
  highlights: string[];
  date?: string;
  img?: string;
  /** Raw description HTML; sanitise before rendering */
  bodyHtml: string;
  tags: string[];
  category?: string;
  description?: string;
};

export const ORIGIN = "https://taazatv.com";

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9ऀ-ॿ]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const articleHref = (id: string, title: string) => `/article/${id}-${slugify(title) || "news"}`;

/** Main content only: drop the header (ticker, notifications, menus) and the footer. */
function mainRegion(html: string) {
  const startMarkers = ['id="myModalsearch"', 'class="container-fluid comm-news"', 'class="container-fluid inner-news"'];
  let start = -1;
  for (const m of startMarkers) {
    const i = html.indexOf(m);
    if (i >= 0 && (start < 0 || i < start)) start = i;
  }
  let end = html.indexOf("Download The Taaza Tv App");
  if (end < 0) end = html.length;
  return html.slice(start < 0 ? 0 : start, end);
}

const DATE_RE = /\b(\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4})\b/;
const LINK_RE = /article\/[^"'&]*&(\d+)&[a-z]{2}&[^"']*/g;

/** Every distinct article linked from a listing page, in page order. */
export function parseList(html: string): NewsItem[] {
  const region = mainRegion(html);
  const hits: { id: string; at: number }[] = [];
  for (const m of region.matchAll(LINK_RE)) hits.push({ id: m[1], at: m.index ?? 0 });

  const items = new Map<string, NewsItem>();
  hits.forEach((hit, i) => {
    // the article's block runs from just before its first link to the next different article link
    const next = hits.slice(i + 1).find((h) => h.id !== hit.id);
    const blockStart = Math.max(0, hit.at - 700);
    const block = region.slice(blockStart, next ? next.at : hit.at + 2500);
    const after = region.slice(hit.at, next ? next.at : hit.at + 2500);

    const item = items.get(hit.id) ?? { id: hit.id, title: "", href: "" };
    if (!item.title) {
      const anchor = after.match(/^[^>]*>([\s\S]*?)<\/a>/);
      const t = anchor ? text(anchor[1]) : "";
      if (t.length > 8) item.title = t;
    }
    if (!item.title) {
      const alt = after.match(/<img[^>]*alt="([^"]{8,})"/);
      if (alt) item.title = decode(alt[1]).trim();
    }
    if (!item.img) {
      const img = after.match(/<img[^>]*src="(https?:\/\/[^"]+\/admin\/resources\/[^"]+)"/) ?? block.match(/<img[^>]*src="(https?:\/\/[^"]+\/admin\/resources\/[^"]+)"/);
      if (img) item.img = img[1].replace(/ /g, "%20");
    }
    if (!item.date) {
      const d = after.match(DATE_RE);
      if (d) item.date = d[1];
    }
    items.set(hit.id, item);
  });

  return [...items.values()]
    .filter((x) => x.title)
    .map((x) => ({ ...x, href: articleHref(x.id, x.title) }));
}

/** Videos on video.php: YouTube embeds with their captions. */
export function parseVideos(html: string): VideoItem[] {
  const region = mainRegion(html);
  const out: VideoItem[] = [];
  const seen = new Set<string>();
  for (const m of region.matchAll(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{6,})/g)) {
    const yt = m[1];
    if (seen.has(yt)) continue;
    seen.add(yt);
    const after = region.slice(m.index ?? 0, (m.index ?? 0) + 1500);
    const t = after.match(/<(?:p|h\d|span|div)[^>]*>\s*([^<]{8,}?)\s*</);
    out.push({ id: yt, youtube: yt, title: t ? decode(t[1]).trim() : "Taaza TV video", img: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` });
  }
  return out;
}

export function parseArticle(id: string, html: string): Article | null {
  const meta = (k: string) => {
    const m = html.match(new RegExp(`<meta[^>]+(?:property|name)="${k}"[^>]+content="([^"]*)"`));
    return m ? decode(m[1]).trim() : undefined;
  };
  const region = mainRegion(html);
  const h1 = region.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = h1 ? text(h1[1]) : meta("og:title");
  if (!title) return null;

  const afterH1 = h1 ? region.slice((h1.index ?? 0) + h1[0].length) : region;
  const timeShareAt = afterH1.indexOf('class="time-share"');
  const intro = timeShareAt > 0 ? afterH1.slice(0, timeShareAt) : "";
  const highlights = [...intro.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1])).filter(Boolean);

  const dateM = afterH1.match(DATE_RE);
  const descStart = afterH1.indexOf('id="description"');
  let bodyHtml = "";
  if (descStart >= 0) {
    const from = afterH1.indexOf(">", descStart) + 1;
    const stop = ['class="inner-tag"', 'class="readaloud"'].map((m) => afterH1.indexOf(m, from)).filter((n) => n > 0);
    bodyHtml = afterH1.slice(from, stop.length ? Math.min(...stop) : from + 20000);
    bodyHtml = bodyHtml.replace(/<\/span>\s*<div[^>]*$/i, "");
  }
  const img = afterH1.match(/<img[^>]*src="(https?:\/\/[^"]+\/admin\/resources\/news\/[^"]+)"/)?.[1] ?? meta("og:image");
  const tags = [...afterH1.matchAll(/href="tags\.php\?ag=[^"]*"[^>]*>([^<]+)</g)].map((m) => decode(m[1]).trim()).filter(Boolean);

  // breadcrumb: Home > Category > Title
  const crumbs = [...html.matchAll(/<li[^>]*class="breadcrumb-item[^"]*"[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]));
  const category = crumbs.length >= 3 ? crumbs[crumbs.length - 2] : undefined;

  return {
    id,
    title,
    highlights,
    date: dateM?.[1],
    img: img?.replace(/ /g, "%20"),
    bodyHtml,
    tags,
    category,
    description: meta("og:description"),
  };
}
