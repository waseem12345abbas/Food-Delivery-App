import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../state_manage/features/cart/Cart";
import { fetchProducts } from "../../state_manage/features/products/productsSlice";

const DiscountProducts = () => {
  const { products: foodItems, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentCategory, setCurrentCategory] = useState("Burgers");
  const [showAllDeals, setShowAllDeals] = useState(false);

  const allItemsInCart = useSelector((state) => state.cart.cart);
  const isItemInCart = (id) => allItemsInCart.some((item) => String(item._id) === String(id));

  const filteredProducts = foodItems.filter(
    (product) => product.category === currentCategory
  );
  const uniqueCategories = [...new Set(foodItems.map((item) => item.category))];

  if (status === "loading") {
    return <div className="text-center py-12 text-light-text dark:text-dark-text">Loading...</div>;
  }
  if (error) return <p className="text-center py-12 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-15 bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          Up to -40% SROMS exclusive deals
        </h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
        {/* Categories Sidebar */}
        <div className="bg-white rounded-md p-4 shadow-lg md:border border-black md:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-black">Categories</h2>
          <ul className="flex flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar">
            {uniqueCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setCurrentCategory(category)}
                  className={` ${category === currentCategory? "bg-yellow-400 border-yellow-500":"" } w-full cursor-pointer border border-black px-4 py-2 rounded-full font-medium text-sm md:text-base transition-colors bg-white text-black shadow-lg shadow-xs shadow-neutral-500`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Grid */}
        <div className="col-span-2 md:col-span-4 lg:col-span-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, showAllDeals ? foodItems.length : 8).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg shadow-neutral-500 border border-black"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-white flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-44 w-44 object-cover"
                      />
                    ) : (
                      <span className="text-black">Image Coming Soon</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-lg font-semibold text-black">
                        {product.title}
                      </h2>
                    </div>

                    <p className="text-black text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-black  qtext-sm">
                          ${product.price}
                        </span>
                         <button
                        onClick={() => dispatch(addToCart(product))}
                        className={`cursor-pointer border border-yellow-500 ${isItemInCart(product._id) ? "bg-black text-white" : "bg-yellow-400 text-black " } px-3 py-1 rounded-full text-sm transition-colors shadow-lg`}
                      >
                        {isItemInCart(product._id) ? "Added" : "Add to Cart"}
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-black">
                No items on discount in this category today
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Button to Show All Deals */}
      {foodItems.length > 8 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAllDeals(!showAllDeals)}
            className="border border-yellow-500 bg-yellow-400 text-black px-6 py-2 rounded-full transition-colors duration-300 cursor-pointer shadow-lg"
          >
            {showAllDeals ? "View Less Deals" : "View All Deals"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscountProducts;
