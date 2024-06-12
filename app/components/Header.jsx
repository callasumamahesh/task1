'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

function Header() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize localStorage item if it doesn't exist
    if (localStorage.getItem('isuser') === null) {
      localStorage.setItem('isuser', 'false');
    }

    // Set initial state from localStorage
    setUser(localStorage.getItem('isuser') === 'true');

    // Event listener for localStorage changes
    const handleStorageChange = () => {
      setUser(localStorage.getItem('isuser') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleCart = () => {
    router.push('/cart')
  }

  const handleSignOut = () => {
    localStorage.setItem('isuser', 'false');
    window.dispatchEvent(new Event('storage')); // Trigger the storage event manually
    router.push('/signin');
  };

  return (
    <div className='flex-col gap-[10px] text-black w-[100%] h-[50px] mt-[1rem] flex justify-evenly items-center sm:flex-row'>
      <section className='flex justify-center items-center gap-[1rem] w-[50%] text-center'>
      <FaHome onClick={() => router.push('/') } className='cursor-pointer text-[1.3rem]'/>
      <h1>Take What You Want</h1>
      </section>
      <section className='w-[50%] flex justify-center'>
        {
          user ? <div className='flex gap-[2rem]'>
            <button className='w-[100px] bg-gray-400 p-[10px] flex justify-center items-center text-white text-[1.5rem] rounded-[7px]' onClick={() => handleCart()}><FaShoppingCart/></button>
            <button className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]' onClick={handleSignOut}>Sign Out</button>
          </div> : <div className='flex gap-[2rem]'>
            <button onClick={handleSignIn} className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]'>Sign in</button>
            <button onClick={handleSignUp} className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]'>Sign up</button>
          </div>
        }
      </section>
    </div>
  );
}

export default Header;

