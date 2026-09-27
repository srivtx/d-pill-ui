"use client";

/**
 * The Gate — the flagship. Paste HTML or CSS, run the real engine (the
 * TypeScript port of critique.py, parity-tested), read findings that teach:
 * every finding carries the fix and the law behind it. Exit codes are the
 * contract: 0 clean, 2 findings, 1 a broken invocation.
 */

import { useMemo, useState } from "react";
import { critique, type CritiqueResult, type SourceFile } from "@/lib/dpill/engine";
import { DILL_VERSION } from "@/lib/dpill/data";
import { SAMPLES } from "@/lib/dpill/samples";

function ExitChip({ exit }: { exit: 0 | 1 | 2 }) {
  return (
    <span className={`exit-chip ${exit === 0 ? "pass" : "fail"}`}>
      exit {exit}
    </span>
  );
}

export function Gate() {
  const [sampleId, setSampleId] = useState<string>(SAMPLES[0].id);
  const [source, setSource] = useState<string>(SAMPLES[0].code);
  const [strict, setStrict] = useState<boolean>(false);
  const [result, setResult] = useState<CritiqueResult | null>(null);

  const mode = useMemo<"html" | "css">(() => {
    const s = SAMPLES.find((x) => x.id === sampleId);
    if (!s) return "html";
    return s.mode;
  }, [sampleId]);

  function loadSample(id: string) {
    const s = SAMPLES.find((x) => x.id === id);
    if (!s) return;
    setSampleId(id);
    setSource(s.code);
    setResult(null);
  }

  function run() {
    const file: SourceFile =
      mode === "css" ? { name: "pasted.css", text: source, kind: "css" } : { name: "pasted.html", text: source, kind: "html" };
    setResult(critique([file], { strict }));
  }

  const active = SAMPLES.find((s) => s.id === sampleId);

  async function copyJson() {
    if (!result) return;
    const payload = {
      tool: "d-pill critique",
      version: DILL_VERSION,
      summary: result.stats,
      findings: result.findings,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    } catch {
      /* clipboard unavailable: the findings are on the screen */
    }
  }

  return (
    <section id="gate" className="section frame" aria-labelledby="gate-title">
      <div className="sec-head">
        <p className="caps">The gate</p>
        <h2 id="gate-title">Paste a surface. Read the verdict.</h2>
        <p>
          This is the engine agents run — here it runs in your browser. The same
          sixteen rules, the same severities, the same exit codes the hook contract
          uses. Warnings are judgment calls to read, not ignore.
        </p>
      </div>

      <div className="gate-grid">
        <div className="gate-editor stack">
          <div className="cluster between">
            <div className="tabbar" role="tablist" aria-label="Samples">
              {SAMPLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={s.id === sampleId}
                  onClick={() => loadSample(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="quiet">{active ? active.note : ""}</p>
          <div className="field">
            <label htmlFor="gate-source" className="caps">
              {mode === "css" ? "Paste CSS" : "Paste HTML — style blocks included"}
            </label>
            <textarea
              id="gate-source"
              spellCheck={false}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              aria-describedby="gate-mode"
            />
            <span id="gate-mode" className="hint">
              Checked as {mode === "css" ? "a stylesheet" : "an HTML document"} — the way the CLI would read the file.
            </span>
          </div>
          <div className="cluster">
            <button type="button" className="btn primary" onClick={run}>
              Run the critique
            </button>
            <label className="choice">
              <input
                type="checkbox"
                checked={strict}
                onChange={(e) => setStrict(e.target.checked)}
              />
              <span className="quiet">Strict — warnings fail too</span>
            </label>
            {result ? (
              <button type="button" className="btn ghost" onClick={copyJson}>
                Copy findings JSON
              </button>
            ) : null}
          </div>
        </div>

        <div className="gate-out" aria-live="polite">
          {result ? (
            <>
              <div className="gate-summary">
                <ExitChip exit={result.exitCode} />
                <span className="quiet num">
                  {result.stats.files} file{result.stats.files === 1 ? "" : "s"} checked
                </span>
                <span className="quiet num" style={{ color: "var(--danger)" }}>
                  {result.stats.errors} error{result.stats.errors === 1 ? "" : "s"}
                </span>
                <span className="quiet num">
                  {result.stats.warnings} warning{result.stats.warnings === 1 ? "" : "s"}
                </span>
                {result.stats.rules_fired.length > 0 ? (
                  <span className="quiet num">{result.stats.rules_fired.length} rules fired</span>
                ) : null}
              </div>
              {result.findings.length === 0 ? (
                <div className="panel tight">
                  <p className="cluster">
                    <span className="sev" style={{ background: "var(--ok)" }} aria-hidden="true" />
                    Clean. Nothing on this surface is off the system.
                  </p>
                </div>
              ) : (
                <ul className="findings">
                  {result.findings.map((f, i) => (
                    <li key={`${f.rule}-${f.line}-${f.col}-${i}`}>
                      <div className="finding-top">
                        <span className={`sev ${f.severity === "error" ? "error" : "warn"}`} aria-hidden="true" />
                        <span className="finding-rule">{f.rule}</span>
                        <span className="finding-loc num">
                          {f.file}:{f.line}:{f.col}
                        </span>
                      </div>
                      <p className="finding-msg">{f.message}</p>
                      {f.fix ? (
                        <div className="finding-fix">
                          <b>Fix.</b> {f.fix}
                        </div>
                      ) : null}
                      {f.ref ? (
                        <a
                          className="finding-ref"
                          href={`https://github.com/srivtx/d-pill/blob/main/${f.ref}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Read the law: {f.ref}
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="panel tight stack">
              <p className="caps">How to read it</p>
              <p className="quiet">
                Errors are decisions the page made without the system — a 300ms hover, a
                17px padding, a control nobody named. Warnings are judgment calls:
                read them, then either fix or write the exception down.
              </p>
              <p className="quiet">
                Every finding carries its fix and the reference file behind the rule.
                Load a sample and run it.
              </p>
              <div className="cluster">
                <span className="chip">exit 0 clean</span>
                <span className="chip">exit 2 findings</span>
                <span className="chip">exit 1 broken invocation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
