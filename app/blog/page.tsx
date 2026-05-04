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
    description: "Actionable guides on content strategy, niche selection, and using AI to scale your social media presence.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Instagram:         "bg-pink-500/10 text-pink-300 border-pink-500/20",
  LinkedIn:          "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Strategy:          "bg-[#7C3AED]/10 text-[#A855F7] border-[#7C3AED]/20",
  "Content Planning":"bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  "Platform Strategy":"bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
};

export default function BlogPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#A855F7] mb-3 block">
            Resources
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
            The NichePost Blog
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Practical guides on content strategy, niche positioning, and using AI
            to grow your social media presence faster.
          </p>
        </div>

        {/* Post list */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-card border border-edge hover:border-[#7C3AED]/40 rounded-2xl p-7 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-[#7C3AED]/5"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    CATEGORY_COLORS[post.category] ?? "bg-[#1E1E2E] text-muted border-edge"
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-muted">{post.date}</span>
                <span className="text-xs text-muted/40">·</span>
                <span className="text-xs text-muted">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-muted text-sm leading-relaxed">
                {post.description}
              </p>

              <span className="flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] group-hover:gap-2.5 transition-all mt-1">
                Read article
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
