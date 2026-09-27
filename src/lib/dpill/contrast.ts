/**
 * d-pill contrast math — pure, dependency-free.
 *
 * parseOklch reads resolved OKLCH literals ("oklch(0.985 0.008 215)", with an
 * optional alpha after the slash). Anything that still embeds var() is an
 * unresolved reference and parses to null — only resolved literals have a
 * ratio. oklchToSrgb walks OKLab -> LMS -> linear sRGB -> gamma with the
 * standard matrices, clamping in linear light the way a browser clips an
 * out-of-gamut color. The constants mirror scripts/contrast.py in the skill,
 * so the ratios printed here and by the CLI agree.
 */

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parse one OKLCH channel: number, percentage (scaled by unitScale), or none. */
function parseChannel(raw: string, unitScale: number): number | null {
  const text = raw.trim().toLowerCase();
  if (text === "none") return 0;
  const percent = text.endsWith("%");
  const body = percent ? text.slice(0, -1) : text.replace(/deg$/, "");
  const value = Number(body);
  if (!Number.isFinite(value)) return null;
  return percent ? (value / 100) * unitScale : value;
}

/**
 * Parse an OKLCH color string. Handles "oklch(0.93 0.008 215)" and an
 * optional alpha after a slash ("oklch(0.25 0.02 215 / 0.16)" — the alpha is
 * read and ignored). Returns null for strings that embed var(), for other
 * color syntaxes, and for anything unparseable.
 */
export function parseOklch(css: string): Oklch | null {
  if (typeof css !== "string" || css.includes("var(")) return null;
  const match = /oklch\(\s*([^/)]+?)\s*(?:\/\s*[^)]+)?\s*\)/.exec(css);
  if (match === null) return null;
  const parts = match[1].trim().split(/\s+/);
  if (parts.length < 3) return null;
  const l = parseChannel(parts[0], 1);
  const c = parseChannel(parts[1], 0.4);
  const h = parseChannel(parts[2], 360);
  if (l === null || c === null || h === null) return null;
  return { l, c, h };
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/** sRGB gamma encode (linear 0..1 -> display 0..1). */
const encodeGamma = (value: number): number =>
  value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055;

/** sRGB gamma decode (display 0..1 -> linear 0..1). */
const decodeGamma = (value: number): number =>
  value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;

/**
 * OKLCH to gamma-encoded sRGB (each channel clamped to 0..1). OKLab to LMS
 * with the standard matrices, cubed to linear, to linear sRGB, then gamma.
 */
