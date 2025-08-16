import { Button } from '@/components/ui/button'
import { ExternalLinkIcon, Star, Wallet2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function HotelCardItem({hotel, index}: any) {
  return (
    <div key={index} className='bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className="space-y-3">
        <div className="relative">
          <Image 
            src={hotel.hotel_image_url[0]} 
            alt={hotel.hotel_name} 
            width={400} 
            height={200} 
            className='w-full h-48 object-cover rounded-lg' 
          />
        </div>
        
        <div className="space-y-2">
          <h2 className='font-bold text-lg text-gray-800'>{hotel.hotel_name}</h2>
          <p className='text-gray-600 text-sm leading-relaxed line-clamp-2'>{hotel.hotel_address}</p>
          <p className='text-gray-600 text-sm leading-relaxed'>{hotel.description}</p>
          
          <div className='grid grid-cols-2 gap-2 pt-2'>
            <div className='flex items-center gap-2 text-green-600'>
              <Wallet2 className="w-4 h-4" />
              <span className="text-sm font-medium">{hotel.price_per_night}</span>
            </div>
            <div className='flex items-center gap-2 text-yellow-500'>
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name}`} target='_blank'>
              <Button variant={'outline'} className='w-full gap-2'>
                <ExternalLinkIcon className="w-4 h-4" />
                View on Maps
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelCardItem