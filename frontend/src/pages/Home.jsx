import { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import AdminDashboard from "../components/AdminDashboard";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const isUserAdmin = isAdmin();

  return (
    <main className="w-screen flex justify-center px-6">
      {isUserAdmin ? <AdminDashboard /> : <Dashboard />}
    </main>
  );
};

export default Home;
