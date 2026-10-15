import "server-only";

/** TAAZA TV on YouTube (@taazatv1632). Its public uploads feeds need no API key. */
export const YT_CHANNEL_ID = "UC9Mu8P0qwwqQeXTl2sVaK6A";

export type YtVideo = { id: string; title: string; published: string; views: number; thumb: string; short: boolean };

// YouTube's per-channel playlists: shorts, long-form uploads, past live streams
const PLAYLIST = { shorts: "UUSH", videos: "UULF", live: "UULV" } as const;
export type YtKind = keyof typeof PLAYLIST;

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export async function getYouTube(kind: YtKind): Promise<YtVideo[]> {
  const playlist = PLAYLIST[kind] + YT_CHANNEL_ID.slice(2);
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlist}`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => {
        const id = e.match(/<yt:videoId>([^<]+)/)?.[1] ?? "";
        return {
          id,
          title: decode(e.match(/<media:title>([^<]*)/)?.[1] ?? "").trim(),
          published: e.match(/<published>([^<]+)/)?.[1] ?? "",
          views: Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0),
          thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          short: kind === "shorts",
        };
      })
      .filter((v) => v.id)
      .sort((a, b) => b.published.localeCompare(a.published));
  } catch {
    return [];
  }
}
