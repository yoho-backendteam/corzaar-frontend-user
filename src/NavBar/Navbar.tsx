import React, { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiMapPin,
  FiChevronDown,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logocap from "../assets/images/logocap.png";
import carticon from "../assets/images/shopping-cart.png";
import notify from "../assets/images/notification.png";
import profileimg from "../assets/images/profileimg.png";
import logout from "../assets/images/export.svg";
import { COLORS, FONTS } from "../Constants/uiconstants";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState("Mumbai, India");
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const locations = ["Chennai", "Bangalore", "Pune", "Salem"];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <nav
        className="shadow-md sticky top-0 z-50 w-full"
        style={{ ...(FONTS.regular as any), background: COLORS.primary_white }}
      >
        <div className="flex flex-wrap items-center justify-between px-5 md:px-7 py-4 md:py-7 gap-4">
         
          <NavLink to="/Home" className="sm:flex md:flex items-center gap-2">
            <img src={logocap} alt="Logo" className="w-8 h-8" />
            <h1
              style={{ ...(FONTS.boldHeading as any), color: COLORS.primary_red }}
              className="hidden sm:block"
            >
              CORZAAR
            </h1>
          </NavLink>

        
          <div
            className="hidden xl:flex items-center gap-2 flex-wrap text-center"
            style={FONTS.regular as any}
          >
            {["Home", "Courses", "Institutes", "Offers", "Queries"].map(
              (name) => (
                <NavLink
                  key={name}
                  to={`/${name === "Home" ? "Home" : name.toLowerCase()}`}
                  style={({ isActive }) => ({
                    color: isActive
                      ? COLORS.primary_white
                      : COLORS.primary_black,
                    backgroundColor: isActive
                      ? COLORS.primary_red
                      : "transparent",
                    padding: "4px 12px",
                    borderRadius: "6px",
                  })}
                >
                  {name}
                </NavLink>
              )
            )}
          </div>

    
          <div className="flex items-center gap-4 shrink-0">
           
            <div className="hidden md:flex xl:flex relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                style={{ color: COLORS.primary_gray, background: "#FFFBD3" }}
              >
                <FiMapPin className="mr-1 text-red-500" />
                <span className="truncate max-w-[100px]">{location}</span>
                <FiChevronDown className="ml-1" />
              </button>
              {showDropdown && (
                <div
                  className="absolute mt-2 w-40 rounded-xl shadow-lg p-3 border z-50"
                  style={{ background: "#FFFBD3" }}
                >
                  <div className="space-y-2">
                    {locations.map((loc) => (
                      <div
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-2 bg-white px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50 text-red-500 font-medium"
                      >
                        <FiMapPin /> {loc}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          
            <div
              className="hidden md:flex items-center p-2 rounded w-48"
              style={{ background: "#FFFBD3" }}
            >
              <FiSearch className="mr-2" style={{ color: COLORS.primary_gray }} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm"
                style={{ color: COLORS.primary_gray }}
              />
            </div>

          
            <div className="hidden xl:flex items-center gap-4">
              <Link to="/cartPage">
                <img
                  src={carticon}
                  className="rounded-full p-2 w-10 h-10"
                  style={{ background: COLORS.primary_yellow }}
                />
              </Link>
              <Link to="/notificationPage">
                <img
                  src={notify}
                  className="rounded-full p-2 w-10 h-10 cursor-pointer"
                  style={{ background: COLORS.primary_red }}
                />
              </Link>
            </div>

           
            <div className="relative" ref={profileRef}>
              <img
                src={profileimg}
                alt="User"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => setShowProfile((prev) => !prev)}
              />
              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-2xl p-5 z-50">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Rahul Sharma
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">Student</p>

                  <ul className="space-y-3 text-gray-700">
                    <Link to="Portfolio" onClick={() => setShowProfile(false)}>
                      <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                        <FiUser size={16} /> My Profile
                      </li>
                    </Link>
                    <Link to="Mycourse" onClick={() => setShowProfile(false)}>
                      <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                        <FiShoppingCart size={16} /> My Courses
                      </li>
                    </Link>
                    <Link to="Settingprofile" onClick={() => setShowProfile(false)}>
                      <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                        <IoSettingsOutline size={16} /> Settings
                      </li>
                    </Link>
                  </ul>

                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center justify-center gap-1 w-full py-2 mt-5 rounded-md hover:bg-red-600 transition"
                    style={{
                      background: COLORS.primary_red,
                      color: COLORS.primary_white,
                    }}
                  >
                    <img src={logout} alt="logout icon" className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>

           
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl xl:hidden"
              style={{ color: COLORS.primary_gray, ...(FONTS.medium as any) }}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="xl:hidden flex flex-col items-center gap-4 py-4 border-t w-full"
            style={{ background: COLORS.primary_white }}
          >
            {["Home", "Courses", "Institutes", "Offers", "Queries"].map(
              (name) => (
                <NavLink
                  key={name}
                  to={`/${name === "Home" ? "Home" : name.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-red-600"
                  style={{ color: COLORS.primary_gray }}
                >
                  {name}
                </NavLink>
              )
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
