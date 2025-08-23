import React, { useState } from 'react';
import TopLayout from '../../layout/toppage/TopLayout';
import RootLayout from '../../layout/RootLayout';
import { useNavigate } from 'react-router-dom';
import visaIcon from '../../assets/creditcard.png';
import mastercardIcon from '../../assets/mastercard.png';
// No rupay icon found, so we'll use visa/mastercard only

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    payment: 'Credit/Debit Card',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardHolder: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.address) errs.address = 'Address is required';
    if (!form.phone.match(/^\d{10}$/)) errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = 'Enter a valid email';
    if (form.payment === 'UPI' && !form.upiId) errs.upiId = 'UPI ID is required';
    if (form.payment === 'Credit/Debit Card') {
      if (!form.cardNumber.match(/^\d{16}$/)) errs.cardNumber = 'Enter a valid 16-digit card number';
      if (!form.cardExpiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)) errs.cardExpiry = 'Enter expiry as MM/YY';
      if (!form.cardCVV.match(/^\d{3}$/)) errs.cardCVV = 'Enter a valid 3-digit CVV';
      if (!form.cardHolder) errs.cardHolder = 'Cardholder name is required';
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Always redirect to confirmation page, regardless of payment method
      navigate('/booking-confirmation');
    }
  };

  return (
    <div className="w-full space-y-12 pb-16">
      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Checkout & Billing"}
      />
      <RootLayout className="space-y-12 w-full pb-16 flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-neutral-700 mb-4 text-center">Billing Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your address"
              rows={2}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Options</label>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={form.payment === 'UPI'}
                  onChange={handleChange}
                  className="form-radio text-red-500"
                />
                <span className="ml-2">UPI</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="Credit/Debit Card"
                  checked={form.payment === 'Credit/Debit Card'}
                  onChange={handleChange}
                  className="form-radio text-red-500"
                />
                <span className="ml-2 flex items-center gap-2">Credit/Debit Card
                  <img src={visaIcon} alt="Visa" className="h-6 inline ml-2" />
                  <img src={mastercardIcon} alt="Mastercard" className="h-6 inline ml-1" />
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={form.payment === 'COD'}
                  onChange={handleChange}
                  className="form-radio text-red-500"
                />
                <span className="ml-2">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
          {form.payment === 'UPI' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={form.upiId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your UPI ID (e.g. user@upi)"
              />
              {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
            </div>
          )}
          {form.payment === 'Credit/Debit Card' && (
            <div className="space-y-3">
              <div className="flex gap-2 mb-2">
                <img src={visaIcon} alt="Visa" className="h-8" />
                <img src={mastercardIcon} alt="Mastercard" className="h-8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter 16-digit card number"
                  maxLength={16}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    name="cardCVV"
                    value={form.cardCVV}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="CVV"
                    maxLength={3}
                  />
                  {errors.cardCVV && <p className="text-red-500 text-xs mt-1">{errors.cardCVV}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={form.cardHolder}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Name on card"
                />
                {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold transition-colors mt-6"
          >
            Confirm Booking
          </button>
        </form>
      </RootLayout>
    </div>
  );
};

export default Checkout; 