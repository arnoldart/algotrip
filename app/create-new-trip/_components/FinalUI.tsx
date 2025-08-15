import React from 'react'
import { Button } from '@/components/ui/button'
import { Globe, Plane } from 'lucide-react'

function FinalUI({onSelectedOption, disable}:any) {
  const handleViewTrip = () => {
    onSelectedOption('View Trip Details')
  }

  return (
    <div className='flex flex-col items-center mt-4 p-8 bg-gradient-to-br  rounded-2xl border bg-white'>
      {/* Icon */}
      <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4'>
        <Globe className='w-8 h-8 text-orange-500' />
      </div>
      
      {/* Title */}
      <h3 className='text-xl font-bold text-gray-800 mb-2 text-center'>
        ✈️ Planning your dream trip...
      </h3>
      
      {/* Subtitle */}
      <p className='text-gray-600 text-center mb-6 max-w-sm'>
        Gathering best destinations, activities, and travel details for you.
      </p>
      
      {/* View Trip Button */}
      <Button 
        disabled={disable}
        onClick={handleViewTrip}
        className='bg-primary text-white px-8 py-2 rounded-lg font-medium border border-primary hover:bg-transparent hover:text-primary'
      >
        View Trip
      </Button>
    </div>
  )
}

export default FinalUI
