


// 'use client';
// import React, { useState, lazy, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Stars from '../components/useStars';

// const Address = lazy(() => import('../components/Address'));
// const AddPayment = lazy(() => import('../components/AddPayment'));
// const ChoosePayment = lazy(() => import('../components/ChoosePayment'));
// const CheckOut = lazy(() => import('../components/CheckOut'));
// const Finish = lazy(() => import('../components/Finish'));



// function BuyNow() {
//   const searchParams = useSearchParams();
//   const totalItems = searchParams.get('item');
//   const totalItemsParse = JSON.parse(totalItems);

//   const [step, setStep] = useState(0);

//   const handleNext = () => setStep((prevStep) => prevStep + 1);
//   const handleStep = (stepNumber) => () => setStep(stepNumber);

//   return (
//     <div>
//       <h1 className="text-center mt-4 font-bold md:mt-2">Steps To Buy A Product</h1>
//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-10 mx-auto flex flex-wrap">
//           <div className="flex flex-wrap w-full">
//             <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
//               {['Add Your Address', 'Add Payment Methods', 'Choose A Payment Method', 'Check Out', 'Shipping and Delivery'].map((title, index) => (
//                 <div key={index} className="flex relative pb-12">
//                   <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
//                     <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
//                   </div>
//                   <div onClick={handleStep(index)} className="cursor-pointer flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
//                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
//                       <path d={index === 0 ? "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" : index === 1 ? "M22 12h-4l-3 9L9 3l-3 9H2" : index === 2 ? "M12 22V8M5 12H2a10 10 0 0020 0h-3" : index === 3 ? "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" : "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"}></path>
//                     </svg>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">STEP {index + 1}</h2>
//                     <p className="leading-relaxed">{title}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="lg:w-3/5 md:w-full flex flex-col justify-center items-center">
//               {step === 0 && (
//                 <>
//                   <img className="lg:w-4/5 md:w-4/5 object-cover object-center rounded-lg md:mt-0 mt-12" src="https://www.amazonlistingservice.com/wp-content/uploads/2022/04/step-by-step-guide-on-how-to-sell-products-on-amazon.jpg" alt="step" />
//                   <button onClick={handleNext} className="w-24 bg-gray-500 p-2 text-white rounded mt-[1rem]">Next</button>
//                 </>
//               )}
//               {step === 1 && (
//                 <>
//                   <Suspense fallback={<div>Loading Address...</div>}>
//                     <Address />
//                   </Suspense>
//                   <button onClick={handleNext} className="w-24 bg-gray-500 p-2 text-white rounded mt-[1rem]">Next</button>
//                 </>
//               )}
//               {step === 2 && (
//                 <>
//                   <Suspense fallback={<div>Loading Add Payment...</div>}>
//                     <AddPayment />
//                   </Suspense>
//                   <button onClick={handleNext} className="w-24 bg-gray-500 p-2 text-white rounded mt-[1rem]">Next</button>
//                 </>
//               )}
//               {step === 3 && (
//                 <>
//                   <Suspense fallback={<div>Loading Choose Payment...</div>}>
//                     <ChoosePayment />
//                   </Suspense>
//                   <button onClick={handleNext} className="w-24 bg-gray-500 p-2 text-white rounded mt-[1rem]">Next</button>
//                 </>
//               )}
//               {step === 4 && (
//                 <>
//                   <div className="sm:w-4/5 lg:w-full md:w-full flex flex-col gap-4">
//                     <h1 className="uppercase font-bold text-center">Check Out the Product</h1>
//                     <section className="w-full flex flex-col lg:flex-row">
//                       <section className="w-full flex flex-col gap-4 p-3">
//                         <h1 className="text-2xl font-bold">{totalItemsParse.title}</h1>
//                         <p>{totalItemsParse.description}</p>
//                         <Stars rating={totalItemsParse.rating.rate} />
//                         <p className="font-bold">${totalItemsParse.price}</p>
//                         <div className="flex gap-4">
//                           <button className="w-48 p-2 bg-gray-500 text-white rounded mt-[1rem] " onClick={handleNext}>Check Out</button>
//                         </div>
//                       </section>
//                       <section className="sm:w-full flex justify-center">
//                         <img className="w-72 h-72" src={totalItemsParse.image} alt={totalItemsParse.title} />
//                       </section>
//                     </section>
//                   </div>
//                 </>
//               )}
//               {step === 5 && (
//                 <Suspense fallback={<div>Loading Finish...</div>}>
//                   <Finish />
//                 </Suspense>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default BuyNow;


// pages/buynow.js
import React, { Suspense } from 'react';
 // Adjust the import path based on your project structure
import Buyproduct from '../components/Buyproduct'
import LoadingSpinner from '../components/Loading';

function BuyNowPage() {
  return (
    <Suspense fallback={<div><LoadingSpinner /></div>}>
      <Buyproduct />
    </Suspense>
  );
}

export default BuyNowPage;
