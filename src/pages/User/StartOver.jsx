import React from "react";
import { useNavigate } from "react-router-dom";

const StartOver = () => {
    const navigate = useNavigate()
    const handleDiveIn = () =>{
        navigate("/login-or-guest")
    }

    const handleDelivery = () =>{
        navigate("/login-or-guest")
    }
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1528712306091-ed0763094c98?fit=crop&w=1600&q=80')`, // Replace with your image
      }}
    >
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-10">
        Start Over
      </h1>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        <button 
        onClick={handleDiveIn}
        className="px-10 py-4 bg-black/70 text-white text-xl rounded-2xl shadow-lg hover:bg-black/90 transition transform hover:scale-105">
          Dine In
        </button>
        <button 
        onClick={handleDelivery}
        className="px-10 py-4 bg-white/80 text-black text-xl rounded-2xl shadow-lg hover:bg-white transition transform hover:scale-105">
          Delivery
        </button>
      </div>
    </div>
  );
};

export default StartOver;
