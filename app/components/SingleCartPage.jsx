
'use client'
import React, { Suspense } from 'react'
import Stars from './useStars'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

function SingleProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const totalItems = searchParams.get('item');
  const totalItemsParse = JSON.parse(totalItems);

  const handleRemoveCart = async (id) => {
    try {
      const userEmail = localStorage.getItem('useremail')
      const res = await fetch('/api/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Fix the Content-Type
        },
        body: JSON.stringify({ id, userEmail }),
      })
      const data = await res.json();
      if (data.message === "Item not found in cart") {
        Swal.fire('Item not found in cart')
      } else if (data.message === 'Item Removed') {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "product removed from your cart",
          showConfirmButton: false,
          timer: 1500
        });
      } 
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } 
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  return (
      <div className='w-full flex md:flex-row p-[2rem] flex-col'>
        <section className='w-full md:w-3/5 flex flex-col gap-[1rem] p-3'>
          <h1 className='text-[20px] font-bold'>{totalItemsParse.title}</h1>
          <p>{totalItemsParse.description}</p>
          <Stars rating={totalItemsParse.rating} />
          <p className='font-bold'>${totalItemsParse.price}</p>
          <div className='flex gap-[1rem] flex-col md:flex-row'>
            <button className='w-[200px] p-[10px] bg-gray-400 text-white rounded-[6px]' onClick={() => handleRemoveCart(totalItemsParse.id)}>Remove From Cart</button>
            <Link href={{
              pathname: '/buynow',
              query: { item: JSON.stringify(totalItemsParse) }
            }}>
              <button className='w-[200px] p-[10px] bg-gray-400 text-white rounded-[6px]'>Buy Now</button>
            </Link>
          </div>
        </section>
        <section className='sm:w-full md:w-2/5 flex justify-center'>
          <img className='w-[300px] h-[300px] float-center' src={totalItemsParse.image} />
        </section>
      </div>
  )
}

export default SingleProductPage