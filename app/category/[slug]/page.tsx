import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CATEGORIES[slug]) notFound();
  return <CategoryPage key={slug} slug={slug} />;
}
