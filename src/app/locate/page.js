import { db } from '@/lib/db'
import GetInTouchForm from '@/components/Locate/GetInTouchForm'
import LocateBanner from '@/components/Locate/LocateBanner'
import LocationsTabs from '@/components/Locate/LocationsTabs'
import UsaDistributionCenter from '@/components/Locate/UsaDistributionCenter'
import React from 'react'

async function page() {
  const [products] = await db.query("SELECT id, product_name FROM products ORDER BY product_name ASC");

  return (
    <div>
        <LocateBanner />
        <LocationsTabs />
        <UsaDistributionCenter />
        <GetInTouchForm initialProducts={products} />
    </div>
  )
}

export default page