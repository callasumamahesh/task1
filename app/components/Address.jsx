import React from 'react'

function Address() {
    return (
        <div className='sm:w-4/5 lg:w-3/5 md:w-1/2 flex flex-col gap-[1rem]'>
            <h1 className='uppercase font-bold text-center'>Address</h1>
            <section className='flex-col flex gap-[1rem] lg:flex-row'>
                <input type="text" className='border-2 border-black p-[7px] outline-none rounded-[7px]' placeholder='Enter Your Name' />
                <input type="number" className='border-2 border-black p-[7px] outline-none rounded-[7px]' placeholder='Enter Your Phone Number' />
            </section>
            <textarea name="" id="" cols="30" rows="10" className='border-2 border-black p-[7px] outline-none rounded-[7px]' placeholder='Enter your Address'></textarea>
            <button>Next</button>
        </div>
    )
}

export default Address