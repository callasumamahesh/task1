import React, { useState } from 'react'
//import {Gpay} from '../../gpay.png'
function AddPayment() {
    const [phoneInput,setPhoneInput] = useState(false)
    const [showSaveButton,setShowSaveButton] = useState(false)
    const handleMethodType = () => {
        setPhoneInput(true)
    }

    const handlePhoneNumber = (e) => {
        if(e.target.value.length === 10){
            setShowSaveButton(true)
        }
        else{
            setShowSaveButton(false)
        }
    }

  return (
    <div className='sm:w-4/5 lg:w-3/5 md:w-1/2 flex flex-col gap-[1rem] justify-center items-center mt-[1rem]'>
        <h1 className='font-bold text-black-800 text-[1rem]'>Select A Method</h1>
        <section onClick={() => handleMethodType()} className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] rounded-[10px] w-[300px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src="../gpay.png" alt="phonepay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3]'>Phone Pay</span>
        </section>
        <section onClick={() => handleMethodType()} className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] w-[300px]  rounded-[10px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src='../gpay.png' alt="googlepay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3] flex justify-center'>Google Pay</span>
        </section>
        <section onClick={() => handleMethodType()} className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] w-[300px]  rounded-[10px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src="../rupay.png" alt="rupay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3]'>RuPay</span>
        </section>
        {
            phoneInput ?<section className='w-[350px] flex  gap-[10px]'>
            <input className='border-2 border-black p-[8px] rounded-[7px] outline-none' type="number" placeholder='Enter Your Payment Number' onChange={(e) => handlePhoneNumber(e)}/>
            {
                showSaveButton ? 
                <button className='p-[8px] rounded-[10px] text-white w-[100px] bg-gray-400'>Save</button>
                :<></>
            }
        </section> : <></>
        }
    </div>
  )
}

export default AddPayment