import AboutBanner from '@/components/AboutComponents/AboutBanner'
import AboutStorySection from '@/components/AboutComponents/AboutStorySection'
import AwardsAutoSlider from '@/components/AboutComponents/AwardsAutoSlider'
import JourneyTimeline from '@/components/AboutComponents/JourneyTimeline'
import VisionaryLeaders from '@/components/AboutComponents/VisionaryLeaders'
import React from 'react'

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