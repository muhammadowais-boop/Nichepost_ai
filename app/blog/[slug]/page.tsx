import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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

/* ─── Lightweight markdown renderer ────────────────────────── */
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
        <p key={i} className="font-semibold text-white/90 my-3">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [header, , ...rows] = tableLines;
      const headers = header.split("|").filter((c) => c.trim()).map((c) => c.trim());
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-edge">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} className="text-left px-4 py-3 bg-card text-white/70 font-semibold border-b border-edge">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").filter((c) => c.trim()).map((c) => c.trim());
                return (
                  <tr key={ri} className="border-b border-edge last:border-0">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-muted">
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
    } else if (line.match(/^[①②③④⑤→]|^[-*] /)) {
      elements.push(
        <p key={i} className="text-muted text-base leading-relaxed my-1.5 pl-2">
          {line}
        </p>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-edge my-10" />);
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} className="text-muted text-base leading-relaxed my-2">
          {parts.map((part, pi) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={pi} className="text-white/90 font-semibold">
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
  Instagram:          "bg-pink-500/10 text-pink-300 border-pink-500/20",
  LinkedIn:           "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Strategy:           "bg-[#7C3AED]/10 text-[#A855F7] border-[#7C3AED]/20",
  "Content Planning": "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  "Platform Strategy":"bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <Navbar />
      <article className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors mb-8"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                CATEGORY_COLORS[post.category] ?? "bg-card text-muted border-edge"
              }`}
            >
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.date}</span>
            <span className="text-xs text-muted/30">·</span>
            <span className="text-xs text-muted">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-5">
            {post.title}
          </h1>

          <p className="text-muted text-lg leading-relaxed mb-12 pb-12 border-b border-edge">
            {post.description}
          </p>

          {/* Content */}
          <div>{renderContent(post.content)}</div>

          {/* CTA block */}
          <div className="mt-16 bg-gradient-to-br from-[#7C3AED]/10 to-[#A855F7]/5 border border-[#7C3AED]/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-muted text-sm mb-6">
              Generate your full 7-day content calendar in seconds with NichePost AI.
            </p>
            <Link
              href="/#generator"
              className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Generate My Calendar →
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="py-14 px-6 border-t border-edge">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">More from the Blog</h2>
            <div className="flex flex-col gap-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-start gap-4 bg-card border border-edge hover:border-[#7C3AED]/40 rounded-xl p-5 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-muted">{p.category} · {p.readTime}</span>
                    <h3 className="font-semibold text-sm text-white mt-1 group-hover:text-[#A855F7] transition-colors leading-snug">
                      {p.title}
                    </h3>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted/30 group-hover:text-[#7C3AED] mt-1 shrink-0 transition-colors"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
