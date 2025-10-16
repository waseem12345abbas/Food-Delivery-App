import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaHamburger,
  FaMoneyBillWave,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "../../api";
import OrderList from "./OrderList";
import { usePopup } from "../hooks/usePopUp";
import Popup from "../PopUp";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const { popup, showPopup, hidePopup } = usePopup();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, productsRes, revenueRes] = await Promise.all([
          api.get("/api/allOrders"),
          api.get("/api/users"),
          api.get("/api/allProducts"),
          api.get("/api/revenue/today"),
        ]);

        setAllOrders(ordersRes.data.data || []);
        setAllUsers(usersRes.data.data || []);
        setAllProducts(productsRes.data.data || []);
        setTodaysRevenue(revenueRes.data.totalRevenue || 0);
      } catch (err) {
        showPopup("Error loading dashboard data.", "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allOrders.length) {
      const pending = allOrders.filter((order) => order.status === "Pending");
      setPendingDeliveries(pending.length);
    }
  }, [allOrders]);

  const stats = [
    { title: "Total Orders", value: allOrders.length, icon: <FaBoxOpen />, color: "bg-black/50 text-yellow-400" },
    { title: "Registered Users", value: allUsers.length, icon: <FaUsers />, color: "bg-black/50 text-yellow-400" },
    { title: "Today's Revenue", value: `Rs ${todaysRevenue}`, icon: <FaMoneyBillWave />, color: "bg-black/50 text-yellow-400" },
    { title: "Menu Items", value: allProducts.length, icon: <FaHamburger />, color: "bg-black/50 text-yellow-400" },
    { title: "Pending Deliveries", value: pendingDeliveries, icon: <FaTruck />, color: "bg-black/50 text-yellow-400" },
  ];

  const orderChartData = [
    { name: "Total Orders", value: allOrders.length },
    { name: "Pending", value: pendingDeliveries },
    { name: "Delivered", value: allOrders.filter((o) => o.status === "Delivered").length },
  ];

  const revenueChartData = [
    { name: "Revenue", value: todaysRevenue },
    { name: "Users", value: allUsers.length * 100 },
    { name: "Products", value: allProducts.length * 50 },
  ];

  const COLORS = ["#0EA5E9", "#FACC15", "#22C55E", "#F43F5E", "#A855F7"];

  return (
    <div className="p-8 bg-black/70 min-h-screen text-white">
      <Popup show={popup.show} message={popup.message} type={popup.type} onClose={hidePopup} />

      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 text-yellow-400 drop-shadow-[0_3px_3px_rgba(250,204,21,0.3)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className={`p-5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] border border-golden-500 flex flex-col items-center justify-center ${stat.color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <h2 className="text-lg font-semibold text-gray-200">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Bar Chart */}
        <motion.div
          className="bg-slate-800 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] p-6 border border-gray-700"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Order Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderChartData}>
              <XAxis dataKey="name" stroke="#CBD5E1" />
              <YAxis stroke="#CBD5E1" />
              <Tooltip />
              <Bar dataKey="value" fill="#FACC15" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-slate-800 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] p-6 border border-gray-700"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {revenueChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="rounded-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold mb-4 text-yellow-400">Recent Orders</h3>
        <OrderList />
      </motion.div>
    </div>
  );
};

export default Dashboard;
