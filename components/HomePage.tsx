"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";
import { Ph, SecHead } from "./ui";
import { SOCIALS, STATES, STATE_HI, content, edition } from "@/lib/data";
import { storyHref } from "@/lib/stories";
import type { HomeNews, NewsItem } from "@/lib/taaza";
import { useOnAir } from "./useOnAir";
import LivePlayer from "./LivePlayer";
import VideoGrid from "./VideoGrid";
import { APP_LINKS } from "@/lib/links";

/** One card's worth of data, whether it came from taazatv.com or the built-in sample content. */
type Card = { key: string; title: string; href: string; img?: string; meta?: string; kicker?: string; external?: boolean; more?: boolean };

const real = (items: NewsItem[] | undefined, kicker?: string): Card[] =>
  (items ?? []).map((x) => ({ key: x.id, title: x.title, href: x.href, img: x.img, meta: x.date, kicker }));
const sample = (items: { title: string; img?: string; meta?: string; kicker?: string }[]): Card[] =>
  items.map((x, i) => ({ key: `s${i}-${x.title}`, title: x.title, href: storyHref(x.title), img: x.img, meta: x.meta, kicker: x.kicker }));
/** Real news when there is enough of it, otherwise the sample content. */
const pick = (r: Card[], min: number, fallback: () => Card[]) => (r.length >= min ? r : fallback());
const withImg = (cards: Card[]) => cards.filter((x) => x.img);

function CardLink({ card, className, children }: { card: Card; className: string; children: React.ReactNode }) {
  return card.external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
    : <Link href={card.href} className={className}>{children}</Link>;
}

/** Title-only row on laptops; on phones it also shows the date above and a thumbnail on the right (app style). */
function RowBody({ card }: { card: Card }) {
  return (
    <>
      <span className="row-txt">
        {card.meta && <span className="row-meta meta">{card.meta}</span>}
        <span>{card.title}</span>
      </span>
      {card.img && <Ph src={card.img} className="app-thumb" />}
    </>
  );
}

