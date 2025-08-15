'use client'

import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const suggestions = [
	{
		title: 'Create new trip',
		icon: <Globe className='text-blue-400 w-5 h-5' />,
	},
	{
		title: 'Inspire where you go',
		icon: <Globe className='text-green-500 w-5 h-5' />,
	},
	{
		title: 'Discover Hidden gems',
		icon: <Globe className='text-orange-500 w-5 h-5' />,
	},
	{
		title: 'Advanture Destination',
		icon: <Globe className='text-yellow-600 w-5 h-5' />,
	},
]

function Hero() {
	const { user } = useUser()
	const router = useRouter()

	const onSend = () => {
		if(!user) {
			router.push('/sign-in')
			return
		}

		router.push('/create-new-trip')
	}

	return (
		<div className='mt-24 flex items-center justify-center'>
			<div className='max-w-3xl w-full text-center space-y-6'>
				<h1 className='text-xl md:text-5xl font-bold'>
					Hey, I'm your personal{" "}
					<span className='text-primary'>Trip Planner</span>
				</h1>
				<p className='text-lg'>
					Tell me what you want, and I'll help you plan your perfect trip!
				</p>
				<div>
					<div className='border rounded-2xl p-4 relative'>
						<Textarea
							placeholder='Create a trip for Paris from New York '
							className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
						/>
						<Button size={'icon'} className='absolute bottom-6 right-6' onClick={()=>onSend()}>
							<Send className='h-4 w-4' />
						</Button>
					</div>
				</div>
				<div className='flex gap-5'>
					{suggestions.map((suggestion, index) => {
						return (
							<div
								key={index}
								className='flex items-center gap-2 p-2 border rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all'
							>
								{suggestion.icon}
								<h2 className='text-sm'>{suggestion.title}</h2>
							</div>
						)
					})}
				</div>

				<div className='flex items-center justify-center flex-col'>
          <h2 className='my-7 mt-14 flex gap-2 justify-center items-center text-center'>
            Not sure where to start?
            <strong>See how it works</strong> <ArrowDown />
          </h2>
          <HeroVideoDialog
            className='block dark:hidden'
            animationStyle='from-center'
            videoSrc='https://www.youtube.com/watch?v=xs8mWnbMcmc'
            thumbnailSrc='https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook'
            thumbnailAlt='Dummy Video Thumbnail'
          />
        </div>
			</div>
		</div>
	)
}

export default Hero