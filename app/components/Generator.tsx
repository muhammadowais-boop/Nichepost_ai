"use client";

import { useState } from "react";

type Platform = "Instagram" | "LinkedIn" | "Twitter";
type Tone     = "Professional" | "Casual" | "Humorous";

interface DayPost {
  day: string;
  copy: string;
  hashtags: string[];
}

/* ─── Static data ───────────────────────────────────────────── */

const PLATFORMS: { id: Platform; label: string; icon: React.ReactNode }[] = [
  {
    id: "Instagram",
    label: "Instagram",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: "LinkedIn",
    label: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: "Twitter",
    label: "Twitter / X",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const TONES: { id: Tone; label: string; desc: string }[] = [
  { id: "Professional", label: "Professional", desc: "Polished and authoritative" },
  { id: "Casual",       label: "Casual",       desc: "Friendly and conversational" },
  { id: "Humorous",     label: "Humorous",     desc: "Witty and playful" },
];

const DAY_ACCENTS = [
  { border: "#7C3AED", glow: "rgba(124,58,237,0.12)", cover: "from-[#3B0764] via-[#1E1B4B] to-[#0A0A0F]" },
  { border: "#6366F1", glow: "rgba(99,102,241,0.12)",  cover: "from-[#1E1B4B] via-[#1E1E2E] to-[#0A0A0F]" },
  { border: "#A855F7", glow: "rgba(168,85,247,0.12)", cover: "from-[#4A044E] via-[#1E1E2E] to-[#0A0A0F]" },
  { border: "#7C3AED", glow: "rgba(124,58,237,0.12)", cover: "from-[#2D1B69] via-[#1E1E2E] to-[#0A0A0F]" },
  { border: "#8B5CF6", glow: "rgba(139,92,246,0.12)", cover: "from-[#3B0764] via-[#1E1B4B] to-[#0A0A0F]" },
  { border: "#C026D3", glow: "rgba(192,38,211,0.12)", cover: "from-[#4A044E] via-[#2D1B69] to-[#0A0A0F]" },
  { border: "#7C3AED", glow: "rgba(124,58,237,0.12)", cover: "from-[#1E1B4B] via-[#3B0764] to-[#0A0A0F]" },
];

/* ─── Copy button ───────────────────────────────────────────── */

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 ease-in-out ${
        copied
          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 scale-95"
          : "bg-[#1E1E2E] hover:bg-[#2A2A3E] text-[#94A3B8] hover:text-white border-[#1E1E2E] hover:border-[#3A3A5E]"
      }`}
      style={{ transform: copied ? "scale(0.95)" : "scale(1)", transition: "all 0.3s ease-in-out" }}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

/* ─── Full-width cover image placeholder ────────────────────── */

function CalendarCover({
  niche,
  platform,
  tone,
}: {
  niche: string;
  platform: Platform;
  tone: Tone;
}) {
  const platformData = PLATFORMS.find((p) => p.id === platform)!;

  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[#1E1E2E] flex items-center justify-center bg-[#12121A]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3B0764]/60 via-[#1E1B4B]/40 to-[#0A0A0F]" />

      {/* Dot grid texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cover-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cover-dots)" />
      </svg>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(124,58,237,0.18),transparent)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 shadow-xl">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>
        <p className="text-white/25 text-xs font-medium uppercase tracking-widest">Cover Image</p>
      </div>

      {/* Bottom meta */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">7-Day Calendar</span>
          <span className="text-sm font-bold text-white/60 truncate max-w-[200px]">{niche}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#A855F7] px-2.5 py-1 rounded-full">
            <span className="text-white/60">{platformData.icon}</span>
            {platform}
          </span>
          <span className="text-xs font-medium bg-white/5 border border-white/10 text-white/40 px-2.5 py-1 rounded-full">
            {tone}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Post card (2-col grid) ────────────────────────────────── */

function PostCard({
  post,
  platform,
  index,
}: {
  post: DayPost;
  platform: Platform;
  index: number;
}) {
  const accent = DAY_ACCENTS[index];
  const pad    = String(index + 1).padStart(2, "0");
  const fullText = `${post.copy}\n\n${post.hashtags.join(" ")}`;

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden border bg-card post-card"
      style={{
        borderColor: `${accent.border}40`,
        boxShadow: `0 0 0 1px ${accent.border}20, 0 8px 32px ${accent.glow}`,
        animation: "fadeInUp 0.4s ease forwards",
        animationDelay: `${index * 65}ms`,
        opacity: 0,
      }}
    >
      {/* Mini cover */}
      <div className={`relative h-28 bg-gradient-to-br ${accent.cover} overflow-hidden flex items-center justify-between px-5`}>
        {/* Dot texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`dots-${index}`} x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
        </svg>

        {/* Big watermark number */}
        <span
          className="absolute right-3 bottom-[-10px] font-black text-white/[0.04] leading-none select-none pointer-events-none"
          style={{ fontSize: "6rem" }}
        >
          {pad}
        </span>

        {/* Day badge */}
        <div
          className="relative z-10 flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wider"
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white font-black text-sm"
            style={{ background: accent.border }}
          >
            {index + 1}
          </span>
          {post.day}
        </div>

        {/* Platform label */}
        <span className="relative z-10 text-xs text-white/30 font-medium">
          {platform}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Caption label */}
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/50 mb-1.5 block">
            Caption
          </span>
          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
            {post.copy}
          </p>
        </div>

        {/* Hashtags */}
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]/50 mb-1.5 block">
            Hashtags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#7C3AED]/10 text-[#A855F7] border border-[#7C3AED]/20 px-2 py-0.5 rounded font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-[#1E1E2E] flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]/40">
            {post.copy.split(" ").length} words · {post.hashtags.length} tags
          </span>
          <CopyButton text={fullText} label="Copy post" />
        </div>
      </div>
    </div>
  );
}

/* ─── Output header ─────────────────────────────────────────── */

function OutputHeader({
  platform,
  tone,
  niche,
  onCopyAll,
  onRegenerate,
}: {
  platform: Platform;
  tone: Tone;
  niche: string;
  onCopyAll: () => Promise<void>;
  onRegenerate: () => void;
}) {
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyAll = async () => {
    await onCopyAll();
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)" }} />
          <span className="text-xs font-semibold text-emerald-400">Calendar ready</span>
        </div>
        <h3 className="text-xl font-extrabold text-white">
          Your 7-Day <span className="text-[#A855F7]">{platform}</span> Calendar
        </h3>
        <p className="text-xs text-muted mt-0.5 truncate max-w-sm">
          {tone} · {niche}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#1E1E2E] bg-[#12121A] hover:bg-[#1E1E2E] text-muted hover:text-white transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate
        </button>

        <button
          onClick={handleCopyAll}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
            allCopied
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-[#7C3AED]"
          }`}
        >
          {allCopied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              All copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy all 7 posts
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Generator ─────────────────────────────────────────── */

export default function Generator() {
  const [niche,          setNiche]          = useState("");
  const [platform,       setPlatform]       = useState<Platform>("Instagram");
  const [tone,           setTone]           = useState<Tone>("Professional");
  const [posts,          setPosts]          = useState<DayPost[]>([]);
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState("");
  const [submittedNiche, setSubmittedNiche] = useState("");

  const generate = async (nicheValue: string) => {
    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: nicheValue, platform, tone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate content");
      }

      const data = await res.json();
      setPosts(data.posts);
      setSubmittedNiche(nicheValue);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (niche.trim()) generate(niche.trim());
  };

  const copyAll = async () => {
    const all = posts
      .map((p, i) => `--- Day ${i + 1}: ${p.day} ---\n${p.copy}\n\n${p.hashtags.join(" ")}`)
      .join("\n\n");
    await navigator.clipboard.writeText(all);
  };

  return (
    <div className="space-y-10">

      {/* ── Form card ──────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-edge rounded-2xl p-6 sm:p-8 space-y-7"
      >
        {/* Niche input */}
        <div className="space-y-2">
          <label htmlFor="niche" className="block text-sm font-semibold text-white">
            Your Niche
          </label>
          <input
            id="niche"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness coaching for busy moms, B2B SaaS sales…"
            autoComplete="off"
            className="w-full border border-edge rounded-xl px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]/60 transition"
            style={{ background: "#12121A", colorScheme: "dark" }}
            required
          />
        </div>

        {/* Platform pills */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">Platform</label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPlatform(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 ease-in-out ${
                  platform === id
                    ? "bg-[#7C3AED] border-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/25"
                    : "bg-transparent border-edge text-muted hover:border-[#7C3AED]/50 hover:text-white"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tone cards */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">Tone</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TONES.map(({ id, label, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTone(id)}
                className={`flex flex-col items-start gap-0.5 px-4 py-4 rounded-xl border text-left transition-all duration-300 ease-in-out ${
                  tone === id
                    ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white shadow-lg shadow-[#7C3AED]/15"
                    : "border-edge bg-bg text-muted hover:border-[#7C3AED]/40 hover:text-white"
                }`}
              >
                <span className="text-sm font-bold text-white">{label}</span>
                <span className="text-xs text-muted">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !niche.trim()}
          className="w-full flex items-center justify-center gap-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-[#7C3AED]/25 btn-primary"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating your calendar…
            </>
          ) : (
            <>
              Generate 7-Day Calendar
              <span aria-hidden>🔥</span>
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
      </form>

      {/* ── Output section ──────────────────────────────────────── */}
      {posts.length > 0 && (
        <div
          style={{ animation: "fadeInUp 0.35s ease forwards", opacity: 0 }}
        >
          {/* Header row */}
          <OutputHeader
            platform={platform}
            tone={tone}
            niche={submittedNiche}
            onCopyAll={copyAll}
            onRegenerate={() => generate(submittedNiche)}
          />

          {/* Full-width cover image placeholder */}
          <div className="mb-6">
            <CalendarCover niche={submittedNiche} platform={platform} tone={tone} />
          </div>

          {/* 2-column card grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post, i) => (
              <div
                key={`${post.day}-${i}`}
                className={posts.length % 2 !== 0 && i === posts.length - 1 ? "md:col-span-2" : ""}
              >
                <PostCard post={post} platform={platform} index={i} />
              </div>
            ))}
          </div>

          <p className="text-center text-[#94A3B8]/40 text-xs mt-6">
            Not satisfied? Hit Regenerate or refine your niche and try again.
          </p>
        </div>
      )}
    </div>
  );
}
