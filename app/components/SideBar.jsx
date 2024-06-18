'use client'
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Products from './Products';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(20);
  const [price, setPrice] = useState();
  const [name, setName] = useState('');
  const [searchAppear, setSearchAppear] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [navbar, setNavBar] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //       if(productsCount >= 20){
  //         setProductsCount(20)
  //       }
  //       else{
  //         setProductsCount((prev) => prev + 5);
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    fetchData();
  }, [productsCount]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products?limit=${productsCount}`);
      const res = await response.json();
      setData(res);
      setData1(res);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleSelect = (e) => {
    const selectedRating = e.target.value;
    const newData = data1.filter((item) => Math.floor(item.rating.rate) === Number(selectedRating));
    setData(newData);
  };

  const handleFilterByPrice = () => {
    if (price === '') {
      alert('Please Enter Price');
    } else {
      const newData = data1.filter((item) => item.price < price);
      setData(newData);
      setPrice('')
    }
  };

  const handleFilterByName = () => {  
      if(name===''){
        return 
      } 
      else{
        const newSearchItem = name;
        const newSearchList = [...searchList, newSearchItem];
        setSearchList(newSearchList);
      }
  };

  const handleFocus = () => {
    setSearchAppear(true);
  };

  const handleDebouncing = (enteredProduct) => {
    const newData = data1.filter((item) =>
      item.title.toLowerCase().includes(enteredProduct.toLowerCase())
    );
    setData(newData);
  };

  const handleSearch = (e) => {
    setName(e.target.value);
    setTimeout(() => {
      handleDebouncing(e.target.value);
    }, 500);
  };

  const handleCategory = async (category) => {
    setLoading(true);
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const res = await response.json();
    setData(res);
    setLoading(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <section>
      <div className={`flex flex-col h-screen ${isOpen ? 'w-64' : 'w-0'} transition-width duration-300 ease-in-out bg-gray-800 text-white`}>
        <div className="flex items-center justify-between p-4">
          <button onClick={toggleSidebar} className="text-white">
            <FaTimes />
          </button>
        </div>
        <div className={`flex-grow p-4 ${isOpen ? 'block' : 'hidden'}`}>

        <ul className='flex gap-[1rem] flex-col'>
              <li>Category</li>
              <li onClick={() => fetchData()}>All Products</li>
              <li onClick={() => handleCategory("men's clothing")}>Mens Clothing</li>
              <li onClick={() => handleCategory("women's clothing")}>Womens Clothing</li>
              <li onClick={() => handleCategory("electronics")}>Electronics</li>
              <li onClick={() => handleCategory("jewelery")}>Jewelery</li>
        </ul>
        </div>
      </div>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full"
        >
          <FaBars />
        </button>
      )}
      </section>
    <div>
      <Products data={data} loading={loading}/>
    </div>
    </div>
  );
}

export default SideBar;
