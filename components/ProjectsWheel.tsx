"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const filters = ["All Projects", "Web Development", "Mobile App", "Digital Marketing"] as const;
export type Filter = (typeof filters)[number];
export type Category = Exclude<Filter, "All Projects">;

export const projects: {
  title: string;
  tag: string;
  category: Category;
  text: string;
  overlay: string;
  image: string;
}[] = [
  { title: "Nakshathra HRMS", overlay: "Nakshathra", tag: "Mobile App", category: "Mobile App", text: "", image: "images/logos/Nakshathra_Hrms.png" },
  { title: "Mirqas", overlay: "Jewellery", tag: "Web Development", category: "Web Development", text: "Premium Perfume E-commerce Platform", image: "images/logos/mirqas.png" },
  { title: "Caior", overlay: "", tag: "Digital Marketing", category: "Digital Marketing", text: "Digital Marketing & Brand Promotion", image: "images/logos/caiorr.png" },
  { title: "Kerala Institute", overlay: "", tag: "Mobile App", category: "Mobile App", text: "Kerala Institute – Educational Web Application", image: "images/logos/kde.png" },
  { title: "Dhavam Spices", overlay: "ecommerce", tag: "Web Development", category: "Web Development", text: "Farm-Fresh Spice E-commerce Platform", image: "images/logos/dhavam.png" },
  { title: "Vivide", overlay: "", tag: "Digital Marketing", category: "Digital Marketing", text: "", image: "images/logos/vivide.png" },
];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function ProjectsWheel() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const [idx, setIdx] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const visible = filter === "All Projects" ? projects : projects.filter((p) => p.category === filter);
  const countFor = (f: Filter) => (f === "All Projects" ? projects.length : projects.filter((p) => p.category === f).length);
  const safeIdx = Math.min(idx, visible.length - 1);
  const active = visible[safeIdx];

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    if (!root || !ring) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-pw-card]"));
    const n = cards.length;
    if (!n) return;

    const DEG = 180 / Math.PI;
    const SCALE = 1.06;
    const ASPECT = 10 / 16;
    const proxy = { v: 0 };
    let R = 600;
    let step = 0.3;
    let shown = -1;

    const measure = () => {
      const W = root.clientWidth;
      const H = root.clientHeight;
      const phone = W < 640;
      const tablet = W >= 640 && W < 1024;

      const info = infoRef.current;
      const counter = counterRef.current;
      const wrap = info?.offsetParent as HTMLElement | null;
      const top = info ? (wrap?.offsetTop ?? 0) + info.offsetTop + info.offsetHeight + 16 : H * 0.4;
      const bottom = counter ? counter.offsetTop - 16 : H - 48;
      const avail = Math.max(bottom - top, 120);

      const base = phone ? clamp(W * 0.66, 180, 320) : tablet ? clamp(W * 0.4, 260, 380) : clamp(W * 0.26, 300, 440);
      const cw = Math.max(120, Math.min(base, avail / (SCALE * ASPECT)));
      const cardY = Math.round(top + avail / 2);

      const spacing = cw * (phone ? 0.8 : tablet ? 1.05 : 1.16);
      const targetStep = phone ? 0.5 : tablet ? 0.42 : 0.36;
      R = Math.max(spacing / targetStep, 240);
      step = spacing / R;

      gsap.set(cards, { top: cardY, width: cw, xPercent: -50, yPercent: -50 });
      Object.assign(ring.style, {
        width: `${R * 2}px`,
        height: `${R * 2}px`,
        left: `${W / 2 - R}px`,
        top: `${cardY}px`,
      });
    };

    const render = () => {
      const v = proxy.v;
      cards.forEach((el, i) => {
        const d = i - v;
        const ad = Math.abs(d);
        const a = d * step;
        gsap.set(el, {
          x: R * Math.sin(a),
          y: R * (1 - Math.cos(a)),
          rotation: a * DEG,
          scale: SCALE - Math.min(ad, 2) * 0.15,
          autoAlpha: ad > 3 ? 0 : Math.max(0.18, 1 - ad * 0.32),
          zIndex: Math.round(20 - ad * 3),
        });
      });
      gsap.set(ring, { rotation: -v * step * DEG });
      if (barRef.current) barRef.current.style.transform = `scaleX(${n > 1 ? v / (n - 1) : 1})`;
      const i = Math.round(v);
      if (i !== shown) {
        shown = i;
        setIdx(i);
      }
    };

    const ctx = gsap.context(() => {
      measure();
      render();

      if (n > 1) {
        const H0 = 0.2;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(root.clientHeight * ((n - 1) * 0.7 + 0.4))}`,
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to({}, { duration: H0 });
        tl.to(proxy, { v: n - 1, duration: n - 1, onUpdate: render });
        tl.to({}, { duration: H0 });
        stRef.current = tl.scrollTrigger ?? null;
      }
    }, root);

    const ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(root);
    if (infoRef.current) ro.observe(infoRef.current);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (cancelled) return;
      measure();
      render();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      ctx.revert();
      stRef.current = null;
    };
  }, [filter]);

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st || i === safeIdx) return;
    const n = visible.length;
    const frac = (0.2 + i) / (n - 1 + 0.4);
    const y = st.start + (st.end - st.start) * frac;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const pick = (f: Filter) => {
    if (f === filter) return;
    const st = stRef.current;
    if (st) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(st.start, { immediate: true });
      else window.scrollTo(0, st.start);
    }
    setIdx(0);
    setFilter(f);
  };

  return (
    <section id="projects" ref={rootRef} className="relative h-[100svh] w-full overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_85%,rgba(118,171,174,.16),transparent_70%)]"
      />

      <div ref={ringRef} aria-hidden="true" className="pointer-events-none absolute">
        <div className="absolute inset-0 rounded-full border border-white/15" />
        <div className="absolute rounded-full border border-dashed border-white/10" style={{ inset: "-6%" }} />
        <div className="absolute rounded-full border border-white/[0.07]" style={{ inset: "9%" }} />
        {[0, 72, 144, 216, 288].map((a) => (
          <span key={a} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
            <i className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9fedf1]/80" />
          </span>
        ))}
      </div>

      {visible.map((p, i) => (
        <div
          key={p.title}
          data-pw-card
          role="button"
          tabIndex={0}
          aria-label={`Show ${p.title}`}
          aria-current={i === safeIdx ? "true" : undefined}
          onClick={() => goTo(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goTo(i);
            }
          }}
          className="absolute left-1/2 top-0 w-[66vw] cursor-pointer touch-manipulation outline-none focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-[#9fedf1] sm:w-[40vw] lg:w-[26vw]"
          style={{ opacity: 0 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-[#141414] shadow-2xl shadow-black/60 sm:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" draggable={false} decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-2.5 sm:p-4">
              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-xs">{p.category}</span>
              <span className="font-display text-base text-white/90 sm:text-2xl">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="pointer-events-none relative z-30 mx-auto flex h-full max-w-[88rem] flex-col px-5 pt-[clamp(4.5rem,12svh,7rem)] sm:px-10">
        <div ref={infoRef}>
          <div className="pointer-events-auto -mx-1 flex gap-x-6 overflow-x-auto px-1 [scrollbar-width:none] sm:gap-x-8 [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => pick(f)}
                aria-pressed={filter === f}
                className={`group relative shrink-0 py-2 text-sm font-medium transition-colors duration-300 ${
                  filter === f ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {f}
                <sup className={`ml-1 text-xs ${filter === f ? "text-[#aaeff3]" : "text-white/40"}`}>{countFor(f)}</sup>
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#9fedf1] transition-transform duration-500 ease-out ${
                    filter === f ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div key={active.title} aria-live="polite" className="mt-3 max-w-2xl sm:mt-6">
            <div className="up flex items-center gap-3 text-xs" style={{ animationDelay: ".05s" }}>
              <span className="rounded-full border border-[#76ABAE]/40 px-3 py-1 font-medium text-[#76ABAE]">{active.tag}</span>
            </div>
            <h2
              className="up mt-2 truncate font-display text-[clamp(1.75rem,min(6vw,8svh),5rem)] font-bold leading-[1.05] tracking-tight sm:mt-3"
              style={{ animationDelay: ".12s" }}
            >
              {active.title}
            </h2>
            <p
              className="up mt-3 line-clamp-2 min-h-[2.9em] max-w-xl text-sm leading-relaxed text-white/65 sm:line-clamp-3 sm:min-h-[4.4em] sm:text-base [@media(max-height:520px)]:hidden"
              style={{ animationDelay: ".2s" }}
            >
              {active.text || `${active.category} project delivered by Empire AE.`}
            </p>
            <Link
              href="/contact"
              className="pointer-events-auto up group mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#9fedf1] sm:mt-4 sm:text-base"
              style={{ animationDelay: ".3s" }}
            >
              Start a similar project
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div ref={counterRef} className="absolute inset-x-5 bottom-4 z-30 flex items-center gap-4 sm:inset-x-10 sm:bottom-5">
        <span className="font-display text-sm tabular-nums text-white">
          {String(safeIdx + 1).padStart(2, "0")}
          <span className="text-white/40"> / {String(visible.length).padStart(2, "0")}</span>
        </span>
        <span className="relative h-px flex-1 bg-white/15">
          <span ref={barRef} className="absolute inset-0 origin-left bg-[#dff3f4]" style={{ transform: "scaleX(0)" }} />
        </span>
        {visible.length > 1 && <span className="hidden text-xs uppercase tracking-[0.18em] text-white/45 sm:block">Scroll to rotate</span>}
      </div>
    </section>
  );
}
