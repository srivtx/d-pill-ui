'use client';

import { Fragment, memo, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { LAWS, type LawDoc } from '@/data/laws';

const DEFAULT_FILE = 'references/foundations.md';
const REPO_BASE = 'https://github.com/srivtx/d-pill/blob/main/';
const SEARCH_INPUT_ID = 'laws-search';
const PANEL_ID = 'laws-panel';

function tabId(file: string): string {
  return 'laws-tab-' + file.replace(/[^a-zA-Z0-9]+/g, '-');
}

/* ---------------------------------------------------------------------------
 * Body renderer. The law files are markdown-ish: a first "# " title line,
 * "## " and "### " headings, prose paragraphs, "- " and "1. " list items,
 * fenced code blocks, pipe tables, and inline **bold** plus `code` spans.
 * Parsed by hand — no markdown library.
 * ------------------------------------------------------------------------- */

type Block =
  | { kind: 'h3'; text: string }
  | { kind: 'h4'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'code'; text: string }
  | { kind: 'table'; head: string[]; rows: string[][] };

function isSeparatorRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('|') && /^[\s|:-]+$/.test(trimmed) && /-{3,}/.test(trimmed);
}

function splitRow(line: string): string[] {
  let text = line.trim();
  if (text.startsWith('|')) text = text.slice(1);
  if (text.endsWith('|')) text = text.slice(0, -1);
  return text.split('|').map((cell) => cell.trim());
}

