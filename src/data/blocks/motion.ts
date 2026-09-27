/** Gallery blocks: motion & effects. Gate-clean — see worklog Task 19-b. */

import type { BlockRecord } from "./types";

export const MOTION_BLOCKS: BlockRecord[] = [
  {
    id: "fx-word-reveal",
    name: "Word reveal headline",
    category: "Motion & effects",
    tags: ["motion", "headline", "stagger", "entrance", "blur", "keyframes"],
    code: `<div class="blk blk-fx-word-reveal">
  <style>
    .blk-fx-word-reveal { display: grid; gap: var(--space-4); }
    .blk-fx-word-reveal h2 {
      display: flex; flex-wrap: wrap; gap: var(--space-2);
      font-size: var(--text-2xl); line-height: var(--leading-display); letter-spacing: var(--tracking-display);
    }
    .blk-fx-word-reveal .w {
      display: inline-block;
      animation: blk-fx-word-reveal-rise var(--dur-3) var(--ease-out) both;
    }
    .blk-fx-word-reveal .w:nth-child(2) { animation-delay: calc(var(--dur-2) * 1); }
    .blk-fx-word-reveal .w:nth-child(3) { animation-delay: calc(var(--dur-2) * 2); }
    .blk-fx-word-reveal .w:nth-child(4) { animation-delay: calc(var(--dur-2) * 3); }
    @keyframes blk-fx-word-reveal-rise {
      from { opacity: 0; transform: translateY(var(--space-5)); filter: blur(var(--space-1)); }
      to { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-word-reveal *, .blk-fx-word-reveal *::before, .blk-fx-word-reveal *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <h2>
    <span class="w">Zero</span>
    <span class="w">dependencies,</span>
    <span class="w">pure</span>
    <span class="w">motion.</span>
  </h2>
  <p class="quiet">Four spans, one keyframe, delays counted in 180ms multiples. Every value is a token the gate can read.</p>
</div>`,
  },
  {
    id: "fx-shimmer-text",
    name: "Shimmer text sweep",
    category: "Motion & effects",
    tags: ["motion", "text", "shimmer", "gradient", "background-clip", "loop"],
    code: `<div class="blk blk-fx-shimmer-text">
  <style>
    .blk-fx-shimmer-text { display: grid; gap: var(--space-3); }
    .blk-fx-shimmer-text h2 {
      margin: 0;
      font-size: var(--text-2xl); line-height: var(--leading-display); letter-spacing: var(--tracking-display);
      background: linear-gradient(90deg, var(--ink) 0 65%, var(--accent) 75%, var(--ink) 85% 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: blk-fx-shimmer-text-sweep calc(var(--dur-3) * 12) linear infinite;
    }
    @keyframes blk-fx-shimmer-text-sweep {
      from { background-position: 200% 0; }
      to { background-position: 0% 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-shimmer-text *, .blk-fx-shimmer-text *::before, .blk-fx-shimmer-text *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <h2>Motion you can audit</h2>
  <p class="quiet">Ink at rest, one accent pass on a loop. The highlight is a gradient clipped to the glyphs — background-position does the sweeping, nothing else moves.</p>
</div>`,
  },
  {
    id: "fx-typewriter",
    name: "Typewriter terminal line",
    category: "Motion & effects",
    tags: ["motion", "terminal", "typewriter", "steps", "caret", "mono"],
    code: `<div class="blk blk-fx-typewriter">
  <style>
    .blk-fx-typewriter .term { display: grid; gap: var(--space-2); font-family: var(--font-mono); font-size: var(--text-md); border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); padding: var(--space-4); }
    .blk-fx-typewriter .row { display: flex; align-items: center; gap: var(--space-2); }
    .blk-fx-typewriter .pr { color: var(--ink-muted); flex: none; }
    .blk-fx-typewriter .txt { overflow: hidden; white-space: nowrap; animation: blk-fx-typewriter-type calc(var(--dur-3) * 7) steps(18) both; }
    .blk-fx-typewriter .caret { flex: none; width: var(--space-2); height: var(--text-md); background: var(--accent); animation: blk-fx-typewriter-blink var(--dur-3) steps(1) infinite; }
    .blk-fx-typewriter .out { margin: 0; color: var(--ink-muted); animation: blk-fx-typewriter-fade var(--dur-3) var(--ease-out) calc(var(--dur-3) * 8) both; }
    @keyframes blk-fx-typewriter-type { from { width: 0; } to { width: 18ch; } }
    @keyframes blk-fx-typewriter-blink { 50% { opacity: 0; } }
    @keyframes blk-fx-typewriter-fade { from { opacity: 0; } to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-typewriter *, .blk-fx-typewriter *::before, .blk-fx-typewriter *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <div class="term">
    <div class="row">
      <span class="pr" aria-hidden="true">$</span>
      <span class="txt">critique page.html</span>
      <span class="caret" aria-hidden="true"></span>
    </div>
    <p class="out">0 error(s), 0 warning(s) — exit 0</p>
  </div>
</div>`,
  },
  {
    id: "fx-odometer",
    name: "Odometer digit roll",
    category: "Motion & effects",
    tags: ["motion", "counter", "digits", "tabular-nums", "steps", "loop"],
    code: `<div class="blk blk-fx-odometer">
  <style>
    .blk-fx-odometer .readout { display: flex; align-items: center; gap: var(--space-4); border: var(--border); border-radius: var(--radius-lg); background: var(--surface); padding: var(--space-4) var(--space-5); width: fit-content; }
    .blk-fx-odometer .win { height: var(--space-7); overflow: hidden; }
    .blk-fx-odometer .col { display: flex; flex-direction: column; animation: blk-fx-odometer-roll calc(var(--dur-3) * 10) steps(10) infinite; }
    .blk-fx-odometer .col span { display: grid; place-items: center; height: var(--space-7); font-size: var(--text-2xl); line-height: var(--leading-display); color: var(--accent); font-variant-numeric: tabular-nums; }
    .blk-fx-odometer .meta { display: grid; gap: var(--space-1); }
    .blk-fx-odometer .meta p { margin: 0; max-width: 36ch; }
    @keyframes blk-fx-odometer-roll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-odometer *, .blk-fx-odometer *::before, .blk-fx-odometer *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <div class="readout">
    <div class="win" aria-hidden="true">
      <div class="col"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
    </div>
    <div class="meta">
      <p class="caps">Live readout</p>
      <p class="quiet">The digit column rolls on translateY and steps — tabular-nums keeps the frame flush. Reduced motion parks it on one number.</p>
    </div>
  </div>
</div>`,
  },
  {
    id: "fx-marquee",
    name: "Marquee tag strip",
    category: "Motion & effects",
    tags: ["motion", "marquee", "tags", "loop", "pause", "mask"],
    code: `<div class="blk blk-fx-marquee">
  <style>
    .blk-fx-marquee { display: grid; gap: var(--space-3); }
    .blk-fx-marquee .strip { overflow: hidden; border-block: var(--border); padding-block: var(--space-3); -webkit-mask-image: linear-gradient(to right, transparent, var(--ink) 10%, var(--ink) 90%, transparent); mask-image: linear-gradient(to right, transparent, var(--ink) 10%, var(--ink) 90%, transparent); }
    .blk-fx-marquee .belt { display: flex; width: max-content; animation: blk-fx-marquee-scroll calc(var(--dur-3) * 15) linear infinite; }
    .blk-fx-marquee .grp { display: flex; gap: var(--space-5); padding-inline-end: var(--space-5); flex: none; }
    .blk-fx-marquee .grp a { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--ink-muted); text-decoration: none; white-space: nowrap; padding-block: var(--space-2); transition: color var(--dur-1) var(--ease-out); }
    .blk-fx-marquee .grp a::before { content: "#"; color: var(--line-strong); margin-inline-end: var(--space-1); }
    .blk-fx-marquee .grp a:hover, .blk-fx-marquee .grp a:focus-visible { color: var(--ink); }
    .blk-fx-marquee .grp a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-fx-marquee .strip:hover .belt, .blk-fx-marquee .strip:focus-within .belt { animation-play-state: paused; }
    @keyframes blk-fx-marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-marquee *, .blk-fx-marquee *::before, .blk-fx-marquee *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <p class="caps">The references, on a belt</p>
  <div class="strip">
    <div class="belt">
      <div class="grp">
        <a href="https://github.com/srivtx/d-pill/blob/main/references/tokens.json">tokens.json</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/rules.json">rules.json</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/machines.md">machines.md</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/foundations.md">foundations.md</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/base.css">base.css</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/interaction.md">interaction.md</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/reading.md">reading.md</a>
        <a href="https://github.com/srivtx/d-pill/blob/main/references/writing.md">writing.md</a>
      </div>
      <div class="grp" aria-hidden="true"><a href="https://github.com/srivtx/d-pill/blob/main/references/tokens.json">tokens.json</a><a href="https://github.com/srivtx/d-pill/blob/main/references/rules.json">rules.json</a><a href="https://github.com/srivtx/d-pill/blob/main/references/machines.md">machines.md</a><a href="https://github.com/srivtx/d-pill/blob/main/references/foundations.md">foundations.md</a><a href="https://github.com/srivtx/d-pill/blob/main/references/base.css">base.css</a><a href="https://github.com/srivtx/d-pill/blob/main/references/interaction.md">interaction.md</a><a href="https://github.com/srivtx/d-pill/blob/main/references/reading.md">reading.md</a><a href="https://github.com/srivtx/d-pill/blob/main/references/writing.md">writing.md</a></div>
    </div>
  </div>
  <p class="quiet">Pauses for hover and for keyboard focus. Both halves of the belt are the same eight files, so the loop has no seam.</p>
</div>`,
  },
  {
    id: "fx-border-beam",
    name: "Border beam panel",
    category: "Motion & effects",
    tags: ["motion", "border", "beam", "conic-gradient", "angle", "property"],
    code: `<div class="blk blk-fx-border-beam">
  <style>
    @property --blk-fx-border-beam-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
    .blk-fx-border-beam .panel { display: grid; gap: var(--space-2); position: relative; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); padding: var(--space-5); }
    .blk-fx-border-beam .panel::before {
      --blk-fx-border-beam-angle: 0deg;
      content: ""; position: absolute; inset: calc(var(--space-1) * -0.25); border-radius: inherit;
      padding: calc(var(--space-1) * 0.25);
      background: conic-gradient(from var(--blk-fx-border-beam-angle), var(--accent) 0deg, transparent 40deg, transparent 320deg, var(--accent) 360deg);
      -webkit-mask: linear-gradient(var(--ink) 0 0) content-box, linear-gradient(var(--ink) 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(var(--ink) 0 0) content-box, linear-gradient(var(--ink) 0 0);
      mask-composite: exclude;
      animation: blk-fx-border-beam-spin calc(var(--dur-3) * 10) linear infinite;
      pointer-events: none;
    }
    .blk-fx-border-beam .panel h3 { margin: 0; }
    .blk-fx-border-beam .panel p { margin: 0; }
    .blk-fx-border-beam .st { margin: 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    @keyframes blk-fx-border-beam-spin { to { --blk-fx-border-beam-angle: 360deg; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-border-beam *, .blk-fx-border-beam *::before, .blk-fx-border-beam *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <div class="panel">
    <p class="caps">Continuous</p>
    <h3>A beam circles the hairline</h3>
    <p class="quiet">One registered angle spins a conic gradient, masked to a one-pixel ring. The border underneath never leaves — no angle support, no drama, just the hairline.</p>
    <p class="st">critique --watch · exit 0</p>
  </div>
</div>`,
  },
  {
    id: "fx-hover-lift",
    name: "Hover lift card",
    category: "Motion & effects",
    tags: ["motion", "card", "hover", "focus", "shadow", "lift"],
    code: `<div class="blk blk-fx-hover-lift">
  <style>
    .blk-fx-hover-lift { display: grid; gap: var(--space-3); }
    .blk-fx-hover-lift .card {
      display: flex; flex-direction: column; gap: var(--space-2); max-width: 38ch;
      border: var(--border); border-radius: var(--radius-lg); background: var(--surface); padding: var(--space-5);
      text-decoration: none;
      transition: transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out);
    }
    .blk-fx-hover-lift .card:hover, .blk-fx-hover-lift .card:focus-visible {
      transform: translateY(calc(var(--space-2) * -1));
      box-shadow: var(--shadow-overlay);
    }
    .blk-fx-hover-lift .card:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-fx-hover-lift .card h3 { margin: 0; }
    .blk-fx-hover-lift .card p { margin: 0; color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-fx-hover-lift .card .go { color: var(--accent); font-size: var(--text-sm); }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-hover-lift *, .blk-fx-hover-lift *::before, .blk-fx-hover-lift *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <p class="caps">Intent, made visible</p>
  <a class="card" href="https://github.com/srivtx/d-pill/blob/main/references/interaction.md">
    <h3>Lift on intent</h3>
    <p>Eight pixels up on a negative calc, one shadow token, 180ms out. Keyboard focus gets the same lift plus the ring.</p>
    <span class="go">Read the interaction law</span>
  </a>
</div>`,
  },
  {
    id: "fx-glow-pulse",
    name: "Glow pulse status orb",
    category: "Motion & effects",
    tags: ["motion", "status", "pulse", "orb", "live", "loop"],
    code: `<div class="blk blk-fx-glow-pulse">
  <style>
    .blk-fx-glow-pulse .row { display: flex; align-items: center; gap: var(--space-3); border: var(--border); border-radius: var(--radius-full); background: var(--surface); padding: var(--space-2) var(--space-5); width: fit-content; }
    .blk-fx-glow-pulse .wrap { position: relative; width: var(--space-4); height: var(--space-4); display: grid; place-items: center; flex: none; }
    .blk-fx-glow-pulse .orb { width: var(--space-3); height: var(--space-3); border-radius: var(--radius-full); background: oklch(0.62 0.18 var(--hue)); animation: blk-fx-glow-pulse-core calc(var(--dur-3) * 4) var(--ease-in) infinite; }
    .blk-fx-glow-pulse .wrap::after {
      content: ""; position: absolute; inset: 0; border-radius: var(--radius-full);
      border: var(--border); border-color: oklch(0.62 0.18 var(--hue));
      animation: blk-fx-glow-pulse-ping calc(var(--dur-3) * 4) linear infinite;
    }
    .blk-fx-glow-pulse .row b { font-size: var(--text-md); font-weight: 600; }
    .blk-fx-glow-pulse .row p { margin: 0; max-width: 40ch; }
    @keyframes blk-fx-glow-pulse-core { 50% { transform: scale(0.8); opacity: 0.8; } }
    @keyframes blk-fx-glow-pulse-ping { from { transform: scale(1); opacity: 0.7; } to { transform: scale(2.2); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-glow-pulse *, .blk-fx-glow-pulse *::before, .blk-fx-glow-pulse *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <div class="row">
    <span class="wrap" aria-hidden="true"><span class="orb"></span></span>
    <b>Live</b>
    <p class="quiet">Scale and opacity carry the pulse — no glow shadow, one hue variable. This page re-audits itself while the orb breathes.</p>
  </div>
</div>`,
  },
  {
    id: "fx-underline-draw",
    name: "Underline draw links",
    category: "Motion & effects",
    tags: ["motion", "links", "underline", "scalex", "nav", "focus"],
    code: `<div class="blk blk-fx-underline-draw">
  <style>
    .blk-fx-underline-draw { display: grid; gap: var(--space-3); }
    .blk-fx-underline-draw .nav { display: flex; flex-wrap: wrap; gap: var(--space-4); }
    .blk-fx-underline-draw a { position: relative; padding-block: var(--space-3); color: var(--ink); font-size: var(--text-md); text-decoration: none; }
    .blk-fx-underline-draw a::before, .blk-fx-underline-draw a::after {
      content: ""; position: absolute; inset-inline: 0; bottom: 0; border-bottom: var(--border);
    }
    .blk-fx-underline-draw a::before { border-color: var(--line-strong); }
    .blk-fx-underline-draw a::after {
      border-color: var(--accent); transform: scaleX(0); transform-origin: right;
      transition: transform var(--dur-2) var(--ease-out);
    }
    .blk-fx-underline-draw a:hover::after, .blk-fx-underline-draw a:focus-visible::after { transform: scaleX(1); transform-origin: left; }
    .blk-fx-underline-draw a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-underline-draw *, .blk-fx-underline-draw *::before, .blk-fx-underline-draw *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <p class="caps">Drawn, not decorated</p>
  <nav class="nav" aria-label="Law files">
    <a href="https://github.com/srivtx/d-pill">Overview</a>
    <a href="https://github.com/srivtx/d-pill/blob/main/references/tokens.json">Tokens</a>
    <a href="https://github.com/srivtx/d-pill/blob/main/references/rules.json">Rules</a>
    <a href="https://github.com/srivtx/d-pill/blob/main/references/machines.md">Machines</a>
    <a href="https://srivtx.github.io/d-pill/">Demo</a>
  </nav>
  <p class="quiet">A hairline at rest; the accent line redraws on entry and exits the far side. One transform, one duration token.</p>
</div>`,
  },
  {
    id: "fx-orbit-loader",
    name: "Orbit loader",
    category: "Motion & effects",
    tags: ["motion", "loader", "spinner", "orbit", "syncing", "ring"],
    code: `<div class="blk blk-fx-orbit-loader">
  <style>
    .blk-fx-orbit-loader { display: grid; gap: var(--space-3); justify-items: center; text-align: center; }
    .blk-fx-orbit-loader .load { display: grid; gap: var(--space-3); justify-items: center; }
    .blk-fx-orbit-loader .ring {
      position: relative; width: var(--space-8); height: var(--space-8);
      border: var(--border); border-radius: var(--radius-full);
      animation: blk-fx-orbit-loader-spin calc(var(--dur-3) * 3) linear infinite;
    }
    .blk-fx-orbit-loader .ring::after {
      content: ""; position: absolute; top: calc(var(--space-1) * -1); left: calc(50% - var(--space-1));
      width: var(--space-2); height: var(--space-2);
      border-radius: var(--radius-full); background: var(--accent);
    }
    .blk-fx-orbit-loader .st { margin: 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-fx-orbit-loader .quiet { margin: 0; }
    @keyframes blk-fx-orbit-loader-spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-fx-orbit-loader *, .blk-fx-orbit-loader *::before, .blk-fx-orbit-loader *::after {
        animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
      }
    }
  </style>
  <div class="load" role="status">
    <div class="ring" aria-hidden="true"></div>
    <p class="st">syncing · references/tokens.json</p>
    <p class="quiet">One hairline ring, one satellite, three dur-3 tokens per lap. Reduced motion parks the orbit in a single frame.</p>
  </div>
</div>`,
  },
];
