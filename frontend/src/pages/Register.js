import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth"; // Ensure correct import

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

    // Client-side validation
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
        const data = await response.json();
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="form-container bg-white p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h4 className="text-center mb-4">Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
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
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <label htmlFor="password2">Confirm Password</label>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="tc"
              name="tc"
              checked={formData.tc}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="tc">
              I agree to the Terms and Conditions
            </label>
          </div>

          <button type="submit" className="btn btn-success w-100 mt-3">
            Register
          </button>

          {message && <p className="text-success mt-3">{message}</p>}
          {error && <p className="text-danger mt-3">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
