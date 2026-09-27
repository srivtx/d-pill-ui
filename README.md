# d-pill — the design system that audits itself

The product site for [d-pill](https://github.com/srivtx/d-pill): design
intelligence for the agentic era. 85 tokens, 40 laws, 16 machine-checked rules —
and a critique gate you can run in the page itself.

## What runs here

- **The gate, in your browser.** The skill's Python engine (`critique.py`) is
  ported to TypeScript with proven parity — same rules, same severities, same
  messages, same exit-code contract. Paste HTML or CSS and read findings that
  teach: every finding carries its fix and the law behind it.
- **26 blocks.** Heroes, features, bentos, AI surfaces, forms, tables, pricing,
  navigation — pure HTML and CSS on the token system, no animation library, no
  runtime. Every block is gate-clean, and the page's self-audit scans the styles
  they inject into the live DOM.
- **The token explorer.** All 85 tokens with a live hue dial: turn one variable
  and the entire site — aurora included — re-tints. A contrast matrix computed
  from the token export at the default hue.
- **The laws.** All 40 reference files from the skill, rendered verbatim with
  search.
- **The self-audit.** One click runs the real engine against the rendered DOM.
  The verdict is computed, never asserted.
- **Four install paths.** Skills CLI, Claude plugin marketplace, GitHub Action,
  MCP server.

## Stack

Next.js 16 (App Router) · TypeScript · the d-pill stylesheet itself
(`src/app/globals.css` is the system's `base.css` plus a token-legal site layer —
it passes the gate it advertises). No Tailwind utilities in the UI; no
framer-motion; no animation dependencies. Fonts: Instrument Sans + IBM Plex Mono.

## Develop

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint
```

## Verify the engine port (parity with critique.py)

With a checkout of the [skill repo](https://github.com/srivtx/d-pill) as a
sibling directory (or `DPILL_ROOT` pointing at it):

```bash
bun scripts/parity-test.ts
```

The test runs both engines on the same fixtures and demo pages and requires
identical counts, rules, severities, and messages. The bundled laws are
regenerated from the skill's references with `bun scripts/build-laws.ts`.

## Deploy to Vercel

1. Push this directory to a Git repository.
2. In Vercel: **New Project → Import** the repo. The defaults work —
   framework preset Next.js, no environment variables needed.
3. Ship.

## The claim, precisely

"This page passes its own gate" means: the engine that powers the playground
also runs against the live DOM — every style block the gallery injects, every
attribute React renders — and exits 0. Click **Audit this page** and watch it
happen. That is the whole product in one sentence: design systems that can
check themselves.

MIT license. The system, the laws, and the gate live in
[srivtx/d-pill](https://github.com/srivtx/d-pill).
