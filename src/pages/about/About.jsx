import React from 'react'
import { FaUsers, FaRoute, FaAward, FaHeart, FaShieldAlt, FaHandshake } from 'react-icons/fa'
import { RiBusLine, RiCustomerService2Line, RiGlobalLine } from 'react-icons/ri'

const About = () => {
  const milestones = [
    { year: "2015", title: "Founded", description: "Started with a vision to revolutionize bus travel in India" },
    { year: "2018", title: "1M Customers", description: "Reached our first million happy customers" },
    { year: "2020", title: "Digital Transformation", description: "Launched our mobile app and digital booking platform" },
    { year: "2023", title: "Market Leader", description: "Became the leading bus booking platform in India" }
  ]

  const values = [
    {
      icon: FaHeart,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We go above and beyond to ensure you have the best travel experience."
    },
    {
      icon: FaShieldAlt,
      title: "Safety & Security",
      description: "Your safety is non-negotiable. We maintain the highest standards of safety and security."
    },
    {
      icon: FaHandshake,
      title: "Trust & Reliability",
      description: "Building lasting relationships through transparency, honesty, and reliable service."
    },
    {
      icon: RiGlobalLine,
      title: "Innovation",
      description: "Continuously innovating to provide cutting-edge travel solutions and better user experience."
    }
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Amit Patel",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-100">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-red-500">Sai Travels</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are India's most trusted bus booking platform, connecting millions of travelers to their destinations 
              with comfort, safety, and convenience. Our mission is to make bus travel accessible, affordable, and enjoyable for everyone.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRoute className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-gray-600">Routes Covered</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <RiBusLine className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Bus Partners</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">8+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, Sai Travels began with a simple mission: to make bus travel in India more accessible, 
                reliable, and comfortable. What started as a small startup has now grown into one of India's leading 
                bus booking platforms.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We understand the challenges of traveling in India and have built our platform to address every pain point. 
                From real-time tracking to secure payments, from comfortable seating to on-time departures - we've got it all covered.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve millions of customers across India, connecting them to their loved ones and destinations 
                with the promise of safety, comfort, and reliability.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Sai Travels?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Best prices guaranteed
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Safe and secure travel
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Real-time bus tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Easy booking and cancellation
                </li>
              </ul>
            </div>
          </div>

          {/* Milestones */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-red-500 font-semibold">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Millions of Happy Travelers
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Experience the difference with Sai Travels - where every journey is a story waiting to be told.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Your Journey
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

export default About
