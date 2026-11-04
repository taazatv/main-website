"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";
import ShareBar from "./ShareBar";
import { Ph, SecHead } from "./ui";
import { EVENTS, type TaazaEvent } from "@/lib/events";
import type { NewsItem } from "@/lib/taaza-parse";

const LOGO = "/taaza/logo.png";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Story-style card linking to an event's page on this site (same look as the site's news cards). */
function EventCard({ ev }: { ev: TaazaEvent }) {
  const { lang } = useApp();
  const H = lang === "hi";
  return (
    <Link href={`/events/${ev.slug}`} className="lk card">
      <Ph src={ev.img ?? LOGO} className={`ar-16-10 ${ev.img ? "" : "evp-logo"}`} />
      <div className="kick">{(H ? ev.tag.hi : ev.tag.en).toUpperCase()}</div>
      <div className="tt hv-t">{H ? ev.hi : ev.name}</div>
    </Link>
  );
}

/** /events: laid out like a category page. */
export function EventsIndex() {
  const { lang } = useApp();
  const H = lang === "hi";
  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">TAAZA TV</div>
          <h1 className="m-cat">{H ? "इवेंट्स" : "Events"}</h1>
        </div>
      </div>
      <section className="band">
        <div className="band-grid">{EVENTS.map((ev) => <EventCard key={ev.slug} ev={ev} />)}</div>
      </section>
    </div>
  );
}

/** One event, laid out like an article page: story on the left, details and other events on the right. */
export default function EventPage({ slug, news = [] }: { slug: string; news?: NewsItem[] }) {
  const { lang } = useApp();
  const H = lang === "hi";
  const L = (x: { en: string; hi: string }) => (H ? x.hi : x.en);
  const ev = EVENTS.find((e) => e.slug === slug)!;
  const others = EVENTS.filter((e) => e.slug !== slug);
  const name = H ? ev.hi : ev.name;
  const site = ev.url?.replace(/^https?:\/\/|\/$/g, "");

  return (
    <>
      <div className="art">
        <article className="art-main">
          <div className="crumbs">
            <Link href="/">{H ? "होम" : "Home"}</Link><span>›</span>
            <Link href="/events">{H ? "इवेंट्स" : "Events"}</Link><span>›</span>
            <span>{name}</span>
          </div>
          <div className="kick">{L(ev.tag).toUpperCase()}</div>
          <h1 className="art-h1">{name}</h1>
          <p className="art-dek">{L(ev.desc)}</p>

          <div className="byline">
            {ev.url ? (
              <a href={ev.url} {...ext} className="btn btn-primary">{H ? "और देखें" : "View more"} <span aria-hidden="true">↗</span></a>
            ) : (
              <span className="tag tag-neutral">{H ? "जल्द आ रहा है" : "Coming soon"}</span>
            )}
            <Link href="/advertise#enquire" className="btn btn-secondary">{H ? "स्पॉन्सर करें" : "Sponsor"}</Link>
            <ShareBar title={ev.name} className="share-inline" />
          </div>

          <Ph src={ev.img ?? LOGO} className={`art-hero ${ev.img ? "" : "evp-logo"}`} />

          {ev.highlights.length > 0 && (
            <div className="art-keys">
              <div className="kick">{H ? "खास बातें" : "HIGHLIGHTS"}</div>
              <ul className="art-hl">
                {ev.highlights.map((h) => <li key={h.t.en}><strong>{L(h.t)}:</strong> {L(h.d)}</li>)}
              </ul>
            </div>
          )}

          <div className="art-body real-body">
            {ev.about.length > 0
              ? ev.about.map((p) => <p key={p.en}>{L(p)}</p>)
              : <p>{H ? "इस सीज़न की तारीख और जगह जल्द ही बताई जाएगी। नई जानकारी के लिए Taaza TV देखते रहें।" : "Dates and venue for this season will be announced soon. Keep watching Taaza TV for updates."}</p>}

            {ev.timeline.length > 0 && (
              <>
                <h2 className="evp-h2">{H ? "पिछले साल" : "Over the years"}</h2>
                <ul className="evp-tl">
                  {ev.timeline.map((x) => <li key={x.year}><strong>{x.year}</strong>{L(x.t)}</li>)}
                </ul>
              </>
            )}

            {ev.join && (
              <>
                <h2 className="evp-h2">{H ? "कैसे जुड़ें" : "How to take part"}</h2>
                <p>{L(ev.join)}</p>
              </>
            )}

            {ev.url && (
              <p>
                {H ? "टिकट, रजिस्ट्रेशन, गैलरी और ताज़ा अपडेट के लिए " : "For tickets, registration, the gallery and the latest updates, visit "}
                <a href={ev.url} {...ext}>{site}</a>{H ? " देखें।" : "."}
              </p>
            )}
          </div>
        </article>

        <aside className="art-side">
          <div className="side-sticky">
            {(ev.facts.length > 0 || ev.stats.length > 0) && (
              <>
                <div className="also-head">{H ? "एक नज़र में" : "At a glance"}</div>
                <dl className="evp-facts">
                  {ev.facts.map((f) => <div key={f.k.en}><dt>{L(f.k)}</dt><dd>{L(f.v)}</dd></div>)}
                  {ev.stats.length > 0 && <div><dt>{H ? "आंकड़े" : "In numbers"}</dt><dd>{ev.stats.map(L).join(" · ")}</dd></div>}
                  {ev.audience && <div><dt>{H ? "किसके लिए" : "Who it's for"}</dt><dd>{L(ev.audience)}</dd></div>}
                </dl>
              </>
            )}

            <div className="also-head">{H ? "दूसरे इवेंट्स" : "More events"}</div>
            {others.map((o) => (
              <Link key={o.slug} href={`/events/${o.slug}`} className="lk rel">
                <Ph src={o.img ?? LOGO} className={o.img ? "" : "evp-logo"} />
                <div>
                  <div className="tt hv-t">{H ? o.hi : o.name}</div>
                  <div className="meta">{L(o.tag)}</div>
                </div>
              </Link>
            ))}

            {ev.url && (
              <div className="alerts on-dark">
                <div className="t1">{H ? "आधिकारिक वेबसाइट" : "Official website"}</div>
                <div className="t2">{H ? `${name} की पूरी जानकारी ${site} पर।` : `Everything about ${ev.name} is on ${site}.`}</div>
                <a href={ev.url} {...ext} className="btn btn-primary">{H ? "और देखें" : "View more"} ↗</a>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* only stories that are actually about this event */}
      {news.length > 0 && (
        <section className="band">
          <SecHead title={H ? `${name} की खबरें` : `${ev.name} news`} red href={ev.news.category ? `/category/${ev.news.category}` : undefined} />
          <div className="band-grid">
            {news.slice(0, 8).map((n) => (
              <Link key={n.id} href={n.href} className="lk card">
                <Ph src={n.img ?? LOGO} className="ar-16-10" />
                <div className="tt hv-t">{n.title}</div>
                {n.date && <div className="meta">{n.date}</div>}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
