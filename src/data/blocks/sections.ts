/* Task 19-d — sections gallery blocks: FAQ, contact split, how-it-works, blog
   grid, team grid, timeline, newsletter, changelog, compare, integrations. */
import type { BlockRecord } from "./types";

export const SECTION_BLOCKS: BlockRecord[] = [
  {
    id: "sec-faq",
    name: "FAQ accordion",
    category: "Sections",
    tags: ["faq", "accordion", "details", "summary", "questions", "chevron"],
    code: `<div class="blk blk-sec-faq">
  <style>
    .blk-sec-faq { display: grid; gap: var(--space-4); }
    .blk-sec-faq details { border-top: var(--border); }
    .blk-sec-faq details:last-of-type { border-bottom: var(--border); }
    .blk-sec-faq summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); min-height: var(--control-h); padding-block: var(--space-3); cursor: pointer; font-size: var(--text-md); font-weight: 500; transition: color var(--dur-1) var(--ease-out); }
    .blk-sec-faq summary::-webkit-details-marker { display: none; }
    .blk-sec-faq summary:hover { color: var(--accent); }
    .blk-sec-faq summary:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-sec-faq .chev { flex: none; color: var(--ink-muted); transition: transform var(--dur-2) var(--ease-out); }
    .blk-sec-faq details[open] summary { color: var(--accent); }
    .blk-sec-faq details[open] .chev { transform: rotate(90deg); }
    .blk-sec-faq .a { margin: 0; padding-block-end: var(--space-4); max-width: 60ch; color: var(--ink-muted); line-height: var(--leading-body); }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-faq * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Questions</p>
  <details>
    <summary>Does the gate run in the cloud or on my files?<svg class="chev" aria-hidden="true" viewBox="0 0 16 16" width="1.25rem" height="1.25rem"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></summary>
    <p class="a">On your files. The CLI walks the repo, the site runs the same engine on its own DOM, and both exit with the same codes.</p>
  </details>
  <details>
    <summary>What happens when a rule fails?<svg class="chev" aria-hidden="true" viewBox="0 0 16 16" width="1.25rem" height="1.25rem"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></summary>
    <p class="a">The build stops. Exit 2, the finding, the fix, and the file to read. Taste is never the reason.</p>
  </details>
  <details>
    <summary>Can I change the colors?<svg class="chev" aria-hidden="true" viewBox="0 0 16 16" width="1.25rem" height="1.25rem"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></summary>
    <p class="a">Move one variable. --hue turns every role in oklch, light and dark, marks included. No palette to maintain.</p>
  </details>
  <details>
    <summary>What does it cost?<svg class="chev" aria-hidden="true" viewBox="0 0 16 16" width="1.25rem" height="1.25rem"><path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></summary>
    <p class="a">The tokens, the laws, and the engine are MIT, forever. The hosted runner is optional, billed per month, not per seat.</p>
  </details>
</div>`,
  },
  {
    id: "sec-contact-split",
    name: "Contact split",
    category: "Sections",
    tags: ["contact", "form", "split", "email", "labels", "info"],
    code: `<div class="blk blk-sec-contact-split">
  <style>
    .blk-sec-contact-split { display: grid; gap: var(--space-4); }
    .blk-sec-contact-split .cols { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: var(--space-6); align-items: start; }
    .blk-sec-contact-split form { display: grid; gap: var(--space-4); }
    .blk-sec-contact-split form .btn { justify-self: start; }
    .blk-sec-contact-split .meta { display: grid; gap: var(--space-3); }
    .blk-sec-contact-split dl { margin: 0; display: grid; gap: var(--space-2); }
    .blk-sec-contact-split .mrow { display: grid; grid-template-columns: 9ch minmax(0, 1fr); gap: var(--space-3); align-items: baseline; }
    .blk-sec-contact-split dt { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); text-transform: uppercase; letter-spacing: var(--tracking-caps); }
    .blk-sec-contact-split dd { margin: 0; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--ink); }
    .blk-sec-contact-split dd a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 1px; }
    .blk-sec-contact-split dd a:hover { color: var(--ink); }
    .blk-sec-contact-split dd a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    @media (max-width: 720px) { .blk-sec-contact-split .cols { grid-template-columns: 1fr; gap: var(--space-5); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-contact-split * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Contact</p>
  <h2>Write before you adopt</h2>
  <div class="cols">
    <form>
      <div class="field"><label for="blk-sec-contact-name">Name</label><input id="blk-sec-contact-name" name="name" autocomplete="name"></div>
      <div class="field"><label for="blk-sec-contact-email">Email</label><input type="email" id="blk-sec-contact-email" name="email" autocomplete="email"></div>
      <div class="field"><label for="blk-sec-contact-msg">Message</label><textarea id="blk-sec-contact-msg" name="message" rows="4" placeholder="What are you building it into?"></textarea></div>
      <button class="btn primary" type="submit">Send message</button>
    </form>
    <aside class="meta panel">
      <p class="caps">Direct</p>
      <dl>
        <div class="mrow"><dt>response</dt><dd>one business day</dd></div>
        <div class="mrow"><dt>hours</dt><dd>09:00–17:00 UTC, weekdays</dd></div>
        <div class="mrow"><dt>mail</dt><dd><a href="mailto:gate@dpill.dev">gate@dpill.dev</a></dd></div>
      </dl>
      <p class="quiet">Bugs move faster as issues. Open one and the gate reads it too.</p>
    </aside>
  </div>
</div>`,
  },
  {
    id: "sec-how-it-works",
    name: "How it works steps",
    category: "Sections",
    tags: ["steps", "numbered", "process", "how", "hairline"],
    code: `<div class="blk blk-sec-how-it-works">
  <style>
    .blk-sec-how-it-works { display: grid; gap: var(--space-4); }
    .blk-sec-how-it-works .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); border-top: var(--border); }
    .blk-sec-how-it-works .step { position: relative; display: flex; flex-direction: column; gap: var(--space-2); padding-block-start: var(--space-4); }
    .blk-sec-how-it-works .n { position: absolute; top: calc(var(--space-2) * -1); font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent); background: var(--bg); padding-inline-end: var(--space-2); line-height: var(--leading-ui); }
    .blk-sec-how-it-works h3 { margin: 0; }
    .blk-sec-how-it-works .s { margin: 0; max-width: 34ch; color: var(--ink-muted); font-size: var(--text-sm); line-height: var(--leading-body); }
    @media (max-width: 720px) { .blk-sec-how-it-works .steps { grid-template-columns: 1fr; gap: var(--space-5); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-how-it-works * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">How it works</p>
  <h2>Three steps, no ceremony</h2>
  <div class="steps">
    <div class="step">
      <span class="n">01</span>
      <h3>Install</h3>
      <p class="s">One command lands the tokens, the laws, and the gate in your repo.</p>
    </div>
    <div class="step">
      <span class="n">02</span>
      <h3>Author</h3>
      <p class="s">You write HTML and CSS. The roles and the scales make the decisions.</p>
    </div>
    <div class="step">
      <span class="n">03</span>
      <h3>Gate</h3>
      <p class="s">Every push is critiqued. Exit 0 merges; exit 2 teaches.</p>
    </div>
  </div>
  <p class="quiet">No build step, no runtime, no style props. The gate reads what the browser reads.</p>
</div>`,
  },
  {
    id: "sec-blog-grid",
    name: "Blog grid",
    category: "Sections",
    tags: ["blog", "articles", "cards", "covers", "writing", "grid"],
    code: `<div class="blk blk-sec-blog-grid">
  <style>
    .blk-sec-blog-grid { display: grid; gap: var(--space-4); }
    .blk-sec-blog-grid .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
    .blk-sec-blog-grid a.card { display: flex; flex-direction: column; text-decoration: none; color: inherit; background: var(--surface); border: var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: border-color var(--dur-1) var(--ease-out); }
    .blk-sec-blog-grid a.card:hover { border-color: var(--line-strong); }
    .blk-sec-blog-grid a.card:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-sec-blog-grid .cover { height: var(--space-8); border-block-end: var(--border); }
    .blk-sec-blog-grid .c1 { background-color: var(--bg-subtle); background-image: radial-gradient(color-mix(in oklch, var(--accent) 40%, transparent) 1px, transparent 1px); background-size: var(--space-3) var(--space-3); }
    .blk-sec-blog-grid .c2 { background-color: var(--bg-subtle); background-image: repeating-linear-gradient(45deg, var(--line-strong) 0 1px, transparent 1px var(--space-3)); }
    .blk-sec-blog-grid .c3 { background: linear-gradient(160deg, var(--accent-soft), var(--bg-subtle) 75%); }
    .blk-sec-blog-grid .body { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-sec-blog-grid h3 { margin: 0; }
    .blk-sec-blog-grid .meta { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    @media (max-width: 720px) { .blk-sec-blog-grid .cards { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-blog-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Writing</p>
  <div class="cards">
    <a class="card" href="https://github.com/srivtx/d-pill">
      <div class="cover c1" aria-hidden="true"></div>
      <div class="body">
        <span class="caps">Tokens</span>
        <h3>One variable moves every color</h3>
        <span class="meta">Feb 12 · 6 min</span>
      </div>
    </a>
    <a class="card" href="https://github.com/srivtx/d-pill">
      <div class="cover c2" aria-hidden="true"></div>
      <div class="body">
        <span class="caps">Process</span>
        <h3>Exit codes over eyeballs</h3>
        <span class="meta">Jan 30 · 4 min</span>
      </div>
    </a>
    <a class="card" href="https://github.com/srivtx/d-pill">
      <div class="cover c3" aria-hidden="true"></div>
      <div class="body">
        <span class="caps">Releases</span>
        <h3>A release is a tag away</h3>
        <span class="meta">Jan 09 · 3 min</span>
      </div>
    </a>
  </div>
</div>`,
  },
  {
    id: "sec-team-grid",
    name: "Team grid",
    category: "Sections",
    tags: ["team", "people", "avatars", "initials", "cards", "grid"],
    code: `<div class="blk blk-sec-team-grid">
  <style>
    .blk-sec-team-grid { display: grid; gap: var(--space-4); }
    .blk-sec-team-grid .team { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); }
    .blk-sec-team-grid .person { background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-sec-team-grid .av { flex: none; width: var(--space-6); height: var(--space-6); border-radius: var(--radius-full); border: 1px solid color-mix(in oklch, var(--accent) 25%, transparent); color: var(--ink); display: flex; align-items: center; justify-content: center; font-size: var(--text-sm); font-weight: 600; letter-spacing: var(--tracking-caps); }
    .blk-sec-team-grid .p1 .av { background: color-mix(in oklch, oklch(0.58 0.14 var(--hue)) 24%, var(--surface)); }
    .blk-sec-team-grid .p2 .av { background: color-mix(in oklch, oklch(0.58 0.14 var(--hue)) 32%, var(--surface)); }
    .blk-sec-team-grid .p3 .av { background: color-mix(in oklch, oklch(0.58 0.14 var(--hue)) 40%, var(--surface)); }
    .blk-sec-team-grid .p4 .av { background: color-mix(in oklch, oklch(0.58 0.14 var(--hue)) 48%, var(--surface)); }
    .blk-sec-team-grid .nm { margin: 0; font-weight: 600; font-size: var(--text-md); }
    .blk-sec-team-grid .rl { margin: 0; color: var(--ink-muted); font-size: var(--text-sm); }
    .blk-sec-team-grid .ln { margin: 0; color: var(--ink-muted); font-size: var(--text-sm); line-height: var(--leading-body); }
    @media (max-width: 720px) { .blk-sec-team-grid .team { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-team-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">People</p>
  <div class="team">
    <div class="person p1"><span class="av" aria-hidden="true">RV</span><p class="nm">Rowan Vale</p><p class="rl">Tokens</p><p class="ln">Wrote the scales you import.</p></div>
    <div class="person p2"><span class="av" aria-hidden="true">IK</span><p class="nm">Ines Kaur</p><p class="rl">Engine</p><p class="ln">Keeps two engines agreeing.</p></div>
    <div class="person p3"><span class="av" aria-hidden="true">DO</span><p class="nm">Dana Okafor</p><p class="rl">Docs</p><p class="ln">Turns findings into reading.</p></div>
    <div class="person p4"><span class="av" aria-hidden="true">MP</span><p class="nm">Milo Park</p><p class="rl">Gate</p><p class="ln">Owns exit code 2.</p></div>
  </div>
</div>`,
  },
  {
    id: "sec-timeline",
    name: "Version timeline",
    category: "Sections",
    tags: ["timeline", "changelog", "spine", "dots", "versions", "history"],
    code: `<div class="blk blk-sec-timeline">
  <style>
    .blk-sec-timeline { display: grid; gap: var(--space-4); }
    .blk-sec-timeline .tl { list-style: none; margin: 0; padding: 0; padding-inline-start: var(--space-5); border-inline-start: var(--border); display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-sec-timeline .tl li { position: relative; display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-sec-timeline .tl li::before { content: ""; position: absolute; left: calc(var(--space-5) * -1 - var(--space-2) / 2); top: var(--space-1); width: var(--space-2); height: var(--space-2); border-radius: var(--radius-full); background: var(--surface); border: var(--border-strong); }
    .blk-sec-timeline .tl li:first-child::before { background: var(--accent); border-color: var(--accent); }
    .blk-sec-timeline .head { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); }
    .blk-sec-timeline .vt { color: var(--accent); }
    .blk-sec-timeline .dt { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-sec-timeline .what { margin: 0; max-width: 52ch; color: var(--ink); font-size: var(--text-sm); line-height: var(--leading-body); }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-timeline * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Timeline</p>
  <ol class="tl">
    <li>
      <div class="head"><span class="chip mono num vt">v1.6.0</span><span class="dt">Jan 28</span></div>
      <p class="what">Findings teach. Every one carries its fix and the file behind the rule.</p>
    </li>
    <li>
      <div class="head"><span class="chip mono num vt">v1.5.0</span><span class="dt">Dec 09</span></div>
      <p class="what">Tokens speak DTCG. Design tools read the export directly, no bridge.</p>
    </li>
    <li>
      <div class="head"><span class="chip mono num vt">v1.4.0</span><span class="dt">Oct 21</span></div>
      <p class="what">Strict mode reaches CI. Warnings stop merges too.</p>
    </li>
    <li>
      <div class="head"><span class="chip mono num vt">v1.0.0</span><span class="dt">Jun 04</span></div>
      <p class="what">Sixteen rules, one exit code. The gate ships.</p>
    </li>
  </ol>
</div>`,
  },
  {
    id: "sec-newsletter",
    name: "Newsletter band",
    category: "Sections",
    tags: ["newsletter", "capture", "email", "subscribe", "form", "band"],
    code: `<div class="blk blk-sec-newsletter">
  <style>
    .blk-sec-newsletter .band { background: var(--accent-soft); border: var(--border); border-color: color-mix(in oklch, var(--accent) 35%, transparent); border-radius: var(--radius-lg); padding: var(--space-6); display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-5); }
    .blk-sec-newsletter .copy { flex: 1 1 16rem; min-width: 0; display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-sec-newsletter h2 { margin: 0; max-width: 22ch; }
    .blk-sec-newsletter .promise { margin: 0; color: var(--ink); font-size: var(--text-sm); line-height: var(--leading-ui); max-width: 40ch; }
    .blk-sec-newsletter form { flex: 1 1 14rem; min-width: 0; display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-sec-newsletter .row { display: flex; gap: var(--space-2); }
    .blk-sec-newsletter .row input { flex: 1; min-width: 0; width: auto; }
    .blk-sec-newsletter .note { flex-basis: 100%; margin: 0; }
    @media (max-width: 720px) { .blk-sec-newsletter .band { padding: var(--space-5); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-newsletter * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="band">
    <div class="copy">
      <h2>The rules move rarely</h2>
      <p class="promise">One email when a rule changes. Nothing else, ever.</p>
    </div>
    <form>
      <div class="field"><label for="blk-sec-news-email">Email</label><div class="row"><input type="email" id="blk-sec-news-email" name="email" autocomplete="email" placeholder="you@team.dev"><button class="btn primary" type="submit">Subscribe</button></div></div>
    </form>
    <p class="quiet note">No tracking, no sharing. Unsubscribe is one click and the link works.</p>
  </div>
</div>`,
  },
  {
    id: "sec-changelog",
    name: "Changelog feed",
    category: "Sections",
    tags: ["changelog", "releases", "added", "fixed", "feed", "versions"],
    code: `<div class="blk blk-sec-changelog">
  <style>
    .blk-sec-changelog { display: grid; gap: var(--space-5); }
    .blk-sec-changelog .rel { border-top: var(--border); padding-block-start: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }
    .blk-sec-changelog .rhead { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); }
    .blk-sec-changelog .vt { color: var(--accent); }
    .blk-sec-changelog .date { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-sec-changelog .lead { margin: 0; max-width: 56ch; color: var(--ink-muted); font-size: var(--text-sm); line-height: var(--leading-body); }
    .blk-sec-changelog .groups { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .blk-sec-changelog .grp { display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-sec-changelog .grp ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-1); }
    .blk-sec-changelog .grp li { display: flex; gap: var(--space-2); font-size: var(--text-sm); line-height: var(--leading-ui); }
    .blk-sec-changelog .grp li::before { content: "—"; flex: none; color: var(--ink-muted); }
    @media (max-width: 720px) { .blk-sec-changelog .groups { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-changelog * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Changelog</p>
  <div class="rel">
    <div class="rhead"><span class="chip mono num vt">v1.6.0</span><span class="date">Jan 28</span></div>
    <p class="lead">Findings teach. Every finding now carries its fix and the reference file behind the rule.</p>
    <div class="groups">
      <div class="grp"><p class="caps">Added</p><ul><li>fix and ref on every finding</li><li>--json output for pipelines</li><li>selftest for the rule registry</li></ul></div>
      <div class="grp"><p class="caps">Fixed</p><ul><li>dark-theme contrast on severity dots</li><li>hue offsets in the mark, both themes</li></ul></div>
    </div>
  </div>
  <div class="rel">
    <div class="rhead"><span class="chip mono num vt">v1.5.0</span><span class="date">Dec 09</span></div>
    <p class="lead">Tokens speak DTCG. The export is the contract, kept in sync by a check.</p>
    <div class="groups">
      <div class="grp"><p class="caps">Added</p><ul><li>DTCG export, 85 tokens</li><li>MCP smoke test in CI</li></ul></div>
      <div class="grp"><p class="caps">Fixed</p><ul><li>scrollbar color in dark theme</li></ul></div>
    </div>
  </div>
</div>`,
  },
  {
    id: "sec-compare",
    name: "Comparison table",
    category: "Sections",
    tags: ["compare", "table", "plans", "tiers", "checkmarks", "pricing"],
    code: `<div class="blk blk-sec-compare">
  <style>
    .blk-sec-compare { display: grid; gap: var(--space-4); }
    .blk-sec-compare .wrap { border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow: auto; }
    .blk-sec-compare table { margin: 0; }
    .blk-sec-compare th, .blk-sec-compare td { padding: var(--space-3); }
    .blk-sec-compare thead th { font-size: var(--text-md); color: var(--ink); font-weight: 600; border-block-end: var(--border-strong); }
    .blk-sec-compare tbody th { color: var(--ink); }
    .blk-sec-compare tbody tr:last-child th, .blk-sec-compare tbody tr:last-child td { border-bottom: 0; }
    .blk-sec-compare .hl { background: var(--accent-soft); }
    .blk-sec-compare thead th.hl { border-block-end: 1px solid var(--accent); }
    .blk-sec-compare .y, .blk-sec-compare .n { display: inline-flex; position: relative; width: var(--space-4); height: var(--space-4); align-items: center; justify-content: center; vertical-align: middle; }
    .blk-sec-compare .y { color: var(--ok); }
    .blk-sec-compare .n { color: var(--line-strong); }
    .blk-sec-compare .y::before { content: ""; display: block; width: var(--space-2); height: calc(var(--space-2) * 0.55); border-left: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: rotate(-45deg); margin-block-start: var(--space-1); }
    .blk-sec-compare .n::before, .blk-sec-compare .n::after { content: ""; position: absolute; left: 50%; top: 50%; width: var(--space-2); border-top: 1px solid currentColor; }
    .blk-sec-compare .n::before { transform: translate(-50%, -50%) rotate(45deg); }
    .blk-sec-compare .n::after { transform: translate(-50%, -50%) rotate(-45deg); }
    @media (max-width: 720px) { .blk-sec-compare th, .blk-sec-compare td { padding: var(--space-2) var(--space-3); } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-compare * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Compare</p>
  <div class="wrap">
    <table>
      <thead>
        <tr><th scope="col">Capability</th><th scope="col">Free</th><th scope="col" class="hl">Pro</th><th scope="col">Team</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Tokens, laws, engine</th><td><span class="y" role="img" aria-label="Included"></span></td><td class="hl"><span class="y" role="img" aria-label="Included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
        <tr><th scope="row">CLI gate, local runs</th><td><span class="y" role="img" aria-label="Included"></span></td><td class="hl"><span class="y" role="img" aria-label="Included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
        <tr><th scope="row">Hosted runner minutes</th><td><span class="n" role="img" aria-label="Not included"></span></td><td class="hl"><span class="y" role="img" aria-label="Included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
        <tr><th scope="row">Private rule packs</th><td><span class="n" role="img" aria-label="Not included"></span></td><td class="hl"><span class="y" role="img" aria-label="Included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
        <tr><th scope="row">CI enforcement on push</th><td><span class="n" role="img" aria-label="Not included"></span></td><td class="hl"><span class="y" role="img" aria-label="Included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
        <tr><th scope="row">Fix queue, humans on it</th><td><span class="n" role="img" aria-label="Not included"></span></td><td class="hl"><span class="n" role="img" aria-label="Not included"></span></td><td><span class="y" role="img" aria-label="Included"></span></td></tr>
      </tbody>
    </table>
  </div>
  <p class="quiet">Pro buys the hosted gate and runner minutes. The tokens stay MIT, forever.</p>
</div>`,
  },
  {
    id: "sec-integrations",
    name: "Integrations grid",
    category: "Sections",
    tags: ["integrations", "tiles", "monograms", "marks", "grid", "lift"],
    code: `<div class="blk blk-sec-integrations">
  <style>
    .blk-sec-integrations { display: grid; gap: var(--space-4); }
    .blk-sec-integrations .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
    .blk-sec-integrations a.tile { background: var(--surface); border: var(--border); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; align-items: center; gap: var(--space-2); text-decoration: none; color: inherit; transition: transform var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out); }
    .blk-sec-integrations a.tile:hover { transform: translateY(calc(var(--space-1) / -2)); border-color: var(--line-strong); box-shadow: var(--shadow-overlay); }
    .blk-sec-integrations a.tile:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
    .blk-sec-integrations .mg { font-family: var(--font-mono); font-size: var(--text-xl); font-weight: 600; letter-spacing: var(--tracking-display); color: var(--ink); }
    .blk-sec-integrations .nm { color: var(--ink-muted); font-size: var(--text-sm); line-height: var(--leading-ui); }
    @media (max-width: 720px) { .blk-sec-integrations .grid { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-sec-integrations * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <p class="caps">Integrations</p>
  <div class="grid">
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">GH</span><span class="nm">GitHub Actions</span></a>
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">MC</span><span class="nm">MCP servers</span></a>
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">DT</span><span class="nm">DTCG tokens</span></a>
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">CI</span><span class="nm">CI runners</span></a>
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">JS</span><span class="nm">JSON findings</span></a>
    <a class="tile" href="https://github.com/srivtx/d-pill"><span class="mg" aria-hidden="true">CS</span><span class="nm">CSS twin</span></a>
  </div>
  <p class="quiet">Six doors into the same gate. Exit codes everywhere, prose nowhere.</p>
</div>`,
  },
];
