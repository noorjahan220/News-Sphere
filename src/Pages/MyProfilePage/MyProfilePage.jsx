import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import SubscriptionStatus from "../subscription/SubscriptionStatus";

const MyProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateUserProfile(name, photo);
      setLoading(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
      <div className="max-w-2xl mx-auto bg-zinc-800 shadow-lg rounded-xl p-8 border border-zinc-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
              My Profile
            </span>
          </h1>
          <p className="text-lg mt-2 text-gray-300">Manage your account details</p>
        </div>

        <div className="mt-6">
          <div className="flex justify-center mb-6">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-amber-500 shadow-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg w-full text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Profile Picture URL</label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="mt-2 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg w-full text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {error && <p className="text-red-400 mt-2">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold 
                         hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl
                         disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-amber-400">Your Info:</h3>
            <div className="mt-4 text-gray-300 space-y-2">
              <p>Name: {user?.displayName || "No name set"}</p>
              <p>Email: {user?.email}</p>
              <div className="mt-4">
                <SubscriptionStatus />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;