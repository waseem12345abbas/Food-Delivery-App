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
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold mb-4">{error || "Failed to load profile."}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6 text-center">
        <img
          src={profileUser.avatar || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4">{profileUser.name}</h2>
        <p className="text-gray-600">{profileUser.email}</p>

        <div className="mt-6 text-left space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Username:</span>
            <span>{profileUser.name || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Phone:</span>
            <span>{profileUser.mobile || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Joined:</span>
            <span>{profileUser.createdAt ? new Date(profileUser.createdAt).toLocaleDateString() : "N/A"}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
