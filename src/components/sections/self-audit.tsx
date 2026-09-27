"use client";

/**
 * The self-audit — the trust moment. One click runs the real engine on the
 * live DOM: every inline style attribute, every style block the page carries,
 * every control name, every image. The verdict is computed, never asserted.
 */

import { useState } from "react";
import { critiqueDocument, type CritiqueResult } from "@/lib/dpill/engine";

export function SelfAudit() {
  const [result, setResult] = useState<CritiqueResult | null>(null);
  const [ranAt, setRanAt] = useState<string>("");
  const [open, setOpen] = useState(false);

  function run() {
    const r = critiqueDocument();
    setResult(r);
    setOpen(true);
    setRanAt(new Date().toLocaleTimeString());
  }

  const clean = result !== null && result.exitCode === 0;

  return (
    <section className="section frame" aria-labelledby="audit-title">
      <div className="audit-bar">
        <div className="stack tight" style={{ maxWidth: "var(--measure)" }}>
          <p className="caps" id="audit-title">
            The proof
          </p>
          <h2>This page runs its own gate.</h2>
          <p className="quiet">
            Not a claim about the code — a scan of the living DOM: every style block
            the gallery injected, every attribute React rendered. Run it again after
            you copy a block or turn the hue dial.
          </p>
        </div>
        <div className="cluster">
          <button type="button" className="btn primary" onClick={run}>
            {result ? "Re-run the audit" : "Audit this page"}
          </button>
          {result ? (
            <>
              <span className={`exit-chip ${clean ? "pass" : "fail"}`}>exit {result.exitCode}</span>
              <span className="quiet num">
                {result.stats.errors} error{result.stats.errors === 1 ? "" : "s"} ·{" "}
                {result.stats.warnings} warning{result.stats.warnings === 1 ? "" : "s"} · {ranAt}
              </span>
            </>
          ) : null}
          {result ? (
            <button type="button" className="btn ghost" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? "Hide findings" : "Show findings"}
            </button>
          ) : null}
        </div>
      </div>

      {result && open ? (
        result.findings.length === 0 ? (
          <div className="panel tight" style={{ marginBlockStart: "var(--space-3)" }}>
            <p className="cluster">
              <span className="audit-dot" aria-hidden="true" />
              Clean. The document you are reading passes the sixteen rules it ships.
            </p>
          </div>
        ) : (
          <ul className="findings" style={{ marginBlockStart: "var(--space-3)" }}>
            {result.findings.map((f, i) => (
              <li key={`${f.rule}-${f.line}-${i}`}>
                <div className="finding-top">
                  <span className={`sev ${f.severity === "error" ? "error" : "warn"}`} aria-hidden="true" />
                  <span className="finding-rule">{f.rule}</span>
                  <span className="finding-loc num">
                    {f.file}:{f.line}:{f.col}
                  </span>
                </div>
                <p className="finding-msg">{f.message}</p>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </section>
  );
}
