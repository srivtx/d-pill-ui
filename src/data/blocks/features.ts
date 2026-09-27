/** Gallery blocks: features. Gate-clean — see worklog Task 18-a. */

import type { BlockRecord } from "./types";

export const FEATURE_BLOCKS: BlockRecord[] = [
  {
    id: "three-col-features",
    name: "Three column features",
    category: "Features",
    tags: ["features", "cards", "three-column", "icons", "grid"],
    code: `<div class="blk blk-three-col-features">
  <style>
    .blk-three-col-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .blk-three-col-features .card { display: flex; flex-direction: column; gap: var(--space-3); background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-4); }
    .blk-three-col-features .ic { width: var(--control-h); height: var(--control-h); display: flex; align-items: center; justify-content: center; border: var(--border); border-radius: var(--radius); background: var(--bg-subtle); color: var(--accent); }
    .blk-three-col-features .card p { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 720px) {
      .blk-three-col-features { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-three-col-features * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="card">
    <span class="ic"><svg aria-hidden="true" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/></svg></span>
    <h3>One variable</h3>
    <p>Change --hue and 85 tokens re-tint. Light and dark move in lockstep.</p>
  </div>
  <div class="card">
    <span class="ic"><svg aria-hidden="true" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg></span>
    <h3>Sixteen rules</h3>
    <p>The gate reads rendered CSS and prints file, line, and fix. No config to write.</p>
  </div>
  <div class="card">
    <span class="ic"><svg aria-hidden="true" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/></svg></span>
    <h3>Two themes</h3>
    <p>One stylesheet serves light and dark. Contrast floors are checked, not hoped for.</p>
  </div>
</div>`,
  },
  {
    id: "square-edge-features",
    name: "Square edge features",
    category: "Features",
    tags: ["features", "grid", "square", "hairline", "no-radius", "2x2"],
    code: `<div class="blk blk-square-edge-features">
  <style>
    .blk-square-edge-features { display: grid; grid-template-columns: 1fr 1fr; border: var(--border); background: var(--surface); }
    .blk-square-edge-features .cell { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); }
    .blk-square-edge-features .cell:nth-child(2), .blk-square-edge-features .cell:nth-child(4) { border-left: var(--border); }
    .blk-square-edge-features .cell:nth-child(3), .blk-square-edge-features .cell:nth-child(4) { border-top: var(--border); }
    .blk-square-edge-features .ix { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); }
    .blk-square-edge-features .cell p { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 720px) {
      .blk-square-edge-features { grid-template-columns: 1fr; }
      .blk-square-edge-features .cell { border-left: 0; border-top: var(--border); }
      .blk-square-edge-features .cell:first-child { border-top: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-square-edge-features * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="cell">
    <span class="ix">01</span>
    <h3>Hairlines only</h3>
    <p>Every edge is 1px. Emphasis comes from color and space, never thickness.</p>
  </div>
  <div class="cell">
    <span class="ix">02</span>
    <h3>Scales, not values</h3>
    <p>Space, type, radius, duration — a named ramp for each. Off-scale does not ship.</p>
  </div>
  <div class="cell">
    <span class="ix">03</span>
    <h3>Roles, not hex</h3>
    <p>Fifteen color jobs and one hue variable. No literal survives review.</p>
  </div>
  <div class="cell">
    <span class="ix">04</span>
    <h3>The gate decides</h3>
    <p>Taste arguments end at the exit code. Zero passes. Anything else is a finding.</p>
  </div>
</div>`,
  },
  {
    id: "bento-grid",
    name: "Bento grid",
    category: "Features",
    tags: ["features", "bento", "asymmetric", "stat", "chart", "quote", "list"],
    code: `<div class="blk blk-bento-grid">
  <style>
    .blk-bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
    .blk-bento-grid .cell { display: flex; flex-direction: column; gap: var(--space-3); border: var(--border); border-radius: var(--radius-lg); background: var(--surface); padding: var(--space-4); min-width: 0; }
    .blk-bento-grid .tall { grid-row: span 2; }
    .blk-bento-grid .wide { grid-column: span 2; }
    .blk-bento-grid .n { font-size: var(--text-2xl); line-height: var(--leading-display); color: var(--accent); font-variant-numeric: tabular-nums; }
    .blk-bento-grid blockquote { font-size: var(--text-lg); max-width: 34ch; }
    .blk-bento-grid .bars { display: flex; align-items: flex-end; gap: var(--space-2); height: var(--space-6); border-bottom: var(--border); }
    .blk-bento-grid .bars i { flex: 1; background: var(--accent); border-radius: var(--radius-sm); }
    .blk-bento-grid .bars i:nth-child(1) { height: var(--space-1); }
    .blk-bento-grid .bars i:nth-child(2) { height: var(--space-2); }
    .blk-bento-grid .bars i:nth-child(3) { height: var(--space-3); }
    .blk-bento-grid .bars i:nth-child(4) { height: var(--space-4); }
    .blk-bento-grid .bars i:nth-child(5) { height: var(--space-5); }
    .blk-bento-grid .bars i:nth-child(6) { height: var(--space-6); background: var(--line); }
    .blk-bento-grid .durs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-1); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-bento-grid .durs b { color: var(--ink); font-weight: 500; }
    @media (max-width: 720px) {
      .blk-bento-grid { grid-template-columns: 1fr; }
      .blk-bento-grid .tall, .blk-bento-grid .wide { grid-column: auto; grid-row: auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bento-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="cell tall">
    <p class="caps">Drift</p>
    <span class="n num">0</span>
    <p class="quiet">errors on the page you are reading. The gate ran first.</p>
  </div>
  <div class="cell wide">
    <blockquote>The values come from a file the gate reads. Drift is a build failure, not a debate.</blockquote>
    <p class="quiet">— references/tokens.json, the single source</p>
  </div>
  <div class="cell">
    <p class="caps">Space scale</p>
    <div class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <p class="quiet">4 to 32px shown. The ramp runs to 128.</p>
  </div>
  <div class="cell">
    <p class="caps">Durations</p>
    <ul class="durs">
      <li><b>--dur-1</b> 120ms</li>
      <li><b>--dur-2</b> 180ms</li>
      <li><b>--dur-3</b> 240ms</li>
    </ul>
  </div>
</div>`,
  },
  {
    id: "feature-rows",
    name: "Feature rows",
    category: "Features",
    tags: ["features", "rows", "list", "links", "hairline", "index"],
    code: `<div class="blk blk-feature-rows">
  <style>
    .blk-feature-rows ul { list-style: none; margin: 0; padding: 0; }
    .blk-feature-rows li { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto; gap: var(--space-4); align-items: baseline; padding-block: var(--space-4); border-top: var(--border); }
    .blk-feature-rows li:last-child { border-bottom: var(--border); }
    .blk-feature-rows li p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-feature-rows a { color: var(--accent); font-size: var(--text-sm); text-decoration: underline; text-decoration-thickness: 1px; transition: color var(--dur-1) var(--ease-out); }
    .blk-feature-rows a:hover { color: var(--ink); }
    .blk-feature-rows a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) {
      .blk-feature-rows li { grid-template-columns: 1fr; gap: var(--space-2); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-feature-rows * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <ul>
    <li>
      <h3>The token file</h3>
      <p>One JSON export is the source of truth. The gate reads it, so the docs cannot lie.</p>
      <a href="https://github.com/srivtx/d-pill/blob/main/references/tokens.json">tokens.json</a>
    </li>
    <li>
      <h3>The rules</h3>
      <p>Sixteen checks, each with a fix and a reference attached. Findings teach.</p>
      <a href="https://github.com/srivtx/d-pill/blob/main/references/rules.json">rules.json</a>
    </li>
    <li>
      <h3>The contract</h3>
      <p>Exit 0 is clean. Exit 2 is findings. Exit 1 is your invocation. Hooks and CI speak it natively.</p>
      <a href="https://github.com/srivtx/d-pill/blob/main/references/machines.md">machines.md</a>
    </li>
    <li>
      <h3>The proof</h3>
      <p>This page audits its own DOM. The number in the corner is live, not a promise.</p>
      <a href="https://srivtx.github.io/d-pill/">the demo</a>
    </li>
  </ul>
</div>`,
  },
  {
    id: "stat-band",
    name: "Stat band",
    category: "Features",
    tags: ["features", "stats", "band", "numbers", "contrast", "tokens"],
    code: `<div class="blk blk-stat-band">
  <style>
    .blk-stat-band { display: grid; gap: var(--space-4); }
    .blk-stat-band .band {
      display: grid; grid-template-columns: repeat(3, 1fr);
      border: var(--border); border-radius: var(--radius-lg); background: var(--surface);
    }
    .blk-stat-band .cell { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-stat-band .cell + .cell { border-left: var(--border); }
    .blk-stat-band .n { font-size: var(--text-2xl); line-height: var(--leading-display); color: var(--accent); font-variant-numeric: tabular-nums; }
    .blk-stat-band .l { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-stat-band a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; }
    .blk-stat-band a:hover { color: var(--ink); }
    .blk-stat-band a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) {
      .blk-stat-band .band { grid-template-columns: 1fr; }
      .blk-stat-band .cell + .cell { border-left: 0; border-top: var(--border); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-stat-band * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Token math</p>
  <div class="band">
    <div class="cell"><span class="n num">1</span><span class="l">variable re-tints 85 tokens</span></div>
    <div class="cell"><span class="n num">4.5:1</span><span class="l">the floor the gate enforces on text</span></div>
    <div class="cell"><span class="n num">3</span><span class="l">durations, that is the whole scale</span></div>
  </div>
  <p class="quiet">The numbers are the product. <a href="https://github.com/srivtx/d-pill">Count them in the source</a>.</p>
</div>`,
  },
];
