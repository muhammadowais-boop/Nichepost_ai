import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nichepost.ai"),
  title: {
    default: "NichePost AI — 7-Day Content Calendar Generator",
    template: "%s — NichePost AI",
  },
  description:
    "Generate a full week of platform-optimized social media posts for any niche in seconds. Instagram, LinkedIn, and Twitter — powered by Claude AI.",
  keywords: [
    "content calendar generator",
    "AI social media posts",
    "niche content creator",
    "Instagram content calendar",
    "LinkedIn post generator",
    "Twitter content ideas",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nichepost.ai",
    siteName: "NichePost AI",
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description: "Generate a full week of platform-optimized social media posts for any niche in seconds.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description: "Generate a full week of social media posts for any niche in seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#0A0A0F", color: "#ffffff" }}>
        {children}
      </body>
    </html>
  );
}
