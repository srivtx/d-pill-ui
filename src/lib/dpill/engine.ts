/**
 * engine.ts — the d-pill machine gate, ported to TypeScript.
 *
 * This is a faithful port of scripts/critique.py (v1.6.0) from the d-pill
 * skill: the same rules, the same scales, the same severities, the same
 * messages, the same exit-code contract. The parity is not a claim — it is
 * tested against the Python engine on the same fixtures.
 *
 * Findings carry file:line:col, the rule, the severity, the message, and the
 * teaching half (the fix and the reference file) from the registry.
 * Exit codes: 0 clean (warnings allowed unless strict), 2 findings,
 * 1 broken invocation.
 */

import { RULES, TOKENS } from "./data";

export type Severity = "error" | "warn";

export interface Finding {
  file: string;
  line: number;
  col: number;
  rule: string;
  severity: Severity;
  message: string;
  fix?: string;
  ref?: string;
}

export interface Stats {
  files: number;
  errors: number;
  warnings: number;
  rules_fired: string[];
}

export interface SourceFile {
  name: string;
  text: string;
  kind: "html" | "css";
}

export interface CritiqueResult {
  findings: Finding[];
  stats: Stats;
  exitCode: 0 | 1 | 2;
}

// ---------------------------------------------------------------------------
// Scales — built from the bundled tokens (the verified export of base.css).

const FALLBACK = {
  space: ["0.25rem", "0.5rem", "0.75rem", "1rem", "1.5rem", "2rem", "3rem", "4rem", "6rem", "8rem"],
  ramp: ["0.75rem", "0.8125rem", "0.9375rem", "1rem", "1.125rem", "1.5rem", "2.25rem", "3.5rem"],
  radius: ["4px", "6px", "10px", "999px"],
  durations: ["120ms", "180ms", "240ms"],
  z: [10, 20, 40, 50, 60],
};

function remToPx(text: string): number | null {
  if (!text.endsWith("rem")) return null;
  const n = parseFloat(text);
  return Number.isFinite(n) ? Math.round(n * 16 * 1000) / 1000 : null;
}

function normLen(v: string): string {
  const s = String(v).trim();
  if (s.endsWith("rem")) {
    const px = remToPx(s);
    if (px !== null && Number.isInteger(px)) return `${px}px`;
  }
  return s;
}

interface Scales {
  space: Set<string>;
  ramp: Set<string>;
  radius: Set<string>;
  durations: Set<string>;
  z: number[];
}

function buildScales(): Scales {
  const scales: Scales = {
    space: new Set(),
    ramp: new Set(),
    radius: new Set(),
    durations: new Set(),
    z: [...FALLBACK.z],
  };
  for (const v of Object.values(TOKENS.space.scale)) scales.space.add(normLen(v));
  for (const v of Object.values(TOKENS.type.ramp)) scales.ramp.add(normLen(v));
  for (const v of Object.values(TOKENS.shape)) scales.radius.add(normLen(v));
  for (const [k, v] of Object.entries(TOKENS.motion)) {
    if (k.startsWith("dur")) scales.durations.add(normLen(v));
  }
  if (scales.space.size === 0) FALLBACK.space.forEach((v) => scales.space.add(normLen(v)));
  if (scales.ramp.size === 0) FALLBACK.ramp.forEach((v) => scales.ramp.add(normLen(v)));
  // 16px is the iOS input floor: coarse-pointer inputs are authored at 1rem
  // (base.css) so Safari does not zoom the field on focus. An exception, kept.
  scales.ramp.add("16px");
  if (scales.radius.size === 0) FALLBACK.radius.forEach((v) => scales.radius.add(normLen(v)));
  if (scales.durations.size === 0) FALLBACK.durations.forEach((v) => scales.durations.add(normLen(v)));
  return scales;
}

// ---------------------------------------------------------------------------
// The scanning regexes — the same shapes as the Python engine.

