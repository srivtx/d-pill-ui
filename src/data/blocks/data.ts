// Task 18-b — d-pill gallery blocks: data and empty states (gate table, empty state, skeleton).

import type { BlockRecord } from "./types";

export const DATA_BLOCKS: BlockRecord[] = [
  {
    id: "data-table",
    name: "Table",
    category: "Data & empty",
    tags: ["table", "findings", "gate", "severity", "data"],
    code: `
<div class="blk blk-data-table">
  <style>
    .blk-data-table { display: flex; flex-direction: column; gap: var(--space-2); }
    .blk-data-table .wrap { border: var(--border); border-radius: var(--radius-lg); background: var(--surface); overflow-x: auto; }
    .blk-data-table table { width: 100%; min-width: 26rem; font-size: var(--text-sm); }
    .blk-data-table td.f { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--ink-muted); }
    .blk-data-table td.r { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent); }
    .blk-data-table .sd { display: inline-block; width: var(--space-2); height: var(--space-2); margin-inline-end: var(--space-2); border-radius: var(--radius-full); vertical-align: middle; }
    .blk-data-table .sd.e { background: var(--danger); }
    .blk-data-table .sd.w { background: var(--warn); }
    .blk-data-table tbody tr:last-child td { border-bottom: 0; }
    @media (prefers-reduced-motion: reduce) {
      .blk-data-table * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="wrap">
    <table>
      <thead>
        <tr>
          <th>File</th>
          <th>Rule</th>
          <th>Severity</th>
          <th class="num">Line</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="f">src/app/page.tsx</td>
          <td class="r">space-off-scale</td>
          <td><span class="sd e" aria-hidden="true"></span>error</td>
          <td class="num">41</td>
        </tr>
        <tr>
          <td class="f">src/app/page.tsx</td>
          <td class="r">duration-off-scale</td>
          <td><span class="sd w" aria-hidden="true"></span>warn</td>
          <td class="num">88</td>
        </tr>
        <tr>
          <td class="f">src/components/nav.tsx</td>
          <td class="r">control-no-name</td>
          <td><span class="sd e" aria-hidden="true"></span>error</td>
          <td class="num">17</td>
        </tr>
        <tr>
          <td class="f">src/components/nav.tsx</td>
          <td class="r">hover-no-focus</td>
          <td><span class="sd w" aria-hidden="true"></span>warn</td>
          <td class="num">23</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="quiet">Four findings — two errors, two warnings. Exit 2.</p>
</div>`,
  },
  {
    id: "empty-state",
    name: "Empty state",
    category: "Data & empty",
    tags: ["empty", "zero", "state", "action", "mark"],
    code: `
<div class="blk blk-empty-state">
  <style>
    .blk-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--space-3);
      padding: var(--space-7) var(--space-5);
    }
    .blk-empty-state .mk {
      flex: none;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: var(--radius-full);
      background: linear-gradient(
        140deg,
        oklch(0.78 0.13 calc(var(--hue) - 140)),
        oklch(0.72 0.12 calc(var(--hue) - 60)) 38%,
        oklch(0.68 0.12 var(--hue)) 62%,
        oklch(0.75 0.13 calc(var(--hue) + 80))
      );
      box-shadow: 0 0 0 1px oklch(0.5 0.02 var(--hue) / 0.35);
    }
    .blk-empty-state h3 { font-size: var(--text-lg); }
    .blk-empty-state .quiet { max-width: 34ch; }
    @media (prefers-reduced-motion: reduce) {
      .blk-empty-state * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <span class="mk" aria-hidden="true"></span>
  <h3>No findings yet</h3>
  <p class="quiet">This file has not met the gate. Run it once — every finding arrives with its fix attached.</p>
  <button type="button" class="primary">Run the gate</button>
</div>`,
  },
  {
    id: "skeleton-grid",
    name: "Skeleton",
    category: "Data & empty",
    tags: ["skeleton", "loading", "placeholder", "pulse", "animation"],
    code: `
<div class="blk blk-skeleton-grid">
  <style>
    .blk-skeleton-grid { display: flex; flex-direction: column; gap: var(--space-4); }
    .blk-skeleton-grid .rows { display: flex; flex-direction: column; gap: var(--space-3); }
    .blk-skeleton-grid .row { display: flex; align-items: center; gap: var(--space-3); }
    .blk-skeleton-grid .row > span { min-width: 0; }
    .blk-skeleton-grid .sq { flex: none; width: var(--space-5); height: var(--space-5); border-radius: var(--radius-sm); background: var(--bg-subtle); animation: blk-skeleton-pulse var(--dur-3) linear infinite; }
    .blk-skeleton-grid .bar {
      flex: 1;
      height: var(--space-3);
      border-radius: var(--radius-full);
      background: var(--bg-subtle);
      animation: blk-skeleton-pulse var(--dur-3) linear infinite;
    }
    .blk-skeleton-grid .w2 { max-width: 78%; }
    .blk-skeleton-grid .w3 { max-width: 56%; }
    .blk-skeleton-grid .cap { display: flex; align-items: center; gap: var(--space-2); }
    .blk-skeleton-grid .r2 .sq, .blk-skeleton-grid .r2 .bar { animation-delay: calc(var(--dur-3) / 3); }
    .blk-skeleton-grid .r3 .sq, .blk-skeleton-grid .r3 .bar { animation-delay: calc(var(--dur-3) * 2 / 3); }
    @keyframes blk-skeleton-pulse { 50% { opacity: 0.55; } }
    @media (prefers-reduced-motion: reduce) {
      .blk-skeleton-grid * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
  <div class="rows" aria-hidden="true">
    <div class="row"><span class="sq"></span><span class="bar"></span></div>
    <div class="row r2"><span class="sq"></span><span class="bar w2"></span></div>
    <div class="row r3"><span class="sq"></span><span class="bar w3"></span></div>
  </div>
  <p class="quiet cap">Reading the file — findings next.</p>
</div>`,
  },
];
