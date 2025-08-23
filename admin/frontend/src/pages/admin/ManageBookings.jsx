import { useState, useEffect } from 'react'
import { FaCalendarCheck, FaSearch, FaFilter, FaEye } from 'react-icons/fa'

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    date: '',
    busRoute: '',
    status: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [filters])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const queryParams = new URLSearchParams()
      
      if (filters.date) queryParams.append('date', filters.date)
      if (filters.status) queryParams.append('status', filters.status)
      if (filters.busRoute) queryParams.append('busRoute', filters.busRoute)

      const response = await fetch(`http://localhost:5000/api/admin/bookings?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.data)
      } else {
        console.error('Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      date: '',
      busRoute: '',
      status: ''
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN')
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const statusClasses = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all bus bookings</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <FaFilter className="w-4 h-4 mr-2" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bus Route</label>
              <input
                type="text"
                placeholder="Search by route..."
                value={filters.busRoute}
                onChange={(e) => handleFilterChange('busRoute', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passenger Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus & Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <FaCalendarCheck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Booking #{booking._id.slice(-6)}</div>
                          <div className="text-sm text-gray-500">{formatDate(booking.bookingDate)}</div>
                          <div className="text-sm text-gray-500">{formatTime(booking.bookingDate)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.passengerName}</div>
                      <div className="text-sm text-gray-500">Age: {booking.passengerAge}</div>
                      <div className="text-sm text-gray-500">Gender: {booking.passengerGender}</div>
                      <div className="text-sm text-gray-500">Seat: {booking.seatNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.bus ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">{booking.bus.name}</div>
                          <div className="text-sm text-gray-500">{booking.bus.from} → {booking.bus.to}</div>
                          <div className="text-sm text-gray-500">{formatDate(booking.bus.date)} at {booking.bus.time}</div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">Bus info not available</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{booking.totalAmount}</div>
                      <div className="mt-1">{getStatusBadge(booking.status)}</div>
                      <div className="mt-1">{getPaymentStatusBadge(booking.paymentStatus)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(booking => booking.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {bookings.filter(booking => booking.paymentStatus === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₹{bookings.reduce((sum, booking) => sum + booking.totalAmount, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBookings 