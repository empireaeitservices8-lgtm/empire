"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Clock, Mail, Phone, Share2 } from "lucide-react";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] ${
        seen ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Rule() {
  const { ref, seen } = useInView<HTMLDivElement>(0.5);
  return <div ref={ref} className={`h-[3px] rounded-full bg-black transition-[width] delay-300 duration-1000 ease-out ${seen ? "w-14" : "w-0"}`} />;
}

export const contactItems = [
  { icon: Phone, label: "Phone", value: "+91 9847980605", href: "tel:+919847980605" },
  { icon: Mail, label: "Email", value: "info@empireae.xyz", href: "mailto:info@empireae.xyz" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: undefined as string | undefined },
];

export const FACEBOOK_URL = "https://www.facebook.com/empireaeitservices";
export const INSTAGRAM_URL = "https://www.instagram.com/empire_ae_official/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/empireaeitservices";

const socialLink =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/20 px-3.5 py-1.5 text-[13px] font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

const infoCard =
  "group/info flex h-full min-w-0 items-center gap-4 rounded-2xl border border-black/10 bg-neutral-50 p-5 transition-all duration-300 hover:translate-x-1 hover:border-black hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,.25)]";
const infoIcon =
  "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-black text-white transition-transform duration-300 group-hover/info:-rotate-6";
const infoLabel = "text-xs font-semibold uppercase tracking-[0.1em] text-black/50";

export default function ContactInfo() {
  return (
    <section
      id="contact-info"
      data-nav-theme="light"
      className="relative z-10 -mt-px rounded-t-[2rem] bg-white text-black shadow-[0_-40px_80px_-20px_rgba(0,0,0,.6)] sm:rounded-t-[3rem]"
    >
      <div className="mx-auto grid max-w-[88rem] items-start gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-10 lg:py-20">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.1] text-black sm:text-5xl">Contact Information</h2>
          </Reveal>
          <div className="mt-5">
            <Rule />
          </div>
          <Reveal delay={150}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/70">
              Ready to take your business to the next level? Reach out to our team and let&apos;s make it happen.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {contactItems.map(({ icon: Icon, label, value, href }, i) => (
            <Reveal key={label} delay={200 + i * 80} className="h-full">
              <div className={infoCard}>
                <span className={infoIcon}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className={infoLabel}>{label}</h3>
                  {href ? (
                    <a href={href} className="mt-0.5 inline-block break-words text-base font-semibold text-black underline-offset-4 hover:underline sm:text-lg">
                      {value}
                    </a>
                  ) : (
                    <span className="mt-0.5 inline-block text-base font-semibold text-black sm:text-lg">{value}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={440} className="h-full">
            <div className={infoCard}>
              <span className={infoIcon}>
                <Share2 size={20} strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className={infoLabel}>Follow Us</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Empire AE on Facebook" className={socialLink}>
                    Facebook
                  </a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Empire AE on Instagram" className={socialLink}>
                    Instagram
                  </a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Empire AE on LinkedIn" className={socialLink}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
