import { ArrowBigRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function MyTripCardItem({ trip, index}:any) {
  return (
    <Link href={`/view-trips/${trip.tripId}`}>
      <div key={index} className='p-5 shadow rounded-2xl '>
        <Image 
          src="https://images.unsplash.com/photo-1713656428933-6efdde7b1fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTI1MzB8MHwxfHNlYXJjaHwxfHxCdWRnZXQlMjBJbm4lMjBOWUMlMjBOZXclMjBZb3JrJTIwQ2l0eSUyMCUyOE5ZQyUyOSUyMGhvdGVsfGVufDB8fHx8MTc1NTMyMTA3OXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Trip Image"
          width={400}
          height={400}
          className='rounded-xl object-cover'
        />
        <h2 className='flex gap-2 font-semibold text-xl mt-2'>{trip?.tripDetail?.origin} <ArrowBigRightIcon /> {trip?.tripDetail?.destination}  </h2>
        <h2 className='mt-2 text-gray-500'>{trip.tripDetail.duration} Trip with {trip.tripDetail.budget}</h2>
      </div>
    </Link>
  )
}

export default MyTripCardItem