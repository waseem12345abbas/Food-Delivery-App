import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed inset-0 md:inset-y-0 md:right-0 md:w-96 bg-gradient-to-b from-yellow-400 via-amber-500 to-black text-white z-[70] flex flex-col justify-between shadow-2xl backdrop-blur-lg"
        >
          {/* Close Button */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-yellow-300/40">
            <h2 className="text-xl font-bold tracking-wide">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col items-center gap-6 text-lg font-semibold py-8">
            <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-yellow-200">
              Home
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-yellow-200">
              About Food
            </Link>
            <Link to="/my-order" onClick={() => setMenuOpen(false)} className="hover:text-yellow-200">
              My Orders
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-yellow-200">
              Profile
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="flex justify-around items-center p-6 border-t border-yellow-300/30">
            <Link
              to="/login"
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-100 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
