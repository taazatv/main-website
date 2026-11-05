"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import VideoGrid from "./VideoGrid";
import ReelGrid, { IgIcon } from "./ReelGrid";
import { SOCIALS, content } from "@/lib/data";
import { storyHref } from "@/lib/stories";
import type { IgReel } from "@/lib/instagram";
import type { YtVideo } from "@/lib/youtube";

type Feeds = { reels: IgReel[]; videos: YtVideo[]; live: YtVideo[] };

export default function VideoPage({ feeds }: { feeds?: Feeds }) {
  const { t, lang } = useApp();
  const [tab, setTab] = useState(0);
  const c = content(lang);
  const H = lang === "hi";
  const reels = feeds?.reels ?? [];
  const lists = [feeds?.videos ?? [], feeds?.live ?? []];
  const current = tab > 0 ? lists[tab - 1] : [];
  const youtube = SOCIALS.find((x) => x.name === "YouTube")?.href;
  const instagram = SOCIALS.find((x) => x.name === "Instagram")?.href ?? "https://www.instagram.com/taazatvchannel/";
  const igLabel = H ? "Instagram पर सभी रील्स देखें" : "See all Reels on Instagram";
  const hasAny = reels.length > 0 || lists.some((l) => l.length > 0);

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
      {tab === 0 ? (
        reels.length > 0 ? (
          <ReelGrid reels={reels} more={{ href: instagram, label: igLabel }} />
        ) : (
          // reels feed not configured or unreachable: send readers to the profile
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="lk ig-cta">
            <span className="ig-cta-ic"><IgIcon size={34} /></span>
            <span>
              <span className="ig-cta-t">{H ? "हमारी रील्स Instagram पर देखें" : "Watch our Reels on Instagram"}</span>
              <span className="ig-cta-s">@taazatvchannel</span>
            </span>
          </a>
        )
      ) : hasAny ? (
        current.length > 0
          ? <VideoGrid key={tab} videos={current} className="g-wide" itemClass="vwide" hideViews more={youtube ? { href: youtube, label: H ? "YouTube चैनल पर सब देखें" : "See everything on our YouTube channel" } : undefined} />
          : <p className="v-empty">{H ? "अभी यहां कोई वीडियो नहीं है।" : "No videos here yet."}</p>
      ) : (
        <div className="g8">
          {c.shortsGrid.map((s) => (
            <Link key={s.img} href={storyHref(s.title)} className="lk vh">
              <Ph src={s.img}><span className="tag tag-accent">{s.dur}</span></Ph>
              <div className="tt">{s.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
