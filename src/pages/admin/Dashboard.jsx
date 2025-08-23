import { useState, useEffect } from 'react'
import { FaUsers, FaBus, FaCalendarCheck, FaChartLine } from 'react-icons/fa'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuses: 0,
    totalBookings: 0,
    activeBuses: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      } else {
        console.error('Failed to fetch dashboard stats')
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      title: 'Total Buses',
      value: stats.totalBuses,
      icon: FaBus,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: FaCalendarCheck,
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      title: 'Active Buses',
      value: stats.activeBuses,
      icon: FaChartLine,
      color: 'bg-red-500',
      textColor: 'text-red-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome to Sai Travels Admin Panel</h1>
        <p className="text-sm sm:text-base text-red-100">Manage your bus operations, bookings, and users from this centralized dashboard.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base">
              Add New Bus
            </button>
            <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm sm:text-base">
              View All Bookings
            </button>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base">
              Manage Users
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>New booking received</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Bus schedule updated</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>New user registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <p className="text-gray-600">Platform</p>
            <p className="font-medium">Sai Travels Admin Panel</p>
          </div>
          <div>
            <p className="text-gray-600">Version</p>
            <p className="font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-gray-600">Last Updated</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 