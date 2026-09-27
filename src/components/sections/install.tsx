"use client";

import { useState } from "react";

interface InstallCard {
  id: string;
  label: string;
  title: string;
  body: string;
  code: string;
}

const CARDS: InstallCard[] = [
  {
    id: "skill",
    label: "Agent skill",
    title: "One line, any agent",
    body: "Installs into ~/.agents/skills — Claude Code, Codex, Cursor, Cline, Warp, Zed. The agent reads the laws before it writes the interface, then runs the gate before it calls the work done.",
    code: "npx skills add srivtx/d-pill",
  },
  {
    id: "plugin",
    label: "Claude plugin",
    title: "Marketplace path",
    body: "A plugin marketplace entry for Claude Code: the skill, the scripts, and the gate wired as a plugin you can update in place.",
    code: "/plugin marketplace add srivtx/dpill\n/plugin install d-pill@d-pill",
  },
  {
    id: "action",
    label: "GitHub Action",
    title: "The gate in CI",
    body: "Every push and pull request gets the critique. Exit 2 blocks the merge with file:line:col findings — the agent reads them and reacts.",
    code: "- uses: srivtx/d-pill@v1\n  with:\n    paths: src/**/*.html",
  },
  {
    id: "mcp",
    label: "MCP server",
    title: "Tools, not context",
    body: "A stdio MCP server exposing critique, list_rules, and token. Your editor or agent calls the gate like any other tool.",
    code: `{\n  "mcpServers": {\n    "d-pill": {\n      "command": "python3",\n      "args": ["path/to/mcp-server.py"]\n    }\n  }\n}`,
  },
];

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Card({ card, onToast }: { card: InstallCard; onToast: (msg: string) => void }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyText(card.code);
    setCopied(ok);
    onToast(ok ? `${card.label} command copied` : "Clipboard unavailable in this context");
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <div className="panel install-card">
      <p className="caps">{card.label}</p>
      <h3>{card.title}</h3>
      <p className="quiet">{card.body}</p>
      <div className="stack tight">
        <pre className="code mini">{card.code}</pre>
        <div className="cluster end">
          <button type="button" className={`btn ${copied ? "ink" : "primary"}`} onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Install() {
  const [toast, setToast] = useState<string | null>(null);

  function onToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }

  return (
    <section id="install" className="section frame" aria-labelledby="install-title">
      <div className="sec-head">
        <p className="caps">Install</p>
        <h2 id="install-title">Four doors, one system</h2>
        <p>
          A skill, a plugin, an Action, an MCP server — the same laws and the same
          gate on every path. The exit-2 hook contract means the agent receives the
          findings as the reason to react, not as decoration.
        </p>
      </div>
      <div className="install-grid">
        {CARDS.map((c) => (
          <Card key={c.id} card={c} onToast={onToast} />
        ))}
      </div>
      {toast ? (
        <div className="toasts" role="status">
          <div className="toast">{toast}</div>
        </div>
      ) : null}
    </section>
  );
}
