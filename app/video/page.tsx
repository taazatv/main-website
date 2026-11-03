import VideoPage from "@/components/VideoPage";
import { REELS } from "@/lib/instagram";
import { getYouTube } from "@/lib/youtube";

export const revalidate = 600;

export default async function Page() {
  const [videos, live] = await Promise.all([getYouTube("videos"), getYouTube("live")]);
  return <VideoPage feeds={{ reels: REELS, videos, live }} />;
}
