"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "@/lib/lenis";

import HeroSection from "@/components/HeroSection";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import BrandShowcase from "@/components/BrandShowcase";
import ClientTestimonials, { isReviewsEngaged } from "@/components/ClientTestimonials";
import WordsShowcase from "@/components/WordsShowcase";
import ServicesSection from "@/components/ServicesSection";
import ProjectsWheel from "@/components/ProjectsWheel";
import ContactInfo from "@/components/ContactInfo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/* Global / hero styles */
const HOME_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
.home-root{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}
.home-root h1,.home-root h2,.home-root h3{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;letter-spacing:-0.03em}
.home-root h1.hero-title{font-weight:300;letter-spacing:-0.02em}
.home-root .font-display{font-family:'Inter',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}
.home-root h2.font-display{letter-spacing:-0.025em}
@keyframes up { from{opacity:0;transform:translateY(40px);filter:blur(8px)} to{opacity:1;transform:none;filter:blur(0)} }
@keyframes rowIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes grad { to{background-position:200% center} }
.up{opacity:0;animation:up 1s cubic-bezier(.2,.7,.2,1) forwards}
.row-in{animation:rowIn .6s cubic-bezier(.2,.8,.2,1) both}
.gtext{background:linear-gradient(100deg,#EEEEEE 0%,#76ABAE 30%,#EEEEEE 55%,#76ABAE 80%,#EEEEEE 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:grad 6s linear infinite}
.gtext-white{background:linear-gradient(100deg,#FFFFFF 0%,#B8B8B8 30%,#FFFFFF 55%,#B8B8B8 80%,#FFFFFF 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:grad 6s linear infinite}
.grain::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}.up{opacity:1;filter:none}}
`;

/* Responsive safeguards */
const RESPONSIVE_CSS = `
.home-root { width: 100%; max-width: 100%; overflow-x: clip; }
.home-root *, .home-root *::before, .home-root *::after { box-sizing: border-box; }
.home-root img, .home-root video, .home-root svg { max-width: 100%; }
.home-root a, .home-root button { -webkit-tap-highlight-color: transparent; }
.home-root button, .home-root a { touch-action: manipulation; }
.home-root :focus-visible { outline: 2px solid #9fedf1; outline-offset: 4px; }

.eae-bs { width: 100%; min-width: 0; }
.eae-bs-row { width: 100%; }
.eae-bs-slot { min-width: 0; }
.eae-reviews, .eae-reviews * { min-width: 0; }
.eae-reveal, .eae-bs, .eae-reviews, #services, #projects, #contact-info { max-width: 100%; }

#services { scroll-margin-top: 1rem; }
#services ul { width: min(100%, 88rem); }
#services li { min-width: 0; }
#services [data-fw-tilt] { transform-style: preserve-3d; }
#projects { isolation: isolate; }
#contact-info a { overflow-wrap: anywhere; }

@media (max-width: 767px) {
  .home-root { overflow-x: clip; }
  .home-root h1, .home-root h2, .home-root h3 { overflow-wrap: anywhere; }
  .home-root section { scroll-margin-top: 0; }
  .eae-bs { padding-inline: 1rem; }
  .eae-bs-row { gap: .5rem; }
  .eae-bs-slot { overflow: hidden; }
  .eae-bs .eae-mk { max-width: 100%; font-size: clamp(.8rem, 3.2vw, 1.3rem); }
  .eae-reviews { padding-inline: 1rem; }
  #services { padding-inline: 1rem; }
  #services header { align-items: flex-start; }
  #services ul { grid-template-columns: minmax(0, 1fr); }
  #services ul > li:nth-child(even) { margin-top: 0; }
  #contact-info { border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem; }
  #contact-info > div { padding: 3rem 1.25rem; gap: 1.75rem; }
  #contact-info .grid { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 479px) {
  .home-root section { min-width: 0; }
  .home-root .hero-title { font-size: clamp(2rem, 10vw, 2.75rem); line-height: 1.08; }
  .home-root section:first-of-type { min-height: 620px; }
  .home-root section:first-of-type > div.mx-auto { padding-inline: 1.25rem; padding-bottom: 8.5rem; }
  .home-root section:first-of-type > button[aria-label="Scroll down"] { bottom: .75rem; }
  .home-root section:first-of-type > button[aria-label="Mute video"], 
  .home-root section:first-of-type > button[aria-label="Unmute video"] { right: 1rem; bottom: 4.4rem; }
  #contact-info .text-4xl { font-size: 2rem; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #services { padding-inline: 1.5rem; }
  #contact-info > div { gap: 2rem; padding-inline: 2rem; }
}

@media (hover: none), (pointer: coarse) {
  #services [data-fw-tilt] { transform: none !important; }
  #services [data-fw-cursor] { display: none !important; }
}

@media (prefers-reduced-motion: reduce) {
  .home-root *, .home-root *::before, .home-root *::after {
    scroll-behavior: auto !important;
  }
}
`;

export default function Home() {
  // One global Lenis instance driven by GSAP's ticker (smooth scroll + ScrollTrigger sync).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      syncTouch: false, // keep native touch scrolling on phones (smoother, no lag)
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      prevent: (node) => {
        const section = node.closest(".eae-showcase");
        return !!section && isReviewsEngaged(section);
      },
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <main className="home-root relative overflow-x-clip bg-[linear-gradient(180deg,#31363F_0%,#222831_22%,#31363F_50%,#222831_78%,#222831_100%)] text-[#EEEEEE] selection:bg-[#b4edf0] selection:text-[#222831]">
      <style>{HOME_CSS}</style>
      <style>{RESPONSIVE_CSS}</style>
      <div className="grain" />

      {/* 1. HERO (video) */}
      <HeroSection />

      {/* 2. SCROLL TEXT REVEAL */}
      <ScrollTextReveal />

      {/* 3. BRAND SHOWCASE (black -> white) + CLIENT REVIEWS */}
      <BrandShowcase />
      <ClientTestimonials />

      {/* 4. WORDS SHOWCASE (Vision / Expertise / Success) */}
      <WordsShowcase />

      {/* 5. SERVICES */}
      <ServicesSection />

      {/* 6. PROJECTS (circular wheel, pinned) + CONTACT INFO */}
      <div className="relative bg-black">
        <ProjectsWheel />
        <ContactInfo />
      </div>
    </main>
  );
}
