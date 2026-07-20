"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Replace with your real images
// Bathroom Images
import b1 from "../../assets/showcaseslides/bathroom/bathroom_1.jpg";
import b2 from "../../assets/showcaseslides/bathroom/bathroom_2.jpg";
import b3 from "../../assets/showcaseslides/bathroom/bathroom_3.jpg";
import b4 from "../../assets/showcaseslides/bathroom/bathroom_4.jpg";
import b5 from "../../assets/showcaseslides/bathroom/bathroom_5.jpg";

// Bedroom Images
import br1 from "../../assets/showcaseslides/bedroom/bedroom_1.jpg";
import br2 from "../../assets/showcaseslides/bedroom/bedroom_2.jpg";
import br3 from "../../assets/showcaseslides/bedroom/bedroom_3.jpg";
import br4 from "../../assets/showcaseslides/bedroom/bedroom_4.jpg";
import br5 from "../../assets/showcaseslides/bedroom/bedroom_5.jpg";
import br6 from "../../assets/showcaseslides/bedroom/bedroom_6.jpg";

// Kitchen Images
import k1 from "../../assets/showcaseslides/kitchen/kitchen_1.jpg";
import k2 from "../../assets/showcaseslides/kitchen/kitchen_2.jpg";
import k3 from "../../assets/showcaseslides/kitchen/kitchen_3.jpg";
import k4 from "../../assets/showcaseslides/kitchen/kitchen_4.jpg";
import k5 from "../../assets/showcaseslides/kitchen/kitchen_5.jpg";
import k6 from "../../assets/showcaseslides/kitchen/kitchen_6.jpg";
import k7 from "../../assets/showcaseslides/kitchen/kitchen_7.jpg";
import k8 from "../../assets/showcaseslides/kitchen/kitchen_8.jpg";
import k9 from "../../assets/showcaseslides/kitchen/kitchen_9.jpg";
import k10 from "../../assets/showcaseslides/kitchen/kitchen_10.jpg";

// Living Room Images
import l1 from "../../assets/showcaseslides/livingroom/livingroom_1.jpg";
import l2 from "../../assets/showcaseslides/livingroom/livingroom_2.jpg";
import l3 from "../../assets/showcaseslides/livingroom/livingroom_3.jpg";
import l4 from "../../assets/showcaseslides/livingroom/livingroom_4.jpg";
import l5 from "../../assets/showcaseslides/livingroom/livingroom_5.jpg";
import l6 from "../../assets/showcaseslides/livingroom/livingroom_6.jpg";
import l7 from "../../assets/showcaseslides/livingroom/livingroom_7.jpg";

// Others Images
import o1 from "../../assets/showcaseslides/others/others_1.jpg";
import o2 from "../../assets/showcaseslides/others/others_2.jpg";
import o3 from "../../assets/showcaseslides/others/others_3.jpg";
import o4 from "../../assets/showcaseslides/others/others_4.jpg";
import o5 from "../../assets/showcaseslides/others/others_5.jpg";
import o6 from "../../assets/showcaseslides/others/others_6.jpg";
import o7 from "../../assets/showcaseslides/others/others_7.jpg";

