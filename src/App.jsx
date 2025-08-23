import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Footer from "./components/footer/Footer"
import Ticket from "./pages/ticket/Ticket"
import Detail from "./components/ticket/detail/Detail"
import Users from "./pages/users/Users"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Services from "./pages/services/Services"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminRegister from "./pages/admin/AdminRegister"
import AdminLayout from "./components/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import AddBus from "./pages/admin/AddBus"
import ManageBuses from "./pages/admin/ManageBuses"
import ManageBookings from "./pages/admin/ManageBookings"
import ManageUsers from "./pages/admin/ManageUsers"
import AdminSettings from "./pages/admin/AdminSettings"
import Checkout from "./pages/ticket/Checkout"
import BookingConfirmation from "./pages/ticket/BookingConfirmation"

function MainApp() {
  const location = useLocation();
  
  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <main className="w-full flex flex-col bg-neutral-50 min-h-screen">
      {/* Only show navbar for non-admin routes */}
      {!isAdminRoute && <Navbar />}
      
      <div className={!isAdminRoute ? "pt-[8ch]" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bus-tickets" element={<Ticket />} />
          <Route path="/bus-tickets/detail" element={<Detail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/bus-ticket/checkout" element={<Navigate to="/checkout" replace />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-bus" element={<AddBus />} />
            <Route path="manage-buses" element={<ManageBuses />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </div>
      {location.pathname !== "/billing" && !isAdminRoute && <Footer />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
