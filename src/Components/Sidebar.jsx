import { NavLink } from "react-router-dom";
import { ShoppingCart, Heart, LogIn, LogOut, ChevronLeft, ChevronRight, Home, User } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "./Firebase"; // Import Firebase authentication
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./Auth";
import Logo from "../assets/Ran Gaming Logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Auth isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={`relative text-white ${
            isOpen ? "w-72" : "w-20"
          } h-screen p-5 flex flex-col fixed transition-all duration-300 overflow-hidden top-0 left-0 sidebar-bg`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <a href="/">
              <img src={Logo} className="w-40 h-40 object-contain" alt="Logo" />
            </a>
          </div>

          {/* Sidebar Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="relative z-10 mb-5 text-white focus:outline-none">
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>

          <h2 className={`relative z-10 text-2xl font-bold mb-5 ${!isOpen && "hidden"}`}>Dashboard</h2>

          {/* Navigation Links */}
          <nav className="relative z-10 flex flex-col space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
              }
            >
              <Home size={20} /> {isOpen && <span>Home</span>}
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
              }
            >
              <ShoppingCart size={20} /> {isOpen && <span>My Cart</span>}
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
              }
            >
              <Heart size={20} /> {isOpen && <span>My Favorites</span>}
            </NavLink>
          </nav>

          {/* Auth Section */}
          <div className="relative z-10 mt-auto">
            {user ? (
              <div className="flex items-center space-x-2 p-2 bg-gray-500 hover:bg-gray-800 cursor-pointer rounded-lg">
                <User size={24} />
                {isOpen && <span>{user.displayName || "User"}</span>}
                <button onClick={handleLogout} className="text-white ml-auto">
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsPopupOpen(true)}
                className="flex items-center space-x-2 p-2 bg-gray-500 hover:bg-gray-800 cursor-pointer rounded-lg"
              >
                <LogIn size={24} />
                {isOpen && <span>Login</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 border-t border-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            <Home size={24} />
            <span className="text-sm">Home</span>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            <ShoppingCart size={24} />
            <span className="text-sm">Cart</span>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            <Heart size={24} />
            <span className="text-sm">Favorites</span>
          </NavLink>
          <div className="relative">
            {user ? (
              <button onClick={handleLogout} className="flex flex-col items-center text-white">
                <User size={24} />
                <span className="text-sm">{user.displayName || "Logout"}</span>
              </button>
            ) : (
              <button onClick={() => setIsPopupOpen(true)} className="flex flex-col items-center text-white">
                <LogIn size={24} />
                <span className="text-sm">Login</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>
        {`
          /* Background Image */
          .sidebar-bg {
            background-image: url('https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg');
            background-size: cover;
            background-position: center;
            position: relative;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
