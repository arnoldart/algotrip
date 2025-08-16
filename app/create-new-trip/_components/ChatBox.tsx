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

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isFinal, setFinal] = useState<boolean>(false)
  const [tripDetail, setTripDetail] = useState<any>()
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const { userDetail } = useUserDetail()
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail()

  const onSend = async () => {
    if(!userInput?.trim() || isLimited) return
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

    // Check if response indicates rate limit
    if(data?.ui === 'limit') {
      setIsLimited(true) // Set limited state
      setMessages((prev:Message[]) => [...prev, 
        {
          role: "assistant",
          content: data?.resp,
          ui: data?.ui
        }
      ])
      setLoading(false)
      return // Exit early, don't proceed with saving trip
    }

    !isFinal && setMessages((prev:Message[]) => [...prev, 
      {
        role: "assistant",
        content: data?.resp,
        ui: data?.ui
      }
    ])

    if(isFinal && data?.trip_plan) {
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
    }else if(ui?.toLowerCase()=="limit") {
      return (
        <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
          <h3 className='text-red-800 font-semibold'>Rate Limit Reached</h3>
          <p className='text-red-600 text-sm mt-1'>
            You have reached your daily limit for trip planning. Please try again tomorrow or upgrade to premium for unlimited access.
          </p>
          <Button 
            className='mt-3 bg-red-600 hover:bg-red-700' 
            size="sm"
            onClick={() => window.location.href = '/Pricing'}
          >
            Upgrade to Premium
          </Button>
        </div>
      )
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
							placeholder={isLimited ? 'Rate limit reached. Please upgrade to continue...' : 'Start typing here...'}
							className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              disabled={isLimited}
						/>
						<Button 
              size={'icon'} 
              className='absolute bottom-6 right-6' 
              onClick={()=>onSend()}
              disabled={isLimited || loading}
            >
							<Send className='h-4 w-4' />
						</Button>
					</div>
      </section>
    </div>
  )
}

export default ChatBox