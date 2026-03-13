"use client";

import React from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function PhoneIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 16.5v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.64-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 1.5 3.18 2 2 0 0 1 3.49 1h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.51a2 2 0 0 1-.45 2.11L7.6 8.4a16 16 0 0 0 8 8l1.06-1.0a2 2 0 0 1 2.11-.45c.81.24 1.65.42 2.51.54A2 2 0 0 1 21 16.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m22 8-10 7L2 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LOCATIONS = [
  {
    title: "HILLTOP GRANITE",
    subtitle: "AUSTIN, TX",
    address: "2120 Grand Ave Pkwy # 150, Austin, TX 78728, USA",
    phone: "+1 512 220 2140",
    email: "austin@hilltopgranite.com",
  },
  {
    title: "HILLTOP GRANITE",
    subtitle: "DALLAS, TX",
    address: "12401 N Stemmons Fwy #140, Farmers Branch, TX 75234, USA",
    phone: "+1 972 243 3156",
    email: "dallas@hilltopgranite.com",
  },
  {
    title: "HILLTOP GRANITE",
    subtitle: "HOUSTON, TX",
    address: "8760 Clay Rd Suite B, Houston, TX 77080, USA",
    phone: "+1 832 867 9053",
    email: "houston@hilltopgranite.com",
  },
];

function LocationCard({ item }) {
  return (
    <div className="min-w-0">
      <div className="text-white">
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-wide leading-tight">
          {item.title}
        </p>
        <p className="text-[20px] sm:text-[22px] font-semibold tracking-wide leading-tight">
          {item.subtitle}
        </p>
      </div>

      <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-white/70 max-w-prose">
        {item.address}
      </p>

      <div className="mt-7 space-y-4">
        <a
          href={`tel:${item.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-3 text-white/85 hover:text-white transition"
        >
          <span className="text-[#c89b3c]">
            <PhoneIcon className="h-5 w-5" />
          </span>
          <span className="text-[15px] sm:text-[16px]">{item.phone}</span>
        </a>

        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-3 text-white/85 hover:text-white transition"
        >
          <span className="text-[#c89b3c]">
            <MailIcon className="h-5 w-5" />
          </span>
          <span className="text-[15px] sm:text-[16px] break-all">{item.email}</span>
        </a>
      </div>
    </div>
  );
}

export default function UsaDistributionCenter() {
  return (
    <section className={`w-full bg-[#1b1b1b] ${quicksand.className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-white text-4xl sm:text-5xl tracking-[0.28em] font-medium">
            USA
          </h2>
        </div>

        {/* Tab + Panel */}
        <div className="relative mt-10 sm:mt-12">
          {/* Back tab (must stay ABOVE panel) */}
          <div className="z-20 flex justify-center">
            <div className="w-full max-w-5xl rounded-t-[22px] bg-[#2b2b2b] px-6 py-6 sm:px-10 sm:py-7">
              <div className="text-center text-white text-[16px] sm:text-[18px] tracking-[0.18em] font-medium">
                Distribution Center
              </div>
            </div>
          </div>

          {/* Main panel (behind tab) */}
          <div className="relative rounded-none lg:rounded-[24px] bg-[#3a3a3a] px-6 pt-14 pb-10 sm:px-12 sm:pt-16 sm:pb-12">
            <div className="grid gap-10 lg:grid-cols-3">
              {LOCATIONS.map((item, idx) => (
                <LocationCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}