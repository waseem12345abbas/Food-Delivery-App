import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { setUserType} from "../../state_manage/features/users/userSession";
import { setUserData } from '../../state_manage/features/users/users';


const LoginOrGuest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // here is a function which will create dummy user with unique data each time
  const generateGuestUser = () =>{
    const _id = 'guest_' + Math.random().toString(36).substr(2, 9);
    const name = 'Guest_' + Math.random().toString(36).substr(2, 5);
    const email = _id + '@guest.com';
    return {
      _id,
      name,
      email,
      isGuest: true,
    };
  }
  const handleLogin = (type) => {
    dispatch(setUserType(type))
    navigate("/login");
  };

  const handleGuest = (type) => {
    dispatch(setUserType(type))
    dispatch(setUserData(generateGuestUser()))
    navigate("/home");
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=1600&q=80')`, // Beautiful food background
      }}
    >
      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-10">
          🍽️ Welcome to SCROMS
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-lg mb-10">
          Order your favorite meals in just a few clicks – login or continue as guest.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={ () => handleLogin("login")}
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-semibold rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
          >
            🔑 Login
          </button>
          <button
            onClick={ () => handleGuest("guest")}
            className="px-12 py-4 bg-white/90 backdrop-blur-md text-gray-800 text-xl font-semibold rounded-3xl shadow-lg hover:bg-white hover:scale-105 transition transform"
          >
            <div className="flex items-center justify-center gap-x-2"><span className="text-black"><FaUser/></span><span>Guest</span></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOrGuest;
