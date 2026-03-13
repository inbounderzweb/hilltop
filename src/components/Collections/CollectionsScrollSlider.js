"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

import slide1 from "../../assets/slides/slide1.png";
import slide2 from "../../assets/slides/slide2.png";
import slide3 from "../../assets/slides/slide3.png";
import slide4 from "../../assets/slides/slide4.jpg";
import slide5 from "../../assets/slides/slide5.png";

import arrowf from "../../assets/icons/arrow_foreward.svg";
import arrowb from "../../assets/icons/arrowbackward.svg";

/**
 * visibleCount:
 * mobile (<768) => 1
 * tablet (>=768) => 2
 * desktop (>=1024) => 3
 */
function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width:1024px)");
    const mqMd = window.matchMedia("(min-width:768px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqMd.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqLg.addEventListener?.("change", update);
    mqMd.addEventListener?.("change", update);

    return () => {
      mqLg.removeEventListener?.("change", update);
      mqMd.removeEventListener?.("change", update);
    };
  }, []);

  return count;
}

/** ✅ MOBILE SLIDES (shadow top/bottom + no scrollbar + smooth transitions + no trapping) */
function MobileSlides({ slides, active, setActive, openLightbox }) {
  const scrollerRef = useRef(null);

  // Update active while scrolling (optional, keeps the nice transitions)
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll("[data-mobile-card='true']"));
    if (!cards.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (!best) return;
        const idx = Number(best.target.getAttribute("data-idx"));
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [setActive]);

  // ✅ GUARANTEED: forward scroll to page at edges
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // scrolling up while already at top -> scroll the page
      if (atTop && e.deltaY < 0) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
        return;
      }

      // scrolling down while already at bottom -> scroll the page
      if (atBottom && e.deltaY > 0) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
        return;
      }

      // otherwise allow normal inner scroll
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="md:hidden mt-10">
      <div
        ref={scrollerRef}
        className="
          relative px-4 h-[465px] overflow-y-auto
          snap-y snap-proximity scroll-smooth
          touch-pan-y
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {/* Top shadow */}
        <div className="pointer-events-none sticky top-0 z-10 h-12 bg-linear-to-b from-black/50 to-transparent" />

        <div className="grid grid-cols-1 gap-4">
          {slides.map((s, idx) => {
            const isActiveCard = idx === active;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => openLightbox(idx)}
                data-mobile-card="true"
                data-idx={idx}
                className={`
                  snap-start w-full text-left
                  transition-all duration-300 ease-out
                  ${isActiveCard ? "opacity-100 scale-[1]" : "opacity-75 scale-[0.985]"}
                `}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  className="w-full h-auto rounded-2xl"
                  priority={idx < 2}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom shadow */}
        <div className="pointer-events-none sticky bottom-0 -mt-18 rounded-[5px] z-10 h-12 bg-linear-to-t from-black to-transparent via-10%" />
      </div>
    </div>
  );
}


