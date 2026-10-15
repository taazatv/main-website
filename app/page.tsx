import HomePage from "@/components/HomePage";
import { getHomeNews } from "@/lib/taaza";

export const revalidate = 300;

export default async function Page() {
  return <HomePage news={await getHomeNews()} />;
}
