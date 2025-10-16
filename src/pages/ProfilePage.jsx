import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import api from "../api";
import { FaStar, FaCrown, FaGem, FaMedal, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ranks = {
  Newbie: <FaStar className="text-yellow-400 drop-shadow-glow" />,
  Silver: <FaMedal className="text-gray-300 drop-shadow-glow" />,
  Gold: <FaMedal className="text-yellow-500 drop-shadow-glow" />,
  Platinum: <FaGem className="text-blue-400 drop-shadow-glow" />,
  Diamond: <FaCrown className="text-purple-500 drop-shadow-glow" />,
};

export default function ProfilePage() {
  const { logout } = useAuth();
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

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-xl text-yellow-400 animate-pulse font-semibold tracking-wide">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black/90 text-white">
        <p className="text-red-400 text-lg font-bold mb-4">
          {error.message || "Failed to load profile."}
        </p>
        <button
          onClick={handleLogout}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105 shadow-lg"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100vh] flex gap-2 justify-center items-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <Link to={"/home"} className="flex items-center gap-3 mt-4 px-2 py-1 text-white rounded-2xl shadow-[0_0_25px_#facc15aa] transform hover:scale-105 transition duration-300">
      <span><FaArrowLeft className="h-5 w-3"/></span><span>Back to home</span></Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_#facc15aa] p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_#facc15cc] hover:scale-[1.02]">
        {/* Gradient Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-purple-600/20 to-blue-500/30 blur-2xl"></div>

        {/* Profile Content */}
        <div className="relative z-10 flex flex-col items-center text-white">
          {/* Avatar */}
          {profileUser.avatar ? (
            <img
              src={profileUser.avatar}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-[0_0_30px_#facc15aa]"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-4xl font-bold border-4 border-yellow-300 shadow-[0_0_30px_#facc15aa]">
              {getInitial(profileUser.name)}
            </div>
          )}

          {/* Name + Email */}
          <h2 className="mt-5 text-3xl font-bold tracking-wide text-yellow-400">
            {profileUser.name}
          </h2>
          <p className="text-gray-300">{profileUser.email}</p>

          {/* Info Section */}
          <div className="mt-8 w-full space-y-4">
            <InfoRow label="Username" value={profileUser.name || "N/A"} />
            <InfoRow label="Phone" value={profileUser.mobile || "N/A"} />
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold text-gray-400">Rank:</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">
                  {profileUser?.rank}
                </span>
                <span className="text-lg">
                  {ranks[profileUser?.rank] || "🆕"}
                </span>
              </div>
            </div>
            <InfoRow
              label="Joined"
              value={
                profileUser.createdAt
                  ? new Date(profileUser.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-black font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-[0_0_25px_#facc15aa] transform hover:scale-105 transition duration-300"
          >
            Logout
          </button> 
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-700 pb-2">
      <span className="font-semibold text-gray-800">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
