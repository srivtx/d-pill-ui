"use client";

/**
 * The gallery — the blocks library. Every preview renders its own exact copy
 * payload (dangerouslySetInnerHTML of the same string the button ships), and
 * every <style> block lands in the live DOM, so the page self-audit scans the
 * gallery itself. Copying a block gives you precisely what you saw.
 */

import { useMemo, useState } from "react";
import { HERO_BLOCKS } from "@/data/blocks/heroes";
import { FEATURE_BLOCKS } from "@/data/blocks/features";
import { AI_BLOCKS } from "@/data/blocks/ai";
import { FORM_BLOCKS } from "@/data/blocks/forms";
import { DATA_BLOCKS } from "@/data/blocks/data";
import { CONTENT_BLOCKS } from "@/data/blocks/content";
import { NAV_BLOCKS } from "@/data/blocks/navigation";
import type { BlockRecord } from "@/data/blocks/types";

const ALL_BLOCKS: BlockRecord[] = [
  ...HERO_BLOCKS,
  ...FEATURE_BLOCKS,
  ...AI_BLOCKS,
  ...FORM_BLOCKS,
  ...DATA_BLOCKS,
  ...CONTENT_BLOCKS,
  ...NAV_BLOCKS,
];

const CATEGORIES = ["All", "Hero", "Features", "AI surfaces", "Forms & auth", "Data & empty", "Content", "Navigation"];

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function BlockCard({ block, onToast }: { block: BlockRecord; onToast: (msg: string) => void }) {
  const [showCode, setShowCode] = useState(false);

  async function handleCopy() {
    const ok = await copy(block.code);
    onToast(ok ? `${block.name} copied` : "Clipboard unavailable in this context");
  }

  return (
    <article className="block-card">
      <div className="block-head">
        <h3>{block.name}</h3>
        <div className="cluster tight">
          <span className="chip ok">
            <span className="dot" aria-hidden="true" />
            gate-clean
          </span>
        </div>
      </div>
      {showCode ? (
        <div className="block-preview">
          <pre className="code mini">{block.code}</pre>
        </div>
      ) : (
        <div className="block-preview" dangerouslySetInnerHTML={{ __html: block.code }} />
      )}
      <div className="block-foot">
        <span className="quiet mono">{block.tags.join(" · ")}</span>
        <div className="cluster">
          <button type="button" className="btn ghost" onClick={() => setShowCode(!showCode)} aria-pressed={showCode}>
            {showCode ? "Preview" : "View code"}
          </button>
          <button type="button" className="btn primary" onClick={handleCopy}>
            Copy block
          </button>
        </div>
      </div>
    </article>
  );
}

export function Gallery() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_BLOCKS.filter((b) => {
      if (category !== "All" && b.category !== category) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [category, query]);

  function onToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }

  return (
    <section id="blocks" className="section frame" aria-labelledby="blocks-title">
      <div className="sec-head">
        <p className="caps">The blocks</p>
        <h2 id="blocks-title">
          {ALL_BLOCKS.length} blocks. Every one passes a gate you can watch run.
        </h2>
        <p>
          Pure HTML and CSS on the token system — no animation library, no runtime.
          Turn the hue dial in the token explorer and every block re-tints. Copy
          what you saw: the preview and the payload are the same string.
        </p>
      </div>

      <div className="stack">
        <div className="cluster between">
          <div className="tabbar" role="tablist" aria-label="Block categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="field">
            <label htmlFor="block-search" className="caps">
              Search blocks
            </label>
            <input
              id="block-search"
              type="search"
              placeholder="bento, chat, pricing…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-describedby="block-count"
            />
          </div>
        </div>
        <p id="block-count" className="quiet num" aria-live="polite">
          {filtered.length} of {ALL_BLOCKS.length} blocks · 7 categories · 0 animation dependencies
        </p>
        <div className="gallery-grid">
          {filtered.map((b) => (
            <BlockCard key={b.id} block={b} onToast={onToast} />
          ))}
        </div>
      </div>

      {toast ? (
        <div className="toasts" role="status">
          <div className="toast">{toast}</div>
        </div>
      ) : null}
    </section>
  );
}
