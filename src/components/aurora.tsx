"use client";

/**
 * The aurora — the only ambient motion on the page. Canvas, not CSS, because
 * ambient drift is not an interaction: interactions keep the dur-1/2/3 clock.
 * The blobs are painted from the live token roles (accent, accent-soft, line),
 * so turning the hue dial re-tints the sky. When the visitor asks for reduced
 * motion, the sky stops: one static frame.
 */

import { useEffect, useRef } from "react";
import { parseOklch, oklchToSrgb } from "@/lib/dpill/contrast";

function resolveToken(name: string): string | null {
  const cs = getComputedStyle(document.documentElement);
  let value = cs.getPropertyValue(name).trim();
  if (!value) return null;
  if (value.includes("var(")) {
    const hue = cs.getPropertyValue("--hue").trim();
    value = value.replace(/var\(--hue\)/g, hue || "215");
  }
  const parsed = parseOklch(value);
  if (!parsed) return null;
  const { r, g, b } = oklchToSrgb(parsed);
  const to255 = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255);
  return `${to255(r)}, ${to255(g)}, ${to255(b)}`;
}

interface Blob {
  r: number; // fraction of width
  ax: number; // amplitude
  ay: number;
  px: number; // phase
  py: number;
  speed: number;
  color: string | null;
  alpha: number;
}

export function Aurora() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let stopped = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const blobs: Blob[] = [
      { r: 0.34, ax: 0.1, ay: 0.06, px: 0.5, py: 1.7, speed: 0.00004, color: null, alpha: 0.55 },
      { r: 0.5, ax: 0.14, ay: 0.1, px: 2.6, py: 4.1, speed: 0.00003, color: null, alpha: 0.4 },
      { r: 0.26, ax: 0.08, ay: 0.12, px: 4.4, py: 0.9, speed: 0.00005, color: null, alpha: 0.45 },
    ];
    const roles = ["--accent", "--accent-soft", "--line-strong"];
    let hueChecked = 0;

    function readColors() {
      for (let i = 0; i < blobs.length; i++) {
        blobs[i].color = resolveToken(roles[i] ?? "--accent");
      }
      hueChecked = performance.now();
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, width, height);
      for (const b of blobs) {
        const x = width * (0.28 + b.ax * Math.sin(t * b.speed + b.px));
        const y = height * (0.32 + b.ay * Math.cos(t * b.speed * 1.3 + b.py));
        const rad = Math.max(width, height) * b.r;
        if (b.color) {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
          grad.addColorStop(0, `rgba(${b.color}, ${b.alpha})`);
          grad.addColorStop(1, `rgba(${b.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
        }
      }
    }

    function frame(t: number) {
      if (stopped) return;
      if (t - hueChecked > 400) readColors();
      draw(t);
      raf = requestAnimationFrame(frame);
    }

    resize();
    readColors();
    if (reduced.matches) {
      draw(0); // one quiet frame; the sky holds still
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    const onReduced = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(raf);
        draw(0);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced.matches) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", onReduced);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", onReduced);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
