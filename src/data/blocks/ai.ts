// Task 18-b — d-pill gallery blocks: AI surfaces (chat, agent console, command palette, stream state).

import type { BlockRecord } from "./types";

export const AI_BLOCKS: BlockRecord[] = [
  {
    id: "chat-interface",
    name: "Chat interface",
    category: "AI surfaces",
    tags: ["chat", "assistant", "citations", "composer", "streaming"],
    code: `
<div class="blk blk-chat-interface">
  <style>
    .blk-chat-interface { display: flex; flex-direction: column; }
    .blk-chat-interface .pane { border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: hidden; }
    .blk-chat-interface .head { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-4); border-bottom: var(--border); }
    .blk-chat-interface .av { flex: none; width: var(--space-5); height: var(--space-5); border-radius: var(--radius-full); background: linear-gradient(140deg, oklch(0.78 0.13 calc(var(--hue) - 60)), oklch(0.68 0.12 var(--hue))); }
    .blk-chat-interface .who { font-weight: 600; font-size: var(--text-sm); }
    .blk-chat-interface .head .chip { margin-inline-start: auto; }
    .blk-chat-interface .chip .dot { background: var(--accent); }
    .blk-chat-interface .msgs { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-4); }
    .blk-chat-interface .u { max-width: 38ch; padding: var(--space-3) var(--space-4); background: var(--bg-subtle); border: var(--border); border-radius: var(--radius-lg); font-size: var(--text-sm); }
    .blk-chat-interface .a { display: flex; flex-direction: column; gap: var(--space-2); padding-inline-start: var(--space-3); border-inline-start: var(--border); }
    .blk-chat-interface .a p { font-size: var(--text-sm); }
    .blk-chat-interface .cites { display: flex; flex-wrap: wrap; gap: var(--space-2); }
    .blk-chat-interface .cites .mono { color: var(--accent); }
    .blk-chat-interface .composer { display: flex; gap: var(--space-2); padding: var(--space-3); border-top: var(--border); }
    .blk-chat-interface .composer input { flex: 1; min-width: 0; }
    @media (prefers-reduced-motion: reduce) {
      .blk-chat-interface * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="pane">
    <div class="head">
      <span class="av" aria-hidden="true"></span>
      <span class="who">d-pill assistant</span>
      <span class="chip"><span class="dot" aria-hidden="true"></span>streaming</span>
    </div>
    <div class="msgs">
      <p class="u">Run the gate on src/app/page.tsx and tell me what fails.</p>
      <div class="a">
        <p>Two findings. Line 41 pads with 14px — off the space scale; --space-3 is the 12px you meant. Line 88 writes 300ms beside var(--ease-out); --dur-3 is the 240ms you meant. The rest of the page is clean.</p>
        <div class="cites">
          <span class="chip"><span class="mono">[1]</span> references/tokens.json</span>
          <span class="chip"><span class="mono">[2]</span> references/critique.md</span>
        </div>
      </div>
    </div>
    <div class="composer">
      <input type="text" placeholder="Ask about the system…" aria-label="Message the assistant">
      <button type="button" class="icon" aria-label="Send message">
        <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7" /></svg>
      </button>
    </div>
  </div>
</div>`,
  },
  {
    id: "agent-console",
    name: "Agent console",
    category: "AI surfaces",
    tags: ["agent", "tool call", "approval", "findings", "console"],
    code: `
<div class="blk blk-agent-console">
  <style>
    .blk-agent-console { display: flex; flex-direction: column; }
    .blk-agent-console .card { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-4); border: var(--border); border-radius: var(--radius-lg); background: var(--surface); }
    .blk-agent-console .call { margin: 0; padding: var(--space-2) var(--space-3); background: var(--bg-subtle); border: var(--border); border-radius: var(--radius); font-family: var(--font-mono); font-size: var(--text-sm); }
    .blk-agent-console .finds { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-agent-console .finds li { display: flex; align-items: center; gap: var(--space-2); }
    .blk-agent-console .sd { flex: none; width: var(--space-2); height: var(--space-2); border-radius: var(--radius-full); }
    .blk-agent-console .sd.e { background: var(--danger); }
    .blk-agent-console .sd.w { background: var(--warn); }
    .blk-agent-console .finds .t { font-size: var(--text-sm); line-height: var(--leading-ui); }
    .blk-agent-console .finds .r { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); }
    .blk-agent-console .acts { display: flex; gap: var(--space-2); align-items: center; }
    .blk-agent-console .stat { display: flex; align-items: center; gap: var(--space-2); margin: 0; padding-top: var(--space-3); border-top: var(--border); font-size: var(--text-sm); color: var(--ink-muted); }
    .blk-agent-console .okd { flex: none; width: var(--space-2); height: var(--space-2); border-radius: var(--radius-full); background: var(--ok); }
    @media (prefers-reduced-motion: reduce) {
      .blk-agent-console * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="card">
    <p class="caps">Tool call</p>
    <p class="call">critique src/app/page.tsx</p>
    <ul class="finds">
      <li><span class="sd e" aria-hidden="true"></span><span class="t"><span class="r">space-off-scale</span> · page.tsx:41 · 14px margin → --space-3</span></li>
      <li><span class="sd w" aria-hidden="true"></span><span class="t"><span class="r">duration-off-scale</span> · page.tsx:88 · 300ms → --dur-3</span></li>
    </ul>
    <div class="acts">
      <button type="button" class="primary">Approve</button>
      <button type="button" class="ghost">Revise</button>
    </div>
    <p class="stat"><span class="okd" aria-hidden="true"></span>Fixes staged — one line each, no new tokens.</p>
  </div>
</div>`,
  },
  {
    id: "command-palette",
    name: "Command palette",
    category: "AI surfaces",
    tags: ["palette", "commands", "search", "kbd", "mono"],
    code: `
<div class="blk blk-command-palette">
  <style>
    .blk-command-palette { display: flex; justify-content: center; }
    .blk-command-palette .pal { width: min(24rem, 100%); border: var(--border); border-radius: var(--radius-lg); background: var(--surface); box-shadow: var(--shadow-overlay); overflow: hidden; }
    .blk-command-palette .srch { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); border-bottom: var(--border); }
    .blk-command-palette .srch svg { flex: none; color: var(--ink-muted); }
    .blk-command-palette .srch input { flex: 1; min-width: 0; border: 0; background: transparent; padding-inline: 0; font-family: var(--font-mono); font-size: var(--text-sm); }
    .blk-command-palette kbd { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); border: var(--border); border-radius: var(--radius-sm); background: var(--bg-subtle); padding: var(--space-1) var(--space-2); }
    .blk-command-palette .body { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-2); }
    .blk-command-palette .gl { margin: 0; padding: var(--space-2) var(--space-3) var(--space-1); font-family: var(--font-mono); }
    .blk-command-palette .item { display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); width: 100%; height: auto; min-height: var(--control-h); border: 0; border-radius: var(--radius); background: transparent; color: var(--ink); font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 400; padding: var(--space-2) var(--space-3); }
    .blk-command-palette .item:hover { background: var(--bg-subtle); }
    .blk-command-palette .item:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
    .blk-command-palette .item.hi { background: var(--accent-soft); font-weight: 500; }
    .blk-command-palette .item.hi:hover { background: var(--accent-soft); }
    .blk-command-palette .foot { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); margin: 0; padding: var(--space-2) var(--space-3); border-top: var(--border); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    @media (prefers-reduced-motion: reduce) {
      .blk-command-palette * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="pal" role="dialog" aria-label="Command palette">
    <div class="srch">
      <svg viewBox="0 0 24 24" width="1.25rem" height="1.25rem" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <input type="text" placeholder="Type a command…" aria-label="Search commands">
      <kbd>esc</kbd>
    </div>
    <div class="body">
      <p class="caps gl">Run</p>
      <button type="button" class="item hi" aria-current="true"><span>Run the gate on this page</span><kbd>↵</kbd></button>
      <button type="button" class="item"><span>Re-check the token export</span></button>
      <button type="button" class="item"><span>Copy the install command</span></button>
      <p class="caps gl">Read</p>
      <button type="button" class="item"><span>Open the sixteen laws</span></button>
      <button type="button" class="item"><span>Read the rules registry</span></button>
    </div>
    <p class="foot"><kbd>↑</kbd><kbd>↓</kbd> move · <kbd>↵</kbd> run · <kbd>esc</kbd> close</p>
  </div>
</div>`,
  },
  {
    id: "stream-state",
    name: "Stream state",
    category: "AI surfaces",
    tags: ["streaming", "caret", "generation", "typing", "animation"],
    code: `
<div class="blk blk-stream-state">
  <style>
    .blk-stream-state { display: flex; flex-direction: column; gap: var(--space-2); max-width: 44ch; }
    .blk-stream-state .msg { display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-stream-state .line { margin: 0; font-size: var(--text-md); line-height: var(--leading-body); }
    .blk-stream-state .l3 { display: flex; align-items: flex-start; gap: var(--space-1); }
    .blk-stream-state .l3 > span { min-width: 0; }
    .blk-stream-state .caret {
      flex: none;
      width: var(--space-2);
      height: calc(var(--leading-body) * 2em);
      background: var(--accent);
      border-radius: var(--radius-sm);
      animation: blk-stream-caret var(--dur-3) steps(1) infinite;
    }
    @keyframes blk-stream-caret { 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-stream-state * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="msg">
    <p class="line">The gate reads markup the way a browser does —</p>
    <p class="line">every value against its scale, every control</p>
    <p class="line l3"><span>against its name. Nothing ships unche</span><span class="caret" aria-hidden="true"></span></p>
  </div>
  <p class="quiet">generating…</p>
</div>`,
  },
];
