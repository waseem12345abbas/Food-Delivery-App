import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../../auth/AuthProvider";

const ProofOfOrder = () => {
  const [paymentId, setPaymentId] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderProceed, setOrderProceed] = useState(false);
  const { user, isAuthed } = useAuth();

  const { cartItems} = location.state || { cartItems: []};

  const orderData = cartItems.map((order) => ({
    id: order._id,
    name: order.name,
    quantity: order.quantity,
    price: order.price,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentId || !file) {
      alert("Please upload proof and enter Payment ID.");
      return;
    }
    const confirmTrack = window.confirm("Do you want to track order then login?");
    if (confirmTrack) {
      // Submit the order first without navigating
      const success = await submitOrder(false);
      if (success) {
        // Then check if user is already logged in
        if (isAuthed && user) {
          // User is logged in, navigate to my-order page directly
          navigate("/my-order");
        } else {
          // Set redirect after login to my-order page
          sessionStorage.setItem("redirectAfterLogin", "/my-order");
          navigate("/login");
        }
      }
    } else {
      submitOrder(true);
    }
  };

  const submitOrder = async (navigateToSuccess = true) => {
    const formDataToSend = new FormData();
    formDataToSend.append("paymentId", paymentId);
    formDataToSend.append("proofImage", file);
    formDataToSend.append("cartItems", JSON.stringify(orderData));
    if (isAuthed && user) {
      formDataToSend.append("formData", JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
      }));
    }

    try {
      const res = await api.post("/api/userOrder", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        if (navigateToSuccess) {
          navigate("/success");
        }
        return true;
      }
    } catch (error) {
      console.log("Error while submitting the order", error);
      alert("Error submitting order. Check console for details.");
    }
    return false;
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg shadow-yellow-400 my-12 border border-yellow-500">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Proof of Payment
      </h1>

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
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
        >
          Submit Proof
        </button>
      </form>

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
