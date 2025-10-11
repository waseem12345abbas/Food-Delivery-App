import React, { useState } from "react";
import { FaMapMarkedAlt, FaChevronDown, FaBars, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar"; // ✅ Import Navbar
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ toggleTheme, darkMode }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Control sidebar
  const itemsLength = useSelector((state) => state.cart.cart);

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setLocation(data.display_name || "Location found");
        } catch {
          setError("Unable to fetch location name.");
        }
        setLoading(false);
      },
      () => {
        setError("Permission denied or unable to get location.");
        setLoading(false);
      }
    );
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-black text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center gap-4">

          {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img
              src="/logo/joyfultable.png"
              alt="Logo"
              className="h-10 w-auto rounded-md shadow-md"
            />
            <h1 className="text-lg md:text-xl font-bold tracking-wide">
              Joyful Table
            </h1>
          </motion.div>

          {/* Center: Location */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              if (!location) handleGetLocation();
            }}
            className="flex items-center gap-2 bg-black/30 hover:bg-black/50 transition-all px-4 py-2 rounded-full shadow-md backdrop-blur-sm"
          >
            <FaMapMarkedAlt className="text-yellow-300 text-lg" />
            <span className="text-sm truncate w-28 md:w-40 text-left">
              {location ? location.split(",")[0] : "My Location"}
            </span>
            <FaChevronDown
              className={`text-xs transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

         {/* Right: Menu & Cart */}
<div className="flex items-center gap-4">
  {/* Cart Icon */}
  <Link
    to="/cart"
    className="relative flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
    <FaShoppingCart size={20} />
    <span className="absolute -top-2 -right-2 bg-black text-yellow-300 text-xs rounded-full px-[6px] font-bold shadow-md">
      {itemsLength.length > 0 ? itemsLength.length : 0}
    </span>
  </Link>

  {/* Menu Icon */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setMenuOpen(true)}
    className="flex items-center justify-center p-2 rounded-full border border-yellow-400 bg-gradient-to-br from-black to-gray-800 text-yellow-300 hover:bg-gradient-to-t hover:shadow-lg transition-all duration-300"
  >
    <FaBars size={20} />
  </motion.button>
</div>

        </div>

        {/* Location Modal */}
        <AnimatePresence>
          {isLocationOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsLocationOpen(false)}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {loading ? (
                  <p className="text-gray-600">Fetching location...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : location ? (
                  <>
                    <h2 className="text-lg font-semibold mb-2">Your Location:</h2>
                    <p className="text-gray-700 text-sm">{location}</p>
                  </>
                ) : (
                  <p className="text-gray-500">Click to detect your location.</p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sidebar Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Header;
