import React from "react";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <a
          href="/home"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default Success;
