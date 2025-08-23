import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import { Link, useNavigate } from 'react-router-dom'
import WarningAlert from '../../alertmessage/WarningAlert'
import BusSeat from './seat/busseat/BusSeat'



const Detail = () => {
    const navigate = useNavigate();

    // Show the warning message 

    const message = (
      <>
    One Individual only can book 5 Seats. If you want to book more than 5 Seats,
    Please <Link to={"/support-team"} className='text-yellow-700 font-medium'>Contact Our Support Team.</Link>
    </>
    );
    
  return (
    <div className='w-full space-y-12 pb-16'>
      { /* Top Layout */}

      <TopLayout
      bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
      title={"Bus Detail"}/>

     <RootLayout className="space-y-12 w-full pb-16">
 
      {/* Seat Layout and selection action detail  */}
      <div className="w-full space-y-8">

      {/* Warning Message */}
         <WarningAlert message={message}/>

      {/*Seat Layout */}
          <BusSeat />

      </div>


      {/* Bus Detail */}
      <div className="w-full flex items-center justify-center flex-col gap-8 text-center">

       {/* Short Description about the bus */}
          <p className="text-base text-neutral-500 font-normal text-justify">
          This is just a sample text for the demo purpose.
         Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Provident quae repudiandae eum unde, dolo dignissimos consectetur sequi recusandae minima nisi
            voluptatem eius, ex maxime quibusdam animi, voluptasem cumque! At!

            <span className="text-lg text-neutral-600 font-medium ml-2">
              Want to see more about the bus?
            </span>
          </p>


       {/* Button */}

          <div className="w-full flex items-center justify-center
           gap-6 flex-col">
            <button
              className="px-8 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
              onClick={() => navigate('/checkout')}
            >
              PROCESSED TO CHECKOUT
            </button>
       </div>

      </div>


     </RootLayout>
    </div>
  )
}

export default Detail
