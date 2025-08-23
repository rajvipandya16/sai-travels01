import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
  FaTachometerAlt, 
  FaBus, 
  FaPlus, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaShieldAlt,
  FaUsers,
  FaCalendarCheck,
  FaUserShield
} from 'react-icons/fa'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminInfo, setAdminInfo] = useState(null)

  useEffect(() => {
    const adminData = localStorage.getItem('adminInfo')
    const adminToken = localStorage.getItem('adminToken')
    
    if (!adminToken || !adminData) {
      navigate('/admin/login')
      return
    }
    
    setAdminInfo(JSON.parse(adminData))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    localStorage.removeItem('isAdminLoggedIn')
    navigate('/admin/login')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      icon: FaTachometerAlt,
      path: '/admin/dashboard'
    },
    {
      name: 'Add Bus',
      icon: FaPlus,
      path: '/admin/add-bus'
    },
    {
      name: 'Manage Buses',
      icon: FaBus,
      path: '/admin/manage-buses'
    },
    {
      name: 'Manage Bookings',
      icon: FaCalendarCheck,
      path: '/admin/manage-bookings'
    },
    {
      name: 'Manage Users',
      icon: FaUsers,
      path: '/admin/manage-users'
    },
    {
      name: 'Admin Settings',
      icon: FaUserShield,
      path: '/admin/settings'
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  // Bus images for the scrolling section
  const busImages = [
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop'
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
              <FaShieldAlt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-red-500">Sai</h1>
              <span className="text-lg font-bold text-gray-600">Travels</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* Admin Info */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <FaUserShield className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Administrator</p>
                <p className="text-xs text-gray-500">{adminInfo?.email}</p>
                <p className="text-xs text-red-500 font-medium">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-red-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                {menuItems.find(item => isActive(item.path))?.name || 'Admin Panel'}
              </h2>
            </div>
          </div>
        </div>

        {/* Bus Images Scrolling Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 py-6 px-4 sm:px-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Bus Fleet</h3>
            <p className="text-sm text-gray-600">Scroll to see our premium bus collection</p>
          </div>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {busImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 group">
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <img 
                      src={image} 
                      alt={`Bus ${index + 1}`}
                      className="w-64 h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-sm font-semibold">Bus #{index + 1}</p>
                        <p className="text-xs opacity-90">Premium Service</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout 