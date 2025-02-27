import React, { useState } from "react";
import { sendResetEmail } from "../services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    // Simple email validation check
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await sendResetEmail(email);
      setMessage(response.msg || "Password reset link sent to your email.");
    } catch (error) {
      setError(error.message);
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
          <h4 className="text-center mb-4">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
