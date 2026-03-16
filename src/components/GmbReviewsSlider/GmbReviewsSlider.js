"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import LeftArrow from "../../assets/icons/arrowbackward.svg";
import RightArrow from "../../assets/icons/arrow_foreward.svg";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function GmbReviewsSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // ✅ MOBILE track control
  const mobileTrackRef = useRef(null);
  const mobileStepRef = useRef(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success && data.testimonials?.length > 0) {
          setTestimonials(data.testimonials);
        }
      } catch (err) {
        console.error("Failed to fetch Google reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    if (perView !== 1) return;
    const el = mobileTrackRef.current;
    if (!el) return;

    const measure = () => {
      const card = el.querySelector("[data-ts-card='true']");
      if (!card) return;

      const cardW = card.getBoundingClientRect().width;
      const styles = window.getComputedStyle(el);
      const gap = parseFloat((styles.columnGap || styles.gap || "16").toString()) || 16;

      mobileStepRef.current = cardW + gap;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView, testimonials.length]);

  const scrollToMobileIndex = useCallback((nextIndex) => {
    const el = mobileTrackRef.current;
    if (!el) return;

    const step = mobileStepRef.current || 0;
    if (!step) return;

    el.scrollTo({
      left: nextIndex * step,
      behavior: "smooth",
    });
  }, []);

  const next = useCallback(() => {
    setIndex((i) => {
      const ni = i >= maxIndex ? 0 : i + 1;
      if (perView === 1) scrollToMobileIndex(ni);
      return ni;
    });
  }, [maxIndex, perView, scrollToMobileIndex]);

  const prev = useCallback(() => {
    setIndex((i) => {
      const ni = i <= 0 ? maxIndex : i - 1;
      if (perView === 1) scrollToMobileIndex(ni);
      return ni;
    });
  }, [maxIndex, perView, scrollToMobileIndex]);

  // ✅ autoplay (pause on hover/focus)
  useEffect(() => {
    if (paused || loading) return;
    if (testimonials.length <= perView) return;

    intervalRef.current = window.setInterval(() => {
      next();
    }, 3800);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, perView, testimonials.length, next, loading]);

  if (loading) {
      return (
          <section className="w-full bg-[#1f1f1f] py-20 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#c79a3a] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white/50 text-xs font-bold uppercase tracking-widest">Fetching Google Reviews...</p>
          </section>
      );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full bg-[#1f1f1f] text-white py-14 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h4.74c-.2 1.06-.9 1.95-2.02 2.71l2.72 2.13c1.58-1.47 2.49-3.62 2.49-6.12 0-.33-.03-.66-.08-1h-7.85z" fill="#4285F4"/>
                    <path d="M12.48 5.68c1.69 0 3.21.58 4.41 1.72l3.29-3.29C18.17 2.14 15.54 1 12.48 1 7.6 1 3.5 4.3 2.1 8.76l3.2 2.49c.75-2.24 2.85-3.87 5.18-3.87z" fill="#EA4335"/>
                    <path d="M12.48 22.12c2.4 0 4.41-.8 5.88-2.18l-2.72-2.13c-.81.55-1.85.87-3.16.87-2.33 0-4.43-1.63-5.18-3.87l-3.2 2.49c1.4 4.46 5.5 7.82 10.38 7.82z" fill="#34A853"/>
                    <path d="M7.3 14.81c-.2-.58-.3-1.2-.3-1.81s.1-1.23.3-1.81l-3.2-2.49C3.12 10.15 2.65 11.51 2.65 13s.47 2.85 1.45 4.3l3.2-2.49z" fill="#FBBC05"/>
                </svg>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Verified Google Reviews</span>
            </div>
            <h2 className="text-center text-white/90 text-[34px] md:text-[52px] font-normal">
                Real-time Feedback
            </h2>
        </div>

        <div
          className="mt-10 md:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* ✅ MOBILE: scroll + snap + arrows work */}
          <div className="md:hidden">
            <div
              ref={mobileTrackRef}
              className="
                flex overflow-x-auto
                snap-x snap-mandatory scroll-smooth
                gap-4 px-4
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
              "
              onScroll={(e) => {
                const el = e.currentTarget;
                const step = mobileStepRef.current || 0;
                if (!step) return;

                const i = Math.round(el.scrollLeft / step);
                setIndex(clamp(i, 0, maxIndex));
              }}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} snap />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="w-[70px]" />
              <ProgressBar value={index} max={maxIndex} />
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={prev} className="transition" aria-label="Previous testimonial">
                  <ArrowLeft />
                </button>
                <button type="button" onClick={next} className="transition" aria-label="Next testimonial">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>

          {/* ✅ TABLET/DESKTOP: dragging and touch enabled */}
          <div className="hidden md:block">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6 md:gap-7 cursor-grab active:cursor-grabbing will-change-transform"
                animate={{ x: `calc(-${index} * (min(440px, 88vw) + 28px))` }}
                transition={{ type: "spring", stiffness: 170, damping: 26 }}
                drag="x"
                dragConstraints={{
                  left: -maxIndex * (Math.min(440, (typeof window !== "undefined" ? window.innerWidth : 1200) * 0.88) + 28),
                  right: 0
                }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) next();
                  else if (info.offset.x > swipeThreshold) prev();
                }}
              >
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </motion.div>
            </div>

            <div className="mt-10 md:mt-12 flex items-center justify-between gap-6">
              <div className="w-[110px]" />
              <ProgressBar value={index} max={maxIndex} />
              <div className="flex items-center gap-3 shrink-0">
                <button type="button" onClick={prev} className="transition" aria-label="Previous testimonial">
                  <ArrowLeft />
                </button>
                <button type="button" onClick={next} className="transition" aria-label="Next testimonial">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, snap = false }) {
  return (
    <div
      data-ts-card="true"
      className={[
        "shrink-0",
        snap ? "snap-center" : "",
        "w-[88vw] max-w-[440px]",
        "md:w-[520px] md:max-w-[520px]",
        "lg:w-[520px]",
        "rounded-[22px] bg-[#2a2a2a]",
        "px-7 md:px-10 py-10 md:py-12",
        "shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        "flex flex-col items-center text-center",
        "hover:bg-[#333] transition-colors duration-500"
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative w-[78px] h-[78px] rounded-full overflow-hidden ring-2 ring-[#c79a3a]/30">
        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
      </div>

      <div className="mt-5 text-[18px] md:text-[20px] tracking-wide text-white/90">
        {t.name}
      </div>

      <p className="mt-6 text-white/70 leading-relaxed text-[16px] md:text-[18px] max-w-[36ch] min-h-[5em]">
        {t.text}
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 text-[#c79a3a]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < (t.stars ?? 5)} />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 opacity-50">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.time || "Recently"}</span>
      </div>
    </div>
  );
}

function ProgressBar({ value, max }) {
  const pct = max === 0 ? 1 : value / max;
  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[520px]">
        <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#c79a3a] transition-all duration-500"
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Star({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={filled ? "" : "opacity-20"}
      aria-hidden="true"
    >
      <path
        d="M12 2.7l2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.9 6.44 20.8l1.06-6.2L3 9.23l6.22-.9L12 2.7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <div className="opacity-60 hover:opacity-100 transition-opacity">
      <Image src={LeftArrow} alt="left-arrow" />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="opacity-60 hover:opacity-100 transition-opacity">
      <Image src={RightArrow} alt="right-arrow" />
    </div>
  );
}
