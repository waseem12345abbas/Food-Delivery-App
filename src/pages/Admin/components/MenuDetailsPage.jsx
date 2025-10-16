import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaTag, FaDollarSign, FaInfoCircle, FaUtensils, FaImage } from 'react-icons/fa';

const MenuDetailsPage = ({ menuItem, onClose }) => {
  const [viewImage, setViewImage] = useState(false);

  if (!menuItem)
    return (
      <div className="text-2xl font-black text-red-600 text-center my-10">
        No Item Selected
      </div>
    );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white/95 w-full max-w-4xl rounded-2xl shadow-2xl border border-yellow-300 text-gray-800 p-6"
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Close Button */}
          <FaTimes
            size={22}
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition cursor-pointer"
          />

          <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-700 tracking-wide">
            Menu Item Details
          </h2>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Section */}
            <motion.div
              className="flex justify-center items-center bg-yellow-50 rounded-xl p-4 shadow-inner"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                onClick={() => setViewImage(true)}
              />
            </motion.div>

            {/* Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg">
                <FaUtensils className="text-yellow-600" />
                <span className="font-semibold text-gray-900">Name:</span>
                <span>{menuItem.name}</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <FaDollarSign className="text-green-600" />
                <span className="font-semibold text-gray-900">Price:</span>
                <span>Rs {menuItem.price}</span>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <FaTag className="text-blue-600" />
                <span className="font-semibold text-gray-900">Category:</span>
                <span>{menuItem.category}</span>
              </div>

              {menuItem.description && (
                <div className="flex items-start gap-3 text-lg">
                  <FaInfoCircle className="text-purple-600 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900">Description:</span>
                    <p className="text-gray-700 mt-1 leading-relaxed">
                      {menuItem.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="my-8 flex justify-center gap-6">
            <motion.button
              onClick={() => setViewImage(true)}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaImage />
              View Full Image
            </motion.button>

            <motion.button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-full shadow-md hover:bg-gray-800 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>

        {/* Full Image Modal */}
        <AnimatePresence>
          {viewImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewImage(false)}
            >
              <motion.img
                src={menuItem.image}
                alt="Full View"
                className="max-w-3xl w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
              <FaTimes
                size={24}
                onClick={() => setViewImage(false)}
                className="absolute top-6 right-6 text-white cursor-pointer hover:text-red-500 transition"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default MenuDetailsPage;
