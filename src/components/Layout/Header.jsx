import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkedAlt, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ toggleTheme, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ isLocationOpen, setIsLocationOpen] = useState(null)

  return (
    <div className="bg-yellow-400 shadow-lg  top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-15">
        <div className="flex flex-row justify-between items-center py-3 gap-4 sm:gap-0">

          {/* Careers Link */}
          <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
            <Link className="text-md font-medium text-black transition-colors" to={"/careers"}>
              Careers
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div whileHover={{ scale: 1.02 }} className="hidden md:block relative w-full sm:w-auto sm:max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-black" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants or food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="placeholder-black block w-full pl-10 pr-3 py-2 shadow-md shadow-yellow-400 border border-yellow-400 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-secondary focus:border-transparent text-sm text-black"
            />
          </motion.div>

          {/* Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-2 text-black transition-colors"
            >
              <FaMapMarkedAlt className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">My Location</span>
              <FaChevronDown
                className={`h-3 w-3 transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Profile Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hover:scale-110 w-20 px-4 py-2 rounded-lg bg-white text-black border border-yellow-300 shadow-lg transition cursor-pointer text-medium text-sm"
          >
            <Link to={"/profile"}>Profile</Link>
          </motion.button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hover:scale-110 w-20 px-4 py-2 rounded-lg bg-white text-black border border-yellow-300 shadow-lg transition cursor-pointer text-medium text-sm"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
