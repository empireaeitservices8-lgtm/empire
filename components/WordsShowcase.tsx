"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export type WordSlide = {
  id: string;
  word: string;
  line: string;
};

export const WORD_SLIDES: WordSlide[] = [
  {
    id: "vision",
    word: "Vision",
    line: "Imagining bold possibilities, shaping creative ideas, and envisioning a smarter digital future.",
  },
  {
    id: "expertise",
    word: "Expertise",
    line: "Combining technology, creativity, and expertise to deliver innovative solutions that move businesses forward.",
  },
  {
    id: "success",
    word: "Success",
    line: "Turning ideas into impact, challenges into opportunities, and ambitions into measurable digital growth.",
  },
];

export function ShowWord({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} data-sw-ch className="sw-ch">
            {ch}
          </span>
        ))}
      </span>
    </>
  );
}

export const SW_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.sw-section {
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  background: #000;
  color: #fff;
  font-family: 'Inter', ui-sans-serif, system-ui, 'Helvetica Neue', Arial, sans-serif;
}

/* tunnel rings */
.sw-rings {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.sw-ring {
  grid-area: 1 / 1;
  width: min(70vw, 70svh);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(159, 237, 241, 0.18);
  box-shadow: 0 0 60px rgba(118, 171, 174, 0.08) inset;
  will-change: transform;
}

/* slides stacked in the centre */
.sw-slide {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 0 clamp(20px, 6vw, 96px);
  will-change: transform, opacity;
}
.sw-text {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sw-title {
  font-size: clamp(52px, min(15vw, 30svh), 260px);
  font-weight: 200;
  line-height: 1.05;
  letter-spacing: -0.04em;
  white-space: nowrap;
  transform-origin: 50% 50%;
  will-change: transform, filter, opacity;
}
.sw-ch { display: inline-block; will-change: transform; }

.sw-line {
  margin: clamp(16px, 3vh, 40px) 0 0;
  max-width: 44ch;
  font-size: clamp(14px, 1.5vw, 22px);
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  will-change: transform, filter, opacity;
}

/* HUD: odometer counter + progress line */
.sw-hud {
  position: absolute;
  z-index: 2;
  right: clamp(16px, 3vw, 48px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 14px;
  font-variant-numeric: tabular-nums;
}
.sw-count {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(12px, 1vw, 14px);
  letter-spacing: 0.12em;
  line-height: 1.2em;
  color: #fff;
}
.sw-count-win { display: block; height: 1.2em; overflow: hidden; }
.sw-count-inner { display: flex; flex-direction: column; will-change: transform; }
.sw-count-inner span { display: block; height: 1.2em; line-height: 1.2em; }
.sw-count-total { color: rgba(255, 255, 255, 0.4); }
.sw-track {
  position: relative;
  width: 1px;
  height: clamp(60px, 12vh, 120px);
  background: rgba(255, 255, 255, 0.18);
}
.sw-bar {
  position: absolute;
  inset: 0;
  background: #9fedf1;
  transform-origin: top;
  transform: scaleY(0);
}

@media (max-width: 640px) {
  .sw-title { font-size: clamp(44px, min(21vw, 26svh), 120px); }
  .sw-hud { right: 12px; top: auto; bottom: 20px; transform: none; flex-direction: row-reverse; }
  .sw-track { width: clamp(40px, 14vw, 80px); height: 1px; }
  .sw-bar { transform-origin: left; transform: scaleX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .sw-section { height: auto; overflow: visible; }
  .sw-slide { position: relative; min-height: 100svh; }
  .sw-rings, .sw-hud { display: none; }
}
`;

export default function WordsShowcase({ slides = WORD_SLIDES }: { slides?: WordSlide[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const slideNodes = gsap.utils.toArray<HTMLElement>("[data-sw-slide]");
      const rings = gsap.utils.toArray<HTMLElement>("[data-sw-ring]");
      const counter = root.querySelector<HTMLElement>("[data-sw-counter]");
      const bar = root.querySelector<HTMLElement>("[data-sw-bar]");
      const n = slideNodes.length;

      const GAP = 2.0;
      const total = (n - 1) * GAP + 2;

      const spread = (k: number) => (i: number, _el: Element, list: ArrayLike<Element>) =>
        (i - (list.length - 1) / 2) * k;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${window.innerHeight * n * 1.1}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        rings,
        { scale: 0.35 },
        { scale: 2.6, duration: total, stagger: { each: total * 0.12, from: "start" }, ease: "none" },
        0
      );

      if (bar) tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: total, ease: "none" }, 0);

      slideNodes.forEach((slide, i) => {
        const title = slide.querySelector<HTMLElement>("[data-sw-title]");
        const chars = slide.querySelectorAll<HTMLElement>("[data-sw-ch]");
        const line = slide.querySelector<HTMLElement>("[data-sw-line]");
        const t = i * GAP;

        tl.fromTo(
          title,
          { scale: 0.25, opacity: 0, filter: "blur(10px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
          t
        );
        tl.fromTo(chars, { x: spread(70) }, { x: 0, duration: 1.2, ease: "power3.out" }, t);
        tl.fromTo(
          line,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          t + 0.7
        );

        if (i < n - 1) {
          const out = t + 1.5;
          tl.to(line, { opacity: 0, y: -30, filter: "blur(4px)", duration: 0.5, ease: "power1.in" }, out);
          tl.to(title, { scale: 4.5, opacity: 0, filter: "blur(12px)", duration: 1, ease: "power2.in" }, out);
          tl.to(chars, { x: spread(120), duration: 1, ease: "power2.in" }, out);

          if (counter) {
            tl.to(counter, { yPercent: -((i + 1) / n) * 100, duration: 0.6, ease: "power2.inOut" }, out + 0.4);
          }
        }
      });

      tl.to({}, { duration: 0.2 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="sw-section" aria-label="What we do">
      <style>{SW_CSS}</style>

      {/* tunnel rings */}
      <div className="sw-rings" aria-hidden="true">
        {[0, 1, 2, 3].map((r) => (
          <span key={r} data-sw-ring className="sw-ring" />
        ))}
      </div>

      {/* counter + progress */}
      <div className="sw-hud" aria-hidden="true">
        <div className="sw-count">
          <span className="sw-count-win">
            <span data-sw-counter className="sw-count-inner">
              {slides.map((s, i) => (
                <span key={s.id}>{String(i + 1).padStart(2, "0")}</span>
              ))}
            </span>
          </span>
          <span className="sw-count-total">/ {String(slides.length).padStart(2, "0")}</span>
        </div>
        <span className="sw-track">
          <span data-sw-bar className="sw-bar" />
        </span>
      </div>

      {slides.map((s) => (
        <div key={s.id} data-sw-slide className="sw-slide">
          <div className="sw-text">
            <div role="heading" aria-level={2} data-sw-title className="sw-title">
              <ShowWord text={s.word} />
            </div>
            <p data-sw-line className="sw-line">
              {s.line}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