const SPACE_PROPS =
  /(?:^|[\s;{])(-?(?:margin|padding|gap|row-gap|column-gap)(?:-(?:top|right|bottom|left|block|inline|start|end))?)\s*:\s*([^;{}]+)/gi;
const RADIUS_PROP = /(?:^|[\s;{])(border[\w-]*-radius)\s*:\s*([^;{}]+)/gi;
const BORDER_PROP =
  /(?:^|[\s;{])(border|border-(?:top|right|bottom|left|block|inline|block-start|block-end|inline-start|inline-end)(?:-width)?)\s*:\s*([^;{}]+)/gi;
const FONT_SIZE_PROP = /(?:^|[\s;{])(font-size)\s*:\s*([^;{}]+)/gi;
const Z_PROP = /(?:^|[\s;{])(z-index)\s*:\s*([^;{}]+)/gi;
const TIME_SHORT =
  /(?:^|[\s;{])(transition|animation|transition-duration|animation-duration)\s*:\s*([^;{}]+)/gi;
const TIMING_SHORT =
  /(?:^|[\s;{])(transition-timing-function|animation-timing-function)\s*:\s*([^;{}]+)/gi;
const LENGTH_RE = /(-?\d+(?:\.\d+)?)(px|rem)\b/g;
const MS_RE = /\b(\d+(?:\.\d+)?)(ms|s)\b/g;
const BEZIER_RE = /cubic-bezier\(([^)]*)\)/g;
const COLOR_PROPS =
  /(?:^|[\s;{])(color|background|background-color|border-color|border-top-color|border-bottom-color|fill|stroke|outline-color|text-decoration-color|caret-color|box-shadow|text-shadow)\s*:\s*([^;{}]+)/gi;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/;
const FUNC_COLOR_RE = /\b(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(/;

const EASE_KEYWORDS = ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "step-start", "step-end"];
const ALLOWED_BEZIERS = new Set(["0.16, 1, 0.3, 1", "0.7, 0, 0.84, 0"]);

const HOVER_RE = /:hover\b/;
const FOCUS_RE = /:focus(?:-visible)?\b/;
const REDUCED_RE = /prefers-reduced-motion/;
const COMMENT_RE = /\/\*[\s\S]*?\*\//g;

const IMG_RE = /<img\b[^>]*>/gi;
const ATTR_RE = /([\w-]+)\s*=\s*"([^"]*)"|([\w-]+)\s*=\s*'([^']*)'/gi;
const HTML_TAG_RE = /<html\b[^>]*>/gi;
const BUTTON_RE = /<(button|summary)\b[^>]*>([\s\S]*?)<\/\1>/gi;
const A_RE = /<(a)\b[^>]*href=[^>]*>([\s\S]*?)<\/\1>/gi;
const LINK_RE = /<link\b[^>]*>/gi;
const TAG_STRIP_RE = /<[^>]+>/g;
const INLINE_STYLE_RE = /style\s*=\s*"([^"]*)"/gi;
const WATCHED_INLINE =
  /(?:^|[;])(font-size|padding|margin|gap|border-radius|width|height)\s*:\s*(?![^;]*var\()[^;]*\d/i;
const STYLE_BLOCK_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
const ALL_RE = /(?:^|\s|,)all(?:\s|,|$)/;

/** Remove var(...) spans so literals beside token references still check. */
function stripVars(value: string): string {
  return value.replace(/var\([^)]*\)/g, " ");
}

function attrsOf(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  let m: RegExpExecArray | null;
  ATTR_RE.lastIndex = 0;
  while ((m = ATTR_RE.exec(tag)) !== null) {
    const name = (m[1] ?? m[3] ?? "").toLowerCase();
    out[name] = m[2] !== undefined ? m[2] : (m[4] ?? "");
  }
  return out;
}

// ---------------------------------------------------------------------------
// The registry — findings that teach: every finding is stamped with the fix
// and the reference file behind its rule.

const RULE_IDS = [
  "dpill/space-off-scale",
  "dpill/radius-off-scale",
  "dpill/font-off-ramp",
  "dpill/z-off-scale",
  "dpill/duration-off-scale",
  "dpill/easing-off-scale",
  "dpill/transition-all",
  "dpill/border-not-hairline",
  "dpill/hardcoded-color",
  "dpill/hover-no-focus",
  "dpill/no-reduced-motion",
  "dpill/inline-token-bypass",
  "dpill/img-no-alt",
  "dpill/img-no-dimensions",
  "dpill/lang-missing",
  "dpill/control-no-name",
];

function ruleTeaching(): Map<string, { fix: string; ref: string }> {
  const out = new Map<string, { fix: string; ref: string }>();
  for (const r of RULES) out.set(r.id, { fix: r.fix, ref: r.reference });
  return out;
}

/** The same law registry_sync() enforces: the registry and the implementation agree. */
export function registrySync(): { ok: boolean; problems: string[] } {
  const declared = RULES.map((r) => r.id);
  const problems: string[] = [];
  for (const rid of RULE_IDS) {
    if (!declared.includes(rid)) problems.push(`implemented but not in the registry: ${rid}`);
  }
  for (const rid of declared) {
    if (!RULE_IDS.includes(rid)) problems.push(`in the registry but not implemented: ${rid}`);
  }
  return { ok: problems.length === 0, problems };
}

// ---------------------------------------------------------------------------
// The CSS line checks.

interface FileState {
  hover: boolean;
  focus: boolean;
  reduced: boolean;
  timed: boolean;
}

function sortPx(s: string): number {
  const n = parseFloat(String(s).replace(/px$/, ""));
  return Number.isFinite(n) ? n : 1e9;
}

function addFinding(
  findings: Finding[],
  file: string,
  line: number,
  col: number,
  rule: string,
  severity: Severity,
  message: string
) {
  findings.push({ file, line, col, rule, severity, message });
}

function checkLengths(
  value: string,
  scales: Scales,
  kind: "space" | "ramp" | "radius",
  file: string,
  line: number,
  col: number,
  findings: Finding[],
  rule: string,
  prop: string,
  allowZero = true
) {
  if (value.includes("var(") || value.includes("clamp(") || value.includes("calc(")) return;
  LENGTH_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = LENGTH_RE.exec(value)) !== null) {
    const num = parseFloat(m[1]);
    const unit = m[2];
    let px = unit === "rem" ? num * 16 : num;
    px = Math.round(px * 1000) / 1000;
    if (px === 0 && allowZero) continue;
    const token = Number.isInteger(px) ? `${px}px` : `${px}px`;
    const legal = scales[kind];
    const rounded = `${Math.round(px)}px`;
    if (!legal.has(token) && !legal.has(rounded)) {
      const legalList = Array.from(legal).sort((a, b) => sortPx(a) - sortPx(b));
      addFinding(
        findings,
        file,
        line,
        col,
        rule,
        "error",
        `${m[0]} in ${prop} is not on the ${kind} scale (${legalList.join(" ")}). Use the token, or write the exception down.`
      );
    }
  }
}

function checkEasing(value: string, file: string, line: number, col: number, findings: Finding[]) {
  if (value.includes("var(") || value.includes("spring(") || !value.includes("cubic-bezier")) {
    if (value.includes("cubic-bezier")) {
      // falls through to the bezier loop below
    } else {
      for (const kw of EASE_KEYWORDS) {
        const kwRe = new RegExp(`(?:^|[\\s,])${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|,|$)`);
        if (kwRe.test(value)) {
          addFinding(
            findings,
            file,
            line,
            col,
            "dpill/easing-off-scale",
            "warn",
            `'${kw}' is off the easing tokens. --ease-out / --ease-in, or write the exception.`
          );
        }
      }
      return;
    }
  }
  BEZIER_RE.lastIndex = 0;
  let bm: RegExpExecArray | null;
  while ((bm = BEZIER_RE.exec(value)) !== null) {
    const pts = bm[1].replace(/\s+/g, "");
    if (!ALLOWED_BEZIERS.has(pts)) {
      addFinding(
        findings,
        file,
        line,
        bm.index,
        "dpill/easing-off-scale",
        "warn",
        `cubic-bezier(${bm[1]}) is not a system curve. --ease-out / --ease-in.`
      );
    }
  }
}

function checkCssLine(
  line: string,
  lineno: number,
  file: string,
  scales: Scales,
  findings: Finding[],
  state: FileState
) {
  let m: RegExpExecArray | null;

  SPACE_PROPS.lastIndex = 0;
  while ((m = SPACE_PROPS.exec(line)) !== null) {
    checkLengths(m[2], scales, "space", file, lineno, m.index + m[0].indexOf(m[2]), findings, "dpill/space-off-scale", m[1]);
  }
  RADIUS_PROP.lastIndex = 0;
  while ((m = RADIUS_PROP.exec(line)) !== null) {
    const value = m[2];
    if (value.includes("50%")) {
      addFinding(
        findings,
        file,
        lineno,
        m.index + m[0].indexOf(m[2]),
        "dpill/radius-off-scale",
        "warn",
        "border-radius: 50% — circles are --radius-full in this system."
      );
    } else {
      checkLengths(value, scales, "radius", file, lineno, m.index + m[0].indexOf(m[2]), findings, "dpill/radius-off-scale", m[1]);
    }
  }
  BORDER_PROP.lastIndex = 0;
  while ((m = BORDER_PROP.exec(line)) !== null) {
    const value = m[2];
    const stripped = value.trim();
    if (stripped === "none" || stripped === "0" || stripped === "0px") continue;
    if (value.includes("var(") || value.includes("calc(")) continue;
    LENGTH_RE.lastIndex = 0;
    let lm: RegExpExecArray | null;
    while ((lm = LENGTH_RE.exec(value)) !== null) {
      if (parseFloat(lm[1]) > 1) {
        addFinding(
          findings,
          file,
          lineno,
          m.index + lm.index,
          "dpill/border-not-hairline",
          "error",
          `${lm[0]} border in ${m[1]}. Edges are 1px hairlines; weight comes from --line-strong.`
        );
      }
    }
  }
  FONT_SIZE_PROP.lastIndex = 0;
  while ((m = FONT_SIZE_PROP.exec(line)) !== null) {
    checkLengths(m[2], scales, "ramp", file, lineno, m.index + m[0].indexOf(m[2]), findings, "dpill/font-off-ramp", m[1], false);
  }
  Z_PROP.lastIndex = 0;
  while ((m = Z_PROP.exec(line)) !== null) {
    const value = m[2].trim();
    if (value && /\d/.test(value[0])) {
      const z = parseInt(value, 10);
      if (Number.isNaN(z)) continue;
      if (!scales.z.includes(z)) {
        addFinding(
          findings,
          file,
          lineno,
          m.index + m[0].indexOf(m[2]),
          "dpill/z-off-scale",
          "error",
          `z-index ${value} is not on the z scale (${[...scales.z].sort((a, b) => a - b).join(" ")}). Layers declare themselves.`
        );
      }
    }
  }
  TIME_SHORT.lastIndex = 0;
  while ((m = TIME_SHORT.exec(line)) !== null) {
    const value = m[2];
    const prop = m[1];
    // var() spans are stripped first: a literal beside a token reference
    // is still a literal. calc()/clamp() stay exempt — a computation is
    // a named decision.
    if (!value.includes("calc(") && !value.includes("clamp(")) {
      const stripped = stripVars(value);
      MS_RE.lastIndex = 0;
      let tm: RegExpExecArray | null;
      while ((tm = MS_RE.exec(stripped)) !== null) {
        const ms = parseFloat(tm[1]) * (tm[2] === "s" ? 1000 : 1);
        if (ms === 0 || ms === 0.01) continue; // the reduced-motion disable, not a duration
        const legal = scales.durations;
        const tok = `${ms}ms`;
        if (!legal.has(tok)) {
          addFinding(
            findings,
            file,
            lineno,
            m.index + m[0].indexOf(m[2]) + tm.index,
            "dpill/duration-off-scale",
            "error",
            `${tm[0]} in ${prop} is not on the duration scale (${Array.from(legal).sort().join(" ")}). --dur-1, --dur-2, --dur-3.`
          );
        }
      }
    }
    state.timed = true;
    if (prop === "transition" && ALL_RE.test(value)) {
      addFinding(
        findings,
        file,
        lineno,
        m.index + m[0].indexOf(m[2]),
        "dpill/transition-all",
        "error",
        "transition: all animates layout. Name the properties that actually change."
      );
    }
  }
  TIMING_SHORT.lastIndex = 0;
  while ((m = TIMING_SHORT.exec(line)) !== null) {
    checkEasing(m[2], file, lineno, m.index + m[0].indexOf(m[2]), findings);
  }
  TIME_SHORT.lastIndex = 0;
  while ((m = TIME_SHORT.exec(line)) !== null) {
    const prop = m[1];
    if (prop === "transition" || prop === "animation") {
      const value = m[2];
      if (value.includes("calc(") || value.includes("clamp(")) continue;
      let stripped = stripVars(value);
      if (prop === "animation") {
        // linear in an animation is constant velocity — mechanical,
        // not an interaction curve. Ambient loops may be linear.
        stripped = stripped.replace(/\blinear\b/g, " ");
      }
      checkEasing(stripped, file, lineno, m.index + m[0].indexOf(m[2]), findings);
    }
  }
  COLOR_PROPS.lastIndex = 0;
  while ((m = COLOR_PROPS.exec(line)) !== null) {
    const value = m[2];
    if (value.includes("var(")) continue;
    const hit = HEX_RE.test(value) || FUNC_COLOR_RE.test(value);
    if (hit) {
      addFinding(
        findings,
        file,
        lineno,
        m.index + m[0].indexOf(m[2]),
        "dpill/hardcoded-color",
        "warn",
        `a literal color in ${m[1]}. Roles come from base.css; a color outside the roles is a written exception.`
      );
    }
  }
  if (HOVER_RE.test(line)) state.hover = true;
  if (FOCUS_RE.test(line)) state.focus = true;
  if (REDUCED_RE.test(line)) state.reduced = true;
}

// ---------------------------------------------------------------------------
// The HTML checks.

function checkHtml(
  source: string,
  file: string,
  findings: Finding[],
  scales: Scales | null,
  cssState: FileState | null
) {
  const lines = source.split("\n");
  lines.forEach((line, i) => {
    const lineno = i + 1;
    IMG_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = IMG_RE.exec(line)) !== null) {
      const a = attrsOf(m[0]);
      if (!("alt" in a)) {
        addFinding(
          findings,
          file,
          lineno,
          m.index,
          "dpill/img-no-alt",
          "error",
          'an <img> without alt. Meaningful gets words; decorative gets alt="".'
        );
      }
      if (!("width" in a) || !("height" in a)) {
        addFinding(
          findings,
          file,
          lineno,
          m.index,
          "dpill/img-no-dimensions",
          "warn",
          "an <img> without width and height reserves no space; the stream shifts under it."
        );
      }
    }
    INLINE_STYLE_RE.lastIndex = 0;
    let sm: RegExpExecArray | null;
    while ((sm = INLINE_STYLE_RE.exec(line)) !== null) {
      if (WATCHED_INLINE.test(sm[1])) {
        addFinding(
          findings,
          file,
          lineno,
          sm.index,
          "dpill/inline-token-bypass",
          "warn",
          "sizing inside a style attribute bypasses the tokens. Classes and vars, not literals."
        );
      }
    }
  });
  HTML_TAG_RE.lastIndex = 0;
  let hm: RegExpExecArray | null;
  while ((hm = HTML_TAG_RE.exec(source)) !== null) {
    const tag = hm[0];
    const lineno = source.slice(0, hm.index).split("\n").length;
    if (!("lang" in attrsOf(tag))) {
      addFinding(
        findings,
        file,
        lineno,
        hm.index,
        "dpill/lang-missing",
        "error",
        "<html> has no lang. Screen readers pick the wrong voice for every word on the page."
      );
    }
  }
  // <style> blocks are CSS. Scan them with the real line numbers.
  if (scales !== null && cssState !== null) {
    STYLE_BLOCK_RE.lastIndex = 0;
    let bm: RegExpExecArray | null;
    while ((bm = STYLE_BLOCK_RE.exec(source)) !== null) {
      const block = bm[1];
      const baseLine = source.slice(0, bm.index + bm[0].indexOf(block)).split("\n").length - 1;
      block.split("\n").forEach((line, idx) => {
        checkCssLine(line, baseLine + idx + 1, file, scales, findings, cssState);
      });
    }
  }
  for (const re of [BUTTON_RE, A_RE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(source)) !== null) {
      const tag = m[0];
      const a = attrsOf(tag);
      const text = (m[2] ?? "").replace(TAG_STRIP_RE, "").trim();
      const lineno = source.slice(0, m.index).split("\n").length;
      if (!text && !(a["aria-label"] || a["aria-labelledby"] || a["title"])) {
        const kind = (m[2] ?? "").includes("<svg") ? "icon control" : "control";
        addFinding(
          findings,
          file,
          lineno,
          m.index,
          "dpill/control-no-name",
          "error",
          `a ${kind} with no accessible name. Text, or aria-label with the verb.`
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// The callable API.

export interface CritiqueOptions {
  allow?: string[];
  strict?: boolean;
  /** Resolves a local stylesheet href for project flags (reduced-motion,
   *  focus, hover), the way the CLI follows a relative <link>. In the
   *  browser there is nothing to resolve; in tests this is the filesystem. */
  resolveLink?: (href: string) => string | null;
}

function freshState(): FileState {
  return { hover: false, focus: false, reduced: false, timed: false };
}

export function critique(files: SourceFile[], options: CritiqueOptions = {}): CritiqueResult {
  const { allow = [], strict = false } = options;
  const allowSet = new Set(allow);
  const scales = buildScales();
  const findings: Finding[] = [];
  const cssAny = { timed: false, reduced: false };

  for (const f of files) {
    // The CLI strips comments before scanning; the browser does the same so
    // pasted CSS is checked the way a checked-in file would be.
    const text = f.text.replace(COMMENT_RE, " ");
    if (f.kind === "html") {
      const state = freshState();
      checkHtml(text, f.name, findings, scales, state);
      linkedFlags(text, state, options.resolveLink);
      cssAny.timed = cssAny.timed || state.timed;
      cssAny.reduced = cssAny.reduced || state.reduced;
    } else {
      const state = freshState();
      const lines = text.split("\n");
      lines.forEach((line, i) => checkCssLine(line, i + 1, f.name, scales, findings, state));
      cssAny.timed = cssAny.timed || state.timed;
      cssAny.reduced = cssAny.reduced || state.reduced;
      if (state.hover && !state.focus) {
        addFinding(
          findings,
          f.name,
          1,
          1,
          "dpill/hover-no-focus",
          "warn",
          "this file styles :hover but never :focus or :focus-visible. If base.css draws the ring globally, declare that; otherwise the control is unreachable-looking."
        );
      }
    }
  }
  if (cssAny.timed && !cssAny.reduced) {
    findings.push({
      file: "(project)",
      line: 1,
      col: 1,
      rule: "dpill/no-reduced-motion",
      severity: "warn",
      message:
        "transitions or animations are used but no scanned file carries prefers-reduced-motion. base.css ships it; use it.",
    });
  }
  // stamp every finding with the registry's teaching: the fix and the
  // reference file behind the rule.
  const teach = ruleTeaching();
  for (const f of findings) {
    const t = teach.get(f.rule);
    if (t) {
      f.fix = t.fix;
      f.ref = t.ref;
    }
  }
  const kept = findings.filter((f) => !allowSet.has(f.rule));
  kept.sort((a, b) => {
    const aErr = a.severity !== "error" ? 1 : 0;
    const bErr = b.severity !== "error" ? 1 : 0;
    if (aErr !== bErr) return aErr - bErr;
    if (a.file !== b.file) return a.file < b.file ? -1 : 1;
    return a.line - b.line;
  });
  const stats: Stats = {
    files: files.length,
    errors: kept.filter((f) => f.severity === "error").length,
    warnings: kept.filter((f) => f.severity === "warn").length,
    rules_fired: Array.from(new Set(kept.map((f) => f.rule))).sort(),
  };
  const failed = stats.errors > 0 || (strict && stats.warnings > 0);
  return { findings: kept, stats, exitCode: failed ? 2 : 0 };
}

/**
 * Follow local <link rel=stylesheet> targets for project context only
 * (does the page's own stylesheet carry reduced motion, focus, hover).
 * The linked file is not rule-scanned: name it explicitly to check it.
 */
function linkedFlags(text: string, flags: FileState, resolve?: (href: string) => string | null) {
  if (!resolve) return;
  LINK_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = LINK_RE.exec(text)) !== null) {
    const a = attrsOf(m[0]);
    const href = a["href"] ?? "";
    const rel = (a["rel"] ?? "").toLowerCase();
    if (!rel.includes("stylesheet") || !href || /^(http|\/\/|data:)/.test(href)) continue;
    const linked = resolve(href);
    if (linked === null) continue;
    if (REDUCED_RE.test(linked)) flags.reduced = true;
    if (FOCUS_RE.test(linked)) flags.focus = true;
    if (HOVER_RE.test(linked)) flags.hover = true;
    if (new RegExp(TIME_SHORT.source, "i").test(linked)) flags.timed = true;
  }
}

/** Run the gate on the live document — the site auditing itself. */
export function critiqueDocument(): CritiqueResult {
  if (typeof document === "undefined") {
    return { findings: [], stats: { files: 0, errors: 0, warnings: 0, rules_fired: [] }, exitCode: 0 };
  }
  // Scope the scan to product DOM: the dev server injects its own chrome
  // (nextjs-portal dev tools, next-route-announcer) that never ships. Those
  // framework elements are not this product's markup, so the audit clones the
  // document and drops them before serializing — production never renders them.
  const clone = document.documentElement.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll("nextjs-portal, next-route-announcer, nextjs-viewport, [data-nextjs-dev-tools]")
    .forEach((el) => el.remove());
  // Displayed code samples (the gate's teaching fixtures, the "view code"
  // panes, the law bodies) are TEXT, not styling — when serialized they
  // re-appear as escaped markup and would false-positive on style-attribute
  // rules. Blank their text content; real parsed <style> blocks stay.
  clone.querySelectorAll("pre, code, textarea").forEach((el) => {
    el.textContent = "";
  });
  const source = clone.outerHTML;
  return critique([{ name: "document.html", text: source, kind: "html" }]);
}
