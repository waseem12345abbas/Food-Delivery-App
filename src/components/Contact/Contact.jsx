import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white py-12 px-4 md:px-16 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
        Have questions, feedback, or need help with your order? Get in touch with us — we’re here to assist you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <form className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Waseem"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="waseem@gmail.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Order inquiry"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="text-red-500 text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-sm text-gray-600">+92 300 1234567</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaEnvelope className="text-red-500 text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-sm text-gray-600">support@sroms.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Address</h3>
              <p className="text-sm text-gray-600">Lahore, Punjab, Pakistan</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">Support Hours</h3>
            <p className="text-sm text-gray-600">Mon - Sat: 9:00 AM – 10:00 PM</p>
            <p className="text-sm text-gray-600">Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
