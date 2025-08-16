import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function PricingPage() {
  return (
    <div className='mt-20'>
      <h2 className='font-bold text-3xl text-center my-5'>AI-Powered Trip Planning - Pick Your Plan</h2>
      <div className='max-w-[800px] my-0 mx-auto py-0 px-[1rem]'>
        <PricingTable />
      </div>
    </div>
  )
}

export default PricingPage