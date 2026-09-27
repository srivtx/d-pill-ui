/**
 * Parity test: the TypeScript engine against the Python engine (critique.py)
 * on the same fixtures. Parity is the product claim, so it is proven, not
 * asserted: same findings count, same rules fired, same severities.
 *
 * Run: bun scripts/parity-test.ts
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { critique, registrySync } from "../src/lib/dpill/engine";

const ROOT = process.env.DPILL_ROOT ?? new URL("../d-pill", import.meta.url).pathname;

function runPython(args: string): string {
  // The CLI exits 2 when it finds findings (the hook contract); capture stdout.
  try {
    return execSync(`python3 ${ROOT}/scripts/critique.py ${args}`, { encoding: "utf-8" });
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string };
    if (err.stdout && err.stdout.trim().startsWith("{")) return err.stdout;
    throw e;
  }
}

function toSource(name: string): { name: string; text: string; kind: "html" | "css" } {
  const text = readFileSync(`${ROOT}/${name}`, "utf-8");
  return { name, text, kind: name.endsWith(".html") ? "html" : "css" };
}

/** Resolve relative stylesheet links against the d-pill repo, like the CLI. */
function fsResolver(file: string): (href: string) => string | null {
  const dir = file.split("/").slice(0, -1).join("/");
  return (href: string) => {
    try {
      return readFileSync(`${ROOT}/${dir}/${href}`, "utf-8");
    } catch {
      return null;
    }
  };
}

function critiqueFile(name: string, opts: Record<string, unknown> = {}) {
  const src = toSource(name);
  return critique([src], { resolveLink: fsResolver(name), ...opts });
}

let pass = true;
function check(label: string, ok: boolean, detail?: string) {
  if (!ok) pass = false;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok || !detail ? "" : "\n      " + detail}`);
}

// 1. Registry sync (TS side)
const sync = registrySync();
check("TS registry sync", sync.ok, sync.problems.join("; "));

// 2. Fixtures: bad.css + bad.html
const pyJson = JSON.parse(runPython(`--json ${ROOT}/scripts/fixtures/bad.css ${ROOT}/scripts/fixtures/bad.html`));
const ts = critique([toSource("scripts/fixtures/bad.css"), toSource("scripts/fixtures/bad.html")]);

check(
  "fixture findings: same count",
  pyJson.findings.length === ts.findings.length,
  `python=${pyJson.findings.length} ts=${ts.findings.length}`
);
const pyRules = new Set(pyJson.findings.map((f: { rule: string }) => f.rule));
const tsRules = new Set(ts.findings.map((f) => f.rule));
check(
  "fixture findings: same rules fired",
  pyRules.size === tsRules.size && [...pyRules].every((r) => tsRules.has(r)),
  `python-only: ${[...pyRules].filter((r) => !tsRules.has(r))}; ts-only: ${[...tsRules].filter((r) => !pyRules.has(r))}`
);
check("fixture summary: errors", pyJson.summary.errors === ts.stats.errors, `${pyJson.summary.errors} vs ${ts.stats.errors}`);
check("fixture summary: warnings", pyJson.summary.warnings === ts.stats.warnings, `${pyJson.summary.warnings} vs ${ts.stats.warnings}`);

// Same finding text (message) per rule+severity (order can differ within ties)
const pyByRule = new Map<string, string[]>();
for (const f of pyJson.findings) {
  const k = `${f.rule}|${f.severity}`;
  pyByRule.set(k, [...(pyByRule.get(k) ?? []), f.message]);
}
let msgOk = true;
const msgDetail: string[] = [];
for (const f of ts.findings) {
  const k = `${f.rule}|${f.severity}`;
  const list = pyByRule.get(k);
  if (!list || !list.includes(f.message)) {
    msgOk = false;
    msgDetail.push(`ts "${f.rule}": ${f.message}`);
  }
}
check("fixture findings: same messages", msgOk, msgDetail.join("\n      "));

// Findings carry the teaching half
const teachOk = ts.findings.every((f) => (f.fix ?? "") !== "" && (f.ref ?? "") !== "");
check("every finding carries fix + reference", teachOk);

// 3. Clean files: docs/index.html should exit 0
const pyClean = JSON.parse(runPython(`--json ${ROOT}/docs/index.html`));
const tsClean = critiqueFile("docs/index.html");
check(
  "docs/index.html: same clean verdict",
  (pyClean.summary.errors === 0) === (tsClean.stats.errors === 0),
  `python errors=${pyClean.summary.errors} ts errors=${tsClean.stats.errors}`
);
check(
  "docs/index.html: same warning count",
  pyClean.summary.warnings === tsClean.stats.warnings,
  `python=${pyClean.summary.warnings} ts=${tsClean.stats.warnings}`
);

// 4. The proof page: docs/soft.html
const pySoft = JSON.parse(runPython(`--json ${ROOT}/docs/soft.html`));
const tsSoft = critiqueFile("docs/soft.html");
check(
  "docs/soft.html: same verdict",
  (pySoft.summary.errors === 0) === (tsSoft.stats.errors === 0) && pySoft.summary.warnings === tsSoft.stats.warnings,
  `python ${pySoft.summary.errors}/${pySoft.summary.warnings} vs ts ${tsSoft.stats.errors}/${tsSoft.stats.warnings}`
);

// 5. The engine's own demo: base.css
const pyBase = JSON.parse(runPython(`--json ${ROOT}/references/base.css`));
const tsBase = critiqueFile("references/base.css");
check(
  "references/base.css: same verdict",
  pyBase.summary.errors === tsBase.stats.errors && pyBase.summary.warnings === tsBase.stats.warnings,
  `python ${pyBase.summary.errors}/${pyBase.summary.warnings} vs ts ${tsBase.stats.errors}/${tsBase.stats.warnings}`
);

// 6. Strict and allow semantics
const tsStrict = critiqueFile("scripts/fixtures/bad.html", { strict: true });
check("strict flips warnings to failure", tsStrict.exitCode === 2);
const tsAllow = critique([toSource("scripts/fixtures/bad.html")], {
  allow: ts.findings.map((f) => f.rule),
});
check("allow suppresses every rule it names", tsAllow.findings.length === 0 || tsAllow.stats.errors === 0);

console.log(pass ? "\nPARITY: PASS" : "\nPARITY: FAIL");
process.exit(pass ? 0 : 1);
