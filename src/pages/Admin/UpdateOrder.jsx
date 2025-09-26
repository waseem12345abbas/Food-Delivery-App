import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import api from "../../api";

export default function UpdateOrder() {
  const [order, setOrder] = useState(null);
  const [stages, setStages] = useState([]);
  const [timer, setTimer] = useState({ startTime: "", endTime: "" });
  const [orderId, setOrderId] = useState(null);
  const [inputPaymentId, setInputPaymentId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [rider, setRider] = useState(null);
  const [riderDetailsForm, setRiderDetailsForm] = useState({
    rName: "",
    rNum: "",
    rLocation: "",
  });

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // fetch order using payment id
  const fetchOrderByPaymentId = async () => {
    if (!inputPaymentId.trim()) return;
    setLoading(true);
    setError("");
    // trying to fetch order
    try {
      const ress = await api.get(`/api/order/payment/${inputPaymentId}`);
      setOrder(ress.data);
      console.log("RRRRRRRRRRRRRRr = ", ress.data);
      setStages(ress.data.stages || []);
      setTimer(ress.data.timer || { startTime: "", endTime: "" });
      setOrderId(ress.data._id);
    } catch (error) {
      // if order is not fetched then response error message
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
      setOrder(null);
      setStages([]);
      setTimer({ startTime: "", endTime: "" });
      setOrderId(null);
    } finally {
      setLoading(false);
    }
  };
  // join with websocket
  useEffect(() => {
    if (!socket || !orderId) return;
    socket.emit("joinOrder", orderId);

    socket.on("orderUpdated", (updatedOrder) => {
      setOrder(updatedOrder);
      setStages(updatedOrder.stages || []);
      setTimer(updatedOrder.timer || { startTime: "", endTime: "" });
    });

    return () => socket.off("orderUpdated");
  }, [socket, orderId]);
  // show stage update message when any stage is updated runs each time when message is changed
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  //  take the original stage and update with new stage in previous stages array
  const updateStage = (index, field, value) => {
    const newStages = [...stages];
    newStages[index][field] = value;
    setStages(newStages);
  };
  // add a new stage with name , image url and date
  const addStage = () => {
    setStages([
      ...stages,
      { name: "", completed: false, image: "", updatedAt: new Date() },
    ]);
  };

  // update function to update order
  const handleUpdate = () => {
    api.put(`/api/orders/${orderId}`, {
        stages,
        timer,
      })
      .then(() => setMessage("Order updated successfully"))
      .catch((err) => setError(err));
  };

  // clear or delete the stages from the order
  const clearStages = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear all stages? This action cannot be undone."
      )
    ) {
      try {
        await api.put(`/api/orders/${orderId}`, {
          stages: [],
          timer: { startTime: "", endTime: "" },
        });
        setStages([]);
        setTimer({ startTime: "", endTime: "" });
        setMessage("Stages cleared successfully");
      } catch (error) {
        setMessage("Error clearing stages");
      }
    }
  };

  const addRider = async () => {
    const riderDetails = {
      riderName: riderDetailsForm.rName,
      riderNumber: riderDetailsForm.rNum,
      riderLocation: riderDetailsForm.rLocation,
    };
    console.log("Updating rider details with payload:", riderDetails);
    try {
      const response = await api.put(`/api/orders/${orderId}`, {
        riderDetails,
      });
      console.log("Rider update response:", response);
      setMessage("Order Updated Successfully");
      setRider(false); // Close rider section after success
      setRiderDetailsForm({
        rName: "",
        rNum: "",
        rLocation: "",
      });
    } catch (err) {
      console.error("Rider update error:", err.response || err);
      setError(err.response?.data?.message || err.message || "Failed to update rider");
    }
  };
  // handleRider will collect rider details
  const handleRider = (e) => {
    setRiderDetailsForm(
      {
      ...riderDetailsForm,
      [e.target.name] : e.target.value
    }
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Payment ID Input */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
        <input
          type="text"
          placeholder="Enter Payment ID"
          value={inputPaymentId}
          onChange={(e) => setInputPaymentId(e.target.value)}
          className="w-full md:flex-grow border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
        />
        {loading ? (
          <button
            disabled
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold shadow-md cursor-not-allowed"
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={fetchOrderByPaymentId}
            className="text-nowrap bg-black text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
          >
            Fetch Order
          </button>
        )}
      </div>

      {/* Error / Info Message */}
      {error && (
        <div className="text-center bg-red-100 px-4 py-3 rounded-xl text-red-700 font-semibold mb-4 shadow">
          {error}
        </div>
      )}

      {!order && !loading && (
        <div className="text-center bg-yellow-100 rounded-xl px-4 py-3 text-yellow-800 font-semibold shadow mb-4">
          Enter a Payment ID and click Fetch Order to load the order details.
        </div>
      )}

      {/* Order Details */}
      {order && (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Customer Details
          </h1>
          <div className="mb-6 p-4 border border-black shadow-md rounded-xl bg-black/20">
            <h2 className="text-xl font-bold">
              User Name:{" "}
              <span className="text-gray-700 font-medium">
                {order?.userName}
              </span>
            </h2>
            <h3 className="text-base font-semibold mt-1">
              Order ID:{" "}
              <span className="text-gray-800 font-medium">{order?._id}</span>
            </h3>
          </div>

          {message && (
            <div className="text-center bg-green-100 px-4 py-3 rounded-xl text-green-700 font-semibold mb-4 shadow">
              {message}
            </div>
          )}

          {/* Stages */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Update Order
          </h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Stages</h3>
            {stages.map((stage, index) => (
              <div
                key={index}
                className="p-4 mb-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Stage name"
                  value={stage.name}
                  onChange={(e) => updateStage(index, "name", e.target.value)}
                  className="w-full border border-black/20 rounded-lg px-4 py-2 mb-2 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={stage.image}
                  onChange={(e) => updateStage(index, "image", e.target.value)}
                  className="w-full border border-black/20 rounded-lg px-4 py-2 mb-2 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />

                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={stage.completed}
                    onChange={(e) =>
                      updateStage(index, "completed", e.target.checked)
                    }
                    className="w-4 h-4 accent-green-500 bg-black"
                  />
                  <span className="text-gray-700">Completed</span>
                </label>
              </div>
            ))}
            <button
              onClick={addStage}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              ➕ Add Stage
            </button>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Timer</h3>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="datetime-local"
                value={
                  timer.startTime
                    ? new Date(timer.startTime).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setTimer({ ...timer, startTime: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="datetime-local"
                value={
                  timer.endTime
                    ? new Date(timer.endTime).toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  setTimer({ ...timer, endTime: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* update the order */}
            <button
              onClick={handleUpdate}
              className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl px-6 py-3 shadow-md transition-transform hover:scale-105"
            >
              Update Order
            </button>

            {/* remove all the stages when order is completed */}
            <button
              onClick={clearStages}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              🗑️ Clear Updated Stages
            </button>

            {/* give rider details */}
            <button
              onClick={() => setRider((prev) => !prev)}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-101"
            >
              Rider
            </button>
          </div>
          {/* rider details */}
          {rider && (
            <div className="my-10 flex flex-col gap-2 bg-gray-200 rounded-md pt-2 pb-10 px-3 text-black">
              <p className="text-center my-2">
                Give Rider Details at the end when all stages are completed.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); addRider(); }}>
                <input
                  onChange={handleRider}
                  name="rName"
                  type="text"
                  placeholder="Rider Name"
                  className="border bg-white border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black"
                />
                <input
                  onChange={handleRider}
                  name="rNum"
                  type="text"
                  placeholder="Rider Number"
                  className="border bg-white border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black"
                />
                <input
                  onChange={handleRider}
                  name="rLocation"
                  type="text"
                  placeholder="Location"
                  className="border bg-white border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black"
                />
                <button
                  type="submit"
                  className="max-w-md bg-black text-white rounded-md py-2 px-3 cursor-pointer hover:scale-101"
                >
                  Add
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