export default function HomePage({ news }: { news?: HomeNews }) {
  const { t, lang, stateName, setStateName } = useApp();
  const c = content(lang);
  const sd = edition(lang, stateName);
  const onAir = useOnAir(c.schedule);

  // ---- hero: newest breaking stories ----
  const breaking = real(news?.breaking);
  const heroPool = withImg(breaking);
  const lead: Card = heroPool[0] ?? { key: "lead", title: t.leadTitle, href: storyHref(t.leadTitle), img: "/taaza/lead.jpg", meta: t.leadKicker };
  const rest = breaking.filter((x) => x.key !== lead.key);
  const subs = pick(rest.slice(0, 2), 2, () => [
    { key: "subA", title: t.subATitle, href: storyHref(t.subATitle), kicker: t.subA, meta: t.subAMeta },
    { key: "subB", title: t.subBTitle, href: storyHref(t.subBTitle), kicker: t.subB, meta: t.subBMeta },
  ]);
  const latest = pick(rest.slice(2, 9), 4, () => sample(c.topStories));


  // ---- state edition ----
  const stateCards = real(news?.states[stateName]);
  const stateLead: Card = withImg(stateCards).find((x) => x.key !== lead.key) ?? { key: "st", title: sd.lead.title, href: storyHref(sd.lead.title), img: "/taaza/state-lead.jpg", kicker: sd.lead.kicker, meta: sd.lead.meta };
  const stateList = pick(stateCards.filter((x) => x.key !== stateLead.key).slice(0, 6), 3, () => sample(sd.list.map((title) => ({ title }))));

  // ---- category bands ----
  const nat = real(news?.national);
  const natLead: Card = withImg(nat)[0] ?? { key: "nat", title: t.natLead, href: storyHref(t.natLead), img: "/taaza/national-lead.jpg" };
  const natRows = pick(nat.filter((x) => x.key !== natLead.key).slice(0, 4), 2, () => sample(c.national.map((title) => ({ title }))));
  const world = pick(withImg(real(news?.world)).slice(0, 4), 2, () => sample(c.worldCards));
  const ent = pick(withImg(real(news?.entertainment)).slice(0, 3), 2, () => sample(c.entertainment));
  const sports = pick(withImg(real(news?.sports)).slice(0, 4), 2, () => sample(c.sports));
  const health = pick(withImg(real(news?.health)).slice(0, 4), 2, () => sample(c.health));
  const premium = pick(withImg(real(news?.premium)).slice(0, 4), 2, () => sample(c.premium));

  // ---- most watched: video stories, else other recent stories with pictures not shown above ----
  const shown = new Set([lead, ...subs, ...latest, stateLead, ...stateList, natLead, ...natRows, ...world].map((x) => x.key));
  const extra = withImg([...real(news?.videoStories), ...rest, ...nat, ...real(news?.world), ...real(news?.entertainment), ...real(news?.sports)])
    .filter((x, i, all) => !shown.has(x.key) && all.findIndex((y) => y.key === x.key) === i);
  const watched = pick(extra.slice(0, 5), 3, () => sample(c.topVideos));

  // ---- video: YouTube clips first, topped up with video stories ----
  const clips: Card[] = (news?.videos ?? []).map((v) => ({ key: v.id, title: v.title, img: v.img, href: `https://www.youtube.com/watch?v=${v.youtube}`, external: true }));
  const realVideos = [...clips, ...withImg(real(news?.videoStories))].slice(0, 5);
  const youtube = SOCIALS.find((x) => x.name === "YouTube")?.href;
  const shorts: Card[] = realVideos.length
    ? [...realVideos, ...(youtube ? [{ key: "yt-more", title: lang === "hi" ? "YouTube पर और वीडियो देखें" : "More videos on our YouTube channel", href: youtube, external: true, more: true }] : [])]
    : c.shorts.map((s, i) => ({ key: `sh${i}`, title: s.title, href: storyHref(s.title), img: s.img, meta: s.dur }));

  return (
    <div className="home">
      {/* ---------- hero ---------- */}
      <div className="r-hero">
        <div className="pad26 br">
          <div className="lead-meta">
            <span className="tag tag-accent">{t.topStory}</span>
            {lead.meta && <span className="lm">{lead.meta}</span>}
          </div>
          <CardLink card={lead} className="lk">
            <Ph src={lead.img ?? "/taaza/lead.jpg"} className="ar-16-9" />
            <h1 className="m-h1">{lead.title}</h1>
            {lead.key === "lead" && <p className="m-lede">{t.leadBody}</p>}
          </CardLink>
          <div className="subs">
            {subs.map((s) => (
              <CardLink key={s.key} card={s} className="lk">
                <div className="kick">{s.kicker ?? t.breaking}</div>
                <div className="st hv-t">{s.title}</div>
                {s.meta && <div className="meta">{s.meta}</div>}
              </CardLink>
            ))}
          </div>
        </div>

        <div className="pad26 br">
          <div className="latest-head">
            <span>{t.latest}</span>
            <Link href="/category/national" className="vm">{t.viewMore}</Link>
          </div>
          {latest.map((s, i) => (
            <CardLink key={s.key} card={s} className="lk latest-item">
              <span className="latest-n">{i + 1}</span>
              <div>
                <div className="latest-t">{s.title}</div>
                {s.meta && <div className="meta">{s.meta}</div>}
              </div>
              {s.img && <Ph src={s.img} className="app-thumb" />}
            </CardLink>
          ))}
        </div>

        <div className="pad26">
          <Link href="/live-tv" className="lk wl-head"><span className="blink" /><span>{t.watchLive}</span></Link>
          <div className="ph ar-16-9 wl-player">
            <LivePlayer compact />
            <span className="wl-live"><i />LIVE</span>
          </div>
          <Link href="/live-tv" className="lk">
            <div className="wl-title hv-t">{onAir >= 0 ? c.schedule[onAir].show : t.liveShow}</div>
          </Link>
          <div className="mw">
            <div className="mw-head">{t.mostWatched}</div>
            {watched.map((v) => (
              <CardLink key={v.key} card={v} className="lk mw-item">
                <Ph src={v.img ?? ""} />
                <div className="hv-t">{v.title}</div>
              </CardLink>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- state news ---------- */}
      <div className="bt">
        <div className="st-head">
          <div className="st-title">
            <span>{t.stateNews}</span>
            <span>{t.fromYourState}</span>
          </div>
          <Link href="/category/state" className="vm">{t.viewMore}</Link>
        </div>
        <div className="st-tabs">
          {STATES.map((s) => (
            <button key={s} className={`st-tab ${stateName === s ? "on" : ""}`} aria-pressed={stateName === s} onClick={() => setStateName(s)}>
              {lang === "hi" ? STATE_HI[s] : s}
            </button>
          ))}
        </div>
        <div className="r-3">
          <CardLink card={stateLead} className="lk st-lead">
            <Ph src={stateLead.img ?? "/taaza/state-lead.jpg"} className="ar-16-9" />
            <div className="kick">{stateLead.kicker ?? (lang === "hi" ? STATE_HI[stateName] : stateName.toUpperCase())}</div>
            <div className="tt hv-t">{stateLead.title}</div>
            {stateLead.meta && <div className="meta">{stateLead.meta}</div>}
          </CardLink>
          <div className="st-col">
            {stateList.slice(0, 3).map((s) => <CardLink key={s.key} card={s} className="lk st-row"><RowBody card={s} /></CardLink>)}
          </div>
          <div className="st-col last">
            {stateList.slice(3, 6).map((s) => <CardLink key={s.key} card={s} className="lk st-row"><RowBody card={s} /></CardLink>)}
          </div>
        </div>
      </div>

      {/* ---------- national + international ---------- */}
      <div className="r-2">
        <div className="pad28 br">
          <SecHead title={t.nationalNews} red href="/category/national" />
          <CardLink card={natLead} className="lk nat-lead">
            <Ph src={natLead.img ?? "/taaza/national-lead.jpg"} className="ar-2-1" />
            <div className="tt hv-t">{natLead.title}</div>
          </CardLink>
          {natRows.map((n) => <CardLink key={n.key} card={n} className="lk nat-row"><RowBody card={n} /></CardLink>)}
        </div>
        <div className="pad28">
          <SecHead title={t.worldNews} href="/category/international-news" />
          <div className="g2">
            {world.map((w) => (
              <CardLink key={w.key} card={w} className="lk card">
                <Ph src={w.img ?? ""} className="ar-16-10" />
                {w.kicker && <div className="kick">{w.kicker}</div>}
                <div className="tt hv-t">{w.title}</div>
                {w.meta && <div className="meta">{w.meta}</div>}
              </CardLink>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- video ---------- */}
      <div className="video-sec">
        <SecHead title={t.videoNews} red href="/video" />
        {(news?.shorts.length ?? 0) > 0 ? (
          <VideoGrid
            videos={news!.shorts.slice(0, 5)}
            className="g6"
            itemClass="short"
            more={youtube ? { href: youtube, label: lang === "hi" ? "YouTube पर और शॉर्ट्स देखें" : "More shorts on our YouTube channel" } : undefined}
          />
        ) : (
        <div className="g6">
          {shorts.map((s) => (
            <CardLink key={s.key} card={s} className="lk short">
              {s.more
                ? <div className="ph yt-more"><span className="yt-more-ic"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="currentColor" d="M10 8.5v7l6-3.5z" /></svg></span></div>
                : <Ph src={s.img ?? ""}>{s.meta && /^\d+:\d+$/.test(s.meta) && <span className="tag tag-accent">{s.meta}</span>}</Ph>}
              <div className="tt hv-t">{s.title}</div>
            </CardLink>
          ))}
        </div>
        )}
      </div>

      {/* ---------- entertainment + sports ---------- */}
      <div className="r-2">
        <div className="pad28 br">
          <SecHead title={t.entNews} href="/category/entertainment" />
          <div className="g3">
            {ent.map((e) => (
              <CardLink key={e.key} card={e} className="lk ent">
                <Ph src={e.img ?? ""} className="ar-4-3" />
                <div className="tt hv-t">{e.title}</div>
                {e.meta && <div className="meta">{e.meta}</div>}
              </CardLink>
            ))}
          </div>
        </div>
        <div className="pad28">
          <SecHead title={t.sportsNews} red href="/category/sports" />
          {sports.map((sp) => (
            <CardLink key={sp.key} card={sp} className="lk thumb-row">
              <Ph src={sp.img ?? ""} />
              <div className="tt hv-t">{sp.title}</div>
            </CardLink>
          ))}
          <div className="subcats">
            {((news?.sportTiles.length ?? 0) >= 4 ? news!.sportTiles : c.subCats).map((sc) => (
              <Link key={sc.img} href="/category/sports" className="lk subcat">
                <Ph src={sc.img} className="ar-4-3" />
                <div className="subcat-label">{sc.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- health + premium ---------- */}
      <div className="r-2 hp">
        <div className="pad28 br">
          <SecHead title={t.healthNews} href="/category/health" />
          {health.map((h) => (
            <CardLink key={h.key} card={h} className="lk thumb-row h">
              <Ph src={h.img ?? ""} />
              <div className="tt hv-t">{h.title}</div>
            </CardLink>
          ))}
        </div>
        <div className="pad28">
          <div className="sh">
            <div className="prem-head-l">
              <span className="sh-title"><span className="sh-dot" />{t.premiumNews}</span>
              <span>{t.membersOnly}</span>
            </div>
            <Link href="/category/premium" className="become">{t.becomeMember}</Link>
          </div>
          <div className="g4">
            {premium.map((p) => (
              <CardLink key={p.key} card={p} className="lk prem">
                <Ph src={p.img ?? ""} className="ar-4-3"><span className="tag tag-neutral">{t.loginToRead}</span></Ph>
                <div className="tt hv-t">{p.title}</div>
                {p.meta && <div className="pm">{p.meta}</div>}
              </CardLink>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- app promo (laptop only; phones get it in the footer) ---------- */}
      <div className="promo-wrap">
        <div className="promo-app on-dark">
          <div>
            <div className="k">{t.appKicker}</div>
            <div className="tt">{t.appTitle}</div>
            <div className="btns">
              <a className="btn btn-ghost" href={APP_LINKS.playStore} target="_blank" rel="noopener noreferrer">Play Store</a>
              <a className="btn btn-ghost" href={APP_LINKS.appStore} target="_blank" rel="noopener noreferrer">App Store</a>
            </div>
          </div>
          <Ph src="/taaza/app.jpg" className="phone" />
        </div>
      </div>
    </div>
  );
}
