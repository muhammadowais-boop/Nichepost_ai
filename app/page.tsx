import type { Metadata } from "next";
import Link from "next/link";
import Generator from "./components/Generator";
import DemoCalendar from "./components/DemoCalendar";

export const metadata: Metadata = {
  title: "NichePost AI — 7-Day Content Calendar Generator",
  description:
    "Tell NichePost AI your niche, platform, and tone. Get a ready-to-post 7-day content calendar — copy, captions, and hashtags included.",
  openGraph: {
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description:
      "Get a ready-to-post 7-day content calendar for any niche in seconds. Instagram, LinkedIn, Twitter — powered by Claude AI.",
    url: "https://nichepost.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description:
      "Get a ready-to-post 7-day content calendar for any niche in seconds.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">
          <span className="text-violet-400">Niche</span>Post AI
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/blog"
            className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
          >
            Blog
          </Link>
          <Link
            href="#generator"
            className="text-sm bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2 rounded-full font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-700/40 text-violet-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Claude AI
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight max-w-3xl">
          A Full Week of{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Social Content
          </span>
          <br />
          in 10 Seconds
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
          Tell NichePost AI your niche, platform, and tone. Get a ready-to-post
          7-day content calendar — copy, captions, and hashtags included.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="#generator"
            className="bg-violet-600 hover:bg-violet-500 transition-colors px-7 py-3.5 rounded-full font-semibold text-base shadow-lg shadow-violet-900/40"
          >
            Generate My Calendar →
          </Link>
          <Link
            href="#how-it-works"
            className="border border-slate-700 hover:border-slate-500 transition-colors px-7 py-3.5 rounded-full font-semibold text-base text-slate-300"
          >
            See How It Works
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
          <span>✦ No credit card required</span>
          <span>✦ 7 posts per run</span>
          <span>✦ Any niche</span>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-14">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Niche",
                desc: "Describe your business, audience, or topic in a single phrase.",
              },
              {
                step: "02",
                title: "Pick Platform & Tone",
                desc: "Choose Instagram, LinkedIn, or Twitter and your preferred voice.",
              },
              {
                step: "03",
                title: "Get Your Calendar",
                desc: "Receive 7 polished posts with hashtags ready to copy and paste.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
              >
                <div className="text-violet-400 font-mono text-sm font-bold mb-3">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Calendar — example output */}
      <DemoCalendar />

      {/* Generator */}
      <section
        id="generator"
        className="py-20 px-6 border-t border-slate-800 flex-1"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Generate Your Calendar
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Fill in the details below and your 7-day plan will appear instantly.
          </p>
          <Generator />
        </div>
      </section>

      {/* Blog teaser */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Learn the Strategy Behind the Posts</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm">
            Guides on niche selection, content calendars, and platform growth — so your
            AI-generated posts land with maximum impact.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 transition-colors px-6 py-3 rounded-full font-semibold text-sm text-slate-300"
          >
            Read the Blog →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
          <span>
            © {new Date().getFullYear()}{" "}
            <span className="text-violet-500">Niche</span>Post AI
          </span>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-slate-400 transition-colors">
              Blog
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
