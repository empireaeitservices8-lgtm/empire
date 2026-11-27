"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronsDown, Volume2, VolumeX, Play } from "lucide-react";
import { getLenis } from "@/lib/lenis";

export type HeroSlide = {
  video: string;
  poster: string;
  title: string;
  text: string;
  cta: string;
  href: string;
};

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "diy4ratd";
// Original URL (same as your first working version, no extra transformations)
export const CLOUDINARY_HERO_VIDEO = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/empire-ae/hero/homevideo1.mp4`;
export const CLOUDINARY_HERO_POSTER = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/empire-ae/hero/hero.webp`;

// Thumbnail shown immediately while the hero video loads.
// We try "/images/" first and automatically fall back to "/image/".
const HERO_THUMBNAILS = ["/images/herosection.png", "/image/herosection.png"];

const LOCAL_VIDEO_FALLBACK = "/videos/homevideo1.mp4";

// If the video has not produced a frame after this many ms, try the next video source
const STALL_TIMEOUT_MS = 8000;

export const HERO_SLIDES: HeroSlide[] = [
  {
    video: CLOUDINARY_HERO_VIDEO,
    poster: CLOUDINARY_HERO_POSTER,
    title: "",
    text: "",
    cta: "",
    href: "",
  },
  {
    video: CLOUDINARY_HERO_VIDEO,
    poster: CLOUDINARY_HERO_POSTER,
    title: "",
    text: "",
    cta: "",
    href: "/services",
  },
  {
    video: CLOUDINARY_HERO_VIDEO,
    poster: CLOUDINARY_HERO_POSTER,
    title: "",
    text: "",
    cta: "",
    href: "/services",
  },
  {
    video: CLOUDINARY_HERO_VIDEO,
    poster: CLOUDINARY_HERO_POSTER,
    title: "",
    text: "",
    cta: "",
    href: "/services",
  },
];

