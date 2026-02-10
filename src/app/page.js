import ApplicationsShowcaseSlider from "@/components/ApplicationsShowcaseSlider/ApplicationsShowcaseSlider";
import BrandsTabsSection from "@/components/BrandsTabsSection/BrandsTabsSection";
import CollectionsScrollSlider from "@/components/Collections/CollectionsScrollSlider";
import EngineeredSurface from "@/components/EngineeredSurface/EngineeredSurface";
import GeologicalSignaturesSection from "@/components/GeologicalSignaturesSection/GeologicalSignaturesSection";
import FadeBanner from "@/components/Home/Banner";
import TestimonialsSlider from "@/components/TestimonialsSlider/TestimonialsSlider";
import TrustCountersSection from "@/components/TrustCountersSection/TrustCountersSection";

import Header from "@/components/Header/Header";


export default function Home() {
  return (
    <div className="">
     <Header />
    <FadeBanner />
    <CollectionsScrollSlider />
    <GeologicalSignaturesSection />
    <EngineeredSurface />
    <TrustCountersSection />
    <BrandsTabsSection />
    <ApplicationsShowcaseSlider />
    <TestimonialsSlider />
    
    </div>
  );
}
