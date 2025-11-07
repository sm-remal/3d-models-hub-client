import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";
import { MdVerifiedUser } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [address, setAddress] = useState("");
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      calculateProfileCompleteness();
    }
  }, [user, address]);

  const calculateProfileCompleteness = () => {
    let completeness = 0;
    if (user?.displayName) completeness += 40;
    if (user?.photoURL) completeness += 30;
    if (address) completeness += 30;
    setProfileCompleteness(completeness);
  };

  const handleUpdateProfile = () => {
    if (!user) return toast.error("No user found!");

    updateProfile(user, {
      displayName: fullName,
      photoURL: photoURL,
    })
      .then(() => {
        setUser({ ...user, displayName: fullName, photoURL: photoURL });
        toast.success("Profile updated successfully!");
        calculateProfileCompleteness();
      })
      .catch(() => {
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10">

        {/* ===== Left Side: Profile Card ===== */}
        <div className="flex flex-col items-center md:w-1/3 text-center">
          <div className="relative group">
            <img
              src={photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="User Avatar"
              className="w-36 h-36 rounded-full object-cover border-4 border-pink-500 shadow-lg"
            />
            <div className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition">
              <FaCamera className="text-white" />
            </div>
          </div>

          <h2 className="mt-4 text-xl font-bold text-pink-600">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <div className="flex items-center justify-center mt-2 bg-linear-to-r from-pink-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            <MdVerifiedUser className="mr-1" /> Verified User
          </div>

          {/* Profile Completeness */}
          <div className="w-full mt-6">
            <p className="text-gray-700 mb-1 font-medium">Profile Completeness</p>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 rounded-full bg-linear-to-r from-pink-500 to-red-500 transition-all duration-500"
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{profileCompleteness}% completed</p>
          </div>
        </div>

        {/* ===== Right Side: Edit Profile Form ===== */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Edit Profile</h2>

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              placeholder="Paste your photo URL"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              placeholder="Enter your address"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdateProfile}
            className="mt-4 py-3 w-1/2 bg-linear-to-r from-pink-500 to-red-600 text-white font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
