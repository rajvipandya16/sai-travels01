import React from 'react'
import { RiRefund2Line, RiSecurePaymentLine, RiCustomerService2Line, RiMapPinTimeLine, RiShieldCheckLine, RiBusLine } from 'react-icons/ri'
import { PiHeadsetFill, PiCreditCardFill } from 'react-icons/pi'
import { FaRoute, FaUsers, FaClock, FaStar } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: RiSecurePaymentLine,
      title: "Secure Payment Gateway",
      description: "Multiple payment options with bank-grade security. Your transactions are protected with SSL encryption.",
      features: ["Credit/Debit Cards", "UPI Payments", "Net Banking", "Digital Wallets"]
    },
    {
      icon: RiRefund2Line,
      title: "Flexible Refund Policy",
      description: "Easy cancellation and refund process. Get your money back within 24-48 hours.",
      features: ["Instant Cancellation", "Quick Refunds", "No Hidden Charges", "Transparent Terms"]
    },
    {
      icon: PiHeadsetFill,
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your travel needs. We're here when you need us.",
      features: ["Live Chat", "Phone Support", "Email Support", "WhatsApp Support"]
    },
    {
      icon: RiMapPinTimeLine,
      title: "Real-time Tracking",
      description: "Track your bus in real-time. Know exactly when your bus will arrive.",
      features: ["Live GPS Tracking", "ETA Updates", "Route Information", "Delay Alerts"]
    },
    {
      icon: RiShieldCheckLine,
      title: "Safe Travel Assurance",
      description: "Your safety is our priority. All buses are regularly sanitized and maintained.",
      features: ["Sanitized Buses", "Trained Drivers", "Emergency Support", "Insurance Coverage"]
    },
    {
      icon: FaRoute,
      title: "Extensive Route Network",
      description: "Connect to hundreds of cities across India. Find routes to your destination.",
      features: ["500+ Routes", "1000+ Cities", "Daily Departures", "Multiple Operators"]
    }
  ]

  const stats = [
    { number: "1M+", label: "Happy Customers", icon: FaUsers },
    { number: "500+", label: "Routes Covered", icon: FaRoute },
    { number: "24/7", label: "Support Available", icon: FaClock },
    { number: "4.8★", label: "Customer Rating", icon: FaStar }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-100">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-red-500">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience seamless travel with our comprehensive range of services designed to make your journey comfortable, safe, and convenient.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Book your tickets now and experience the best bus travel service in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services 