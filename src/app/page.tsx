"use client";

import dynamic from "next/dynamic";
import { Topbar } from "@/components/topbar";
import { Hero } from "@/components/hero";
import { Gate } from "@/components/sections/gate";
import { Gallery } from "@/components/sections/gallery";
import TokenExplorer from "@/components/sections/token-explorer";
import { Install } from "@/components/sections/install";
import { SelfAudit } from "@/components/sections/self-audit";
import { Footer } from "@/components/footer";

const LawsReader = dynamic(() => import("@/components/sections/laws-reader"), {
  ssr: false,
  loading: () => (
    <section id="laws" className="section frame" aria-busy="true">
      <div className="sec-head">
        <p className="caps">The laws</p>
        <h2>Loading the forty files…</h2>
      </div>
    </section>
  ),
});

const WHY: Array<[string, string]> = [
  [
    "Templates copy pixels.",
    "A snippet teaches the page nothing. Tomorrow's page starts from zero, and the year's work argues with itself in a hundred small ways — a radius here, a hover there, a duration everywhere.",
  ],
  [
    "Tokens carry decisions.",
    "One hue, one space scale, one clock. The two-hundredth page agrees with the first because the decisions live in variables, not in each file's mood. Change the hue once; everything follows.",
  ],
  [
    "The gate reads the work.",
    "Taste decides, machines verify. Sixteen rules read the real files — the scales, the contrast floors, the names on the controls — and exit 2 hands the agent a reason to react.",
  ],
];

export default function Page() {
  return (
    <div className="site-shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Topbar />
      <main id="main">
        <Hero />

        <section className="section frame" aria-label="Why a system">
          <div className="compare-grid">
            {WHY.map(([title, body]) => (
              <div key={title} className="panel tight">
                <h3>{title}</h3>
                <p className="quiet">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <Gate />
        <Gallery />
        <TokenExplorer />
        <LawsReader />
        <Install />
        <SelfAudit />
      </main>
      <Footer />
    </div>
  );
}
