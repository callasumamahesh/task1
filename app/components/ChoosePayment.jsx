import React from 'react'

function ChoosePayment() {
  return (
    <div className='sm:w-4/5 lg:w-3/5 md:w-1/2 flex flex-col gap-[1rem] justify-center items-center mt-[1rem]'>
        <h1 className='font-bold text-black-800 text-[1rem]'>Choose A Payment Method</h1>
        <section className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] rounded-[10px] w-[300px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src="../gpay.png" alt="phonepay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3]'>Credit Card.</span>
        </section>
        <section className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] rounded-[10px] w-[300px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src="../gpay.png" alt="phonepay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3]'>UPI.</span>
        </section>
        <section className='cursor-pointer bg-white-500 flex gap-[1rem] border-2 border-black p-[10px] rounded-[10px] w-[300px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
            {/* <img src="../gpay.png" alt="phonepay" className='w-[1/3] flex justify-center items-center'/> */}
            <span className='w-[2/3]'>Cash On Delivery.</span>
        </section>
    </div>
  )
}

export default ChoosePayment