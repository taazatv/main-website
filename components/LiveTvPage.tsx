"use client";

import LivePlayer from "./LivePlayer";

export default function LiveTvPage() {
  return (
    <div className="live">
      <div className="pad28">
        <div className="player">
          <LivePlayer />
          <div className="lv"><i />LIVE</div>
        </div>
      </div>
    </div>
  );
}
