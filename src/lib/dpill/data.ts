/**
 * d-pill machine data — the bundled export of references/tokens.json and
 * references/rules.json from the d-pill skill (v1.6.0).
 *
 * The engine (engine.ts) verifies it agrees with the implementation before
 * every run, the same law the CLI enforces between rules.json and critique.py.
 * There is no second set of numbers.
 */

export const DILL_VERSION = "1.6.0";

export interface RuleEntry {
  id: string;
  severity: "error" | "warn";
  target: "css" | "html" | "project";
  summary: string;
  check: string;
  fix: string;
  reference: string;
}

/** The verified export of base.css scales (see references/tokens.json). */
export const TOKENS = {
  color: {
    hue: "215",
    chromaNeutral: "0.008",
    light: {
      bg: "oklch(0.985 0.008 215)",
      "bg-subtle": "oklch(0.965 0.008 215)",
      surface: "oklch(0.995 0.004 215)",
      ink: "oklch(0.27 0.018 215)",
      "ink-muted": "oklch(0.46 0.016 215)",
      line: "oklch(0.86 0.01 215)",
      "line-strong": "oklch(0.62 0.016 215)",
      accent: "oklch(0.47 0.12 215)",
      "accent-ink": "oklch(0.985 0.005 215)",
      "accent-soft": "oklch(0.94 0.025 215)",
      focus: "oklch(0.47 0.12 215)",
      danger: "oklch(0.47 0.15 25)",
      "danger-ink": "oklch(0.985 0.005 25)",
      "danger-soft": "oklch(0.95 0.02 25)",
      ok: "oklch(0.42 0.09 155)",
      warn: "oklch(0.45 0.09 70)",
      border: "1px solid oklch(0.86 0.01 215)",
      "border-strong": "1px solid oklch(0.62 0.016 215)",
      "shadow-overlay": "0 16px 40px oklch(0.25 0.02 215 / 0.16)",
    },
    dark: {
      bg: "oklch(0.17 0.008 215)",
      "bg-subtle": "oklch(0.21 0.01 215)",
      surface: "oklch(0.2 0.01 215)",
      ink: "oklch(0.93 0.008 215)",
      "ink-muted": "oklch(0.74 0.014 215)",
      line: "oklch(0.32 0.01 215)",
      "line-strong": "oklch(0.55 0.014 215)",
      accent: "oklch(0.78 0.12 215)",
      "accent-ink": "oklch(0.18 0.02 215)",
      "accent-soft": "oklch(0.28 0.03 215)",
      focus: "oklch(0.78 0.12 215)",
      danger: "oklch(0.74 0.12 25)",
      "danger-ink": "oklch(0.18 0.03 25)",
      "danger-soft": "oklch(0.28 0.04 25)",
      ok: "oklch(0.78 0.09 155)",
      warn: "oklch(0.82 0.09 75)",
      border: "1px solid oklch(0.32 0.01 215)",
      "border-strong": "1px solid oklch(0.55 0.014 215)",
      "shadow-overlay": "0 16px 40px oklch(0.05 0.01 215 / 0.55)",
    },
  },
  font: {
    display: '"Instrument Sans", "Avenir Next", "Segoe UI", sans-serif',
    text: '"Instrument Sans", "Avenir Next", "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  type: {
    ramp: {
      "text-xs": "0.75rem",
      "text-sm": "0.8125rem",
      "text-md": "0.9375rem",
      "text-lg": "1.125rem",
      "text-xl": "1.5rem",
      "text-2xl": "2.25rem",
      "text-3xl": "3.5rem",
    },
    "leading-display": "1.05",
    "leading-ui": "1.35",
    "leading-body": "1.55",
    "tracking-display": "-0.02em",
    "tracking-caps": "0.06em",
  },
  space: {
    scale: {
      "space-1": "0.25rem",
      "space-2": "0.5rem",
      "space-3": "0.75rem",
      "space-4": "1rem",
      "space-5": "1.5rem",
      "space-6": "2rem",
      "space-7": "3rem",
      "space-8": "4rem",
      "space-9": "6rem",
      "space-10": "8rem",
    },
    "scale-px": "4, 8, 12, 16, 24, 32, 48, 64, 96, 128 — there is no 13, 18, 20, or 22",
  },
  shape: {
    "radius-sm": "4px",
    radius: "6px",
    "radius-lg": "10px",
    "radius-full": "999px",
  },
  motion: {
    "dur-1": "120ms",
    "dur-2": "180ms",
    "dur-3": "240ms",
    "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "ease-in": "cubic-bezier(0.7, 0, 0.84, 0)",
  },
  z: {
    sticky: "10",
    dropdown: "20",
    drawer: "40",
    dialog: "50",
    toast: "60",
  },
  layout: {
    measure: "68ch",
    page: "72rem",
    "control-h": "2.25rem",
    "header-h": "3.5rem",
    "section-pad": "4rem",
    "row-pad": "0.75rem",
  },
} as const;

