"use client";

import React from "react";
import Image from "next/image";
import whatsappicon from "../assets/logos/whatsappicon.svg";

const WhatsAppButton = () => {
  const phoneNumber = "+919900064364";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-1000 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulse Animation Layers (Slowed Down) */}
        <div className="absolute inset-0 bg-[#C9AF4A] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75 group-hover:animate-none"></div>
        <div className="absolute inset-0 bg-[#C9AF4A] rounded-full animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-40"></div>

        {/* Main Button Container */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-[#C9AF4A] rounded-full shadow-lg hover:bg-[#A68A36] transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 overflow-hidden">
          <Image
            src={whatsappicon}
            alt="WhatsApp"
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />

          {/* Tooltip */}
          <div className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none hidden md:block">
            Chat with us
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
