'use client';

/**
 * Token Explorer — the 85 decisions rendered from the machine export.
 *
 * Every card is the export itself, not a picture of it. The hue dial writes
 * --hue on the html element (the whole site re-tints live, both themes); the
 * theme control flips html[data-theme]. Clicking a card copies its
 * custom-property name. Ratios in the contrast matrix are computed by
 * src/lib/dpill/contrast.ts from the same frozen strings.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { TOKENS } from '@/lib/dpill/data';
import { contrastRatio, formatRatio } from '@/lib/dpill/contrast';

type TabId = 'color' | 'space' | 'shape' | 'motion' | 'type' | 'layout';
type Theme = 'light' | 'dark';
type ColorKey = keyof typeof TOKENS.color.light;

const DEFAULT_HUE = 215;
const HUE_STORAGE_KEY = 'dpill-hue';
const THEME_STORAGE_KEY = 'dpill-theme';
const TOAST_MS = 2400;

const TABS: { id: TabId; label: string }[] = [
  { id: 'color', label: 'Color' },
  { id: 'space', label: 'Space' },
  { id: 'shape', label: 'Shape' },
  { id: 'motion', label: 'Motion' },
  { id: 'type', label: 'Type' },
  { id: 'layout', label: 'Layout' },
];

const COLOR_KEYS = [
  'bg',
  'bg-subtle',
  'surface',
  'ink',
  'ink-muted',
  'line',
  'line-strong',
  'accent',
  'accent-ink',
  'accent-soft',
  'focus',
  'danger',
  'danger-ink',
  'danger-soft',
  'ok',
  'warn',
] as const satisfies readonly ColorKey[];

const COMPOUND_KEYS = [
  'border',
  'border-strong',
  'shadow-overlay',
] as const satisfies readonly ColorKey[];

const CONTRAST_PAIRS: { label: string; fg: ColorKey; bg: ColorKey }[] = [
  { label: '--ink / --bg', fg: 'ink', bg: 'bg' },
  { label: '--ink-muted / --bg', fg: 'ink-muted', bg: 'bg' },
  { label: '--ink / --surface', fg: 'ink', bg: 'surface' },
  { label: '--accent-ink / --accent', fg: 'accent-ink', bg: 'accent' },
  { label: '--ink / --accent-soft', fg: 'ink', bg: 'accent-soft' },
];

const SPACE_KEYS = [
  'space-1',
  'space-2',
  'space-3',
  'space-4',
  'space-5',
  'space-6',
  'space-7',
  'space-8',
  'space-9',
  'space-10',
] as const satisfies readonly (keyof typeof TOKENS.space.scale)[];

const SHAPE_KEYS = [
  'radius-sm',
  'radius',
  'radius-lg',
  'radius-full',
] as const satisfies readonly (keyof typeof TOKENS.shape)[];

const MOTION_KEYS = [
  'dur-1',
  'dur-2',
  'dur-3',
  'ease-out',
  'ease-in',
] as const satisfies readonly (keyof typeof TOKENS.motion)[];

const DEMO_KEYS = ['dur-1', 'dur-2', 'dur-3'] as const satisfies readonly (keyof typeof TOKENS.motion)[];

const RAMP_KEYS = [
  'text-xs',
  'text-sm',
  'text-md',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
] as const satisfies readonly (keyof typeof TOKENS.type.ramp)[];

const LAYOUT_KEYS = [
  'measure',
  'page',
  'control-h',
  'header-h',
  'section-pad',
  'row-pad',
] as const satisfies readonly (keyof typeof TOKENS.layout)[];

/* Scoped styles (.tx-*), token-legal by construction: every value a var. */
const TX_CSS = `
  .tx-card { height: auto; font-weight: 500; line-height: var(--leading-ui); }
  .tx-card .token-meta { flex: 1; }
  .tx-card .token-value { overflow-wrap: anywhere; }
  .tx-copy { color: var(--ink-muted); }
  .tx-push { margin-inline-start: auto; }
  .tx-swatch { background: var(--sw); }
  .tx-chroma { background: oklch(0.7 var(--chroma-neutral) var(--hue)); }
  .tx-bar-wrap { flex: none; width: var(--space-10); display: flex; align-items: center; }
  .tx-bar { width: var(--w); height: var(--space-1); background: var(--accent); border-radius: var(--radius-full); }
  .tx-radius { flex: none; width: var(--space-7); height: var(--space-7); border: var(--border-strong); border-radius: var(--r); background: var(--accent-soft); }
  .tx-size { flex: none; font-family: var(--font-display); font-size: var(--fs); line-height: var(--leading-display); }
  .tx-dot { width: var(--space-3); height: var(--space-3); border-radius: var(--radius-full); background: var(--line-strong); transition: background var(--d) var(--ease-out); }
  .tx-demo:hover .tx-dot, .tx-demo:focus-visible .tx-dot { background: var(--accent); }
  .tx-fail { color: var(--danger); border-color: color-mix(in oklch, var(--danger) 40%, transparent); }
  @media (prefers-reduced-motion: reduce) {
    .tx-dot { transition-duration: 0.01ms; }
  }
`;

