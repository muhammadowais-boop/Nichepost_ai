"use client";

import { useState } from "react";

type Platform = "Instagram" | "LinkedIn" | "Twitter";
type Tone = "Professional" | "Casual" | "Humorous";

interface DayPost {
  day: string;
  copy: string;
  hashtags: string[];
}

const PLATFORM_ICONS: Record<Platform, string> = {
  Instagram: "📸",
  LinkedIn: "💼",
  Twitter: "🐦",
};

const PLATFORM_COLORS: Record<Platform, { badge: string; glow: string }> = {
  Instagram: {
    badge: "bg-pink-500/15 text-pink-300 border-pink-500/25",
    glow: "from-pink-900/30 via-purple-900/20 to-violet-900/30",
  },
  LinkedIn: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    glow: "from-blue-900/30 via-indigo-900/20 to-violet-900/30",
  },
  Twitter: {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    glow: "from-sky-900/30 via-blue-900/20 to-indigo-900/30",
  },
};

const TONE_DESCRIPTIONS: Record<Tone, string> = {
  Professional: "Authoritative & polished",
  Casual: "Friendly & conversational",
  Humorous: "Witty & entertaining",
};

const DAY_THEMES = [
  { cover: "from-violet-600/30 via-fuchsia-700/20 to-violet-900/40", accent: "border-violet-500/30", dot: "bg-violet-400", num: "text-violet-500/20" },
  { cover: "from-indigo-600/30 via-violet-700/20 to-indigo-900/40", accent: "border-indigo-500/30", dot: "bg-indigo-400", num: "text-indigo-500/20" },
  { cover: "from-fuchsia-600/30 via-pink-700/20 to-fuchsia-900/40", accent: "border-fuchsia-500/30", dot: "bg-fuchsia-400", num: "text-fuchsia-500/20" },
  { cover: "from-purple-600/30 via-indigo-700/20 to-purple-900/40", accent: "border-purple-500/30", dot: "bg-purple-400", num: "text-purple-500/20" },
  { cover: "from-violet-700/30 via-purple-700/20 to-fuchsia-900/40", accent: "border-violet-500/30", dot: "bg-violet-400", num: "text-violet-500/20" },
  { cover: "from-pink-600/30 via-fuchsia-700/20 to-pink-900/40", accent: "border-pink-500/30", dot: "bg-pink-400", num: "text-pink-500/20" },
  { cover: "from-indigo-600/30 via-fuchsia-700/20 to-violet-900/40", accent: "border-indigo-500/30", dot: "bg-indigo-400", num: "text-indigo-500/20" },
];

/* ─── Copy button ────────────────────────────────────────────── */

