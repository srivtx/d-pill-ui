/** Gallery blocks: heroes. Gate-clean — see worklog Task 18-a. */

import type { BlockRecord } from "./types";

export const HERO_BLOCKS: BlockRecord[] = [
  {
    id: "framed-hero",
    name: "Framed hero",
    category: "Hero",
    tags: ["hero", "framed", "hairline", "kicker", "logos", "cta"],
    code: `<div class="blk blk-framed-hero">
  <style>
    .blk-framed-hero {
      display: flex; flex-direction: column; gap: var(--space-5);
      border: var(--border); border-radius: var(--radius-lg);
      padding: var(--space-7) var(--space-6);
    }
    .blk-framed-hero .caps { color: var(--accent); }
    .blk-framed-hero h1 { font-size: var(--text-3xl); max-width: 24ch; }
    .blk-framed-hero .ctas { display: flex; flex-wrap: wrap; gap: var(--space-3); }
    .blk-framed-hero .logos {
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
      gap: var(--space-3) var(--space-5); border-top: var(--border);
      padding-top: var(--space-4); margin-top: var(--space-1);
    }
    .blk-framed-hero .logos span {
      font-family: var(--font-display); font-size: var(--text-md);
      letter-spacing: var(--tracking-caps); color: var(--ink-muted);
    }
    @media (max-width: 720px) {
      .blk-framed-hero { padding: var(--space-5) var(--space-4); }
      .blk-framed-hero h1 { font-size: var(--text-2xl); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-framed-hero * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">The critique gate</p>
  <h1>The design system that audits itself.</h1>
  <p class="lede">Eighty-five tokens. Sixteen machine rules. The gate reads the DOM you ship and exits with the reason.</p>
  <div class="ctas">
    <a class="btn primary" href="https://github.com/srivtx/d-pill">Install the skill</a>
    <a class="btn ghost" href="https://github.com/srivtx/d-pill/tree/main/references">Read the reference</a>
  </div>
  <div class="logos">
    <span>DTCG</span><span>MCP</span><span>CI</span><span>CLI</span><span>CSS</span>
  </div>
</div>`,
  },
  {
    id: "split-hero",
    name: "Split hero",
    category: "Hero",
    tags: ["hero", "split", "two-column", "gate", "panel", "findings", "cta"],
    code: `<div class="blk blk-split-hero">
  <style>
    .blk-split-hero { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: var(--space-8); align-items: center; }
    .blk-split-hero > * { min-width: 0; }
    .blk-split-hero .pitch { display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-split-hero .caps { color: var(--accent); }
    .blk-split-hero h1 { font-size: var(--text-2xl); max-width: 18ch; }
    .blk-split-hero .ctas { display: flex; flex-wrap: wrap; gap: var(--space-3); }
    .blk-split-hero .out { display: flex; flex-direction: column; gap: var(--space-3); background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-4); }
    .blk-split-hero .out-top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); }
    .blk-split-hero .cmd { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-split-hero .exit { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ok); border: var(--border); border-color: color-mix(in oklch, var(--ok) 40%, transparent); border-radius: var(--radius-full); padding: var(--space-1) var(--space-2); }
    .blk-split-hero .f { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-split-hero .f li { display: flex; align-items: flex-start; gap: var(--space-2); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-split-hero .f i { flex: none; width: 0.5rem; height: 0.5rem; border-radius: var(--radius-full); background: var(--warn); margin-top: var(--space-1); }
    .blk-split-hero .sum { border-top: var(--border); padding-top: var(--space-2); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    @media (max-width: 720px) { .blk-split-hero { grid-template-columns: 1fr; gap: var(--space-5); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-split-hero * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="pitch">
    <p class="caps">The gate</p>
    <h1>Paste markup. Get findings.</h1>
    <p class="lede">The engine reads the rendered DOM, names the file, the line, and the rule, then hands you the fix.</p>
    <div class="ctas">
      <a class="btn primary" href="https://srivtx.github.io/d-pill/">Run the gate</a>
      <a class="btn ghost" href="https://github.com/srivtx/d-pill/blob/main/references/rules.json">See all 16 rules</a>
    </div>
  </div>
  <figure class="out">
    <div class="out-top">
      <span class="cmd">critique hero.html</span>
      <span class="exit">exit 0</span>
    </div>
    <ul class="f">
      <li><i aria-hidden="true"></i><span>12:3 radius 50% — circles are --radius-full</span></li>
      <li><i aria-hidden="true"></i><span>31:9 a literal color in background</span></li>
      <li><i aria-hidden="true"></i><span>40:2 'ease' is off the easing tokens</span></li>
    </ul>
    <figcaption class="sum">0 error(s), 3 warning(s). Strict would exit 2.</figcaption>
  </figure>
</div>`,
  },
  {
    id: "centered-hero",
    name: "Centered hero",
    category: "Hero",
    tags: ["hero", "centered", "stats", "typographic", "quiet", "cta"],
    code: `<div class="blk blk-centered-hero">
  <style>
    .blk-centered-hero { display: flex; flex-direction: column; align-items: center; gap: var(--space-5); text-align: center; }
    .blk-centered-hero .caps { color: var(--accent); }
    .blk-centered-hero h1 { font-size: var(--text-3xl); max-width: 16ch; }
    .blk-centered-hero .lede { margin-inline: auto; }
    .blk-centered-hero .stats {
      display: flex; flex-wrap: wrap; justify-content: center; width: 100%;
      gap: var(--space-3) var(--space-6); border-top: var(--border);
      border-bottom: var(--border); padding-block: var(--space-3); margin-top: var(--space-2);
    }
    .blk-centered-hero .stat { display: flex; align-items: baseline; gap: var(--space-2); }
    .blk-centered-hero .stat b { font-size: var(--text-lg); font-weight: 600; color: var(--accent); font-variant-numeric: tabular-nums; }
    .blk-centered-hero .stat span { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 720px) {
      .blk-centered-hero h1 { font-size: var(--text-2xl); }
      .blk-centered-hero .stats { gap: var(--space-2) var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-centered-hero * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Both themes. One file.</p>
  <h1>Tokens with teeth.</h1>
  <p class="lede">Every value sits on a scale. Every color wears a role. Change one variable and the whole site re-tints.</p>
  <a class="btn primary" href="https://github.com/srivtx/d-pill">Start with the tokens</a>
  <div class="stats">
    <div class="stat"><b class="num">85</b><span>tokens</span></div>
    <div class="stat"><b class="num">16</b><span>rules</span></div>
    <div class="stat"><b class="num">40</b><span>laws</span></div>
  </div>
</div>`,
  },
  {
    id: "console-hero",
    name: "Console hero",
    category: "Hero",
    tags: ["hero", "console", "terminal", "mono", "gate", "code", "findings"],
    code: `<div class="blk blk-console-hero">
  <style>
    .blk-console-hero { display: flex; flex-direction: column; gap: var(--space-5); }
    .blk-console-hero .head { display: flex; flex-direction: column; gap: var(--space-3); max-width: 44ch; }
    .blk-console-hero .caps { color: var(--accent); }
    .blk-console-hero h1 { font-size: var(--text-2xl); }
    .blk-console-hero .term { background: var(--bg-subtle); border: var(--border); border-radius: var(--radius-lg); font-family: var(--font-mono); overflow: hidden; }
    .blk-console-hero .term-top { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); border-bottom: var(--border); }
    .blk-console-hero .term-top i { width: 0.5rem; height: 0.5rem; border-radius: var(--radius-full); background: var(--line-strong); }
    .blk-console-hero .term-top span { font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-console-hero .body { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm); }
    .blk-console-hero .cmd { color: var(--ink); }
    .blk-console-hero .cmd b { color: var(--accent); font-weight: 500; }
    .blk-console-hero .row { display: flex; align-items: flex-start; gap: var(--space-2); color: var(--ink-muted); }
    .blk-console-hero .row i { flex: none; width: 0.5rem; height: 0.5rem; border-radius: var(--radius-full); background: var(--danger); margin-top: var(--space-1); }
    .blk-console-hero .row .r { color: var(--accent); }
    .blk-console-hero .sum { border-top: var(--border); padding-top: var(--space-2); color: var(--ink-muted); }
    .blk-console-hero .sum b { color: var(--danger); font-weight: 500; }
    @media (max-width: 720px) {
      .blk-console-hero .head { max-width: 100%; }
      .blk-console-hero .body { padding: var(--space-3); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-console-hero * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="head">
    <p class="caps">Machine contract</p>
    <h1>A critic in the loop.</h1>
    <p class="lede">The gate runs where the work happens — hook, MCP, or CI. Findings arrive with a fix and the law behind them.</p>
  </div>
  <figure class="term">
    <div class="term-top"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span>critique — zsh</span></div>
    <div class="body">
      <p class="cmd"><b>$</b> python3 scripts/critique.py hero.html</p>
      <p class="row"><i aria-hidden="true"></i><span>hero.html:18:9 <span class="r">[space]</span> 14px in padding is not on the scale</span></p>
      <p class="row"><i aria-hidden="true"></i><span>hero.html:24:2 <span class="r">[duration]</span> 300ms in transition is not on the scale</span></p>
      <p class="sum">1 file checked — 2 error(s), 0 warning(s); <b>exit 2</b></p>
    </div>
  </figure>
</div>`,
  },
];
