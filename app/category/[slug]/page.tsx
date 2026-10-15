import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/data";
import { OLD_CATEGORY, getCategoryDeep, getSportTiles } from "@/lib/taaza";

export const revalidate = 300;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CATEGORIES[slug]) notFound();
  const [items, tiles] = await Promise.all([
    OLD_CATEGORY[slug] ? getCategoryDeep(slug, 3) : [],
    slug === "sports" ? getSportTiles() : [],
  ]);
  return <CategoryPage key={slug} slug={slug} items={items} tiles={tiles} />;
}
