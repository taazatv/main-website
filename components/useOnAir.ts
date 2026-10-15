"use client";

import { useEffect, useState } from "react";

type Slot = { time: string; show: string };

/** Minutes since midnight in India, regardless of the viewer's own time zone. */
function istMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/**
 * Index of the slot on air right now (IST). Before the first slot of the day, the previous
 * night's last slot is still running. Returns -1 until mounted, so server and client markup match.
 */
export function useOnAir(slots: Slot[]) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(istMinutes());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (now === null || slots.length === 0) return -1;
  let idx = slots.length - 1;
  for (let i = 0; i < slots.length; i++) if (toMinutes(slots[i].time) <= now) idx = i;
  return idx;
}
