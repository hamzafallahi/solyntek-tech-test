import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if a user or token exists in localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isLoggedIn = user || token;
  const isAdmin = user?.is_admin;

  const handleLogout = () => {
    // Clear user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="relative z-20 h-25">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10 flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
          <a href="/">
            <img
              src="https://media.licdn.com/dms/image/v2/C4E0BAQGyFwnU5xIp4g/company-logo_200_200/company-logo_200_200/0/1679537829907/solyntek_logo?e=2147483647&v=beta&t=mEKeaUPgayf3LrVuFft6RftJgm1zUxndMWDgkFDOf2w"
              alt="9antra the bridge"
              className="w-60 h-20 object-cover"
            />
          </a>
        </div>

        {/* Buttons section */}
        <div className="flex space-x-4 items-center">
          {/* Admin button */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Admin Side
            </button>
          )}

          {/* Logout button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
