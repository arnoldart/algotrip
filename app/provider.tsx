import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { TripDetailContext } from '@/context/TripDetailContext';
import { TripInfo } from './create-new-trip/_components/ChatBox';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const CreateUser = useMutation(api.user.CreateNewUser)
  const [userDetail, setUserDetail] = useState<any>()
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null)

  const {user} = useUser()

  useEffect(() => {
    user && CreateNewUser()
  }, [user])

  const CreateNewUser = async () => {
    const result = await CreateUser({
      email: user?.primaryEmailAddress?.emailAddress || '',
      name: user?.fullName || '',
      imageUrl: user?.imageUrl || ''
    })
    setUserDetail(result)
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUserDetail = () => {
  const context = useContext(UserDetailContext)
  if (!context) {
    throw new Error('useUserDetail must be used within UserDetailContext Provider')
  }
  return context
}

export const useTripDetail = () => {
  const context = useContext(TripDetailContext)
  if (!context) {
    throw new Error('useTripDetail must be used within TripDetailContext Provider')
  }
  return context
}