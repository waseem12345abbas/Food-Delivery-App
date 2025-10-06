import React, { useState, useEffect } from "react";
import api from "../../api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("")
  const fetchOrders = async (req, res) => {
    try {
      const res = await api.get("/api/allOrders");
      setOrders(res.data.data);
    } catch (err) {
      setError(err.message);
    }
  };
  // fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = orders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
      // send update in the backend
      const ress = await api.put(`/api/updateOrderStatus/${id}`, { status: newStatus });
      if(ress.status === 200){
        setMessage(ress.data.message || "Order updated successfully")
      }
    } catch (error) {
      alert("Faild to update please try again. Or Login");
    }
  };
  // set timer and remove timer
  useEffect(()=>{
    if(message){
      const timer =setTimeout(()=>setMessage(""), 2000)
      return ()=>clearTimeout(timer)
    }
  },[message])
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl text-center font-bold text-black mb-6">Orders</h1>
    
      {message && (
        <div className="my-4 rounded-md bg-green-300"><h2 className="pl-2 py-4 text-black font-medium">{message}</h2></div>
      )}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left text-nowrap">Payment ID</th>
              <th className="px-6 py-3 text-left text-nowrap">Payment Proof</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-yellow-400">
            {error ? (
              <div className="my-5 text-nowrap text-2xl text-red-500">
                `Error ${error}`
              </div>
            ) : (
              orders &&
              orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-6 py-4 text-black">{order._id}</td>
                  <td className="px-6 py-4 text-black">{order.userName}</td>
                  <td className="px-6 py-4 text-black">
                    {order.cartItems?.map((i, index) => (
                      <li className="text-nowrap" key={index}>{i.itemName}</li>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-nowrap">
                    RS
                    {order.cartItems
                      ?.reduce(
                        (total, i) => total + i.itemPrice * i.itemQuantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.paymentId}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`/uploads/${order.proofImage}`}
                      alt={order.userName}
                    />
                  </td>
                  <td className="px-6 py-4 text-black">{order.status}</td>
                  <td className="px-6 py-4 text-black text-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="bg-yellow-200 text-black px-2 py-1 rounded"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="Confirmed">Approve Order</option>
                      <option value="Rejected">Reject Order</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
