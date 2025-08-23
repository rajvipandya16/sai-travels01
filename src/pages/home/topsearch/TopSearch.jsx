import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopSearchCard from '../../../components/topsearch/TopSearchCard'

const TopSearch = () => {
  return (
    <RootLayout className="space-y-8 sm:space-y-12">

        {/* Tag */}
        <div className="w-full flex items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl text-neutral-800 font-bold">
                Top Search <span className="text-primary">Routes</span>
            </h1>
        </div>
      
       {/* TopSearch ticket route  Card */}
       <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
     <TopSearchCard routeFrom={"Ahmedabad"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
     <TopSearchCard routeFrom={"Surat"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
     <TopSearchCard routeFrom={"Nadiad"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
     <TopSearchCard routeFrom={"Vadodara"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
     <TopSearchCard routeFrom={"Lunawada"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
     <TopSearchCard routeFrom={"Modasa"} routeTo={"Shirdi"} timeDuration={"11 Hr "} price={"500-4,000"} />
       </div>

    </RootLayout>
  )
}

export default TopSearch
