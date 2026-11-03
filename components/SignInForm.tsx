"use client";

import { useState } from "react";
import { useApp } from "./AppProvider";
import { useAuth } from "./AuthProvider";
import { LEGAL } from "@/lib/links";

/** Logo, heading and sign-in fields, shared by the /login page and the sign-in popup. */
export default function SignInForm({ onDone }: { onDone: () => void }) {
  const { lang } = useApp();
  const { signIn } = useAuth();
  const H = lang === "hi";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await signIn(email, password, name);
    setBusy(false);
    if (res.error) return setError(res.error);
    onDone();
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="auth-logo" src="/taaza/logo.png" alt="Taaza TV" />
      <h2 className="auth-title">{H ? "Taaza TV में साइन इन करें" : "Sign in to Taaza TV"}</h2>
      <p className="auth-sub">{H ? "प्रीमियम खबरें पढ़ें और अपने राज्य की हर खबर पाएं।" : "Read Premium stories and get every update from your state."}</p>

      <form className="auth-form" onSubmit={submit} noValidate>
        <label className="auth-field">
          <span>{H ? "नाम" : "Name"}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder={H ? "आपका नाम" : "Your name"} />
        </label>
        <label className="auth-field">
          <span>{H ? "ईमेल" : "Email"}</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="auth-field">
          <span>{H ? "पासवर्ड" : "Password"}</span>
          <span className="auth-pw">
            <input type={showPw ? "text" : "password"} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder={H ? "कम से कम 6 अक्षर" : "At least 6 characters"} />
            <button type="button" className="auth-pw-btn" onClick={() => setShowPw((v) => !v)} aria-pressed={showPw}>
              {showPw ? (H ? "छिपाएं" : "Hide") : (H ? "दिखाएं" : "Show")}
            </button>
          </span>
        </label>
        {error && <p className="auth-err" role="alert">{error}</p>}
        <button className="auth-btn" type="submit" disabled={busy}>{busy ? (H ? "साइन इन हो रहा है…" : "Signing in…") : (H ? "साइन इन" : "Sign in")}</button>
        <p className="auth-fine">
          {H ? "जारी रखकर आप Taaza TV की " : "By continuing, you agree to Taaza TV's "}
          <a href={LEGAL.terms} target="_blank" rel="noopener noreferrer">{H ? "नियम व शर्तें" : "Terms of Use"}</a>
          {H ? " और " : " and "}
          <a href={LEGAL.privacy} target="_blank" rel="noopener noreferrer">{H ? "प्राइवेसी पॉलिसी" : "Privacy Policy"}</a>
          {H ? " से सहमत हैं।" : "."}
        </p>
      </form>
    </>
  );
}
