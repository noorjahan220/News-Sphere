import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const MyProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || ""); // Pre-fill the name field with the current user info
  const [photo, setPhoto] = useState(user?.photoURL || ""); // Pre-fill the photo URL if available
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the updateUserProfile function from the context to update the name and photo URL
      await updateUserProfile(name, photo);
      setLoading(false);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl w-full">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-8 rounded-t-xl shadow-xl">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <p className="text-lg mt-2">Manage your account details</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              <strong>Your Info:</strong>
            </p>
            <div className="text-gray-800">
              <p>Name: {user?.displayName || "No name set"}</p>
              <p>Email: {user?.email}</p>
              <p>Profile Photo:</p>
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
