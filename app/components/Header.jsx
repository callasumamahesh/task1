'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
  let user = false;

  const router = useRouter()

    const handlesignin = () => {
      router.push('/signin')
    }
    const handlesignup = () => {
      router.push('/signup')
    }

    const handleSignOut = () => {
      localStorage.removeItem('user')
      router.push('/signin')
    }

  return (
    <div className='flex-col gap-[10px] text-black w-[90%] h-[50px] ml-[5%] mt-[1rem] flex justify-evenly items-center sm:flex-row'>
        <h1>Take What You Want</h1>
        <section>
        {
            user ? <div className='flex gap-[1rem]'>
            <button className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]'>Cart</button>
            <button className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]' onClick={() => handleSignOut()}>Sign Out</button>
            </div> : <div className='flex gap-[1rem]'>
            <button onClick={() => handlesignin()} className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]'>Sign in</button>
            <button onClick={() => handlesignup()} className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]'>Sign up</button>
        </div>
        }
        </section>
    </div>
  )
}

export default Header