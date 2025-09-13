import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import api from "../../api";

const socket = io("http://localhost:5000");

export default function UpdateOrder() {
  const [order, setOrder] = useState(null);
  const [stages, setStages] = useState([]);
  const [timer, setTimer] = useState({ startTime: "", endTime: "" });
  const [orderId, setOrderId] = useState(null);
  const [error, setErorr] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/api/profile");
        const email = res.data.email;
        if (res) {
          try {
            const currentOrder = await api.get(`/api/orders/${email}`);
            const { _id } = currentOrder.data.data[0];
            setOrderId(_id);
            const ress = await api.get(`/api/order/${_id}`);
            setOrder(ress.data);
            setStages(ress.data.stages || []);
            setTimer(ress.data.timer || { startTime: "", endTime: "" });
          } catch (error) {
            setErorr(error.message || "An error occurred");
          }
        }
      } catch (error) {
        setErorr(error.message || "An error occurred");
      }
    };

    fetchOrder();

    // Join order room (only if orderId is set)
    if (orderId) {
      socket.emit("joinOrder", orderId);

      // Listen for updates
      socket.on("orderUpdated", (updatedOrder) => {
        setOrder(updatedOrder);
        setStages(updatedOrder.stages || []);
        setTimer(updatedOrder.timer || { startTime: "", endTime: "" });
      });
    }

    return () => {
      socket.off("orderUpdated");
    };
  }, []); // Remove orderId from dependencies to prevent re-runs
  // set a timer to clear the message after 3 seconds
  useEffect(()=>{
    if(message) {
      const timer = setTimeout(()=>{
        setMessage("")
      })
      return ()=> clearTimeout(timer)
    }
  },[message])
  const updateStage = (index, field, value) => {
    const newStages = [...stages];
    newStages[index][field] = value;
    setStages(newStages);
  };

  const addStage = () => {
    setStages([
      ...stages,
      { name: "", completed: false, image: "", updatedAt: new Date() },
    ]);
  };

  const handleUpdate = () => {
    api
      .put(`/api/orders/${orderId}`, {
        stages,
        timer,
      })
      .then((res) => {
        console.log("Order updated");
      })
      .catch((err) => console.error(err));
  };

  // call api and clear stages from the databse
  const clearStages = async () => {
    if(window.confirm("Are you sure you want to clear all stages? This action cannot be undone.")) {
      try {
        setStages([])
        console.log("Order Id,", orderId)
        await api.put(`/api/orders/${orderId}`, { stages: [], timer: { startTime: "", endTime: "" } });
        setStages([]);
        setMessage("Stages cleared");
        setTimer({ startTime: "", endTime: "" });
      } catch (error) {
        setMessage("Error clearing stages", error.message || "An error occurred");
      }
    }
  }
  if (error) {
    return <div className="text-center bg-red-300 px-4 py-4 rounded-lg text-red-700 text-xl font-semibold">{error}</div>;
  }
  if (!order) return <div className="text-center bg-yellow-400 rounded-lg px-4 py-4 text-black text-xl font-semibold">No Order FOund</div>;

  return (
    <div className="p-4">
      {/* current order */}
      <h1 className="text-2xl text-center mb-2 font-bold">Customer Details</h1>
      <div className="mb-6 p-4 border border-yellow-500 shadow-md shadow-neutral-500 rounded-lg bg-yellow-400 shadow">
        <h2 className="text-xl font-bold my-2">User Name: <span className="text-neutral-500 font-semibold">{order?.userName}</span></h2>
        <h3 className="text-base font-semibold">Order ID: <span className="text-neutral-500 font-semibold">{order?._id}</span></h3>
      </div>
      {message && <div className="text-center bg-green-300 px-4 py-4 rounded-lg text-green-700 text-xl font-semibold mb-4">{message}</div>}
      <h2 className="text-2xl font-bold mb-4">Update Order</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Stages</h3>
        {stages.map((stage, index) => (
          <div key={index} className="border p-2 mb-2">
            <input
              type="text"
              placeholder="Stage name"
              value={stage.name}
              onChange={(e) => updateStage(index, "name", e.target.value)}
              className="border p-1 mr-2"
            />
            <input
              type="checkbox"
              checked={stage.completed}
              onChange={(e) =>
                updateStage(index, "completed", e.target.checked)
              }
            />{" "}
            Completed
            <input
              type="text"
              placeholder="Image URL"
              value={stage.image}
              onChange={(e) => updateStage(index, "image", e.target.value)}
              className="border p-1 ml-2"
            />
          </div>
        ))}
        <button onClick={addStage} className="bg-yellow-400 text-black px-4 py-2 rounded-md shadow-md shadow-neutral-500">
          Add Stage
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Timer</h3>
        <input
          type="datetime-local"
          value={
            timer.startTime
              ? new Date(timer.startTime).toISOString().slice(0, 16)
              : ""
          }
          onChange={(e) => setTimer({ ...timer, startTime: e.target.value })}
          className="border p-1 mr-2"
        />
        <input
          type="datetime-local"
          value={
            timer.endTime
              ? new Date(timer.endTime).toISOString().slice(0, 16)
              : ""
          }
          onChange={(e) => setTimer({ ...timer, endTime: e.target.value })}
          className="border p-1"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
         <button
        onClick={handleUpdate}
        className="bg-yellow-400 text-black rounded-md px-4 py-2 shadow-md shadow-neutral-500"
      >
        Update Order
      </button>

      <button 
      onClick={clearStages}
      className="bg-black text-white px-4 py-2 rounded-md shadow-md shadow-neutral-500">Clear Updated Stages</button>
      </div>
    </div>
  );
}
