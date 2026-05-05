"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 h-16"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: scrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.55)",
        borderBottom: scrolled ? "1px solid #1E1E2E" : "1px solid transparent",
        transition: "background 0.4s ease-in-out, border-color 0.4s ease-in-out",
      }}
    >
      <div
        className="max-w-6xl mx-auto px-6 h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >

        {/* Logo — left column */}
        <Link
          href="/"
          className="nav-link no-underline"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            justifySelf: "start",
          }}
        >
          NichePost AI
          <span className="w-2 h-2 rounded-full bg-purple inline-block" />
        </Link>

        {/* Desktop links — center column, pill container */}
        <nav className="hidden md:flex nav-pill">
          {[
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Blog",         href: "/blog"           },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="nav-pill-link"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA — right column */}
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center" }}>
          <Link
            href="/#generator"
            className="hidden md:inline-flex btn-primary no-underline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#7C3AED",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile hamburger — right column on mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-muted hover:text-white transition-colors"
          style={{ justifySelf: "end", display: "flex", alignItems: "center" }}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-edge bg-card px-6 py-5 flex flex-col gap-4">
          {[
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Blog",         href: "/blog"           },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="nav-link text-sm text-muted no-underline"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#generator"
            onClick={() => setOpen(false)}
            className="mt-1 flex justify-center text-white text-sm font-semibold no-underline"
            style={{ background: "#7C3AED", padding: "10px 20px", borderRadius: 8 }}
          >
            Get Started Free
          </Link>
        </div>
      )}
    </header>
  );
}
