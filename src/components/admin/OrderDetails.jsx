import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBoxOpen, FaEnvelope, FaUser, FaInfoCircle, FaComment } from "react-icons/fa";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return <div className="text-2xl font-black text-red-600 text-center my-10">No Item Selected</div>;

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  })
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start py-5 justify-center overflow-auto z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white/90 w-full max-w-4xl rounded-2xl shadow-2xl border border-yellow-200 p-6 text-gray-800"
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 hover:text-red-500 transition"
          >
            <FaTimes size={22} />
          </button>

          {/* Title */}
          <h2 className=" text-3xl font-extrabold mb-6 text-center text-yellow-700 tracking-wide">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="grid md:grid-cols-2 gap-4 text-base">
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg shadow-sm">
              <FaBoxOpen className="text-yellow-600" />
              <p><strong>Order ID:</strong> {order._id}</p>
            </div>

            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg shadow-sm">
              <FaUser className="text-yellow-600" />
              <p><strong>Customer:</strong> {order.userName}</p>
            </div>

            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg shadow-sm">
              <FaEnvelope className="text-yellow-600" />
              <p><strong>Email:</strong> {order.userEmail}</p>
            </div>

            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg shadow-sm">
              <FaInfoCircle className="text-yellow-600" />
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 border-b pb-1 text-gray-800">
              Cart Items
            </h3>
            <ul className="space-y-3">
              {order.cartItems?.map((item) => (
                <motion.li
                  key={item.itemID}
                  className="flex justify-between items-center bg-white shadow-md rounded-lg p-3 border border-gray-200 hover:bg-yellow-50 transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-semibold">{item.itemName}</span>
                  <span className="text-sm text-gray-600">
                    Qty: {item.itemQuantity} × Rs {item.itemPrice}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Comment */}
          {order.comment && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 border-b pb-1 text-gray-800 flex items-center gap-2">
                <FaComment className="text-yellow-600" />
                Extra Comment
              </h3>
              <p className="bg-yellow-50 px-4 py-3 rounded-lg shadow-sm text-gray-700">
                {order.comment}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="mt-6 text-right">
            <p className="text-lg font-bold text-yellow-700">
              Total: Rs{" "}
              {order.cartItems
                ?.reduce((total, i) => total + i.itemPrice * i.itemQuantity, 0)
                .toFixed(2)}
            </p>
          </div>

          {/* Footer Button */}
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={onClose}
              className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-full shadow-md hover:bg-yellow-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetails;
