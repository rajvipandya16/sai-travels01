import React from 'react'
import Hero from './hero/Hero'
import Services from './services/Services'
import TopSearch from './topsearch/TopSearch'

const Home = () => {
  return (
    <div className='space-y-12 sm:space-y-16 w-full min-h-screen pb-16'>

        {/* Hero */}
        <Hero />


        {/* Services */}
        <Services />

        {/* TopSearch */}
        <TopSearch />
    </div>
  )
}

export default Home
