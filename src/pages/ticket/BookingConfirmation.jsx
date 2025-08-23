import React from 'react';
import TopLayout from '../../layout/toppage/TopLayout';
import RootLayout from '../../layout/RootLayout';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full space-y-12 pb-16">
      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2017/08/07/22/01/road-2603616_1280.jpg"}
        title={"Booking Confirmed!"}
      />
      <RootLayout className="space-y-12 w-full pb-16 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">Happy and Safe Journey!</h2>
          <p className="text-lg text-neutral-700 mb-4 text-center">Your booking has been confirmed.<br/>We wish you a pleasant and safe trip.</p>
          <p className="text-xl font-semibold text-red-500 mb-6 text-center">Sai Baba bless your journey!</p>
          <button
            className="mt-4 px-8 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </RootLayout>
    </div>
  );
};

export default BookingConfirmation; 