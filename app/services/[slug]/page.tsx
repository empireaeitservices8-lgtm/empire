import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROCESS, SERVICES, getService } from "../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found | Empire AE" };
  return { title: `${service.title} | Empire AE`, description: service.description };
}

const Arrow = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984" />
  </svg>
);

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { title, description, tags, bg, fg, accent, image, overview, highlights } = service;
  const others = SERVICES.filter((s) => s.slug !== slug);
  const line = "color-mix(in srgb, currentColor 16%, transparent)";

  return (
    <main
      className="min-h-screen px-5 pb-20 pt-36 sm:px-8 lg:px-14 lg:pt-44"
      style={{ backgroundColor: bg, color: fg, "--accent": accent } as CSSProperties}
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm opacity-70">
          <Link href="/services" className="underline-offset-4 hover:underline">
            Services
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span>{title}</span>
        </nav>

        {/* Hero */}
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h1 className="text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">{title}</h1>
          <p className="max-w-md text-base leading-relaxed opacity-75 md:text-lg">{description}</p>
        </header>

        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border px-3.5 py-1.5 text-sm" style={{ borderColor: line }}>
              {t}
            </li>
          ))}
        </ul>

        {/* Image */}
        <div
          role="img"
          aria-label={title}
          className="mt-10 aspect-[16/9] w-full rounded-[1.4rem] bg-cover bg-center sm:aspect-[2/1]"
          style={{ backgroundColor: `color-mix(in srgb, ${fg} 8%, ${bg})`, backgroundImage: `url(${image})` }}
        />

        {/* Overview */}
        <section className="mt-16 grid gap-6 md:grid-cols-[1fr_2fr]">
          <h2 className="text-sm font-medium uppercase tracking-widest opacity-60">Overview</h2>
          <p className="text-[clamp(1.2rem,1rem+1vw,1.9rem)] font-light leading-snug tracking-tight">{overview}</p>
        </section>

        {/* What we do */}
        <section className="mt-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest opacity-60">What we do</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h.title} className="rounded-[1.2rem] border p-6" style={{ borderColor: line }}>
                <span aria-hidden="true" className="mb-4 block size-2.5 rounded-full" style={{ backgroundColor: accent }} />
                <h3 className="text-xl font-medium tracking-tight">{h.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed opacity-75">{h.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* How we work */}
        <section className="mt-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest opacity-60">How we work</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="border-t pt-4" style={{ borderColor: line }}>
                <span className="text-sm opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed opacity-75">{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Call to action */}
        <section className="mt-20 flex flex-col items-start gap-6 rounded-[1.4rem] border p-8 sm:p-10 md:flex-row md:items-center md:justify-between" style={{ borderColor: line }}>
          <h2 className="max-w-md text-[clamp(1.5rem,1rem+1.5vw,2.25rem)] font-medium leading-tight tracking-tight">
            Ready to talk about {title.toLowerCase()}?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full px-6 py-3 text-base font-medium outline-none transition-opacity duration-300 hover:opacity-85 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
            style={{ backgroundColor: fg, color: bg }}
          >
            Start a project
            <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </section>

        {/* Other services */}
        <section className="mt-16">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest opacity-60">More services</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex rounded-full border px-4 py-2 text-sm outline-none transition-colors duration-300 hover:bg-[color-mix(in_srgb,currentColor_12%,transparent)] focus-visible:bg-[color-mix(in_srgb,currentColor_12%,transparent)]"
                  style={{ borderColor: line }}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}