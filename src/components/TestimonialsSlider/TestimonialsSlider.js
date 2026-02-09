"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * ✅ TestimonialSlider (matches your UI)
 * - Desktop: 3 cards visible (responsive), arrows bottom-right
 * - Mobile: 1 big card visible
 * - Bottom progress bar (like screenshot)
 * - Auto slide ON (pause on hover / focus)
 * - Smooth slide (translateX)
 *
 * Replace avatar imports with your real images.
 */

// demo avatars (replace)
import a1 from "../../assets/testimonials/ts1.png";
import a2 from "../../assets/testimonials/ts2.png";
import a3 from "../../assets/testimonials/ts1.png";
import a4 from "../../assets/testimonials/ts2.png";
import a5 from "../../assets/testimonials/ts1.png";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function TestimonialsSlider() {
  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: "KIM BOLD",
        text:
          "Very nice selections and having the slabs organized by type and even by color really helps! We purchased some beautiful granite here!",
        stars: 5,
        avatar: a1,
      },
      {
        id: 2,
        name: "CHADD KAWATA",
        text:
          "Great selection, staff worked seamlessly with our GC and fabricators to install on time and with quality. I am back for my second counter top for our new home.",
        stars: 5,
        avatar: a2,
      },
      {
        id: 3,
        name: "JASON E",
        text:
          "Awesome showroom, great selection of stone and the staff is very friendly and helpful!",
        stars: 5,
        avatar: a3,
      },
      {
        id: 4,
        name: "SARAH L",
        text:
          "Professional team and premium materials. The entire process was smooth—from selection to delivery.",
        stars: 5,
        avatar: a4,
      },
      {
        id: 5,
        name: "MICHAEL R",
        text:
          "Stunning slabs and an amazing experience. The showroom organization makes it easy to decide quickly.",
        stars: 5,
        avatar: a5,
      },
    ],
    []
  );

  // how many cards visible (responsive)
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  // autoplay
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  // track width math
  const wrapRef = useRef(null);

  // ✅ update perView by breakpoint (mobile = 1, tablet=2, desktop=3)
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

  // keep index in bounds when perView changes
  useEffect(() => {
    const maxIndex = Math.max(0, testimonials.length - perView);
    setIndex((i) => clamp(i, 0, maxIndex));
  }, [perView, testimonials.length]);

  const maxIndex = Math.max(0, testimonials.length - perView);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, perView, testimonials.length, maxIndex]);

  /**
   * Layout:
   * - Title centered
   * - Slider cards row
   * - Bottom row: progress bar centered + arrows right (with gap BELOW slider)
   */
  return (
    <section className="w-full bg-[#1f1f1f] text-white py-14 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 md:px-10">
        {/* Title */}
        <h2 className="text-center text-white/90 text-[34px] md:text-[52px] font-[400]">
          Testimonials
        </h2>

        {/* Slider area */}
        <div
          ref={wrapRef}
          className="mt-10 md:mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Cards viewport */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 md:gap-7 transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `translateX(calc(-${index} * (min(440px, 88vw) + ${perView === 1 ? "0px" : "28px"})))`,
              }}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>

          {/* ✅ bottom controls (separated from slider with spacing) */}
          <div className="mt-10 md:mt-12 flex items-center justify-between gap-6">
            {/* spacer left */}
            <div className="w-[110px] hidden md:block" />

            {/* progress bar centered */}
            <ProgressBar value={index} max={maxIndex} />

            {/* arrows right */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={prev}
                className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
                aria-label="Previous testimonial"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={next}
                className="h-10 w-10 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
                aria-label="Next testimonial"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* Mobile: keep progress bar visible with good spacing */}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div
      className={[
        "shrink-0",
        "w-[88vw] max-w-[440px]",
        "md:w-[520px] md:max-w-[520px]",
        "lg:w-[520px]",
        "rounded-[22px] bg-[#2a2a2a]",
        "px-7 md:px-10 py-10 md:py-12",
        "shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        "flex flex-col items-center text-center",
      ].join(" ")}
    >
      {/* avatar */}
      <div className="relative w-[78px] h-[78px] rounded-full overflow-hidden ring-2 ring-white/10">
        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
      </div>

      {/* name */}
      <div className="mt-5 text-[18px] md:text-[20px] tracking-wide text-white/90">
        {t.name}
      </div>

      {/* text */}
      <p className="mt-6 text-white/70 leading-relaxed text-[16px] md:text-[18px] max-w-[36ch]">
        {t.text}
      </p>

      {/* stars */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[#c79a3a]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < (t.stars ?? 5)} />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ value, max }) {
  // max is number of steps, value 0..max
  const pct = max === 0 ? 1 : value / max;
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
