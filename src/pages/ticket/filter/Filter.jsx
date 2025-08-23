import React from 'react'
import PriceRangeSlider from '../../../components/pricerange/PriceRangeSlider';
import { FaChargingStation, FaFan, FaMusic, FaTv, FaWifi } from 'react-icons/fa';
import { FaBottleWater, FaPlateWheat } from 'react-icons/fa6';

const Filter = ({ className, minPrice, maxPrice, setMinPrice, setMaxPrice, busType, setBusType, onFilter }) => {
  const handleRangeChange = ({ min, max }) => {
    setMinPrice(min);
    setMaxPrice(max);
    onFilter();
  };

  const handleBusTypeChange = (e) => {
    setBusType(e.target.value);
    onFilter();
  };

  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-xl  text-neutral-700 font-semibold">Apply Filters</h1>
      {/* Price Filter */}
      <div className="w-full border border-neutral-300 rounded-xl p-4 space-y-1">
        <h1 className="text-lg  text-neutral-600 font-medium">Apply Filters</h1>
        <PriceRangeSlider
          min={500}
          max={3000}
          onChange={handleRangeChange}
          valueStyle={{}}
        />
      </div>
      {/* Bus Types Filter */}
      <div className="w-full border border-neutral-300 rounded-xl p-4 space-y-3">
        <h1 className="text-lg  text-neutral-600 font-medium">Bus Types</h1>
        <div className="space-y-2.5">
          <div className="w-full flex items-center gap-2">
            <input type="radio" id='ac' name='busType' value='AC' checked={busType === 'AC'} onChange={handleBusTypeChange} className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="ac" className="text-sm text-neutral-600 font-normal cursor-pointer">AC Deluxe</label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="radio" id='tourist' name='busType' value='Tourist' checked={busType === 'Tourist'} onChange={handleBusTypeChange} className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="tourist" className="text-sm text-neutral-600 font-normal cursor-pointer">Tourist AC Deluxe</label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="radio" id='luxuryac' name='busType' value='Luxury' checked={busType === 'Luxury'} onChange={handleBusTypeChange} className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="luxuryac" className="text-sm text-neutral-600 font-normal cursor-pointer">Luxury AC Deluxe</label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="radio" id='all' name='busType' value='' checked={busType === ''} onChange={handleBusTypeChange} className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="all" className="text-sm text-neutral-600 font-normal cursor-pointer">All Types</label>
          </div>
        </div>
      </div>
      {/* Bus Companies */}
      <div className="w-full border border-neutral-300 rounded-xl p-4 space-y-3">
        <h1 className="text-lg  text-neutral-600 font-medium">Bus Companies</h1>
        <div className="space-y-2.5">
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='saiac' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="saiac" className="text-sm text-neutral-600 font-normal cursor-pointer">Sai-Travels AC Deluxe</label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='saitourist' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="saitourist" className="text-sm text-neutral-600 font-normal cursor-pointer">Sai-Travels Tourist AC Deluxe</label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='sailuxuryac' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="sailuxuryac" className="text-sm text-neutral-600 font-normal cursor-pointer">Sai-Travels Luxury AC Deluxe</label>
          </div>
        </div>
      </div>
      {/* Amenities Filter */}
      <div className="w-full border border-neutral-300 rounded-xl p-4 space-y-3">
        <h1 className="text-lg  text-neutral-600 font-medium">Aminities</h1>
        <div className="space-y-2.5">
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='internet' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="internet" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>Internet/Wi-Fi</span>
                <FaWifi />
              </div>
            </label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='acair' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="acair" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>AC & Air Suspension</span>
                <FaFan />
              </div>
            </label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='waterbottle' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="waterbottle" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>Water Bottle</span>
                <FaBottleWater />
              </div>
            </label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='snacks' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="snacks" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>Snacks</span>
                <FaPlateWheat />
              </div>
            </label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='tvmusic' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="tvmusic" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>Tv & Music</span>
                <FaTv /><FaMusic />
              </div>
            </label>
          </div>
          <div className="w-full flex items-center gap-2">
            <input type="checkbox" id='cargingport' className="h-3.5 w-3.5 border border-neutral-300 text-neutral-300 cursor-pointer" />
            <label htmlFor="cargingport" className="text-sm text-neutral-600 font-normal cursor-pointer">
              <div className="flex items-center space-x-2">
                <span>Charging Port</span>
                <FaChargingStation />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
