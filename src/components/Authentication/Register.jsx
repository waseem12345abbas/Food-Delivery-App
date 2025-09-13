import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    country: "",
    password: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      const { data } = await api.post("/api/adduser", formData);
      setMessage({ text: "Account created successfully!", type: "success" });
      setTimeout(() => navigate("/login"), 700);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (error.request ? "No response from server." : "Signup error");
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
        <h2 className="text-2xl text-center font-semibold mb-2">Create Account</h2>

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

        {["name", "mobile", "email", "address", "country", "password"].map(
          (field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              required
              className="w-full p-2 rounded-md bg-white placeholder:text-black focus:ring-1 focus:ring-yellow-500 shadow-md shadow-neutral-400 outline-none"
            />
          )
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-700 rounded-md font-semibold transition-all duration-300 shadow-md shadow-yellow-300"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
