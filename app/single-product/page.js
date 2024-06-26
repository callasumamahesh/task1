"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Stars from '../components/useStars';
import LoadingSpinner from '../components/Loading';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';

function Page() {
  return (
    <Suspense fallback={<div><LoadingSpinner /></div>}>
      <InnerPage />
    </Suspense>
  );
}

function InnerPage() {
  const searchParams = useSearchParams();
  const totalItems = searchParams.get('item');
  const totalItemsParse = JSON.parse(totalItems);
  const [similarCategory, setSimilarCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('useremail')
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/category/${totalItemsParse.category}`);
      const data = await res.json();
      const filterData = data.filter((item) => item.id != totalItemsParse.id);
      setSimilarCategory(filterData);
      setLoading(false);
    };
    fetchData();
  }, [totalItemsParse.category, totalItemsParse.id]);


  const handleCart = async () => {
    try{
      const isuserinLocal = localStorage.getItem('isuser1');

      if(isuserinLocal == null){
        Swal.fire({
          title: "For adding products into your cart you should signup first",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
      }
      else{
        const res = await fetch('/api/cart',{
          method : 'POST',
          body: JSON.stringify({userEmail:userEmail,id:totalItemsParse.id,title:totalItemsParse.title,price:totalItemsParse.price,description:totalItemsParse.description,category:totalItemsParse.category,image:totalItemsParse.image,rating:totalItemsParse.rating.rate}),
          headers : {
            'Content-type':'json/application',
          },
        })
        const data = await res.json()
        if(data.message === 'Product Added'){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Product added to your cart",
            showConfirmButton: false,
            timer: 1500
          });
          
        } 
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    }
    catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  const handleBuynow = () => {
    const isuserinLocal = localStorage.getItem('isuser1');
    if(isuserinLocal == null){
      Swal.fire({
        title: "To buy the products you first signup",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }
  }

  return (
    <div className='w-full flex flex-col overflowy-hidden'>
      <main className='w-full flex md:flex-row p-[2rem] flex-col'>
        <section className='w-full md:w-3/5 flex flex-col gap-[1rem] p-3'>
          <h1 className='text-[20px] font-bold'>{totalItemsParse.title}</h1>
          <p>{totalItemsParse.description}</p>
          <Stars rating={totalItemsParse.rating.rate} />
          <p className='font-bold'>${totalItemsParse.price}</p>
          <div className='flex gap-[1rem] flex-col md:flex-row'>
            <button className='w-[200px] p-[10px] bg-gray-400 text-white rounded-[6px]' onClick={() => handleCart()}>Add to Cart</button>
            {/* <button className='w-[150px] p-[10px] bg-gray-400 text-white rounded-[6px]' onClick={() => handleBuynow()}>Buy Now</button> */}
            <Link href={{
              pathname:'/buynow',
              query: { item: JSON.stringify(totalItemsParse) }
            }}>
              <button className='w-[200px] p-[10px] bg-gray-400 text-white rounded-[6px]' onClick={() => handleBuynow()}>Buy Now</button>
            </Link>
          </div>
        </section>
        <section className='sm:w-full md:w-2/5 flex justify-center'>
          <img className='w-[300px] h-[300px] float-center' src={totalItemsParse.image} />
        </section>

      </main>
      <section>
      <h1 className='font-bold text-center'>Similar Category</h1>
      {loading ? <LoadingSpinner /> : 
        <main className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {similarCategory.map((item, i) => (
            <Link className="m-4" key={i} href={{
              pathname: '/single-product',
              query: { item: JSON.stringify(item) }
            }}>
              <div className="shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-[10px] flex flex-col justify-center items-center hover:bg-gray-300 border-4 p-2 cursor-pointer" >
                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]" src={item.image} alt='ProductImage'/>
                <p className="text-center md:p-2 p-[6px]">{item.title.slice(0, 10)}</p>
                <p className="text-center md:p-2 p-[6px] font-bold">{`$ ${item.price}`}</p>
                <p className="text-center"><Stars className="font-size-[1rem] bg-yellow-500" rating={item.rating.rate} /></p>
              </div>
            </Link>
          ))}
        </main>
      }
      </section>
    </div>
  )
}

export default Page