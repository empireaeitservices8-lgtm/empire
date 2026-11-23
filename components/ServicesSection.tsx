"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export type ServiceMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string };

export type Service = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  bg: string;
  fg: string;
  accent: string;
  shadow: number;
  media?: ServiceMedia;
};

export const PAGE_TITLE = "Our Services";
export const PAGE_INTRO =
  "From ideas to breakthrough results, we craft powerful digital experiences that amplify your brand, captivate your audience, and turn clicks into customers.";
export const CTA_LABEL = "Start a project";
export const CTA_HREF = "/contact";

/* ---------------------------------------------------------------------
   SERVICE IMAGES
   ---------------------------------------------------------------------
   Put your image files in:   public/images/services/
   Then change only the file name in the `src` of each service below.
   Example: public/images/services/webdesign.jpg  ->  "/images/services/webdesign.jpg"
   (a link to an image on the internet also works, for example "https://...")
   --------------------------------------------------------------------- */
export const SERVICES: Service[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description: "We create visually compelling designs that build strong brand identities and make your business stand out.",
    tags: ["Brand Identity", "Social Media Creatives", "Marketing Materials"],
    href: "/services",
    bg: "#1a1411",
    fg: "#ffedd7",
    accent: "#e8a15a",
    shadow: 0.9,
    media: { type: "image", src: "/images/services/graphic-design.jpg", alt: "Graphic Design" },
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "We build secure, scalable websites engineered for performance and growth.",
    tags: ["React / Next.js", "Node", "Python","MySql","MongoDB"],
    href: "/services",
    bg: "#121414",
    fg: "#ffffff",
    accent: "#3dd6c6",
    shadow: 0.9,
    media: { type: "image", src: "/images/services/webdevelopment.jpg", alt: "Web Development" },
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "We develop powerful Android and iOS apps for seamless user experiences.",
    tags: ["Android", "iOS", "Flutter","Python","Node","MySql"],
    href: "/services",
    bg: "#E3E3F8",
    fg: "#000000",
    accent: "#7b7be8",
    shadow: 0.95,
    media: { type: "image", src: "/images/services/app-development.jpg", alt: "Mobile App Development" },
  },
  {
  slug: "hosting-deployment",
  title: "Hosting & Deployment",
  description: "We deploy and host websites with reliable infrastructure, secure configurations and seamless performance.",
  tags: ["Cloud Hosting", "Website Deployment", "Domain & SSL Setup"],
  href: "/services",
  bg: "#121414",
  fg: "#ffffff",
  accent: "#3dd6c6",
  shadow: 0.9,
  media: {
    type: "image",
    src: "/images/services/hosting-deployment.png",
    alt: "Hosting & Deployment"
  },
},
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "We boost visibility and attract customers through result-driven digital strategies.",
    tags: ["SEO", "Social Media", "Content Marketing"],
    href: "/services",
    bg: "#111a13",
    fg: "#d9f3de",
    accent: "#5fbf7a",
    shadow: 0.9,
    media: { type: "image", src: "/images/services/digital-marketing.jpg", alt: "Digital Marketing" },
  },
  {
    slug: "e-commerce-application",
    title: "E-Commerce Application",
    description: "We build seamless online stores that turn visitors into loyal customers.",
    tags: ["WooCommerce", "Payment Gateway", "Inventory Management"],
    href: "/services",
    bg: "#BFE3FA",
    fg: "#0a2540",
    accent: "#6cb8ee",
    shadow: 0.95,
    media: { type: "image", src: "/images/services/ecommerce.jpg", alt: "E-Commerce Application" },
  },
  {
    slug: "sales",
    title: "Sales",
    description: "We turn leads into long-term clients with a clear, consultative sales approach.",
    tags: ["Lead Generation", "Client Acquisition", "Business Development"],
    href: "/services",
    bg: "#1a1411",
    fg: "#ffedd7",
    accent: "#e8a15a",
    shadow: 0.9,
    media: { type: "image", src: "/images/services/sales.jpg", alt: "Sales" },
  },
  {
    slug: "seo",
    title: "SEO",
    description: "We improve search rankings, increase organic traffic, and grow your online reach.",
    tags: ["On-Page SEO", "Off-Page SEO", "Keyword Optimization"],
    href: "/services",
    bg: "#121414",
    fg: "#ffffff",
    accent: "#3dd6c6",
    shadow: 0.9,
    media: { type: "image", src: "/images/services/seo.jpg", alt: "SEO" },
  },
];

