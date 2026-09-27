/* Task 18-c — content gallery blocks: pricing, testimonial row, CTA band, logo cloud. */
import type { BlockRecord } from "./types";

export const CONTENT_BLOCKS: BlockRecord[] = [
  {
    id: "pricing-table",
    name: "Pricing",
    category: "Content",
    tags: ["pricing", "tiers", "cards", "features", "cta"],
    code: `<div class="blk blk-pricing-table">
  <style>
    .blk-pricing-table { display: grid; gap: var(--space-4); }
    .blk-pricing-table .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .blk-pricing-table .tier { background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); transition: border-color var(--dur-1) var(--ease-out); }
    .blk-pricing-table .tier.chosen { background: var(--accent-soft); border-color: color-mix(in oklch, var(--accent) 35%, transparent); }
    .blk-pricing-table .tier:hover { border-color: var(--line-strong); }
    .blk-pricing-table .tag { color: var(--accent); }
    .blk-pricing-table .tname { font-size: var(--text-md); font-weight: 600; }
    .blk-pricing-table .price { display: flex; align-items: baseline; gap: var(--space-1); }
    .blk-pricing-table .price .n { font-size: var(--text-2xl); font-weight: 600; line-height: var(--leading-display); letter-spacing: var(--tracking-display); }
    .blk-pricing-table .feat { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-pricing-table .feat li { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); line-height: var(--leading-ui); }
    .blk-pricing-table .feat .dot { flex: none; width: var(--space-2); height: var(--space-2); border-radius: var(--radius-full); background: var(--ok); }
    .blk-pricing-table .tier .btn { margin-block-start: auto; width: 100%; }
    .blk-pricing-table a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) { .blk-pricing-table .tiers { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-pricing-table * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="tiers">
    <div class="tier">
      <p class="tname">Open</p>
      <p class="price"><span class="n num">$0</span><span class="quiet">/mo</span></p>
      <ul class="feat">
        <li><span class="dot" aria-hidden="true"></span><span>85 tokens, one hue variable</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>16 machine rules, zero taste calls</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>CLI gate with exit codes</span></li>
      </ul>
      <a class="btn ghost" href="https://github.com/srivtx/d-pill">Clone the repo</a>
    </div>
    <div class="tier chosen">
      <p class="caps tag">Chosen</p>
      <p class="tname">Gate</p>
      <p class="price"><span class="n num">$12</span><span class="quiet">/mo</span></p>
      <ul class="feat">
        <li><span class="dot" aria-hidden="true"></span><span>Everything in Open</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>Private rule packs, data not prose</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>CI enforcement on every push</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>Drift report, findings that teach</span></li>
      </ul>
      <a class="btn primary" href="https://github.com/srivtx/d-pill">Start the gate</a>
    </div>
    <div class="tier">
      <p class="tname">Studio</p>
      <p class="price"><span class="n num">$49</span><span class="quiet">/mo</span></p>
      <ul class="feat">
        <li><span class="dot" aria-hidden="true"></span><span>Everything in Gate</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>Seats without math</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>DTCG export, kept in sync</span></li>
        <li><span class="dot" aria-hidden="true"></span><span>Fix queue, humans on it</span></li>
      </ul>
      <a class="btn ghost" href="https://github.com/srivtx/d-pill">Open an issue</a>
    </div>
  </div>
  <p class="quiet">One honest line: the /mo buys the hosted gate and runner minutes. The tokens, the laws, the engine — one payment of zero. MIT, forever.</p>
</div>`,
  },
  {
    id: "testimonial-row",
    name: "Testimonial row",
    category: "Content",
    tags: ["testimonial", "quotes", "attribution", "social proof", "cards"],
    code: `<div class="blk blk-testimonial-row">
  <style>
    .blk-testimonial-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .blk-testimonial-row .t { background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-testimonial-row blockquote { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); line-height: 1.3; letter-spacing: var(--tracking-display); max-width: 24ch; }
    .blk-testimonial-row .attr { margin-block-start: auto; border-block-start: var(--border); padding-block-start: var(--space-4); display: flex; align-items: center; gap: var(--space-3); }
    .blk-testimonial-row .av { flex: none; width: var(--control-h); height: var(--control-h); border-radius: var(--radius-full); border: var(--border); background: var(--bg-subtle); color: var(--ink-muted); display: flex; align-items: center; justify-content: center; font-size: var(--text-xs); font-weight: 600; letter-spacing: var(--tracking-caps); }
    .blk-testimonial-row .who { display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-testimonial-row .who b { font-size: var(--text-sm); font-weight: 600; }
    @media (max-width: 720px) { .blk-testimonial-row { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-testimonial-row * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <figure class="t">
    <blockquote>“The gate rejected our first hero. It was right.”</blockquote>
    <figcaption class="attr">
      <span class="av" aria-hidden="true">PL</span>
      <span class="who"><b>Design systems lead</b><span class="quiet">Platform team, payments</span></span>
    </figcaption>
  </figure>
  <figure class="t">
    <blockquote>“Tokens stopped being a wiki page. Now they are a contract.”</blockquote>
    <figcaption class="attr">
      <span class="av" aria-hidden="true">DT</span>
      <span class="who"><b>Staff engineer</b><span class="quiet">Docs tooling, remote</span></span>
    </figcaption>
  </figure>
  <figure class="t">
    <blockquote>“No taste debates. Exit codes. We ship.”</blockquote>
    <figcaption class="attr">
      <span class="av" aria-hidden="true">SD</span>
      <span class="who"><b>Solo designer</b><span class="quiet">Three products, one hue</span></span>
    </figcaption>
  </figure>
</div>`,
  },
  {
    id: "cta-band",
    name: "CTA band",
    category: "Content",
    tags: ["cta", "band", "ink", "inverted", "conversion"],
    code: `<div class="blk blk-cta-band">
  <style>
    .blk-cta-band .band {
      background: var(--ink); color: var(--bg); border-radius: var(--radius-lg);
      padding: var(--space-7) var(--space-6);
      display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-5);
    }
    .blk-cta-band .head { flex: 1 1 18rem; min-width: 0; display: flex; flex-direction: column; gap: var(--space-3); }
    .blk-cta-band .line {
      margin: 0; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 500;
      line-height: var(--leading-display); letter-spacing: var(--tracking-display);
      max-width: 18ch; text-wrap: balance;
    }
    .blk-cta-band .sub {
      margin: 0; color: color-mix(in oklch, var(--bg) 72%, var(--ink));
      font-size: var(--text-sm); line-height: var(--leading-ui); max-width: 40ch;
    }
    .blk-cta-band .btn { margin-inline-start: auto; }
    .blk-cta-band .btn:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) { .blk-cta-band .band { padding: var(--space-6) var(--space-5); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-cta-band * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="band">
    <div class="head">
      <h2 class="line">Put the gate in the loop.</h2>
      <p class="sub">One skill. Sixteen machine rules. Every page leaves with an exit code.</p>
    </div>
    <a class="btn primary" href="https://github.com/srivtx/d-pill">Install the skill</a>
  </div>
</div>`,
  },
  {
    id: "logo-cloud",
    name: "Logo cloud",
    category: "Content",
    tags: ["logos", "wordmarks", "strip", "social proof"],
    code: `<div class="blk blk-logo-cloud">
  <style>
    .blk-logo-cloud { display: grid; gap: var(--space-3); }
    .blk-logo-cloud .strip { border-block: var(--border); padding-block: var(--space-4); display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-logo-cloud .row { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-4) var(--space-6); color: var(--ink-muted); }
    .blk-logo-cloud .row span { line-height: 1; white-space: nowrap; font-size: var(--text-md); }
    .blk-logo-cloud .w1 { font-weight: 600; letter-spacing: -0.03em; }
    .blk-logo-cloud .w2 { font-size: var(--text-sm); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; }
    .blk-logo-cloud .w3 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; letter-spacing: -0.01em; }
    .blk-logo-cloud .w4 { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
    .blk-logo-cloud .w5 { font-weight: 400; letter-spacing: 0.1em; }
    .blk-logo-cloud .w6 { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 600; letter-spacing: 0.04em; }
    @media (prefers-reduced-motion: reduce) {
      .blk-logo-cloud * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="strip">
    <p class="caps">Shipped under the gate</p>
    <div class="row">
      <span class="w1">molehill</span>
      <span class="w2">fernwork</span>
      <span class="w3">Halfmoon</span>
      <span class="w4">bitlaw</span>
      <span class="w5">paperside</span>
      <span class="w6">huetide</span>
    </div>
  </div>
</div>`,
  },
];