import LeftArrow from '../../assets/icons/arrowbackward.svg';
import RightArrow from '../../assets/icons/arrow_foreward.svg';



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
        key: "bedroom",
        label: "Bedroom",
        slides: [
          { key: "br1", image: br1, alt: "Bedroom 1" },
          { key: "br2", image: br2, alt: "Bedroom 2" },
          { key: "br3", image: br3, alt: "Bedroom 3" },
          { key: "br4", image: br4, alt: "Bedroom 4" },
          { key: "br5", image: br5, alt: "Bedroom 5" },
          { key: "br6", image: br6, alt: "Bedroom 6" },
        ],
      },
      {
        key: "living room",
        label: "Living Room",
        slides: [
          { key: "l1", image: l1, alt: "Livingroom 1" },
          { key: "l2", image: l2, alt: "Livingroom 2" },
          { key: "l3", image: l3, alt: "Livingroom 3" },
          { key: "l4", image: l4, alt: "Livingroom 4" },
          { key: "l5", image: l5, alt: "Livingroom 5" },
          { key: "l6", image: l6, alt: "Livingroom 6" },
          { key: "l7", image: l7, alt: "Livingroom 7" },
        ],
      },
      {
        key: "kitchen",
        label: "Kitchen",
        slides: [
          { key: "k1", image: k1, alt: "Kitchen 1" },
          { key: "k2", image: k2, alt: "Kitchen 2" },
          { key: "k3", image: k3, alt: "Kitchen 3" },
          { key: "k4", image: k4, alt: "Kitchen 4" },
          { key: "k5", image: k5, alt: "Kitchen 5" },
          { key: "k6", image: k6, alt: "Kitchen 6" },
          { key: "k7", image: k7, alt: "Kitchen 7" },
          { key: "k8", image: k8, alt: "Kitchen 8" },
          { key: "k9", image: k9, alt: "Kitchen 9" },
          { key: "k10", image: k10, alt: "Kitchen 10" },
        ],
      },
      {
        key: "bathroom",
        label: "Bathroom",
        slides: [
          { key: "b1", image: b1, alt: "Bathroom 1" },
          { key: "b2", image: b2, alt: "Bathroom 2" },
          { key: "b3", image: b3, alt: "Bathroom 3" },
          { key: "b4", image: b4, alt: "Bathroom 4" },
          { key: "b5", image: b5, alt: "Bathroom 5" },
        ],
      },
      {
        key: "others",
        label: "Other Interiors",
        slides: [
          { key: "o1", image: o1, alt: "Others 1" },
          { key: "o2", image: o2, alt: "Others 2" },
          { key: "o3", image: o3, alt: "Others 3" },
          { key: "o4", image: o4, alt: "Others 4" },
          { key: "o5", image: o5, alt: "Others 5" },
          { key: "o6", image: o6, alt: "Others 6" },
          { key: "o7", image: o7, alt: "Others 7" },
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

  // Handle scrollbar style injection
  useEffect(() => {
    const id = "no-scrollbar-style";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.innerHTML = noScrollbarCss;
      document.head.appendChild(style);
    }
  }, []);

  const progress = ((slideIndex + 1) / slides.length) * 100;

  return (
    <div className="w-full bg-[#1f1f1f] py-4">
      {/* TOP TAB BAR */}
      <div className="w-full bg-[#1f1f1f]">
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
                    "relative text-[28px] font-normal tracking-wide",
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
                    "text-[26px] font-normal tracking-wide",
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
            <div className="relative w-full aspect-4/3 overflow-hidden bg-black px-1 md:px-4 pt-1 md:pt-4">
              <div className="relative w-full h-full overflow-hidden bg-black">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${activeTab.key}-${activeSlide.key}`}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    onAnimationStart={() => (isAnimatingRef.current = true)}
                    onAnimationComplete={() => (isAnimatingRef.current = false)}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) next();
                      else if (info.offset.x > 50) prev();
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none select-none"
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
                        draggable={false}
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
                  className="transition"
                  aria-label="Previous"
                >
                  <ArrowLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="transition"
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
            <div className="relative w-full aspect-16/6 overflow-hidden bg-black">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`${activeTab.key}-${activeSlide.key}`}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  onAnimationStart={() => (isAnimatingRef.current = true)}
                  onAnimationComplete={() => (isAnimatingRef.current = false)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) next();
                    else if (info.offset.x > 50) prev();
                  }}
                >
                  {/* Main */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none select-none"
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
                      draggable={false}
                    />
                  </motion.div>

                  {/* Right preview */}
                  <motion.div
                    className="absolute right-0 top-0 h-full w-[26%] overflow-hidden pointer-events-none select-none"
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
                        draggable={false}
                      />
                    </div>
                    <div className="absolute left-0 top-0 h-full w-[12px] bg-linear-to-r from-black/40 to-transparent" />
                  </motion.div>

                  {/* sweep */}
                  <motion.div
                    className="pointer-events-none absolute inset-y-0 -left-[35%] w-[35%] bg-linear-to-r from-transparent via-white/10 to-transparent blur-[2px]"
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
                    className="transition"
                    aria-label="Previous"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="transition"
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
    </div>
  );
}

/* ✅ helper: hide scrollbar on mobile tabs */
const noScrollbarCss = `
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
`;


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