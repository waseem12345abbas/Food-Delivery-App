import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                 bg-gradient-to-br from-yellow-400 via-orange-400 to-black 
                 text-white text-center px-6 overflow-hidden"
    >
      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* 404 Animation */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-[7rem] md:text-[10rem] font-extrabold text-white drop-shadow-lg relative z-10"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-xl md:text-2xl font-semibold text-yellow-200 mt-2 relative z-10"
      >
        Oops! Page Not Found 😢
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-100 mt-3 max-w-md text-base md:text-lg relative z-10"
      >
        The page you’re looking for doesn’t exist or has been moved.  
        But don’t worry — you can get back on track below!
      </motion.p>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 relative z-10"
      >
        <Link
          to="/home"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full 
                     hover:bg-yellow-500 transition-all duration-300 shadow-xl hover:scale-105"
        >
          🔙 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
