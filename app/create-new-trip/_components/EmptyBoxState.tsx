import { Globe } from 'lucide-react'
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
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

  return (
    <div className='mt-7 '>
      <h2 className='font-bold text-xl text-center'>Start Planning New <strong className='text-primary text-xl text-center'>Trips</strong> Using AI</h2>
      <p className='text-center text-gray-400 mt-2'>Discover personalized trip recommendations and planning assistance powered by AI.</p>
    
      <div className='flex flex-col gap-5 mt-7'>
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className='flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:border-primary hover:text-primary transition-all'
              onClick={() => onSelectOption(suggestion.title)}
            >
              {suggestion.icon}
              <h2 className='text-lg'>{suggestion.title}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EmptyBoxState