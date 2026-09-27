// Task 19-c — d-pill gallery blocks: overlays and feedback
// (dialog, drawer, tooltips, popover, toasts, alerts, progress, skeleton, code input, consent bar).

import type { BlockRecord } from "./types";

export const OVERLAY_BLOCKS: BlockRecord[] = [
  {
    id: "ov-dialog",
    name: "Confirm dialog",
    category: "Overlays & feedback",
    tags: ["dialog", "modal", "scrim", "backdrop", "confirm", "overlay"],
    code: `
<div class="blk blk-ov-dialog">
  <style>
    .blk-ov-dialog { display: grid; gap: var(--space-3); }
    .blk-ov-dialog .stage { position: relative; padding: var(--space-4); border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); }
    .blk-ov-dialog .pg { display: grid; gap: var(--space-2); }
    .blk-ov-dialog .pg span { height: var(--space-2); border-radius: var(--radius-full); background: var(--line); }
    .blk-ov-dialog .scrim { position: absolute; inset: 0; z-index: var(--z-dialog); background: oklch(0 0 var(--hue) / 0.48); }
    .blk-ov-dialog dialog { position: relative; z-index: var(--z-dialog); width: min(24rem, 100%); margin: var(--space-3) auto 0; padding: 0; border: var(--border); border-radius: var(--radius-lg); background: var(--surface); color: var(--ink); box-shadow: var(--shadow-overlay); }
    .blk-ov-dialog dialog::backdrop { background: oklch(0 0 var(--hue) / 0.48); }
    .blk-ov-dialog .bd { display: grid; gap: var(--space-2); padding: var(--space-5); }
    .blk-ov-dialog .bd p { color: var(--ink-muted); }
    .blk-ov-dialog .ft { display: flex; justify-content: flex-end; gap: var(--space-2); padding: var(--space-3) var(--space-5); border-top: var(--border); background: var(--bg-subtle); }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-dialog * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="stage">
    <div class="pg" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="scrim" aria-hidden="true"></div>
    <dialog open aria-labelledby="blk-ov-dialog-t">
      <div class="bd">
        <h3 id="blk-ov-dialog-t">Re-run the audit?</h3>
        <p>The last run stopped at file 41 of 64. Re-running reads every file again; both exits stay in the log.</p>
      </div>
      <div class="ft">
        <button type="button">Cancel</button>
        <button type="button" class="primary">Re-run now</button>
      </div>
    </dialog>
  </div>
  <p class="quiet">::backdrop carries the same scrim, so showModal needs no second rule.</p>
</div>`,
  },
  {
    id: "ov-drawer",
    name: "Side drawer",
    category: "Overlays & feedback",
    tags: ["drawer", "sheet", "panel", "settings", "overlay", "scrim"],
    code: `
<div class="blk blk-ov-drawer">
  <style>
    .blk-ov-drawer { display: grid; gap: var(--space-3); }
    .blk-ov-drawer .stage { position: relative; height: 19rem; overflow: hidden; border: var(--border); border-radius: var(--radius-lg); background: var(--bg); }
    .blk-ov-drawer .pg { display: grid; gap: var(--space-3); padding: var(--space-4); }
    .blk-ov-drawer .pg span { height: var(--space-2); border-radius: var(--radius-full); background: var(--bg-subtle); }
    .blk-ov-drawer .pg .w2 { width: 72%; }
    .blk-ov-drawer .pg .w3 { width: 52%; }
    .blk-ov-drawer .scrim { position: absolute; inset: 0; z-index: var(--z-dropdown); background: oklch(0 0 var(--hue) / 0.48); }
    .blk-ov-drawer .sheet { position: absolute; inset-block: 0; inset-inline-end: 0; z-index: var(--z-drawer); width: min(17rem, 82%); display: flex; flex-direction: column; background: var(--surface); border-left: var(--border); box-shadow: var(--shadow-overlay); }
    .blk-ov-drawer .hd { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: var(--space-3) var(--space-4); border-bottom: var(--border); }
    .blk-ov-drawer .rows { flex: 1; display: flex; flex-direction: column; padding: var(--space-1) var(--space-4); }
    .blk-ov-drawer .r { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block: var(--space-3); border-bottom: var(--border); font-size: var(--text-sm); }
    .blk-ov-drawer .r:last-child { border-bottom: 0; }
    .blk-ov-drawer .v { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-ov-drawer .x:hover { background: var(--danger-soft); color: var(--danger); }
    .blk-ov-drawer .x:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-ov-drawer .ft { padding: var(--space-3) var(--space-4); border-top: var(--border); }
    .blk-ov-drawer .ft .primary { width: 100%; }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-drawer * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="stage">
    <div class="pg" aria-hidden="true">
      <span></span><span class="w2"></span><span class="w3"></span><span class="w2"></span><span class="w3"></span>
    </div>
    <div class="scrim" aria-hidden="true"></div>
    <aside class="sheet">
      <div class="hd">
        <h3>Batch audit</h3>
        <button type="button" class="icon x" aria-label="Close drawer"><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg></button>
      </div>
      <div class="rows">
        <div class="r"><span>Strict warnings</span><span class="v">on</span></div>
        <div class="r"><span>Concurrency</span><span class="v">4</span></div>
        <div class="r"><span>Output</span><span class="v">stderr</span></div>
      </div>
      <div class="ft"><button type="button" class="primary">Run on 12 files</button></div>
    </aside>
  </div>
  <p class="quiet">Scrim at 20, sheet at 40 — the z scale declares the stack.</p>
</div>`,
  },
  {
    id: "ov-tooltip",
    name: "Icon tooltips",
    category: "Overlays & feedback",
    tags: ["tooltip", "hint", "icon", "hover", "focus", "pure-css"],
    code: `
<div class="blk blk-ov-tooltip">
  <style>
    .blk-ov-tooltip { display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-ov-tooltip .trow { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); border: var(--border); border-radius: var(--radius); background: var(--surface); }
    .blk-ov-tooltip .fn { flex: 1; min-width: 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-ov-tooltip .acts { display: flex; gap: var(--space-2); }
    .blk-ov-tooltip button { position: relative; }
    .blk-ov-tooltip button::after { content: attr(data-tip); position: absolute; inset-block-start: calc(100% + var(--space-2)); inset-inline-start: 50%; transform: translateX(-50%); z-index: var(--z-dropdown); padding: var(--space-1) var(--space-2); border-radius: var(--radius); background: var(--ink); color: var(--bg); font-size: var(--text-xs); font-weight: 500; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity var(--dur-1) var(--ease-out), visibility var(--dur-1) var(--ease-out); }
    .blk-ov-tooltip button:hover { background: var(--accent-soft); }
    .blk-ov-tooltip button:hover::after, .blk-ov-tooltip button:focus-visible::after { opacity: 1; visibility: visible; }
    .blk-ov-tooltip button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-tooltip * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Row actions</p>
  <div class="trow">
    <span class="fn">src/app/page.tsx</span>
    <div class="acts">
      <button type="button" class="icon" data-tip="Delete row" aria-label="Delete row"><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v5"/><path d="M14 11v5"/></svg></button>
      <button type="button" class="icon" data-tip="Archive row" aria-label="Archive row"><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><path d="M10 13h4"/></svg></button>
      <button type="button" class="icon" data-tip="Pin row" aria-label="Pin row"><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15v6"/><path d="M9 3h6v7l3 3H6l3-3V3z"/></svg></button>
    </div>
  </div>
  <p class="quiet">Hover or tab — the tip follows focus, not the pointer.</p>
</div>`,
  },
  {
    id: "ov-popover",
    name: "Popover menu",
    category: "Overlays & feedback",
    tags: ["popover", "menu", "details", "actions", "no-js", "dropdown"],
    code: `
<div class="blk blk-ov-popover">
  <style>
    .blk-ov-popover { display: flex; flex-direction: column; gap: var(--space-3); }
    .blk-ov-popover details { position: relative; width: fit-content; }
    .blk-ov-popover summary { display: inline-flex; align-items: center; gap: var(--space-2); height: var(--control-h); padding-inline: var(--space-3); border: var(--border-strong); border-radius: var(--radius-full); background: var(--surface); color: var(--ink); font-size: var(--text-sm); cursor: pointer; list-style: none; }
    .blk-ov-popover summary::-webkit-details-marker { display: none; }
    .blk-ov-popover summary svg { color: var(--ink-muted); transition: transform var(--dur-1) var(--ease-out); }
    .blk-ov-popover details[open] summary svg { transform: rotate(180deg); }
    .blk-ov-popover summary:hover { border-color: var(--accent); }
    .blk-ov-popover summary:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-ov-popover .menu { position: absolute; inset-block-start: calc(100% + var(--space-2)); inset-inline-start: 0; z-index: var(--z-dropdown); display: grid; gap: var(--space-1); min-width: 11rem; padding: var(--space-2); border: var(--border); border-radius: var(--radius); background: var(--surface); box-shadow: var(--shadow-overlay); }
    .blk-ov-popover .menu button { justify-content: flex-start; border-color: transparent; background: transparent; }
    .blk-ov-popover .menu button:hover { background: var(--bg-subtle); }
    .blk-ov-popover .menu button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-ov-popover .menu .warn { color: var(--danger); }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-popover * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">File actions</p>
  <details>
    <summary>File actions <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="menu">
      <button type="button">Rename</button>
      <button type="button">Duplicate</button>
      <button type="button">Move</button>
      <button type="button" class="warn">Delete</button>
    </div>
  </details>
  <p class="quiet">One element, no script — the toggle is native, the panel follows the summary.</p>
</div>`,
  },
  {
    id: "ov-toast-stack",
    name: "Toast stack",
    category: "Overlays & feedback",
    tags: ["toast", "notification", "severity", "feedback", "stack"],
    code: `
<div class="blk blk-ov-toast-stack">
  <style>
    .blk-ov-toast-stack { display: flex; flex-direction: column; gap: var(--space-2); max-width: min(24rem, 100%); }
    .blk-ov-toast-stack .toast { position: relative; z-index: var(--z-toast); display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) var(--space-4); border: var(--border); border-radius: var(--radius); background: var(--surface); color: var(--ink); box-shadow: var(--shadow-overlay); font-size: var(--text-sm); animation: blk-ov-toast-in var(--dur-2) var(--ease-out) both; }
    .blk-ov-toast-stack .t2 { animation-delay: calc(var(--dur-2) / 2); }
    .blk-ov-toast-stack .t3 { animation-delay: var(--dur-2); }
    .blk-ov-toast-stack .dot { flex: none; width: var(--space-2); height: var(--space-2); border-radius: var(--radius-full); }
    .blk-ov-toast-stack .ok .dot { background: var(--ok); }
    .blk-ov-toast-stack .bad .dot { background: var(--danger); }
    .blk-ov-toast-stack .info .dot { background: var(--accent); }
    .blk-ov-toast-stack .msg { flex: 1; min-width: 0; line-height: var(--leading-ui); }
    .blk-ov-toast-stack .ts { flex: none; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); font-variant-numeric: tabular-nums; }
    @keyframes blk-ov-toast-in { from { opacity: 0; transform: translateY(var(--space-1)); } }
    @media (max-width: 480px) {
      .blk-ov-toast-stack .ts { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-toast-stack * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Live findings</p>
  <div class="toast ok"><span class="dot" aria-hidden="true"></span><p class="msg">Gate passed — 0 errors, 0 warnings.</p><span class="ts">18:41:07</span></div>
  <div class="toast bad t2"><span class="dot" aria-hidden="true"></span><p class="msg">2 errors blocked the run.</p><span class="ts">18:41:12</span></div>
  <div class="toast info t3"><span class="dot" aria-hidden="true"></span><p class="msg">Tokens re-exported — 85 total.</p><span class="ts">18:41:15</span></div>
  <p class="quiet">Severity on the left, the clock on the right — both tabular.</p>
</div>`,
  },
  {
    id: "ov-alert-rows",
    name: "Alert banners",
    category: "Overlays & feedback",
    tags: ["alert", "banner", "info", "ok", "warn", "danger", "feedback"],
    code: `
<div class="blk blk-ov-alert-rows">
  <style>
    .blk-ov-alert-rows { display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-ov-alert-rows .banner { display: flex; align-items: start; gap: var(--space-3); border: var(--border); border-radius: var(--radius); }
    .blk-ov-alert-rows .banner svg { flex: none; margin-block-start: var(--space-1); }
    .blk-ov-alert-rows .b-ok { background: color-mix(in oklch, var(--ok) 12%, var(--bg)); }
    .blk-ov-alert-rows .b-ok svg { color: var(--ok); }
    .blk-ov-alert-rows .b-warn { background: color-mix(in oklch, var(--warn) 16%, var(--bg)); }
    .blk-ov-alert-rows .b-warn svg { color: var(--warn); }
    .blk-ov-alert-rows .b-danger { background: var(--danger-soft); }
    .blk-ov-alert-rows .b-danger svg { color: var(--danger); }
    .blk-ov-alert-rows .b-info svg { color: var(--accent); }
    .blk-ov-alert-rows .tx { display: grid; gap: var(--space-1); }
    .blk-ov-alert-rows .tx strong { font-size: var(--text-sm); font-weight: 600; }
    .blk-ov-alert-rows .tx p { color: var(--ink-muted); font-size: var(--text-sm); }
    @media (max-width: 640px) {
      .blk-ov-alert-rows .banner { flex-direction: column; gap: var(--space-2); }
      .blk-ov-alert-rows .banner svg { margin-block-start: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-alert-rows * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="banner b-info">
    <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M12 12v5"/></svg>
    <div class="tx"><strong>Audit on save</strong><p>Every file is re-checked the moment you save — nothing to remember, nothing to run.</p></div>
  </div>
  <div class="banner b-ok">
    <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>
    <div class="tx"><strong>Exit 0</strong><p>Sixteen rules ran against this page; there is nothing left to fix.</p></div>
  </div>
  <div class="banner b-warn">
    <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 3 21h18z"/><path d="M12 10v5"/><path d="M12 18h.01"/></svg>
    <div class="tx"><strong>3 warnings</strong><p>Strict mode promotes these to errors before the release is cut.</p></div>
  </div>
  <div class="banner b-danger">
    <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg>
    <div class="tx"><strong>2 errors</strong><p>The deploy is blocked until both findings are fixed and the gate re-runs.</p></div>
  </div>
</div>`,
  },
  {
    id: "ov-progress",
    name: "Progress bars",
    category: "Overlays & feedback",
    tags: ["progress", "determinate", "indeterminate", "loading", "bar"],
    code: `
<div class="blk blk-ov-progress">
  <style>
    .blk-ov-progress { display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-ov-progress .set { display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-ov-progress .lbl { display: flex; justify-content: space-between; gap: var(--space-3); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); font-variant-numeric: tabular-nums; }
    .blk-ov-progress .lbl b { color: var(--ink); font-weight: 500; }
    .blk-ov-progress .track { position: relative; height: var(--space-2); border: var(--border); border-radius: var(--radius-full); background: var(--bg-subtle); overflow: hidden; }
    .blk-ov-progress .fill { height: 100%; width: 64%; border-radius: var(--radius-full); background: var(--accent); }
    .blk-ov-progress .track .fill { transition: width var(--dur-2) var(--ease-out); }
    .blk-ov-progress .sweep { position: absolute; inset-block: 0; inset-inline-start: -40%; width: 40%; border-radius: var(--radius-full); background: linear-gradient(90deg, transparent, var(--accent) 50%, transparent); animation: blk-ov-sweep calc(var(--dur-3) * 5) linear infinite; }
    @keyframes blk-ov-sweep { to { transform: translateX(350%); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-progress * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="set">
    <div class="lbl"><span>critique.py — 41 of 64 files</span><b>64%</b></div>
    <div class="track"><div class="fill"></div></div>
  </div>
  <div class="set">
    <div class="lbl"><span>critique.py --watch</span><b>running</b></div>
    <div class="track"><div class="sweep" aria-hidden="true"></div></div>
  </div>
  <p class="quiet">One bar counts files; the sweep keeps time without inventing numbers.</p>
</div>`,
  },
  {
    id: "ov-article-skeleton",
    name: "Article skeleton",
    category: "Overlays & feedback",
    tags: ["skeleton", "loading", "shimmer", "placeholder", "pulse"],
    code: `
<div class="blk blk-ov-article-skeleton">
  <style>
    .blk-ov-article-skeleton { display: grid; gap: var(--space-4); }
    .blk-ov-article-skeleton .hd { display: flex; align-items: center; gap: var(--space-3); }
    .blk-ov-article-skeleton .av { flex: none; width: var(--control-h); height: var(--control-h); border-radius: var(--radius-full); background: var(--bg-subtle); animation: blk-ov-pulse var(--dur-3) linear infinite; }
    .blk-ov-article-skeleton .who { display: grid; gap: var(--space-1); }
    .blk-ov-article-skeleton .who span:first-child { width: 30%; }
    .blk-ov-article-skeleton .who span:last-child { width: 44%; }
    .blk-ov-article-skeleton .art { display: grid; gap: var(--space-2); }
    .blk-ov-article-skeleton .ln { height: var(--space-2); border-radius: var(--radius-full); background: var(--bg-subtle); animation: blk-ov-pulse var(--dur-3) linear infinite; }
    .blk-ov-article-skeleton .art span:nth-child(2) { width: 92%; animation-delay: calc(var(--dur-3) / 4); }
    .blk-ov-article-skeleton .art span:nth-child(3) { width: 58%; }
    .blk-ov-article-skeleton .im { height: 9rem; border: var(--border); border-radius: var(--radius-lg); background: var(--bg-subtle); animation: blk-ov-pulse var(--dur-3) linear infinite; animation-delay: calc(var(--dur-3) / 2); }
    @keyframes blk-ov-pulse { 50% { opacity: 0.55; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-article-skeleton * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div aria-hidden="true">
    <div class="hd"><span class="av"></span><span class="who"><span class="ln"></span><span class="ln"></span></span></div>
    <div class="art"><span class="ln"></span><span class="ln"></span><span class="ln"></span></div>
    <div class="im"></div>
  </div>
  <p class="quiet">Reading the changelog — space is reserved, nothing shifts when text lands.</p>
</div>`,
  },
  {
    id: "ov-otp-inputs",
    name: "Code input",
    category: "Overlays & feedback",
    tags: ["otp", "code", "verification", "input", "caret", "auth"],
    code: `
<div class="blk blk-ov-otp-inputs">
  <style>
    .blk-ov-otp-inputs { display: flex; flex-direction: column; gap: var(--space-4); max-width: min(22rem, 100%); }
    .blk-ov-otp-inputs .cells { display: flex; gap: var(--space-2); }
    .blk-ov-otp-inputs .cell { display: grid; place-items: center; width: var(--control-h); height: var(--control-h); border: var(--border-strong); border-radius: var(--radius); background: var(--surface); font-family: var(--font-mono); font-size: var(--text-lg); color: var(--ink); }
    .blk-ov-otp-inputs .cell.gap { margin-inline-start: var(--space-3); }
    .blk-ov-otp-inputs .cell.cur { border-color: var(--accent); }
    .blk-ov-otp-inputs .caret { width: 1px; height: var(--space-3); border-radius: var(--radius); background: var(--accent); animation: blk-ov-blink calc(var(--dur-3) * 5) steps(1) infinite; }
    @keyframes blk-ov-blink { 50% { opacity: 0; } }
    @media (max-width: 400px) {
      .blk-ov-otp-inputs .cells { flex-wrap: wrap; }
    }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-otp-inputs * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="cells" aria-hidden="true">
    <div class="cell">4</div>
    <div class="cell">1</div>
    <div class="cell cur"><span class="caret"></span></div>
    <div class="cell gap"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <p class="hint">Six digits from the terminal — they expire with the session.</p>
  <button type="button" class="primary">Verify</button>
</div>`,
  },
  {
    id: "ov-consent-bar",
    name: "Consent bar",
    category: "Overlays & feedback",
    tags: ["consent", "cookie", "privacy", "banner", "bottom", "overlay"],
    code: `
<div class="blk blk-ov-consent-bar">
  <style>
    .blk-ov-consent-bar { display: grid; gap: var(--space-3); }
    .blk-ov-consent-bar .stage { position: relative; height: 17rem; overflow: hidden; border: var(--border); border-radius: var(--radius-lg); background: var(--bg); }
    .blk-ov-consent-bar .pg { display: grid; gap: var(--space-3); padding: var(--space-4); }
    .blk-ov-consent-bar .pg span { height: var(--space-2); border-radius: var(--radius-full); background: var(--bg-subtle); }
    .blk-ov-consent-bar .pg .w2 { width: 70%; }
    .blk-ov-consent-bar .pg .w3 { width: 50%; }
    .blk-ov-consent-bar .bar { position: absolute; inset-inline: 0; bottom: 0; z-index: var(--z-toast); display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-3); padding: var(--space-3) var(--space-4); border-top: var(--border); background: var(--surface); box-shadow: var(--shadow-overlay); }
    .blk-ov-consent-bar .bar p { flex: 1; min-width: min(16rem, 100%); color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-ov-consent-bar .bar a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; }
    .blk-ov-consent-bar .bar a:hover { color: var(--ink); }
    .blk-ov-consent-bar .bar a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-ov-consent-bar .act { display: flex; gap: var(--space-2); }
    @media (prefers-reduced-motion: reduce) {
      .blk-ov-consent-bar * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="stage">
    <div class="pg" aria-hidden="true"><span></span><span class="w2"></span><span class="w3"></span><span class="w2"></span></div>
    <div class="bar">
      <p>The audit runs on-device — nothing is stored, nothing is sent. <a href="https://github.com/srivtx/d-pill">Read the source</a>.</p>
      <div class="act">
        <button type="button" class="ghost">Decline</button>
        <button type="button" class="primary">Accept</button>
      </div>
    </div>
  </div>
  <p class="quiet">Layer 60 — the bar holds the page until a choice is made.</p>
</div>`,
  },
];
