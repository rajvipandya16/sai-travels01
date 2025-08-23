import React from 'react'
import TopLayout from '../../layout/toppage/TopLayout'
import RootLayout from '../../layout/RootLayout'
import { motion } from 'framer-motion'
import SearchResult from './searchresult/SearchResult'

const staticBuses = [
  {
    id: '1',
    name: 'Sai Express',
    from: 'Ahmedabad',
    to: 'Shirdi',
    departureTime: '08:00',
    arrivalTime: '18:00',
    price: 1200,
    seatsAvailable: 20
  },
  {
    id: '2',
    name: 'Shirdi Deluxe',
    from: 'Surat',
    to: 'Shirdi',
    departureTime: '09:30',
    arrivalTime: '19:30',
    price: 1500,
    seatsAvailable: 15
  },
  {
    id: '3',
    name: 'Comfort Travels',
    from: 'Vadodara',
    to: 'Shirdi',
    departureTime: '07:00',
    arrivalTime: '17:00',
    price: 1100,
    seatsAvailable: 10
  }
]

const Ticket = () => {
  return (
    <div className='w-full space-y-12 pb-16'>
      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Reserve your ticket"}
      />
      <RootLayout className="space-y-12 relative">
        <motion.h1
          initial={{ opacity: 0, y: -800 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -800 }}
          transition={{ duration: 2.15, ease: "easeOut" }}
          className="text-3xl text-neutral-700 font-semibold capitalize ">
          Available Buses
        </motion.h1>
        <div className="w-full h-auto grid grid-cols-1 gap-16 relative">
          <SearchResult
            buses={staticBuses}
            loading={false}
            noResults={staticBuses.length === 0}
          />
        </div>
      </RootLayout>
    </div>
  )
}

export default Ticket
