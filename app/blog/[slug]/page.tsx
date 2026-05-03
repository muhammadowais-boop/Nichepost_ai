import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "../data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — NichePost AI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nichepost.ai/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["NichePost AI"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderContent(markdown: string) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-12 mb-4 text-white">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={i} className="font-semibold text-slate-200 my-3">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("| ")) {
      // Collect table rows
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [header, , ...rows] = tableLines;
      const headers = header.split("|").filter((c) => c.trim()).map((c) => c.trim());
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-4 py-2 bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").filter((c) => c.trim()).map((c) => c.trim());
                return (
                  <tr key={ri} className="border-b border-slate-800">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2 text-slate-400 border border-slate-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.match(/^[①②③④⑤]|^→|^[-*] /)) {
      // Bullet-style lines
      elements.push(
        <p key={i} className="text-slate-300 text-base leading-relaxed my-1.5 pl-2">
          {line}
        </p>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-slate-800 my-10" />);
    } else {
      // Inline bold handling
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} className="text-slate-300 text-base leading-relaxed my-2">
          {parts.map((part, pi) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={pi} className="text-slate-100 font-semibold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    i++;
  }

  return elements;
}

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "Content Planning": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20",
  "Platform Strategy": "bg-blue-500/15 text-blue-300 border-blue-500/20",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== slug);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-violet-400">Niche</span>Post AI
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← Blog
          </Link>
          <Link
            href="/#generator"
            className="text-sm bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2 rounded-full font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      <article className="py-16 px-6 flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
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

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-12 pb-12 border-b border-slate-800">
            {post.description}
          </p>

          {/* Content */}
          <div className="prose-nichepost">
            {renderContent(post.content)}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to put this into practice?</h3>
            <p className="text-slate-400 text-sm mb-6">
              Generate your full 7-day content calendar in seconds with NichePost AI.
            </p>
            <Link
              href="/#generator"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors px-6 py-3 rounded-full font-semibold text-sm"
            >
              Generate My Calendar →
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 px-6 border-t border-slate-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-8">More from the Blog</h2>
            <div className="flex flex-col gap-4">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-start gap-4 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-500">{p.category} · {p.readTime}</span>
                    <h3 className="font-semibold text-sm mt-1 group-hover:text-violet-300 transition-colors leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-violet-400 mt-1 shrink-0 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} NichePost AI. Built with Next.js + Claude.
      </footer>
    </main>
  );
}
