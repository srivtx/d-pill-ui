// Task 18-b — d-pill gallery blocks: forms and auth (login card, signup stack, settings rows).

import type { BlockRecord } from "./types";

export const FORM_BLOCKS: BlockRecord[] = [
  {
    id: "login-card",
    name: "Login card",
    category: "Forms & auth",
    tags: ["login", "auth", "form", "card", "password"],
    code: `
<div class="blk blk-login-card">
  <style>
    .blk-login-card { display: flex; justify-content: center; }
    .blk-login-card .card { width: min(24rem, 100%); display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-5); background: var(--surface); border: var(--border); border-radius: var(--radius-lg); }
    .blk-login-card .brand { display: flex; align-items: center; gap: var(--space-2); }
    .blk-login-card .mk { flex: none; width: var(--space-5); height: var(--space-5); border-radius: var(--radius-full); background: linear-gradient(140deg, oklch(0.78 0.13 calc(var(--hue) - 140)), oklch(0.72 0.12 calc(var(--hue) - 60)) 38%, oklch(0.68 0.12 var(--hue)) 62%, oklch(0.75 0.13 calc(var(--hue) + 80))); box-shadow: 0 0 0 1px oklch(0.5 0.02 var(--hue) / 0.35); }
    .blk-login-card .wm { font-weight: 600; letter-spacing: -0.02em; }
    .blk-login-card .brand .caps { margin-inline-start: auto; }
    .blk-login-card .go { width: 100%; }
    .blk-login-card .alt { margin: 0; text-align: center; }
    .blk-login-card .alt a { color: var(--accent); }
    @media (prefers-reduced-motion: reduce) {
      .blk-login-card * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="card">
    <div class="brand">
      <span class="mk" aria-hidden="true"></span>
      <span class="wm">d-pill</span>
      <span class="caps">Sign in</span>
    </div>
    <label class="field" for="blk-login-card-email">
      <span>Email</span>
      <input id="blk-login-card-email" name="email" type="email" autocomplete="email" placeholder="you@studio.example">
    </label>
    <label class="field" for="blk-login-card-password">
      <span>Password</span>
      <input id="blk-login-card-password" name="password" type="password" autocomplete="current-password">
    </label>
    <button type="button" class="primary go">Sign in</button>
    <p class="quiet alt">Open source — no account needed. <a href="https://github.com/srivtx/d-pill">Install the skill</a> instead.</p>
  </div>
</div>`,
  },
  {
    id: "signup-stack",
    name: "Signup stack",
    category: "Forms & auth",
    tags: ["signup", "form", "error", "validation", "checkbox"],
    code: `
<div class="blk blk-signup-stack">
  <style>
    .blk-signup-stack { display: flex; flex-direction: column; gap: var(--space-4); max-width: min(26rem, 100%); }
    .blk-signup-stack .handle { font-family: var(--font-mono); }
    .blk-signup-stack .go { width: 100%; }
    @media (prefers-reduced-motion: reduce) {
      .blk-signup-stack * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <label class="field" for="blk-signup-stack-name">
    <span>Name</span>
    <input id="blk-signup-stack-name" name="name" type="text" autocomplete="name" placeholder="Your name">
    <span class="hint">Shown on your contributions.</span>
  </label>
  <label class="field" for="blk-signup-stack-email">
    <span>Email</span>
    <input id="blk-signup-stack-email" name="email" type="email" autocomplete="email" placeholder="you@studio.example">
    <span class="hint">The gate digest, nothing else.</span>
  </label>
  <label class="field" for="blk-signup-stack-handle">
    <span>Handle</span>
    <input id="blk-signup-stack-handle" name="handle" type="text" autocomplete="username" class="handle" value="d.pill" aria-invalid="true" aria-describedby="blk-signup-stack-handle-error">
    <span class="hint">Lowercase, letters and hyphens.</span>
    <span class="error" id="blk-signup-stack-handle-error">Periods are not allowed. Letters and hyphens only.</span>
  </label>
  <label class="choice">
    <input type="checkbox" name="terms">
    <span>I run the gate before I ship.</span>
  </label>
  <button type="button" class="primary go">Create account</button>
</div>`,
  },
  {
    id: "settings-rows",
    name: "Settings rows",
    category: "Forms & auth",
    tags: ["settings", "rows", "toggle", "select", "preferences"],
    code: `
<div class="blk blk-settings-rows">
  <style>
    .blk-settings-rows { display: flex; flex-direction: column; }
    .blk-settings-rows .row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); padding-block: var(--space-3); border-top: var(--border); }
    .blk-settings-rows .row:last-child { border-bottom: var(--border); }
    .blk-settings-rows .l { display: flex; flex-direction: column; gap: var(--space-1); min-width: 0; }
    .blk-settings-rows .t { font-size: var(--text-sm); font-weight: 500; }
    .blk-settings-rows .sel { display: flex; align-items: center; gap: var(--space-2); flex: none; height: var(--control-h); padding-inline: var(--space-3); border: var(--border-strong); border-radius: var(--radius); background: var(--surface); color: var(--ink); font-size: var(--text-sm); }
    .blk-settings-rows .sel svg { color: var(--ink-muted); }
    .blk-settings-rows .tgl { appearance: none; width: var(--space-7); height: var(--space-5); margin: 0; flex: none; position: relative; border: var(--border-strong); border-radius: var(--radius-full); background: var(--bg-subtle); cursor: pointer; transition: background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out); }
    .blk-settings-rows .tgl::before { content: ""; position: absolute; top: var(--space-1); left: var(--space-1); width: var(--space-4); height: var(--space-4); border-radius: var(--radius-full); background: var(--ink-muted); transition: transform var(--dur-2) var(--ease-out), background var(--dur-2) var(--ease-out); }
    .blk-settings-rows .tgl:hover { border-color: var(--accent); }
    .blk-settings-rows .tgl:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-settings-rows .tgl:checked { background: var(--accent-soft); border-color: var(--accent); }
    .blk-settings-rows .tgl:checked::before { transform: translateX(var(--space-5)); background: var(--accent); }
    @media (prefers-reduced-motion: reduce) {
      .blk-settings-rows * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="row">
    <div class="l">
      <span class="t">Theme</span>
      <span class="quiet">Tokens re-tint — one palette, both modes.</span>
    </div>
    <div class="sel"><span>Auto</span><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></div>
  </div>
  <div class="row">
    <div class="l">
      <span class="t">Accent hue</span>
      <span class="quiet">One variable moves every accent.</span>
    </div>
    <div class="sel"><span class="mono">215</span><svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></div>
  </div>
  <div class="row">
    <label class="l" for="blk-settings-rows-strict">
      <span class="t">Strict gate</span>
      <span class="quiet">Warnings fail the run, not only errors.</span>
    </label>
    <input type="checkbox" class="tgl" id="blk-settings-rows-strict" checked>
  </div>
  <div class="row">
    <label class="l" for="blk-settings-rows-quiet">
      <span class="t">Quiet mode</span>
      <span class="quiet">Errors print first; warnings wait.</span>
    </label>
    <input type="checkbox" class="tgl" id="blk-settings-rows-quiet">
  </div>
</div>`,
  },
];
