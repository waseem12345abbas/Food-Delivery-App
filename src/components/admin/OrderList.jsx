import React, { useState, useEffect } from "react";
import api from "../../api";
import { usePopup } from "../hooks/usePopUp";
import Popup from "../PopUp";
import OrderDetails from "./OrderDetails";
import { FaEye, FaUser, FaRupeeSign, FaCalendarAlt, FaEdit } from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // get the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders?.slice(indexOfFirstItem, indexOfLastItem);

  // popup hook
  const { popup, showPopup, hidePopup } = usePopup();

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/allOrders");
      setOrders([...res.data.data].reverse());
    } catch (err) {
      setError(err.message);
      showPopup("Failed to fetch orders", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = orders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
      const ress = await api.put(`/api/updateOrderStatus/${id}`, {
        status: newStatus,
      });
      if (ress.status === 200) {
        showPopup("Order updated successfully!", "success");
      }
    } catch (error) {
      showPopup("Failed to update. Please login again.", "error");
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl text-center font-extrabold text-yellow-400 mb-8 tracking-wide">
        Orders Dashboard
      </h1>

      {/* Popup */}
      <Popup
        show={popup.show}
        message={popup.message}
        type={popup.type}
        onClose={hidePopup}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gradient-to-br from-black/50 to-black/100 text-white uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Details</th>
              <th className="px-6 py-3 text-left font-semibold">Customer</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
            </tr>
          </thead>

          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-red-600 text-lg font-semibold"
                >
                  Error: {error}
                </td>
              </tr>
            ) : (
              currentOrders?.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={`border-b hover:bg-black/50 transition duration-300 ${
                    index % 2 === 0 ? "bg-black/40" : "bg-black/50"
                  }`}
                >
                  {/* View Details Button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 bg-gradient-to-br from-black to-black/50 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300"
                    >
                      <FaEye className="text-white" /> View Details
                    </button>
                  </td>

                  {/* Customer Name */}
                  <td className="px-6 py-4   text-gray-800 font-medium flex items-center gap-2">
                    <FaUser className="text-yellow-400" />
                    {order.userName}
                  </td>

                  {/* Total Amount */}
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    <span className="text-yellow-400 text-base font-black font-mono mr-2">RS</span>
                    {order.cartItems?.reduce((total, i) => total + i.itemPrice * i.itemQuantity,0).toFixed(2)}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        className="bg-gradient-to-br from-yellow-100 to-white text-gray-800 font-medium px-3 py-2 rounded-md shadow-sm border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                      >
                        <option value="">Status</option>
                        <option value="Confirmed">Approve Order</option>
                        <option value="Rejected">Reject Order</option>
                      </select>
                    </div>
                  </td>

                  {/* Order Date */}
                  <td className="px-6 py-4 text-black font-medium flex items-center gap-2">
                    <FaCalendarAlt className="text-yellow-400" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* previous page */}
        <button
        disabled={currentPage === 1}
        onClick={ ()=> setCurrentPage((prev)=>prev-1)}
        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        {/* page numbers */}
        {
          Array.from({length: Math.ceil(orders.length / itemsPerPage)}, (_, i)=> 
          (
            <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === i+1 ? 'bg-yellow-600 text-white' : 'bg-yellow-200 text-gray-800'}`}
            >
              {i+1}
            </button>
          )
        )}

        {/* next page */}
        <button
        disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
        onClick={()=>setCurrentPage((prev)=>prev+1)}
        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === Math.ceil(orders.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>

      </div>
    </div>
  );
};

export default OrderList;
