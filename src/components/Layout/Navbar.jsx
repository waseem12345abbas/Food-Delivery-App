import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Header from "./Header";

const Navbar = ({ toggleTheme, darkMode }) => {
  const itemsLength = useSelector((state) => state.cart.cart);
  console.log(itemsLength.length);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-lg">
      {/* location and call to action section */}
      <div className="pb-4">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      </div>

      {/* navbar */}
      <div className="sticky z-50">
        {/* pages section */}
        <div className="max-w-7xl mx-auto px-4 pb-1 flex items-center justify-between">
          {/* Logo */}
          <Link to={"/"} className="flex items-center space-x-2">
            <img
              src="/logo/sroms.png"
              alt="logo"
              className="h-12 w-auto rounded"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-black font-medium text-[1.2rem]">
            <Link to="/home" className=" transition hover:border-b-2 border-black">
              Home
            </Link>
            <Link
              to="/about"
              className=" transition hover:border-b-2 border-black"
            >
              About Food
            </Link>
            <Link
              to="/my-order"
              className=" transition hover:border-b-2 border-black"
            >
              My Order
            </Link>
          </nav>

          {/* User Icon */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-black hover:text-black cursor-pointer"
            >
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                {itemsLength.length > 0 ? itemsLength.length : 0}
              </span>
            </Link>
            <Link
              to={"/login"}
              className="bg-yellow-400 text-black border border-neutral-400 shadow-neutral-500 px-4 py-2 w-20 rounded-lg hover:scale-105 hover:bg-yellow-500 hover:text-white transition-all cursor-pointer shadow-md"
            >
              Login
            </Link>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-center gap-2">
            <button
              onClick={toggleMenu}
              className="text-black cursor-pointer"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
            <div className="flex items-center space-x-4">
              <Link
                to={"/cart"}
                className="relative text-black"
              >
                <FaShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                  {itemsLength.length > 0 ? itemsLength.length : 0}
                </span>
              </Link>
              <button className="bg-yellow-400 text-black border border-neutral-400 shadow-neutral-500 px-4 py-2 w-20 rounded-lg hover:scale-105 hover:bg-yellow-500 hover:text-white transition-all cursor-pointer shadow-md">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-yellow-400 px-6 py-4 shadow-md">
            <nav className="flex flex-col items-center space-y-3 text-black text-xl font-semibold">
              <Link to="/home" className="text-xl  hover:border-b-2">
                Home
              </Link>
              <Link
                to="/about"
                className="transition hover:border-b-2 border-black"
              >
                About Food
              </Link>
              <Link
                to="/my-order"
                className="transition hover:border-b-2 border-black"
              >
                {" "}
                My Orders
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
