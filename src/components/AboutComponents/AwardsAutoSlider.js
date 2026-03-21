"use client";

import React from "react";
import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import aw from '../../assets/about/aw.png';
import aw1 from '../../assets/about/aw1.jpg';
import aw2 from '../../assets/about/aw2.jpg';
import aw3 from '../../assets/about/aw3.jpg';
import arrowf from "../../assets/icons/arrow_foreward.svg";
import arrowb from "../../assets/icons/arrowbackward.svg";
const awards = [
  // Replace these with your own images inside /public/awards/
  { src: aw, alt: "Award 1" },
  { src: aw2, alt: "Award 2" },
  { src: aw3, alt: "Award 3" },
  { src: aw1, alt: "Award 4" },
];
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

export default function AwardsAutoSlider() {
  const [paused, setPaused] = React.useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const lightboxOpenRef = React.useRef(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  React.useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // Lightbox keyboard
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(i + 1, awards.length - 1));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(i - 1, 0));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
      drag: false, // no manual dragging (auto only)
      slides: {
        perView: 4,
        spacing: 28,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: { perView: 2.5, spacing: 18 },
        },
        "(max-width: 640px)": {
          slides: { perView: 1.2, spacing: 14 },
        },
      },
    },
    [
      // autoplay (no controls)
      (slider) => {
        let timeout;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);
        const nextTimeout = () => {
          clearTimeout(timeout);
          if (mouseOver || paused || lightboxOpenRef.current) return;

          timeout = setTimeout(() => {
            slider.next();
          }, 1800);
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseenter", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseleave", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <section className="relative w-full md:w-[80%] mx-auto overflow-hidden py-4">
      {/* background like your reference */}
      <div className="absolute inset-0 -z-10 bg-[#0b0b0b]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_60%_at_50%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_20%_55%,rgba(255,255,255,0.06),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_72%)]" />

      <div className="mx-auto w-full px-6">
        <h2 className="text-center text-white text-[42px] md:text-[56px] leading-tight tracking-wide font-[500] [font-family:var(--journey-serif,ui-serif,Georgia,serif)]">
          Awards
        </h2>

        <div className="mt-10 md:mt-14">
          <div
            ref={sliderRef}
            className="keen-slider"
            aria-label="Awards slider"
          >
            {awards.map((a, idx) => (
              <div key={idx} className="keen-slider__slide">
                <div
                  className="relative w-full h-[150px] md:h-[170px] lg:h-[190px] border-amber-500 border-[1px] rounded-lg cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    className="object-contain py-4"
                    sizes=""
                    priority={idx < 2}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* optional: if you want autoplay pause/resume from code only (still no UI controls) */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="sr-only"
          >
            Toggle autoplay
          </button>
        </div>
      </div>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-2000 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4"
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
              <Image src={awards[lightboxIndex].src} alt={awards[lightboxIndex].alt} fill className="object-contain" sizes="1100px" priority />

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="Close"
              >
                <CloseIcon />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex((i) => Math.max(i - 1, 0))}
                disabled={lightboxIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous image"
              >
                <ArrowLeft />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex((i) => Math.min(i + 1, awards.length - 1))}
                disabled={lightboxIndex === awards.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next image"
              >
                <ArrowRight />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {awards.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
