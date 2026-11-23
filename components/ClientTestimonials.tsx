"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  /** Logo in its ORIGINAL colours (path in /public). */
  image?: string;
  /** A separate white/light version of the same logo. Wins over `image`. */
  imageOnDark?: string;
  /** Single-colour logo on a transparent PNG: draw it in white on the black avatar. */
  whiteMask?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "nakshathra",
    name: "Nakshathra Gold and Diamonds",
    role: "Founder",
    company: "",
    review:
      "Their engineering team helped us improve the reliability of our platform and simplify several complex workflows. The collaboration was professional and well organized.",
    image: "/images/logos/Nakshathra_Hrms.png",
    whiteMask: true,
  },
  {
    id: "fira",
    name: "Fira",
    role: "Founder",
    company: "",
    review:
      "Their digital marketing strategies improved our online visibility, attracted more potential customers, and helped our business grow through effective campaigns.",
    image: "/images/logos/Fira.png",
  },
  {
    id: "charmika",
    name: "Charmika",
    role: "Founder",
    company: "",
    review:
      "Working with this team was a great experience. They understood our product requirements, communicated clearly, and delivered a solution that fit our business needs.",
    image: "/images/logos/Charmika.png",
  },
  {
    id: "Nakshathra",
    name: "Nakshathra",
    role: "Founder",
    company: "",
    review:
      "The team took the time to understand our challenges and proposed a practical solution. Their attention to detail and responsiveness made a real difference to our project.",
    image: "/images/logos/Nakshathra_Hrms.png",
    whiteMask: true,
  },
  {
    id: "keralainstitutesalesapp",
    name: "kerala institute",
    role: "Founder",
    company: "",
    review:
      "From planning to delivery, the team maintained a clear focus on quality and usability. The final solution gave us a stronger foundation for future improvements.",
    image: "/images/logos/kerala_institute_sales_app.png",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}

const REVEAL_COLORS = ["#bceae8", "#7fd6d1", "#f1dfdf", "#d7f1f7"];

const REVEAL = {
  scale: 0.5,
  follow: 0.1,
  attack: 0.08,
  release: 0.6,
  trail: 0.28,
  fullSpeed: 700,
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function drawRevealLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) {
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.fillStyle = REVEAL_COLORS[3];
  ctx.fillRect(0, 0, w, h);

  const m = Math.max(w, h);
  const blobs = [
    { c: REVEAL_COLORS[0], fx: 0.23, fy: 0.31, px: 0.0, py: 1.2, r: 0.55 },
    { c: REVEAL_COLORS[1], fx: 0.17, fy: 0.27, px: 2.1, py: 0.4, r: 0.42 },
    { c: REVEAL_COLORS[2], fx: 0.29, fy: 0.19, px: 4.2, py: 2.6, r: 0.5 },
    { c: REVEAL_COLORS[0], fx: 0.13, fy: 0.35, px: 1.1, py: 3.3, r: 0.38 },
    { c: REVEAL_COLORS[1], fx: 0.21, fy: 0.15, px: 5.0, py: 0.9, r: 0.3 },
  ];

  for (const b of blobs) {
    const x = w * (0.5 + 0.45 * Math.sin(t * b.fx * 2 + b.px));
    const y = h * (0.5 + 0.45 * Math.cos(t * b.fy * 2 + b.py));
    const r = m * b.r;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, b.c);
    g.addColorStop(1, `${b.c}00`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  const bx = ((t * 0.05) % 1) * w * 1.6 - w * 0.3;
  const band = ctx.createLinearGradient(bx, 0, bx + w * 0.35, h);
  band.addColorStop(0, "rgba(255,255,255,0)");
  band.addColorStop(0.5, "rgba(255,255,255,0.35)");
  band.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, w, h);
}

