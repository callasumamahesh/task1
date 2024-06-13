'use client'
import React, { useState } from 'react'
import Address from './Address';
import AddPayment from './AddPayment';
import ChoosePayment from './ChoosePayment';
import { useSearchParams } from 'next/navigation';
import CheckOut from './CheckOut';
import Stars from '../components/useStars';
import Finish from './Finish';

function BuyNow() {
    const searchParams = useSearchParams()
    const totalItems = searchParams.get('item')
    const totalItemsParse = JSON.parse(totalItems)

    const [image, setImage] = useState(true)
    const [address, setAddress] = useState(false);
    const [addmethod, setAddMethod] = useState(false)
    const [choosemethod, setChooseMethod] = useState(false)
    const [checkout, setCheckout] = useState(false)
    const [final,setFinal] = useState(false)

    const handleAddress = () => {
        setImage(false)
        setAddMethod(false)
        setAddress(true)
        setChooseMethod(false)
        setFinal(false)
        setCheckout(false)
    }
    const handlePaymentMethod = () => {
        setImage(false)
        setAddress(false)
        setAddMethod(true)
        setCheckout(false)
        setFinal(false)
        setChooseMethod(false)
    }
    const handlechooseMethod = () => {
        setImage(false)
        setAddress(false)
        setAddMethod(false)
        setCheckout(false)
        setChooseMethod(true)
        setFinal(false)

    }
    const handleCheckOut = () => {
        setImage(false)
        setAddress(false)
        setAddMethod(false)
        setCheckout(true)
        setFinal(false)
        setChooseMethod(false)
    }
    const handleFinal = () => {
        setFinal(true)
        setImage(false)
        setAddress(false)
        setAddMethod(false)
        setCheckout(false)
        setChooseMethod(false)
    }
    return (
        <div>
            <h1 className='text-center mt-[1rem] font-bold md:mt-[10px]'>Steps To Buy A Product</h1>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div onClick={() => handleAddress()} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" storkelinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 1</h2>
                                    <p className="leading-relaxed">Add Your Address.</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div onClick={() => handlePaymentMethod()} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" storkelinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 2</h2>
                                    <p className="leading-relaxed">Add Payment Methods.</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div onClick={() => handlechooseMethod()} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" storkelinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <circle cx="12" cy="5" r="3"></circle>
                                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 3</h2>
                                    <p className="leading-relaxed">Choose A Payment Method.</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                </div>
                                <div onClick={() => handleCheckOut()} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" storkelinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP 4</h2>
                                    <p className="leading-relaxed">Check Out</p>
                                </div>
                            </div>
                            <div className="flex relative">
                                <div onClick={() => handleFinal()} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" storkelinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                        <path d="M22 4L12 14.01l-3-3"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">FINISH</h2>
                                    <p className="leading-relaxed">Shipping and Delivery.</p>
                                </div>
                            </div>
                        </div>
                        {
                            image ? <>
                                <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src="https://www.amazonlistingservice.com/wp-content/uploads/2022/04/step-by-step-guide-on-how-to-sell-products-on-amazon.jpg" alt="step" />
                                <button onClick={() => handleAddress()} className='w-[100px] bg-gray-500 p-[10px] text-white rounded-[7px]' >Next</button>
                            </> : <></>
                        }
                        {
                            address ? <>
                                <Address />
                                <button onClick={() => handlePaymentMethod()} className='w-[100px] bg-gray-500 p-[10px] text-white rounded-[7px]' >Next</button>

                            </> : <></>
                            // <img className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" src="https://www.amazonlistingservice.com/wp-content/uploads/2022/04/step-by-step-guide-on-how-to-sell-products-on-amazon.jpg" alt="step" />
                        }
                        {
                            addmethod ? <>
                                <AddPayment />
                                <button onClick={() => handlechooseMethod()} className='w-[100px] bg-gray-500 p-[10px] text-white rounded-[7px]' >Next</button>
                            </> : <></>
                        }
                        {
                            choosemethod ?
                                <>
                                    <ChoosePayment />
                                    <button onClick={() => handleCheckOut()} className='w-[100px] bg-gray-500 p-[10px] text-white rounded-[7px]' >Next</button>
                                </> : <></>
                        }
                        {
                            checkout ? 
                            <>
                            <div className='sm:w-4/5 lg:w-3/5 md:w-1/2 flex flex-col gap-[1rem]'>
                                <h1 className='uppercase font-bold text-center'>Check Out the Product</h1>
                                <section className='w-full flex flex-col lg:flex-row'>
                                <section className='w-full flex flex-col gap-[1rem] p-3'>
                                    <h1 className='text-[20px] font-bold'>{totalItemsParse.title}</h1>
                                    <p>{totalItemsParse.description}</p>
                                    <Stars rating={totalItemsParse.rating} />
                                    <p className='font-bold'>${totalItemsParse.price}</p>
                                    <div className='flex gap-[1rem]'>
                                        <button className='w-[200px] p-[10px] bg-gray-500 text-white rounded-[6px]' onClick={() => handleFinal()} >Check Out</button>
                                    </div>
                                </section>
                                <section className='sm:w-full flex justify-center'>
                                    <img className='w-[300px] h-[300px] float-center' src={totalItemsParse.image} />
                                </section>
                                </section>

                            </div> 
                            <button onClick={() => handleFinal()} className='w-[100px] bg-gray-400 p-[10px] text-white rounded-[7px]' >Next</button>
                            </>
                            : <></>
                        }
                            {
                                final ? <Finish/> : <></>
                            }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BuyNow