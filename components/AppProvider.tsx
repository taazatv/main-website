"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STATES, dict, type Lang, type StateName } from "@/lib/data";

type Theme = "light" | "dark";

type AppCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  stateName: StateName;
  setStateName: (s: StateName) => void;
  theme: Theme;
  toggleTheme: () => void;
  stateModalOpen: boolean;
  setStateModalOpen: (v: boolean) => void;
  t: ReturnType<typeof dict>;
};

const Ctx = createContext<AppCtx | null>(null);

function read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const v = localStorage.getItem(key) as T | null;
    return v && allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [stateName, setStateName] = useState<StateName>("West Bengal");
  const [theme, setTheme] = useState<Theme>("light");
  const [stateModalOpen, setStateModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLang(read("tt-lang", ["en", "hi"] as const, "en"));
    setStateName(read("tt-state", STATES, "West Bengal"));
    setTheme(read("tt-theme", ["light", "dark"] as const, "light"));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dataset.theme = theme;
    try {
      localStorage.setItem("tt-lang", lang);
      localStorage.setItem("tt-state", stateName);
      localStorage.setItem("tt-theme", theme);
    } catch {}
  }, [lang, stateName, theme, loaded]);

  return (
    <Ctx.Provider
      value={{
        lang, setLang, stateName, setStateName, theme,
        toggleTheme: () => setTheme((p) => (p === "light" ? "dark" : "light")),
        stateModalOpen, setStateModalOpen,
        t: dict(lang),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}