/** The rule registry — references/rules.json, verbatim. */
export const RULES: RuleEntry[] = [
  {
    id: "dpill/space-off-scale",
    severity: "error",
    target: "css",
    summary: "margin/padding/gap value is not on the space scale",
    check:
      "px/rem literals in margin, padding, gap, row-gap, column-gap against the space scale (4 8 12 16 24 32 48 64 96 128 px). var(), clamp(), and calc() with var() pass through.",
    fix: "Use --space-1..--space-10 or the classes that carry them (.stack, .cluster, .rows). A value off the scale is a new token decision — write it down or use the scale.",
    reference: "references/foundations.md",
  },
  {
    id: "dpill/radius-off-scale",
    severity: "error",
    target: "css",
    summary: "border-radius is not on the radius scale",
    check: "px/rem literals in any border-radius property against 4px, 6px, 10px, 999px. 50% is a warn pointing at --radius-full.",
    fix: "--radius-sm, --radius, --radius-lg, --radius-full. Nothing else, including 50%.",
    reference: "references/geometry.md",
  },
  {
    id: "dpill/font-off-ramp",
    severity: "error",
    target: "css",
    summary: "font-size is not on the type ramp",
    check: "px/rem literals in font-size against the ramp (12 13 15 18 24 36 56 px; 16 is the coarse-pointer input exception). var() and clamp() pass through.",
    fix: "--text-xs..--text-3xl. A size between two steps is not a size; it is a hesitation.",
    reference: "references/type.md",
  },
  {
    id: "dpill/z-off-scale",
    severity: "error",
    target: "css",
    summary: "z-index is not on the z scale",
    check: "integer z-index against 10 20 40 50 60 (and 0).",
    fix: "--z-sticky, --z-dropdown, --z-drawer, --z-dialog, --z-toast. A layer that needs 9999 is not a layer; it is a stack nobody mapped.",
    reference: "references/foundations.md",
  },
  {
    id: "dpill/duration-off-scale",
    severity: "error",
    target: "css",
    summary: "transition/animation duration is not on the duration scale",
    check: "ms/s literals in transition, animation, and their -duration forms against 120ms, 180ms, 240ms — var() spans are stripped first, so a literal beside a token reference is still checked. 0 and 0.01ms (the reduced-motion disable) pass.",
    fix: "--dur-1, --dur-2, --dur-3. The scale is the discipline; a 300ms hover is a different page.",
    reference: "references/interaction.md",
  },
  {
    id: "dpill/easing-off-scale",
    severity: "warn",
    target: "css",
    summary: "timing function is not a system curve",
    check: "easing keywords and cubic-bezier() literals in transitions and animations (shorthand included) against the two system curves. var(--ease-*) and spring() pass; linear in an animation is constant velocity and passes.",
    fix: "--ease-out (arrival), --ease-in (exit). A new curve is a written exception with the reason.",
    reference: "references/interaction.md",
  },
  {
    id: "dpill/transition-all",
    severity: "error",
    target: "css",
    summary: "transition: all",
    check: "the literal property list 'all' in a transition declaration.",
    fix: "Name the properties that change (background, color, border-color). 'all' animates layout and teaches the page to jank.",
    reference: "references/interaction.md",
  },
  {
    id: "dpill/border-not-hairline",
    severity: "error",
    target: "css",
    summary: "border width over 1px",
    check: "px/rem literals in border and border-side properties above 1px.",
    fix: "Edges are 1px hairlines. Weight comes from --line-strong, not thickness.",
    reference: "references/details.md",
  },
  {
    id: "dpill/hardcoded-color",
    severity: "warn",
    target: "css",
    summary: "a literal color where a role should be",
    check: "hex, rgb(), hsl(), oklch() literals in color-bearing declarations. var() passes; color-mix over var() passes.",
    fix: "Roles from base.css. A color outside the roles is a chart palette or a written exception, never a mood.",
    reference: "references/foundations.md",
  },
  {
    id: "dpill/hover-no-focus",
    severity: "warn",
    target: "css",
    summary: "a file styles :hover but never :focus-visible",
    check: "per CSS file: any :hover selector and no :focus/:focus-visible in the same file.",
    fix: "base.css draws the ring globally. If this file's controls ride on that, declare it; if not, the keyboard user sees nothing.",
    reference: "references/components.md",
  },
  {
    id: "dpill/no-reduced-motion",
    severity: "warn",
    target: "project",
    summary: "motion is used but prefers-reduced-motion appears in no scanned file",
    check: "any duration found and no prefers-reduced-motion media block anywhere in the scanned set.",
    fix: "base.css ships the reduced-motion block. Use it; do not fork the tokens without carrying it.",
    reference: "references/a11y.md",
  },
  {
    id: "dpill/inline-token-bypass",
    severity: "warn",
    target: "html",
    summary: "sizing literals inside a style attribute",
    check: 'style="..." containing font-size/padding/margin/gap/border-radius/width/height with a literal number; var() references pass.',
    fix: "Classes and vars. A style attribute with literals in it is a token system nobody uses.",
    reference: "references/foundations.md",
  },
  {
    id: "dpill/img-no-alt",
    severity: "error",
    target: "html",
    summary: "an <img> with no alt attribute",
    check: 'every <img> tag carries an alt attribute (alt="" counts — declared decorative).',
    fix: 'Meaningful images get words. Decorative ones get alt="" — the attribute is the decision.',
    reference: "references/a11y.md",
  },
  {
    id: "dpill/img-no-dimensions",
    severity: "warn",
    target: "html",
    summary: "an <img> without width and height",
    check: "every <img> carries width and height attributes so the box is reserved before load.",
    fix: "Reserve the space. Nothing below an unsized image should ever move — especially not under a stream.",
    reference: "references/ai-interfaces.md",
  },
  {
    id: "dpill/lang-missing",
    severity: "error",
    target: "html",
    summary: "<html> has no lang attribute",
    check: "the <html> tag carries lang.",
    fix: "One attribute decides which voice reads every word on the page. Set it.",
    reference: "references/a11y.md",
  },
  {
    id: "dpill/control-no-name",
    severity: "error",
    target: "html",
    summary: "a button, link, or summary with no accessible name",
    check: "every button, href link, and summary has text content, aria-label, aria-labelledby, or title.",
    fix: "Buttons are verbs. An icon control gets aria-label with the verb — 'Close', not 'X'.",
    reference: "references/components.md",
  },
];
