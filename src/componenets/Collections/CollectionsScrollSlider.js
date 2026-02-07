"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import slide1 from "../../assets/slides/slide1.png";
import slide2 from "../../assets/slides/slide2.png";
import slide3 from "../../assets/slides/slide3.png";
import slide4 from "../../assets/slides/slide4.jpg";
import slide5 from "../../assets/slides/slide5.png";
import arrowf from '../../assets/icons/arrow_foreward.svg'
import arrowb from '../../assets/icons/arrowbackward.svg'

function useIsDesktop(breakpointPx = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${breakpointPx}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpointPx]);

  return isDesktop;
}

export default function CollectionsScrollSlider() {
  const slides = useMemo(
    () => [
      { id: 1, src: slide1, alt: "Collection 1" },
      { id: 3, src: slide2, alt: "Collection 2" },
      { id: 4, src: slide3, alt: "Collection 3" },
      { id: 5, src: slide4, alt: "Collection 4" },
      { id: 6, src: slide5, alt: "Collection 5" },
      { id: 7, src: slide1, alt: "Collection 6" },
    ],
    []
  );

  const isDesktop = useIsDesktop(768);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const lockRef = useRef(false);

  // ✅ NEW: wheel burst control (prevents 2 slides per one scroll gesture)
  const wheelAccumRef = useRef(0);
  const wheelEndTimerRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const next = useCallback(() => {
    setActive((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setActive((i) => Math.max(i - 1, 0));
  }, []);

  // Keep track in view (for scroll lock)
  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= 0.90);
      },
      { threshold: [0, 0.30, 0.60, 0.80, 1] }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ✅ FIXED: Desktop wheel-to-slide (ONE slide per wheel burst)
  useEffect(() => {
    if (!isDesktop) return;
    if (!isInView) return;

    const STEP_THRESHOLD = 150; // increase if needed: 100–140 for very sensitive trackpads
    const BURST_END_MS = 60;  // when wheel stops for this long, we consider burst ended
    const LOCK_MS = 20;       // lock duration after a slide

    const onWheel = (e) => {
      if (lightboxOpen) return;

      // Allow normal page scroll at edges
      if (active === 0 && e.deltaY < 0) return;
      if (active === slides.length - 1 && e.deltaY > 0) return;

      // Hijack scroll for slider
      e.preventDefault();

      // Accumulate delta in a burst
      wheelAccumRef.current += e.deltaY;

      // Reset burst end timer
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, BURST_END_MS);

      // If locked, ignore any further events during the same gesture
      if (lockRef.current) return;

      // Trigger only when crossing threshold
      if (wheelAccumRef.current >= STEP_THRESHOLD) {
        lockRef.current = true;
        wheelAccumRef.current = 0;
        next();
        setTimeout(() => {
          lockRef.current = false;
        }, LOCK_MS);
      } else if (wheelAccumRef.current <= -STEP_THRESHOLD) {
        lockRef.current = true;
        wheelAccumRef.current = 0;
        prev();
        setTimeout(() => {
          lockRef.current = false;
        }, LOCK_MS);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = null;
      wheelAccumRef.current = 0;
      lockRef.current = false;
    };
  }, [isDesktop, isInView, active, slides.length, next, prev, lightboxOpen]);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => Math.max(i - 1, 0));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, slides.length]);

  // translateX based on active index (cards are responsive)
  const translateStyle = {
    transform: `translateX(calc(-${active} * (min(560px, 78vw) + 28px)))`,
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1f1f1f] text-white py-16 md:py-20 overflow-hidden"
    >
      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <h2 className="text-center text-white/90 text-[28px] md:text-[40px] font-[400]">
          A Quiet Balance Of Strength &amp; Beauty
        </h2>
      </div>

      {/* Slider */}
      <div className="max-w-[1600px] mx-auto mt-10 md:mt-12">
        <div className="relative">
          {/* Track viewport */}
          <div className="overflow-hidden px-4 md:px-10">
            <div
              ref={trackRef}
              className="flex gap-7 transition-transform duration-500 ease-out will-change-transform"
              style={translateStyle}
            >
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => openLightbox(idx)}
                  className="relative shrink-0 rounded-[18px] overflow-hidden
                             w-[78vw] max-w-[560px] h-[280px] md:h-[360px] lg:h-[420px]
                             outline-none focus:ring-2 focus:ring-white/30"
                  aria-label={`Open ${s.alt}`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 78vw, 560px"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </button>
              ))}
            </div>
          </div>

          {/* Arrows + CTA */}
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-8 flex items-center justify-end">


                <button
              type="button"
              className="rounded-[10px] px-6 py-3 font-[600] text-[#1b1b1b]
                         bg-[#c79a3a] hover:bg-[#d2a241] transition"
            >
              Explore Collections
            </button>


            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={active === 0}
                className="h-10 w-10
                           disabled:opacity-30 disabled:cursor-not-allowed
                            transition"
                aria-label="Previous"
              >
                <ArrowLeft />
              </button>

              <button
                type="button"
                onClick={next}
                disabled={active === slides.length - 1}
                className="h-10 w-10
                           disabled:opacity-30 disabled:cursor-not-allowed
                           transition"
                aria-label="Next"
              >
                <ArrowRight />
              </button>
            </div>

          
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-4 hidden md:block">
            <p className="text-white/40 text-sm">
              Scroll to browse collections (desktop). On mobile, use arrows.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-[1100px] aspect-[16/9] bg-black rounded-[16px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={slides[lightboxIndex].src}
              alt={slides[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="1100px"
              priority
            />

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              onClick={() => setLightboxIndex((i) => Math.max(i - 1, 0))}
              disabled={lightboxIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10
                         disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((i) => Math.min(i + 1, slides.length - 1))
              }
              disabled={lightboxIndex === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10
                         disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ArrowRight />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {slides.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ArrowLeft() {
  return (
   <div>
    <Image src={arrowb} alt="arrow-left" />
   </div>
  );
}

function ArrowRight() {
  return (
       <div>
    <Image src={arrowf} alt="arrow-right" />
   </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