export type CurveConfig = {
  tiltX: number;
  tiltY: number;
  depth: number;
  pull: number;
  inward: number;
  scrub: number;
  perspective: number;
};
export type CurveBreakpoints = Record<"desktop" | "tablet" | "mobile", CurveConfig>;

export const DEFAULT_CURVE: CurveBreakpoints = {
  desktop: { tiltX: 16, tiltY: 9, depth: 170, pull: 5, inward: 4, scrub: 0.6, perspective: 1300 },
  tablet: { tiltX: 16, tiltY: 9, depth: 140, pull: 5, inward: 3, scrub: 0.6, perspective: 1200 },
  mobile: { tiltX: 14, tiltY: 7, depth: 90, pull: 4, inward: 0, scrub: 0.5, perspective: 1000 },
};

const STEPS = 12;
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const WIDTH = "w-[min(100%,520px)] md:w-[min(94%,1120px)] lg:w-[min(72vw,1120px)]";

function sample(t: number, side: number, c: CurveConfig) {
  const d = 1 - 2 * t;
  const arc = d * (Math.PI / 2);
  return {
    rotationX: d * c.tiltX,
    rotationY: -side * Math.abs(d) * c.tiltY * 0.6 - side * c.tiltY * 0.4,
    z: c.depth * (1 - Math.cos(arc)),
    yPercent: -Math.sin(arc) * c.pull,
    xPercent: -side * (1 - Math.cos(arc)) * c.inward,
  };
}

function buildCurve(el: HTMLElement, side: number, c: CurveConfig) {
  const trigger = el.closest("li") ?? el;
  gsap.set(el, { ...sample(0, side, c), transformPerspective: c.perspective, force3D: true });
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: c.scrub },
  });
  for (let k = 1; k <= STEPS; k++) tl.to(el, { ...sample(k / STEPS, side, c), duration: 1 });
}

function activateCard(root: HTMLElement, cards: HTMLElement[], card: HTMLElement) {
  cards.forEach((c) => {
    c.dataset.active = c === card ? "true" : "false";
    c.dataset.dim = c === card ? "false" : "true";
  });
  root.dataset.hot = "true";
  root.style.setProperty("--fw-sbg", card.style.getPropertyValue("--fw-bg"));
  root.style.setProperty("--fw-sfg", card.style.getPropertyValue("--fw-fg"));
}

function deactivateCard(root: HTMLElement, cards: HTMLElement[], card: HTMLElement) {
  card.dataset.active = "false";
  if (cards.some((c) => c.dataset.active === "true")) return;
  cards.forEach((c) => (c.dataset.dim = "false"));
  root.dataset.hot = "false";
  root.style.removeProperty("--fw-sbg");
  root.style.removeProperty("--fw-sfg");
}

function RollingTitle({ text }: { text: string }) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className="block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="block">
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-flex whitespace-nowrap">
              {Array.from(word).map((ch, c) => {
                const i = index++;
                return (
                  <span key={c} className="inline-block h-[1.25em] overflow-hidden leading-[1.25em]">
                    <span
                      className={`block transition-transform duration-500 ${EASE} group-data-[active=true]:-translate-y-1/2 motion-reduce:transition-none`}
                      style={{ transitionDelay: `${i * 18}ms` }}
                    >
                      <span className="block">{ch}</span>
                      <span className="block">{ch}</span>
                    </span>
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && <span className="inline-block w-[0.3em]" />}
          </span>
        ))}
      </span>
    </span>
  );
}

