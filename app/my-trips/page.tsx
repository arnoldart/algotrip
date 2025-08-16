"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider'
import { TripInfo } from '../create-new-trip/_components/ChatBox'
import { ArrowBigRightIcon } from 'lucide-react'
import Image from 'next/image'
import MyTripCardItem from './_components/MyTripCardItem'

type Trip = {
  tripId:any
  tripDetail:TripInfo
  _id:string
}

function MyTripsPage() {
  const [myTrips, setMyTrips] = useState<Trip[]>([])
  const {userDetail, setUserDetail} = useUserDetail()
  const convex = useConvex()

  const GetUserTrip = async () => {
    if (!userDetail?._id) return; // Guard clause to prevent calling without uid
    
    try {
      const result = await convex.query(api.tripDetail.GetUserTrips, {
        uid: userDetail._id
      })
      setMyTrips(result) // Fix: should set myTrips, not userDetail
    } catch (error) {
      console.error('Error fetching user trips:', error)
    }
  }

  useEffect(() => {
    userDetail && GetUserTrip()
  }, [userDetail])

  return (
    <div className='px-10 p-10 md:px-24 lg:px-48'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      {myTrips?.length === 0 && 
        <div className='p-7 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6'>
          <h2>You don't have any trips planned.</h2>
          <Link href={'/create-new-trip'}>
            <Button>Create New Trip</Button>
          </Link>
        </div>
      }

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
        {myTrips?.map((trip, index) => (
          <MyTripCardItem key={index} trip={trip} />
        ))}
      </div>
    </div>
  )
}

export default MyTripsPage