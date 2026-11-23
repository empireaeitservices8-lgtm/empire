"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const SHOWCASE_HEADING = "Brands using GSAP®";

export const THEME_DARK = { bg: "#000000", fg: "#FFFFFF" };
export const THEME_LIGHT = { bg: "#FFFFFF", fg: "#000000" };

export const THEME_SWITCH_AT = "bottom 80%";

export type Dir = "up" | "down" | "left" | "right";

export type Variant =
  | "intel" | "youtube" | "netflix" | "amazon" | "ford" | "samsung"
  | "ea" | "nike" | "aol" | "gucci" | "mcdonalds" | "microsoft";

export type Brand = {
  name: string;
  variant: Variant;
  /** Path to the logo image in /public. */
  src?: string;
  /** Visual size tweak relative to the shared slot box (1 = Indoor_petals reference).
   *  Use it for logos with transparent padding or unusual aspect ratios. */
  scale?: number;
  /** "theme": draw the artwork in the showcase foreground colour (white on the
   *  black theme, black on the white theme) via an alpha mask. Only for
   *  single-colour logos on a transparent background.
   *  "original": keep the artwork's own colours (default). */
  colorMode?: "theme" | "original";
};

// Add more groups here. Every group needs the same number of brands
// (one per slot) and the loop will cycle through them in this order.
export const BRAND_GROUPS: Brand[][] = [
  [
    { name: "CAIOR", variant: "intel", src: "/images/logos/caior.png", colorMode: "theme", scale: 1 },
    { name: "Charmika", variant: "youtube", src: "/images/logos/Charmika.png", scale: 1 },
    { name: "Credtree", variant: "netflix", src: "/images/logos/credtree.png", scale: 1.5 },
    { name: "Fira", variant: "amazon", src: "/images/logos/Fira.png", colorMode: "theme", scale: 1 },
    { name: "Devamshi", variant: "ford", src: "/images/logos/Devamshi.png", scale: 1.5 },
    { name: "EGL", variant: "samsung", src: "/images/logos/EGL.png", scale: 1 },
  ],
  [
    { name: "Elaamy", variant: "ea", src: "/images/logos/Elaamy.png", scale: 1 },
    { name: "Ethenzaa", variant: "nike", src: "/images/logos/Ethenzaa.png", scale: 1 },
    { name: "Nakshathra HRMS", variant: "aol", src: "/images/logos/Nakshathra_Hrms.png", colorMode: "theme", scale: 2 },
    { name: "Indoor Petals", variant: "gucci", src: "/images/logos/kerala_institute_sales_app.png", scale: 1.4 }, // sizing reference
    { name: "Gabby Talk", variant: "mcdonalds", src: "/images/logos/gabby_talk.png", scale: 1 },
    { name: "HeartMate", variant: "microsoft", src: "/images/logos/suchiGo.png", scale: 1 },
  ],
];

// Per-slot motion, read from the reference video.
//   exit      = direction the old logo travels while it leaves its slot
//   enterFrom = side the new logo comes in from
const SLOT_MOTION: { exit: Dir; enterFrom: Dir }[] = [
  { exit: "left", enterFrom: "up" },
  { exit: "down", enterFrom: "right" },
  { exit: "right", enterFrom: "down" },
  { exit: "down", enterFrom: "left" },
  { exit: "left", enterFrom: "down" },
  { exit: "down", enterFrom: "right" },
];

// Timing in seconds.
const TIMING = {
  hold: 2.2, // how long a group stays on screen
  stagger: 0.2, // delay between neighbouring slots
  exitDuration: 0.32,
  gap: 0.32, // empty moment between a logo leaving and the next arriving
  enterDuration: 0.48,
};

// xPercent / yPercent offsets that push a logo fully out of its slot.
const vec = (d: Dir) => {
  switch (d) {
    case "left": return { xPercent: -100, yPercent: 0 };
    case "right": return { xPercent: 100, yPercent: 0 };
    case "up": return { xPercent: 0, yPercent: -100 };
    default: return { xPercent: 0, yPercent: 100 };
  }
};

// Text used by the simple one-word marks.
const MARK_TEXT: Partial<Record<Variant, string>> = {
  intel: "intel",
  netflix: "NETFLIX",
  ford: "Ford",
  samsung: "SAMSUNG",
  nike: "NIKE",
  aol: "Aol.",
  gucci: "GUCCI",
};

