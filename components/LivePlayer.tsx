"use client";

import { useEffect, useRef, useState } from "react";
import { LIVE_STREAM } from "@/lib/links";

/**
 * hls.js wherever MediaSource exists, native HLS on iPhone. Starts muted so autoplay is allowed.
 * `compact` hides the native controls and shows a single mute/unmute button instead.
 */
export default function LivePlayer({ compact = false }: { compact?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    let hls: import("hls.js").default | undefined;
    let cancelled = false;
    const play = () => { el.play().catch(() => { /* autoplay blocked: user can still start it */ }); };

    // iPhone Safari has no MediaSource but plays HLS natively; everyone else (incl. Chrome, whose
    // native HLS is unreliable) goes through hls.js.
    if (!("MediaSource" in window) && el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = LIVE_STREAM.hls;
      el.addEventListener("loadedmetadata", play, { once: true });
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled) return;
        if (!Hls.isSupported()) { setFailed(true); return; }
        // capLevelToPlayerSize keeps the small home-page player off the 1080p rendition
        hls = new Hls({ liveSyncDurationCount: 3, capLevelToPlayerSize: true });
        hls.on(Hls.Events.MANIFEST_PARSED, play);
        hls.on(Hls.Events.ERROR, (_e, data) => {
          if (!data.fatal) return;
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls?.startLoad();
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls?.recoverMediaError();
          else setFailed(true);
        });
        hls.loadSource(LIVE_STREAM.hls);
        hls.attachMedia(el);
      });
    }
    return () => { cancelled = true; hls?.destroy(); };
  }, []);

  const toggleMute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted) el.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={video}
        className="player-frame"
        controls={!compact}
        muted
        playsInline
        autoPlay
        poster="/taaza/live.jpg"
        aria-label="Taaza TV live stream"
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
      />
      {compact && (
        <button className="mute-btn" onClick={toggleMute} aria-pressed={!muted} aria-label={muted ? "Unmute live TV" : "Mute live TV"} title={muted ? "Unmute" : "Mute"}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" />
            {muted ? <path d="m22 9-6 6M16 9l6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
          </svg>
          {muted && <span>Tap to unmute</span>}
        </button>
      )}
      {failed && <div className="player-err">Live stream could not start. Please refresh the page.</div>}
    </>
  );
}
