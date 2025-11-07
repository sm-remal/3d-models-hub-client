import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getErrorMessage } from "../../utility/errorMessage";

const Login = () => {
  const { signInUser, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const password = event.target.password.value;

    setSuccess(false);
    setError("");
    toast.loading("Logging in...", { id: "login" });

    signInUser(email, password)
      .then((result) => {
        console.log(result.uer)
        toast.success("Logged in successfully!", { id: "login" });
        setSuccess(true);
        setEmail("");
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error.code);
        setError(errorMessage);
        toast.error(errorMessage, { id: "login" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "login" });
    googleSignIn()
      .then((result) => {
        console.log(result.user)
        toast.success("Logged in with Google!", { id: "login" });
        setSuccess(true);
        navigate(location.state || "/");
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error.code);
        setError(errorMessage);
        toast.error(errorMessage, { id: "login" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-2xl border border-gray-200">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">Login</h1>

          <form onSubmit={handleLogin}>
            <fieldset className="fieldset space-y-3">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full rounded-full focus:border-0 focus:outline-gray-200 px-4"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input w-full rounded-full focus:border-0 focus:outline-gray-200 px-4 pr-12"
                  placeholder="Password"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-600 cursor-pointer z-10"
                >
                  {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </div>
              </div>

              <div>
                <Link
                  to="/forget-password"
                  state={{ email }}
                  className="link link-hover text-pink-600 hover:text-red-600"
                  onClick={() =>
                    navigate("/auth/forget-password", { state: { email } })
                  }

                >
                  Forgot password?
                </Link>
              </div>

              {success && <p className="text-green-600 mt-2 font-medium">Logged in successfully!</p>}
              {error && <p className="text-red-600 mt-2 font-medium">{error}</p>}

              <button className="btn w-full mt-4 text-white rounded-full bg-linear-to-r from-pink-500 to-red-600">
                Login
              </button>
            </fieldset>
          </form>

          <div className="divider">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white rounded-full text-black border-[#e5e5e5] flex items-center justify-center gap-2"
          >
            <FaGoogle /> Login with Google
          </button>

          <p className="text-center mt-3">
            New to our website?{" "}
            <Link className="text-pink-600 hover:text-red-600" to="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
