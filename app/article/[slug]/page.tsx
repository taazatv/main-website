import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleFallback from "@/components/ArticleFallback";
import ArticlePage from "@/components/ArticlePage";
import RealArticle from "@/components/RealArticle";
import { STORIES, getStory } from "@/lib/stories";
import { OLD_CATEGORY, getArticle, getBreaking, getCategory, getCategoryDeep, type NewsItem } from "@/lib/taaza";

export const revalidate = 300;

/** Categories the "More news" grid under an article draws from. */
const MORE_FROM = ["national", "international-news", "entertainment", "sports", "health"];

/** Imported stories use "/article/<old-site id>-<slug>". */
// old-site ids are 5+ digits; sample slugs can start with small numbers ("16-maoists-…")
const realId = (slug: string) => slug.match(/^(\d{5,})-/)?.[1];

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
    // the old site is unreachable from here: send the reader to the same story there
    if (!a) return <ArticleFallback url={`https://taazatv.com/article/news&${id}&en&West%20Bengal`} />;
    const catSlug = Object.entries(OLD_CATEGORY).find(([, v]) => v.toLowerCase() === a.category?.toLowerCase())?.[0];
    const otherSlugs = MORE_FROM.filter((s) => s !== catSlug);
    const [pool, ...others] = await Promise.all([
      catSlug ? getCategoryDeep(catSlug, 4) : getBreaking(),
      ...otherSlugs.map((s) => getCategory(s)),
    ]);
    const seen = new Set([id]);
    const take = (list: NewsItem[], n: number) => {
      const out = list.filter((x) => x.img && !seen.has(x.id)).slice(0, n);
      out.forEach((x) => seen.add(x.id));
      return out;
    };
    const related = take(pool, 8);
    const sameCategory = take(pool, 8);
    // round-robin across the other categories so "More news" is a real mix
    const more: { item: NewsItem; cat: string }[] = [];
    for (let round = 0; more.length < 8 && round < 8; round++) {
      others.forEach((list, i) => {
        const [x] = take(list, 1);
        if (x && more.length < 8) more.push({ item: x, cat: OLD_CATEGORY[otherSlugs[i]] });
      });
    }
    return (
      <RealArticle
        a={a}
        related={related}
        sameCategory={sameCategory}
        more={more}
        url={`https://taazatv.com/single-post.php?id=${id}`}
      />
    );
  }
  if (!getStory(slug)) notFound();
  return <ArticlePage key={slug} slug={slug} />;
}
