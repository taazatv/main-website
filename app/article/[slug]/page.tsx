import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { STORIES, getStory } from "@/lib/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  return s ? { title: `${s.title.en} | Taaza TV`, description: s.summary?.en ?? s.title.en } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getStory(slug)) notFound();
  return <ArticlePage key={slug} slug={slug} />;
}
