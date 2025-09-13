import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import api from "../../api";
import { FaCheck , FaCamera} from 'react-icons/fa'

export default function OrderStatus() {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    // initialize socket connection
    const newSocket = io(
      process.env.REACT_APP_SOCKET_URL ||
      "http://localhost:5000"
    );
    setSocket(newSocket)

    return ()=>{
      newSocket.disconnect()
    }
  },[])
  useEffect(() => {
    if (!socket) return;
    const fetchOrder = async () => {
      try {
        const resUser = await api.get("/api/profile");
        if (resUser) {
          const email = resUser.data.email;
          const resOrder = await api.get(`/api/orders/${email}`);
          const { _id } = resOrder.data.data[0];

          setOrderId(_id);

          // Fetch initial order details
          const resOrderDetails = await api.get(`/api/order/${_id}`);
          setOrder(resOrderDetails.data);

          // join order room
          socket.emit("joinOrder", _id);

          // listen for updates
          socket.on("orderUpdated", (updatedOrder) => {
            setOrder(updatedOrder);
          });
        } else {
          console.log("NO User Found");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();

    return () => {
      socket.off("orderUpdated");
    };
  }, [orderId]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        🚚 Order Status
      </h2>

      {order ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
            Current Stage:{" "}
            <span className="text-black">{order.stages.length}</span>
          </h3>
          <ul className="space-y-4 mt-4">
            {order.stages &&
              order.stages.map((stage, index) => (
                <li
                  key={stage._id || index}
                  className={`p-4 rounded-xl shadow-md bg-yellow-400 transition hover:scale-[1.01] hover:shadow-lg duration-200
                  ${
                    stage.completed
                      ? "bg-green-100 border-green-400"
                      : "bg-yellow-100 border-yellow-400"
                  }`}
                >
                  <p className="text-xl font-bold text-black text-center">
                    {stage.name}
                  </p>

                  <p className="text-xl mt-2 flex gap-2">
                    <strong className="font-bold text-black">Status:</strong>{" "}
                    {stage.completed ? (
                      <span className="text-green-600 font-medium flex justify-center items-center gap-2">
                        <FaCheck/><span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        🔄 In Progress
                      </span>
                    )}
                  </p>

                  {stage.image && (
                    <div className="mt-3 flex flex-col items-center">
                      <p className="text-sm text-black font-medium mb-1 flex items-center gap-2">
                        <FaCamera/><span>Stage Image</span>
                      </p>
                      <img
                        src={stage.image}
                        alt={stage.name}
                        className="w-40 h-40 rounded-lg shadow-md border border-yellow-500 object-cover"
                      />
                    </div>
                  )}

                  <p className="text-md text-black mt-3 text-right">
                    ⏰ Updated At:{" "}
                    {new Date(stage.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading order status...</p>
      )}
    </div>
  );
}
