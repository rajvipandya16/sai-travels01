import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBus, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'

const ManageBuses = () => {
  const navigate = useNavigate()
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBuses()
  }, [])

  const fetchBuses = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/admin/buses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBuses(data.data)
      } else {
        console.error('Failed to fetch buses')
      }
    } catch (error) {
      console.error('Error fetching buses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (busId) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/admin/delete-bus/${busId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Bus deleted successfully!')
        fetchBuses() // Refresh the list
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.message || 'Failed to delete bus')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error connecting to server')
      console.error('Delete bus error:', error)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleEdit = (bus) => {
    // Navigate to edit page with bus data
    navigate('/admin/edit-bus', { state: { bus } })
  }

  const filteredBuses = buses.filter(bus =>
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.to.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN')
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Buses</h1>
          <p className="text-gray-600">View and manage all bus schedules</p>
        </div>
        <button
          onClick={() => navigate('/admin/add-bus')}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add New Bus
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search buses by name, from, or to..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Buses Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price & Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? 'No buses found matching your search' : 'No buses available'}
                  </td>
                </tr>
              ) : (
                filteredBuses.map((bus) => (
                  <tr key={bus._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                          <FaBus className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{bus.name}</div>
                          <div className="text-sm text-gray-500">ID: {bus._id.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bus.from}</div>
                      <div className="text-sm text-gray-500">→ {bus.to}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(bus.date)}</div>
                      <div className="text-sm text-gray-500">{formatTime(bus.time)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{bus.price}</div>
                      <div className="text-sm text-gray-500">{bus.availableSeats}/{bus.totalSeats} seats</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(bus.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(bus)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(bus._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{buses.length}</div>
            <div className="text-sm text-gray-600">Total Buses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {buses.filter(bus => bus.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Buses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {buses.reduce((sum, bus) => sum + bus.totalSeats, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Seats</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {buses.reduce((sum, bus) => sum + bus.availableSeats, 0)}
            </div>
            <div className="text-sm text-gray-600">Available Seats</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBuses 