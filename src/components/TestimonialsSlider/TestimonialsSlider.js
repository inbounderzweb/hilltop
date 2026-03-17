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
      {
        id: 6,
        name: "ANA & HILLTOP TEAM",
        text:
          "Overall, I highly recommend Hilltop to anyone looking for high-quality countertop slabs and excellent customer service. Thank you, Hilltop and Ana, for your dedication to providing exceptional products and service!",
        stars: 5,
        avatar: a1,
      },
      {
        id: 7,
        name: "RAY & RYAN",
        text:
          "Hilltop has great selection of Natural stones, Quartz and Porcelain Slabs. Ray & Ryan are always helpful. Their customer service is far better than other wholesaler. They also have very nice showroom.",
        stars: 5,
        avatar: a2,
      },
      {
        id: 8,
        name: "DEREK",
        text:
          "Wow just WOW!! The selection here is incredible…you could spend a whole day looking and not see it all. BUT their selection is NOTHING compared to the customer service. Derek listened to what we were looking for and within 15 minutes, we’d found the perfect slab. He knows the inventory and knows design. Highly recommend!",
        stars: 5,
        avatar: a3,
      },
      {
        id: 9,
        name: "KAMAL GIRIA",
        text:
          "It was a great experience visiting Hilltop Factory,The team gave me full knowledge about natural stones and their process of manufacturing. Thank you so much Mr.Kamal Giria for giving me this opportunity to visit your factory.",
        stars: 5,
        avatar: a4,
      },
    ],
    []
  );

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

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView]);

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
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative w-[78px] h-[78px] rounded-full overflow-hidden ring-2 ring-white/10">
        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
      </div>

      <div className="mt-5 text-[18px] md:text-[20px] tracking-wide text-white/90">
        {t.name}
      </div>

      <p className={`mt-6 text-white/70 leading-relaxed text-[16px] md:text-[18px] max-w-[36ch] ${quicksand.className}`}>
        {t.text}
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
