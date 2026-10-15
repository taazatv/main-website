"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import VideoGrid from "./VideoGrid";
import { SOCIALS, content } from "@/lib/data";
import { storyHref } from "@/lib/stories";
import type { YtVideo } from "@/lib/youtube";

type Feeds = { shorts: YtVideo[]; videos: YtVideo[]; live: YtVideo[] };

export default function VideoPage({ feeds }: { feeds?: Feeds }) {
  const { t, lang } = useApp();
  const [tab, setTab] = useState(0);
  const c = content(lang);
  const lists = [feeds?.shorts ?? [], feeds?.videos ?? [], feeds?.live ?? []];
  const current = lists[tab];
  const youtube = SOCIALS.find((x) => x.name === "YouTube")?.href;
  const hasAny = lists.some((l) => l.length > 0);

  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">VIDEO NEWS</div>
          <h1 className="m-cat plain">{t.videoHub}</h1>
        </div>
        <div className="seg">
          {[t.tabShorts, t.tabBulletins, t.tabDebates].map((label, i) => (
            <button key={label} className={`seg-opt ${tab === i ? "on" : ""}`} aria-pressed={tab === i} onClick={() => setTab(i)}>{label}</button>
          ))}
        </div>
      </div>
      {hasAny ? (
        current.length > 0
          ? <VideoGrid key={tab} videos={current} className={tab === 0 ? "g8" : "g-wide"} itemClass={tab === 0 ? "vh" : "vwide"} more={youtube ? { href: youtube, label: lang === "hi" ? "YouTube चैनल पर सब देखें" : "See everything on our YouTube channel" } : undefined} />
          : <p className="v-empty">{lang === "hi" ? "अभी यहां कोई वीडियो नहीं है।" : "No videos here yet."}</p>
      ) : (
        <div className="g8">
          {c.shortsGrid.map((s) => (
            <Link key={s.img} href={storyHref(s.title)} className="lk vh">
              <Ph src={s.img}><span className="tag tag-accent">{s.dur}</span></Ph>
              <div className="tt">{s.title}</div>
              <div className="vw">{s.views}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