function MouseReveal({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const dctx = canvas.getContext("2d");
      const mask = document.createElement("canvas");
      const mctx = mask.getContext("2d");
      if (!dctx || !mctx) return;

      const S = REVEAL.scale;
      let W = 1;
      let H = 1;

      const pointer = { cx: 0, cy: 0, valid: false };
      let tap: { cx: number; cy: number } | null = null;
      let sx = 0, sy = 0;
      let psx = 0, psy = 0;
      let heading = 0;
      let energy = 0;
      let wasInside = false;
      let time = 0;
      let lastStamp = -999;
      let idleCleared = true;
      let visible = false;

      const resize = () => {
        const r = section.getBoundingClientRect();
        W = Math.max(1, Math.round(r.width * S));
        H = Math.max(1, Math.round(r.height * S));
        canvas.width = mask.width = W;
        canvas.height = mask.height = H;
        idleCleared = false;
        lastStamp = -999;
      };

      const stamp = (x: number, y: number, r: number, a: number, e: number) => {
        mctx.save();
        mctx.translate(x * S, y * S);
        mctx.rotate(heading);
        mctx.scale(1 + 0.55 * e, 1 / (1 + 0.25 * e));
        for (let i = 0; i < 3; i++) {
          const ang = time * (0.9 + 0.45 * i) + i * 2.1;
          const ox = Math.cos(ang) * r * 0.26 * S;
          const oy = Math.sin(ang * 1.3) * r * 0.26 * S;
          const rr = r * S * (0.78 + 0.22 * Math.sin(time * 1.7 + i * 1.9));
          const g = mctx.createRadialGradient(ox, oy, 0, ox, oy, rr);
          g.addColorStop(0, `rgba(0,0,0,${a})`);
          g.addColorStop(0.45, `rgba(0,0,0,${a * 0.7})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          mctx.fillStyle = g;
          mctx.beginPath();
          mctx.arc(ox, oy, rr, 0, Math.PI * 2);
          mctx.fill();
        }
        mctx.restore();
      };

      const tick = (_time: number, deltaMs: number) => {
        if (!visible) return;
        const dt = Math.min(deltaMs, 50) / 1000;
        if (dt <= 0) return;
        time += dt;

        const rect = section.getBoundingClientRect();
        const within = (cx: number, cy: number) =>
          cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
        const inside = pointer.valid && within(pointer.cx, pointer.cy);

        if (tap) {
          if (within(tap.cx, tap.cy)) {
            sx = psx = tap.cx - rect.left;
            sy = psy = tap.cy - rect.top;
            energy = 1;
          }
          tap = null;
        }

        if (inside) {
          const tx = pointer.cx - rect.left;
          const ty = pointer.cy - rect.top;
          if (!wasInside) {
            sx = psx = tx;
            sy = psy = ty;
          }
          const k = 1 - Math.exp(-dt / REVEAL.follow);
          sx += (tx - sx) * k;
          sy += (ty - sy) * k;
        }
        wasInside = inside;

        const dist = Math.hypot(sx - psx, sy - psy);
        const speed = dist / dt;
        const target = inside ? Math.pow(clamp(speed / REVEAL.fullSpeed), 0.7) : 0;
        const tau = target > energy ? REVEAL.attack : REVEAL.release;
        energy += (target - energy) * (1 - Math.exp(-dt / tau));
        if (dist > 0.5) heading = Math.atan2(sy - psy, sx - psx);

        const active = energy > 0.02 || time - lastStamp < 2;
        if (!active) {
          if (!idleCleared) {
            mctx.clearRect(0, 0, W, H);
            canvas.style.opacity = "0";
            idleCleared = true;
          }
          psx = sx;
          psy = sy;
          return;
        }

        mctx.globalCompositeOperation = "destination-out";
        mctx.fillStyle = `rgba(0,0,0,${1 - Math.exp(-dt / REVEAL.trail)})`;
        mctx.fillRect(0, 0, W, H);
        mctx.globalCompositeOperation = "source-over";

        if (energy > 0.02) {
          const R = clamp(Math.min(rect.width, rect.height) * 0.3, 110, 300);
          const r = R * (0.35 + 0.65 * energy);
          const a = clamp(energy * 1.8) * 0.95;
          const steps = Math.min(24, Math.max(1, Math.ceil(dist / Math.max(4, r * 0.35))));
          for (let i = 1; i <= steps; i++) {
            const f = i / steps;
            stamp(psx + (sx - psx) * f, psy + (sy - psy) * f, r, a, energy);
          }
          lastStamp = time;
        }
        psx = sx;
        psy = sy;

        dctx.globalCompositeOperation = "source-over";
        drawRevealLayer(dctx, W, H, time);
        dctx.globalCompositeOperation = "destination-in";
        dctx.drawImage(mask, 0, 0);
        dctx.globalCompositeOperation = "source-over";

        canvas.style.opacity = "1";
        idleCleared = false;
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        pointer.cx = e.clientX;
        pointer.cy = e.clientY;
        pointer.valid = true;
      };
      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "touch") return;
        tap = { cx: e.clientX, cy: e.clientY };
      };
      const onLeave = () => {
        pointer.valid = false;
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onLeave);

      const ro = new ResizeObserver(resize);
      ro.observe(section);
      resize();

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(section);

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        document.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("blur", onLeave);
        canvas.style.opacity = "0";
      };
    });

    return () => mm.revert();
  }, [sectionRef]);

  return <canvas ref={canvasRef} className="eae-rv-canvas" aria-hidden="true" />;
}

const SLIDE_DURATION = 0.8;
const SLIDE_EASE = "power3.inOut";
export const ENGAGE_TOP = 0.3;
export const ENGAGE_BOTTOM = 0.7;
const WHEEL_THRESHOLD = 30;
const WHEEL_GESTURE_GAP_MS = 100;
const TOUCH_THRESHOLD = 40;

export function isReviewsEngaged(section: Element) {
  const r = section.getBoundingClientRect();
  const vh = window.innerHeight;
  return r.top <= vh * ENGAGE_TOP && r.bottom >= vh * ENGAGE_BOTTOM;
}

type Step = 1 | -1;

const TESTIMONIALS_CSS = `
.eae-showcase {
  background: #FFFFFF;
  position: relative;
  isolation: isolate;
  color: #d7f1f7;
  padding: clamp(32px, 4vw, 64px) 0 clamp(32px, 4vw, 64px);
  overflow-x: clip;
  font-family: inherit;
  box-sizing: border-box;
  min-height: 75vh;
  min-height: 75svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.eae-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 40px) clamp(20px, 5vw, 48px) 0;
  box-sizing: border-box;
}
.eae-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(24px, 3.5vw, 48px);
}
.eae-heading {
  margin: 0;
  font-size: clamp(30px, 4.2vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #000000;
}
.eae-controls { display: flex; gap: 12px; flex-shrink: 0; }
.eae-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: #000000;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 180ms ease, transform 180ms ease;
}
.eae-arrow:hover { background: #3d3d3d; transform: scale(1.06); }
.eae-arrow:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }

.eae-content {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: start;
  min-height: 280px;
}
.eae-person { display: flex; align-items: center; gap: 20px; }
.eae-avatar {
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  overflow: hidden;
}
.eae-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.eae-name { margin: 0; font-size: 20px; font-weight: 600; color: #444141; }
.eae-meta { margin: 4px 0 0; font-size: 16px; line-height: 1.4; color: #4b4545; }
.eae-quote {
  margin: 0;
  max-width: 680px;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 400;
  line-height: 1.4;
  color: #292626;
  text-align: left;
}
.eae-rv-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
}
.eae-viewport {
  position: relative;
  overflow: hidden;
  display: grid;
}
.eae-slide {
  grid-area: 1 / 1;
  min-width: 0;
  visibility: hidden;
  opacity: 0;
  will-change: transform, opacity;
}
.eae-slide--initial { visibility: visible; opacity: 1; }
.eae-arrow:disabled { opacity: 0.35; cursor: default; }
.eae-arrow:disabled:hover { background: #000000; transform: none; }

@media (max-width: 900px) {
  .eae-content { grid-template-columns: 1fr; min-height: 0; gap: 24px; }
}
@media (max-width: 640px) {
  .eae-header { align-items: flex-start; gap: 16px; }
  .eae-person { gap: 16px; }
  .eae-arrow { width: 44px; height: 44px; }
  .eae-avatar { width: 64px; height: 64px; font-size: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .eae-arrow { transition: none; }
}
`;

export default function ClientTestimonials({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  const count = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const indexRef = useRef(0);
  const busyRef = useRef(false);
  const stepRef = useRef<((step: Step) => boolean) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count === 0) return;

    indexRef.current = 0;
    busyRef.current = false;
    setActive(0);

    const ctx = gsap.context(() => {}, section);

    const step = (dir: Step): boolean => {
      if (busyRef.current) return false;

      const from = indexRef.current;
      const to = from + dir;
      if (to < 0 || to >= count) return false;

      const outgoing = slideRefs.current[from];
      const incoming = slideRefs.current[to];
      if (!outgoing || !incoming) return false;

      indexRef.current = to;
      setActive(to);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx.add(() => {
        if (reduceMotion) {
          gsap.set(outgoing, { autoAlpha: 0, xPercent: 0 });
          gsap.set(incoming, { autoAlpha: 1, xPercent: 0 });
          return;
        }

        busyRef.current = true;
        const D = SLIDE_DURATION;

        gsap
          .timeline({
            onComplete: () => {
              busyRef.current = false;
            },
          })
          .fromTo(
            incoming,
            { xPercent: 100 * dir },
            { xPercent: 0, duration: D, ease: SLIDE_EASE },
            0
          )
          .fromTo(
            incoming,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: D * 0.7, ease: "none" },
            0
          )
          .fromTo(
            outgoing,
            { xPercent: 0 },
            { xPercent: -100 * dir, duration: D, ease: SLIDE_EASE },
            0
          )
          .fromTo(
            outgoing,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: D * 0.7, ease: "none" },
            D * 0.3
          );
      });

      return true;
    };
    stepRef.current = step;

    const isActive = () => isReviewsEngaged(section);

    const canScrollInside = (target: EventTarget | null, delta: number) => {
      let node = target instanceof HTMLElement ? target : null;
      while (node && node !== section) {
        const oy = getComputedStyle(node).overflowY;
        if ((oy === "auto" || oy === "scroll") && node.scrollHeight > node.clientHeight) {
          const atTop = node.scrollTop <= 0;
          const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
          if (delta < 0 ? !atTop : !atBottom) return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    let lastWheel = 0;
    let wArmed = false;
    let wConsumed = false;
    let acc = 0;

    const toPx = (e: WheelEvent, v: number) =>
      e.deltaMode === 1 ? v * 16 : e.deltaMode === 2 ? v * window.innerHeight : v;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;

      const now = performance.now();
      if (now - lastWheel > WHEEL_GESTURE_GAP_MS) {
        wArmed = isActive();
        wConsumed = false;
        acc = 0;
      }
      lastWheel = now;
      if (!wArmed) return;

      const dx = toPx(e, e.deltaX);
      const dy = toPx(e, e.deltaY);
      const horizontal = Math.abs(dx) > Math.abs(dy);
      const delta = horizontal ? dx : dy;
      if (delta === 0) return;

      if (!horizontal && canScrollInside(e.target, delta)) {
        wArmed = false;
        return;
      }

      if (wConsumed || busyRef.current) {
        wConsumed = true;
        if (e.cancelable) e.preventDefault();
        return;
      }

      const dir: Step = delta > 0 ? 1 : -1;
      const to = indexRef.current + dir;

      if (to < 0 || to >= count) {
        if (horizontal) {
          if (e.cancelable) e.preventDefault();
          return;
        }
        wArmed = false;
        return;
      }

      if (e.cancelable) e.preventDefault();
      acc += delta;
      if (Math.abs(acc) >= WHEEL_THRESHOLD) {
        wConsumed = true;
        step(acc > 0 ? 1 : -1);
      }
    };

    let tArmed = false;
    let tConsumed = false;
    let sx = 0;
    let sy = 0;

    const onTouchStart = (e: TouchEvent) => {
      tArmed = e.touches.length === 1 && isActive();
      tConsumed = false;
      if (tArmed) {
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!tArmed) return;
      if (e.touches.length !== 1) {
        tArmed = false;
        return;
      }
      const t = e.touches[0];
      const dx = sx - t.clientX;
      const dy = sy - t.clientY;
      const horizontal = Math.abs(dx) > Math.abs(dy);
      const d = horizontal ? dx : dy;
      if (d === 0) return;

      if (tConsumed || busyRef.current) {
        tConsumed = true;
        if (e.cancelable) e.preventDefault();
        return;
      }

      const dir: Step = d > 0 ? 1 : -1;
      const to = indexRef.current + dir;
      if (to < 0 || to >= count) {
        if (horizontal) {
          if (e.cancelable) e.preventDefault();
          return;
        }
        tArmed = false;
        return;
      }

      if (e.cancelable) e.preventDefault();
      if (Math.abs(d) >= TOUCH_THRESHOLD) {
        tConsumed = true;
        step(dir);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (!isActive()) return;
      if (step(e.key === "ArrowRight" ? 1 : -1)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      stepRef.current = null;
      ctx.revert();
      indexRef.current = 0;
      busyRef.current = false;
    };
  }, [count]);

  if (count === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="eae-showcase"
      aria-roledescription="carousel"
      aria-label="Client reviews"
    >
      <style dangerouslySetInnerHTML={{ __html: TESTIMONIALS_CSS }} />
      <MouseReveal sectionRef={sectionRef} />

      <div className="eae-container">
        <div className="eae-header">
          <h2 className="eae-heading">What clients say about us</h2>
          <div className="eae-controls">
            <button
              type="button"
              className="eae-arrow"
              onClick={() => stepRef.current?.(-1)}
              disabled={active === 0}
              aria-label="Previous testimonial"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className="eae-arrow"
              onClick={() => stepRef.current?.(1)}
              disabled={active === count - 1}
              aria-label="Next testimonial"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>

        <div className="eae-viewport" aria-live="polite">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              className={`eae-slide${i === 0 ? " eae-slide--initial" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== active}
            >
              <div className="eae-content">
                <div className="eae-person">
                  <div className="eae-avatar" aria-hidden="true">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" />
                    ) : (
                      getInitials(item.name)
                    )}
                  </div>
                  <div>
                    <p className="eae-name">{item.name}</p>
                    <p className="eae-meta">{item.role}</p>
                    <p className="eae-meta">{item.company}</p>
                  </div>
                </div>

                <blockquote className="eae-quote">{item.review}</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
