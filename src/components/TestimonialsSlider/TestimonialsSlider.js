"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import a1 from "../../assets/testimonials/ts1.png";
import a2 from "../../assets/testimonials/ts2.png";
import a3 from "../../assets/testimonials/ts1.png";
import a4 from "../../assets/testimonials/ts2.png";
import a5 from "../../assets/testimonials/ts1.png";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

import LeftArrow from "../../assets/icons/arrowbackward.svg";
import RightArrow from "../../assets/icons/arrow_foreward.svg";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.testimonials) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(err => console.error("Failed to fetch testimonials", err));
  }, []);

  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // ✅ MOBILE track control
  const mobileTrackRef = useRef(null);
  const mobileStepRef = useRef(0);

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

  // useEffect(() => {
  //   setIndex((i) => clamp(i, 0, maxIndex));
  // }, [perView, testimonials.length, maxIndex]);

  // ✅ Measure mobile "step" = card width + gap, for arrow scrolling
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

    // Use a small timeout to ensure cards have been rendered
    const timeout = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    }
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
      let ni = i + perView;
      if (i >= maxIndex || maxIndex === 0) {
        ni = 0;
      } else if (ni > maxIndex) {
        ni = maxIndex;
      }
      if (perView === 1) scrollToMobileIndex(ni);
      return ni;
    });
  }, [maxIndex, perView, scrollToMobileIndex]);

  const prev = useCallback(() => {
    setIndex((i) => {
      let ni = i - perView;
      if (i <= 0) {
        ni = maxIndex;
      } else if (ni < 0) {
        ni = 0;
      }
      if (perView === 1) scrollToMobileIndex(ni);
      return ni;
    });
  }, [maxIndex, perView, scrollToMobileIndex]);

  // ✅ autoplay (pause on hover/focus)
  useEffect(() => {
    if (paused) return;
    if (testimonials.length <= perView) return;

    intervalRef.current = window.setInterval(() => {
      next();
    }, 3800);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [paused, perView, testimonials.length, next]);









  return (
    <section className="w-full bg-[#1f1f1f] text-white py-4 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">


        <div className="w-fit mx-auto mb-6">
          <div className="flex items-center justify-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-sm">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h4.74c-.2 1.06-.9 1.95-2.02 2.71l2.72 2.13c1.58-1.47 2.49-3.62 2.49-6.12 0-.33-.03-.66-.08-1h-7.85z" fill="#4285F4" />
              <path d="M12.48 5.68c1.69 0 3.21.58 4.41 1.72l3.29-3.29C18.17 2.14 15.54 1 12.48 1 7.6 1 3.5 4.3 2.1 8.76l3.2 2.49c.75-2.24 2.85-3.87 5.18-3.87z" fill="#EA4335" />
              <path d="M12.48 22.12c2.4 0 4.41-.8 5.88-2.18l-2.72-2.13c-.81.55-1.85.87-3.16.87-2.33 0-4.43-1.63-5.18-3.87l-3.2 2.49c1.4 4.46 5.5 7.82 10.38 7.82z" fill="#34A853" />
              <path d="M7.3 14.81c-.2-.58-.3-1.2-.3-1.81s.1-1.23.3-1.81l-3.2-2.49C3.12 10.15 2.65 11.51 2.65 13s.47 2.85 1.45 4.3l3.2-2.49z" fill="#FBBC05" />
            </svg>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-white/50 leading-none">Verified Google Reviews</span>
          </div>
        </div>

        <h2 className="text-center text-white/90 text-[34px] md:text-[52px] font-normal">
          Testimonials
        </h2>

        <div
          className="mt-10 md:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {testimonials.length === 0 ? (
            <div className="text-center text-white/50 py-10">No testimonials available.</div>
          ) : (
            <>
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
                    animate={{ x: `calc(-${index} * (520px + 28px))` }}
                    transition={{ type: "spring", stiffness: 100, damping: 22 }}
                    drag="x"
                    dragConstraints={{
                      left: -maxIndex * (520 + 28),
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
            </>
          )}

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
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {t.avatar ? (
        <div className="relative w-[78px] h-[78px] rounded-full overflow-hidden ring-2 ring-white/10 shrink-0">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-[78px] h-[78px] rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center text-white/20 text-xl font-bold uppercase overflow-hidden ring-2 ring-white/10 shrink-0">
          {t.name?.charAt(0) || "?"}
        </div>
      )}

      <div className="mt-5 text-[18px] md:text-[20px] tracking-wide text-white/90">
        {t.name}
      </div>

      <p className={`mt-6 text-white/70 leading-relaxed text-[16px] md:text-[18px] max-w-[36ch] ${quicksand.className}`}>
        {t.content}
      </p>

      <div className="mt-8 flex items-center justify-center gap-2 text-[#c79a3a]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < (t.stars ?? 5)} />
        ))}
      </div>
    </div>
  );

}

function ProgressBar({ value, max }) {
  // If we have 5 items, max is 4. Index is 0 to 4.
  // We want to show progress across all of them.
  const total = max + 1;
  const pct = total <= 1 ? 1 : (value + 1) / total;
  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[520px]">
        <div className="h-[6px] rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/70 transition-all duration-500"
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
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={filled ? "" : "opacity-40"}
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
    <div>
      <Image src={LeftArrow} alt="left-arrow" />
    </div>
  );
}

function ArrowRight() {
  return (
    <div>
      <Image src={RightArrow} alt="right-arrow" />
    </div>
  );
}
