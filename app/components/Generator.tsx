"use client";

import { useState } from "react";

type Platform = "Instagram" | "LinkedIn" | "Twitter";
type Tone = "Professional" | "Casual" | "Humorous";

interface DayPost {
  day: string;
  copy: string;
  hashtags: string[];
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PLATFORM_ICONS: Record<Platform, string> = {
  Instagram: "📸",
  LinkedIn: "💼",
  Twitter: "🐦",
};

const TONE_DESCRIPTIONS: Record<Tone, string> = {
  Professional: "Authoritative & polished",
  Casual: "Friendly & conversational",
  Humorous: "Witty & entertaining",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 border border-slate-600/40"
      }`}
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
          Copy post
        </>
      )}
    </button>
  );
}

function PostCard({ post, platform, index }: { post: DayPost; platform: Platform; index: number }) {
  const fullText = `${post.copy}\n\n${post.hashtags.join(" ")}`;

  const dayColors = [
    "from-violet-500/10 to-fuchsia-500/10 border-violet-500/20",
    "from-blue-500/10 to-violet-500/10 border-blue-500/20",
    "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20",
    "from-indigo-500/10 to-blue-500/10 border-indigo-500/20",
    "from-purple-500/10 to-violet-500/10 border-purple-500/20",
    "from-pink-500/10 to-rose-500/10 border-pink-500/20",
    "from-violet-500/10 to-indigo-500/10 border-violet-500/20",
  ];

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${dayColors[index]} p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-500">
            Day {index + 1}
          </span>
          <span className="text-sm font-semibold text-slate-200">{post.day}</span>
          <span className="text-xs text-slate-500">{PLATFORM_ICONS[platform]}</span>
        </div>
        <CopyButton text={fullText} />
      </div>

      <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{post.copy}</p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {post.hashtags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-slate-800/80 text-violet-300 px-2 py-0.5 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Generator() {
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Professional");
  const [posts, setPosts] = useState<DayPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: niche.trim(), platform, tone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate content");
      }

      const data = await res.json();
      setPosts(data.posts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    const all = posts
      .map((p) => `--- ${p.day} ---\n${p.copy}\n\n${p.hashtags.join(" ")}`)
      .join("\n\n");
    await navigator.clipboard.writeText(all);
  };

  return (
    <div className="space-y-10">
      {/* Form */}
      <form
        onSubmit={handleGenerate}
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
            placeholder="e.g. fitness coaching for busy moms, B2B SaaS sales, vegan recipes..."
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
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
      </form>

      {/* Output */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">
              Your 7-Day{" "}
              <span className="text-violet-400">{platform}</span> Calendar
              <span className="ml-2 text-sm font-normal text-slate-500">({tone})</span>
            </h3>
            <button
              onClick={copyAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition font-medium"
            >
              Copy all 7 posts
            </button>
          </div>

          <div className="grid gap-4">
            {posts.map((post, i) => (
              <PostCard key={post.day} post={post} platform={platform} index={i} />
            ))}
          </div>

          <p className="text-center text-slate-600 text-sm pt-2">
            Not happy with the results? Tweak your niche description and regenerate.
          </p>
        </div>
      )}
    </div>
  );
}
