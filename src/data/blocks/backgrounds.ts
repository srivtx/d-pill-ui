/** Gallery blocks: backgrounds. Gate-clean — see worklog Task 19-a. */

import type { BlockRecord } from "./types";

export const BG_BLOCKS: BlockRecord[] = [
  {
    id: "bg-dot-grid",
    name: "Dot grid field",
    category: "Backgrounds",
    tags: ["background", "dots", "radial-gradient", "mask", "raster", "texture"],
    code: `<div class="blk blk-bg-dot-grid">
  <style>
    .blk-bg-dot-grid { position: relative; display: flex; align-items: center; justify-content: center; min-height: 15rem; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: hidden; }
    .blk-bg-dot-grid .field { position: absolute; inset: 0; background-image: radial-gradient(var(--line) 1px, transparent 1px); background-size: var(--space-4) var(--space-4); mask-image: radial-gradient(ellipse at 50% 50%, black 18%, transparent 68%); }
    .blk-bg-dot-grid .wash { position: absolute; inset: 0; background: radial-gradient(circle at 50% 58%, color-mix(in oklch, var(--accent) 10%, transparent), transparent 55%); }
    .blk-bg-dot-grid .inner { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); text-align: center; padding: var(--space-6); max-width: 42ch; }
    .blk-bg-dot-grid .inner h3 { font-size: var(--text-lg); max-width: 22ch; }
    .blk-bg-dot-grid .inner p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-bg-dot-grid .inner .caps { color: var(--accent); }
    .blk-bg-dot-grid .tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); border: var(--border); border-radius: var(--radius-full); padding: var(--space-1) var(--space-3); background: var(--bg); }
    @media (max-width: 720px) {
      .blk-bg-dot-grid .inner { padding: var(--space-4); }
      .blk-bg-dot-grid .inner h3 { font-size: var(--text-md); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-dot-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="field" aria-hidden="true"></div>
  <div class="wash" aria-hidden="true"></div>
  <div class="inner">
    <p class="caps">Raster</p>
    <h3>Dots on a token pitch</h3>
    <p>One radial-gradient draws the field at a var(--space-4) pitch. The mask thins it toward the edges, so the center stays readable in both themes.</p>
    <span class="tag">radial-gradient · mask-image</span>
  </div>
</div>`,
  },
  {
    id: "bg-line-grid",
    name: "Hairline grid with vignette",
    category: "Backgrounds",
    tags: ["background", "grid", "graph-paper", "hairline", "vignette", "mask"],
    code: `<div class="blk blk-bg-line-grid">
  <style>
    .blk-bg-line-grid { position: relative; display: flex; align-items: center; justify-content: center; min-height: 15rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); overflow: hidden; }
    .blk-bg-line-grid .grid { position: absolute; inset: 0; background-image: linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px); background-size: var(--space-6) var(--space-6); mask-image: radial-gradient(ellipse at 50% 45%, black 30%, transparent 72%); }
    .blk-bg-line-grid .panel { position: relative; display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); max-width: 44ch; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); }
    .blk-bg-line-grid .panel h3 { font-size: var(--text-lg); }
    .blk-bg-line-grid .panel p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-bg-line-grid .panel .caps { color: var(--accent); }
    .blk-bg-line-grid .meta { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); margin-top: var(--space-1); }
    @media (max-width: 720px) {
      .blk-bg-line-grid .panel { padding: var(--space-4); }
      .blk-bg-line-grid .panel h3 { font-size: var(--text-md); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-line-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="grid" aria-hidden="true"></div>
  <div class="panel">
    <p class="caps">Graph paper</p>
    <h3>Hairlines, no ink weight</h3>
    <p>Two 1px gradients draw the squares at a var(--space-6) pitch. A radial mask quiets the field before it reaches the frame.</p>
    <span class="meta">1px · var(--space-6) · mask-image</span>
  </div>
</div>`,
  },
  {
    id: "bg-shooting-stars",
    name: "Shooting stars night panel",
    category: "Backgrounds",
    tags: ["background", "night", "stars", "streaks", "motion", "loop", "diagonal"],
    code: `<div class="blk blk-bg-shooting-stars">
  <style>
    .blk-bg-shooting-stars { position: relative; display: flex; align-items: flex-end; min-height: 16rem; border: var(--border); border-radius: var(--radius-lg); background: oklch(0.23 0.03 var(--hue)); overflow: hidden; }
    .blk-bg-shooting-stars .sky { position: absolute; inset: 0; background-image: radial-gradient(oklch(0.68 0.03 var(--hue)) 1px, transparent 1px); background-size: var(--space-5) var(--space-5); opacity: 0.7; mask-image: linear-gradient(to bottom, black, transparent 85%); }
    .blk-bg-shooting-stars .streaks { position: absolute; inset: 0; }
    .blk-bg-shooting-stars .star { position: absolute; width: 8rem; height: 1px; border-radius: var(--radius-full); background: linear-gradient(to right, transparent, oklch(0.85 0.1 var(--hue))); animation: blk-bg-shooting-stars-fall calc(var(--dur-3) * 11) linear infinite; }
    .blk-bg-shooting-stars .star b { position: absolute; top: -1px; right: 0; width: 3px; height: 3px; border-radius: var(--radius-full); background: oklch(0.92 0.06 var(--hue)); box-shadow: 0 0 var(--space-2) oklch(0.85 0.12 var(--hue) / 0.9); }
    .blk-bg-shooting-stars .star:nth-child(1) { top: 18%; right: 2rem; }
    .blk-bg-shooting-stars .star:nth-child(2) { top: 44%; right: 8rem; animation-duration: calc(var(--dur-3) * 11); animation-delay: calc(var(--dur-3) * -6); }
    .blk-bg-shooting-stars .star:nth-child(3) { top: 8%; right: 14rem; animation-duration: calc(var(--dur-3) * 14); animation-delay: calc(var(--dur-3) * -10); }
    @keyframes blk-bg-shooting-stars-fall {
      0% { transform: translate(0, 0) rotate(33deg); opacity: 0; }
      12% { opacity: 1; }
      70% { opacity: 1; }
      100% { transform: translate(-16rem, 10rem) rotate(33deg); opacity: 0; }
    }
    .blk-bg-shooting-stars .note { position: relative; display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); }
    .blk-bg-shooting-stars .note .k { font-size: var(--text-xs); letter-spacing: 0.08em; text-transform: uppercase; color: oklch(0.8 0.05 var(--hue)); }
    .blk-bg-shooting-stars .note h3 { font-size: var(--text-lg); color: oklch(0.95 0.01 var(--hue)); }
    .blk-bg-shooting-stars .note p { color: oklch(0.78 0.01 var(--hue)); font-size: var(--text-sm); max-width: 36ch; }
    @media (max-width: 720px) {
      .blk-bg-shooting-stars .note { padding: var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-shooting-stars * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="sky" aria-hidden="true"></div>
  <div class="streaks" aria-hidden="true">
    <span class="star"><b></b></span>
    <span class="star"><b></b></span>
    <span class="star"><b></b></span>
  </div>
  <div class="note">
    <p class="k">Night panel</p>
    <h3>Streaks on the duration scale</h3>
    <p>Three diagonal streaks, each loop a calc() of --dur-3 and each delay staggered the same way. Reduced motion stops them cold.</p>
  </div>
</div>`,
  },
  {
    id: "bg-skewed-rects",
    name: "Drifting skewed planes",
    category: "Backgrounds",
    tags: ["background", "skew", "rectangles", "drift", "translucent", "oklch"],
    code: `<div class="blk blk-bg-skewed-rects">
  <style>
    .blk-bg-skewed-rects { position: relative; display: grid; place-items: center; min-height: 15rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); overflow: hidden; }
    .blk-bg-skewed-rects .planes { position: absolute; inset: 0; }
    .blk-bg-skewed-rects .plane { position: absolute; width: 10rem; height: 6rem; border: var(--border); border-radius: var(--radius); animation: blk-bg-skewed-rects-drift calc(var(--dur-3) * 16) linear infinite alternate; }
    .blk-bg-skewed-rects .plane:nth-child(1) { left: 6%; top: 14%; background: oklch(0.75 0.09 var(--hue) / 0.28); }
    .blk-bg-skewed-rects .plane:nth-child(2) { right: 8%; top: 42%; width: 8rem; height: 5rem; background: oklch(0.85 0.05 var(--hue) / 0.3); animation-duration: calc(var(--dur-3) * 23); animation-delay: calc(var(--dur-3) * -8); }
    .blk-bg-skewed-rects .plane:nth-child(3) { left: 32%; bottom: 10%; width: 12rem; height: 7rem; background: oklch(0.65 0.11 var(--hue) / 0.25); animation-duration: calc(var(--dur-3) * 19); animation-delay: calc(var(--dur-3) * -12); }
    @keyframes blk-bg-skewed-rects-drift {
      from { transform: skewX(-14deg) translateX(-2.5rem); }
      to { transform: skewX(-14deg) translateX(2.5rem); }
    }
    .blk-bg-skewed-rects .inner { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); text-align: center; padding: var(--space-6); max-width: 40ch; }
    .blk-bg-skewed-rects .inner h3 { font-size: var(--text-lg); max-width: 20ch; }
    .blk-bg-skewed-rects .inner p { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 720px) {
      .blk-bg-skewed-rects .inner { padding: var(--space-4); }
      .blk-bg-skewed-rects .plane:nth-child(3) { left: 8%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-skewed-rects * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="planes" aria-hidden="true">
    <div class="plane"></div>
    <div class="plane"></div>
    <div class="plane"></div>
  </div>
  <div class="inner">
    <p class="caps">Planes</p>
    <h3>Three speeds, one hue</h3>
    <p>Translucent oklch panes drift past each other, every loop a calc() of --dur-3. Edges stay hairlines; the skew stays quiet.</p>
  </div>
</div>`,
  },
  {
    id: "bg-noise-field",
    name: "SVG noise field",
    category: "Backgrounds",
    tags: ["background", "noise", "grain", "svg", "feTurbulence", "texture"],
    code: `<div class="blk blk-bg-noise-field">
  <style>
    .blk-bg-noise-field { position: relative; display: flex; align-items: center; justify-content: center; min-height: 15rem; border: var(--border); border-radius: var(--radius-lg); background: linear-gradient(to bottom, color-mix(in oklch, var(--accent) 14%, var(--bg)), var(--bg)); overflow: hidden; }
    .blk-bg-noise-field .grain { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.4; mix-blend-mode: overlay; }
    .blk-bg-noise-field .inner { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); text-align: center; padding: var(--space-6); max-width: 42ch; }
    .blk-bg-noise-field .inner h3 { font-size: var(--text-lg); max-width: 24ch; }
    .blk-bg-noise-field .inner p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-bg-noise-field .meta { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); }
    @media (max-width: 720px) {
      .blk-bg-noise-field .inner { padding: var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-noise-field * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <svg class="grain" aria-hidden="true">
    <filter id="blk-bg-noise-field-f">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"></feTurbulence>
      <feColorMatrix type="saturate" values="0"></feColorMatrix>
    </filter>
    <rect width="100%" height="100%" filter="url(#blk-bg-noise-field-f)"></rect>
  </svg>
  <div class="inner">
    <p class="caps">Grain</p>
    <h3>Noise, drawn not fetched</h3>
    <p>An inline feTurbulence filter paints the grain. No image request, no asset to version, nothing to alt-text.</p>
    <span class="meta">feTurbulence · baseFrequency 0.9</span>
  </div>
</div>`,
  },
  {
    id: "bg-beam-columns",
    name: "Light beam columns",
    category: "Backgrounds",
    tags: ["background", "beams", "columns", "light", "pulse", "gradient"],
    code: `<div class="blk blk-bg-beam-columns">
  <style>
    .blk-bg-beam-columns { position: relative; display: flex; flex-direction: column; min-height: 16rem; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: hidden; }
    .blk-bg-beam-columns .beams { position: absolute; inset: 0; display: flex; justify-content: space-evenly; }
    .blk-bg-beam-columns .beam { width: var(--space-4); height: 100%; background: linear-gradient(to right, transparent, color-mix(in oklch, var(--accent) 38%, transparent), transparent); mask-image: linear-gradient(to bottom, black 15%, transparent 78%); animation: blk-bg-beam-columns-breathe calc(var(--dur-3) * 14) linear infinite; }
    .blk-bg-beam-columns .beam:nth-child(2) { width: var(--space-3); animation-delay: calc(var(--dur-3) * 5); }
    .blk-bg-beam-columns .beam:nth-child(3) { width: var(--space-5); animation-delay: calc(var(--dur-3) * -8); }
    .blk-bg-beam-columns .beam:nth-child(4) { width: var(--space-3); animation-delay: calc(var(--dur-3) * 3); }
    @keyframes blk-bg-beam-columns-breathe {
      0%, 100% { opacity: 0.25; }
      50% { opacity: 1; }
    }
    .blk-bg-beam-columns .content { position: relative; display: flex; flex-direction: column; justify-content: flex-end; gap: var(--space-2); flex: 1; padding: var(--space-6); }
    .blk-bg-beam-columns .content h3 { font-size: var(--text-lg); }
    .blk-bg-beam-columns .content p { color: var(--ink-muted); font-size: var(--text-sm); max-width: 40ch; }
    @media (max-width: 720px) {
      .blk-bg-beam-columns .content { padding: var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-beam-columns * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="beams" aria-hidden="true">
    <div class="beam"></div>
    <div class="beam"></div>
    <div class="beam"></div>
    <div class="beam"></div>
  </div>
  <div class="content">
    <p class="caps">Beams</p>
    <h3>Four columns, one breath</h3>
    <p>Vertical accent washes pulsing on a slow loop. Each delay is a calc() of --dur-3; reduced motion holds them still.</p>
  </div>
</div>`,
  },
  {
    id: "bg-aurora-bands",
    name: "Aurora bands",
    category: "Backgrounds",
    tags: ["background", "aurora", "bands", "blur", "drift", "oklch"],
    code: `<div class="blk blk-bg-aurora-bands">
  <style>
    .blk-bg-aurora-bands { position: relative; display: flex; align-items: flex-end; min-height: 16rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); overflow: hidden; }
    .blk-bg-aurora-bands .bands { position: absolute; inset: 0; }
    .blk-bg-aurora-bands .band { position: absolute; width: 82%; height: 34%; border-radius: var(--radius-full); filter: blur(var(--space-5)); background: linear-gradient(90deg, transparent, oklch(0.72 0.13 var(--hue) / 0.5), transparent); animation: blk-bg-aurora-bands-sway calc(var(--dur-3) * 18) linear infinite alternate; }
    .blk-bg-aurora-bands .band:nth-child(1) { top: 10%; left: 8%; }
    .blk-bg-aurora-bands .band:nth-child(2) { top: 34%; left: 14%; width: 64%; background: linear-gradient(90deg, transparent, oklch(0.62 0.11 var(--hue) / 0.45), transparent); animation-duration: calc(var(--dur-3) * 26); animation-delay: calc(var(--dur-3) * -9); }
    .blk-bg-aurora-bands .band:nth-child(3) { top: 58%; left: 8%; width: 76%; background: linear-gradient(90deg, transparent, oklch(0.82 0.08 var(--hue) / 0.4), transparent); animation-duration: calc(var(--dur-3) * 22); animation-delay: calc(var(--dur-3) * -14); }
    @keyframes blk-bg-aurora-bands-sway {
      from { transform: translateX(-4rem); }
      to { transform: translateX(4rem); }
    }
    .blk-bg-aurora-bands .note { position: relative; display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); }
    .blk-bg-aurora-bands .note h3 { font-size: var(--text-lg); }
    .blk-bg-aurora-bands .note p { color: var(--ink-muted); font-size: var(--text-sm); max-width: 38ch; }
    @media (max-width: 720px) {
      .blk-bg-aurora-bands .note { padding: var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-aurora-bands * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="bands" aria-hidden="true">
    <div class="band"></div>
    <div class="band"></div>
    <div class="band"></div>
  </div>
  <div class="note">
    <p class="caps">Aurora</p>
    <h3>Three bands, three clocks</h3>
    <p>Blurred oklch strips tied to var(--hue), each swaying at its own calc() of the duration scale. Nothing here is a literal.</p>
  </div>
</div>`,
  },
  {
    id: "bg-mesh-blobs",
    name: "Mesh blobs with card",
    category: "Backgrounds",
    tags: ["background", "mesh", "blobs", "blur", "drift", "card", "shadow"],
    code: `<div class="blk blk-bg-mesh-blobs">
  <style>
    .blk-bg-mesh-blobs { position: relative; display: grid; place-items: center; min-height: 16rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); overflow: hidden; }
    .blk-bg-mesh-blobs .mesh { position: absolute; inset: 0; }
    .blk-bg-mesh-blobs .blob { position: absolute; width: var(--space-10); height: var(--space-10); border-radius: var(--radius-full); filter: blur(var(--space-5)); background: oklch(0.72 0.13 var(--hue) / 0.5); animation: blk-bg-mesh-blobs-drift calc(var(--dur-3) * 17) linear infinite alternate; }
    .blk-bg-mesh-blobs .blob:nth-child(1) { top: 16%; left: 10%; }
    .blk-bg-mesh-blobs .blob:nth-child(2) { width: var(--space-9); height: var(--space-9); top: 52%; left: 64%; background: oklch(0.62 0.11 var(--hue) / 0.45); animation-duration: calc(var(--dur-3) * 24); animation-delay: calc(var(--dur-3) * -8); }
    .blk-bg-mesh-blobs .blob:nth-child(3) { width: var(--space-8); height: var(--space-8); top: 8%; left: 52%; background: oklch(0.82 0.08 var(--hue) / 0.4); animation-duration: calc(var(--dur-3) * 20); animation-delay: calc(var(--dur-3) * -13); }
    @keyframes blk-bg-mesh-blobs-drift {
      from { transform: translate(-1.5rem, 0.75rem); }
      to { transform: translate(1.5rem, -1rem); }
    }
    .blk-bg-mesh-blobs .card { position: relative; display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); max-width: 44ch; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); box-shadow: var(--shadow-overlay); }
    .blk-bg-mesh-blobs .card h3 { font-size: var(--text-lg); }
    .blk-bg-mesh-blobs .card p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-bg-mesh-blobs .card a { color: var(--accent); font-size: var(--text-sm); text-decoration: underline; text-decoration-thickness: 1px; transition: color var(--dur-1) var(--ease-out); }
    .blk-bg-mesh-blobs .card a:hover { color: var(--ink); }
    .blk-bg-mesh-blobs .card a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) {
      .blk-bg-mesh-blobs .card { padding: var(--space-4); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-mesh-blobs * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="mesh" aria-hidden="true">
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
  </div>
  <div class="card">
    <p class="caps">Mesh</p>
    <h3>Three blobs, one variable</h3>
    <p>Each circle is oklch with var(--hue) and its own lightness. The card floats on var(--surface) with the one shadow the system allows.</p>
    <a href="https://github.com/srivtx/d-pill">Read the laws behind it</a>
  </div>
</div>`,
  },
  {
    id: "bg-spotlight-vignette",
    name: "Spotlight vignette",
    category: "Backgrounds",
    tags: ["background", "spotlight", "radial", "vignette", "headline", "contrast"],
    code: `<div class="blk blk-bg-spotlight-vignette">
  <style>
    .blk-bg-spotlight-vignette { position: relative; display: grid; place-items: center; min-height: 16rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); overflow: hidden; }
    .blk-bg-spotlight-vignette .spot { position: absolute; inset: 0; background: radial-gradient(circle at 50% 44%, color-mix(in oklch, var(--accent) 30%, transparent), transparent 62%); }
    .blk-bg-spotlight-vignette .vig { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 44%, transparent 42%, color-mix(in oklch, var(--line) 55%, transparent) 100%); }
    .blk-bg-spotlight-vignette .inner { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); text-align: center; padding: var(--space-6); max-width: 44ch; }
    .blk-bg-spotlight-vignette .inner h3 { font-size: var(--text-xl); max-width: 18ch; }
    .blk-bg-spotlight-vignette .inner p { color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-bg-spotlight-vignette .meta { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); }
    @media (max-width: 720px) {
      .blk-bg-spotlight-vignette .inner { padding: var(--space-4); }
      .blk-bg-spotlight-vignette .inner h3 { font-size: var(--text-lg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-spotlight-vignette * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="spot" aria-hidden="true"></div>
  <div class="vig" aria-hidden="true"></div>
  <div class="inner">
    <p class="caps">Spotlight</p>
    <h3>The center is the argument</h3>
    <p>A radial accent wash behind the headline; the vignette tints toward var(--line), so the edges recede in both themes.</p>
    <span class="meta">color-mix · var(--hue)</span>
  </div>
</div>`,
  },
  {
    id: "bg-horizon-glow",
    name: "Horizon glow",
    category: "Backgrounds",
    tags: ["background", "horizon", "glow", "gradient", "hairline", "stats"],
    code: `<div class="blk blk-bg-horizon-glow">
  <style>
    .blk-bg-horizon-glow { position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 15rem; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: hidden; }
    .blk-bg-horizon-glow .glow { position: absolute; left: 0; right: 0; bottom: 0; height: var(--space-7); background: linear-gradient(to bottom, transparent, color-mix(in oklch, var(--accent) 45%, transparent)); }
    .blk-bg-horizon-glow .rule { position: absolute; left: 0; right: 0; bottom: var(--space-7); border-top: var(--border-strong); }
    .blk-bg-horizon-glow .content { position: relative; display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-5) var(--space-5) calc(var(--space-7) + var(--space-5)); }
    .blk-bg-horizon-glow .content h3 { font-size: var(--text-lg); }
    .blk-bg-horizon-glow .stats { display: flex; flex-wrap: wrap; gap: var(--space-5); }
    .blk-bg-horizon-glow .stat { display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-bg-horizon-glow .stat b { font-family: var(--font-mono); font-weight: 500; font-size: var(--text-lg); color: var(--accent); font-variant-numeric: tabular-nums; }
    .blk-bg-horizon-glow .stat span { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 720px) {
      .blk-bg-horizon-glow .stats { gap: var(--space-4); }
      .blk-bg-horizon-glow .stat { flex: 1 1 40%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-bg-horizon-glow * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="rule" aria-hidden="true"></div>
  <div class="glow" aria-hidden="true"></div>
  <div class="content">
    <p class="caps">Horizon</p>
    <h3>Everything above the line is checked</h3>
    <div class="stats">
      <div class="stat"><b class="num">120ms</b><span>the fastest anything moves</span></div>
      <div class="stat"><b class="num">1px</b><span>every edge, hairline or nothing</span></div>
      <div class="stat"><b class="num">0</b><span>findings at exit</span></div>
    </div>
  </div>
</div>`,
  },
];
