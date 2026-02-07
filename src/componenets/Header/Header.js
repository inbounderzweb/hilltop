"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import NavBar from "./NavBar";
import logo from "../../assets/logos/logo.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll lock when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[999] pointer-events-none">
      {/* Top bar: centered logo + right toggle button */}
      <div className="relative flex items-center justify-center pt-[22px] pb-[10px] px-[18px] pointer-events-auto">
        <div className="inline-flex items-center justify-center">
          <Image src={logo} alt="HILLTOP" priority className="w-[190px] h-auto" />
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
          className="absolute right-[28px] top-[18px] inline-flex items-center justify-center p-2 text-[#d6c59a] bg-transparent border-0 cursor-pointer"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Menu */}
      <div className="pointer-events-auto">
        <NavBar isOpen={menuOpen} setIsOpen={setMenuOpen} />
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
