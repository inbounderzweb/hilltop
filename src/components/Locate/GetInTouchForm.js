"use client";

import React, { useState } from "react";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function ChevronDown({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GetInTouchForm() {
  const [purpose, setPurpose] = useState("");

  return (
    <section className={`w-full bg-[#1b1b1b] ${quicksand.className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-white text-[44px] sm:text-[54px] leading-none font-medium">
            Get in Touch
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-white/80 text-[18px] sm:text-[22px] leading-relaxed">
            Have a question about our stone collections, finishes, sizes, or project
            suitability?
            <br className="hidden sm:block" />
            Our stone specialists are here to help you choose the right material for
            your space.
          </p>
        </div>

        {/* Form layout */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 sm:mt-12"
        >
          <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-6 sm:space-y-7">
              <FieldInput placeholder="Full Name" name="name" />
              <FieldInput placeholder="Email id" name="email" type="email" />

              {/* Phone with +91 prefix */}
              <div className="relative">
                <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white text-[18px] sm:text-[20px]">
                  +91
                </div>
                <div className="pointer-events-none absolute left-[64px] top-1/2 -translate-y-1/2 h-7 w-px bg-white/25" />
                <input
                  name="phone"
                  inputMode="numeric"
                  placeholder="Phone Number"
                  className={[
                    "w-full rounded-2xl bg-[#2a2a2a] text-white/90",
                    "px-5 py-5 sm:py-6",
                    "pl-[88px]",
                    "text-[18px] sm:text-[20px]",
                    "outline-none",
                    "border border-white/10",
                    "placeholder:text-white/30",
                    "focus:border-white/20",
                  ].join(" ")}
                />
              </div>

              {/* Purpose select */}
              <div className="relative">
                <select
                  name="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={[
                    "w-full appearance-none rounded-2xl bg-[#2a2a2a] text-white/90",
                    "px-5 py-5 sm:py-6",
                    "text-[18px] sm:text-[20px]",
                    "outline-none",
                    "border border-white/10",
                    "placeholder:text-white/30",
                    "focus:border-white/20",
                  ].join(" ")}
                >
                  <option value="" disabled>
                    Purpose of Enquiry
                  </option>
                  <option value="product">Product enquiry</option>
                  <option value="pricing">Pricing & quotation</option>
                  <option value="bulk">Bulk / project requirement</option>
                  <option value="support">Support</option>
                </select>

                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/80">
                  <ChevronDown className="h-6 w-6" />
                </span>
              </div>
            </div>

            {/* Right column (message) */}
            <div className="flex flex-col">
              <textarea
                name="message"
                placeholder="Message"
                className={[
                  "min-h-[230px] md:min-h-[340px]",
                  "w-full flex-1 resize-none rounded-2xl bg-[#2a2a2a] text-white/90",
                  "px-5 py-5 sm:py-6",
                  "text-[18px] sm:text-[20px]",
                  "outline-none",
                  "border border-white/10",
                  "placeholder:text-white/30",
                  "focus:border-white/20",
                ].join(" ")}
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-10 flex justify-center md:justify-start md:pl-[calc(50%+12px)]">
            <button
              type="submit"
              className={[
                "w-full max-w-[360px] md:max-w-[280px]",
                "rounded-2xl bg-[#d59b33] text-black",
                "py-4 sm:py-5",
                "text-[20px] sm:text-[22px] font-semibold",
                "transition active:scale-[0.99]",
              ].join(" ")}
            >
              Submit now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function FieldInput({ placeholder, name, type = "text" }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={[
        "w-full rounded-2xl bg-[#2a2a2a] text-white/90",
        "px-5 py-5 sm:py-6",
        "text-[18px] sm:text-[20px]",
        "outline-none",
        "border border-white/10",
        "placeholder:text-white/30",
        "focus:border-white/20",
      ].join(" ")}
    />
  );
}