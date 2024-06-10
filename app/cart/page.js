'use client'

import React, { useEffect, useState } from 'react'
import Products from '../components/Products'
import LoadingSpinner from '../components/Loading'
import Link from 'next/link'
import Stars from '../components/useStars'
function Cart() {
    const [cartProducts, setCartProducts] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = localStorage.getItem('useremail')
                const res = await fetch('/api/yourcart', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({userEmail})
                })
                const data = await res.json()
                setCartProducts(data.cartItems)
                setLoading(false)
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            <h1 className='text-center font-bold text-[1.5rem]'>Your Cart</h1>
        <main>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="grid gap-1 grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {cartProducts.map((item, i) => (
            <Link key={i} href={{
              pathname: '/single-cart-product',
              query: { item: JSON.stringify(item)}
            }}>
              <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] flex flex-col justify-center rounded-[10px] m-[1rem] items-center hover:bg-gray-300 border-4 p-2 cursor-pointer">
                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" src={item.image} width={200} height={200} alt={item.title} />
                <p className="text-center md:p-2 p-[6px]">{item.title.slice(0, 10)}</p>
                <p className="text-center md:p-2 p-[6px] font-bold">{`$ ${item.price}`}</p>
                <p className="text-center"><Stars className="font-size-[1rem] bg-yellow-500" rating={item.rating.rate} /></p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
        </div>
    )
}

export default Cart