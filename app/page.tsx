import type { Metadata } from "next";
import Link from "next/link";
import Generator from "./components/Generator";
import HomeNavbar from "./components/HomeNavbar";
import BackgroundOrbs from "./components/BackgroundOrbs";

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

/* ─── Design tokens ─────────────────────────────────────────── */
const BG     = "#0A0A0F";
const CARD   = "#12121A";
const BORDER = "#1E1E2E";
const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#A855F7";
const MUTED  = "#94A3B8";

/* ══════════════════════════════════════════════════════════════
   HERO PREVIEW CARD
══════════════════════════════════════════════════════════════ */
function HeroCard() {
  const tags = ["#morningroutine", "#productivityhacks", "#wellness", "#busymom"];
  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span
          style={{
            background: PURPLE,
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 6,
          }}
        >
          Day 1
        </span>
        <span style={{ fontSize: 12, color: MUTED }}>Instagram · Casual</span>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, margin: 0 }}>
          Mondays hit different when your morning routine is dialed in 🧠 Here&rsquo;s
          the 3-minute reset I do before checking my phone — saves my whole day.
          Try it tomorrow and tell me how it goes 👇
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                background: `${PURPLE}1a`,
                color: PURPLE_LIGHT,
                border: `1px solid ${PURPLE}33`,
                padding: "2px 8px",
                borderRadius: 4,
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: BG, position: "relative" }}>

      {/* ── Floating orb backgrounds ─────────────────────────── */}
      <BackgroundOrbs />

      {/* ── Sticky navbar (scroll-aware, client component) ───── */}
      <HomeNavbar />

      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "80px 24px 96px",
            maxWidth: 1152,
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Badge — first to fade in */}
          <div
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: `1px solid ${BORDER}`,
              background: CARD,
              color: MUTED,
              fontSize: 12,
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: 999,
              marginBottom: 32,
            }}
          >
            🚀 Powered by Advanced AI
          </div>

          {/* Headline — second */}
          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 760,
              margin: "0 0 24px",
              color: "#fff",
            }}
          >
            A Full Week of{" "}
            <br />
            {/* Shimmer sweep on the purple gradient text */}
            <span className="shimmer-text">
              Social Content
            </span>{" "}
            in 10 Seconds
          </h1>

          {/* Subtext — third */}
          <p
            className="hero-sub"
            style={{
              fontSize: 17,
              color: MUTED,
              maxWidth: 480,
              lineHeight: 1.7,
              margin: "0 0 36px",
            }}
          >
            Tell NichePost AI your niche, platform, and tone. Get a ready-to-post
            7-day content calendar — copy, captions, and hashtags included.
          </p>

          {/* CTA buttons — fourth */}
          <div
            className="hero-btns"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <Link
              href="#generator"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: PURPLE,
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 28px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: `0 8px 32px ${PURPLE}40`,
              }}
            >
              Generate My Calendar
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: `1px solid ${BORDER}`,
                color: MUTED,
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 28px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              See How It Works
            </Link>
          </div>

          {/* Trust strip — fifth */}
          <div
            className="hero-trust"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              fontSize: 12,
              color: MUTED,
              marginBottom: 56,
            }}
          >
            <span>✦ No credit card required</span>
            <span>✦ 7 posts per run</span>
            <span>✦ Any niche</span>
          </div>

          {/* Preview card — last */}
          <div className="hero-card" style={{ width: "100%" }}>
            <HeroCard />
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section
          id="how-it-works"
          style={{ padding: "96px 24px", borderTop: `1px solid ${BORDER}` }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: "0 0 12px",
                }}
              >
                How It Works
              </h2>
              <p style={{ fontSize: 15, color: MUTED, margin: 0 }}>
                From blank page to a week of content in three steps.
              </p>
            </div>

            {/* Cards get hover glow + scale via .step-card */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
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
                  className="step-card"
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 16,
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 42,
                      fontWeight: 900,
                      color: PURPLE,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {n}
                  </span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GENERATOR ────────────────────────────────────────── */}
        <section
          id="generator"
          style={{ padding: "96px 24px", borderTop: `1px solid ${BORDER}` }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: "0 0 12px",
                }}
              >
                Generate Your Calendar
              </h2>
              <p style={{ fontSize: 15, color: MUTED, margin: 0 }}>
                Three inputs. One week of posts. Ten seconds.
              </p>
            </div>
            <Generator />
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER}`,
          background: BG,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "40px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: "#fff" }}>
              NichePost AI
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: PURPLE, display: "inline-block" }} />
            </div>
            <span style={{ fontSize: 12, color: MUTED }}>A week of social content in 10 seconds.</span>
          </div>

          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[
              { label: "Blog",    href: "/blog" },
              { label: "Privacy", href: "#"     },
              { label: "Terms",   href: "#"     },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="footer-link"
                style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>
            © {new Date().getFullYear()} NichePost AI. Built with Next.js + Claude.
          </p>
        </div>
      </footer>
    </div>
  );
}
