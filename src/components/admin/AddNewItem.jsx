import React, { useState } from "react";
import axios from "axios";
import api from "../../api";

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
    isFeatured: false,
    isTodaysDeal: false,
    dealExpiresAt: "",
    rating: { average: 0, count: 0 },
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name , value, type, checked } = e.target;
    // Handle checkbox inputs
    setFormData(prev=>({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      rating: {
        ...prev.rating,
        [name]: parseFloat(value)
      }
    }));
  }

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
          isFeatured: false,
          isTodaysDeal: false,
          dealExpiresAt: "",
          rating: { average: 0, count: 0 },
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          🍔 Add New Food Item
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Fill in the details to add a new item to the menu.
        </p>
         <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-6 overflow-auto p-4">
    {/* Basic Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Item Name"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        required
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        required
      />
    </div>

    {/* Categories */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Categories</h3>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Main Category (e.g., Burger)"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        required
      />
      <input
        name="subCategory"
        value={formData.subCategory}
        onChange={handleChange}
        placeholder="Sub-category (e.g., Chicken)"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />
    </div>

    {/* Pricing */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pricing</h3>
      <input
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        placeholder="Regular Price ($)"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
      />
      <input
        name="discountPrice"
        type="number"
        step="0.01"
        value={formData.discountPrice}
        onChange={handleChange}
        placeholder="Discount Price ($)"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>

    {/* Nutrition & Details */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Nutrition & Details</h3>
      <input
        name="calories"
        type="number"
        value={formData.calories}
        onChange={handleChange}
        placeholder="Calories"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isVegetarian"
            checked={formData.isVegetarian}
            onChange={handleChange}
            className="mr-2"
          />
          Vegetarian
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="mr-2"
          />
          Available
        </label>
      </div>
    </div>

    {/* Promotions */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Promotions</h3>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="mr-2"
        />
        Featured Item
      </label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isTodaysDeal"
            checked={formData.isTodaysDeal}
            onChange={handleChange}
            className="mr-2"
          />
          Today's Deal
        </label>
        {formData.isTodaysDeal && (
          <input
            type="date"
            name="dealExpiresAt"
            value={formData.dealExpiresAt}
            onChange={handleChange}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
      </div>
    </div>

    {/* Rating */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Initial Rating</h3>
      <input
        name="average"
        type="number"
        step="0.1"
        min="0"
        max="5"
        value={formData.rating.average}
        onChange={handleRatingChange}
        placeholder="Average Rating (0-5)"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <input
        name="count"
        type="number"
        min="0"
        value={formData.rating.count}
        onChange={handleRatingChange}
        placeholder="Rating Count"
        className="w-full border focus:border-none rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>

    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
      <button
      
        type="submit"
        className="bg-black transition text-white px-8 py-3 rounded-md font-semibold text-lg cursor-pointer"
      >
        ➕ Add Product
      </button>
    </div>
  </form>

        {message && (
          <div
            className={`mt-6 text-center px-4 py-2 rounded-md ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
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