function CopyButton({ text, size = "sm" }: { text: string; size?: "sm" | "md" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const base =
    size === "md"
      ? "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
      : "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200";

  return (
    <button
      onClick={handleCopy}
      className={`${base} ${
        copied
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-500"
      }`}
    >
      {copied ? (
        <>
          <svg className={size === "md" ? "w-4 h-4" : "w-3.5 h-3.5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className={size === "md" ? "w-4 h-4" : "w-3.5 h-3.5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {size === "md" ? "Copy post" : "Copy"}
        </>
      )}
    </button>
  );
}

/* ─── Cover image placeholder ───────────────────────────────── */

function CoverPlaceholder({
  day,
  index,
  platform,
  theme,
}: {
  day: string;
  index: number;
  platform: Platform;
  theme: (typeof DAY_THEMES)[number];
}) {
  const pad = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`relative h-44 w-full bg-gradient-to-br ${theme.cover} overflow-hidden flex items-center justify-center`}
    >
      {/* Subtle dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`dot-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dot-${index})`} />
      </svg>

      {/* Large watermark day number */}
      <span
        className={`absolute -right-3 -bottom-6 font-black leading-none select-none pointer-events-none ${theme.num}`}
        style={{ fontSize: "9rem" }}
      >
        {pad}
      </span>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />

      {/* Center camera icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5M3 6.75h.008v.008H3V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM4.5 5.25h15a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6a.75.75 0 01.75-.75z" />
          </svg>
        </div>
        <span className="text-xs text-white/25 font-medium tracking-wide uppercase">
          Cover Image
        </span>
      </div>

      {/* Day pill — bottom left */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
        <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
          Day {pad} &middot; {day}
        </span>
      </div>

      {/* Platform pill — bottom right */}
      <div className={`absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${PLATFORM_COLORS[platform].badge}`}>
        {PLATFORM_ICONS[platform]} {platform}
      </div>
    </div>
  );
}

/* ─── Post card ─────────────────────────────────────────────── */

function PostCard({
  post,
  platform,
  index,
}: {
  post: DayPost;
  platform: Platform;
  index: number;
}) {
  const theme = DAY_THEMES[index];
  const fullText = `${post.copy}\n\n${post.hashtags.join(" ")}`;

  return (
    <div
      className={`rounded-2xl overflow-hidden border ${theme.accent} bg-slate-900/80 backdrop-blur-sm flex flex-col shadow-xl shadow-black/20`}
      style={{
        animation: "fadeInUp 0.45s ease forwards",
        animationDelay: `${index * 70}ms`,
        opacity: 0,
      }}
    >
      {/* Cover image placeholder */}
      <CoverPlaceholder day={post.day} index={index} platform={platform} theme={theme} />

      {/* Card body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Post copy */}
        <div className="space-y-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Caption
          </span>
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
            {post.copy}
          </p>
        </div>

        {/* Hashtags */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Hashtags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-violet-950/60 text-violet-300 border border-violet-700/30 px-2.5 py-0.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {post.copy.split(" ").length} words &middot; {post.hashtags.length} tags
          </div>
          <CopyButton text={fullText} size="sm" />
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
  onCopyAll: () => void;
  onRegenerate: () => void;
}) {
  const [allCopied, setAllCopied] = useState(false);

  const handleCopyAll = async () => {
    await onCopyAll();
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  return (
    <div
      className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/60 via-slate-900 to-fuchsia-950/30 p-6"
      style={{ animation: "fadeInUp 0.35s ease forwards", opacity: 0 }}
    >
      {/* Status row */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)]" />
            <span className="text-sm font-semibold text-emerald-400">Calendar ready</span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-white">
            Your 7-Day{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {platform}
            </span>{" "}
            Calendar
          </h3>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              allCopied
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-violet-600 hover:bg-violet-500 text-white border-violet-500"
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

      {/* Meta chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${PLATFORM_COLORS[platform].badge}`}>
          {PLATFORM_ICONS[platform]} {platform}
        </span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-300">
          {tone} tone
        </span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800 text-slate-400 truncate max-w-xs">
          ✦ {niche}
        </span>
      </div>

      {/* Week strip */}
      <div className="mt-5 grid grid-cols-7 gap-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-slate-600">{d}</span>
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Generator ─────────────────────────────────────────── */

export default function Generator() {
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Professional");
  const [posts, setPosts] = useState<DayPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;
    await generate(niche.trim());
  };

  const handleRegenerate = () => {
    if (submittedNiche) generate(submittedNiche);
  };

  const copyAll = async () => {
    const all = posts
      .map((p, i) => `--- Day ${i + 1}: ${p.day} ---\n${p.copy}\n\n${p.hashtags.join(" ")}`)
      .join("\n\n");
    await navigator.clipboard.writeText(all);
  };

  return (
    <div className="space-y-10">
      {/* ── Form ── */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        {/* Niche */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300" htmlFor="niche">
            Your Niche
          </label>
          <input
            id="niche"
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. fitness coaching for busy moms, B2B SaaS sales, vegan recipes…"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Platform */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Platform</label>
            <div className="flex flex-col gap-2">
              {(["Instagram", "LinkedIn", "Twitter"] as Platform[]).map((p) => (
                <label
                  key={p}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    platform === p
                      ? "border-violet-500/60 bg-violet-500/10 text-white"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="platform"
                    value={p}
                    checked={platform === p}
                    onChange={() => setPlatform(p)}
                    className="sr-only"
                  />
                  <span>{PLATFORM_ICONS[p]}</span>
                  <span className="text-sm font-medium">{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Tone</label>
            <div className="flex flex-col gap-2">
              {(["Professional", "Casual", "Humorous"] as Tone[]).map((t) => (
                <label
                  key={t}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    tone === t
                      ? "border-fuchsia-500/60 bg-fuchsia-500/10 text-white"
                      : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={t}
                    checked={tone === t}
                    onChange={() => setTone(t)}
                    className="sr-only"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{t}</span>
                    <span className="text-xs text-slate-500">{TONE_DESCRIPTIONS[t]}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !niche.trim()}
          className="w-full py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            "Generate 7-Day Calendar ✦"
          )}
        </button>

        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        )}
      </form>

      {/* ── Output ── */}
      {posts.length > 0 && (
        <div className="space-y-6">
          <OutputHeader
            platform={platform}
            tone={tone}
            niche={submittedNiche}
            onCopyAll={copyAll}
            onRegenerate={handleRegenerate}
          />

          <div className="grid gap-5">
            {posts.map((post, i) => (
              <PostCard key={`${post.day}-${i}`} post={post} platform={platform} index={i} />
            ))}
          </div>

          <p className="text-center text-slate-600 text-xs pt-2">
            Not happy with the results? Hit Regenerate or tweak your niche and try again.
          </p>
        </div>
      )}
    </div>
  );
}
