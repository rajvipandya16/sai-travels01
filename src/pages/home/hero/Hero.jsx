import React from 'react'
import { easeOut, motion } from 'framer-motion';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import RootLayout from './../../../layout/RootLayout';
import Search from './search/Search';

const Hero = () => {

    const variants = {
          hidden: { opacity: 0, y: -800 },
          visible: { opacity: 1, y: 0 }
    };


  return (
    <motion.div className='w-full flex-1 h-screen bg-[url("./assets/herobg.png")] bg-cover bg-no-repeat 
    bg-center relative'
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={variants}
    transition={{duration: 1.30, ease: "easeInOut" }}
    >
      
      <RootLayout className="absolute top-0 left-0 w-full h-full py-[9ch] bg-gradient-to-b from-neutral-50/70 
      via-neutral-50/15 to-neutral-50/5 flex items-center justify-start text-center flex-col gap-6 sm:gap-9">  

      {/* Title Section */}

      <div className="space-y-2 px-4">
         <motion.p
         initial={{ opacity: 0, y: -800 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -800 }}
         transition={{ duration: 2, ease: easeOut }}
         className="text-sm sm:text-lg text-neutral-500 font-medium">
          Get Your Bus Tickets
         </motion.p>

         <motion.h1
         initial={{ opacity: 0, y: -800 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -800 }}
         transition={{ duration: 2.15, ease: "easeOut" }}
         className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-800 font-bold capitalize px-2">
          Find best bus for you!
         </motion.h1>
      </div>
       {/* Search */}

       <Search />
    
      </RootLayout>


    </motion.div>
  )
}

export default Hero
