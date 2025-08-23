import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBus, FaSave, FaTimes } from 'react-icons/fa'

const AddBus = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    date: '',
    time: '',
    price: '',
    totalSeats: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/admin/add-bus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Bus added successfully!')
        setFormData({
          name: '',
          from: '',
          to: '',
          date: '',
          time: '',
          price: '',
          totalSeats: ''
        })
        // Redirect to manage buses after 2 seconds
        setTimeout(() => {
          navigate('/admin/manage-buses')
        }, 2000)
      } else {
        setMessage(data.message || 'Failed to add bus')
      }
    } catch (error) {
      setMessage('Error connecting to server')
      console.error('Add bus error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/manage-buses')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-lg">
          <div className="flex items-center">
            <FaBus className="w-6 h-6 text-white mr-3" />
            <h1 className="text-xl font-bold text-white">Add New Bus</h1>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bus Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Bus Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Express Bus 101"
                />
              </div>

              {/* From */}
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                  From *
                </label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Mumbai"
                />
              </div>

              {/* To */}
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                  To *
                </label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., Delhi"
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 1500.00"
                />
              </div>

              {/* Total Seats */}
              <div>
                <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats *
                </label>
                <input
                  type="number"
                  id="totalSeats"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaTimes className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaSave className="w-4 h-4 mr-2" />
                {loading ? 'Adding Bus...' : 'Add Bus'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBus 