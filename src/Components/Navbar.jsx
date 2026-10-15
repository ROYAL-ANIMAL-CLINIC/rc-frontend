import React from "react";
import { NavLink } from "react-router-dom"; // For creating navigation links without page reload
import { useAppContext } from "../Context/AppContext"; // Custom hook to access the application's context
import NavIcon from '../assets/nav_cart_icon.svg'; 
import userimg from '../assets/profile_icon.png'; 
import toast  from "react-hot-toast";

function Navbar() {

  // manage the visibility of the mobile menu
  const [open, setOpen] = React.useState(false);

  // Accessing context values and functions 
  const { user, setUser, setshowUserLogin, navigate ,getCartCount,axios } = useAppContext();

  //function to handle user logout
  const logout = async () => {

    try {
      const {data} = await axios.post('/api/user/logout')
      
      if(data.success){
        toast.success(data.message)
        setUser(null); 
        navigate("/");
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
     
  };

  return (

    <nav className="flex justify-between px-6 md:px-10 lg:px-14 xl:px-20 py-4 border-b border-gray-300 bg-white transition-all duration-300 fixed top-0 w-full z-50 backdrop-blur-sm">

      {/* Logo/Brand  */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="h-10" src="/LOGO.jpeg" alt="cliniclogo" />
      </NavLink>

      {/* Desktop Menu  */}
      <div className="hidden sm:flex items-center gap-5">

        {/* Nav links */}

        <NavLink to="/" className=" text-blue-950 hover:text-blue-500">
          Home
        </NavLink>

        <NavLink to="/about" className="text-blue-950 hover:text-blue-500">
          About
        </NavLink>

        <NavLink to="/services" className="text-blue-950 hover:text-blue-500">
          Services
        </NavLink>

        <NavLink to="/blog" className=" text-blue-950 hover:text-blue-500">
          Blog
        </NavLink>

        <NavLink to="/shop" className="text-blue-950 hover:text-blue-500">
          Shop
        </NavLink>

        <NavLink
          to="/appointment"
          className=" text-blue-950 hover:text-blue-500">
          Appointment
        </NavLink>

        <NavLink to="/faq" className=" text-blue-950 hover:text-blue-500">
          FAQ
        </NavLink>

        <NavLink to="/contact" className="text-blue-950 hover:text-blue-500">
          Contact
        </NavLink>

        {/* Cart icon  */}
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={NavIcon} alt='cart' className='w-6 opacity-80' />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-blue-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Conditional rendering for login/logout based on user authentication */}
        {!user ? (
         
         // Login button displayed when the user is not logged in
          <button
            onClick={() => setshowUserLogin(true)}
            className="btn-hover cursor-pointer px-8 py-2 justify-end bg-blue-600 hover:bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        ) : (

          // User profile dropdown displayed when the user is logged in
          <div className="relative group">
            <img src={userimg} className='w-10' alt='profile' />
            
            <ul className=" hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
             
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-blue-500 rounded-md px-8 py-2 cursor-pointer">
                My Orders</li>
              
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-blue-500 rounded-md px-8 py-2 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

    {/*mobile menu */}
      <div className="flex items-center gap-6 sm:hidden">

        {/* Cart icon for mobile  */}
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={NavIcon} alt='cart' className='w-6 opacity-80' />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-blue-500 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Hamburger menu button */}
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Hamburger menu icon*/}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>

        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-5 px-5 text-sm md:hidden z-40`}
        >
          {/* Nav links for mobile menu */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="text-blue-950 hover:text-blue-500 block"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            Services
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            Blog
          </NavLink>
          <NavLink
            to="/shop"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            Shop
          </NavLink>

          {/* My Orders link  */}
          {user &&
            <NavLink
              to="/my-orders"
              onClick={() => setOpen(false)}
              className=" text-blue-950 hover:text-blue-500 block"
            >
              My Orders
            </NavLink>
          }

          <NavLink
            to="/appointment"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            Appointment
          </NavLink>
          <NavLink
            to="/faq"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className=" text-blue-950 hover:text-blue-500 block"
          >
            Contact
          </NavLink>

          {/* Conditional rendering for login/logout button in mobile */}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setshowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2  bg-blue-600 hover:bg-blue-500  transition text-white rounded-md text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2  bg-blue-600 hover:bg-blue-500  transition text-white rounded-md text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;