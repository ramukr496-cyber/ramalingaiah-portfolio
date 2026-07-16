import { useEffect, useRef } from "react";
import { agentLoop } from "../data";

/**
 * The hero's signature element.
 *
 * A real 3D scene projected by hand onto a 2D canvas — no WebGL, no
 * three.js, ~6kb of maths. It renders the loop an LLM agent actually runs:
 * prompt -> retrieve -> reason -> tool call -> guardrail -> answer, with a
 * pulse of activation travelling the edges and an ambient particle shell
 * standing in for the embedding space around it.
 */
export default function AgentField() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    // --- scene ----------------------------------------------------------
    const R = 1;
    const nodes = agentLoop.map((label, i) => {
      const a = (i / agentLoop.length) * Math.PI * 2;
      return {
        label,
        x: Math.cos(a) * R,
        y: Math.sin(a * 2) * 0.18, // gentle wave so the ring reads as 3D
        z: Math.sin(a) * R,
      };
    });

    // Ambient shell — the embedding space the agent reasons inside.
    const motes = Array.from({ length: 220 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.35 + Math.random() * 0.75;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi) * 0.6,
        z: r * Math.sin(phi) * Math.sin(theta),
        s: Math.random(),
      };
    });

    // --- render ---------------------------------------------------------
    let raf;
    let t = 0;
    let w = 0;
    let h = 0;
    let scale = 1;
    let tiltX = 0;
    let tiltY = 0;

    const css = getComputedStyle(document.body);
    const read = (name, fallback) =>
      (css.getPropertyValue(name) || fallback).trim();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(w, h) * 0.33;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Perspective projection with a rotation around Y and a fixed X tilt.
    const project = (p, ay, ax) => {
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      let x = p.x * cy - p.z * sy;
      let z = p.x * sy + p.z * cy;
      let y = p.y;

      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const y2 = y * cx - z * sx;
      z = y * sx + z * cx;
      y = y2;

      const f = 3.4;
      const d = f / (f + z);
      return {
        sx: w / 2 + x * scale * d,
        sy: h / 2 + y * scale * d,
        d,
        z,
      };
    };

    const draw = () => {
      const signal = read("--signal", "#f5b944");
      const flux = read("--flux", "#4fd1c5");
      const muted = read("--muted", "#8792ac");
      const line = read("--line", "#222c42");

      ctx.clearRect(0, 0, w, h);

      // Pointer parallax, eased.
      tiltY += (pointer.current.x * 0.35 - tiltY) * 0.06;
      tiltX += (pointer.current.y * 0.25 - tiltX) * 0.06;

      const ay = t * 0.0035 + tiltY;
      const ax = -0.42 + tiltX;

      // Ambient shell first — everything behind the loop.
      for (const m of motes) {
        const p = project(m, ay * 0.55, ax);
        const r = Math.max(0.4, p.d * 1.1 * (0.35 + m.s * 0.65));
        ctx.globalAlpha = Math.max(0, (p.d - 0.62) * 0.85) * (0.25 + m.s * 0.4);
        ctx.fillStyle = m.s > 0.85 ? flux : muted;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const pts = nodes.map((n) => ({ ...project(n, ay, ax), label: n.label }));

      // Edges, drawn back-to-front so depth reads correctly.
      const edges = pts.map((p, i) => ({
        a: p,
        b: pts[(i + 1) % pts.length],
        i,
      }));
      edges.sort((e1, e2) => e2.a.z + e2.b.z - (e1.a.z + e1.b.z));

      // One activation pulse walks the whole loop.
      const cycle = (t * 0.0022) % pts.length;

      for (const e of edges) {
        ctx.strokeStyle = line;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.35 + e.a.d * 0.35;
        ctx.beginPath();
        ctx.moveTo(e.a.sx, e.a.sy);
        ctx.lineTo(e.b.sx, e.b.sy);
        ctx.stroke();

        // Is the pulse on this edge right now?
        const local = cycle - e.i;
        if (local >= 0 && local < 1) {
          const k = local;
          ctx.strokeStyle = signal;
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = 0.9 * Math.sin(k * Math.PI);
          ctx.beginPath();
          ctx.moveTo(e.a.sx, e.a.sy);
          ctx.lineTo(
            e.a.sx + (e.b.sx - e.a.sx) * k,
            e.a.sy + (e.b.sy - e.a.sy) * k
          );
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Nodes, back to front.
      const ordered = [...pts].sort((p1, p2) => p2.z - p1.z);
      const active = Math.floor(cycle);

      for (const p of ordered) {
        const idx = pts.indexOf(p);
        const isActive = idx === active;
        const r = 4.5 * p.d;

        if (isActive) {
          const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, 26);
          halo.addColorStop(0, signal);
          halo.addColorStop(1, "transparent");
          ctx.globalAlpha = 0.28;
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 26, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = Math.min(1, 0.4 + p.d * 0.6);
        ctx.fillStyle = isActive ? signal : flux;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, isActive ? r * 1.5 : r, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = `500 ${Math.round(10 * Math.min(1.3, p.d))}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = isActive ? signal : muted;
        ctx.globalAlpha = Math.max(0, (p.d - 0.6) * 1.5);
        ctx.textAlign = "center";
        ctx.fillText(p.label, p.sx, p.sy - 12 * p.d);
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 16;
      draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      t = 2400; // a pleasant static pose
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-label="Animated diagram of an AI agent loop: prompt, retrieve, reason, tool call, guardrail, answer."
      role="img"
    />
  );
}
