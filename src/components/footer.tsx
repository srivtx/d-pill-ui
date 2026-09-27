"use client";

import { Mark } from "@/components/topbar";

const COLUMNS: Array<{ heading: string; links: Array<{ href: string; label: string; external?: boolean }> }> = [
  {
    heading: "The system",
    links: [
      { href: "#blocks", label: "Blocks" },
      { href: "#gate", label: "The gate" },
      { href: "#tokens", label: "Tokens" },
      { href: "#laws", label: "The laws" },
    ],
  },
  {
    heading: "The source",
    links: [
      { href: "https://github.com/srivtx/d-pill", label: "GitHub repository", external: true },
      { href: "https://github.com/srivtx/d-pill/releases", label: "Releases", external: true },
      { href: "https://srivtx.github.io/d-pill/", label: "The demo page", external: true },
      { href: "https://srivtx.github.io/d-pill/llms.txt", label: "llms.txt", external: true },
    ],
  },
  {
    heading: "The contract",
    links: [
      { href: "https://github.com/srivtx/d-pill/blob/main/CONTRIBUTING.md", label: "Contributing", external: true },
      { href: "https://github.com/srivtx/d-pill/blob/main/CHANGELOG.md", label: "Changelog", external: true },
      { href: "https://github.com/srivtx/d-pill/blob/main/ROADMAP.md", label: "Roadmap", external: true },
      { href: "https://github.com/srivtx/d-pill/blob/main/SECURITY.md", label: "Security", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="frame stack">
        <div className="split">
          <div className="stack tight">
            <p className="cluster">
              <Mark />
              <span className="wordmark">d-pill</span>
            </p>
            <p className="quiet measure">
              Interfaces that look decided. One stylesheet, forty laws, and a gate
              that reads the page.
            </p>
          </div>
          <div className="cluster" style={{ gap: "var(--space-7)", justifyContent: "space-around" }}>
            {COLUMNS.map((col) => (
              <nav key={col.heading} className="stack tight" aria-label={col.heading}>
                <p className="caps">{col.heading}</p>
                <ul className="rows" style={{ borderTop: "0", borderBottom: "0" }}>
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <hr />
        <p className="quiet cluster between">
          <span>MIT license. v1.6.0.</span>
          <span className="mono">This site is built from the tokens it sells.</span>
        </p>
      </div>
    </footer>
  );
}
