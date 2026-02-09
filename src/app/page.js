"use client"

import BrandsTabsSection from "@/componenets/BrandsTabsSection/BrandsTabsSection";
import CollectionsScrollSlider from "@/componenets/Collections/CollectionsScrollSlider";
import EngineeredSurface from "@/componenets/EngineeredSurface/EngineeredSurface";
import GeologicalSignaturesSection from "@/componenets/GeologicalSignaturesSection/GeologicalSignaturesSection";
import FadeBanner from "@/componenets/Home/Banner";
import TrustCountersSection from "@/componenets/TrustCountersSection/TrustCountersSection";

export default function Home() {
  return (
    <div className="">
    <FadeBanner />
    <CollectionsScrollSlider />
    <GeologicalSignaturesSection />
    <EngineeredSurface />
    <TrustCountersSection />
    <BrandsTabsSection />
    </div>
  );
}
