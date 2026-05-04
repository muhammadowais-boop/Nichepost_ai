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
        /* Background transitions from almost-transparent → opaque as user scrolls */
        background: scrolled
          ? `${BG}f5`   /* ~96% opaque */
          : `${BG}80`,  /* ~50% opaque */
        borderBottom: scrolled
          ? `1px solid ${BORDER}`
          : "1px solid transparent",
        transition: "background 0.4s ease-in-out, border-color 0.4s ease-in-out",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          NichePost AI
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: PURPLE,
              display: "inline-block",
            }}
          />
        </Link>

        {/* Desktop nav — Features removed */}
        <nav
          className="hidden md:flex"
          style={{ gap: 32, alignItems: "center" }}
        >
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Blog",         href: "/blog"         },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="nav-link"
              style={{ fontSize: 14, color: MUTED, textDecoration: "none" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="#generator"
          className="hidden md:inline-flex btn-primary"
          style={{
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
          }}
        >
          Get Started Free
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            display: "flex",
            padding: 8,
            background: "none",
            border: "none",
            color: MUTED,
            cursor: "pointer",
          }}
          className="md:hidden"
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

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            borderTop: `1px solid ${BORDER}`,
            background: "#12121A",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          className="md:hidden"
        >
          {[
            { label: "How It Works", href: "#how-it-works" },
            { label: "Blog",         href: "/blog"         },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 14, color: MUTED, textDecoration: "none" }}
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
              background: PURPLE,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 20px",
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
