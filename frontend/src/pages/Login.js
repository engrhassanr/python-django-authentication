import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextInput, Card } from "flowbite-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full p-6 bg-white shadow-lg border border-gray-200">
        <h4 className="text-center text-xl font-semibold mb-4 text-gray-800">
          Login
        </h4>
        <form onSubmit={handleLogin} className="space-y-3">
          <TextInput
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          />
          <div className="text-left">
            <p className="text-sm">
              <Link
                to="/forgot-password"
                className="hover:underline text-blue-600"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Link to="/register">
            <Button className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800">
              Register
            </Button>
          </Link>
          {message && (
            <p className="text-green-600 text-center mt-3">{message}</p>
          )}
          {error && <p className="text-red-600 text-center mt-3">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default Login;
