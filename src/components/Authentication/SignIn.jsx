import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    password:"",
  });
  // route the user to home page when user is loggedin 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const data = await login(formData); // <- calls /api/login, stores token+user
      localStorage.setItem("token", data.accessToken)
      if (data?.success) {
        setMessage({ text: "Logged in successfully", type: "success" });
        // Check if there's a redirect path stored (from any page that required auth)
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          setTimeout(() => navigate(redirectPath), 700);
        } else {
          setTimeout(() => navigate("/home"), 700);
        }
      } else {
        setMessage({ text: data?.message || "Login failed", type: "error" });
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (error.request ? "No response from server" : "Login error");
      setMessage({ text: msg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 
    bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')]
  bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg hover:scale-101 transition shadow-neutral-400 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl text-center font-semibold mb-2">Login</h2>

        {message.text && (
          <div
            className={`p-3 mb-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-800 text-green-100"
                : "bg-red-800 text-red-100"
            }`}
          >
            {message.text}
          </div>
        )}
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          placeholder="Mobile Number"
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md bg-white placeholder:text-black focus:ring-1 focus:ring-yellow-500 shadow-md shadow-neutral-400 outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md bg-white placeholder:text-black focus:ring-1 focus:ring-yellow-500 shadow-md shadow-neutral-400 outline-none"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md bg-white placeholder:text-black focus:ring-1 focus:ring-yellow-500 shadow-md shadow-neutral-400 outline-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md font-semibold transition-all duration-300 shadow-md shadow-yellow-300"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p>Don't have account</p>
        <Link to={'/register'}>Register</Link>
      </form>
    </div>
  );
};

export default LoginForm;
