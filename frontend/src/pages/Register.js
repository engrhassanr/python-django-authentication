import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    if (!formData.tc) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    try {
      const response = await registerUser(formData);

      if (response.ok) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-center text-2xl font-semibold mb-4">Register</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="tc"
              checked={formData.tc}
              onChange={handleChange}
              required
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
          {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
