"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const TEXT =
  "At Empire AE, we believe technology should feel effortless, inspire the people who use it, and help ambitious businesses grow. We are here to build digital experiences that move your business forward.";

const DIM = 0x55; // #555555
const BRIGHT = 0xff; // #ffffff

// How many words are "in transition" at once. 1 = one word at a time.
const EDGE_WORDS = 1;

// Reveal finishes at this fraction of the scroll range (no dead scrolling).
const REVEAL_DONE_AT = 0.9;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const REVEAL_CSS = `
.eae-reveal-wrap {
  background: #000000;
  width: 100%;
}
.eae-reveal {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
  box-sizing: border-box;
  padding: clamp(2.5rem, 6svh, 5rem) clamp(1.25rem, 5vw, 4rem);
}
.eae-reveal-sticky {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
}
.eae-reveal-text {
  position: relative;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-family: inherit;
  font-weight: 300;
  font-size: clamp(1.25rem, 1rem + 2vw, 2.75rem);
  line-height: 1.4;
  letter-spacing: -0.02em;
  text-wrap: balance;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
}
.eae-word {
  display: inline-block;
  white-space: nowrap;
  color: #555555;
}
.eae-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 640px) {
  .eae-reveal {
    padding: 2rem 1.25rem;
  }
  .eae-reveal-text {
    font-size: clamp(1.15rem, 5vw, 1.65rem);
    line-height: 1.42;
  }
}
@media (max-height: 500px) {
  .eae-reveal {
    min-height: 100svh;
    padding: 1.5rem 1rem;
  }
  .eae-reveal-text {
    font-size: clamp(1rem, 3.2vh, 1.4rem);
    line-height: 1.25;
  }
}
`;

export default function ScrollTextReveal({ text = TEXT }: { text?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const paragraph = paragraphRef.current;
    if (!section || !paragraph) return;

    const wordEls = Array.from(paragraph.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const count = wordEls.length;
    if (!count) return;

    const applied = new Array<number>(count).fill(-1);

    const paint = (i: number, t: number) => {
      const c = Math.round(DIM + (BRIGHT - DIM) * t);
      if (applied[i] !== c) {
        applied[i] = c;
        wordEls[i].style.color = `rgb(${c}, ${c}, ${c})`;
      }
    };

    const update = (progress: number) => {
      // The front moves word by word; only the word under the front is mid-fade.
      const front = clamp(progress / REVEAL_DONE_AT) * (count + EDGE_WORDS);
      for (let i = 0; i < count; i++) {
        paint(i, clamp((front - i) / EDGE_WORDS));
      }
    };

    update(0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 1.2 : 1.6))}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => update(self.progress),
    });

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    const timer = setTimeout(() => {
      if (!cancelled) ScrollTrigger.refresh();
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      st.kill(true);
    };
  }, [text]);

  return (
    <div className="eae-reveal-wrap">
      <style dangerouslySetInnerHTML={{ __html: REVEAL_CSS }} />
      <section ref={sectionRef} className="eae-reveal">
        <div className="eae-reveal-sticky">
          <p ref={paragraphRef} className="eae-reveal-text">
            <span className="eae-sr-only">{text}</span>

            <span aria-hidden="true">
              {words.map((word, w) => (
                <span key={`w-${w}`}>
                  <span data-word className="eae-word">
                    {word}
                  </span>
                  {w < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}