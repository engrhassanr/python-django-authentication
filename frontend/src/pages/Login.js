import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.token.access);
        localStorage.setItem("refresh_token", data.token.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-body">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="form-container bg-white p-4 rounded shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h4 className="text-center mb-4">Login</h4>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="text-left mt-3">
              <p className="mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link
              to="/register"
              className="btn btn-primary w-100 mt-3 text-white text-center"
            >
              Register
            </Link>

            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
