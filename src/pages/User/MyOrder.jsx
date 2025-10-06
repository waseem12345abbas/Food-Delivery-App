import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api";
import { Link, useLocation } from "react-router-dom";


const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userType = sessionStorage.getItem("userType");
        const userData = sessionStorage.getItem("userData");

          if (userType === "guest" && userData) {
            // For guest users, parse guest data and fetch orders by guest email
            const guestUser = JSON.parse(userData);
            const guestEmail = guestUser.email;
            if (guestEmail) {
              // Fetch orders by guest email
              const orderRes = await api.get(`/api/orders/${guestEmail}`);
              setOrders(orderRes.data.data || []);
            }
          } else {
            // For authenticated users, fetch profile and then orders
            const res = await api.get("/api/profile");
            const email = res.data.email;
            if (email) {
              const orderRes = await api.get(`/api/orders/${email}`);
              setOrders(orderRes.data.data || []);
            }
          }
      } catch (error) {
        console.error("Error fetching orders:", error);
        // For guest users, if the API fails, show empty orders
        const userType = sessionStorage.getItem("userType");
        if (userType === "guest") {
          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-lg font-semibold text-gray-500 mt-20"
      >
        Loading your orders...
      </motion.p>
    );

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-black"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        My Orders
      </motion.h1>

      {orders.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 text-lg mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You have no orders yet.
        </motion.p>
      ) : (
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="relative bg-yellow-400 shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
             
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4 mt-2">
                <h2 className="text-lg font-semibold text-black">
                  Order ID:{" "}
                  <span className="text-white font-bold">
                    {order._id}
                  </span>
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium shadow-sm ${
                    order.status === "Confirmed"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : order.status === "Rejected"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Shipping Details */}
              <div className="mb-4">
                <h3 className="font-semibold text-black">
                  Shipping Details
                </h3>
                <p className="text-gray-700">{order.userName}</p>
                <p className="text-gray-700">{order.userEmail}</p>
              </div>

              {/* Cart Items */}
              <div className="mb-4">
                <h3 className="font-semibold text-black mb-2">Cart Items</h3>
                <ul className="space-y-2">
                  {order.cartItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex justify-between items-center bg-yellow-50 px-3 py-2 rounded-lg shadow-sm text-black"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span>{item.itemName}</span>
                      <span className="font-medium">
                        {item.itemQuantity} × RS{item.itemPrice}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                <p>
                  Ordered on:{" "}
                  <span className="font-medium text-white">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      {/* view the order */}
      <div className="flex items-center justify-center py-5">
      <Link to='/track-order' className="w-full md:w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold rounded-lg py-2 border border-yellow-500 text-center">Track Order</Link>
      </div>
    </motion.div>
  );
};

export default MyOrder;
