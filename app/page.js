'use client';
import React, { useState, useEffect } from 'react';
import Stars from './components/useStars';
import { IoMenu } from "react-icons/io5";
import Products from './components/Products';
import { FiSearch } from "react-icons/fi";

function Page() {
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(20);
  const [price, setPrice] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [name, setName] = useState('');
  const [searchAppear, setSearchAppear] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [navbar, setNavBar] = useState(false);

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
      setPrice('');
    }
  };

  const handleFilterByPriceRange = () => {
    const newData = data1.filter((item) => item.price <= priceRange);
    setData(newData);
  };

  const handleFilterByName = () => {
    if (name === '') {
      return;
    } else {
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

  const handleSorting = async (e) => {
    const value = e.target.value;
    if (value === 'highestprice' || value === 'lowestprice') {
      let sortedData = [...data];
      if (value === 'highestprice') {
        sortedData.sort((a, b) => b.price - a.price);
      } else if (value === 'lowestprice') {
        sortedData.sort((a, b) => a.price - b.price);
      }
      setData(sortedData);
    } else if (value === 'allproducts') {
      fetchData();
    } else {
      handleCategory(value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mt-4 items-center md:hidden">
        <span className='cursor-pointer' onClick={() => setNavBar(!navbar)}><IoMenu /></span>
        <span className="m-2 text-center font-bold">Select Your Item</span>
      </div>
      <section className={`${navbar ? 'block' : 'hidden'} md:block w-full flex flex-col items-center mb-8`}>
        <main className="w-full h-auto flex flex-col justify-center items-center mb-3">
          <h1 className="hidden md:block m-2 text-center font-bold">Select your Item</h1>
        </main>
        <main className="flex flex-col md:flex-row flex-wrap md:items-center justify-evenly gap-3">
          <select onChange={handleSelect} className="border-2 h-12 p-2">
            <option value="1" name={`1Star`}><Stars rating={1} /></option>
            <option value="2" name={`2Star`}><Stars rating={2} /></option>
            <option value="3" name={`3Star`}><Stars rating={3} /></option>
            <option value="4" name={`4Star`}><Stars rating={4} /></option>
            <option value="5" name={`5Star`}><Stars rating={5} /></option>
          </select>
          <section className="flex flex-col justify-center items-center" onFocus={handleFocus} onBlur={() => { setSearchAppear(false); handleFilterByName(); }}>
            <div className="flex justify-center items-center border-2 border-black-900 w-64">
              <input type="text" onChange={handleSearch} placeholder="Enter Product Name" className="p-2 outline-none w-52" />
              <FiSearch className='text-2xl' />
            </div>
            <div className="w-full flex justify-center">
              {searchList.length > 0 && searchAppear &&
                <div className="mt-4 bg-gray-100 w-full h-auto max-h-52 overflow-y-auto rounded-md">
                  {searchList.map((item, i) => (
                    <div key={i} className="flex gap-5 cursor-pointer hover:bg-white m-1 rounded-md">
                      <p className="m-2 p-2 text-center">{item}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          </section>
          <div className="flex justify-center items-center">
            <label htmlFor='sort' className='p-2'>
              Sort by
            </label>
            <select onChange={handleSorting} id='sort' className='border-2 h-auto p-2'>
              <option value='allproducts'>All Products</option>
              <option value='highestprice'>Highest Price</option>
              <option value='lowestprice'>Lowest Price</option>
              <option value="men's clothing">Mens Clothing</option>
              <option value="women's clothing">Womens Clothing</option>
              <option value='electronics'>Electronics</option>
              <option value='jewelery'>Jewelery</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-4">
            <label htmlFor='priceRange' className='p-2'>Filter by Price</label>
            <div className='flex flex-col justify-center items-center'>
              <input
                type="range"
                id="priceRange"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-2"
              />
              <span>Up to ${priceRange}</span>
            </div>
            <button onClick={handleFilterByPriceRange} className="text-white w-24 h-10 bg-gray-400 rounded-md">Filter</button>
          </div>
        </main>
      </section>

      <Products data={data} loading={loading} />
    </div>
  );
}


export default Page;
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { IoMenu } from "react-icons/io5";
// import Products from './components/Products';
// import Sidebar from './components/Sidebar';

// function Page() {
//   const [loading, setLoading] = useState(true);
//   const [productsCount, setProductsCount] = useState(20);
//   const [price, setPrice] = useState('');
//   const [priceRange, setPriceRange] = useState(1000);
//   const [name, setName] = useState('');
//   const [searchAppear, setSearchAppear] = useState(false);
//   const [data, setData] = useState([]);
//   const [data1, setData1] = useState([]);
//   const [searchList, setSearchList] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [productsCount]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://fakestoreapi.com/products?limit=${productsCount}`);
//       const res = await response.json();
//       setData(res);
//       setData1(res);
//       setLoading(false);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSelect = (e) => {
//     const selectedRating = e.target.value;
//     const newData = data1.filter((item) => Math.floor(item.rating.rate) === Number(selectedRating));
//     setData(newData);
//   };

//   const handleFilterByPrice = () => {
//     if (price === '') {
//       alert('Please Enter Price');
//     } else {
//       const newData = data1.filter((item) => item.price < price);
//       setData(newData);
//       setPrice('');
//     }
//   };

//   const handleFilterByPriceRange = () => {
//     const newData = data1.filter((item) => item.price <= priceRange);
//     setData(newData);
//   };

//   const handleFilterByName = () => {
//     if (name === '') {
//       return;
//     } else {
//       const newSearchItem = name;
//       const newSearchList = [...searchList, newSearchItem];
//       setSearchList(newSearchList);
//     }
//   };

//   const handleFocus = () => {
//     setSearchAppear(true);
//   };

//   const handleDebouncing = (enteredProduct) => {
//     const newData = data1.filter((item) =>
//       item.title.toLowerCase().includes(enteredProduct.toLowerCase())
//     );
//     setData(newData);
//   };

//   const handleSearch = (e) => {
//     setName(e.target.value);
//     setTimeout(() => {
//       handleDebouncing(e.target.value);
//     }, 500);
//   };

//   const handleCategory = async (category) => {
//     setLoading(true);
//     const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
//     const res = await response.json();
//     setData(res);
//     setLoading(false);
//   };

//   const handleSorting = async (e) => {
//     const value = e.target.value;
//     if (value === 'highestprice' || value === 'lowestprice') {
//       let sortedData = [...data];
//       if (value === 'highestprice') {
//         sortedData.sort((a, b) => b.price - a.price);
//       } else if (value === 'lowestprice') {
//         sortedData.sort((a, b) => a.price - b.price);
//       }
//       setData(sortedData);
//     } else if (value === 'allproducts') {
//       fetchData();
//     } else {
//       handleCategory(value);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         isOpen={isOpen}
//         toggleSidebar={toggleSidebar}
//         handleSelect={handleSelect}
//         handleSearch={handleSearch}
//         handleFilterByName={handleFilterByName}
//         handleSorting={handleSorting}
//         handleFilterByPriceRange={handleFilterByPriceRange}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         searchList={searchList}
//         searchAppear={searchAppear}
//         setSearchAppear={setSearchAppear}
//       />
//       <div className="flex-1 ml-64 md:ml-0">
//         <div className="flex justify-center gap-4 mt-4 items-center md:hidden">
//           <button onClick={toggleSidebar}>
//             <IoMenu size={24} />
//           </button>
//           <span className="m-2 text-center font-bold">Select Your Item</span>
//         </div>
//         <Products data={data} loading={loading} />
//       </div>
//     </div>
//   );
// }

// export default Page;
