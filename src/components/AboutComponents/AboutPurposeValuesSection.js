// src/components/About/AboutPurposeValuesSection.jsx
"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Lightbulb, Sparkles, Users, BadgeCheck, RefreshCw, Crown } from "lucide-react";

export default function AboutPurposeValuesSection() {
  const reduceMotion = useReducedMotion();

  const values = useMemo(
    () => [
      { label: "Ingenuity", Icon: Lightbulb },
      { label: "Distinction", Icon: Sparkles },
      { label: "Client-Centric", Icon: Users },
      { label: "Authenticity", Icon: BadgeCheck },
      { label: "Consistency", Icon: RefreshCw },
      { label: "Superiority", Icon: Crown },
    ],
    []
  );

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
  };

  return (
    <section className="w-full bg-[#1f1f1f] text-white">
      <div className="mx-auto w-[min(1320px,calc(100%-64px))] py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 items-start">
          {/* Left: Our Purpose */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-[34px] md:text-[44px] leading-[1.1] font-light"
            >
              Our Purpose
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-white/80 text-[15px] md:text-[16px] leading-relaxed max-w-[640px]"
            >
              To redefine the standards of stone craftsmanship worldwide through innovative solutions,
              an expert team with a proven track record, and a passion for quality.
              <br />
              <br />
              <span className="text-white/90">Our Vision for Tomorrow</span>
              <br />
              We are committed to contributing to society with trust and excellence. Our service is the
              foundation, technology is the tool, and teamwork is the driving force.
            </motion.p>
          </motion.div>

          {/* Right: Values Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="md:pt-8"
          >
            <div className="rounded-[18px] md:rounded-[22px] bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-6 py-8 md:px-10 md:py-10">
              <h4 className="text-center text-[18px] md:text-[20px] font-light text-white/90">
                Values That Guide Us
              </h4>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10"
              >
                {values.map(({ label, Icon }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="grid place-items-center h-12 w-12 rounded-full bg-white/5 border border-white/10">
                      <Icon className="h-6 w-6 text-[#C89A3A]" strokeWidth={1.6} />
                    </div>

                    <div className="mt-3 text-white/85 text-[14px] md:text-[15px] font-light">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