export function LogoMark({ brand }: { brand: Brand }) {
  if (brand.src) {
    const scaleStyle = { "--bs-logo-scale": brand.scale ?? 1 } as CSSProperties;

    // Single-colour logo: alpha mask filled with the theme foreground, so it
    // flips with the existing --bs-fg variable (no transition, no filter).
    if (brand.colorMode === "theme") {
      return (
        <span
          role="img"
          aria-label={brand.name}
          className="eae-bs-brand-image eae-bs-brand-theme"
          style={{
            ...scaleStyle,
            WebkitMaskImage: `url(${brand.src})`,
            maskImage: `url(${brand.src})`,
          }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.src}
        alt={brand.name}
        className="eae-bs-brand-image"
        style={scaleStyle}
        draggable={false}
      />
    );
  }

  switch (brand.variant) {
    case "youtube":
      return (
        <span role="img" aria-label={brand.name} className="eae-mk eae-mk-yt">
          You<span className="eae-mk-yt-box">Tube</span>
        </span>
      );
    case "amazon":
      return (
        <span role="img" aria-label={brand.name} className="eae-mk eae-mk-amz">
          <span>amazon</span>
          <i aria-hidden="true" />
        </span>
      );
    case "ea":
      return (
        <span role="img" aria-label={brand.name} className="eae-mk eae-mk-ea">
          <span>EA</span>
          <small>GAMES</small>
        </span>
      );
    case "mcdonalds":
      return (
        <span role="img" aria-label={brand.name} className="eae-mk eae-mk-mcd">
          <svg viewBox="0 0 24 20" aria-hidden="true">
            <path d="M3 19V8C3 -1.5 12 -1.5 12 9C12 -1.5 21 -1.5 21 8V19" />
          </svg>
        </span>
      );
    case "microsoft":
      return (
        <span role="img" aria-label={brand.name} className="eae-mk eae-mk-ms">
          <span className="eae-mk-ms-grid" aria-hidden="true">
            <b /><b /><b /><b />
          </span>
          <span>Microsoft</span>
        </span>
      );
    default:
      return (
        <span role="img" aria-label={brand.name} className={`eae-mk eae-mk-${brand.variant}`}>
          {MARK_TEXT[brand.variant]}
        </span>
      );
  }
}

const BRAND_CSS = `
.eae-bs {
  --bs-bg: ${THEME_DARK.bg};
  --bs-fg: ${THEME_DARK.fg};
  --bs-fs: clamp(18px, 2.3vw, 40px); /* base logo size, everything scales from it */
  --bs-h: clamp(56px, 5.6vw, 96px);  /* slot height */
  background: var(--bs-bg);
  color: var(--bs-fg);
  padding: clamp(20px, 2.5vw, 36px) clamp(16px, 2vw, 32px) clamp(24px, 3vw, 48px);
  font-family: inherit;
  overflow: hidden;
}
/* Binary light state: toggled by the scroll trigger, never animated */
.eae-bs.is-light {
  --bs-bg: ${THEME_LIGHT.bg};
  --bs-fg: ${THEME_LIGHT.fg};
}
.eae-bs-heading {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 clamp(24px, 4vw, 64px);
  font-size: clamp(12px, 1.1vw, 15px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  color: var(--bs-fg);
}
.eae-bs-brace {
  font-size: 2.6em;
  font-weight: 200;
  line-height: 0.7;
  transform: scaleX(0.7);
}
.eae-bs-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(12px, 2vw, 32px);
}
.eae-bs-slot {
  position: relative;
  height: var(--bs-h);
  overflow: hidden; /* each logo is clipped to its own slot */
}
.eae-bs-logo {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  visibility: hidden; /* GSAP reveals each logo with autoAlpha */
  opacity: 0;
  will-change: transform, opacity;
}
.eae-bs-logo.is-active { visibility: visible; opacity: 1; }

.eae-mk {
  display: inline-flex;
  align-items: center;
  font-size: var(--bs-fs);
  line-height: 1;
  white-space: nowrap;
  color: var(--bs-fg);
}
.eae-bs-mask {
  display: block;
  width: calc(var(--bs-fs) * 4);
  height: calc(var(--bs-fs) * 1.2);
  background: var(--bs-fg);
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: left center; mask-position: left center;
  -webkit-mask-size: contain; mask-size: contain;
}
.eae-bs-brand-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: left center;
  flex-shrink: 0;
  user-select: none;
  pointer-events: none;
  transform: scale(var(--bs-logo-scale, 1));
  transform-origin: left center;
}
.eae-bs-brand-theme {
  background-color: var(--bs-fg);
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: left center; mask-position: left center;
  -webkit-mask-size: contain; mask-size: contain;
}
.eae-mk-intel { font-weight: 700; letter-spacing: -0.05em; font-size: calc(var(--bs-fs) * 1.1); }
.eae-mk-youtube, .eae-mk-yt { font-weight: 700; letter-spacing: -0.04em; font-size: calc(var(--bs-fs) * 0.85); }
.eae-mk-yt-box {
  margin-left: 0.12em;
  padding: 0.1em 0.22em;
  border-radius: 0.28em;
  background: var(--bs-fg);
  color: var(--bs-bg);
}
.eae-mk-netflix { font-weight: 800; letter-spacing: 0.02em; font-size: calc(var(--bs-fs) * 0.8); }
.eae-mk-amz { flex-direction: column; align-items: flex-start; gap: 0; font-weight: 700; letter-spacing: -0.04em; font-size: calc(var(--bs-fs) * 1); }
.eae-mk-amz i {
  display: block;
  width: 70%;
  height: 0.3em;
  margin: -0.08em 0 0 0.35em;
  border-bottom: 0.09em solid var(--bs-fg);
  border-radius: 0 0 60% 60%;
}
.eae-mk-ford {
  padding: 0.1em 0.7em 0.16em;
  border: 0.07em solid var(--bs-fg);
  border-radius: 50%;
  font-family: Georgia, "Times New Roman", serif;
  font-style: italic;
  font-weight: 700;
  font-size: calc(var(--bs-fs) * 0.8);
}
.eae-mk-samsung {
  padding: 0.35em 1em;
  border-radius: 50%;
  background: var(--bs-fg);
  color: var(--bs-bg);
  font-weight: 800;
  letter-spacing: 0.06em;
  font-size: calc(var(--bs-fs) * 0.5);
}
.eae-mk-ea { flex-direction: column; align-items: flex-start; font-style: italic; font-weight: 800; font-size: calc(var(--bs-fs) * 0.95); }
.eae-mk-ea small { font-size: 0.34em; font-style: normal; font-weight: 600; letter-spacing: 0.08em; margin-top: 0.15em; }
.eae-mk-nike { font-style: italic; font-weight: 900; letter-spacing: -0.04em; font-size: calc(var(--bs-fs) * 0.9); }
.eae-mk-aol { font-weight: 800; letter-spacing: -0.02em; font-size: calc(var(--bs-fs) * 1); }
.eae-mk-gucci { font-family: Georgia, "Times New Roman", serif; font-weight: 300; letter-spacing: 0.03em; font-size: calc(var(--bs-fs) * 0.95); }
.eae-mk-mcd svg {
  width: calc(var(--bs-fs) * 0.95);
  height: calc(var(--bs-fs) * 0.8);
  fill: none;
  stroke: var(--bs-fg);
  stroke-width: 3.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  overflow: visible;
}
.eae-mk-ms { gap: 0.25em; font-weight: 500; font-size: calc(var(--bs-fs) * 0.72); }
.eae-mk-ms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.09em;
  width: 1.15em;
  height: 1.15em;
}
.eae-mk-ms-grid b { display: block; background: var(--bs-fg); }

@media (max-width: 900px) {
  .eae-bs { --bs-fs: clamp(20px, 5.2vw, 34px); --bs-h: clamp(56px, 12vw, 84px); }
  .eae-bs-row { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: clamp(8px, 3vw, 24px); }
}

@media (prefers-reduced-motion: reduce) {
  .eae-bs-logo { transition: none; }
}
`;

export default function BrandShowcase({ groups = BRAND_GROUPS }: { groups?: Brand[][] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const slotCount = groups[0]?.length ?? 0;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || groups.length < 2 || slotCount === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const { hold, stagger, exitDuration, gap, enterDuration } = TIMING;
      const transition = (slotCount - 1) * stagger + exitDuration + gap + enterDuration;
      const cycle = hold + transition;

      const tl = gsap.timeline({ paused: true, repeat: -1 });

      groups.forEach((_, g) => {
        const next = (g + 1) % groups.length;
        const start = g * cycle + hold;

        for (let s = 0; s < slotCount; s++) {
          const out = itemRefs.current[g]?.[s];
          const incoming = itemRefs.current[next]?.[s];
          const motion = SLOT_MOTION[s % SLOT_MOTION.length];
          if (!out || !incoming) continue;

          const tOut = start + s * stagger;
          const tIn = tOut + exitDuration + gap;
          const away = vec(motion.exit);
          const from = vec(motion.enterFrom);

          tl.fromTo(
            out,
            { xPercent: 0, yPercent: 0 },
            { ...away, duration: exitDuration, ease: "power2.in", immediateRender: false },
            tOut
          );
          tl.fromTo(
            out,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: exitDuration * 0.4, ease: "none", immediateRender: false },
            tOut + exitDuration * 0.6
          );

          tl.fromTo(
            incoming,
            { ...from },
            { xPercent: 0, yPercent: 0, duration: enterDuration, ease: "power3.out", immediateRender: false },
            tIn
          );
          tl.fromTo(
            incoming,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: enterDuration * 0.35, ease: "none", immediateRender: false },
            tIn
          );
        }
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    });

    return () => mm.revert();
  }, [groups, slotCount]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: section,
      start: THEME_SWITCH_AT,
      end: "max",
      toggleClass: { targets: section, className: "is-light" },
    });

    return () => {
      st.kill();
      section.classList.remove("is-light");
    };
  }, []);

  return (
    <section ref={sectionRef} className="eae-bs" aria-label={SHOWCASE_HEADING}>
      <style dangerouslySetInnerHTML={{ __html: BRAND_CSS }} />
      <div className="eae-bs-row">
        {Array.from({ length: slotCount }, (_, s) => (
          <div key={s} className="eae-bs-slot">
            {groups.map((group, g) => (
              <div
                key={`${g}-${group[s].name}`}
                ref={(node) => {
                  if (!itemRefs.current[g]) itemRefs.current[g] = [];
                  itemRefs.current[g][s] = node;
                }}
                className={`eae-bs-logo${g === 0 ? " is-active" : ""}`}
              >
                <LogoMark brand={group[s]} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
