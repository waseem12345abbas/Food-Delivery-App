import { useSelector, useDispatch } from "react-redux";
import { removeToCart, addToCart, decreaseQuantity } from "../../state_manage/features/cart/Cart";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  // select user session from redux store if user wants delivery then navigate user to delivery address page 
  // otherwise navigate to order proof page
  const userSession = useSelector((state)=>state.userSession)
  const navigate = useNavigate();
  // const { user, isAuthed } = useAuth();
  const deliveryFee = 1.0;
  const totalPrice =
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryFee;
  const handlePlaceOrder = () => {
    // User is authenticated, proceed to order page
    if(userSession.serviceType === "delivery"){
      navigate("/delivery-address", {
        state: { cartItems},
      });
      return;
    }
    navigate("/proof-of-order", {
      state: { cartItems},
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-bold mb-6 text-black text-center pt-5 pb-10">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-black text-lg py-10">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col md:flex-row rounded-md shadow-md shadow-neutral-500 rounded-lg bg-neutral-100">
          <div className="flex-2 flex flex-col">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="overflow-hidden flex flex-row items-center border border-neutral-200 rounded-md"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full max-w-30 max-h-30 object-cover text-black-500 rounded-md ml-5"
                    />
                  ) : (
                    <span className="text-black-500 bg-gray-500 w-40 rounded-full">
                      No Image
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="flex items-center justify-between mr-2">
                    <h2 className="text-lg font-semibold text-black mb-2 w-30 text-wrap">
                      {item.name}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <button 
                      onClick={()=>dispatch(addToCart(item))}
                      className="py-2 px-4 cursor-pointer bg-yellow-400 rounded-md text-black shadow-[0_4px_4px_0] shadow-yellow-900  hover:scale-105 transition text-xs"><FaPlus/></button>
                      <span className="text-black font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button 
                      onClick={()=>dispatch(decreaseQuantity(item._id))}
                      className="py-2 px-4 cursor-pointer bg-yellow-400 rounded-md text-white shadow-[0_4px_4px_0] shadow-yellow-900  hover:scale-105 transition text-xs"><FaMinus/></button>
                    </div>
                      <button
                    onClick={() => dispatch(removeToCart(item._id))}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md shadow-[0_4px_4px_0] shadow-yellow-900 hover:scale-105 transition text-sm cursor-pointer"
                  >
                    <FaTimes/>
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full md:w-96 bg-white p-6 rounded-r rounded-lg flex-1 bg-yellow-400">
            <h2 className="text-center text-2xl font-semibold mb-6">Order Summary</h2>
            <ul className="space-y-4 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.discountPrice || item.price) * item.quantity}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between py-3">
              <span className="text-base font-semibold">Delivery Fee</span>
              <span className="pr-2 font-semibold">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-white hover:bg-neutral-200 text-black shadow-b-lg cursor-pointer shadow-neutral-500 py-3 rounded-xl font-semibold transition duration-300 shadow-md"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
