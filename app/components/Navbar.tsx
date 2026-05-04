"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-edge bg-bg/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 font-bold text-base tracking-tight select-none">
          NichePost AI
          <span className="w-2 h-2 rounded-full bg-purple" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Features",     href: "/#how-it-works" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Blog",         href: "/blog"           },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-muted hover:text-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#generator"
          className="hidden md:inline-flex items-center gap-2 bg-purple hover:bg-[#6D28D9] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150"
        >
          Get Started Free
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-muted hover:text-white transition-colors"
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
            { label: "Features",     href: "/#how-it-works" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Blog",         href: "/blog"           },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#generator"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex justify-center bg-purple hover:bg-[#6D28D9] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      )}
    </header>
  );
}
