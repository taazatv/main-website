import { summarizeArticle } from "@/lib/gemini";
import { getArticle } from "@/lib/taaza";
import { isPremium } from "@/lib/taaza-parse";

const fail = (error: string, status: number) => Response.json({ error }, { status });

// Stories are only ever fetched by id, so this can't be used as a free AI endpoint, but a script walking through
// ids could still run up the Gemini bill. Per server instance, so this slows abuse rather than stopping it outright.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function tooMany(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const hit = hits.get(ip);
  if (!hit || hit.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  return ++hit.count > MAX_PER_WINDOW;
}

/** POST { id, lang } → { summary }. POST so crawlers following links never spend Gemini calls. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const id = String(body?.id ?? "");
  const lang = body?.lang;
  if (!/^\d+$/.test(id) || (lang !== "en" && lang !== "hi")) return fail("Bad request", 400);
  if (tooMany(req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local")) return fail("Too many requests", 429);

  const article = await getArticle(id);
  if (!article) return fail("Story not found", 404);
  // Premium stories are for signed-in readers: a summary would give the content away
  if (isPremium(article)) return fail("Not available for Premium stories", 403);

  const text = article.bodyHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (text.split(" ").length < 40) return fail("This story is too short to summarize", 422);

  const summary = await summarizeArticle(article.title, text, lang);
  return summary ? Response.json({ summary }) : fail("Summary unavailable", 502);
}
