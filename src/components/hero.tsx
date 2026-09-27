"use client";

import { Aurora } from "@/components/aurora";
import { Mark } from "@/components/topbar";

const STATS: Array<[string, string]> = [
  ["85", "tokens, one hue variable"],
  ["40", "law files agents read"],
  ["16", "machine-checked rules"],
  ["0", "animation dependencies"],
];

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Aurora />
      <div className="hero-grid" aria-hidden="true" />
      <div className="frame hero-inner">
        <div className="stack loose">
          <p className="caps cluster">
            <Mark />
            Design intelligence for the agentic era
          </p>
          <h1 id="hero-title" className="display">
            The design system that audits itself.
          </h1>
          <p className="lede">
            d-pill is the discipline layer for interfaces built by anyone — or anything.
            Tokens carry the decisions, laws carry the judgment, and a sixteen-rule gate
            reads the real files and says what to fix.
          </p>
          <div className="cluster">
            <a className="btn primary" href="#gate">
              Run the gate
            </a>
            <a className="btn ghost" href="#install">
              Install the skill
            </a>
            <a className="btn ghost" href="#blocks">
              Browse the blocks
            </a>
          </div>
          <ul className="hero-stats" aria-label="The system in numbers">
            {STATS.map(([n, label]) => (
              <li key={label} className="hero-stat">
                <b>
                  <span className="num">{n}</span>
                </b>
                <span className="quiet">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
