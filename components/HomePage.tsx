"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";
import { Ph, SecHead } from "./ui";
import { STATES, STATE_HI, content, edition } from "@/lib/data";
import { storyHref } from "@/lib/stories";
import { useOnAir } from "./useOnAir";
import LivePlayer from "./LivePlayer";

export default function HomePage() {
  const { t, lang, stateName, setStateName } = useApp();
  const c = content(lang);
  const sd = edition(lang, stateName);
  const onAir = useOnAir(c.schedule);

  return (
    <div>
      {/* ---------- hero ---------- */}
      <div className="r-hero">
        <div className="pad26 br">
          <div className="lead-meta">
            <span className="tag tag-accent">{t.topStory}</span>
            <span className="lm">{t.leadKicker}</span>
          </div>
          <Link href={storyHref(t.leadTitle)} className="lk">
            <Ph src="/taaza/lead.jpg" className="ar-16-9" />
            <h1 className="m-h1">{t.leadTitle}</h1>
            <p className="m-lede">{t.leadBody}</p>
          </Link>
          <div className="subs">
            <Link href={storyHref(t.subATitle)} className="lk">
              <div className="kick">{t.subA}</div>
              <div className="st hv-t">{t.subATitle}</div>
              <div className="meta">{t.subAMeta}</div>
            </Link>
            <Link href={storyHref(t.subBTitle)} className="lk">
              <div className="kick">{t.subB}</div>
              <div className="st hv-t">{t.subBTitle}</div>
              <div className="meta">{t.subBMeta}</div>
            </Link>
          </div>
        </div>

        <div className="pad26 br">
          <div className="latest-head">
            <span>{t.latest}</span>
            <Link href="/category/national" className="vm">{t.viewMore}</Link>
          </div>
          {c.topStories.map((s) => (
            <Link key={s.n} href={storyHref(s.title)} className="lk latest-item">
              <span className="latest-n">{s.n}</span>
              <div>
                <div className="latest-t">{s.title}</div>
                <div className="meta">{s.meta}</div>
              </div>
            </Link>
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
            {c.topVideos.map((v) => (
              <Link key={v.img} href={storyHref(v.title)} className="lk mw-item">
                <Ph src={v.img} />
                <div className="hv-t">{v.title}</div>
              </Link>
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
          <Link href={storyHref(sd.lead.title)} className="lk st-lead">
            <Ph src="/taaza/state-lead.jpg" className="ar-16-9" />
            <div className="kick">{sd.lead.kicker}</div>
            <div className="tt hv-t">{sd.lead.title}</div>
            <div className="meta">{sd.lead.meta}</div>
          </Link>
          <div className="st-col">
            {sd.list.slice(0, 3).map((s) => <Link key={s} href={storyHref(s)} className="lk st-row">{s}</Link>)}
          </div>
          <div className="st-col last">
            {sd.list.slice(3, 6).map((s) => <Link key={s} href={storyHref(s)} className="lk st-row">{s}</Link>)}
          </div>
        </div>
      </div>

      {/* ---------- national + international ---------- */}
      <div className="r-2">
        <div className="pad28 br">
          <SecHead title={t.nationalNews} red href="/category/national" />
          <Link href={storyHref(t.natLead)} className="lk nat-lead">
            <Ph src="/taaza/national-lead.jpg" className="ar-2-1" />
            <div className="tt hv-t">{t.natLead}</div>
          </Link>
          {c.national.map((n) => <Link key={n} href={storyHref(n)} className="lk nat-row">{n}</Link>)}
        </div>
        <div className="pad28">
          <SecHead title={t.worldNews} href="/category/international-news" />
          <div className="g2">
            {c.worldCards.map((w) => (
              <Link key={w.img} href={storyHref(w.title)} className="lk card">
                <Ph src={w.img} className="ar-16-10" />
                <div className="kick">{w.kicker}</div>
                <div className="tt hv-t">{w.title}</div>
                <div className="meta">{w.meta}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- video ---------- */}
      <div className="video-sec">
        <SecHead title={t.videoNews} red href="/video" />
        <div className="g6">
          {c.shorts.map((s) => (
            <Link key={s.img} href={storyHref(s.title)} className="lk short">
              <Ph src={s.img}><span className="tag tag-accent">{s.dur}</span></Ph>
              <div className="tt hv-t">{s.title}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ---------- entertainment + sports ---------- */}
      <div className="r-2">
        <div className="pad28 br">
          <SecHead title={t.entNews} href="/category/entertainment" />
          <div className="g3">
            {c.entertainment.map((e) => (
              <Link key={e.img} href={storyHref(e.title)} className="lk ent">
                <Ph src={e.img} className="ar-4-3" />
                <div className="tt hv-t">{e.title}</div>
                <div className="meta">{e.meta}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="pad28">
          <SecHead title={t.sportsNews} red href="/category/sports" />
          {c.sports.map((sp) => (
            <Link key={sp.img} href={storyHref(sp.title)} className="lk thumb-row">
              <Ph src={sp.img} />
              <div className="tt hv-t">{sp.title}</div>
            </Link>
          ))}
          <div className="subcats">
            {c.subCats.map((sc) => (
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
          {c.health.map((h) => (
            <Link key={h.img} href={storyHref(h.title)} className="lk thumb-row h">
              <Ph src={h.img} />
              <div className="tt hv-t">{h.title}</div>
            </Link>
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
            {c.premium.map((p) => (
              <Link key={p.img} href={storyHref(p.title)} className="lk prem">
                <Ph src={p.img} className="ar-4-3"><span className="tag tag-neutral">{t.loginToRead}</span></Ph>
                <div className="tt hv-t">{p.title}</div>
                <div className="pm">{p.meta}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- citizen journalist + app ---------- */}
      <div className="r-2">
        <div className="promo-cj on-dark">
          <div className="k">{t.cjKicker}</div>
          <div className="tt">{t.cjTitle}</div>
          <div className="bd">{t.cjBody}</div>
          <button className="btn btn-secondary">{t.cjCta}</button>
        </div>
        <div className="promo-app on-dark">
          <div>
            <div className="k">{t.appKicker}</div>
            <div className="tt">{t.appTitle}</div>
            <div className="btns">
              <button className="btn btn-ghost">Play Store</button>
              <button className="btn btn-ghost">App Store</button>
            </div>
          </div>
          <Ph src="/taaza/app.jpg" className="phone" />
        </div>
      </div>
    </div>
  );
}
