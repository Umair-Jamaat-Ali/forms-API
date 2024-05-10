'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {

    const {data: session} = useSession()
    // console.log('session :>> ', session);

    const userId = session?.user?.id;
    console.log('userId :>> ', userId);

  return (
    <>
    <div>
      <h1>Admin Portal</h1>  
    </div>
    <div>

    </div>
    </>
  )
}
