import { useContext, useState } from "react";
import { fetchApi } from "../utils/fetchapi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mock authentication logic
      const userCredentials = {
        email,
        password,
      };

      const { user, token } = await fetchApi(
        "/auth/login",
        userCredentials,
        "POST"
      );

      localStorage.setItem("string-ventures-ass-user", JSON.stringify(user));
      localStorage.setItem("string-ventures-ass-userLoggedIn", true);
      localStorage.setItem("jwt-access-token-string-ventures", token);

      login();

      // Redirect to home
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <p className="text-center mb-6">
          Please enter your credentials to login
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
