import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state || { cartItems: [] };

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!address.name || !address.phone || !address.street || !address.city) {
      alert("Please fill in all fields.");
      return;
    }
    // Navigate to proof-of-order with cartItems and address
    navigate("/proof-of-order", {
      state: { cartItems, address },
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-lg shadow-yellow-400 my-12 border border-yellow-500">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Delivery Address
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default DeliveryAddress;
