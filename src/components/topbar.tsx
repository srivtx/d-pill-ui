"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/** The mark: the iridescent capsule, drawn from the live hue. */
export function Mark({ large = false }: { large?: boolean }) {
  return <span className={`mark${large ? " mark-lg" : ""}`} aria-hidden="true" />;
}

const NAV = [
  { href: "#blocks", label: "Blocks" },
  { href: "#gate", label: "The gate" },
  { href: "#tokens", label: "Tokens" },
  { href: "#laws", label: "Laws" },
  { href: "#install", label: "Install" },
];

/** The theme lives on <html data-theme> so every toggle — topbar, token
 *  explorer — sees one source of truth and updates together. */
function useTheme(): "dark" | "light" {
  const subscribe = useCallback((onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"),
    () => "dark" as const
  );
}

function ThemeToggle() {
  const theme = useTheme();

  function flip() {
    // Read the live attribute, not the snapshot: two toggles in one tick
    // (or a flip from the token explorer) must both resolve from truth.
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("dpill-theme", next);
    } catch {
      /* private mode: the page still obeys for this visit */
    }
  }

  return (
    <button
      type="button"
      className="btn icon ghost"
      aria-label={theme === "dark" ? "Switch to the light theme" : "Switch to the dark theme"}
      onClick={flip}
    >
      <svg viewBox="0 0 20 20" width="1.25rem" height="1.25rem" fill="none" aria-hidden="true">
        {theme === "dark" ? (
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        ) : (
          <path
            d="M10 3a7 7 0 1 0 7 7 5.5 5.5 0 0 1-7-7z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        )}
      </svg>
    </button>
  );
}

export function Topbar() {
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ["blocks", "gate", "tokens", "laws", "install"]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="topbar">
      <a className="cluster" href="#main" aria-label="d-pill home" style={{ textDecoration: "none" }}>
        <Mark />
        <span className="wordmark">d-pill</span>
      </a>
      <nav className="nav-links" aria-label="Sections">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} aria-current={current === item.href ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="cluster">
        <ThemeToggle />
        <a
          className="btn icon ghost"
          href="https://github.com/srivtx/d-pill"
          target="_blank"
          rel="noreferrer"
          aria-label="d-pill on GitHub"
        >
          <svg viewBox="0 0 16 16" width="1.25rem" height="1.25rem" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
