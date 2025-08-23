import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AddBus from './pages/admin/AddBus'
import ManageBuses from './pages/admin/ManageBuses'
import ManageBookings from './pages/admin/ManageBookings'
import ManageUsers from './pages/admin/ManageUsers'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Directly show dashboard at root */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-bus" element={<AddBus />} />
          <Route path="manage-buses" element={<ManageBuses />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App 