import { Link, NavLink, useNavigate } from "react-router";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaGear, FaUser } from "react-icons/fa6";
import { LuRotate3D } from "react-icons/lu";
import { ImBoxAdd } from "react-icons/im";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utility/errorMessage";

const NavBar = () => {
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Sign Out Function
  const handleSignout = () => {
    toast.loading("Please wait for signout...", { id: "signout" });
    signOutUser()
      .then(() => {
        toast.success("Signout successful!", { id: "signout" });
        navigate(location.state || "/");
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err.code);
        setError(errorMessage);
        toast.error(error, { id: "login" });
      });
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="navbar py-0 min-h-0 shadow-sm rounded-full glass-card max-w-7xl mx-auto fixed top-0 w-full z-50 bg-transparent px-3 sm:px-6">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Dropdown for Mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost -ml-1 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 
            mt-[px] w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/all-models"}>
                <IoLogoModelS /> All Models
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to={"/"}
          className="flex items-center -ml-3 md:ml-0 gap-1 text-lg sm:text-xl font-bold whitespace-nowrap"
        >
          <LuRotate3D className="text-xl text-pink-600 sm:text-2xl" />{" "}
          <span className="truncate max-w-[130px] sm:max-w-none">
            <span className="text-pink-600">3D</span> Models Hub
          </span>
        </Link>
      </div>

      {/* Navbar Center (hidden on mobile) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink to={"/"}>
              <GoHomeFill />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/all-models"}>
              <IoLogoModelS /> All Models
            </NavLink>
          </li>
          <li>
            <NavLink to={"/add-model"}>
              <ImBoxAdd /> Add model
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2 sm:gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-1 md:mt-3 -mr-2 md:-mr-4 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/profile"}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <Link to={"/my-models"}>My Models</Link>
              </li>
              <li>
                <Link to={"/my-downloads"}>My Downloads</Link>
              </li>

              <label className="flex items-center justify-between px-3 py-2">
                <span className="text-sm">Dark Mode</span>
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle toggle-sm"
                />
              </label>

              <li>
                <a>
                  <FaGear /> Settings
                </a>
              </li>
              <li>
                <button
                  onClick={handleSignout}
                  className="btn btn-xs text-left bg-gradient-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300 btn-sm bg-gradient-to-r from-pink-500 to-red-500 text-white"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
