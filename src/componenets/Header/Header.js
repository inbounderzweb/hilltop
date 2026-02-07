"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import NavBar from "./NavBar";
import logo from "../../assets/logos/logo.svg";
import Closebtn from '../../assets/icons/closebtn.svg';
import Burger from '../../assets/icons/burger.svg';

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

  const handleToggle = () => {
    // ✅ NO TOGGLE WHEN OPEN. Explicit close avoids re-open batching issue.
    if (menuOpen) setMenuOpen(false);
    else setMenuOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-black">
      {/* Top bar: centered logo + right toggle button */}
      <div className="relative flex items-center justify-center pt-[22px] pb-[10px] px-[18px]">
        <div className="inline-flex items-center justify-center">
          <Image
            src={logo}
            alt="HILLTOP"
            priority
            className="w-[190px] h-auto"
          />
        </div>

        <button
          type="button"
          data-nav-toggle="true"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={handleToggle}
          className="absolute right-[28px] top-[18px] inline-flex items-center justify-center p-2 text-[#d6c59a] bg-transparent border-0 cursor-pointer z-[1002]"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      <NavBar isOpen={menuOpen} setIsOpen={setMenuOpen} />
    </header>
  );
}

function HamburgerIcon() {
  return (
   <div>
    <Image src={Burger} alt="burger menu mobile" />
   </div>
  );
}

function CloseIcon() {
  return (
      <div>
    <Image src={Closebtn} alt="close button mobile menu" />
   </div>
  );
}
