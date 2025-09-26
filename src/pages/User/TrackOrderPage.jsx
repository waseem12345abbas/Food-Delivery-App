import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../../api";
import { FaCheck, FaCamera, FaStar } from "react-icons/fa";

export default function OrderStatus() {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:5000"
    );
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const fetchOrder = async () => {
      try {
        const userData = sessionStorage.getItem("userData");
        const guestUserEmail = userData ? JSON.parse(userData).email : null;

        if (guestUserEmail) {
          const guestorderRes = await api.get(`/api/orders/${guestUserEmail}`);
          if (guestorderRes.data.data?.length > 0) {
            const { _id } = guestorderRes.data.data[0];
            setOrderId(_id);

            const resOrderDetails = await api.get(`/api/order/${_id}`);
            setOrder(resOrderDetails.data.data);

            socket.emit("joinOrder", _id);
            socket.on("orderUpdated", (updatedOrder) => setOrder(updatedOrder));
            return;
          } else {
            setError("No orders found for this user.");
            return;
          }
        }

        const resUser = await api.get("/api/profile");
        if (resUser) {
          const email = resUser.data.email;
          const resOrder = await api.get(`/api/orders/${email}`);
          if (resOrder.data.data?.length > 0) {
            const { _id } = resOrder.data.data[0];
            setOrderId(_id);

            const resOrderDetails = await api.get(`/api/order/${_id}`);
            setOrder(resOrderDetails.data);

            socket.emit("joinOrder", _id);
            socket.on("orderUpdated", (updatedOrder) => setOrder(updatedOrder));
          } else {
            setError("No orders found for this user.");
          }
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Failed to load order status. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    return () => socket.off("orderUpdated");
  }, [socket]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
        🚚 Order Status
      </h2>

      {order ? (
        <div>
          {/* Current Stage Info */}
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Current Stage:{" "}
            <span className="text-green-700 font-bold">
              {order?.stages?.length}
            </span>
          </h3>
          {error && (
            <div className="text-red-500 font-semibold text-center">{error}</div>
          )}

          {/* Order Stages */}
          <ul className="space-y-6 mt-6">
            {order.stages?.map((stage, index) => (
              <li
                key={stage._id || index}
                className={`relative p-6 rounded-xl border-l-4 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg
                  ${
                    stage.completed
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-400"
                  }`}
              >
                {/* Step Number */}
                <div
                  className={`absolute -left-5 top-6 flex items-center justify-center w-10 h-10 rounded-full 
                  shadow-md border-2 border-white font-bold text-lg
                  ${
                    stage.completed
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Stage Name */}
                <p className="text-xl font-bold text-gray-800 text-center mb-3">
                  {stage.name}
                </p>

                {/* Status */}
                <p className="text-md flex items-center justify-center gap-2">
                  <strong className="text-gray-900">Status:</strong>
                  {stage.completed ? (
                    <span className="flex items-center gap-2 text-green-700 font-semibold">
                      <FaCheck className="text-lg" /> Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-600 font-semibold animate-pulse">
                      🔄 In Progress
                    </span>
                  )}
                </p>

                {/* Stage Image */}
                {stage.image && (
                  <div className="mt-5 flex flex-col items-center">
                    <p className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-2">
                      <FaCamera className="text-gray-700" />
                      <span>Stage Image</span>
                    </p>
                    <img
                      src={stage.image}
                      alt={stage.name}
                      className="w-44 h-44 rounded-xl shadow-md border border-gray-300 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Updated Time */}
                <p className="text-sm text-gray-500 mt-4 text-right italic">
                  ⏰ Last Updated:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(stage.updatedAt).toLocaleString()}
                  </span>
                </p>
              </li>
            ))}
          </ul>

          {/* Rider Info */}
          {order?.riderDetails && (
            <div className="mt-10 bg-green-50 border border-green-300 rounded-xl shadow-md p-6">
              <p className="text-center text-green-700 font-bold text-2xl mb-6">
                Rider Information
              </p>
              <div className="space-y-3">
                <h2 className="font-bold text-lg text-gray-800">
                  Rider Name:{" "}
                  <span className="text-green-700 font-medium ml-2">
                    {order?.riderDetails?.riderName}
                  </span>
                </h2>
                <h3 className="font-bold text-lg text-gray-800">
                  Rider Phone:{" "}
                  <span className="text-green-700 font-medium ml-2">
                    {order?.riderDetails?.riderNumber}
                  </span>
                </h3>
                <p className="font-bold text-lg text-gray-800">
                  Rider Location:{" "}
                  <span className="text-green-700 font-medium ml-2">
                    {order?.riderDetails?.riderLocation}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Feedback Section */}
          <div className="mt-10 bg-gray-50 border border-green-300 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-center text-green-700 mb-6">
              Share Your Feedback
            </h2>

            {/* Delivery Rating */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">
                How satisfied are you with the{" "}
                <span className="text-green-700">delivery</span>?
              </p>
              <div className="flex gap-2 text-green-500 text-2xl">
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
              </div>
            </div>

            {/* Food Rating */}
            <div>
              <p className="text-gray-700 font-medium mb-2">
                How much did you enjoy the{" "}
                <span className="text-green-700">food</span>?
              </p>
              <div className="flex gap-2 text-green-500 text-2xl">
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
                <FaStar className="cursor-pointer hover:scale-110 transition" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading order status...</p>
      )}
    </div>
  );
}
