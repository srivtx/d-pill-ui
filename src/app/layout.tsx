import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "d-pill — the design system that audits itself",
  description:
    "d-pill is design intelligence for the agentic era: 85 tokens, 40 laws, 16 machine-checked rules, and a critique gate that runs in your browser, your hooks, your CI. One hue variable re-tints every component. Paste your HTML and watch the gate teach.",
  keywords: [
    "design system",
    "design tokens",
    "critique gate",
    "UI components",
    "agent skills",
    "Claude skill",
    "MCP",
    "accessibility",
    "OKLCH",
  ],
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "d-pill — the design system that audits itself",
    description:
      "85 tokens. 40 laws. 16 machine-checked rules. A component library where every block passes a gate you can run in the page itself.",
    type: "website",
    siteName: "d-pill",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "d-pill — the design system that audits itself" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "d-pill — the design system that audits itself",
    description:
      "85 tokens. 40 laws. 16 machine-checked rules. A component library where every block passes a gate you can run in the page itself.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1c20" },
  ],
};

const themeBootstrap = `
(function () {
  try {
    var t = localStorage.getItem("dpill-theme");
    if (t === "light" || t === "dark") {
      document.documentElement.setAttribute("data-theme", t);
    }
    var h = localStorage.getItem("dpill-hue");
    if (h && !isNaN(parseInt(h, 10))) {
      document.documentElement.style.setProperty("--hue", h);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${instrument.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
