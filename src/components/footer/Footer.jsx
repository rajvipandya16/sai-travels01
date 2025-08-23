import React from 'react'
import RootLayout from '../../layout/RootLayout'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import MasterCardImg from "../../assets/mastercard.png"
import PaypalImg from "../../assets/paypal.png"
import CreditCardImg from "../../assets/creditcard.png"


const Footer = () => {
  return (
    <div className='w-full h-auto bg-neutral-950 py-8 sm:py-12'>


      <RootLayout className="space-y-8 sm:space-y-10">

        {/* footer other content */}
           <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 space-y-6 sm:space-y-8 lg:pr-10">

            <div className="space-y-3">
        {/* logo */}
          <Link to="/" className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold"> {/* Reduce space */}
                    Sai Travels
          </Link>

        {/* some description */}
        <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Reliable and comfortable bus services for daily commuters and travelers. <br />
            Safe, punctual, and affordable transportation to your destination. <br />
            Book your ride today!
        </p>
            </div>

        {/* social links */}
            <div className="w-full flex items-center gap-x-3 sm:gap-x-5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-neutral-800/40 hover:bg-neutral-300 flex items-center
              justify-center cursor-pointer ease-in-out duration-500">
                <FaInstagram className='w-4 h-4 sm:w-6 sm:h-6 text-neutral-50 hover:text-neutral-950' />
              </div>

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-neutral-800/40 hover:bg-neutral-300 flex items-center
              justify-center cursor-pointer ease-in-out duration-500">
                <FaFacebook className='w-4 h-4 sm:w-6 sm:h-6 text-neutral-50 hover:text-neutral-950' />
              </div>

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-neutral-800/40 hover:bg-neutral-300 flex items-center
              justify-center cursor-pointer ease-in-out duration-500">
                <FaYoutube className='w-4 h-4 sm:w-6 sm:h-6 text-neutral-50 hover:text-neutral-950' />
              </div>

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-neutral-800/40 hover:bg-neutral-300 flex items-center
              justify-center cursor-pointer ease-in-out duration-500">
                <FaXTwitter className='w-4 h-4 sm:w-6 sm:h-6 text-neutral-50 hover:text-neutral-950' />
              </div>
            </div>

            </div>
             


            <div className="col-span-1 space-y-4 sm:space-y-5">
              <h1 className="text-base sm:text-lg text-neutral-100 font-semibold">
                Quick Links
              </h1>

              <div className="space-y-2">
                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  About Us
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  My Account
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Reserve your Tickets
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Create your account
                </Link>
              </div>
            </div>

            <div className="col-span-1 space-y-4 sm:space-y-5">
            <h1 className="text-base sm:text-lg text-neutral-100 font-semibold">
                Top Reserved Routes
              </h1>

              <div className="space-y-2">
                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Ahmedabad-Shirdi
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Nadiad-Shirdi
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Vadodara-Shirdi
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Surat-Shirdi
                </Link>
              </div>
            </div>

            <div className="col-span-1 space-y-4 sm:space-y-5">
            <h1 className="text-base sm:text-lg text-neutral-100 font-semibold">
                Support Links
              </h1>

              <div className="space-y-2">
                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Privacy Policy
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Terms & Conditions
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  Help & Support Center
                </Link>

                <Link to="/" className='block text-sm sm:text-base text-neutral-500 hover:text-neutral-300 font-normal
                 ease-in-out duration-300'>
                  FaQs
                </Link>
              </div>
            </div>
           </div>

        {/* Seperator*/}
           <div className="w-full h-px bg-neutral-800/50" />

        {/* Copyright */}

          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <p className="text-xs sm:text-sm text-neutral-600 font-normal text-center sm:text-left">
                  Copyright &copy; 2025. All rights reserved.
                </p>

                <div className="flex items-center gap-x-2">
                  <div className="">
                    <img src={MasterCardImg} alt="" className="w-fit h-7 sm:h-9 object-contain object-center" />
                  </div>

                  <div className="">
                    <img src={PaypalImg} alt="" className="w-fit h-7 sm:h-9 object-contain object-center" />
                  </div>

                  <div className="">
                    <img src={CreditCardImg} alt="" className="w-fit h-7 sm:h-9 object-contain object-center" />
                  </div>
                </div>
          </div>

      </RootLayout>
    </div>
  )
}

export default Footer
