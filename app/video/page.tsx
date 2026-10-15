import VideoPage from "@/components/VideoPage";
import { getYouTube } from "@/lib/youtube";

export const revalidate = 600;

export default async function Page() {
  const [shorts, videos, live] = await Promise.all([getYouTube("shorts"), getYouTube("videos"), getYouTube("live")]);
  return <VideoPage feeds={{ shorts, videos, live }} />;
}
