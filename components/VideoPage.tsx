"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { content } from "@/lib/data";
import { storyHref } from "@/lib/stories";

export default function VideoPage() {
  const { t, lang } = useApp();
  const [tab, setTab] = useState(0);
  const c = content(lang);
  return (
    <div>
      <div className="cat-head">
        <div>
          <div className="cat-sup">VIDEO NEWS</div>
          <h1 className="m-cat plain">{t.videoHub}</h1>
        </div>
        <div className="seg">
          {[t.tabShorts, t.tabBulletins, t.tabDebates].map((label, i) => (
            <button key={label} className={`seg-opt ${tab === i ? "on" : ""}`} onClick={() => setTab(i)}>{label}</button>
          ))}
        </div>
      </div>
      <div className="g8">
        {c.shortsGrid.map((s) => (
          <Link key={s.img} href={storyHref(s.title)} className="lk vh">
            <Ph src={s.img}><span className="tag tag-accent">{s.dur}</span></Ph>
            <div className="tt">{s.title}</div>
            <div className="vw">{s.views}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
