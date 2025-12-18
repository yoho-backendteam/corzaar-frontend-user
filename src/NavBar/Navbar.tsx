import React, { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiMapPin,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import logocap from "../assets/images/logocap.png";
import carticon from "../assets/images/shopping-cart.png";
import notify from "../assets/images/notification.png";
import profileimg from "../assets/images/profileimg.png";
import logoutsrc from "../assets/images/export.svg";
import { COLORS, FONTS } from "../Constants/uiconstants";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../context/context";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Initialize location from localStorage or default "Fetching..."
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("userLocation") || "Fetching...";
  });

 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {

    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setShowProfile(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // Reverse geocode function using Nominatim OpenStreetMap API
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        "Unknown location";

      localStorage.setItem("userLocation", city);
      setLocation(city);
      toast.success("Location found: " + city);
    } catch (error) {
      toast.error("Failed to get location name");
      setLocation("Unknown location");
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Your browser does not support location");
      return;
    }

    const loadingId = toast.loading("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        reverseGeocode(latitude, longitude).finally(() => {
          toast.dismiss(loadingId);
        });
      },
      () => {
        toast.dismiss(loadingId);
        toast.error("Failed to get your geolocation");
        setLocation("Location unavailable");
      }
    );
  };

  return (
    <div >
      <nav
        className="shadow-md sticky top-0 z-50 w-full"
        style={{ ...(FONTS.regular as any), background: COLORS.primary_white }}
      >
        <div className="flex flex-wrap items-center justify-between px-5 md:px-7 py-4 md:py-7 gap-4">
          <NavLink to="/" className="sm:flex md:flex items-center gap-2">
            <img src={logocap} alt="Logo" className="w-8 h-8" />
            <h1
              style={{
                ...(FONTS.boldHeading as any),
                color: COLORS.primary_red,
              }}
              className="hidden sm:block"
            >
              CORZAAR
            </h1>
          </NavLink>

          <div
            className="hidden xl:flex items-center gap-2 flex-wrap text-center"
            style={FONTS.regular as any}
          >
            {["home", "courses", "institutes", "offers", "queries"].map(
              (name) => (
                <NavLink
                  key={name}
                  to={`/${name === "home" ? "" : name.toLowerCase()}`}
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
            <div
              className="flex gap-2 p-2 rounded-xl"
              style={{ color: COLORS.primary_gray, background: "#FFFBD3" }}
            >
              <FiMapPin
                className="cursor-pointer text-red-500 text-xl"
                onClick={handleGetLocation}
              />
              Near Me
            </div>
            <div className="hidden md:flex xl:flex relative">
              <button
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                style={{ color: COLORS.primary_gray, background: "#FFFBD3" }}
              >
                <FiMapPin className="mr-1 text-red-500" />
                <span className="truncate max-w-[100px]">{location}</span>
              </button>
            </div>

            {/* <div
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
            </div> */}

            {isAuthenticated && (
              <div className="hidden xl:flex items-center gap-4">
                <Link to="/cart">
                  <img
                    src={carticon}
                    className="rounded-full p-2 w-10 h-10"
                    style={{ background: COLORS.primary_yellow }}
                  />
                </Link>
                <Link to="/notification">
                  <img
                    src={notify}
                    className="rounded-full p-2 w-10 h-10 cursor-pointer"
                    style={{ background: COLORS.primary_red }}
                  />
                </Link>
              </div>
            )}

            {!isAuthenticated ? (
              <Link to="/login">
                <div
                  className={`flex items-center rounded-full p-2 w-10 h-10 cursor-pointer bg-[${COLORS.primary_red}]`}
                >
                  <IoMdLogIn className="text-white h-10 w-10" />
                </div>
              </Link>
            ) : (
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
                      {/* <Link to="Portfolio" onClick={() => setShowProfile(false)}>
                        <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                          <FiUser size={16} /> My Profile
                        </li>
                      </Link> */}

                      {/* <Link to="Mycourse" onClick={() => setShowProfile(false)}>
                        <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                          <FiShoppingCart size={16} /> My Courses
                        </li>
                      </Link> */}

                      <Link
                        to="/setting"
                        onClick={() => setShowProfile(false)}
                      >
                        <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                          <IoSettingsOutline size={16} /> Settings
                        </li>
                      </Link>
                    </ul>

                    <button
                      onClick={() => logout()}
                      className="flex items-center justify-center gap-1 w-full py-2 mt-5 rounded-md hover:bg-red-600 transition"
                      style={{
                        background: COLORS.primary_red,
                        color: COLORS.primary_white,
                      }}
                    >
                      <img src={logoutsrc} alt="logout icon" className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl xl:hidden cursor-pointer"
              style={{ color: COLORS.primary_gray, ...(FONTS.medium as any) }}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="xl:hidden flex flex-col items-center gap-4 py-4 border-t w-full "
            style={{ background: COLORS.primary_white }}
          >
            {["Home", "Courses", "Institutes", "Offers", "Queries"].map((name) => (
              <NavLink
                key={name}
                to={`/${name === "Home" ? "" : name.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-red-600 "
                style={{ color: COLORS.primary_gray }}
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
