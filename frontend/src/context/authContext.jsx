import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn =
      localStorage.getItem("string-ventures-ass-userLoggedIn") === "true";
    const storedUser = JSON.parse(
      localStorage.getItem("string-ventures-ass-user")
    );

    setIsLoggedIn(userLoggedIn);
    setUser(storedUser);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("string-ventures-ass-userLoggedIn");
    localStorage.removeItem("string-ventures-ass-user");
    localStorage.removeItem("jwt-access-token-string-ventures");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login"); // Redirect after logout
  };

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("string-ventures-ass-user"));
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
