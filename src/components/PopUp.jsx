import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Popup = ({ show, message, type, onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  // Animate progress bar and auto-close
  useEffect(() => {
    if (show) {
      setProgress(100);
      const start = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(100 - (elapsed / duration) * 100, 0);
        setProgress(remaining);
        if (elapsed >= duration) {
          clearInterval(timer);
          onClose(); // Auto close after duration
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [show, duration, onClose]);

  // Gradient colors
  const colorMap = {
    success: "from-green-400 to-emerald-600",
    error: "from-red-500 to-rose-700",
    info: "from-blue-400 to-indigo-600",
    warning: "from-yellow-400 to-orange-600",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative bg-gradient-to-br ${colorMap[type]} p-6 sm:p-8 rounded-3xl shadow-2xl text-white w-full max-w-sm text-center border border-white/20`}
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold mb-3 tracking-wide drop-shadow-lg">
              {type.toUpperCase()}
            </h2>

            {/* Message */}
            <p className="mb-6 text-sm sm:text-base leading-relaxed">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={onClose}
                className="bg-white/90 text-gray-900 font-semibold px-5 py-2.5 rounded-xl hover:bg-white transition-all duration-200 shadow-md"
              >
                OK
              </button>
              <button
                onClick={onClose}
                className="border border-white/80 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                Cancel
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/90 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-white/10 rounded-3xl blur-2xl -z-10"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
