import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 font-bold text-sm text-white">
            NichePost AI
            <span className="w-1.5 h-1.5 rounded-full bg-purple" />
          </div>
          <p className="text-xs text-muted">A week of social content in 10 seconds.</p>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {[
            { label: "Blog",     href: "/blog" },
            { label: "Privacy",  href: "#"     },
            { label: "Terms",    href: "#"     },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs text-muted hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted">
          © {year} NichePost AI. Built with Next.js + Claude.
        </p>
      </div>
    </footer>
  );
}
