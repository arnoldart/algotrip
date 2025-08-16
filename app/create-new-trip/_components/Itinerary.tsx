"use client"
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import { ArrowLeft, Clock, ExternalLinkIcon, Star, Ticket, Timer, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import HotelCardItem from './HotelCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

function Itinerary() {
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()
  const [tripData, setTripData] = useState<TripInfo | null>(null)

  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
         {tripData?.hotels?.map((hotel: any, index: number) => (
            <HotelCardItem key={index} hotel={hotel} />
         ))}
        </div>
      ),
    },
    ...(tripData?.itinerary || []).map((dayData: any) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div className="flex flex-col gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-1">Day Plan</h3>
            <p className="text-blue-700 text-sm">{dayData.day_plan}</p>
          </div>
          {(dayData.activities || []).map((activity: any, idx: number) => (
            <div key={idx} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    <Clock className="w-3 h-3" />
                    Best time: {activity.best_time_to_visit}
                  </span>
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <Image 
                    src={activity.place_image_url[0]} 
                    width={400} 
                    height={200} 
                    alt={activity.place_name} 
                    className="w-full h-48 object-cover rounded-lg" 
                  />
                </div>
                
                <div className="space-y-2">
                  <h2 className="font-bold text-lg text-gray-800">{activity.place_name}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{activity.place_details}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Ticket className="w-4 h-4" />
                      <span className="text-sm font-medium">{activity.ticket_pricing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{activity.time_travel_each_location}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Link href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name}`} target='_blank'>
                      <Button variant={'outline'} className='w-full gap-2'>
                        <ExternalLinkIcon className="w-4 h-4" />
                        View on Maps
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }))
  ];

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo);
  }, [tripDetailInfo]);

  return (
    <div className="relative w-full overflow-clip">
      {tripData ? 
        <Timeline data={data} tripData={tripData} /> : 
        <div className="flex items-center justify-center h-full">
          <h2 className="flex gap-2 items-center absolute bottom-20 text-3xl text-white left-20 "><ArrowLeft /> Getting to build perfect Trip here</h2>
          <Image 
            src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            height={800}
            width={800}
            className='w-full h-full object-cover rounded-3xl' alt={'travel'}          
          />
        </div>
      }
    </div>
  );
}

export default Itinerary