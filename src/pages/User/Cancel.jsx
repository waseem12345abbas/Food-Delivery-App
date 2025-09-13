import React from "react";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Failed / Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment could not be completed. Please try again or use another
          payment method.
        </p>
        <a
          href="/checkout"
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </a>
      </div>
    </div>
  );
};

export default Cancel;
