import React from 'react'
import { FaBus, FaStar } from 'react-icons/fa'
import { MdOutlineChair } from 'react-icons/md'
import { RiVipFill } from 'react-icons/ri'
import { TbAirConditioning } from 'react-icons/tb'
import { Link } from 'react-router-dom'


const TicketCard = ({ icon: Icon, busName, routeFrom, routeTo, arrivalTime, departureTime, price, availableSeats, onReserve }) => {
  return (
    <div className='w-full rounded-xl p-4 sm:p-5 border-2 border-neutral-300 space-y-4 sm:space-y-5'>

      {/* bus info, routes */}

          <div className="space-y-4 sm:space-y-5 w-full border-b border-neutral-300/60 pb-4 sm:pb-5">
            {/* Routes */}

    
             <div className="space-y-4 sm:space-y-5">

                {/* Bus Info */}

                
               <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-x-2">
                  <FaBus className='w-4 h-4 sm:w-5 sm:h-5 text-primary'/>
                  <p className="text-base sm:text-lg text-neutral-700 font-semibold">
                    {busName}
                  </p>
                </div>

                <div className="flex items-center gap-x-2 sm:gap-x-4 flex-wrap">
                  <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5">
                  <TbAirConditioning className='w-3 h-3 sm:w-4 sm:h-4 text-primary'/>
                  <p className="text-xs text-neutral-600 font-normal">
                    AC
                  </p>
                  </div>

                  <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5">
                  <FaStar className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-600'/>
                  <p className="text-xs text-yellow-600 font-normal pt-0.5">
                    4.5
                  </p>
                  </div>

                  <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5">
                  <RiVipFill className='w-3 h-3 sm:w-4 sm:h-4 text-primary'/>
                  <p className="text-xs text-neutral-600 font-normal">
                    Sofa
                  </p>
                  </div>

                  <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5">
                  <MdOutlineChair className='w-3 h-3 sm:w-4 sm:h-4 text-primary -rotate-90' />
                  <p className="text-xs text-neutral-600 font-normal">
                    35 Seats
                  </p>
                  </div>
                  

                </div>

               </div>

                {/* Route */}
                <div className="space-y-0.5">

                    <div className="w-full flex items-center justify-between gap-x-2 sm:gap-x-2.5">
                         <h1 className="text-lg sm:text-xl lg:text-2xl text-neutral-600 font-semibold">
                          {arrivalTime}
                         </h1>
                      
                      <div className="flex-1 border-dashed border border-neutral-300 relative">
                        <p className="absolute w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 p-0.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-neutral-50 border-dashed border border-neutral-400 rounded-full flex items-center
                         justify-center">
                         <Icon className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary'/>
                        </p>
                      </div>

                      <h1 className="text-lg sm:text-xl lg:text-2xl text-neutral-600 font-semibold">
                          {departureTime}
                         </h1>

                    </div>

                    <div className="w-full flex items-center justify-between gap-x-3 sm:gap-x-5">
                      <p className="text-sm sm:text-base text-neutral-500 font-normal">
                        {routeFrom}
                      </p>

                      <p className="text-sm sm:text-base text-neutral-500 font-normal">
                        {routeTo}
                      </p>
                    </div>
                </div>
            </div>
        </div>
                

          {/* price, available seats and reserve button */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">


            {/* price */}
            <h1 className="text-lg sm:text-xl text-neutral-700 font-semibold">
               Rs.{price} <span className="text-xs sm:text-sm text-neutral-500 font-normal">
                /per Seat
               </span>
            </h1>

            <h1 className="text-xs sm:text-sm text-neutral-600 font-normal flex items-center justify-center
            gap-x-1.5">
               <span className="text-medium text-green-700 font-bold pt-0.5">
                {availableSeats} 
               </span>
               Seats Available
            </h1>
    
            
            <button
              onClick={onReserve}
              className="w-full sm:w-fit px-4 sm:px-6 h-10 bg-primary hover:bg-transparent border-2 border-primary hover:border-primary rounded-xl text-sm sm:text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 hover:text-primary ease-in-out duration-300"
            >
              Reserve Seat
            </button>
          </div>
        </div>
  )
}

export default TicketCard
