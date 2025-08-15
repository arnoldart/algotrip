import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

function TripDurationUI({onSelectedOption}:any) {
  const [days, setDays] = useState(2)

  const decreaseDays = () => {
    if (days > 1) {
      setDays(days - 1)
    }
  }

  const increaseDays = () => {
    if (days < 30) { // Maximum 30 days
      setDays(days + 1)
    }
  }

  const handleConfirm = () => {
    onSelectedOption(`${days} Days`)
  }

  return (
    <div className='flex flex-col items-center mt-4 p-6 bg-white rounded-2xl border'>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>
        How many days do you want to travel?
      </h3>
      
      <div className='flex items-center gap-4 mb-6'>
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseDays}
          disabled={days <= 1}
          className='rounded-full w-10 h-10'
        >
          <Minus className='h-4 w-4' />
        </Button>
        
        <div className='text-center'>
          <span className='text-2xl font-bold text-gray-800'>{days} Days</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={increaseDays}
          disabled={days >= 30}
          className='rounded-full w-10 h-10'
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
      
      <Button 
        onClick={handleConfirm}
        className='bg-primary text-white px-8 py-2 rounded-lg font-medium border border-primary hover:bg-transparent hover:text-primary'
      >
        Confirm
      </Button>
    </div>
  )
}

export default TripDurationUI
