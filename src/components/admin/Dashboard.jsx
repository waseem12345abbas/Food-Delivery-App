import { FaBoxOpen, FaHamburger, FaMoneyBillWave, FaTruck, FaUsers } from "react-icons/fa";
import api from "../../api";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [revenu, setRevenu] = useState(0);
  const [error, setError] = useState(null);
  // get all the orders
  const fetchOrders = async ()=>{
    try {
      const res = await api.get("/api/allOrders");
      if(res.status === 200){
        setAllOrders(res.data.data)
        return
      }
      setError(res.error.message || "No Order Found")
      return
    } catch (error) {
      setError(error.message || "Server error occurred while fetching orders");
      return
    }
  }

  // get all users
  const fetchUsers = async ()=> {
    try {
      const res = await api.get("/api/users");
      if(res.status === 200){
        setAllUsers(res.data.data)
        return
      }
      setError(res.error.message || "No User Found")
      return 
    } catch (error) {
      setError(error.message || "Server error occurred while fetching users");  
      return 
    }
  }

  // get all products
  const fetchProducts = async ()=>{
    try {
      const res = await api.get("/api/allProducts");
      if(res.status === 200){
        setAllProducts(res.data.data)
        return
      }
      setError(res.error.message || "No Product Found")
      return
    } catch (error) {
      setError(error.message || "Server error occurred while fetching products");
      return
    }
  }

  // check pending deliveries
  const checkPendingDeliveries = ()=>{
    if(allOrders && allOrders.length >0){
      const pending = allOrders.filter((order)=> order.status === "Pending")
      setPendingDeliveries(pending.length)
      return
    }
    else{
      setPendingDeliveries(0)
    }
  }
  // calculate revenue from confirmed orders
  const calculateRevenu = ()=>{
    if(allOrders && allOrders.length >0){
      const confirmedOrders = allOrders.filter((order)=> order.status === "Confirmed")
     const totalRevenue = confirmedOrders.reduce((acc, order) => {
  const orderTotal = order.cartItems.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );
  return acc + orderTotal;
}, 0);
      setRevenu(totalRevenue)
      return
    }
  }
  // fetch orders on component mount
  useEffect(()=>{
    fetchOrders()
    fetchUsers()
    fetchProducts()
    checkPendingDeliveries()
    calculateRevenu()
  },[])

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-black text-center mb-6">Admin Dashboard</h1>
      {/* show message if error happen */}
      {error && <div className="my-4 rounded-md bg-red-300"><h2 className="pl-2 py-4 text-black font-medium">{error}</h2></div>}

      {/* top status section */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="bg-yellow-400 lg:flex-1 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-md shadow-neutral-500">
            <FaBoxOpen className="text-3xl text-yellow-900"/>
            <div>
              <p className="text-yellow-900 font-semibold text-lg">Total Orders</p>
              <p className="text-black text-xl font-bold">{allOrders ? allOrders.length:0}</p>
            </div>
          </div>

      {/* registered users */}
      <div className="lg:flex-1 flex items-center gap-4 bg-yellow-400 rounded-xl shadow-md p-5 shadow-md shadow-neutral-500">
          <FaUsers className="text-3xl text-yellow-900"/>
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Registered Users</p>
            <p className="text-black text-xl font-bold">{allUsers ? allUsers.length:0}</p>
          </div>
      </div>

      {/* total revenu */}
      <div className="lg:flex-1 flex items-center p-5 gap-4 rounded-xl shadow-md bg-yellow-400 shadow-md shadow-neutral-500">
          <FaMoneyBillWave className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Total Revenue</p>
            <p className="text-black text-xl font-bold">RS: { revenu ? revenu:0}</p>
          </div>
      </div>

    </div>

      {/* menu and delivery info */}
      <div className="flex gap-6 mb-8">

        <div className="lg:flex-1 bg-yellow-400 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-md shadow-neutral-500">
              <FaHamburger className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Total Menu Items</p>
            <p className="text-black text-xl font-bold">{allProducts ? allProducts.length:0}</p>
          </div>
        </div>

      {/* pending deliveries */}
      <div  className="lg:flex-1 bg-yellow-400 p-5 rounded-xl shadow-md flex items-center gap-4 shadow-md shadow-neutral-500">
        <FaTruck className="text-3xl text-yellow-900" />
          <div>
            <p className="text-yellow-900 font-semibold text-lg">Pending Deliveries</p>
            <p className="text-black text-xl font-bold">{pendingDeliveries ? pendingDeliveries:0}</p>
          </div>
      </div>
    </div>


      {/* recent orders table */}
      <div className="bg-white p-6 rounded-xl shadow-xl overflow-x-hidden">
        <OrderList/>
      </div>
    </div>
  );
};

export default Dashboard;
