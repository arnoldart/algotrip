import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuOptions = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Pricing",
    path: "/Pricing"
  },
  {
    name: "Contact us",
    path: "/Contact-us"
  }
]

function Header() {
  return (
    <div className='flex justify-between items-center p-4'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
        <h2 className='font-bold text-2xl'>AlgoTrip</h2>
      </div>
      <div className="flex gap-8 items-center">
        {menuOptions.map((menu) => (
          <Link key={menu.path} href={menu.path}>
            <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
          </Link>
        ))}
      </div>
      <SignInButton mode='modal'>
        <Button>
          Get Started
        </Button>
      </SignInButton>
    </div>
  )
}

export default Header