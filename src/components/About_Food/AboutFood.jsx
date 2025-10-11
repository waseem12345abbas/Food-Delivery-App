import React from "react";
import { motion } from "framer-motion";

const AboutFood = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-16 px-6 md:px-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
        >
          About Our Food
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-10"
        >
          At <span className="text-yellow-400 font-semibold">SROMS</span>, we
          don’t just serve food — we deliver{" "}
          <span className="text-green-300">happiness, health, and flavor</span>{" "}
          straight to your door!
        </motion.p>

        {/* Content Section */}
        <div className="grid grid-cols-1 items-center mt-12 px-4 sm:px-6 md:px-10">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-yellow-400/20 via-yellow-500/10 to-black/20 
               backdrop-blur-2xl border border-white/30 
               rounded-3xl shadow-2xl p-8 md:p-10 text-left text-gray-100 
               hover:shadow-yellow-400/30 transition-all duration-500"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300 mb-6 drop-shadow-lg text-center">
              ✨ Why Our Food is Special ✨
            </h2>

            <ul className="space-y-6 text-lg leading-relaxed tracking-wide">
              <li className="hover:translate-x-2 transition-transform duration-300">
                🍅{" "}
                <span className="text-yellow-400 font-semibold">
                  Fresh Ingredients:
                </span>{" "}
                We source farm-fresh vegetables, halal meat, and organic spices
                to ensure every bite is full of life.
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300">
                ⚡{" "}
                <span className="text-yellow-400 font-semibold">
                  Fast Delivery:
                </span>{" "}
                Hot, fresh meals at your doorstep in under{" "}
                <span className="font-bold text-yellow-300">30 minutes</span>.
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300">
                👨‍🍳{" "}
                <span className="text-yellow-400 font-semibold">
                  Expert Chefs:
                </span>{" "}
                Our chefs craft recipes that balance tradition with innovation —
                creating flavors that stay with you.
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300">
                🥗{" "}
                <span className="text-yellow-400 font-semibold">
                  Healthy Options:
                </span>{" "}
                From vibrant salads to low-cal meals, we make healthy eating
                exciting and flavorful.
              </li>

              <li className="hover:translate-x-2 transition-transform duration-300">
                ❤️{" "}
                <span className="text-yellow-400 font-semibold">
                  Customer First:
                </span>{" "}
                Every dish is made with passion and care — because your
                satisfaction means everything to us.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-xl"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-200 font-medium leading-relaxed">
            We aim to redefine food delivery in Pakistan by offering not just a
            menu — but a **memorable experience**. Every meal we serve is{" "}
            <span className="text-green-300 font-semibold">
              fresh, fast, and full of flavor
            </span>
            . From spicy biryani to refreshing salads — we bring joy to every
            bite.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutFood;
