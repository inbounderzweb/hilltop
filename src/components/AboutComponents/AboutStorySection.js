// src/components/About/AboutStorySection.jsx
"use client";

import React from "react";
import Image from "next/image";

// 🔁 Replace these with your actual assets
import handshakeImg from "../../assets/about/handshake.png"; // main left image
import foundersImg from "../../assets/about/founders.png";   // small photo overlay (top-left)
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export default function AboutStorySection() {
  return (
    <section className="w-full text-white">
      <div className="mx-auto">
        {/* ===== Top: Image + Story ===== */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 items-center">
          {/* Left image block */}
          <div className="relative overflow-hidden w-full h-[411px]">
            <Image
              src={handshakeImg}
              alt="Handshake"
              fill
              priority
              className="object-cover object-center"
            />


          </div>

          {/* Right story text */}
          <div className="pt-2 md:pt-4">
            <h2 className="text-[34px] md:text-[44px] leading-[1.1] font-light">
              The Birth of a Legacy
            </h2>

            <div className={`mt-5 space-y-4 text-white/80 text-[15px] md:text-[16px] leading-relaxed max-w-[620px] ${quicksand.className}`}>
              <p>
                In 1989, Kamal Giria and Nilesh Giria set out with a vision to
                create a trusted brand in the stone industry. Their pursuit of
                excellence led to the establishment of Hill Top, which today
                stands as one of India’s largest manufacturers of granite,
                marble, and quartz.
              </p>
              <p>
                Now flaunting over three decades of expertise, Hill Top has
                earned loyalty and recognition from a growing customer base
                across the world.
              </p>
              <p>
                Specialising in sourcing high-quality, exquisitely coloured
                stones, our extensive product range is curated to meet the
                demands of both local and global markets.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Bottom: Purpose + Values Card ===== */}
        <div className="mt-14 md:mt-18 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 items-center w-[90%] mx-auto pb-12">
          {/* Our Purpose */}
          <div>
            <h3 className="text-[34px] md:text-[44px] leading-[1.1] font-light">
              Our Purpose
            </h3>

            <p className={`mt-5 text-white/80 text-[15px] md:text-[16px] leading-relaxed max-w-[640px] ${quicksand.className}`}>
              To redefine the standards of stone craftsmanship worldwide through
              innovative solutions, an expert team with a proven track record,
              and a passion for quality.
              <br />
              <br />
              Our Vision for Tomorrow
              <br />
              We are committed to contributing to society with trust and
              excellence. Our service is the foundation, technology is the
              tool, and teamwork is the driving force.
            </p>
          </div>

          {/* Values card */}
          <div >

            <Image src={foundersImg} alt="founder-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== ICONS (inline SVG) ===================== */
function BulbIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18h6M10 21h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.2 14.3c-1.1-1.1-1.7-2.5-1.7-4.1A5.5 5.5 0 0 1 12 4.7a5.5 5.5 0 0 1 5.5 5.5c0 1.6-.6 3-1.7 4.1-.8.8-1.3 1.7-1.5 2.7H9.7c-.2-1-.7-1.9-1.5-2.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarBadgeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.8l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8 2.4-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScanIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 3H6a3 3 0 0 0-3 3v2M16 3h2a3 3 0 0 1 3 3v2M8 21H6a3 3 0 0 1-3-3v-2M16 21h2a3 3 0 0 0 3-3v-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 12h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearCircleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 13.2v-2.4l-2-.6c-.1-.4-.3-.8-.5-1.1l1-1.8-1.7-1.7-1.8 1c-.3-.2-.7-.4-1.1-.5l-.6-2h-2.4l-.6 2c-.4.1-.8.3-1.1.5l-1.8-1L5.1 7.3l1 1.8c-.2.3-.4.7-.5 1.1l-2 .6v2.4l2 .6c.1.4.3.8.5 1.1l-1 1.8 1.7 1.7 1.8-1c.3.2.7.4 1.1.5l.6 2h2.4l.6-2c.4-.1.8-.3 1.1-.5l1.8 1 1.7-1.7-1-1.8c.2-.3.4-.7.5-1.1l2-.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 4h8v4a4 4 0 0 1-8 0V4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 6h3a2 2 0 0 1-2 2h-1M8 6H5a2 2 0 0 0 2 2h1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 12v4M9 20h6M10 16h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
