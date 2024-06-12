import React, { useState } from 'react'
import LoadingSpinner from './Loading'
function Finish() {
    const [loading,setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    },[1000])
  return (
    <div className='sm:w-4/5 lg:w-3/5 md:w-1/2 flex flex-col gap-[1rem]'>
        {
            loading ? <LoadingSpinner /> : 
            <div>
                <h1 className='font-bold text-center text-[1.5rem]'>Your Product is Booked</h1> 
            </div>
        }
    </div>
  )
}

export default Finish