"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Stand-in sign-in until Supabase is wired up: the user is remembered in this browser only,
 * so it hides Premium stories from casual visitors but is not real security.
 * To switch to Supabase, keep this context's shape and back signIn/signOut/user with supabase.auth.
 */
export type User = { name: string; email: string };

type AuthCtx = {
  user: User | null;
  /** false until the stored session has been read, so pages don't flash the lock for signed-in readers */
  ready: boolean;
  signIn: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signOut: () => void;
  /** where to go once the sign-in popup succeeds; null while the popup is closed */
  signInFor: string | null;
  askSignIn: (next: string | null) => void;
};

const KEY = "tt-user";
const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [signInFor, askSignIn] = useState<string | null>(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem(KEY) || "null");
      if (u?.email) setUser(u);
    } catch {}
    setReady(true);
  }, []);

  const signIn: AuthCtx["signIn"] = async (email, password, name) => {
    email = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
    if (password.length < 6) return { error: "Password must be at least 6 characters." };
    const u = { email, name: name?.trim() || email.split("@")[0] };
    try { localStorage.setItem(KEY, JSON.stringify(u)); } catch {}
    setUser(u);
    return {};
  };

  const signOut = () => {
    try { localStorage.removeItem(KEY); } catch {}
    setUser(null);
  };

  return <Ctx.Provider value={{ user, ready, signIn, signOut, signInFor, askSignIn }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
