"use client"

import BrandsTabsSection from "@/components/BrandsTabsSection/BrandsTabsSection";
import CollectionsScrollSlider from "@/components/Collections/CollectionsScrollSlider";
import EngineeredSurface from "@/components/EngineeredSurface/EngineeredSurface";
import GeologicalSignaturesSection from "@/components/GeologicalSignaturesSection/GeologicalSignaturesSection";
import FadeBanner from "@/components/Home/Banner";
import TrustCountersSection from "@/components/TrustCountersSection/TrustCountersSection";

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
