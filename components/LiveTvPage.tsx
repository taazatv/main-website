"use client";

import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { content } from "@/lib/data";

export default function LiveTvPage() {
  const { t, lang } = useApp();
  const c = content(lang);
  return (
    <div className="live">
      <div className="pad28">
        <div className="player">
          <div className="bgimg" />
          <div className="lv"><i />LIVE</div>
          <div className="wm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/taaza/logo.png" alt="Taaza TV" />
            <span>HD</span>
          </div>
          <div className="cap">
            <span className="tag tag-accent">{t.onAir}</span>
            <div>{t.liveShow}</div>
          </div>
        </div>
        <div className="ctrl">
          <span className="pl" />
          <div className="bar"><div /></div>
          <span>LIVE • 1080p</span>
        </div>
        <div className="chans">
          {c.channels.map((ch) => (
            <div key={ch.img} style={{ cursor: "pointer" }}>
              <Ph src={ch.img} className="ar-16-9" />
              <div className="lb">{ch.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pad28">
        <div className="sched-head">{t.schedule}</div>
        {c.schedule.map((s) => (
          <div key={s.time} className={`sched ${s.now ? "now" : ""}`}>
            <div className="tm">{s.time}</div>
            <div>
              <div className="sw">{s.show}</div>
              <div className="hs">{s.host}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