export function oklchToSrgb(color: Oklch): Rgb {
  const l = clamp01(color.l);
  const c = Math.max(0, color.c);
  const hue = (color.h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lCubed = l_ * l_ * l_;
  const mCubed = m_ * m_ * m_;
  const sCubed = s_ * s_ * s_;

  const linearR = 4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
  const linearG = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
  const linearB = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;

  return {
    r: encodeGamma(clamp01(linearR)),
    g: encodeGamma(clamp01(linearG)),
    b: encodeGamma(clamp01(linearB)),
  };
}

/** WCAG relative luminance of a gamma-encoded sRGB triple (0..1). */
export function relativeLuminance(rgb: Rgb): number {
  return (
    0.2126 * decodeGamma(rgb.r) + 0.7152 * decodeGamma(rgb.g) + 0.0722 * decodeGamma(rgb.b)
  );
}

/**
 * Contrast ratio of two OKLCH strings, e.g. 14.79. Null if either color is
 * unparseable (including unresolved var() references).
 */
export function contrastRatio(a: string, b: string): number | null {
  const ca = parseOklch(a);
  const cb = parseOklch(b);
  if (ca === null || cb === null) return null;
  const ya = relativeLuminance(oklchToSrgb(ca));
  const yb = relativeLuminance(oklchToSrgb(cb));
  const lighter = Math.max(ya, yb);
  const darker = Math.min(ya, yb);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Format a ratio for display, e.g. "14.79:1". */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/* ---- Self-checks ---------------------------------------------------------- */

export interface SelfCheck {
  name: string;
  detail: string;
  ok: boolean;
}

const approx = (value: number, target: number, tolerance: number): boolean =>
  Math.abs(value - target) <= tolerance;

// Literals mirror the frozen export in src/lib/dpill/data.ts (default hue 215).
const INK_L = "oklch(0.27 0.018 215)";
const INK_MUTED_L = "oklch(0.46 0.016 215)";
const BG_L = "oklch(0.985 0.008 215)";
const SURFACE_L = "oklch(0.995 0.004 215)";
const ACCENT_L = "oklch(0.47 0.12 215)";
const ACCENT_INK_L = "oklch(0.985 0.005 215)";
const ACCENT_SOFT_L = "oklch(0.94 0.025 215)";
const INK_D = "oklch(0.93 0.008 215)";
const BG_D = "oklch(0.17 0.008 215)";
const INK_MUTED_D = "oklch(0.74 0.014 215)";

/**
 * Every check the module must hold about the token set. Run selfTest() from a
 * shell (bun -e) — the component never calls this.
 */
export function selfChecks(): SelfCheck[] {
  const inkBgLight = contrastRatio(INK_L, BG_L);
  const inkMutedBgLight = contrastRatio(INK_MUTED_L, BG_L);
  const inkBgDark = contrastRatio(INK_D, BG_D);
  const accentInkAccent = contrastRatio(ACCENT_INK_L, ACCENT_L);
  const inkSurfaceLight = contrastRatio(INK_L, SURFACE_L);
  const inkMutedBgDark = contrastRatio(INK_MUTED_D, BG_D);
  const inkAccentSoft = contrastRatio(INK_L, ACCENT_SOFT_L);
  const alpha = parseOklch("oklch(0.25 0.02 215 / 0.16)");
  const fmt = (value: number | null): string =>
    value === null ? "null" : formatRatio(value);
  return [
    {
      name: "ink on bg, light, is a deep pass",
      detail: `expected ~14.7 +/- 1.5, got ${fmt(inkBgLight)}`,
      ok: inkBgLight !== null && approx(inkBgLight, 14.7, 1.5),
    },
    {
      name: "ink-muted on bg, light, clears the text floor",
      detail: `expected ~6.8 +/- 1.0, got ${fmt(inkMutedBgLight)}`,
      ok: inkMutedBgLight !== null && approx(inkMutedBgLight, 6.8, 1.0),
    },
    {
      name: "ink on bg, dark, clears the 13.5 figure by the reference value",
      detail: `expected >= 13.5 and ~15.58 +/- 1.5, got ${fmt(inkBgDark)}`,
      ok: inkBgDark !== null && inkBgDark >= 13.5 && approx(inkBgDark, 15.58, 1.5),
    },
    {
      name: "accent-ink on accent, light, passes 4.5",
      detail: `expected > 4.5, got ${fmt(accentInkAccent)}`,
      ok: accentInkAccent !== null && accentInkAccent > 4.5,
    },
    {
      name: "ink on surface, light, matches the audited 14.79",
      detail: `expected ~14.79 +/- 0.25, got ${fmt(inkSurfaceLight)}`,
      ok: inkSurfaceLight !== null && approx(inkSurfaceLight, 14.79, 0.25),
    },
    {
      name: "ink-muted on bg, dark, matches the audited 8.32",
      detail: `expected ~8.32 +/- 1.0, got ${fmt(inkMutedBgDark)}`,
      ok: inkMutedBgDark !== null && approx(inkMutedBgDark, 8.32, 1.0),
    },
    {
      name: "ink on accent-soft, light, matches the audited 12.66",
      detail: `expected ~12.66 +/- 0.5, got ${fmt(inkAccentSoft)}`,
      ok: inkAccentSoft !== null && approx(inkAccentSoft, 12.66, 0.5),
    },
    {
      name: "var() colors parse to null",
      detail: 'oklch(0.985 0.008 var(--hue)) and var(--bg) must both be null',
      ok:
        parseOklch("oklch(0.985 0.008 var(--hue))") === null &&
        parseOklch("var(--accent)") === null &&
        contrastRatio("var(--bg)", INK_L) === null,
    },
    {
      name: "alpha after the slash parses and is ignored",
      detail: 'oklch(0.25 0.02 215 / 0.16) must give l 0.25, c 0.02, h 215',
      ok:
        alpha !== null &&
        approx(alpha.l, 0.25, 1e-9) &&
        approx(alpha.c, 0.02, 1e-9) &&
        approx(alpha.h, 215, 1e-9),
    },
    {
      name: "formatRatio prints two decimals and the colon",
      detail: 'formatRatio(14.79) === "14.79:1" and formatRatio(6.8) === "6.80:1"',
      ok: formatRatio(14.79) === "14.79:1" && formatRatio(6.8) === "6.80:1",
    },
    {
      name: "non-OKLCH strings parse to null",
      detail: '"#ffffff", "1px solid", and "oklch()" must all be null',
      ok:
        parseOklch("#ffffff") === null &&
        parseOklch("1px solid") === null &&
        parseOklch("oklch()") === null,
    },
  ];
}

/** True when every self-check holds. */
export function selfTest(): boolean {
  return selfChecks().every((check) => check.ok);
}