function parseBlocks(body: string): Block[] {
  const lines = body.split('\n');
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let table: { head: string[] | null; rows: string[][] } | null = null;
  let code: string[] | null = null;

  const closeParagraph = (): void => {
    if (paragraph.length > 0) {
      blocks.push({ kind: 'p', text: paragraph.join(' ') });
      paragraph = [];
    }
  };
  const closeList = (): void => {
    if (list) {
      blocks.push({ kind: 'list', ordered: list.ordered, items: list.items });
      list = null;
    }
  };
  const closeTable = (): void => {
    if (table) {
      const head = table.head ?? table.rows.shift() ?? [];
      blocks.push({ kind: 'table', head, rows: table.rows });
      table = null;
    }
  };
  const closeProse = (): void => {
    closeParagraph();
    closeList();
    closeTable();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';

    if (line.startsWith('```')) {
      if (code) {
        blocks.push({ kind: 'code', text: code.join('\n') });
        code = null;
      } else {
        closeProse();
        code = [];
      }
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }

    // The first "# " line is the file title; it is rendered as the reader h2.
    if (i === 0 && line.startsWith('# ')) continue;

    if (line.startsWith('## ')) {
      closeProse();
      blocks.push({ kind: 'h3', text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith('### ')) {
      closeProse();
      blocks.push({ kind: 'h4', text: line.slice(4).trim() });
      continue;
    }

    if (line.trim() === '') {
      closeProse();
      continue;
    }

    if (line.trim().startsWith('|')) {
      closeParagraph();
      closeList();
      if (!table) table = { head: null, rows: [] };
      if (isSeparatorRow(line)) {
        const first = table.rows.shift();
        if (first) table.head = first;
      } else {
        table.rows.push(splitRow(line));
      }
      continue;
    }

    const bullet = /^\s*- (.*)$/.exec(line);
    if (bullet) {
      closeParagraph();
      closeTable();
      if (!list || list.ordered) {
        closeList();
        list = { ordered: false, items: [] };
      }
      list.items.push((bullet[1] ?? '').trim());
      continue;
    }

    const numbered = /^\s*[0-9]+\. (.*)$/.exec(line);
    if (numbered) {
      closeParagraph();
      closeTable();
      if (!list || !list.ordered) {
        closeList();
        list = { ordered: true, items: [] };
      }
      list.items.push((numbered[1] ?? '').trim());
      continue;
    }

    closeList();
    closeTable();
    paragraph.push(line.trim());
  }

  if (code) blocks.push({ kind: 'code', text: code.join('\n') });
  closeProse();
  return blocks;
}

/* Inline spans: **bold** (which may hold `code`) and `code`. React escapes
 * every text node, so nothing needs pre-escaping. Keys are position-stable. */

function codeSpans(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/`([^`]+)`/g);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i] ?? '';
    if (part === '') continue;
    if (i % 2 === 1) {
      nodes.push(<code key={keyBase + 'c' + i}>{part}</code>);
    } else {
      nodes.push(<Fragment key={keyBase + 't' + i}>{part}</Fragment>);
    }
  }
  return nodes;
}

function inlineNodes(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i] ?? '';
    if (part === '') continue;
    if (i % 2 === 1) {
      nodes.push(
        <strong key={keyBase + 'b' + i}>{codeSpans(part, keyBase + 'b' + i)}</strong>
      );
    } else {
      nodes.push(...codeSpans(part, keyBase + 'i' + i));
    }
  }
  return nodes;
}

function renderBlock(block: Block, key: string): ReactNode {
  switch (block.kind) {
    case 'h3':
      return <h3 key={key}>{inlineNodes(block.text, key)}</h3>;
    case 'h4':
      return <h4 key={key} className="quiet">{inlineNodes(block.text, key)}</h4>;
    case 'p':
      return <p key={key}>{inlineNodes(block.text, key)}</p>;
    case 'list': {
      const items = block.items.map((item, j) => (
        <li key={key + 'l' + j}>{inlineNodes(item, key + 'l' + j)}</li>
      ));
      return block.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
    }
    case 'code':
      return <pre key={key} className="code">{block.text}</pre>;
    case 'table':
      return (
        <table key={key}>
          {block.head.length > 0 && (
            <thead>
              <tr>
                {block.head.map((cell, j) => (
                  <th key={key + 'h' + j} scope="col">
                    {inlineNodes(cell, key + 'h' + j)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {block.rows.map((row, j) => (
              <tr key={key + 'r' + j}>
                {row.map((cell, k) => (
                  <td key={key + 'd' + k}>{inlineNodes(cell, key + 'r' + j + 'd' + k)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}

const LawText = memo(function LawText({ law }: { law: LawDoc }) {
  const blocks = useMemo(() => parseBlocks(law.body), [law.body]);
  return <>{blocks.map((block, i) => renderBlock(block, law.file + '-b' + i))}</>;
});

/* --------------------------------------------------------------------------- */

export default function LawsReader() {
  const [query, setQuery] = useState('');
  const [activeFile, setActiveFile] = useState<string>(() =>
    LAWS.some((law) => law.file === DEFAULT_FILE) ? DEFAULT_FILE : (LAWS[0]?.file ?? '')
  );
  const [copied, setCopied] = useState(false);

  const activeButtonRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstSelection = useRef(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === '') return LAWS;
    return LAWS.filter(
      (law) => law.title.toLowerCase().includes(q) || law.body.toLowerCase().includes(q)
    );
  }, [query]);

  const totalLines = useMemo(() => LAWS.reduce((sum, law) => sum + law.lines, 0), []);

  const active = useMemo(
    () => LAWS.find((law) => law.file === activeFile) ?? null,
    [activeFile]
  );

  const filtering = query.trim() !== '';

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // When a law is selected, bring its button into view and restart the reader
  // at the top. The initial render is skipped so the page does not jump.
  useEffect(() => {
    if (firstSelection.current) {
      firstSelection.current = false;
      return;
    }
    activeButtonRef.current?.scrollIntoView({ block: 'nearest' });
    bodyRef.current?.scrollTo(0, 0);
  }, [activeFile]);

  const handleCopy = async (): Promise<void> => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.body);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (permission or insecure context): keep the label.
    }
  };

  return (
    <section id="laws" className="section frame">
      <div className="sec-head">
        <p className="caps">The laws</p>
        <h2>Forty files, read before the surface is called done</h2>
        <p className="quiet">
          The full reference set ships with the skill and renders here verbatim — the
          same files agents read.
        </p>
      </div>

      <div className="laws-grid">
        <div className="stack">
          <div className="field">
            <label className="caps" htmlFor={SEARCH_INPUT_ID}>
              Search the laws
            </label>
            <input
              id={SEARCH_INPUT_ID}
              type="search"
              value={query}
              placeholder="e.g. contrast, motion, tokens"
              aria-label="Search the laws"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <p className="quiet" aria-live="polite">
            {filtering
              ? `${filtered.length} match${filtered.length === 1 ? '' : 'es'}`
              : `${LAWS.length} files · ${totalLines.toLocaleString('en-US')} lines`}
          </p>

          <div className="law-list" role="tablist" aria-label="Law files">
            {filtered.map((law) => {
              const isActive = law.file === activeFile;
              return (
                <button
                  key={law.file}
                  type="button"
                  role="tab"
                  id={tabId(law.file)}
                  aria-selected={isActive}
                  aria-controls={PANEL_ID}
                  className="cluster between"
                  onClick={() => setActiveFile(law.file)}
                  ref={isActive ? activeButtonRef : undefined}
                >
                  <span>{law.title}</span>
                  <span className="law-lines">{law.lines} lines</span>
                </button>
              );
            })}
          </div>
        </div>

        {active && (
          <div className="stack">
            <div className="cluster between">
              <span className="law-lines mono quiet">
                {active.file} · {active.lines} lines
              </span>
              <div className="cluster">
                <a
                  className="btn ghost"
                  href={REPO_BASE + active.file}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in repo
                </a>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={handleCopy}
                  aria-label="Copy this law"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div
              className="law-body"
              id={PANEL_ID}
              ref={bodyRef}
              tabIndex={0}
              role="tabpanel"
              aria-label={`Law text: ${active.title}`}
            >
              <div className="stack measure">
                <h2 className="law-title">{active.title}</h2>
                <LawText law={active} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
