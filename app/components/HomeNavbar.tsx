"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const BG     = "#0A0A0F";
  const BORDER = "#1E1E2E";
  const PURPLE = "#7C3AED";
  const MUTED  = "#94A3B8";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: scrolled ? `${BG}f5` : `${BG}80`,
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "background 0.4s ease-in-out, border-color 0.4s ease-in-out",
      }}
    >
      {/* ── Inner row: flex on all sizes, logo left · nav center · right slot ── */}
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 15,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          NichePost AI
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: PURPLE, display: "inline-block" }} />
        </Link>

        {/* Center nav pill — desktop only */}
        <nav className="hidden md:flex nav-pill" style={{ flex: "0 0 auto" }}>
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Blog",         href: "/blog"         },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="nav-pill-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right slot */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Desktop CTA */}
          <Link
            href="#generator"
            className="hidden md:inline-flex btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: PURPLE,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow: `0 4px 24px ${PURPLE}40`,
              whiteSpace: "nowrap",
            }}
          >
            Get Started Free
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              background: "none",
              border: "none",
              color: MUTED,
              cursor: "pointer",
            }}
          >
            {open ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${BORDER}`,
            background: "#12121A",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Blog",         href: "/blog"         },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 15, color: MUTED, textDecoration: "none" }}
              className="nav-link"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#generator"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: PURPLE,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              padding: "12px 20px",
              borderRadius: 8,
              textDecoration: "none",
              marginTop: 4,
            }}
          >
            Get Started Free
          </Link>
        </div>
      )}
    </header>
  );
}
