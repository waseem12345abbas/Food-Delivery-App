import React, { useState } from "react";
import api from "../../api";
import {
  FaLeaf,
  FaTags,
  FaUtensils,
  FaImage,
  FaDollarSign,
  FaFire,
  FaPercent,
  FaClock,
  FaPlusCircle,
} from "react-icons/fa";

const AddNewItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    subCategory: "",
    calories: "",
    isVegetarian: false,
    isAvailable: true,
    isTodaysDeal: false,
    dealExpiresAt: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/addItem", formData);
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Item added successfully!");
        setError(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          category: "",
          subCategory: "",
          calories: "",
          isVegetarian: false,
          isAvailable: true,
          isTodaysDeal: false,
          dealExpiresAt: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          image: "",
        });
      }
    } catch (err) {
      console.error("Error adding item:", err);
      setMessage("❌ Failed to add item.");
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6">
      <div className="w-full max-w-5xl bg-white/90 shadow-2xl rounded-2xl p-8 border border-yellow-100 backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold text-yellow-700 mb-2 text-center tracking-wide">
          🍔 Add New Food Item
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill in the details below to add a new delicious item to the menu.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <FaUtensils className="text-yellow-600" /> Basic Information
            </h3>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Item Name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              required
            />

            {/* Image Input with Live Preview */}
            <div className="space-y-2">
              <div className="relative">
                <FaImage className="absolute top-3 left-3 text-gray-400" />
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full border rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                  required
                />
              </div>

              {formData.image && (
                <div className="flex justify-center mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg shadow-md border border-yellow-200 transition-transform transform hover:scale-105"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <FaTags className="text-yellow-600" /> Categories
            </h3>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Main Category (e.g., Burger)"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              required
            />
            <input
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Sub-category (e.g., Chicken)"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <FaDollarSign className="text-green-600" /> Pricing
            </h3>
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Regular Price (RS)"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              required
            />
            <input
              name="discountPrice"
              type="number"
              step="0.01"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Discount Price (RS)"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>

          {/* Nutrition & Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <FaFire className="text-red-500" /> Nutrition & Details
            </h3>
            <input
              name="calories"
              type="number"
              value={formData.calories}
              onChange={handleChange}
              placeholder="Calories"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={handleChange}
                  className="accent-green-600"
                />
                <FaLeaf className="text-green-600" /> Vegetarian
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="accent-yellow-600"
                />
                Available
              </label>
            </div>
          </div>

          {/* Promotions */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
              <FaPercent className="text-blue-600" /> Promotions
            </h3>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isTodaysDeal"
                  checked={formData.isTodaysDeal}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Today's Deal
              </label>
              {formData.isTodaysDeal && (
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  <input
                    type="date"
                    name="dealExpiresAt"
                    value={formData.dealExpiresAt}
                    onChange={handleChange}
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              <FaPlusCircle /> Add Product
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-8 text-center px-6 py-3 rounded-lg font-medium text-lg shadow-md ${
              error
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewItem;
