"use client";

import { useApp } from "./AppProvider";
import { Ph } from "./ui";
import { content } from "@/lib/data";
import LivePlayer from "./LivePlayer";
import { useOnAir } from "./useOnAir";

export default function LiveTvPage() {
  const { t, lang } = useApp();
  const c = content(lang);
  const onAir = useOnAir(c.schedule);
  const showNow = onAir >= 0 ? c.schedule[onAir].show : t.liveShow;
  return (
    <div className="live">
      <div className="pad28">
        <div className="player">
          <LivePlayer />
          <div className="lv"><i />LIVE</div>
        </div>
        <div className="onair">
          <span className="tag tag-accent">{t.onAir}</span>
          <div>{showNow}</div>
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
        {c.schedule.map((s, i) => (
          <div key={s.time} className={`sched ${i === onAir ? "now" : ""}`} aria-current={i === onAir ? "time" : undefined}>
            <div className="tm">{s.time}</div>
            <div>
              <div className="sw">{s.show}{i === onAir && <span className="sched-now">{t.onAir}</span>}</div>
              <div className="hs">{s.host}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
