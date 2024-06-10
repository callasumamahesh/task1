'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({ email: '', password: '' });
  let router = useRouter();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = async () => {
    if(details.email === '' || details.password === ''){
      alert('Fields should not be Empty') 
    }
    else{
      console.log(details);
      try {
        const res = await fetch('/api/isuser',{
          method : 'POST',
          body : JSON.stringify({email : details.email,password : details.password}),
          headers : {
            'Content-Type':'application/json'
          }
        })
        const data = await res.json()
        if(res.ok){
          if(data.message === 'User Not Found'){
            alert(data.message)
          }
          else if(data.message === 'check Your Password Once'){
            alert(data.message)
          }
          else if(data.message === 'Something Wrong'){
            alert(data.message)
          }
          else{
            localStorage.setItem('isuser',true);
            localStorage.setItem('useremail',details.email)
            window.dispatchEvent(new Event('storage'));
            router.push('/')
          }
        }
        else{
          console.log('Something Wrong');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className='w-full h-[80vh] flex justify-center items-center'>
      <article className='p-[28px] flex flex-col items-center justify-center gap-[1.5rem] border-[2px] border-black rounded-[1rem] md:p-[70px]'>
        <h1 className='font-bold text-[1.5rem]'>Login</h1>
        <input
          className='outline-none w-[300px] border-[2px] border-black p-[10px] rounded-[5px]'
          onChange={(e) => handleChange(e)}
          name='email'
          value={details.email}
          type='text'
          placeholder='Enter Your Email'
        />
        <section className='flex justify-center items-center w-[300px] border-[2px] border-black rounded-[5px]'>
          <input
            className='outline-none p-[10px] w-full'
            onChange={(e) => handleChange(e)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password'
            value={details.password}
          />
          <div className='cursor-pointer p-[10px]' onClick={handlePasswordToggle}>
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </section>
        <button className='w-[200px] bg-gray-400 p-[10px] rounded-[7px] text-white' onClick={() => handleSignin()}>
          Sign In
        </button>
        <p>
          New User <span className='text-blue-600 underline cursor-pointer' onClick={() => router.push('/signup')}>Sign up
          </span>
        </p>
      </article>
    </main>
  );
}

export default Page;
