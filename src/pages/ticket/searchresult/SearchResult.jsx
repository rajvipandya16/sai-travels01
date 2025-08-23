import React from 'react'
import TicketCard from '../../../components/ticket/TicketCard'
import { FaBus } from 'react-icons/fa'
import { GrRefresh } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({ buses, loading, noResults }) => {
  const navigate = useNavigate()

  if (loading) {
    return <div className='w-full col-span-3 pt-11 text-center text-lg text-neutral-500'>Loading buses...</div>
  }
  if (noResults) {
    return <div className='w-full col-span-3 pt-11 text-center text-lg text-red-500'>No buses found</div>
  }
  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>
      <div className="space-y-6 ">
        {buses && buses.length > 0 && buses.map(bus => (
          <TicketCard
            key={bus.id}
            icon={FaBus}
            busName={bus.name}
            routeFrom={bus.from}
            routeTo={bus.to}
            arrivalTime={bus.departureTime}
            departureTime={bus.arrivalTime || '--'}
            price={bus.price}
            availableSeats={bus.seatsAvailable}
            onReserve={() => navigate('/bus-tickets/detail', { state: bus })}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <button className="w-fit px-4 py-3 bg-primary hover:bg-transparent border-2 border-primary 
          hover:border-primary rounded-xl text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 
          hover:text-primary ease-in-out duration-300">
          <GrRefresh />
          Load More
        </button>
      </div>
    </div>
  )
}

export default SearchResult
