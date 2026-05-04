import type { Metadata } from "next";
import Link from "next/link";
import Generator from "./components/Generator";

export const metadata: Metadata = {
  title: "NichePost AI — 7-Day Content Calendar Generator",
  description:
    "Tell NichePost AI your niche, platform, and tone. Get a ready-to-post 7-day content calendar — copy, captions, and hashtags included.",
  openGraph: {
    title: "NichePost AI — 7-Day Content Calendar Generator",
    url: "https://nichepost.ai",
    type: "website",
  },
};

/* ─── Static hero preview card ─────────────────────────────── */
function HeroCard() {
  return (
    <div className="w-full max-w-lg mx-auto bg-card border border-edge rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
      {/* Card header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-edge">
        <span className="bg-purple text-white text-xs font-bold px-2.5 py-1 rounded-md">
          Day 1
        </span>
        <span className="text-xs text-muted">Instagram · Casual</span>
      </div>

      {/* Card body */}
      <div className="px-4 py-4 space-y-3">
        <p className="text-sm text-white/80 leading-relaxed">
          Mondays hit different when your morning routine is dialed in 🧠 Here&rsquo;s
          the 3-minute reset I do before checking my phone — saves my whole day.
          Try it tomorrow and tell me how it goes 👇
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["#morningroutine", "#productivityhacks", "#wellness", "#busymom"].map((t) => (
            <span
              key={t}
              className="text-xs bg-[#7C3AED]/10 text-purple-lt border border-[#7C3AED]/20 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-24 max-w-6xl mx-auto w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-edge bg-card text-muted text-xs font-medium px-3.5 py-1.5 rounded-full mb-8">
          🚀 Powered by Advanced AI
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-4xl">
          A Full Week of
          <br />
          <span className="bg-gradient-to-r from-purple to-purple-lt bg-clip-text text-transparent">
            Social Content
          </span>{" "}
          in 10 Seconds
        </h1>

        {/* Sub */}
        <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
          Tell NichePost AI your niche, platform, and tone. Get a ready-to-post
          7-day content calendar — copy, captions, and hashtags included.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#generator"
            className="inline-flex items-center gap-2 bg-purple hover:bg-[#6D28D9] text-white font-semibold px-7 py-3 rounded-lg text-sm transition-colors shadow-lg shadow-purple/20"
          >
            Generate My Calendar
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 border border-edge hover:border-muted text-muted hover:text-white font-semibold px-7 py-3 rounded-lg text-sm transition-colors"
          >
            See How It Works
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-muted">
          <span>✦ No credit card required</span>
          <span>✦ 7 posts per run</span>
          <span>✦ Any niche</span>
        </div>

        {/* Floating preview card */}
        <div className="mt-14 w-full">
          <HeroCard />
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 border-t border-edge">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold tracking-tight">How It Works</h2>
            <p className="mt-3 text-muted text-base">
              From blank page to a week of content in three steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Describe Your Niche",
                desc: "Enter your business, audience, or topic — the more specific, the better.",
              },
              {
                n: "02",
                title: "Choose Platform & Tone",
                desc: "Instagram, LinkedIn, or Twitter. Professional, casual, or humorous voice.",
              },
              {
                n: "03",
                title: "Get 7 Ready Posts",
                desc: "Copy, hashtags, and a cover image — ready to paste into your scheduler.",
              },
            ].map(({ n, title, desc }) => (
              <div
                key={n}
                className="bg-card border border-edge rounded-2xl p-7 flex flex-col gap-3"
              >
                <span className="text-4xl font-black text-purple leading-none">{n}</span>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Generator ────────────────────────────────────────── */}
      <section id="generator" className="py-24 px-6 border-t border-edge">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight">Generate Your Calendar</h2>
            <p className="mt-3 text-muted text-base">
              Three inputs. One week of posts. Ten seconds.
            </p>
          </div>
          <Generator />
        </div>
      </section>
    </>
  );
}
