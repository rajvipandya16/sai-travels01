import React from 'react'
import { easeOut, motion } from 'framer-motion';
import { TbArrowsExchange } from 'react-icons/tb';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const Search = ({ from, setFrom, to, setTo, date, setDate, onSearch, loading }) => {
  const handleExchange = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 2.15, ease: easeOut }}
      className="w-full bg-neutral-50/20 border-2 border-neutral-300 shadow-lg rounded-xl p-3 sm:p-5"
    >
      <div className="w-full flex flex-col lg:flex-row items-center gap-3 sm:gap-5 justify-between">
        {/* From and to input section */}
        <div className="w-full lg:w-[60%] flex flex-col sm:flex-row items-center gap-3 sm:gap-5 relative">
          {/* From */}
          <div className="w-full sm:w-1/2 h-12 sm:h-14 border border-neutral-300 bg-white/70 text-sm sm:text-base text-neutral-700 font-medium px-3 sm:px-5 flex items-center gap-x-1 rounded-lg relative">
            <input
              type="text"
              placeholder="From"
              className="flex-1 h-full border-none bg-transparent focus:outline-none text-sm sm:text-base"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          {/* To */}
          <div className="w-full sm:w-1/2 h-12 sm:h-14 border border-neutral-300 bg-white/70 text-sm sm:text-base text-neutral-700 font-medium px-3 sm:px-5 flex items-center gap-x-1 rounded-lg relative">
            <input
              type="text"
              placeholder="To"
              className="flex-1 h-full border-none bg-transparent focus:outline-none text-sm sm:text-base"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          {/* Exchange Button */}
          <button
            type="button"
            className="absolute w-8 h-8 sm:w-11 sm:h-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-primary hover:bg-white"
            onClick={handleExchange}
          >
            <TbArrowsExchange className='w-4 h-4 sm:w-6 sm:h-6 text-neutral-50 hover:text-red-500' />
          </button>
        </div>
        {/* date and button section */}
        <div className="w-full lg:flex-1 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          {/* Date */}
          <div className="w-full sm:w-1/2 h-12 sm:h-14 border border-neutral-300 bg-white/70 text-sm sm:text-base text-neutral-700 font-medium px-3 sm:px-5 flex items-center gap-x-1 rounded-lg">
            <input
              type="date"
              className="flex-1 h-full border-none bg-transparent focus:outline-none text-sm sm:text-base"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          {/* Search Button */}
          <button
            className="w-full sm:w-fit px-4 sm:px-5 h-12 bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-sm sm:text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300"
            onClick={onSearch}
            disabled={loading}
          >
            <FaSearch className="w-4 h-4" />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Search