export default function CollectionsScrollSlider() {
  const slides = useMemo(
    () => [
      { id: 1, src: slide1, alt: "Collection 1" },
      { id: 2, src: slide2, alt: "Collection 2" },
      { id: 3, src: slide3, alt: "Collection 3" },
      { id: 4, src: slide4, alt: "Collection 4" },
      { id: 5, src: slide5, alt: "Collection 5" },
      { id: 6, src: slide1, alt: "Collection 6" },
    ],
    []
  );

  const visibleCount = useVisibleCount();
  const isMobile = visibleCount === 1;

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);

  // Wheel burst control
  const lockRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const wheelEndTimerRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // ✅ Stop sliding when last visibleCount slides are already visible
  const maxActive = useMemo(() => Math.max(0, slides.length - visibleCount), [slides.length, visibleCount]);

  const next = useCallback(() => {
    setActive((i) => Math.min(i + 1, maxActive));
  }, [maxActive]);

  const prev = useCallback(() => {
    setActive((i) => Math.max(i - 1, 0));
  }, []);

  // Track section in view
  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.intersectionRatio >= 0.7),
      { threshold: [0, 0.3, 0.6, 0.8, 1] }
    );

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /**
   * ✅ Wheel-to-slide only on tablet/desktop
   * ✅ IMPORTANT FIX: attach wheel handler to SECTION not WINDOW
   * so it doesn't trap scrolling across the entire page.
   */
  useEffect(() => {
    const enableWheelSlider = visibleCount >= 2;
    if (!enableWheelSlider) return;
    if (!isInView) return;

    const el = sectionRef.current;
    if (!el) return;

    const STEP_THRESHOLD = 140;
    const BURST_END_MS = 80;
    const LOCK_MS = 160;

    const onWheel = (e) => {
      if (lightboxOpen) return;

      // Let normal scroll happen at boundaries
      if (active === 0 && e.deltaY < 0) return;
      if (active === maxActive && e.deltaY > 0) return;

      // Prevent page scroll only when we're actually sliding
      e.preventDefault();

      wheelAccumRef.current += e.deltaY;

      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, BURST_END_MS);

      if (lockRef.current) return;

      if (wheelAccumRef.current >= STEP_THRESHOLD) {
        lockRef.current = true;
        wheelAccumRef.current = 0;
        next();
        setTimeout(() => (lockRef.current = false), LOCK_MS);
      } else if (wheelAccumRef.current <= -STEP_THRESHOLD) {
        lockRef.current = true;
        wheelAccumRef.current = 0;
        prev();
        setTimeout(() => (lockRef.current = false), LOCK_MS);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelEndTimerRef.current) clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = null;
      wheelAccumRef.current = 0;
      lockRef.current = false;
    };
  }, [visibleCount, isInView, active, maxActive, next, prev, lightboxOpen]);

  // Lightbox keyboard
  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, slides.length, closeLightbox]);

  /**
   * ✅ MOBILE swipe/seek (Framer Motion)
   */
  const x = useMotionValue(0);
  const stepPxRef = useRef(0);

  useEffect(() => {
    if (!viewportRef.current) return;

    const computeStep = () => {
      const firstCard = viewportRef.current.querySelector("[data-slide-card='true']");
      if (!firstCard) return;

      const cardRect = firstCard.getBoundingClientRect();
      const styles = window.getComputedStyle(viewportRef.current.querySelector("[data-track='true']"));
      const gap = parseFloat(styles.columnGap || styles.gap || "28") || 28;

      stepPxRef.current = cardRect.width + gap;
    };

    computeStep();
    window.addEventListener("resize", computeStep);
    return () => window.removeEventListener("resize", computeStep);
  }, [slides.length]);

  useEffect(() => {
    if (!isMobile) return;
    const step = stepPxRef.current || 0;
    x.set(-active * step);
  }, [active, isMobile, x]);

  const onDragEndMobile = useCallback(
    (_e, info) => {
      const step = stepPxRef.current || 0;
      if (!step) return;

      const dragged = info.offset.x;
      const velocity = info.velocity.x;

      let nextIndex = active;

      if (velocity < -650) nextIndex = active + 1;
      else if (velocity > 650) nextIndex = active - 1;
      else {
        const deltaSlides = Math.round(-dragged / step);
        nextIndex = active + deltaSlides;
      }

      nextIndex = Math.max(0, Math.min(nextIndex, maxActive));
      setActive(nextIndex);
    },
    [active, maxActive]
  );

  const smoothSpring = {
    type: "spring",
    stiffness: 170,
    damping: 28,
    mass: 1.05,
  };

  const translateXStyle = `calc(-${active} * (min(560px, 78vw) + 28px))`;

  return (
    <section ref={sectionRef} className="w-full bg-[#1f1f1f] text-white pt-4  overflow-hidden">
      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-white/90 text-[28px] md:text-[40px] font-normal"
        >
          A Quiet Balance Of Strength &amp; Beauty
        </motion.h2>
      </div>

      {/* ✅ MOBILE VERSION */}
      <MobileSlides slides={slides} active={active} setActive={setActive} openLightbox={openLightbox} />

      {/* ✅ TABLET/DESKTOP VERSION */}
      <div className="max-w-[1600px] mx-auto mt-10 md:mt-12 hidden md:block">
        <div className="relative">
          <div ref={viewportRef} className="overflow-hidden px-4 md:px-10">
            <motion.div
              data-track="true"
              className="flex gap-7 will-change-transform"
              animate={!isMobile ? { x: translateXStyle } : { x: -active * stepPxRef.current }}
              transition={smoothSpring}
              drag="x"
              dragConstraints={{ left: -maxActive * stepPxRef.current, right: 0 }}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={onDragEndMobile}
            >
              {slides.map((s, idx) => {
                const isActiveCard = idx === active;

                return (
                  <motion.button
                    key={s.id}
                    data-slide-card="true"
                    type="button"
                    onClick={() => openLightbox(idx)}
                    className="relative shrink-0 rounded-[18px] overflow-hidden
                               w-[78vw] max-w-[560px] h-[280px] md:h-[360px] lg:h-[420px]
                               outline-none focus:ring-2 focus:ring-white/30"
                    aria-label={`Open ${s.alt}`}
                    whileHover={!isMobile ? { scale: 1.02 } : undefined}
                    whileTap={{ scale: 0.985 }}
                    initial={false}
                    animate={{
                      filter: isActiveCard ? "saturate(1.05)" : "saturate(0.96)",
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="(max-width: 768px) 78vw, 560px" />

                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        background: isActiveCard ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.16)",
                      }}
                      transition={{ duration: 0.35 }}
                    />

                    <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />

                    <motion.div
                      className="absolute -inset-y-10 -left-1/2 w-1/2 rotate-12 opacity-0 pointer-events-none"
                      whileHover={!isMobile ? { x: "230%", opacity: 0.18 } : undefined}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                      }}
                    />

                    <motion.div
                      className="absolute left-4 bottom-4 h-[10px] rounded-full bg-white/70"
                      initial={false}
                      animate={{ width: isActiveCard ? 54 : 18, opacity: isActiveCard ? 0.9 : 0.4 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-8 relative flex items-center">
            {/* Center CTA */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
      absolute left-1/2 -translate-x-1/2
      rounded-[10px] px-6 py-3 font-semibold text-[#1b1b1b]
      bg-[#c79a3a] hover:bg-[#d2a241] transition
    "
            >
              Explore Collections
            </motion.button>

            {/* Right arrows */}
            <div className="ml-auto hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={active === 0}
                className="h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Previous"
              >
                <ArrowLeft />
              </button>

              <button
                type="button"
                onClick={next}
                disabled={active === maxActive}
                className="h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Next"
              >
                <ArrowRight />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-2000 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[1100px] aspect-video bg-black rounded-[16px] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
            >
              <Image src={slides[lightboxIndex].src} alt={slides[lightboxIndex].alt} fill className="object-contain" sizes="1100px" priority />

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
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex((i) => Math.min(i + 1, slides.length - 1))}
                disabled={lightboxIndex === slides.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next image"
              >
                <ArrowRight />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {slides.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
