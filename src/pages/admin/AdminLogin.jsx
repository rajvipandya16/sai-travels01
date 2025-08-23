import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Login successful! Redirecting to dashboard...')
        // Store admin token and info
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminInfo', JSON.stringify(data.admin))
        localStorage.setItem('isAdminLoggedIn', 'true')
        
        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin/dashboard')
        }, 2000)
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (error) {
      setMessage('Error connecting to server')
      console.error('Admin login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-neutral-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mr-4">
              <FaShieldAlt className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl text-red-500 font-bold">Sai</h1>
              <span className="text-4xl text-neutral-500 font-bold">Travels</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h2>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.includes('successful') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="admin@saitravels.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Signing in...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an admin account?{' '}
              <Link
                to="/admin/register"
                className="font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back to Sai Travels
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin 