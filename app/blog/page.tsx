import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./data";

export const metadata: Metadata = {
  title: "Blog — NichePost AI",
  description:
    "Actionable guides on content strategy, niche selection, platform growth, and using AI to scale your social media presence.",
  openGraph: {
    title: "Blog — NichePost AI",
    description:
      "Actionable guides on content strategy, niche selection, platform growth, and using AI to scale your social media presence.",
    url: "https://nichepost.ai/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — NichePost AI",
    description:
      "Actionable guides on content strategy, niche selection, and using AI to scale your social media presence.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "Content Planning": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20",
  "Platform Strategy": "bg-blue-500/15 text-blue-300 border-blue-500/20",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-violet-400">Niche</span>Post AI
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-violet-400 font-medium">
            Blog
          </Link>
          <Link
            href="/#generator"
            className="text-sm bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2 rounded-full font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      <section className="py-20 px-6 flex-1">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 block">
              Resources
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              The NichePost Blog
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Practical guides on content strategy, niche positioning, and
              using AI to grow your social media presence faster.
            </p>
          </div>

          {/* Posts */}
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-7 flex flex-col gap-3 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      CATEGORY_COLORS[post.category] ??
                      "bg-slate-700 text-slate-300 border-slate-600"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">{post.date}</span>
                  <span className="text-xs text-slate-600">·</span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {post.description}
                </p>

                <span className="text-violet-400 text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all mt-1">
                  Read article
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} NichePost AI. Built with Next.js + Claude.
      </footer>
    </main>
  );
}
