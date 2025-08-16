"use client"
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox'
import Itinerary from '@/app/create-new-trip/_components/Itinerary'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ViewTrip() {
  const { tripId } = useParams()
  const convex = useConvex()
  const { userDetail, setUserDetail} = useUserDetail()
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()
  const [tripData, setTripData] = useState<any>()

  const GetTrip = async () => {
    if (!userDetail?._id || !tripId) return; // Guard clause to prevent calling without required params
    
    try {
      const result = await convex.query(api.tripDetail.GetUserTripId, {
        uid: userDetail._id, // Fix: should be _id not id
        tripId: tripId as string
      })  

      setTripData(result)
      setTripDetailInfo(result?.tripDetail)
    } catch (error) {
      console.error('Error fetching trip:', error)
    }
  }

  useEffect(() => {
    userDetail && GetTrip()
  }, [userDetail])

  return (
    <div>
      <Itinerary />
    </div>
  )
}

export default ViewTrip