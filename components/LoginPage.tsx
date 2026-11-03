"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "./AppProvider";
import { useAuth } from "./AuthProvider";
import SignInForm from "./SignInForm";

/** Only same-site paths, so "?next=" can't bounce readers to another site. */
const safeNext = (v: string | null) => (v && v.startsWith("/") && !v.startsWith("//") ? v : "/category/premium");

export default function LoginPage() {
  const { lang } = useApp();
  const { user, ready, signOut } = useAuth();
  const router = useRouter();
  const H = lang === "hi";
  const [next, setNext] = useState("/category/premium");

  useEffect(() => { setNext(safeNext(new URLSearchParams(window.location.search).get("next"))); }, []);

  return (
    <div className="auth-page">
      <section className="auth-card">
        {ready && user ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="auth-logo" src="/taaza/logo.png" alt="Taaza TV" />
            <h1 className="auth-title">{H ? "आप साइन इन हैं" : "You're signed in"}</h1>
            <p className="auth-sub"><strong>{user.name}</strong> · {user.email}</p>
            <div className="auth-form">
              <button className="auth-btn" onClick={() => router.push(next)}>{H ? "प्रीमियम खबरें पढ़ें" : "Read Premium news"}</button>
              <button className="auth-btn auth-btn-ghost" onClick={signOut}>{H ? "साइन आउट" : "Sign out"}</button>
            </div>
          </>
        ) : (
          <SignInForm onDone={() => router.replace(next)} />
        )}
      </section>
    </div>
  );
}
