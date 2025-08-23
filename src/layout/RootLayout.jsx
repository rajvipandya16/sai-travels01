import React, { useEffect } from 'react'

const RootLayout = ({ children, className}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 ${className}`}>
      {children}
    </div>
  )
}

export default RootLayout
