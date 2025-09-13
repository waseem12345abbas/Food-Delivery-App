import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-black pt-10 pb-6 px-4 md:px-16 shadow-lg border-t-2 border-yellow-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-black pb-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-3">SROMS</h2>
          <p className="text-sm text-yellow-400">
            Smart Restaurant Ordering & Management System. Order food anytime, anywhere — fresh and fast!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-black">
            <li><Link to="/home" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/special-offers" className="hover:text-primary transition">Special Offers</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary transition">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="text-sm text-black space-y-2">
            <li>Email: support@sroms.com</li>
            <li>Phone: +92 300 1234567</li>
            <li>Address: Lahore, Pakistan</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary text-xl transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary text-xl transition"><FaInstagram /></a>
            <a href="#" className="hover:text-primary text-xl transition"><FaTwitter /></a>
            <a href="#" className="hover:text-primary text-xl transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-black pt-6">
        &copy; {new Date().getFullYear()} SROMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
