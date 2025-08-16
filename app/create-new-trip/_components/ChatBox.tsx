'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUI from './GroupSizeUI'
import BudgetUI from './BudgetUI'
import TripDurationUI from './TripDurationUI'
import FinalUI from './FinalUI'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'

type Message = {
  role:string,
  content:string
  ui?:string
}

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string; 
  group_size: string;
  origin: string;
  hotels: any;
  itinerary: any;
}

// {
//     "trip_plan": {
//         "destination": "Jakarta",
//         "duration": "3 days",
//         "origin": "Various",
//         "budget": "Cheap: Stay conscious of costs",
//         "group_size": "1 person",
//         "hotels": [
//             {
//                 "hotel_name": "Grand Indonesia Hotel & Convention Center",
//                 "hotel_address": "Jl. Jendral Sudirman Kav 52-53, Senayan, South Jakarta, DKI Jakarta 12940, Indonesia",
//                 "price_per_night": "IDR 600,000 - 800,000",
//                 "hotel_image_url": "https://via.placeholder.com/300x200",
//                 "geo_coordinates": {
//                     "latitude": -6.17549,
//                     "longitude": 106.83685
//                 },
//                 "rating": 4,
//                 "description": "A luxurious hotel with modern amenities and a central location."
//             },
//             {
//                 "hotel_name": "Hotel Novotel Senayan Jakarta",
//                 "hotel_address": "Jl. Jendral Sudirman Kav 20, Senayan, South Jakarta, DKI Jakarta 12940, Indonesia",
//                 "price_per_night": "IDR 500,000 - 700,000",
//                 "hotel_image_url": "https://via.placeholder.com/300x200",
//                 "geo_coordinates": {
//                     "latitude": -6.17498,
//                     "longitude": 106.8358
//                 },
//                 "rating": 3,
//                 "description": "A more budget-friendly option with good amenities and a convenient location."
//             }
//         ],
//         "itinerary": [
//             {
//                 "day": 1,
//                 "day_plan": "Explore Senayan City Mall",
//                 "activities": [
//                     {
//                         "place_name": "Senayan City Mall",
//                         "place_details": "A large shopping mall with multiple food courts and restaurants.",
//                         "place_image_url": "https://via.placeholder.com/300x200",
//                         "geo_coordinates": {
//                             "latitude": -6.17549,
//                             "longitude": 106.83685
//                         },
//                         "place_address": "Jl. Jendral Sudirman Kav 52-53, Senayan, South Jakarta, DKI Jakarta 12940, Indonesia",
//                         "ticket_pricing": "Free",
//                         "time_travel_each_location": "2 hours",
//                         "best_time_to_visit": "Afternoon"
//                     }
//                 ]
//             },
//             {
//                 "day": 2,
//                 "day_plan": "Visit Other Food Destinations in Jakarta",
//                 "activities": [
//                     {
//                         "place_name": "Glodok Sate",
//                         "place_details": "A famous street food destination known for its satay.",
//                         "place_image_url": "https://via.placeholder.com/300x200",
//                         "geo_coordinates": {
//                             "latitude": -6.1975,
//                             "longitude": 106.848
//                         },
//                         "place_address": "Jl. Glodok Sate No. 1-3, Glodok, Central Jakarta, DKI Jakarta 10210, Indonesia",
//                         "ticket_pricing": "Free",
//                         "time_travel_each_location": "1 hour",
//                         "best_time_to_visit": "Evening"
//                     },
//                     {
//                         "place_name": "Kebon Jeruk Night Market",
//                         "place_details": "A bustling night market with various food stalls and shops.",
//                         "place_image_url": "https://via.placeholder.com/300x200",
//                         "geo_coordinates": {
//                             "latitude": -6.1954,
//                             "longitude": 106.877
//                         },
//                         "place_address": "Jl. Kebon Jeruk No. 1-15, Kebon Jeruk, Central Jakarta, DKI Jakarta 12340, Indonesia",
//                         "ticket_pricing": "Free",
//                         "time_travel_each_location": "2 hours",
//                         "best_time_to_visit": "Evening"
//                     }
//                 ]
//             },
//             {
//                 "day": 3,
//                 "day_plan": "Relax and Explore Local Cuisine",
//                 "activities": [
//                     {
//                         "place_name": "Lido Restaurant",
//                         "place_details": "A restaurant known for its diverse Indonesian cuisine.",
//                         "place_image_url": "https://via.placeholder.com/300x200",
//                         "geo_coordinates": {
//                             "latitude": -6.17549,
//                             "longitude": 106.83685
//                         },
//                         "place_address": "Jl. Jendral Sudirman Kav 52-53, Senayan, South Jakarta, DKI Jakarta 12940, Indonesia",
//                         "ticket_pricing": "IDR 150,000 - 300,000 per person",
//                         "time_travel_each_location": "1.5 hours",
//                         "best_time_to_visit": "Afternoon"
//                     }
//                 ]
//             }
//         ]
//     }
// }

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isFinal, setFinal] = useState<boolean>(false)
  const [tripDetail, setTripDetail] = useState<any>()
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const { userDetail } = useUserDetail()
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()

  const onSend = async () => {
    if(!userInput?.trim()) return
    setUserInput('')

    setLoading(true)

    const newMsg:Message = {
      role: "user",
      content: userInput
    }

    setMessages((prev:Message[]) => [...prev, newMsg])

    const result = await fetch('/api/aimodel', {
      method: 'POST',
      body: JSON.stringify({messages: [...messages, newMsg], isFinal: isFinal})
    })
    const data = await result.json()

    console.log(data)

    !isFinal && setMessages((prev:Message[]) => [...prev, 
      {
        role: "assistant",
        content: data?.resp,
        ui: data?.ui
      }
    ])

    if(isFinal) {
      setTripDetail(data?.trip_plan)
      setTripDetailInfo(data?.trip_plan)
      const tripId = uuidv4()
      await SaveTripDetail({
        tripDetail: data?.trip_plan,
        uid: userDetail?._id,
        tripId: tripId
      })
    }

    setLoading(false)
  }

  const RenderGenerativeUI = (ui:string|undefined) => {
    if(ui?.toLowerCase()=="budget") {
      return <BudgetUI onSelectedOption={(v:string) => {setUserInput(v); onSend()}} />
    }else if(ui?.toLowerCase()=="groupsize") {
      return <GroupSizeUI onSelectedOption={(v:string) => {setUserInput(v); onSend()}} />
    }else if(ui?.toLowerCase()=="tripduration") {
      return <TripDurationUI onSelectedOption={(v:string) => {setUserInput(v); onSend()}} />
    }else if(ui?.toLowerCase()=="final") {
      return <FinalUI onSelectedOption={(v:string) => {setUserInput(v); onSend()}} disable={!tripDetail} />
    }

    return null
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if(lastMessage?.ui?.toLowerCase() == "final") {
      setFinal(true)
      setUserInput('Ok, Great!')
      onSend()
    }
  }, [messages])

  return (
    <div className='h-[87vh] flex flex-col'>
      {messages?.length === 0 && <EmptyBoxState onSelectOption={(v:string) => {setUserInput(v); onSend()}} />}

      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg, index) => (

          msg.role === 'user' ? 
            <div className='flex justify-end mt-2' key={index}>
              <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                {msg.content}
              </div>
            </div>
          :
            <div className='flex justify-start mt-2' key={index}>
              <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                {msg.content}
                {RenderGenerativeUI(msg.ui ?? "")}
              </div>
            </div>
        ))}

        {loading && 
          <div className='flex justify-start mt-2'>
            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
              <Loader className='animate-spin'/>
            </div>
          </div>
        }
      </section>
      <section>
        <div className='border rounded-2xl p-4 relative'>
						<Textarea
							placeholder='Start typing here...'
							className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
						/>
						<Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
							<Send className='h-4 w-4' />
						</Button>
					</div>
      </section>
    </div>
  )
}

export default ChatBox