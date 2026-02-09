"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function NavBar({ isOpen, setIsOpen }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const rootRef = useRef(null);

  const navLinks = useMemo(
    () => [
      { label: "Our Story", href: "/our-story" },
      { label: "Products", href: "/products", isProducts: true },
      { label: "Live Inventory", href: "/live-inventory" },
      { label: "Blog & FAQ", href: "/blog" },
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

  // ESC closes
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // OPTIONAL safety outside click:
  // ✅ Ignore clicks on the header toggle button to prevent reopen conflicts.
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
    <>
      {/* Backdrop closes */}
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={closeAll}
        className="fixed inset-0 z-[998] bg-transparent cursor-default"
      />

      {/* NAV WRAPPER */}
      <div ref={rootRef} className="relative z-[999]">
        {/* ================= DESKTOP PILL NAV ================= */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:block w-[min(1320px,calc(100%-120px))] mx-auto bg-[#373737]/90 backdrop-blur-md rounded-full px-[22px] py-[16px]"
        >
          <ul className="flex items-center justify-between gap-[18px]">
            {navLinks.map((item, idx) => {
              const isLast = idx === navLinks.length - 1;

              if (item.isProducts) {
                return (
                  <React.Fragment key={item.label}>
                    <li className="relative flex items-center justify-center">
                      <button
                        type="button"
                        className="text-[#d9d2c6] px-3 py-2 inline-flex items-center gap-2 whitespace-nowrap"
                        onClick={() => setProductsOpen((s) => !s)}
                        aria-expanded={productsOpen}
                      >
                        <span>{item.label}</span>
                        <span
                          className={`inline-flex transition-transform duration-200 ${
                            productsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <CaretIcon />
                        </span>
                      </button>

                      {productsOpen && (
                        <div className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[560px] bg-[#3c3c3c]/95 backdrop-blur-md rounded-[22px] p-[18px]">
                          <div className="grid grid-cols-2 gap-x-[22px] gap-y-[14px]">
                            {productLinks.map((p) => (
                              <Link
                                key={p.label}
                                href={p.href}
                                className="text-[#d9d2c6] px-2 py-[10px] border-b border-white/10"
                                onClick={closeAll}
                              >
                                {p.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>

                    {!isLast && <li className="w-px h-[26px] bg-white/10" aria-hidden="true" />}
                  </React.Fragment>
                );
              }

              return (
                <React.Fragment key={item.label}>
                  <li className="flex items-center justify-center">
                    <Link
                      href={item.href}
                      className="text-[#d9d2c6] px-3 py-2 whitespace-nowrap"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </li>
                  {!isLast && <li className="w-px h-[26px] bg-white/10" aria-hidden="true" />}
                </React.Fragment>
              );
            })}
          </ul>
        </nav>

        {/* ================= MOBILE MENU PANEL ================= */}
        <div className="md:hidden w-[min(420px,calc(100%-60px))] absolute m-0 right-0 mx-auto  bg-[#373737]/90 backdrop-blur-md rounded-l-[18] py-4">
          <ul className="m-0 p-0 list-none">
            {navLinks.map((item, idx) => {
              const isLast = idx === navLinks.length - 1;

              if (item.isProducts) {
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={`w-full text-[#d9d2c6] px-[18px] py-[16px] flex items-center justify-center gap-3 ${
                        isLast ? "" : "border-b border-white/10"
                      }`}
                      onClick={() => setProductsOpen((s) => !s)}
                      aria-expanded={productsOpen}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`inline-flex transition-transform duration-200 ${
                          productsOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <CaretIcon />
                      </span>
                    </button>

                    {productsOpen && (
                      <div className="mx-4 my-3 bg-[#3c3c3c]/95 backdrop-blur-md rounded-[18px] p-[14px]">
                        <div className="grid grid-cols-2 gap-x-[18px] gap-y-[12px]">
                          {productLinks.map((p) => (
                            <Link
                              key={p.label}
                              href={p.href}
                              className="text-[#d9d2c6] px-2 py-[10px] border-b border-white/10"
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
                    className={`block text-[#d9d2c6] px-[18px] py-[16px] text-center ${
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
    </>
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
