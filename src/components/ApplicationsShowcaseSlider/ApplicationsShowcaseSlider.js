"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Replace with your real images
import k1 from "../../assets/showcaseslides/showcase1.jpg";
import k2 from "../../assets/showcaseslides/showcase2.png";
import k3 from "../../assets/showcaseslides/showcase1.jpg";

import f1 from "../../assets/showcaseslides/showcase1.jpg";
import f2 from "../../assets/showcaseslides/showcase2.png";
import f3 from "../../assets/showcaseslides/showcase1.jpg";

import o1 from "../../assets/showcaseslides/showcase1.jpg";
import o2 from "../../assets/showcaseslides/showcase2.png";
import o3 from "../../assets/showcaseslides/showcase1.jpg";

import e1 from "../../assets/showcaseslides/showcase1.jpg";
import e2 from "../../assets/showcaseslides/showcase2.png";
import e3 from "../../assets/showcaseslides/showcase1.jpg";






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







export default function ApplicationsTabbedSlider() {
  const tabs = useMemo(
    () => [
      {
        key: "kitchen",
        label: "Kitchen",
        slides: [
          { key: "k1", image: k1, alt: "Kitchen 1" },
          { key: "k2", image: k2, alt: "Kitchen 2" },
          { key: "k3", image: k3, alt: "Kitchen 3" },
        ],
      },
      {
        key: "flooring",
        label: "Flooring",
        slides: [
          { key: "f1", image: f1, alt: "Flooring 1" },
          { key: "f2", image: f2, alt: "Flooring 2" },
          { key: "f3", image: f3, alt: "Flooring 3" },
        ],
      },
      {
        key: "other",
        label: "Other Interiors",
        slides: [
          { key: "o1", image: o1, alt: "Other Interiors 1" },
          { key: "o2", image: o2, alt: "Other Interiors 2" },
          { key: "o3", image: o3, alt: "Other Interiors 3" },
        ],
      },
      {
        key: "exterior",
        label: "Exterior Applications",
        slides: [
          { key: "e1", image: e1, alt: "Exterior 1" },
          { key: "e2", image: e2, alt: "Exterior 2" },
          { key: "e3", image: e3, alt: "Exterior 3" },
        ],
      },
    ],
    []
  );

  const isDesktop = useIsDesktop(768);

  const [tabIndex, setTabIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const isAnimatingRef = useRef(false);
  const tabsScrollRef = useRef(null);

  const activeTab = tabs[tabIndex];
  const slides = activeTab.slides;
  const activeSlide = slides[slideIndex];

  const setTab = (idx) => {
    if (idx === tabIndex) return;
    setDir(idx > tabIndex ? 1 : -1);
    setTabIndex(idx);
    setSlideIndex(0);

    // ✅ on mobile, auto-scroll active tab into view
    requestAnimationFrame(() => {
      const container = tabsScrollRef.current;
      const el = container?.querySelector?.(`[data-tab="${tabs[idx].key}"]`);
      if (!container || !el) return;
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  };

  const goTo = (idx) => {
    if (isAnimatingRef.current) return;
    setDir(idx > slideIndex ? 1 : -1);
    setSlideIndex(idx);
  };

  const next = () => goTo((slideIndex + 1) % slides.length);
  const prev = () => goTo((slideIndex - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, tabIndex]);

  const progress = ((slideIndex + 1) / slides.length) * 100;

  return (
    <section className="w-full bg-[#1f1f1f]">
      {/* TOP TAB BAR */}
      <div className="w-full bg-[#141414]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-10">
          {/* ✅ Desktop: normal row */}
          <div className="hidden md:flex items-center gap-16 h-[86px]">
            {tabs.map((t, idx) => {
              const isActive = idx === tabIndex;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(idx)}
                  className={[
                    "relative text-[28px] font-[400] tracking-wide",
                    "transition-colors duration-300",
                    isActive ? "text-[#b6842c]" : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {t.label}
                  {isActive && (
                    <motion.span
                      layoutId="tabUnderlineDesktop"
                      className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b6842c]"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ✅ Mobile: horizontally scrollable tabs (like screenshot) */}
          <div
            ref={tabsScrollRef}
            className="md:hidden flex items-center gap-10 h-[74px] overflow-x-auto no-scrollbar"
          >
            {tabs.map((t, idx) => {
              const isActive = idx === tabIndex;
              return (
                <button
                  key={t.key}
                  data-tab={t.key}
                  type="button"
                  onClick={() => setTab(idx)}
                  className={[
                    "relative shrink-0",
                    "text-[26px] font-[400] tracking-wide",
                    "transition-colors duration-300",
                    isActive ? "text-[#b6842c]" : "text-white/90",
                  ].join(" ")}
                >
                  {t.label}
                  {isActive && (
                    <motion.span
                      layoutId="tabUnderlineMobile"
                      className="absolute left-0 right-0 -bottom-2 h-[2px] bg-[#b6842c]"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-[1500px] md:px-10">
        {/* ✅ MOBILE: Image full-width, no right preview */}
        {!isDesktop ? (
          <div className="w-full">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-black px-4 pt-4">
              <div className="relative w-full h-full overflow-hidden bg-black">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${activeTab.key}-${activeSlide.key}`}
                    className="absolute inset-0"
                    onAnimationStart={() => (isAnimatingRef.current = true)}
                    onAnimationComplete={() => (isAnimatingRef.current = false)}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ✅ MOBILE arrows below image (centered) */}
            <div className="w-full bg-[#1f1f1f] py-8">
              <div className="flex items-center justify-center gap-10">
                <button
                  type="button"
                  onClick={prev}
                  className="h-12 w-12 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
                  aria-label="Previous"
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="h-12 w-12 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
                  aria-label="Next"
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ✅ DESKTOP: preview strip + bottom bar */
          <div className="w-full">
            <div className="relative w-full aspect-[16/6] overflow-hidden bg-black">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${activeTab.key}-${activeSlide.key}`}
                  className="absolute inset-0"
                  onAnimationStart={() => (isAnimatingRef.current = true)}
                  onAnimationComplete={() => (isAnimatingRef.current = false)}
                >
                  {/* Main */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={activeSlide.image}
                      alt={activeSlide.alt}
                      fill
                      priority
                      className="object-cover"
                      sizes="1500px"
                    />
                  </motion.div>

                  {/* Right preview */}
                  <motion.div
                    className="absolute right-0 top-0 h-full w-[26%] overflow-hidden"
                    initial={{ x: dir > 0 ? 80 : -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: dir > 0 ? -60 : 60, opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={slides[(slideIndex + 1) % slides.length].image}
                        alt="Next preview"
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>
                    <div className="absolute left-0 top-0 h-full w-[12px] bg-gradient-to-r from-black/40 to-transparent" />
                  </motion.div>

                  {/* sweep */}
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-[35%] w-[35%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[2px]"
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: "220%", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ✅ DESKTOP controls below image (spacing like your UI) */}
            <div className="w-full bg-[#1f1f1f] pt-7 pb-10">
              <div className="flex items-center justify-between gap-6 px-4 md:px-0">
                <div className="flex-1 flex justify-center">
                  <div className="w-[55%]">
                    <div className="h-[4px] w-full rounded-full bg-white/20 overflow-hidden">
                      <motion.div
                        className="h-full bg-white/55"
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 260, damping: 34 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="h-10 w-10 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
                    aria-label="Previous"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="h-10 w-10 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
                    aria-label="Next"
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ✅ helper: hide scrollbar on mobile tabs */
const noScrollbarCss = `
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
`;

// You can put this in globals.css instead
if (typeof document !== "undefined") {
  const id = "no-scrollbar-style";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = noScrollbarCss;
    document.head.appendChild(style);
  }
}

function ArrowLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function ArrowRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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