function ServiceMediaView({ service, index }: { service: Service; index: number }) {
  const { media, bg, fg, accent, title } = service;

  if (media?.type === "image") {
    return (
      <div
        role="img"
        aria-label={media.alt}
        className="size-full bg-cover bg-center"
        style={{ backgroundColor: bg, backgroundImage: `url(${media.src})` }}
      />
    );
  }
  if (media?.type === "video") {
    return (
      <video
        className="size-full object-cover"
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={`${title} preview`}
      />
    );
  }

  const variant = index % 3;
  const fgSoft = `color-mix(in srgb, ${fg} 22%, transparent)`;
  const blob = (x: string, y: string, size: string, color: string): CSSProperties => ({
    left: x,
    top: y,
    width: size,
    height: size,
    background: `radial-gradient(circle at 35% 35%, ${color}, transparent 65%)`,
  });

  return (
    <div className="relative size-full overflow-hidden" style={{ backgroundColor: bg }} aria-hidden="true">
      <div className="fw-drift-a absolute rounded-full blur-2xl" style={blob("-8%", "-20%", "70%", accent)} />
      <div
        className="fw-drift-b absolute rounded-full opacity-70 blur-3xl"
        style={blob("45%", "30%", "65%", `color-mix(in srgb, ${accent} 60%, ${fg})`)}
      />
      {variant === 0 && (
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: fgSoft, boxShadow: `0 0 0 clamp(14px,2.4vw,40px) ${fgSoft}` }}
        />
      )}
      {variant === 1 && (
        <div
          className="absolute left-1/2 top-1/2 aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-[28%] border"
          style={{ borderColor: fgSoft, background: `linear-gradient(135deg, ${fgSoft}, transparent)` }}
        />
      )}
      {variant === 2 && (
        <div className="absolute inset-x-[18%] bottom-[14%] flex h-[46%] items-end gap-[3%]">
          {[0.45, 0.8, 0.62, 1, 0.55].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-full border"
              style={{ height: `${h * 100}%`, borderColor: fgSoft, background: `linear-gradient(to top, ${fgSoft}, transparent)` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const style = {
    "--fw-bg": service.bg,
    "--fw-fg": service.fg,
    "--fw-shadow": service.shadow,
  } as CSSProperties;

  return (
    <li className="min-w-0">
      <div data-fw-motion className="will-change-transform">
        <div data-fw-tilt className="will-change-transform">
          <Link
            href={service.href}
            data-fw-card
            data-active="false"
            data-dim="false"
            style={style}
            className={`group block rounded-[1.1rem] bg-[color-mix(in_srgb,currentColor_7%,transparent)] p-1.5 outline-none ring-1 ring-transparent transition-[background-color,color,transform,box-shadow,opacity] duration-500 ${EASE} focus-visible:ring-2 focus-visible:ring-current data-[active=true]:scale-[1.02] data-[active=true]:bg-[var(--fw-bg)] data-[active=true]:text-[var(--fw-fg)] data-[active=true]:shadow-[0_40px_90px_-30px_rgba(0,0,0,var(--fw-shadow))] data-[active=true]:ring-[color-mix(in_srgb,var(--fw-fg)_22%,transparent)] data-[dim=true]:opacity-40 motion-reduce:transition-none sm:rounded-[1.4rem] sm:p-2`}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[0.7rem] sm:aspect-[2/1] sm:rounded-[1.05rem] lg:aspect-[2/1]">
              <div data-fw-media-inner className="size-full will-change-transform">
                <ServiceMediaView service={service} index={index} />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-data-[active=true]:opacity-100"
                style={{ background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.4), transparent 55%)" }}
              />
            </div>

            <div className="px-2 pb-1 pt-2.5 sm:px-2.5 sm:pb-1.5 sm:pt-3">
              <p className="text-[0.7rem] leading-snug opacity-70 sm:text-[0.8rem]">{service.tags.join(" • ")}</p>

              <div className="relative mt-1.5 text-[clamp(1.1rem,0.95rem+1vw,1.75rem)] font-medium leading-tight tracking-tight">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[0.6em] size-[0.55em] -translate-x-3 -translate-y-1/2 rounded-full bg-current opacity-0 transition-[transform,opacity] duration-500 ${EASE} group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100 motion-reduce:transition-none`}
                />
                <div
                  className={`w-[calc(100%-0.85em)] transition-transform duration-500 ${EASE} group-data-[active=true]:translate-x-[0.85em] motion-reduce:transition-none`}
                >
                  <RollingTitle text={service.title} />
                </div>
                <p className="mt-2 line-clamp-2 text-[0.8rem] font-normal leading-relaxed tracking-normal opacity-70 sm:text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
}

const FW_CSS = `
@keyframes fw-drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(4%,-5%,0) scale(1.06); } }
@keyframes fw-drift-b { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-5%,4%,0) rotate(8deg); } }
.fw-drift-a { animation: fw-drift-a 14s ease-in-out infinite; }
.fw-drift-b { animation: fw-drift-b 18s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .fw-drift-a, .fw-drift-b { animation: none; } }
`;

export default function ServicesSection({
  services = SERVICES,
  curve,
  ctaHref = CTA_HREF,
  ctaLabel = CTA_LABEL,
}: {
  services?: Service[];
  curve?: Partial<{ [K in keyof CurveBreakpoints]: Partial<CurveConfig> }>;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cursor = cursorRef.current;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        tablet: "(min-width: 768px) and (max-width: 1023.98px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
        canHover: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { desktop, tablet, reduceMotion, canHover } = ctx.conditions as Record<string, boolean>;
        const cards = gsap.utils.toArray<HTMLElement>("[data-fw-card]");
        const motions = gsap.utils.toArray<HTMLElement>("[data-fw-motion]");
        const fx = !reduceMotion;

        if (fx) {
          const key = desktop ? "desktop" : tablet ? "tablet" : "mobile";
          const cfg = { ...DEFAULT_CURVE[key], ...curve?.[key] };
          motions.forEach((el, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            buildCurve(el, side, cfg);
          });
        }

        const cleanups: Array<() => void> = [];
        const inner = (card: HTMLElement) => card.querySelector<HTMLElement>("[data-fw-media-inner]");

        if (fx)
          cards.forEach((card) => {
            const m = inner(card);
            if (m) gsap.set(m, { scale: 1.08 });
          });

        if (canHover) {
          const qx = cursor && fx ? gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" }) : null;
          const qy = cursor && fx ? gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" }) : null;
          if (cursor) gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });

          cards.forEach((card) => {
            const tilt = card.closest<HTMLElement>("[data-fw-tilt]");
            const media = inner(card);
            if (fx && tilt) gsap.set(tilt, { transformPerspective: 900 });

            const rx = fx && tilt ? gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" }) : null;
            const ry = fx && tilt ? gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" }) : null;
            const mx = fx && media ? gsap.quickTo(media, "x", { duration: 0.6, ease: "power3" }) : null;
            const my = fx && media ? gsap.quickTo(media, "y", { duration: 0.6, ease: "power3" }) : null;

            const enter = (e: PointerEvent | FocusEvent) => {
              activateCard(root, cards, card);
              if (!fx) return;
              if (media) gsap.to(media, { scale: 1.14, duration: 0.8, ease: "power3.out", overwrite: "auto" });
              if (cursor && e instanceof PointerEvent) {
                cursor.style.background = card.style.getPropertyValue("--fw-fg");
                cursor.style.color = card.style.getPropertyValue("--fw-bg");
                if (gsap.getProperty(cursor, "autoAlpha") === 0) gsap.set(cursor, { x: e.clientX, y: e.clientY });
                gsap.to(cursor, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
                card.style.cursor = "none";
              }
            };

            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              card.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
              card.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
              ry?.(nx * 7);
              rx?.(-ny * 7);
              mx?.(-nx * 12);
              my?.(-ny * 12);
              qx?.(e.clientX);
              qy?.(e.clientY);
            };

            const leave = () => {
              deactivateCard(root, cards, card);
              card.style.cursor = "";
              if (!fx) return;
              rx?.(0);
              ry?.(0);
              mx?.(0);
              my?.(0);
              if (media) gsap.to(media, { scale: 1.08, duration: 0.8, ease: "power3.out", overwrite: "auto" });
              if (cursor) gsap.to(cursor, { scale: 0, autoAlpha: 0, duration: 0.3, ease: "power3.in", overwrite: "auto" });
            };

            const focusOn = () => activateCard(root, cards, card);
            const focusOff = () => deactivateCard(root, cards, card);

            card.addEventListener("pointerenter", enter);
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            card.addEventListener("focus", focusOn);
            card.addEventListener("blur", focusOff);
            cleanups.push(() => {
              card.removeEventListener("pointerenter", enter);
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
              card.removeEventListener("focus", focusOn);
              card.removeEventListener("blur", focusOff);
              card.style.cursor = "";
              deactivateCard(root, cards, card);
            });
          });
        } else {
          cards.forEach((card) => {
            const tilt = card.closest<HTMLElement>("[data-fw-tilt]");
            if (fx && tilt) gsap.set(tilt, { transformPerspective: 900 });
            const rx = fx && tilt ? gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" }) : null;
            const ry = fx && tilt ? gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" }) : null;

            const touchMove = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              card.style.setProperty("--mx", `${(nx + 0.5) * 100}%`);
              card.style.setProperty("--my", `${(ny + 0.5) * 100}%`);
              ry?.(nx * 7);
              rx?.(-ny * 7);
            };
            const touchEnd = () => {
              rx?.(0);
              ry?.(0);
            };
            card.addEventListener("pointerdown", touchMove);
            card.addEventListener("pointermove", touchMove);
            card.addEventListener("pointerup", touchEnd);
            card.addEventListener("pointercancel", touchEnd);
            card.addEventListener("pointerleave", touchEnd);

            const media = inner(card);
            if (fx && media) {
              gsap.fromTo(
                media,
                { yPercent: -3.5 },
                { yPercent: 3.5, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
              );
            }

            cleanups.push(() => {
              card.removeEventListener("pointerdown", touchMove);
              card.removeEventListener("pointermove", touchMove);
              card.removeEventListener("pointerup", touchEnd);
              card.removeEventListener("pointercancel", touchEnd);
              card.removeEventListener("pointerleave", touchEnd);
            });
          });

          // Scroll-based activation: the card closest to the screen centre becomes active.
          let current: HTMLElement | null = null;

          const pick = () => {
            const vh = window.innerHeight;
            const mid = vh / 2;

            let best: HTMLElement | null = null;
            let bestDist = Infinity;
            for (const card of cards) {
              const r = card.getBoundingClientRect();
              const d = Math.abs(r.top + r.height / 2 - mid);
              if (d < bestDist) {
                bestDist = d;
                best = card;
              }
            }

            const sr = root.getBoundingClientRect();
            const inView = sr.top < mid && sr.bottom > mid;
            const next = inView && best && bestDist < vh * 0.35 ? best : null;

            if (next === current) return;

            if (next) activateCard(root, cards, next);
            else if (current) deactivateCard(root, cards, current);

            if (fx) {
              cards.forEach((card) => {
                const m = inner(card);
                if (m) gsap.to(m, { scale: card === next ? 1.14 : 1.08, duration: 0.8, ease: "power3.out", overwrite: "auto" });
              });
            }
            current = next;
          };

          const st = ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            onUpdate: pick,
            onRefresh: pick,
            onLeave: pick,
            onLeaveBack: pick,
          });
          pick();

          cleanups.push(() => {
            st.kill();
            cards.forEach((card) => deactivateCard(root, cards, card));
          });
        }

        return () => cleanups.forEach((fn) => fn());
      }
    );

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [curve, services]);

  return (
    <section
      ref={rootRef}
      id="services"
      data-hot="false"
      className="relative overflow-x-clip bg-[color:var(--fw-sbg,#ffffff)] px-4 py-[clamp(2rem,5vw,4.5rem)] text-[color:var(--fw-sfg,#0a0a0a)] transition-colors duration-700 ease-out motion-reduce:transition-none sm:px-6 lg:px-10"
    >
      <style>{FW_CSS}</style>
      <header className={`mx-auto mb-[clamp(1.5rem,3vw,2.5rem)] flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${WIDTH}`}>
        <h2 className="text-[clamp(2.25rem,1rem+4.5vw,5rem)] font-semibold leading-[0.95] tracking-tight">{PAGE_TITLE}</h2>
        <p className="max-w-sm text-[0.95rem] leading-relaxed opacity-65 md:text-base">{PAGE_INTRO}</p>
      </header>

      <ul
        className={`mx-auto grid grid-cols-1 items-start gap-x-[clamp(1.25rem,2.5vw,2.5rem)] gap-y-[clamp(1.25rem,3vw,2.5rem)] md:grid-cols-2 md:[&>li:nth-child(even)]:mt-[clamp(1.5rem,3.5vw,3.5rem)] ${WIDTH}`}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </ul>

      <div className={`mx-auto mt-[clamp(1.5rem,3vw,2.5rem)] ${WIDTH}`}>
        <Link
          href={ctaHref}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-current px-6 py-3 text-base font-medium outline-none transition-opacity duration-300 hover:opacity-85 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
        >
          <span className="inline-flex items-center gap-3 text-[color:var(--fw-sbg,#ffffff)]">
            <span aria-hidden="true" className="size-2 rounded-full bg-current" />
            <span>{ctaLabel}</span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            >
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984" />
            </svg>
          </span>
        </Link>
      </div>

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 flex size-[84px] items-center justify-center rounded-full text-sm font-medium opacity-0 invisible"
      >
        View
      </div>
    </section>
  );
}