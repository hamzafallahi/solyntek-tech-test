import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import AdminPage from "./components/pages/AdminPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.is_admin; // Check if the user is an admin

  return (
    <Router>
      <main className="overflow-x-hidden bg-white text-dark">
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={
                isAuthenticated && isAdmin ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;