const readStored = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // storage refused; the default stands
  }
};

const writeStored = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage refused; the control still works for this page
  }
};

const clearStored = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // storage refused; nothing to clear
  }
};

const readThemeAttr = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const serverTheme = (): Theme => 'light';

/** html[data-theme] is the store; any control that flips it re-renders us. */
const subscribeTheme = (notify: () => void): (() => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
};

const getHueSnapshot = (): string => {
  const value = document.documentElement.style.getPropertyValue('--hue').trim();
  return value === '' ? String(DEFAULT_HUE) : value;
};

const serverHue = (): string => String(DEFAULT_HUE);

/** The inline --hue on html is the store; a stored hue is applied once on mount. */
const subscribeHue = (notify: () => void): (() => void) => {
  const stored = readStored(HUE_STORAGE_KEY);
  const parsed = stored === null ? Number.NaN : Number(stored);
  if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 360) {
    document.documentElement.style.setProperty('--hue', String(parsed));
  }
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
  });
  return () => observer.disconnect();
};

const swatchStyle = (name: string): CSSProperties =>
  ({ '--sw': `var(${name})` }) as CSSProperties;

const barStyle = (name: string): CSSProperties =>
  ({ '--w': `var(${name})` }) as CSSProperties;

const radiusStyle = (name: string): CSSProperties =>
  ({ '--r': `var(${name})` }) as CSSProperties;

const sizeStyle = (name: string): CSSProperties =>
  ({ '--fs': `var(${name})` }) as CSSProperties;

const dotStyle = (name: string): CSSProperties =>
  ({ '--d': `var(${name})` }) as CSSProperties;

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="tx-copy"
      width="1.25rem"
      height="1.25rem"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

interface TokenCardProps {
  name: string;
  value: string;
  onCopy: (name: string) => void;
  visual?: ReactNode;
}

function TokenCard({ name, value, onCopy, visual }: TokenCardProps) {
  return (
    <button type="button" className="token-card tx-card" onClick={() => onCopy(name)}>
      {visual}
      <span className="token-meta">
        <span className="token-name">{name}</span>
        <span className="token-value">{value}</span>
      </span>
      <CopyIcon />
    </button>
  );
}

interface CopyProp {
  onCopy: (name: string) => void;
}

