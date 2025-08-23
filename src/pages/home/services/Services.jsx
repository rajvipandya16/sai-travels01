import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import ServiceCard from '../../../components/service/ServiceCard'
import { RiRefund2Line, RiSecurePaymentLine } from 'react-icons/ri'
import { PiHeadsetFill } from 'react-icons/pi'

const Services = () => {
  return (
    <RootLayout className="space-y-8 sm:space-y-12">
        {/* Tag */}
        <div className="w-full flex items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl text-neutral-800 font-bold">
                Our <span className="text-primary">Services</span>
            </h1>
        </div>
      
        {/* Services Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <ServiceCard icon={RiSecurePaymentLine} title={"Secure Payment"} desc={"Integrate secure payment gateways for users to pay for their Tickets"}/>
            <ServiceCard icon={RiRefund2Line} title={"Refund Policy"} desc={"Offers options for the users to purchase refundable tickets with clear terms"}/>
            <ServiceCard icon={PiHeadsetFill} title={"24/7 Support"} desc={"Get assistance anytime through chat, email or phone."}/>
        </div>
    </RootLayout>
  )
}

export default Services
