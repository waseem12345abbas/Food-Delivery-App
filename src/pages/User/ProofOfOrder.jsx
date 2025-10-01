import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../auth/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { setServiceType, setUserType } from "../../state_manage/features/users/userSession";
import { setUserData } from "../../state_manage/features/users/users";

// Constants
const NAVIGATION_PATHS = {
  MY_ORDER: '/my-order',
  HOME: '/home'
};

const ERROR_MESSAGES = {
  MISSING_PROOF: "Please provide both payment proof and payment ID.",
  SUBMIT_ERROR: "Error submitting order. Please try again."
};


const ProofOfOrder = () => {
  const dispatch = useDispatch()
  // get user session either user is guest or logged in user and is dive-in or delivery
  const userSession = useSelector((state)=>state.userSession)
  useEffect(()=>{
  if(userSession.serviceType === "" || userSession.userType === "" || userSession.userData === null){
     // get session data from session storage in case of page refresh
  const sessionServiceType = sessionStorage.getItem("serviceType")
  const sessionUserType = sessionStorage.getItem("userType")
  const sessionUserData = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")) : null
    if(sessionServiceType) dispatch(setServiceType(sessionServiceType))
    if(sessionUserType) dispatch(setUserType(sessionUserType))
    if(sessionUserData) dispatch(setUserData(sessionUserData))
      console.log("UUUUUUUUUUUUUUUUUUUUUUU = ", sessionUserData)
  }
  },[])
 
 
  // if user is logged in get user data
  const { user } = useAuth();
  // get user from redux store
  const userFromStore = useSelector((state)=>state.users.currentUser)
  console.log("UUUUUUUUUUUUSSSSSSSSSSSSs = ", userFromStore)
  const [paymentId, setPaymentId] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderProceed, setOrderProceed] = useState(false);
  const [payAtCounter, setPayAtCounter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, address } = location.state || { cartItems: [], address: null };

  const orderData = cartItems.map((order) => ({
    id: order._id,
    name: order.name,
    quantity: order.quantity,
    price: order.price,
  }));


  const validateForm = () => {
    if(payAtCounter){
      return true
    }
    if (!payAtCounter && (!file || !paymentId)) {
      alert(ERROR_MESSAGES.MISSING_PROOF);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (userSession.serviceType === "dine-in" && payAtCounter) {
      // No validation needed, proceed directly
      const success = await submitOrder();
      if (success) {
        navigate(NAVIGATION_PATHS.MY_ORDER);
      } else {
        navigate(NAVIGATION_PATHS.HOME);
      }
    } else {
      if (!validateForm()) {
        return;
      }
      const success = await submitOrder();
      if (success) {
        navigate(NAVIGATION_PATHS.MY_ORDER);
      } else {
        navigate(NAVIGATION_PATHS.HOME);
      }
    }
  };
  // this function is submitting the order to the backend
  // it will send the paymentId, proof image, cart items and user data if user is logged in
  // if user is guest then it will send only paymentId, proof image and cart items
  // after successful submission it will navigate to success page or show error message
  // submit guest order
  const submitOrder = async () => {
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("cartItems", JSON.stringify(orderData));
    if(address){
      formDataToSend.append("address", JSON.stringify(address));
    }
    if (payAtCounter) {
      formDataToSend.append("payAtCounter", true);
      formDataToSend.append("userData", JSON.stringify(userFromStore));
    } else {
      formDataToSend.append("paymentId", paymentId);
      formDataToSend.append("proofImage", file);
      formDataToSend.append("userData", JSON.stringify(user || userFromStore));
      console.log("UUUUUUUUUUUUUUUUUUU = ", userFromStore)
    }
    try {
      console.log("Data In Form = ", formDataToSend)
      const res = await api.post("/api/userOrder", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response from server:", formDataToSend);
      if (res.data.success) {
        setOrderSubmitted(true);
      } else {
        alert(ERROR_MESSAGES.SUBMIT_ERROR);
        return false;
      }
      return true;
    } catch (error) {
      alert(error?.message || ERROR_MESSAGES.SUBMIT_ERROR);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg shadow-yellow-400 my-12 border border-yellow-500">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Proof of Payment
      </h1>
      {address && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
          <p><strong>Name:</strong> {address.name}</p>
          <p><strong>Phone:</strong> {address.phone}</p>
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>City:</strong> {address.city}</p>
        </div>
      )}


      {/* Payment Options */}
      <div className="space-y-6 mb-8 bg-yellow-400 p-4 rounded-lg shadow-inner">
        <div>
          <h2 className="font-semibold text-black">JazzCash</h2>
            <h3>
            Number:{" "}
            <span className="font-medium"> +923075564033</span>
          </h3>
          <h3>
            Account Name:{" "}
            <span className="font-medium">Muhammad Waseem Abbas</span>
          </h3>
        </div>
        <div>
          <h2 className="font-semibold text-black">EasyPaisa</h2>
           <h3>
            Number:{" "}
            <span className="font-medium"> +923075564033</span>
          </h3>
          <h3>
            Account Name:{" "}
            <span className="font-medium">Muhammad Waseem Abbas</span>
          </h3>
        </div>
        <div>
          <h2 className="font-semibold text-black">Bank Account</h2>
            <h3>
            Number:{" "}
            <span className="font-medium"> +923075564033</span>
          </h3>
          <h3>
            Account Name:{" "}
            <span className="font-medium">Muhammad Waseem Abbas</span>
          </h3>
        </div>
      </div>

      {/* Upload Proof Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Proof"}
        </button>
      </form>
      {/* if user want to want at counter show this button only if user is dive in*/}
      {
        userSession.serviceType === "dine-in" && (
      <div className="mt-6 text-center">
        <button
        onClick={()=>
          {
            setPayAtCounter(true);
            handleSubmit()}
        }
        className="px-4 py-2 text-center rounded-md bg-black text-yellow-500">
          Pay At Counter
        </button>
      </div>
        )
      }

      {/* Success Message */}
      {orderSubmitted && (
        <div className="my-6 relative bg-green-100 border border-green-400 text-green-700 px-6 py-5 rounded-lg shadow-md text-center">
          <div className="flex flex-row-reverse gap-2 item-center justify-center ">
             <button
            onClick={() => setOrderSubmitted(false)}
            className="text-green-700 hover:text-green-900 font-bold"
          >
            <FaTimes/>
          </button>
          <p className="text-lg font-medium">
            Your order has been successfully submitted!
          </p>
          </div>
          <p className="mb-4">You can check the status of your order here:</p>
          <Link
            to="/my-order"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            View My Orders
          </Link>
        </div>
      )}

      {/* Order Proceed Message */}
      {orderProceed && (
        <div className="my-6 relative bg-blue-100 border border-blue-400 text-blue-700 px-6 py-5 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium">Order proceed</p>
        </div>
      )}
    </div>
  );
};

export default ProofOfOrder;
