import { redirect } from "next/navigation";
import { STORIES } from "@/lib/stories";

// Old single-article URL: send it to the top story.
export default function Page() {
  redirect(`/article/${STORIES[0].slug}`);
}
