import { IoMenu, IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Stars from './useStars';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  handleSelect,
  handleSearch,
  handleFilterByName,
  handleSorting,
  handleFilterByPriceRange,
  priceRange,
  setPriceRange,
  searchList,
  searchAppear,
  setSearchAppear
}) => {
  const handleFocus = () => {
    setSearchAppear(true);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className="flex justify-between items-center mb-4 md:hidden">
        {isOpen ? (
          <button onClick={toggleSidebar}>
            <IoClose size={24} />
          </button>
        ) : (
          <button onClick={toggleSidebar}>
            <IoMenu size={24} />
          </button>
        )}
        <h2 className="text-xl font-bold">Menu</h2>
      </div>
      <main className="flex flex-col gap-4">
        <select onChange={handleSelect} className="border-2 h-12 p-2">
          <option value="1" name={`1Star`}><Stars rating={1} /></option>
          <option value="2" name={`2Star`}><Stars rating={2} /></option>
          <option value="3" name={`3Star`}><Stars rating={3} /></option>
          <option value="4" name={`4Star`}><Stars rating={4} /></option>
          <option value="5" name={`5Star`}><Stars rating={5} /></option>
        </select>
        <section className="flex flex-col" onFocus={handleFocus} onBlur={() => { setSearchAppear(false); handleFilterByName(); }}>
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
        <div className="flex">
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
    </div>
  );
}

export default Sidebar;
