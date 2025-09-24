import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import api from "../api";

export default function ProfilePage() {
  const { logout, user: authUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        setProfileUser(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load profile");
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-bold text-black animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-yellow-500 text-xl font-bold mb-4">
          {error || "Failed to load profile."}
        </p>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // Function to get placeholder avatar if no image exists
  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 text-center">
        {/* Avatar Section */}
        {profileUser.avatar ? (
          <img
            src={profileUser.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full mx-auto border-4 border shadow-md"
          />
        ) : (
          <div className="w-28 h-28 flex text-yellow-400 items-center justify-center mx-auto rounded-full bg-black text-black text-4xl font-bold border-2 border-yellow-400 shadow-md">
            {getInitial(profileUser.name)}
          </div>
        )}

        {/* Name and Email */}
        <h2 className="text-2xl font-bold mt-4 text-black">
          {profileUser.name}
        </h2>
        <p className="text-gray-600">{profileUser.email}</p>

        {/* User Details */}
        <div className="mt-6 text-left space-y-3">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-black">Username:</span>
            <span className="text-gray-700">{profileUser.name || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-black">Phone:</span>
            <span className="text-gray-700">{profileUser.mobile || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-semibold text-black">Joined:</span>
            <span className="text-gray-700">
              {profileUser.createdAt
                ? new Date(profileUser.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition shadow-md hover:scale-105 transform duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
