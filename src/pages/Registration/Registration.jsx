import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { getErrorMessage } from "../../utility/errorMessage";

const Registration = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    // Password validation
    const atLeast6character = /^[\S\s]{6,}$/;
    const oneLetterOneDigit = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const uppercaseLowercase = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!atLeast6character.test(password)) {
      setError("Password must be at least 6 characters long!");
      return;
    } else if (!oneLetterOneDigit.test(password)) {
      setError("Password must contain at least one letter and one number!");
      return;
    } else if (!uppercaseLowercase.test(password)) {
      setError("Password must have at least one uppercase, one lowercase, and one number!");
      return;
    } else if (!terms) {
      setError("Please accept our terms and conditions!");
      return;
    }

    setSuccess(false);
    setError("");
    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((res) => {
        console.log(res.user)
        updateUserProfile(displayName, photoURL)
          .then(() => {
            toast.success("User created successfully!", { id: "create-user" });
            setSuccess(true);
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = getErrorMessage(error.code);
            setError(errorMessage);
            toast.error(errorMessage, { id: "create-user" });
          });
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error.code);
        setError(errorMessage);
        toast.error(errorMessage, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in...", { id: "create-user" });
    googleSignIn()
      .then((result) => {
        console.log(result.user)
        toast.success("User signed in successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message, { id: "create-user" });
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center text-pink-600">Register</h1>

          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="displayName"
                className="input rounded-full focus:border-0 focus:outline-gray-200 w-full px-4"
                placeholder="Name"
                required
              />

              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="input rounded-full focus:border-0 focus:outline-gray-200 w-full px-4"
                placeholder="Photo URL"
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input rounded-full focus:border-0 focus:outline-gray-200 w-full px-4"
                placeholder="Email"
                required
              />

              <label className="label">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input rounded-full focus:border-0 focus:outline-gray-200 w-full px-4 pr-12"
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

              <label className="label mt-2 flex items-center gap-2">
                <input type="checkbox" name="terms" className="checkbox checkbox-sm checkbox-secondary" />
                <span className="text-gray-700">I agree to the <span className="text-pink-600 font-medium">terms & conditions</span>.</span>
              </label>

              {success && <p className="text-green-600 mt-2 font-medium">Account created successfully!</p>}
              {error && <p className="text-red-600 mt-2 font-medium">{error}</p>}

              <button className="btn w-full mt-4 text-white rounded-full bg-linear-to-r from-pink-500 to-red-600">
                Register
              </button>
            </fieldset>
          </form>

          <div className="divider">or</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white rounded-full text-black border-[#e5e5e5] flex items-center justify-center gap-2"
          >
            <FaGoogle /> Sign in with Google
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link className="text-pink-600 hover:text-red-600" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
