import React from "react";
import foodImage from "/about-food.png"; 

const AboutFood = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-16">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
        About Our Food
      </h1>
      <p className="text-center text-green-600 font-medium max-w-2xl mx-auto mb-10">
        At <span className="text-yellow-500 font-semibold">SROMS</span>, we don’t just serve food — we deliver happiness, health, and heat straight to your door!
      </p>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Image Section */}
        <div>
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1080"
            alt="Delicious Food"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black">Why Our Food is Special</h2>
          <ul className="space-y-4 text-green-700 text-[16px] leading-relaxed">
            <li>
               <span className="text-yellow-500 font-semibold">Fresh Ingredients:</span> Every dish is made using farm-fresh vegetables, halal meat, and organic spices.
            </li>
            <li>
               <span className="text-yellow-500 font-semibold">Fast Delivery:</span> Hot and delicious meals delivered to your doorstep in under 30 minutes.
            </li>
            <li>
               <span className="text-yellow-500 font-semibold">Expert Chefs:</span> Our professional chefs blend tradition with innovation to cook flavors you’ll remember.
            </li>
            <li>
               <span className="text-yellow-500 font-semibold">Healthy Options:</span> From salads to low-cal meals, we offer dishes that are light yet satisfying.
            </li>
            <li>
               <span className="text-yellow-500 font-semibold">Customer First:</span> Your satisfaction is our top priority — every bite, every time.
            </li>
          </ul>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
        <p className="text-green-600 font-medium leading-relaxed">
          To redefine food delivery in Pakistan by offering not just a menu, but a memorable experience.  
          We believe food should be fresh, fast, and full of flavor — whether you’re craving spicy biryani or a light salad.
        </p>
      </div>
    </div>
  );
};

export default AboutFood;
