import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'


const Navbar = () => {
    const navigate = useNavigate()
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

         // Check login status on component mount and listen for changes
     useEffect(() => {
         const checkLoginStatus = () => {
             const loginStatus = localStorage.getItem('isLoggedIn')
             const userData = localStorage.getItem('user')
             
             console.log('Checking login status:', { loginStatus, userData })
             
             if (loginStatus === 'true' && userData) {
                 try {
                     const parsedUser = JSON.parse(userData)
                     setIsLoggedIn(true)
                     setUser(parsedUser)
                     console.log('User logged in:', parsedUser)
                 } catch (error) {
                     console.error('Error parsing user data:', error)
                     setIsLoggedIn(false)
                     setUser(null)
                 }
             } else {
                 setIsLoggedIn(false)
                 setUser(null)
                 console.log('User not logged in')
             }
         }

         // Check initial status
         checkLoginStatus()

         // Listen for storage changes
         const handleStorageChange = (e) => {
             if (e.key === 'isLoggedIn' || e.key === 'user') {
                 checkLoginStatus()
             }
         }

         window.addEventListener('storage', handleStorageChange)
         
         // Also listen for custom events (for same-tab updates)
         const handleLoginChange = () => {
             checkLoginStatus()
         }
         
         window.addEventListener('loginStatusChanged', handleLoginChange)

         return () => {
             window.removeEventListener('storage', handleStorageChange)
             window.removeEventListener('loginStatusChanged', handleLoginChange)
         }
     }, [])

    //Navbar Items
    const navItems =[
        {label:"Home", link: "/"},
        {label:"Services", link: "/services"},
        {label:"Tickets", link: "/bus-tickets"},
        {label:"About", link: "/about"},
    ]




         //Handle click open
     const handleOpen = () => {
        setOpen(!open)
     }

     //Handle click close
     const handleClose = () => {
        setOpen(false);
     }

     //Handle logout
     const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setUser(null)
        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event('loginStatusChanged'))
        navigate('/')
     }

     

     // to make navbar sticky and hide when scroll down and show when back scroll up and at the  top
     useEffect(() => {
      
      const handleScroll = () => {
      const currentScrollState = window.scrollY;

      //determin visisbility of navbar based on scroll position

      if (currentScrollState > scrollPosition && currentScrollState > 50){
        setIsVisible(false); //Hide navbar when scrolling down
      } else{
        setIsVisible(true); //show navbar when scrolling up and at the top
      }

      setScrollPosition(currentScrollState);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll)
      };

     }, [scrollPosition]);
     

  return (
    <nav className={`w-full h-[8ch] fixed top-0 left-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24
      backdrop-blur-lg transition-transform duration-300 z-50 
    bg-white/80 shadow-lg ${isVisible ? "translate-y-0" : "-translate-y-full"} 
      ${scrollPosition > 50 ? "bg-neutral-300" : "bg-neutral-100/10"}`}>
        <div className="w-full h-full flex items-center justify-between">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-0"> {/* Reduce space */}
          <h1 className="text-2xl sm:text-3xl text-red-500 font-bold hover:text-neutral-500">Sai</h1>
             <span className="text-2xl sm:text-3xl text-neutral-500 font-bold hover:text-red-400">Travels</span>
          </Link>


          {/* Hamburger menu */}
             <div className="w-fit md:hidden flex items-center justify-center cursor-pointer flex-col gap-1
             text-neutral-700" onClick={handleOpen}>
                {
                    open
                    ?
                    <FaTimes className='w-5 h-5' />
                    :
                    <FaBars className='w-5 h-5' />
                }
             </div>


          {/* Nav links and buttons */}
               <div className={`${open ? "flex absolute top-20 left-0 w-full h-auto md:relative" : "hidden"}
                flex-1 md:flex flex-col md:flex-row md:gap-14 gap-6 md:items-center items-start md:p-0 
                p-4 justify-end md:bg-transparent bg-neutral-50 border md:border-transparent border-neutral-200 md:shadow-none shadow-md
                rounded-xl mx-4 md:mx-0`}>
                 {/* Nav Links */}
                 <ul className="list-none flex md:items-center items-start flex-wrap md:flex-row 
                 flex-col md:gap-8 gap-4 text-base sm:text-lg text-neutral-500 font-normal">
                  

                   {navItems.map((item, ind) => (
                     <li key={ind}>
                      <Link to={item.link} className='hover:text-red-500 ease-in-out
                    duration-300 hover:underline ' onClick={handleClose}>
                        {item.label}
                    </Link>
                   </li>
                   ))}
                    
                 </ul>

          {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                    {/* Debug info - remove this later */}
                    <div className="hidden md:block text-xs text-gray-500">
                      Debug: {isLoggedIn ? 'Logged In' : 'Not Logged In'} | User: {user?.name || 'None'}
                    </div>
                    
                    {!isLoggedIn ? (
                      <>
                        <Link to="/login" className="w-full sm:w-fit px-4 sm:px-3 py-2.5 sm:py-1 bg-red-500
                        hover:bg-transparent
                        border border-red-500 hover:border-red-500 rounded-xl sm:rounded-full
                        text-sm sm:text-base font-normal text-neutral-50 hover:text-red-500 ease-in-out duration-300 text-center">
                            Login
                        </Link>
                        <Link to="/register" className="w-full sm:w-fit px-4 sm:px-3 py-2.5 sm:py-1 bg-transparent
                        hover:bg-red-500
                        border border-red-500 hover:border-red-500 rounded-xl sm:rounded-full
                        text-sm sm:text-base font-normal text-red-500 hover:text-neutral-50 ease-in-out duration-300 text-center">
                            Register
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                          <div className="hidden md:flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {user?.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                            <span className="text-base font-medium text-neutral-700">
                              {user?.name}
                            </span>
                          </div>
                          <button 
                            onClick={handleLogout}
                            className="w-full sm:w-fit px-4 sm:px-3 py-2.5 sm:py-1 bg-red-500
                            hover:bg-transparent
                            border border-red-500 hover:border-red-500 rounded-xl sm:rounded-full
                            text-sm sm:text-base font-normal text-neutral-50 hover:text-red-500 ease-in-out duration-300">
                              Logout
                          </button>
                        </div>
                        {/* Mobile username display */}
                        <div className="md:hidden flex items-center gap-2 mb-4 w-full justify-center">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-base font-medium text-neutral-700">
                            Welcome, {user?.name}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
               </div>
        </div>
      
    </nav>
  )
}

export default Navbar
