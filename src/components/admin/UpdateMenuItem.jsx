import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaTags,
  FaImage,
  FaDollarSign,
  FaLeaf,
  FaFire,
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";

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
    isTodaysDeal: false,
    dealExpiresAt: "",
    image: "",
  });

  const [viewImage, setViewImage] = useState(false);

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
        isTodaysDeal: item.isTodaysDeal || false,
        dealExpiresAt: item.dealExpiresAt
          ? item.dealExpiresAt.substring(0, 10)
          : "",
        image: item.image || "",
      });
    }
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center overflow-auto items-start z-50 py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative border border-yellow-100 animate-fadeIn mt-1 ">
          <h2 className="text-3xl font-extrabold text-yellow-700 mb-6 text-center flex items-center justify-center gap-2">
            <FaUtensils className="text-yellow-600" /> Update Menu Item
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700">
                <FaUtensils className="text-yellow-600" /> Item Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 mt-1 shadow-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700">
                <FaTags className="text-yellow-600" /> Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category (e.g., Burger)"
                required
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 mt-1 shadow-sm"
              />
            </div>

            {/* Sub Category */}
            <div>
              <label className="font-semibold text-gray-700">Sub Category</label>
              <input
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                placeholder="Sub Category (e.g., Chicken)"
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 mt-1 shadow-sm"
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700">
                <FaDollarSign className="text-green-600" /> Price (RS)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Regular Price"
                required
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-500 mt-1 shadow-sm"
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="font-semibold text-gray-700">Discount Price</label>
              <input
                name="discountPrice"
                type="number"
                step="0.01"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Discounted Price"
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-500 mt-1 shadow-sm"
              />
            </div>

            {/* Calories */}
            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700">
                <FaFire className="text-red-500" /> Calories
              </label>
              <input
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
                placeholder="Calories"
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-red-400 mt-1 shadow-sm"
              />
            </div>

            {/* Image URL + Preview */}
            <div className="md:col-span-2">
              <label className="font-semibold flex items-center gap-2 text-gray-700">
                <FaImage className="text-blue-500" /> Image URL
              </label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 mt-1 shadow-sm"
              />
              {formData.image && (
                <div className="flex flex-col items-center mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <button
                    type="button"
                    onClick={() => setViewImage(true)}
                    className="flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                  >
                    <FaEye /> View Full Image
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows={3}
                required
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 mt-1 shadow-sm"
              />
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-2 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={formData.isVegetarian}
                  onChange={handleChange}
                  className="accent-green-600 w-5 h-5"
                />
                <FaLeaf className="text-green-600" /> Vegetarian
              </label>

              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="accent-yellow-600 w-5 h-5"
                />
                Available
              </label>

              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="isTodaysDeal"
                  checked={formData.isTodaysDeal}
                  onChange={handleChange}
                  className="accent-blue-600 w-5 h-5"
                />
                <FaClock className="text-blue-500" /> Today's Deal
              </label>

              {formData.isTodaysDeal && (
                <input
                  type="date"
                  name="dealExpiresAt"
                  value={formData.dealExpiresAt}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 transition-all shadow-sm"
              >
                <FaTimesCircle /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-full border border-yellow-600 hover:bg-yellow-600 transition-all shadow-md"
              >
                <FaCheckCircle /> Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Image Modal */}
      {viewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setViewImage(false)}
        >
          <img
            src={formData.image}
            alt="Full View"
            className="max-w-3xl max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white animate-zoomIn"
          />
        </div>
      )}
    </>
  );
};

export default UpdateMenuItem;
