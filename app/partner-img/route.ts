import { ORIGIN } from "@/lib/taaza-parse";

/**
 * Serves taazatv.com's header banner from this site's own origin. Ad blockers hide images whose URL
 * contains "/ads/", which left an empty banner box. Only files in the old site's banner folder are allowed.
 */
export async function GET(req: Request) {
  const file = new URL(req.url).searchParams.get("f") ?? "";
  if (!/^[\w ().%-]+\.(jpe?g|png|webp|gif)$/i.test(file)) return new Response("Bad request", { status: 400 });
  try {
    const res = await fetch(`${ORIGIN}/admin/resources/ads/${encodeURIComponent(decodeURIComponent(file))}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TaazaTV-Next/1.0)",
        ...(process.env.TAAZA_FEED_KEY ? { "X-Taaza-Feed": process.env.TAAZA_FEED_KEY } : {}),
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return Response.redirect(new URL("/taaza/medha-samman-banner.jpg", req.url), 302);
    return new Response(await res.arrayBuffer(), {
      headers: { "Content-Type": res.headers.get("content-type") ?? "image/jpeg", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch {
    return Response.redirect(new URL("/taaza/medha-samman-banner.jpg", req.url), 302);
  }
}
