import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../state_manage/features/products/productsSlice';
import { addToCart } from '../../state_manage/features/cart/Cart';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get data from Redux store
  const { products: specialProducts, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Fetch products only once when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter only today's deals
  const todaySpecial = specialProducts.filter((item) => item.isTodaysDeal);

  // Handle slide timer
  useEffect(() => {
    if (todaySpecial.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [todaySpecial.length]);

  // Previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + todaySpecial.length) % todaySpecial.length);
  };

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % todaySpecial.length);
  };

  if (status === 'loading') return <div className="text-center text-primary-text dark:text-secondary-text">Loading...</div>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="relative h-screen overflow-hidden bg-white shadow-lg">
      {todaySpecial.map((special, index) => (
        <div
          key={special._id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide
              ? 'translate-x-0'
              : index < currentSlide
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-center h-full max-w-7xl mx-auto px-4">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <img
                src={special.image}
                alt={special.name}
                className="w-54 h-54 md:w-80 md:h-80 object-contain rounded-full shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left p-4">
              <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">{special.name}</h1>
              <h2 className="text-xl md:text-2xl mb-6 text-black font-semibold">
                RS{special.price || special.discountPrice}
              </h2>
              <p className="text-lg text-black md:text-xl mb-8 leading-relaxed max-w-lg">
                {special.description}
              </p>
              <button
                onClick={() => dispatch(addToCart(special))}
                className="px-4 py-2 bg-yellow-400 text-black border border-neutral-400 shadow-neutral-500 rounded-lg hover:scale-105 hover:bg-yellow-500 hover:text-white transition-all cursor-pointer shadow-md text-nowrap"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-2 border border-yellow-500 rounded shadow-lg"
        onClick={prevSlide}
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>
      <button
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-2 border border-yellow-500 rounded shadow-lg"
        onClick={nextSlide}
      >
        <FaChevronRight className="h-4 w-4" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {todaySpecial.map((_, id) => (
          <button
            key={id}
            className={`w-3 h-3 rounded-full border border-yellow-500 shadow-lg transition-all duration-300 ${
              id === currentSlide ? 'bg-yellow-400 text-black w-8' : 'bg-white'
            }`}
            onClick={() => setCurrentSlide(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
