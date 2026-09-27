/**
 * Playground samples — the gate teaching itself. The "slop" samples are the
 * honest failure modes of AI-built interfaces; the clean sample is the same
 * page after the system. Run them in the playground: same rules, same exits.
 */

export interface Sample {
  id: string;
  label: string;
  mode: "html" | "css";
  note: string;
  code: string;
}

const SLOP_LANDING = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Pitch — AI site builder</title>
<style>
  .hero {
    padding: 80px 24px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: #ffffff;
  }
  .hero h1 {
    font-size: 56px;
    margin-bottom: 18px;
    letter-spacing: -0.03em;
  }
  .hero p {
    font-size: 17px;
    color: #e0e7ff;
    margin-top: 9px;
  }
  .card {
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    padding: 22px 18px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.25);
  }
  .card h3 { font-size: 14px; color: #4c1d95; }
  .cta {
    transition: all 0.3s ease-in-out;
    border-radius: 9999px;
    padding: 14px 32px;
    background: #f59e0b;
    color: #111;
  }
  .badge {
    position: absolute;
    z-index: 999;
    border-radius: 50%;
    background: #22c55e;
    color: white;
    padding: 10px 12px;
    font-size: 11px;
  }
</style>
</head>
<body>
  <div class="hero">
    <div class="badge">NEW</div>
    <h1>Ship beautiful sites in seconds</h1>
    <p>Prompt to production. No design skills required.</p>
    <button class="cta" style="margin-top: 25px; font-size: 15px;">
      <svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12h14"/></svg>
    </button>
  </div>
  <div class="card">
    <h3>Why teams choose us</h3>
    <img src="dashboard.png">
    <p style="font-size: 14px; color: #6b7280; margin-top: 11px;">
      Trusted by 12,000 founders. <a href="/signup">Get started</a>
    </p>
  </div>
</body>
</html>`;

const TOKEN_LEGAL = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Proof — the same page, decided</title>
<style>
  .hero {
    padding: var(--space-7) var(--space-4);
    background: var(--bg-subtle);
    color: var(--ink);
  }
  .hero h1 {
    font-size: var(--text-3xl);
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    margin-block-end: var(--space-2);
  }
  .hero p { font-size: var(--text-md); color: var(--ink-muted); }
  .cta {
    transition: background var(--dur-1) var(--ease-out);
    border-radius: var(--radius);
    padding: var(--space-2) var(--space-4);
    background: var(--accent);
    color: var(--accent-ink);
  }
  .cta:hover { background: color-mix(in oklch, var(--accent) 92%, black); }
  .cta:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
  .card {
    border: var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    background: var(--surface);
  }
  .card h3 { font-size: var(--text-sm); color: var(--ink); }
  @media (prefers-reduced-motion: reduce) {
    .cta { transition-duration: 0.01ms; }
  }
</style>
</head>
<body>
  <main class="hero">
    <h1>Ship decided interfaces</h1>
    <p>One hue, one scale, one clock. The gate reads the page and says what to fix.</p>
    <button class="cta">Run the critique</button>
  </main>
  <section class="card">
    <h3>Why teams choose the system</h3>
    <p class="hint">Tokens carry the decisions, so the page stops arguing with itself.</p>
  </section>
</body>
</html>`;

const CSS_SHEET = `/* feed.css — the sheet an agent wrote by feel */
.feed {
  display: grid;
  gap: 9px;
  padding: 13px;
}
.feed-item {
  border-radius: 7px;
  border: 1.5px solid #d1d5db;
  padding: 11px 9px;
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
.feed-item:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}
.feed-item .title { font-size: 15px; color: #111827; }
.feed-item .meta { font-size: 11px; color: #9ca3af; }
.feed-item .badge {
  border-radius: 50%;
  background: #818cf8;
  padding: 3px 6px;
  z-index: 300;
}
`;

export const SAMPLES: Sample[] = [
  {
    id: "slop-landing",
    label: "Slop landing",
    mode: "html",
    note: "An AI-built landing page by feel. Fourteen findings, every one a teachable decision.",
    code: SLOP_LANDING,
  },
  {
    id: "token-legal",
    label: "The same page, decided",
    mode: "html",
    note: "The same layout on the tokens. Exit 0 — and it re-tints with the hue dial above.",
    code: TOKEN_LEGAL,
  },
  {
    id: "css-sheet",
    label: "A stylesheet by feel",
    mode: "css",
    note: "A feed stylesheet with literal everything. Paste your own sheet instead.",
    code: CSS_SHEET,
  },
];
