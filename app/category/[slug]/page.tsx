import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/data";
import { OLD_CATEGORY, SourceUnavailable, getCategoryDeep, getSportTiles } from "@/lib/taaza";

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
  // keep the last cached version rather than re-rendering with sample stories
  if (OLD_CATEGORY[slug] && items.length === 0) throw new SourceUnavailable(`category ${slug}`);
  return <CategoryPage key={slug} slug={slug} items={items} tiles={tiles} />;
}
