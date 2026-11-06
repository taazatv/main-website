import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ph, SecHead } from "@/components/ui";
import { failIfUnavailable, getRelatedTagNews, getTagNews, type NewsItem } from "@/lib/taaza";

export const revalidate = 300;

/** Fewer stories than this leaves the page looking empty, so related ones are added below. */
const FEW_STORIES = 6;

const tagName = (param: string) => {
  try {
    return decodeURIComponent(param).trim();
  } catch {
    return "";
  }
};

function StoryCard({ item }: { item: NewsItem }) {
  return (
    <Link href={item.href} className="lk card">
      <Ph src={item.img ?? ""} className="ar-16-10" />
      {item.date && <div className="kick">{item.date}</div>}
      <div className="tt hv-t">{item.title}</div>
    </Link>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const name = tagName((await params).tag);
  return name ? { title: `${name} News | Taaza TV`, description: `Latest news about ${name} from Taaza TV.` } : {};
}

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const name = tagName((await params).tag);
  if (!name || name.length > 100) notFound();
  const found = await getTagNews(name);
  // keep the last cached version rather than telling readers there is no news
  failIfUnavailable(found === null, `tag ${name}`);
  const items = found ?? [];
  const related = found && items.length < FEW_STORIES ? await getRelatedTagNews(name, items) : [];

  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">TAG</div>
          <h1 className="m-cat">{name}</h1>
        </div>
      </div>
      {items.length > 0 && (
        <div className="cat-grid">
          {items.map((x) => <StoryCard key={x.id} item={x} />)}
        </div>
      )}
      {related.length > 0 && (
        <section className="band">
          <SecHead title="Related News" red />
          <div className="band-grid">
            {related.map((x) => <StoryCard key={x.id} item={x} />)}
          </div>
        </section>
      )}
      {items.length === 0 && related.length === 0 && (
        <p className="v-empty">No news found for this tag. <Link href="/">See the latest news</Link></p>
      )}
    </div>
  );
}
