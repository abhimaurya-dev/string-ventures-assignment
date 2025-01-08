import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Users from "./pages/Users";
// import AdminPanel from "./pages/AdminPanel";
// import NotFound from "./pages/NotFound";

const App = () => {
  // Mock user role - replace this with your actual logic
  const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("string-ventures-ass-userLoggedIn");
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path={"/"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
