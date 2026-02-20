"use client";

import React from "react";
import "keen-slider/keen-slider.min.css";
// import { useKeenSlider } from "keen-slider/react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import aw from '../../assets/about/aw.png';
import aw1 from '../../assets/about/aw1.jpg';
import aw2 from '../../assets/about/aw2.jpg';
import aw3 from '../../assets/about/aw3.jpg';
const awards = [
  // Replace these with your own images inside /public/awards/
  { src: aw, alt: "Award 1" },
  { src: aw2, alt: "Award 2" },
  { src: aw3, alt: "Award 3" },
  { src: aw1, alt: "Award 4" },
];

export default function AwardsAutoSlider() {
  const [paused, setPaused] = React.useState(false);

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
          if (mouseOver || paused) return;

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
                <div className="relative w-full h-[150px] md:h-[170px] lg:h-[190px]">
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    className="object-contain"
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
    </section>
  );
}
