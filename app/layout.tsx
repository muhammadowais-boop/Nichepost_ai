import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "AI content marketing",
    "social media automation",
  ],
  authors: [{ name: "NichePost AI" }],
  creator: "NichePost AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nichepost.ai",
    siteName: "NichePost AI",
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description:
      "Generate a full week of platform-optimized social media posts for any niche in seconds. Powered by Claude AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NichePost AI — 7-Day Content Calendar Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NichePost AI — 7-Day Content Calendar Generator",
    description:
      "Generate a full week of social media posts for any niche in seconds. Powered by Claude AI.",
    images: ["/og-image.png"],
    creator: "@nichepostai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}
