"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import NavBar from "./NavBar";
import logo from "../../assets/logos/logo.svg";
import Closebtn from "../../assets/icons/closebtn.svg";
import Burger from "../../assets/icons/burger.svg";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen((v) => !v);

  return (
    <header className="fixed top-0 text-[#F4E0C2] left-0 w-full z-50 bg-black">
      {/* Top bar: centered logo + right toggle button */}
      <div className="relative flex items-center justify-between lg:justify-center pt-[22px] pb-[10px]">
        <div className="inline-flex items-center justify-center">
          <Link href={'/'}><Image src={logo} alt="HILLTOP" priority className="w-[190px] h-auto" /></Link>
        </div>

        <button
          type="button"
          data-nav-toggle="true"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={handleToggle}
          className="absolute right-[28px] top-[18px] inline-flex items-center justify-center pt-3 text-[#F4E0C2] bg-transparent border-0 cursor-pointer z-1002"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <NavBar isOpen={menuOpen} setIsOpen={setMenuOpen} />}
      </AnimatePresence>
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
