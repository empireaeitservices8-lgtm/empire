import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "./data";

export const metadata: Metadata = {
  title: "Our Services | Empire AE",
  description:
    "From ideas to breakthrough results, we craft powerful digital experiences that amplify your brand, captivate your audience, and turn clicks into customers.",
};

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const Arrow = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984" />
  </svg>
);

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-36 text-[#0a0a0a] sm:px-8 lg:px-14 lg:pt-44">
      <div className="mx-auto max-w-[1120px]">
        <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h1 className="text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">Our Services</h1>
          <p className="max-w-sm text-[0.95rem] leading-relaxed opacity-65 md:text-base">
            From ideas to breakthrough results, we craft powerful digital experiences that amplify your brand, captivate your audience, and turn clicks into customers.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                style={{ "--c-bg": s.bg, "--c-fg": s.fg } as CSSProperties}
                className={`group block rounded-[1.4rem] bg-[color-mix(in_srgb,currentColor_6%,transparent)] p-2 outline-none ring-1 ring-transparent transition-[background-color,color,transform,box-shadow] duration-500 ${EASE} hover:scale-[1.015] hover:bg-[var(--c-bg)] hover:text-[color:var(--c-fg)] hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] focus-visible:bg-[var(--c-bg)] focus-visible:text-[color:var(--c-fg)] focus-visible:ring-2 focus-visible:ring-current`}
              >
                <div
                  role="img"
                  aria-label={s.title}
                  className="aspect-[2/1] w-full rounded-[1.05rem] bg-cover bg-center"
                  style={{ backgroundColor: s.bg, backgroundImage: `url(${s.image})` }}
                />
                <div className="px-2.5 pb-2 pt-3.5">
                  <p className="text-[0.8rem] leading-snug opacity-70">{s.tags.join(" • ")}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-4">
                    <h2 className="text-[clamp(1.2rem,1rem+0.8vw,1.75rem)] font-medium leading-tight tracking-tight">{s.title}</h2>
                    <Arrow className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed opacity-70">{s.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/contact"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#0a0a0a] px-6 py-3 text-base font-medium text-white outline-none transition-opacity duration-300 hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-4"
          >
            Start a project
            <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}