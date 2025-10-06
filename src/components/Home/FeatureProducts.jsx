import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeatureProducts } from "../../state_manage/features/products/featureProducts";
import { addToCart } from "../../state_manage/features/cart/Cart";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const FeatureProducts = () => {
  const dispatch = useDispatch();

// all items in the cart
const allItemsInCart = useSelector((state)=>state.cart.cart);
// check if item is in the cart
const isItemInCart = (id) => allItemsInCart.some((item) => String(item._id) === String(id)); 

  const {
    featureProducts: popularProducts,
    status,
    error,
  } = useSelector((item) => item.featureProducts);

  useEffect(() => {
    dispatch(fetchFeatureProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-lg rounded-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Feature Products</h1>
        </div>
        <div className="text-center text-2xl text-gray-600 animate-pulse">
          Loading featured products...
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-lg rounded-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Feature Products</h1>
        </div>
        <div className="text-center text-2xl text-red-600">
          Error loading featured products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white shadow-xl rounded-2xl">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Featured Products
        </h1>
        <p className="text-gray-500 mt-2">
          Discover our most popular and trending products
        </p>
      </div>

      {/* Slider */}
      {popularProducts.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination"}}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {popularProducts.map((popular) => (
            <SwiperSlide key={popular._id._id} className="transition">
              <div className="flex flex-col rounded-2xl border border-black overflow-hidden">
                <div className="flex items-center justify-center bg-gray-100 p-4">
                  <img
                    className="w-44 h-44 object-cover"
                    src={popular._id.image}
                    alt={popular._id.name}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-900 font-semibold text-lg line-clamp-1">
                    {popular._id.name}
                  </span>
                  <span className="text-black text-sm">
                    RS{popular._id.price}
                  </span>
                  </div>
                  <button
                  onClick={() => dispatch(addToCart(popular._id))}
                  className={`${isItemInCart(popular._id._id) ? "bg-black text-white":"bg-yellow-400 hover:bg-yellow-500 text-black"} mt-4 px-4 py-2  rounded-xl text-sm font-medium transition`}>
                    {isItemInCart(popular._id._id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="custom-pagination flex justify-center mt-5"></div>
        </Swiper>
        
      ) : (
        <div className="text-center my-10 text-2xl text-gray-600">
          No Feature Product Found.
        </div>
      )}
    </div>
  );
};

export default FeatureProducts;
