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
        <section style={{ position: "relative", overflow: "hidden", padding: "60px 20px 80px" }}>

          {/* Grid background */}
          <div className="hero-grid" />

          {/* ── Floating social icons (desktop only) ── */}

          {/* Facebook — top-left */}
          <div
            className="social-float social-float-1 hidden md:flex"
            style={{
              left: "7%", top: "18%",
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </div>

          {/* LinkedIn — top-right */}
          <div
            className="social-float social-float-2 hidden md:flex"
            style={{
              right: "7%", top: "12%",
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>

          {/* Instagram — bottom-left */}
          <div
            className="social-float social-float-3 hidden md:flex"
            style={{
              left: "4%", top: "58%",
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#f09433"/>
                  <stop offset="25%"  stopColor="#e6683c"/>
                  <stop offset="50%"  stopColor="#dc2743"/>
                  <stop offset="75%"  stopColor="#cc2366"/>
                  <stop offset="100%" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
              <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </div>

          {/* X / Twitter — bottom-right */}
          <div
            className="social-float social-float-4 hidden md:flex"
            style={{
              right: "4%", top: "55%",
              background: CARD,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>

          {/* ── Inner content (centred, above grid/icons) ── */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1152,
              margin: "0 auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Generated-in badge — first to fade in */}
            <div
              className="hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${BORDER}`,
                background: "rgba(124,58,237,0.08)",
                color: MUTED,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: 999,
                marginBottom: 32,
              }}
            >
              <span style={{ color: PURPLE_LIGHT }}>✦</span>
              Generated in seconds
              <span style={{ display: "inline-flex", gap: 3, marginLeft: 2 }}>
                <span className="gen-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: PURPLE_LIGHT }} />
                <span className="gen-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: PURPLE_LIGHT }} />
                <span className="gen-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: PURPLE_LIGHT }} />
              </span>
            </div>

            {/* Headline */}
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
              <span className="shimmer-text">Social Content</span>{" "}
              in 10 Seconds
            </h1>

            {/* Subtext */}
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

            {/* CTA buttons */}
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

            {/* Trust strip */}
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

            {/* Preview card */}
            <div className="hero-card" style={{ width: "100%" }}>
              <HeroCard />
            </div>
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
