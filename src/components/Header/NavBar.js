// src/components/Header/NavBar.js
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function NavBar({ isOpen, setIsOpen }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const rootRef = useRef(null);

  const navLinks = useMemo(
    () => [
      { label: "Our Story", href: "/about" },
      { label: "Products", href: "/products", isProducts: true },
      { label: "Live Inventory", href: "https://hilltopstones.stoneprofitsweb.com/" },
      { label: "Blog & FAQ", href: "/blogs" },
      { label: "Career", href: "/career" },
      { label: "Locate Us", href: "/locate-us" },
    ],
    []
  );

  const productLinks = useMemo(
    () => [
      { label: "Granite", href: "/products/granite" },
      { label: "Porcelain", href: "/products/porcelain" },
      { label: "Marble", href: "/products/marble" },
      { label: "Quartz", href: "/products/quartz" },
      { label: "Quartzite", href: "/products/quartzite" },
      { label: "SPC", href: "/products/spc" },
    ],
    []
  );

  function closeAll() {
    setProductsOpen(false);
    setIsOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onPointerDown(e) {
      const toggleBtn = e.target?.closest?.('[data-nav-toggle="true"]');
      if (toggleBtn) return;

      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) closeAll();
    }

    if (isOpen) document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setProductsOpen(false);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={rootRef} className="relative z-[999]">
      {/* ================= DESKTOP PILL NAV ================= */}
      <nav
        aria-label="Primary navigation"
        className={[
          quicksand.className,
          "hidden md:block w-[99%] mx-auto",
          "bg-[#272727] rounded-b-[24px] text-[#F4E0C2] px-[22px] py-[16px] absolute left-[8px]",
        ].join(" ")}
      >
        <ul className="flex items-center justify-end gap-[18px] md:gap-x-[30px]">
          {navLinks.map((item, idx) => {
            const isLast = idx === navLinks.length - 1;

            if (item.isProducts) {
              return (
                <React.Fragment key={item.label}>
                  <li className="relative flex items-center justify-center">
                    {/* ✅ Products as Link (fast navigation) */}
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={item.href}
                        className="text-[#F4E0C2] px-3 py-2 inline-flex items-center whitespace-nowrap"
                        onClick={closeAll}
                      >
                        {item.label}
                      </Link>

                      {/* ✅ Caret is the toggle */}
                      <button
                        type="button"
                        data-nav-toggle="true"
                        className="text-[#F4E0C2] px-2 py-2 inline-flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setProductsOpen((s) => !s);
                        }}
                        aria-expanded={productsOpen}
                        aria-label="Toggle products menu"
                      >
                        <span
                          className={`inline-flex transition-transform duration-200 ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <CaretIcon />
                        </span>
                      </button>
                    </div>

                    {productsOpen && (
                      <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[560px] bg-[#343434] rounded-b-[22px] p-[18px]">
                        <div className="grid grid-cols-2 gap-x-[22px] gap-y-[14px]">
                          {productLinks.map((p) => (
                            <Link
                              key={p.label}
                              href={p.href}
                              className="text-[#F4E0C2] px-2 py-[10px] border-b border-white/10"
                              onClick={closeAll}
                            >
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>

                  {!isLast && (
                    <li className="w-px h-[26px] bg-white/10" aria-hidden="true" />
                  )}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={item.label}>
                <li className="flex items-center justify-center">
                  <Link
                    href={item.href}
                    className="text-[#F4E0C2] px-3 py-2 whitespace-nowrap"
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
                {!isLast && (
                  <li className="w-px h-[26px] bg-white/10" aria-hidden="true" />
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>

      {/* ================= MOBILE MENU PANEL ================= */}
      <div
        className={[
          quicksand.className,
          "md:hidden w-[min(420px,calc(100%-60px))] absolute right-0",
          "bg-[#373737]/90 backdrop-blur-md rounded-l-[18px] py-4",
        ].join(" ")}
      >
        <ul className="m-0 p-0 list-none">
          {navLinks.map((item, idx) => {
            const isLast = idx === navLinks.length - 1;

            if (item.isProducts) {
              return (
                <li key={item.label}>
                  <div
                    className={`w-full px-[18px] py-[16px] flex items-center justify-center gap-3 ${
                      isLast ? "" : "border-b border-white/10"
                    }`}
                  >
                    {/* ✅ Products as Link */}
                    <Link
                      href={item.href}
                      className="text-[#F4E0C2] inline-flex items-center"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>

                    {/* ✅ Toggle */}
                    <button
                      type="button"
                      data-nav-toggle="true"
                      className="text-[#F4E0C2] inline-flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setProductsOpen((s) => !s);
                      }}
                      aria-expanded={productsOpen}
                      aria-label="Toggle products menu"
                    >
                      <span
                        className={`inline-flex transition-transform duration-200 ${
                          productsOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <CaretIcon />
                      </span>
                    </button>
                  </div>

                  {productsOpen && (
                    <div className="mx-4 my-3 bg-[#343434] rounded-bl-[18px] p-[14px]">
                      <div className="grid grid-cols-2 gap-x-[18px] gap-y-[12px]">
                        {productLinks.map((p) => (
                          <Link
                            key={p.label}
                            href={p.href}
                            className="text-[#F4E0C2] px-2 py-[10px] border-b border-white/10"
                            onClick={closeAll}
                          >
                            {p.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block text-[#F4E0C2] px-[18px] py-[16px] text-center ${
                    isLast ? "" : "border-b border-white/10"
                  }`}
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function CaretIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
