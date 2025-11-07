import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getErrorMessage } from "../../utility/errorMessage";

const ForgetPassword = () => {
  const { forgetPassword } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill email if passed from login page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!email) return toast.error("Please enter your email!");

    setLoading(true);
    toast.loading("Sending reset email...", { id: "reset-email" });

    try {
      await forgetPassword(email);

      toast.success("Reset email sent! Check your inbox.", { id: "reset-email" });
      setEmail("");

      // Open Gmail after 1 second
      setTimeout(() => window.open("https://mail.google.com", "_blank"), 1000);
    } catch (err) {
      const friendlyMessage = getErrorMessage(err.code);
      setError(friendlyMessage);
      toast.error(friendlyMessage, { id: "reset-email" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-30 px-4">
      <div className="card bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-purple-200">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Reset Password
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-full focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              required
            />
          </div>

          {error && <p className="text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-pink-500 to-red-600 text-white font-semibold rounded-full hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-700">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-pink-600 hover:text-red-600 cursor-pointer font-semibold underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
