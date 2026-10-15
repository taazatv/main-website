import Link from "next/link";
import { Ph } from "./ui";
import { CONTACT } from "@/lib/links";
import { OLD_CATEGORY, type Article, type NewsItem } from "@/lib/taaza";

const slugForCategory = (name?: string) =>
  Object.entries(OLD_CATEGORY).find(([, v]) => v.toLowerCase() === name?.toLowerCase())?.[0];

/** A story imported from taazatv.com, rendered with the new site's article styles. */
export default function RealArticle({ a, related, url }: { a: Article; related: NewsItem[]; url: string }) {
  const catSlug = slugForCategory(a.category);
  const share = encodeURIComponent(`${a.title} - Taaza TV\n${url}`);
  return (
    <div className="art">
      <article className="art-main">
        <div className="crumbs">
          <Link href="/">Home</Link>
          {a.category && <><span>›</span>{catSlug ? <Link href={`/category/${catSlug}`}>{a.category}</Link> : <span>{a.category}</span>}</>}
        </div>
        <h1 className="art-h1">{a.title}</h1>
        {a.highlights.length > 0 && <ul className="art-hl">{a.highlights.map((h) => <li key={h}>{h}</li>)}</ul>}
        <div className="byline">
          <div className="who">Taaza TV Desk {a.date && <span>• {a.date}</span>}</div>
          <div className="acts">
            <a className="btn btn-secondary" href={`https://api.whatsapp.com/send?text=${share}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="btn btn-secondary" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="btn btn-secondary" href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(a.title)}&via=taazatv`} target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
        {a.img && <Ph src={a.img} className="art-hero" />}
        <div className="art-body real-body" dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />
        {a.tags.length > 0 && (
          <div className="art-tags">
            <span className="kick">TAGS</span>
            {a.tags.map((tag) => <span key={tag} className="tag tag-neutral">{tag}</span>)}
          </div>
        )}
      </article>
      <aside className="art-side">
        <div className="also-head">Also Read</div>
        {related.map((r) => (
          <Link key={r.id} href={r.href} className="lk rel">
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
      </aside>
    </div>
  );
}
