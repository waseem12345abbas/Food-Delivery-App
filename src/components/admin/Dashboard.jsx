import { FaBoxOpen, FaHamburger, FaMoneyBillWave, FaTruck, FaUsers } from "react-icons/fa";
import api from "../../api";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";
import { usePopup } from "../hooks/usePopUp";
import Popup from "../PopUp";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [loadingRankUpdate, setLoadingRankUpdate] = useState(false);

  // ✅ popup hook
  const { popup, showPopup, hidePopup } = usePopup();

  // get all the orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/allOrders");
      if (res.status === 200) {
        setAllOrders(res.data.data);
      } else {
        showPopup("No orders found.", "error");
      }
    } catch (error) {
      showPopup(error.message || "Failed to fetch orders.", "error");
    }
  };

  // get all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users");
      if (res.status === 200) {
        setAllUsers(res.data.data);
      } else {
        showPopup("No users found.", "error");
      }
    } catch (error) {
      showPopup(error.message || "Failed to fetch users.", "error");
    }
  };

  // get all products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/allProducts");
      if (res.status === 200) {
        setAllProducts(res.data.data);
      } else {
        showPopup("No products found.", "error");
      }
    } catch (error) {
      showPopup(error.message || "Failed to fetch products.", "error");
    }
  };

  // check pending deliveries
  const checkPendingDeliveries = () => {
    if (allOrders.length > 0) {
      const pending = allOrders.filter((order) => order.status === "Pending");
      setPendingDeliveries(pending.length);
    } else {
      setPendingDeliveries(0);
    }
  };

  // fetch today's revenue
  const fetchTodaysRevenue = async () => {
    try {
      const res = await api.get("/api/revenue/today");
      if (res.status === 200) {
        setTodaysRevenue(res.data.totalRevenue);
      }
    } catch (error) {
      showPopup("Failed to fetch today's revenue.", "error");
    }
  };

  // fetch data on mount
  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
    fetchTodaysRevenue();
  }, []);

  useEffect(() => {
    checkPendingDeliveries();
  }, [allOrders]);

  // ✅ Function to trigger rank update
  const handleRankUpdate = async () => {
    setLoadingRankUpdate(true);
    try {
      const res = await api.post("/api/admin/updateUserRanks");
      if (res.status === 200) {
        showPopup(res.data.message || "User ranks updated successfully!", "success");
      } else {
        showPopup(res.data.message || "Failed to update ranks.", "error");
      }
    } catch (error) {
      showPopup(error.message || "Error updating ranks.", "error");
    } finally {
      setLoadingRankUpdate(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-5xl mx-auto relative">
      {/* ✅ Popup display */}
      <Popup 
      show={popup.show}
      message={popup.message}
      type={popup.type}
      onClose={hidePopup} />

      <h1 className="text-3xl font-bold text-black text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Button to trigger rank update */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={handleRankUpdate}
          disabled={loadingRankUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        >
          {loadingRankUpdate ? "Updating Ranks..." : "Update User Ranks"}
        </button>
      </div>

      {/* top status section */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="bg-yellow-400 lg:flex-1 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-neutral-500">
          <FaBoxOpen className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Total Orders</p>
            <p className="text-black text-xl font-bold">
              {allOrders.length}
            </p>
          </div>
        </div>

        {/* registered users */}
        <div className="lg:flex-1 flex items-center gap-4 bg-yellow-400 rounded-xl shadow-md p-5 shadow-neutral-500">
          <FaUsers className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Registered Users</p>
            <p className="text-black text-xl font-bold">{allUsers.length}</p>
          </div>
        </div>

        {/* total revenue */}
        <div className="lg:flex-1 flex items-center p-5 gap-4 rounded-xl shadow-md bg-yellow-400 shadow-neutral-500">
          <FaMoneyBillWave className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Today's Revenue</p>
            <p className="text-black text-xl font-bold">RS: {todaysRevenue}</p>
          </div>
        </div>
      </div>

      {/* menu and delivery info */}
      <div className="flex gap-6 mb-8">
        <div className="lg:flex-1 bg-yellow-400 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-neutral-500">
          <FaHamburger className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Total Menu Items</p>
            <p className="text-black text-xl font-bold">{allProducts.length}</p>
          </div>
        </div>

        {/* pending deliveries */}
        <div className="lg:flex-1 bg-yellow-400 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-neutral-500">
          <FaTruck className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Pending Deliveries</p>
            <p className="text-black text-xl font-bold">{pendingDeliveries}</p>
          </div>
        </div>
      </div>

      {/* recent orders table */}
      <div className="bg-white p-6 rounded-xl shadow-xl overflow-x-hidden">
        <OrderList />
      </div>
    </div>
  );
};

export default Dashboard;
