import GetInTouchForm from '@/components/Locate/GetInTouchForm'
import LocateBanner from '@/components/Locate/LocateBanner'
import LocationsTabs from '@/components/Locate/LocationsTabs'
import UsaDistributionCenter from '@/components/Locate/UsaDistributionCenter'
import React from 'react'

function page() {
  return (
    <div>
        <LocateBanner />
        <LocationsTabs />
        <UsaDistributionCenter />
        <GetInTouchForm />
    </div>
  )
}

export default page