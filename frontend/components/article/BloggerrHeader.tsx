"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function BloggerrHeader() {
    const router = useRouter();
  return (
    <div className=" fixed flex justify-between items-center mb-6 w-full p-6 bg-black h-20">
        <h1 onClick={()=>router.push("/")} className="text-3xl font-bold mb-4 text-white cursor-pointer"><span className='text-6xl text-orange-400'>B</span>logger</h1>
    </div>
  )
}
