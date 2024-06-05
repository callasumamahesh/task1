'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Page() {
  const [password1,setPassword1] = useState(false)
  const [password2,setPassword2] = useState(false)
  const [details,setDetails] = useState({email : '',password1: '',password2:''})
  let router = useRouter()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const handleSignUp = () => {
    if(details.email | details.password1 | details.password2 === ''){
      alert('Fields should not be Empty') 
    }
    else if(details.password1 != details.password2){
      alert('Passwords are Not Matching')
    }
    else{
      console.log(details);
    }
  }

  const handlePasswordToggle = () => {
    setPassword1(!password1)
  };

  const handlePassword = () => {
    setPassword2(!password2)
  };

  return (
    <main className='w-full h-[80vh] flex justify-center items-center'>
      <article className='p-[28px] flex flex-col items-center justify-center gap-[1rem] border-[2px] border-black p-[70px] rounded-[1rem] md:p-[70px]'>
        <h1 className='font-bold text-[1.5rem]'>Create An Account</h1>
        <input className='outline-none w-[300px] border-[2px] border-black p-[10px] rounded-[5px]' 
        onChange={(e) => handleChange(e)}
        name='email' value={details.email} type='text' placeholder = 'Enter Your Email'/>
        <section className='flex justify-center items-center w-[300px] border-[2px] border-black rounded-[5px]'>
          <input id='Password1' className = 'outline-none p-[10px] w-[250px]' onChange={(e) => handleChange(e)} type={password1 ? 'text' : 'password'} placeholder='Enter Password' name='password1' value={details.password1}/>
          <div className='cursor-pointer p-[10px]' onClick={() => handlePasswordToggle()}>
          {
            password1 ? <IoEyeOff /> : <IoEye />
          }
          </div>
        </section>
        <section className='flex justify-center items-center w-[300px] border-[2px] border-black rounded-[5px]'>
          <input id='Password2' className = 'outline-none p-[10px] w-[250px]' onChange={(e) => handleChange(e)} type={password2 ? 'text ' : 'password'} placeholder='Enter Password' name='password2' value={details.password2}/>
          <div className='cursor-pointer p-[10px]' onClick={() => handlePassword()}>
          {
            password2 ? <IoEyeOff /> : <IoEye />
          }
          </div>
        </section>
        <button className='w-[200px] bg-gray-400 p-[10px] rounded-[7px] text-white' onClick={() => handleSignUp()}>Sign Up</button>
        <p>Already a User <span className='text-blue-600 underline cursor-pointer' onClick={() => router.push('/signin')}>Sign in</span></p>
      </article>
    </main>
  )
}

export default Page