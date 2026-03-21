import AboutBanner from '@/components/AboutComponents/AboutBanner'
import AboutStorySection from '@/components/AboutComponents/AboutStorySection'
import AwardsAutoSlider from '@/components/AboutComponents/AwardsAutoSlider'
import JourneyTimeline from '@/components/AboutComponents/JourneyTimeline'
import VisionaryLeaders from '@/components/AboutComponents/VisionaryLeaders'
import React from 'react'

export const metadata = {
  title: "About Us | Hilltop Surfaces - Journey of Excellence",
  description: "Learn about the legacy of Hilltop Surfaces, our visionary leaders, and our commitment to bringing the finest natural stones to the global market.",
};

function page() {
  return (
    <div className='bg-[#1e1e1e]'>
<AboutBanner />
<AboutStorySection />
<JourneyTimeline />
<AwardsAutoSlider />
<VisionaryLeaders />
    </div>
  )
}

export default page