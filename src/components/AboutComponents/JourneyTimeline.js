"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DEFAULT_ITEMS = [
  {
    year: "2014",
    title: "Production Upgrade",
    bullets: ["Annual capacity increased to 3.6 million sq. ft. with new machinery."],
  },
  {
    year: "2015",
    title: "Showroom in Dallas",
    bullets: [
      "Opened a 60,000 sq. ft showroom in Dallas, Texas, showcasing 250+ containers of stone & ceramic products.",
    ],
  },
  {
    year: "2021",
    title: "COR by Hilltop Group",
    bullets: [
      "Unveiled a 12-acre, 300,000 sq. ft. facility with a warehouse, showroom & production center for luxury surfaces.",
    ],
  },
  {
    year: "2023",
    title: "Export Recognition & Experience Center",
    bullets: [
      "Recognized as 2 Star Export House by the Central Government of India",
      "Launched a 150,000 sq. ft. Experience Center.",
    ],
  },
];

function Row({ item, index }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.21, 0.9, 0.2, 1] }}
      className="group relative"
    >


      <div className="grid grid-cols-12 gap-6 py-4">
        {/* YEAR */}
        <div className="col-span-12 md:col-span-2">
          <div className="text-[32px] md:text-[34px] leading-none tracking-wide text-[#DA9C39] font-[600] font-[Appolo]">
            {item.year}
          </div>
        </div>

        {/* TITLE */}
        <div className="col-span-12 md:col-span-4">
          <div className="relative inline-block">
            <h3
              className={`text-white text-[22px] md:text-[24px] leading-snug font-[600] tracking-wide ${quicksand.className}`}
            >
              {item.title}
            </h3>
            <span className="pointer-events-none absolute -bottom-2 left-0 h-px w-0" />
          </div>
        </div>

        {/* BULLETS */}
        <div className="col-span-12 md:col-span-6">
          <ul className="space-y-2 text-white text-[14px] md:text-[15px] leading-relaxed">
            {item.bullets.map((b, i) => (
              <li key={i} className={`flex gap-3 ${quicksand.className}`}>
                <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-white" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </motion.div>
  );
}

export default function JourneyTimeline({ title = "The Journey", items = DEFAULT_ITEMS }) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_55%_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_20%_55%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_80%_60%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="mx-auto w-full max-w-5xl px-6 py-4">
        {/* STATIC HEADING (won't scroll) */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.9, 0.2, 1] }}
          className="text-center text-white text-[44px] md:text-[54px] leading-tight tracking-wide font-[500] [font-family:var(--journey-serif,ui-serif,Georgia,serif)]"
        >
          {title}
        </motion.h2>




        {/* SCROLL AREA */}
        <div className="relative mt-0">
          {/* top shadow */}


          {/* bottom shadow */}
          <div className="pointer-events-none absolute left-0 bottom-0 z-10 h-28 w-full bg-gradient-to-t from-[#1E1E1E]/95 via-[#1E1E1E]/60 to-transparent" />


          <div className="h-[300px] overflow-y-auto pr-2 scroll-smooth no-scrollbar">
            {items.map((item, idx) => (
              <Row key={`${item.year}-${idx}`} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
