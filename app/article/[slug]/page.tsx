import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import RealArticle from "@/components/RealArticle";
import { STORIES, getStory } from "@/lib/stories";
import { OLD_CATEGORY, getArticle, getBreaking, getCategory } from "@/lib/taaza";

export const revalidate = 300;

/** Imported stories use "/article/<old-site id>-<slug>". */
const realId = (slug: string) => slug.match(/^(\d+)-/)?.[1];

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = realId(slug);
  if (id) {
    const a = await getArticle(id);
    return a ? { title: `${a.title} | Taaza TV`, description: a.highlights[0] ?? a.description, openGraph: { title: a.title, images: a.img ? [a.img] : [] } } : {};
  }
  const s = getStory(slug);
  return s ? { title: `${s.title.en} | Taaza TV`, description: s.summary?.en ?? s.title.en } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = realId(slug);
  if (id) {
    const a = await getArticle(id);
    if (!a) notFound();
    const catSlug = Object.entries(OLD_CATEGORY).find(([, v]) => v.toLowerCase() === a.category?.toLowerCase())?.[0];
    const pool = catSlug ? await getCategory(catSlug) : await getBreaking();
    const related = pool.filter((x) => x.id !== id).slice(0, 5);
    return <RealArticle a={a} related={related} url={`https://taazatv.com/single-post.php?id=${id}`} />;
  }
  if (!getStory(slug)) notFound();
  return <ArticlePage key={slug} slug={slug} />;
}
