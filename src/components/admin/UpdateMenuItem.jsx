import React, { useState, useEffect } from "react";

const UpdateMenuItem = ({ item, onClose, onUpdate }) => {
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
    image: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        price: item.price || "",
        discountPrice: item.discountPrice || "",
        category: item.category || "",
        subCategory: item.subCategory || "",
        calories: item.calories || "",
        isVegetarian: item.isVegetarian || false,
        isAvailable: item.isAvailable || true,
        isFeatured: item.isFeatured || false,
        isTodaysDeal: item.isTodaysDeal || false,
        dealExpiresAt: item.dealExpiresAt ? item.dealExpiresAt.substring(0,10) : "",
        rating: item.rating || { average: 0, count: 0 },
        image: item.image || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "average" || name === "count") {
      setFormData((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: type === "checkbox" ? checked : parseFloat(value),
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-2xl overflow-auto max-h-full shadow-lg border border-black">
        <h2 className="text-2xl font-bold mb-4 text-black">Update Menu Item</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            required
            className="border border-black p-2 rounded bg-white text-black"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            required
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="discountPrice"
            type="number"
            step="0.01"
            value={formData.discountPrice}
            onChange={handleChange}
            placeholder="Discount Price"
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="Sub Category"
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="calories"
            type="number"
            value={formData.calories}
            onChange={handleChange}
            placeholder="Calories"
            className="border border-black p-2 rounded bg-white text-black"
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border border-black p-2 rounded bg-white text-black"
          />
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-black">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={formData.isVegetarian}
                onChange={handleChange}
                className="border border-black"
              />
              <span>Vegetarian</span>
            </label>
            <label className="flex items-center space-x-2 text-black">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="border border-black"
              />
              <span>Available</span>
            </label>
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-black">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="border border-black"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center space-x-2 text-black">
              <input
                type="checkbox"
                name="isTodaysDeal"
                checked={formData.isTodaysDeal}
                onChange={handleChange}
                className="border border-black"
              />
              <span>Today's Deal</span>
            </label>
          </div>
          {formData.isTodaysDeal && (
            <input
              type="date"
              name="dealExpiresAt"
              value={formData.dealExpiresAt}
              onChange={handleChange}
              className="border border-black p-2 rounded bg-white text-black"
            />
          )}
          <div className="flex space-x-4">
            <input
              name="average"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating.average}
              onChange={handleChange}
              placeholder="Average Rating"
              className="border border-black p-2 rounded bg-white text-black"
            />
            <input
              name="count"
              type="number"
              min="0"
              value={formData.rating.count}
              onChange={handleChange}
              placeholder="Rating Count"
              className="border border-black p-2 rounded bg-white text-black"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-black text-black rounded hover:bg-gray-100 transition-colors cursor-pointer shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 border border-yellow-500 text-black rounded hover:bg-yellow-500 hover:text-white transition-colors cursor-pointer shadow-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuItem;
