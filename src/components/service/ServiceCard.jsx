import React from 'react'

const ServiceCard = ({icon: Icon, title, desc}) => {
  return (
    <div className='w-full bg-neutral-300 hover:bg-neutral-100 rounded-xl p-5 sm:p-7 flex items-center justify-center gap-3 sm:gap-4
    flex-col text-center cursor-pointer ease-in-out duration-300'>
      <div className="w-full flex items-center justify-center gap-x-2 sm:gap-x-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-400/40 flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-800"/>
        </div>
        <h1 className="text-lg sm:text-xl lg:text-2xl text-neutral-800 font-bold">
            {title}
        </h1>
      </div>
      <p className="text-xs sm:text-sm text-neutral-600 font-normal">
        {desc}
      </p>
    </div>
  )
}

export default ServiceCard
