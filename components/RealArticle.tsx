import Link from "next/link";
import PremiumLock from "./PremiumLock";
import ShareBar from "./ShareBar";
import { Ph, SecHead } from "./ui";
import { CONTACT } from "@/lib/links";
import { OLD_CATEGORY, type Article, type NewsItem } from "@/lib/taaza";

const slugForCategory = (name?: string) =>
  Object.entries(OLD_CATEGORY).find(([, v]) => v.toLowerCase() === name?.toLowerCase())?.[0];

/** Reading time at ~200 words a minute. */
const readMins = (html: string) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

/** First paragraph of the body (or the description) shown above the Premium lock. */
const teaserHtml = (a: Article) => a.bodyHtml.match(/<p\b[^>]*>[\s\S]*?<\/p>/)?.[0] ?? (a.description ? `<p>${a.description}</p>` : "");

/** Photo on top, kicker / headline / date below — the home page card. */
function StoryCard({ item, kicker }: { item: NewsItem; kicker?: string }) {
  return (
    <Link href={item.href} className="lk card">
      <Ph src={item.img ?? ""} className="ar-16-10" />
      {kicker && <div className="kick">{kicker.toUpperCase()}</div>}
      <div className="tt hv-t">{item.title}</div>
      {item.date && <div className="meta">{item.date}</div>}
    </Link>
  );
}

type Props = {
  a: Article;
  related: NewsItem[];
  sameCategory: NewsItem[];
  more: { item: NewsItem; cat: string }[];
  url: string;
};

/** A story imported from taazatv.com, rendered with the new site's article styles. */
export default function RealArticle({ a, related, sameCategory, more, url }: Props) {
  const catSlug = slugForCategory(a.category);
  const story = (
    <>
      {a.highlights.length > 0 && (
        <div className="art-keys">
          <div className="kick">KEY POINTS</div>
          <ul className="art-hl">{a.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      )}
      <div className="art-body real-body" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />
      {a.tags.length > 0 && (
        <div className="art-tags">
          <span className="kick">TAGS</span>
          {a.tags.map((tag) => <span key={tag} className="tag tag-neutral">{tag}</span>)}
        </div>
      )}
    </>
  );
  return (
    <>
    <div className="art">
      <article className="art-main">
        <div className="crumbs">
          <Link href="/">Home</Link>
          {a.category && <><span>›</span>{catSlug ? <Link href={`/category/${catSlug}`}>{a.category}</Link> : <span>{a.category}</span>}</>}
        </div>
        <h1 className="art-h1">{a.title}</h1>
        <div className="byline">
          <div className="av" />
          <div className="who stacked">
            Taaza TV Desk
            <span>{a.date && <>{a.date} • </>}{readMins(a.bodyHtml)} min read</span>
          </div>
          <ShareBar title={a.title} url={url} className="share-inline" />
        </div>
        {a.img && <Ph src={a.img} className="art-hero" />}
        {/* old-site categories can be a list, e.g. "State, Premium" */}
        {/\bpremium\b/i.test(a.category ?? "") ? (
          <PremiumLock teaser={<div className="art-body real-body" dangerouslySetInnerHTML={{ __html: teaserHtml(a) }} />}>
            {story}
          </PremiumLock>
        ) : story}
      </article>
      <aside className="art-side">
        <div className="side-sticky">
          <div className="also-head">Also Read</div>
          {related.map((r, i) => (
            <Link key={r.id} href={r.href} className={`lk rel${i === 0 ? " big" : ""}`}>
              {r.img && <Ph src={r.img} />}
              <div>
                <div className="tt hv-t">{r.title}</div>
                {r.date && <div className="meta">{r.date}</div>}
              </div>
            </Link>
          ))}
          <div className="alerts on-dark">
            <div className="t1">Taaza TV Alerts</div>
            <div className="t2">Get breaking news on WhatsApp, the moment it happens.</div>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join now</a>
          </div>
        </div>
      </aside>
    </div>

    {sameCategory.length > 0 && (
      <section className="band">
        <SecHead title={`More from ${a.category ?? "Taaza TV"}`} red href={catSlug ? `/category/${catSlug}` : undefined} />
        <div className="band-grid">
          {sameCategory.map((x) => <StoryCard key={x.id} item={x} />)}
        </div>
      </section>
    )}
    {more.length > 0 && (
      <section className="band">
        <SecHead title="You may also like" />
        <div className="band-grid">
          {more.map(({ item, cat }) => <StoryCard key={item.id} item={item} kicker={cat} />)}
        </div>
      </section>
    )}
    </>
  );
}
