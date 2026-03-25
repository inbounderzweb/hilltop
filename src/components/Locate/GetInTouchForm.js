"use client";

import React, { useState, useEffect, useMemo } from "react";
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

import { COUNTRY_CODES } from "../../data/countryCodes";

export default function GetInTouchForm({ initialProducts = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: ""
  });
  const sortedCountries = useMemo(() => {
    return [...COUNTRY_CODES].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRY_CODES.find(c => c.label === "India") || COUNTRY_CODES[0]
  );
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products?t=' + Date.now()),
          fetch('/api/categories?t=' + Date.now())
        ]);
        const [prodData, catData] = await Promise.all([prodRes.json(), catRes.json()]);

        if (prodData.success) {
          setProducts(prodData.products);
        }
        if (catData.success) {
          setCategories(catData.categories.map(c => c.name));
        }
      } catch (err) {
        console.error("Failed to fetch data for form", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const submissionData = {
      ...formData,
      phone: `${selectedCountry.code} ${formData.phone}`
    };

    try {
      const response = await fetch('/api/enquiries/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Thank you! Your enquiry has been submitted.' });
        setFormData({ name: "", email: "", phone: "", purpose: "", message: "" });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full bg-[#1b1b1b] pt-10`} id="contactform">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-white text-[44px] sm:text-[54px] leading-none font-medium">
            Get in Touch
          </h2>

          <p className={`mx-auto mt-6 max-w-3xl text-white/80 text-[18px] sm:text-[22px] leading-relaxed ${quicksand.className}`}>
            Have a question about our stone collections, finishes, sizes, or project
            suitability?
            <br className="hidden sm:block" />
            Our stone specialists are here to help you choose the right material for
            your space.
          </p>
        </div>

        {/* Form layout */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 sm:mt-12"
        >
          <div className={`grid gap-6 sm:gap-7 md:grid-cols-2 ${quicksand.className}`}>
            {/* Left column */}
            <div className="space-y-6 sm:space-y-7">
              <FieldInput placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} required />
              <FieldInput placeholder="Email id" name="email" type="email" value={formData.email} onChange={handleChange} required />

              {/* Phone with Country Code selector */}
              <div className="flex w-full items-stretch rounded-2xl bg-[#2a2a2a] border border-white/10 focus-within:border-white/20 overflow-hidden">
                <div className="relative flex items-center shrink-0 w-[110px] sm:w-[180px]">
                  <select
                    value={selectedCountry.label}
                    onChange={(e) => {
                      const country = COUNTRY_CODES.find(c => c.label === e.target.value);
                      setSelectedCountry(country);
                    }}
                    className="w-full h-full bg-transparent text-white text-[16px] sm:text-[20px] pl-3 sm:pl-4 pr-7 sm:pr-9 py-5 sm:py-6 outline-none appearance-none cursor-pointer hover:bg-white/5 transition"
                  >
                    {sortedCountries.map((c, i) => (
                      <option key={i} value={c.label} className="bg-[#1b1b1b]">
                        {c.flag} {c.code} ({c.label})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                <div className="w-px bg-white/10 self-stretch" />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="Phone Number"
                  className="flex-1 min-w-0 w-full bg-transparent text-white/90 px-4 sm:px-5 py-5 sm:py-6 text-[16px] sm:text-[20px] outline-none placeholder:text-white/30"
                  required
                />
              </div>

              {/* Purpose select */}
              <div className="relative">
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={[
                    "w-full appearance-none rounded-2xl bg-[#2a2a2a] text-white/90",
                    "px-5 py-5 sm:py-6",
                    "text-[18px] sm:text-[20px]",
                    "outline-none",
                    "border border-white/10",
                    "placeholder:text-white/30",
                    "focus:border-white/20",
                  ].join(" ")}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="other">Other / General Enquiry</option>
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
                value={formData.message}
                onChange={handleChange}
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
                required
              />
            </div>
          </div>

          {status && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {status.message}
            </div>
          )}

          {/* Button */}
          <div className="mt-10 flex justify-center md:justify-start md:pl-[calc(50%+12px)]">
            <button
              type="submit"
              disabled={loading}
              className={[
                "w-full max-w-[360px] md:max-w-[280px]",
                "rounded-2xl bg-[#d59b33] text-black",
                "py-4 sm:py-5",
                "text-[20px] sm:text-[22px] font-semibold",
                "transition active:scale-[0.99]",
                loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110",
              ].join(" ")}
            >
              {loading ? "Submitting..." : "Submit now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldInput({ placeholder, name, type = "text", ...props }) {
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
      {...props}
    />
  );
}