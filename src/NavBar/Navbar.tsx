import React, { useState } from 'react'
import { FiMenu, FiX, FiSearch, FiMapPin ,FiChevronDown } from "react-icons/fi";
import { Link, NavLink } from 'react-router-dom';
import logocap from '../assets/images/logocap.png'
import { COLORS, FONTS } from '../Constants/uiconstants';
import carticon from '../assets/images/shopping-cart.png'
import notify from '../assets/images/notification.png'
import profileimg from '../assets/images/profileimg.png'

const Navbar:React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [location, setLocation] = useState("Mumbai, India");
    const locations = ["Mumbai, India", "Delhi, India", "Bangalore, India", "Chennai, India", "Pune, India"];
  return (
    <div>
          <nav className="shadow-md sticky top-0 z-50" style={{ ...(FONTS.regular as any) , background : COLORS.primary_white}}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-7 gap-4">

       <NavLink to="/">
        <div className="flex items-center gap-2">
          <img src={logocap} alt="Logo" className="w-8 h-8" />
          <h1  style={{ ...(FONTS.boldHeading as any), color: COLORS.primary_red}}>CORZAAR</h1>
        </div>
       </NavLink> 

        <div className="hidden md:flex items-center gap-2" style={ FONTS.regular as any}>
        <NavLink to="/" style={({ isActive }) => ({
        color: isActive ? COLORS.primary_white : COLORS.primary_black,
        backgroundColor: isActive ? COLORS.primary_red : "transparent",
        padding: "4px 12px",
        borderRadius: "6px",
      })}>
        Home
      </NavLink>
          <NavLink to="/courses" style={({ isActive }) => ({
        color: isActive ? COLORS.primary_white : COLORS.primary_black,
        backgroundColor: isActive ? COLORS.primary_red : "transparent",
        padding: "4px 12px",
        borderRadius: "6px",
      })}>
        Courses
      </NavLink>

      <NavLink to="/institutes" style={({ isActive }) => ({
        color: isActive ? COLORS.primary_white : COLORS.primary_black,
        backgroundColor: isActive ? COLORS.primary_red : "transparent",
        padding: "4px 12px",
        borderRadius: "6px",
      })}>
        Institutes
      </NavLink>

      <NavLink to="/offers" style={({ isActive }) => ({
        color: isActive ? COLORS.primary_white : COLORS.primary_black,
        backgroundColor: isActive ? COLORS.primary_red : "transparent",
        padding: "4px 12px",
        borderRadius: "6px",
      })}>
        Offers
      </NavLink>

      <NavLink to="/Queries" style={({ isActive }) => ({
        color: isActive ? COLORS.primary_white : COLORS.primary_black,
        backgroundColor: isActive ? COLORS.primary_red : "transparent",
        padding: "4px 12px",
        borderRadius: "6px",
      })}>
        Queries
      </NavLink>
    </div>

      
        <div className="hidden md:flex items-center gap-4">
        
                    <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center p-2 rounded"
              style={{ color: COLORS.primary_gray, background: "#FFFBD3" }}
            >
              <FiMapPin className="mr-1" />
              <span>{location}</span>
              <FiChevronDown className="ml-1" />
            </button>
            {showDropdown && (
              <div
                className="absolute mt-2 w-44 rounded-lg shadow-md border z-50"
                style={{ background: COLORS.primary_white }}
              >
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>



          
          <div className="flex items-center p-2 rounded" style={{background: '#FFFBD3'}}>
            <FiSearch className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className=" outline-none w-40"
              style={{color:COLORS.primary_gray}}
            />
          </div>

        <Link to="/cartPage">
          <img src={carticon} className='rounded-full p-2' style={{background:COLORS.primary_yellow}}/>   
        </Link>  
        <Link to="/notificationPage">
        <img src={notify} className="rounded-full p-2 cursor-pointer" style={{ background : COLORS.primary_red}}/>
         </Link>  
         <Link to="/profilePage">
          <img src={profileimg} alt="User" className="w-10 h-10 rounded-full object-cover" />
                
         </Link>
        </div>

       
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ color: COLORS.primary_gray, ...(FONTS.medium) as any}}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t" style={{background : COLORS.primary_white}}>
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className=" hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            Courses
          </NavLink>
          <NavLink
            to="/institutes"
            onClick={() => setMenuOpen(false)}
            className=" hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            Institutes
          </NavLink>
          <NavLink
            to="/offers"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            Offers
          </NavLink>
          <NavLink
            to="/Queries"
            onClick={() => setMenuOpen(false)} 
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            Queries
          </NavLink>
          <NavLink
            to="/CartPage"
            onClick={() => setMenuOpen(false)} 
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
          <img src={carticon} className='rounded-full p-2' style={{background:COLORS.primary_yellow}}/>   
            
          </NavLink>
          <NavLink
            to="/CartPage"
            onClick={() => setMenuOpen(false)} 
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
            <img src={notify} className="rounded-full p-2 cursor-pointer" style={{ background : COLORS.primary_red}}/>
          </NavLink>
          <NavLink
            to="/CartPage"
            onClick={() => setMenuOpen(false)} 
            className="hover:text-red-600" style={{color:COLORS.primary_gray }}
          >
           <img src={profileimg} alt="User" className="w-10 h-10 rounded-full object-cover" />

          </NavLink>
        </div>
      )}
    </nav>
    </div>
  )
}

export default Navbar