export default function HeroSection({ slides = HERO_SLIDES }: { slides?: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1 for the playing video
  const [muted, setMuted] = useState(true);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  // true once the video is actually playing frames (used only to remove the thumbnail underneath)
  const [videoReady, setVideoReady] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0);

  // Single video element for the whole hero section
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMountedRef = useRef(true);
  const isInitialMount = useRef(true);

  const count = slides.length;
  const slide = slides[current] || HERO_SLIDES[0];
  const thumbnail = HERO_THUMBNAILS[Math.min(thumbIndex, HERO_THUMBNAILS.length - 1)];

  // Video sources are tried in order: 1) your Cloudinary URL, 2) the same video re-encoded as H.264
  // (fixes codecs the browser cannot play), 3) the local file in /public/videos.
  const sources = useMemo(() => {
    const list = [slide.video];
    if (slide.video.includes("/video/upload/")) {
      list.push(slide.video.replace("/video/upload/", "/video/upload/f_mp4,vc_h264,q_auto/"));
    }
    list.push(LOCAL_VIDEO_FALLBACK);
    return Array.from(new Set(list));
  }, [slide.video]);

  const videoSrc = sources[Math.min(sourceIndex, sources.length - 1)];

  // Reset to the first source only when the slide's video URL really changes
  useEffect(() => {
    setSourceIndex(0);
  }, [slide.video]);

  const markReady = useCallback(() => {
    if (isMountedRef.current) setVideoReady(true);
  }, []);

  const tryNextSource = useCallback(() => {
    setVideoReady(false);
    setSourceIndex((i) => (i < sources.length - 1 ? i + 1 : i));
  }, [sources.length]);

  // Stable callback ref: sets DOM muted & defaultMuted immediately on attach without re-render churn
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) {
      node.defaultMuted = true;
      node.muted = true;
    }
  }, []);

  const goTo = (i: number) => {
    setProgress(0);
    setCurrent(i);
  };
  const advance = () => {
    setProgress(0);
    setCurrent((c) => (c + 1) % count);
  };

  // Safe playback function that checks media buffer readiness before attempting .play()
  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    const start = () => {
      if (!isMountedRef.current) return;
      const promise = v.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (isMountedRef.current) {
              setIsAutoplayBlocked(false);
            }
          })
          .catch((err) => {
            if (process.env.NODE_ENV === "development") {
              console.warn("[Hero] Autoplay blocked or play() failed:", err);
            }
            if (isMountedRef.current) {
              setIsAutoplayBlocked(true);
            }
          });
      }
    };

    if (v.readyState >= 2) {
      start();
    } else {
      const onCanPlay = () => {
        v.removeEventListener("canplay", onCanPlay);
        start();
      };
      v.addEventListener("canplay", onCanPlay, { once: true });
    }
  }, []);

  // Track component mount status
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Whenever the source changes (the <video> is re-created), start playing it again
  useEffect(() => {
    setVideoReady(false);
    attemptPlay();
  }, [videoSrc, attemptPlay]);

  // Safety net 1: poll briefly and reveal as soon as frames are really moving
  // (covers events that fired before React attached its handlers).
  useEffect(() => {
    let tries = 0;
    const id = window.setInterval(() => {
      const v = videoRef.current;
      tries += 1;
      if (v && !v.paused && v.currentTime > 0 && v.readyState >= 2) {
        markReady();
        window.clearInterval(id);
      } else if (tries > 100) {
        window.clearInterval(id);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [markReady, videoSrc]);

  // Safety net 2: if the current source never produces a frame (no error, just silence), try the next one
  useEffect(() => {
    if (isAutoplayBlocked) return;
    const id = window.setTimeout(() => {
      const v = videoRef.current;
      if (!v) return;
      if (v.readyState < 2 || v.currentTime === 0) {
        if (process.env.NODE_ENV === "development") {
          console.warn("[Hero] Video stalled, trying next source:", videoSrc);
        }
        tryNextSource();
      }
    }, STALL_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [videoSrc, isAutoplayBlocked, tryNextSource]);

  // Play on slide transition (initial mount is handled by the source effect above)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    try {
      v.currentTime = 0;
    } catch {}

    attemptPlay();
  }, [current, attemptPlay]);

  // Synchronize muted state whenever user toggles the mute button
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  // Resume playback when user returns to the browser tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const v = videoRef.current;
        if (v && v.paused && !isAutoplayBlocked) {
          attemptPlay();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, [attemptPlay, isAutoplayBlocked]);

  // If autoplay is blocked by browser policy, retry and unlock on first user gesture
  useEffect(() => {
    if (!isAutoplayBlocked) return;

    const handleUserGesture = () => {
      const v = videoRef.current;
      if (v && v.paused) {
        v.play()
          .then(() => {
            setIsAutoplayBlocked(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", handleUserGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleUserGesture, { once: true, passive: true });
    window.addEventListener("scroll", handleUserGesture, { once: true, passive: true });
    window.addEventListener("keydown", handleUserGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("scroll", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, [isAutoplayBlocked]);

  // Manual play button click handler
  const handleManualPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => {
        setIsAutoplayBlocked(false);
      })
      .catch(() => {});
  };

  const scrollDown = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(window.innerHeight, { duration: 1.2 });
    else window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative isolate flex h-[100svh] min-h-[520px] w-full items-end overflow-hidden bg-[#222831] [@media(max-height:480px)]:min-h-[420px]">
      {/* Thumbnail layer: real <img> so it shows immediately while the video loads.
          It sits UNDER the video, so it can never hide the video. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnail}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onError={() => {
          // Try the next thumbnail path (/images -> /image)
          setThumbIndex((i) => (i < HERO_THUMBNAILS.length - 1 ? i + 1 : i));
        }}
        className={`absolute inset-0 -z-30 h-full w-full object-cover object-center transition-opacity duration-700 ${
          videoReady ? "opacity-0 delay-700" : "opacity-100"
        }`}
      />

      {/* Video: always visible. key={videoSrc} re-creates the element when we switch to a fallback
          source, so the browser starts a clean load + autoplay for it. */}
      <video
        key={videoSrc}
        ref={setVideoRef}
        src={videoSrc}
        poster={thumbnail}
        autoPlay
        muted={muted}
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
        onLoadedData={() => {
          const v = videoRef.current;
          if (v && !v.paused) markReady();
        }}
        onCanPlay={() => {
          // Kick playback if the browser did not start it by itself
          const v = videoRef.current;
          if (v && v.paused && !isAutoplayBlocked) attemptPlay();
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress(v.currentTime / v.duration);
          if (!videoReady && v.currentTime > 0) markReady();
        }}
        onEnded={advance}
        onPlaying={() => {
          setIsAutoplayBlocked(false);
          markReady();
        }}
        onError={(e) => {
          if (process.env.NODE_ENV === "development") {
            console.error("[Hero] Video failed to load:", videoSrc, e.currentTarget.error);
          }
          tryNextSource();
        }}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Clean manual play button if browser blocks autoplay */}
      {isAutoplayBlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={handleManualPlay}
            aria-label="Play background video"
            className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/20 bg-black/60 px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#76ABAE] hover:bg-black/80 hover:text-[#76ABAE] focus:outline-none focus:ring-2 focus:ring-[#76ABAE]"
          >
            <Play size={20} className="translate-x-0.5 fill-current" />
            <span>Play Video</span>
          </button>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1500px] px-5 pb-[calc(9rem+env(safe-area-inset-bottom))] sm:px-10 sm:pb-32 md:px-14 lg:px-[8%] lg:pb-28 xl:px-[10%] xl:pb-32 [@media(max-height:480px)]:pb-20">
        {/* key remounts the text so the entrance animation replays on every slide */}
        <div key={current} className="max-w-3xl">
          {slide.title && (
            <h1
              className="hero-title up text-[clamp(2rem,8vw,2.75rem)] font-light leading-[1.12] text-[#EEEEEE] sm:text-5xl md:text-6xl xl:text-7xl"
              style={{ animationDelay: ".1s" }}
            >
              <span className="font-bold">{slide.title}</span>
            </h1>
          )}
          {slide.text && (
            <p
              className="up mt-4 max-w-xl text-sm leading-relaxed text-[#EEEEEE]/75 sm:mt-6 sm:text-base lg:text-lg"
              style={{ animationDelay: ".25s" }}
            >
              {slide.text}
            </p>
          )}
          {slide.cta && slide.href && (
            <Link
              href={slide.href}
              className="up group mt-6 inline-flex items-center gap-3 text-base font-medium text-[#EEEEEE] transition-colors hover:text-[#b3f1f4] sm:mt-8"
              style={{ animationDelay: ".4s" }}
            >
              {slide.cta}
            </Link>
          )}
        </div>
      </div>

      {/* progress bars for phones (the "Next" card is hidden there) */}
      <div className="absolute bottom-[calc(3.75rem+env(safe-area-inset-bottom))] left-5 right-5 flex gap-2 sm:hidden">
        {slides.map((s, i) => (
          <button key={`${s.video}-${i}`} type="button" onClick={() => goTo(i)} aria-label={`Show slide ${i + 1}`} className="flex-1 py-2">
            <span className="block h-[2px] w-full overflow-hidden bg-white/30">
              <span
                className="block h-full origin-left bg-white transition-transform duration-300 ease-linear"
                style={{ transform: `scaleX(${i < current ? 1 : i === current ? progress : 0})` }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* mute toggle */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-[calc(6rem+env(safe-area-inset-bottom))] right-5 grid h-11 w-11 place-items-center text-[#EEEEEE] transition-colors hover:text-[#76ABAE] sm:bottom-8 sm:right-8 lg:right-[2%] [@media(max-height:480px)]:bottom-4"
      >
        {muted ? <VolumeX size={26} strokeWidth={1.5} /> : <Volume2 size={26} strokeWidth={1.5} />}
      </button>

      {/* scroll down */}
      <button
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-[#EEEEEE] transition-colors hover:text-[#76ABAE] sm:bottom-6 [@media(max-height:480px)]:bottom-3"
      >
        <ChevronsDown size={34} strokeWidth={1.25} className="animate-bounce" />
      </button>
    </section>
  );
}