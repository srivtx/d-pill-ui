/* Task 18-c — navigation gallery blocks: topbar, footer, side nav. */
import type { BlockRecord } from "./types";

export const NAV_BLOCKS: BlockRecord[] = [
  {
    id: "nav-topbar",
    name: "Topbar",
    category: "Navigation",
    tags: ["topbar", "header", "nav", "links", "theme toggle"],
    code: `<div class="blk blk-nav-topbar">
  <style>
    .blk-nav-topbar .bar {
      display: flex; align-items: center; gap: var(--space-4);
      padding: var(--space-2) var(--space-4); background: var(--bg);
      border-block-end: var(--border);
    }
    .blk-nav-topbar .brand { display: flex; align-items: center; gap: var(--space-2); color: var(--ink); text-decoration: none; }
    .blk-nav-topbar .wordmark { font-size: var(--text-md); }
    .blk-nav-topbar .links { margin-inline-start: auto; display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center; }
    .blk-nav-topbar .links a { color: var(--ink-muted); text-decoration: none; font-size: var(--text-sm); font-weight: 500; }
    .blk-nav-topbar .links a:hover { color: var(--ink); }
    .blk-nav-topbar .links a[aria-current="page"] { color: var(--ink); font-weight: 600; box-shadow: inset 0 -2px 0 var(--accent); }
    .blk-nav-topbar a:focus-visible, .blk-nav-topbar button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .blk-nav-topbar * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="bar">
    <a class="brand" href="https://github.com/srivtx/d-pill">
      <span class="mark" aria-hidden="true"></span>
      <span class="wordmark">d-pill</span>
    </a>
    <nav class="links" aria-label="Primary">
      <a href="#tokens">Tokens</a>
      <a href="#laws">Laws</a>
      <a href="#gate" aria-current="page">Gate</a>
      <a href="#blocks">Blocks</a>
    </nav>
    <button type="button" class="btn ghost icon" aria-label="Toggle color theme">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
  </div>
</div>`,
  },
  {
    id: "nav-footer",
    name: "Footer",
    category: "Navigation",
    tags: ["footer", "sitemap", "nav", "columns", "legal"],
    code: `<div class="blk blk-nav-footer">
  <style>
    .blk-nav-footer { border-block-start: var(--border); padding-block: var(--space-6); display: grid; gap: var(--space-6); }
    .blk-nav-footer .top { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }
    .blk-nav-footer .brand { display: flex; align-items: center; gap: var(--space-2); color: var(--ink); text-decoration: none; }
    .blk-nav-footer .wordmark { font-size: var(--text-md); }
    .blk-nav-footer .cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .blk-nav-footer .col { display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-nav-footer .col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-nav-footer .col a { color: var(--ink-muted); text-decoration: none; font-size: var(--text-sm); line-height: var(--leading-ui); }
    .blk-nav-footer .col a:hover { color: var(--ink); text-decoration: underline; text-decoration-thickness: 1px; }
    .blk-nav-footer a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) { .blk-nav-footer .cols { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-nav-footer * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="top">
    <a class="brand" href="https://github.com/srivtx/d-pill">
      <span class="mark" aria-hidden="true"></span>
      <span class="wordmark">d-pill</span>
    </a>
    <p class="quiet">A design system with a machine critique gate. Tokens as law, findings that teach.</p>
  </div>
  <div class="cols">
    <div class="col">
      <h3 class="caps">System</h3>
      <ul>
        <li><a href="#tokens">Tokens</a></li>
        <li><a href="#laws">The 16 laws</a></li>
        <li><a href="#gate">The gate</a></li>
        <li><a href="https://github.com/srivtx/d-pill">Source</a></li>
      </ul>
    </div>
    <div class="col">
      <h3 class="caps">Learn</h3>
      <ul>
        <li><a href="#foundations">Foundations</a></li>
        <li><a href="#type">Type ramp</a></li>
        <li><a href="#interaction">Interaction</a></li>
        <li><a href="#a11y">Accessibility</a></li>
      </ul>
    </div>
    <div class="col">
      <h3 class="caps">Build</h3>
      <ul>
        <li><a href="#install">Install</a></li>
        <li><a href="#ci">CI enforcement</a></li>
        <li><a href="#rules">Rules as data</a></li>
        <li><a href="#mcp">MCP server</a></li>
      </ul>
    </div>
  </div>
  <p class="quiet">d-pill — MIT. One hue, sixteen machine rules, zero findings on this page.</p>
</div>`,
  },
  {
    id: "nav-side",
    name: "Side nav",
    category: "Navigation",
    tags: ["sidenav", "vertical nav", "panel", "glyphs", "install"],
    code: `<div class="blk blk-nav-side">
  <style>
    .blk-nav-side { border: var(--border); border-radius: var(--radius-lg); background: var(--surface); display: flex; flex-direction: column; overflow: hidden; }
    .blk-nav-side .items { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
    .blk-nav-side .items a {
      display: flex; align-items: center; gap: var(--space-2);
      min-height: var(--control-h); padding: var(--space-2) var(--space-3);
      color: var(--ink-muted); text-decoration: none; font-size: var(--text-sm); font-weight: 500;
      border-block-end: var(--border);
      transition: color var(--dur-1) var(--ease-out), background-color var(--dur-1) var(--ease-out);
    }
    .blk-nav-side .items li:last-child a { border-block-end: 0; }
    .blk-nav-side .items a:hover { background: var(--bg-subtle); color: var(--ink); }
    .blk-nav-side .items a[aria-current="page"] { background: var(--accent-soft); color: var(--ink); font-weight: 600; }
    .blk-nav-side .items a:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
    .blk-nav-side .install { border-block-start: var(--border); padding: var(--space-3); display: flex; align-items: center; gap: var(--space-3); justify-content: space-between; background: var(--bg-subtle); }
    .blk-nav-side .cmd { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--text-xs); color: var(--ink-muted); }
    @media (prefers-reduced-motion: reduce) {
      .blk-nav-side * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <nav aria-label="Sections">
    <ul class="items">
      <li><a href="#tokens"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><path d="M12 3l9 9-9 9-9-9z"/></svg>Tokens</a></li>
      <li><a href="#laws"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>Laws</a></li>
      <li><a href="#gate" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/></svg>Gate</a></li>
      <li><a href="#blocks"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>Blocks</a></li>
      <li><a href="#docs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/></svg>Docs</a></li>
      <li><a href="#changelog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1.25rem" height="1.25rem" aria-hidden="true"><path d="M4 12a8 8 0 1 1 2.4 5.7"/><path d="M4 12V8M4 12h4"/><path d="M12 8v4l3 2"/></svg>Changelog</a></li>
    </ul>
  </nav>
  <div class="install">
    <span class="cmd mono">npx skills add srivtx/d-pill</span>
    <a class="btn primary" href="https://github.com/srivtx/d-pill">Install</a>
  </div>
</div>`,
  },
];