function ColorPanel({ theme, onCopy }: CopyProp & { theme: Theme }) {
  const group = TOKENS.color[theme];
  return (
    <div className="stack">
      <p className="caps">{theme === 'dark' ? 'Dark group' : 'Light group'}</p>
      <div className="token-grid">
        <TokenCard
          name="--hue"
          value={TOKENS.color.hue}
          onCopy={onCopy}
          visual={<span className="swatch hue" />}
        />
        <TokenCard
          name="--chroma-neutral"
          value={TOKENS.color.chromaNeutral}
          onCopy={onCopy}
          visual={<span className="swatch tx-chroma" />}
        />
        {COLOR_KEYS.map((key) => (
          <TokenCard
            key={key}
            name={`--${key}`}
            value={group[key]}
            onCopy={onCopy}
            visual={<span className="swatch tx-swatch" style={swatchStyle(`--${key}`)} />}
          />
        ))}
      </div>
      <div className="panel tight stack tight">
        <p className="caps">Compound</p>
        <p className="quiet">
          Three entries are compounds, not single colors — a hairline edge, its
          heavier sibling, a shadow with distance. They ship whole and ride the
          hue with everything else.
        </p>
        {COMPOUND_KEYS.map((key) => (
          <div key={key} className="cluster between">
            <span className="token-name">{`--${key}`}</span>
            <span className="token-value">{group[key]}</span>
          </div>
        ))}
      </div>
      <div className="stack tight">
        <p className="caps">Contrast, {theme} theme</p>
        <p className="quiet">Computed from the token export at the default hue 215.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Pair</th>
              <th scope="col" className="num">Ratio</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {CONTRAST_PAIRS.map((pair) => {
              const ratio = contrastRatio(group[pair.fg], group[pair.bg]);
              const pass = ratio !== null && ratio >= 4.5;
              return (
                <tr key={pair.label}>
                  <td className="mono">{pair.label}</td>
                  <td className="num mono">{ratio === null ? '—' : formatRatio(ratio)}</td>
                  <td>
                    {ratio === null ? (
                      <span className="chip">unparsed</span>
                    ) : pass ? (
                      <span className="chip ok">pass</span>
                    ) : (
                      <span className="chip tx-fail">below floor</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SpacePanel({ onCopy }: CopyProp) {
  return (
    <div className="stack">
      <p className="quiet">Four to 128 pixels. There is no 13.</p>
      <div className="token-grid">
        {SPACE_KEYS.map((key) => (
          <TokenCard
            key={key}
            name={`--${key}`}
            value={TOKENS.space.scale[key]}
            onCopy={onCopy}
            visual={
              <span className="tx-bar-wrap" aria-hidden="true">
                <span className="tx-bar" style={barStyle(`--${key}`)} />
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

function ShapePanel({ onCopy }: CopyProp) {
  return (
    <div className="stack">
      <p className="quiet">Four corners. 999 is a pill, not a percentage.</p>
      <div className="token-grid">
        {SHAPE_KEYS.map((key) => (
          <TokenCard
            key={key}
            name={`--${key}`}
            value={TOKENS.shape[key]}
            onCopy={onCopy}
            visual={<span className="tx-radius" style={radiusStyle(`--${key}`)} aria-hidden="true" />}
          />
        ))}
      </div>
    </div>
  );
}

function MotionPanel({ onCopy }: CopyProp) {
  return (
    <div className="stack">
      <p className="quiet">Three clocks, two curves. A 300ms hover is a different page.</p>
      <div className="token-grid">
        {MOTION_KEYS.map((key) => (
          <TokenCard key={key} name={`--${key}`} value={TOKENS.motion[key]} onCopy={onCopy} />
        ))}
      </div>
      <div className="stack tight">
        <p className="caps">Demo</p>
        <div className="cluster">
          {DEMO_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className="tx-demo"
              aria-label={`Preview the ${TOKENS.motion[key]} transition`}
            >
              <span className="tx-dot" style={dotStyle(`--${key}`)} aria-hidden="true" />
              {TOKENS.motion[key]}
            </button>
          ))}
        </div>
        <p className="quiet">Hover or focus a pill; each dot fills on its own clock.</p>
      </div>
    </div>
  );
}

function TypePanel({ onCopy }: CopyProp) {
  return (
    <div className="stack">
      <p className="quiet">Seven sizes. A size between two steps is a hesitation.</p>
      <div className="token-grid">
        {RAMP_KEYS.map((key) => (
          <TokenCard
            key={key}
            name={`--${key}`}
            value={TOKENS.type.ramp[key]}
            onCopy={onCopy}
            visual={
              <span className="tx-size" style={sizeStyle(`--${key}`)} aria-hidden="true">
                Aa
              </span>
            }
          />
        ))}
      </div>
    </div>
  );
}

function LayoutPanel({ onCopy }: CopyProp) {
  return (
    <div className="stack">
      <p className="quiet">The measure, the page width, and the heights the shell rides on.</p>
      <div className="token-grid">
        {LAYOUT_KEYS.map((key) => (
          <TokenCard key={key} name={`--${key}`} value={TOKENS.layout[key]} onCopy={onCopy} />
        ))}
      </div>
    </div>
  );
}

export default function TokenExplorer() {
  const [tab, setTab] = useState<TabId>('color');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  // The DOM is the source of truth: html[data-theme] and the inline --hue.
  // Writing them re-renders this section through the observers above.
  const theme = useSyncExternalStore(subscribeTheme, readThemeAttr, serverTheme);
  const hueSnapshot = useSyncExternalStore(subscribeHue, getHueSnapshot, serverHue);
  const parsedHue = Number(hueSnapshot);
  const hue = Number.isFinite(parsedHue) ? parsedHue : DEFAULT_HUE;

  // A pending toast must never outlive the section.
  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = (message: string): void => {
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  };

  const copyToken = (name: string): void => {
    const text = `var(${name})`;
    try {
      navigator.clipboard
        .writeText(text)
        .then(
          () => showToast(`${name} copied`),
          () => showToast(`Copy blocked — ${name}`),
        );
    } catch {
      showToast(`Copy blocked — ${name}`);
    }
  };

  const applyHue = (value: number): void => {
    document.documentElement.style.setProperty('--hue', String(value));
    writeStored(HUE_STORAGE_KEY, String(value));
  };

  const resetHue = (): void => {
    document.documentElement.style.setProperty('--hue', String(DEFAULT_HUE));
    clearStored(HUE_STORAGE_KEY);
  };

  const toggleTheme = (): void => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    writeStored(THEME_STORAGE_KEY, next);
  };

  const activeLabel = TABS.find((entry) => entry.id === tab)?.label ?? 'Token';

  return (
    <section id="tokens" className="section frame">
      <style>{TX_CSS}</style>
      <div className="sec-head">
        <p className="caps">Tokens</p>
        <h2>Eighty-five decisions, one variable</h2>
        <p className="quiet">
          Every color on this page is oklch carrying the same hue angle. Move the
          dial and both themes re-tint live — accents, edges, shadows — with no
          reload and no second palette. Click a card to copy its
          custom-property name; the values are the machine export, not a
          picture of it.
        </p>
      </div>
      <div className="stack">
        <div className="panel tight">
          <div className="hue-row">
            <label className="caps" htmlFor="tx-hue">
              Hue
            </label>
            <input
              id="tx-hue"
              type="range"
              min={0}
              max={360}
              step={1}
              value={hue}
              aria-label="Hue angle in degrees"
              onChange={(event) => applyHue(Number(event.target.value))}
            />
            <span className="hue-value num">{hue}</span>
            <button type="button" className="ghost" onClick={resetHue}>
              Reset
            </button>
            <button
              type="button"
              className="ghost tx-push"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
        <div className="tabbar" role="tablist" aria-label="Token groups">
          {TABS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`tx-tab-${entry.id}`}
              aria-selected={tab === entry.id}
              aria-controls="tx-panel"
              onClick={() => setTab(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id="tx-panel" aria-label={`${activeLabel} tokens`}>
          {tab === 'color' ? (
            <ColorPanel theme={theme} onCopy={copyToken} />
          ) : tab === 'space' ? (
            <SpacePanel onCopy={copyToken} />
          ) : tab === 'shape' ? (
            <ShapePanel onCopy={copyToken} />
          ) : tab === 'motion' ? (
            <MotionPanel onCopy={copyToken} />
          ) : tab === 'type' ? (
            <TypePanel onCopy={copyToken} />
          ) : (
            <LayoutPanel onCopy={copyToken} />
          )}
        </div>
      </div>
      {toast !== null && (
        <div className="toasts" role="status">
          <p className="toast">{toast}</p>
        </div>
      )}
    </section>
  );
}
