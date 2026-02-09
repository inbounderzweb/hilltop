"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// ✅ Replace with your background image
import globeBg from "../../assets/banners/globe.png";

function useInViewRepeat(threshold = 0.45) {
  const ref = useRef(null);
  const [inViewTick, setInViewTick] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Trigger whenever it becomes visible enough
        if (entry.isIntersecting) {
          setInViewTick((t) => t + 1);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inViewTick };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}


function useCountUp({ to, duration = 1200, tick }) {
  const [val, setVal] = useState(0);


function useCountUp({ to, duration = 1200, tick }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    // restart from 0 every time "tick" changes
    setVal(0);

    const loop = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, tick]);

  return val;
}





  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    // restart from 0 every time "tick" changes
    setVal(0);

    const loop = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, tick]);

  return val;
}

export default function TrustCountersSection() {
  const { ref, inViewTick } = useInViewRepeat(0.5);

  const stats = useMemo(
    () => [
      { to: 40, suffix: "+", label: "Years Expertise" },
      { to: 500, suffix: "+", label: "Stone Variants" },
      { to: 65, suffix: "+", label: "Countries Served" },
      { to: 8000, suffix: "+", label: "Satisfied Customers" },
    ],
    []
  );

  // Animated values (re-run whenever user reaches section)
  const v0 = useCountUp({ to: stats[0].to, duration: 1100, tick: inViewTick });
  const v1 = useCountUp({ to: stats[1].to, duration: 1200, tick: inViewTick });
  const v2 = useCountUp({ to: stats[2].to, duration: 1150, tick: inViewTick });
  const v3 = useCountUp({ to: stats[3].to, duration: 1400, tick: inViewTick });

  const values = [v0, v1, v2, v3];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={globeBg}
          alt="Global network background"
          fill
          className="object-cover"
          priority={false}
          sizes="100vw"
        />
        {/* dark overlay to match screenshot */}
        <div className="absolute inset-0 bg-black/10" />
        {/* top fade for premium look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/55" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 py-16 md:py-24">
        {/* Headline */}
        <div className="text-center">
          <h2 className="text-white/95 font-[500] leading-[1.08] tracking-wide text-[30px] md:text-[52px]">
            A Legacy of Trust
            <br />
            Revered Across the World
          </h2>
        </div>

        {/* Counters */}
        <div className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center">
              <div className="font-[500] text-white leading-none text-[54px] md:text-[84px]">
                {formatWithCommas(values[idx])}
                {s.suffix}
              </div>
              <div className="mt-2 text-white/70 text-[13px] md:text-[16px] tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatWithCommas(n) {
  // 8000 -> 8,000
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
