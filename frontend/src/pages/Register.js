import React, { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); // For showing errors
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

      if (response.token) {
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.errors || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <label>
          <input type="checkbox" name="tc" onChange={handleChange} required /> I
          agree to the Terms & Conditions
        </label>

        <button type="submit">Register</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
