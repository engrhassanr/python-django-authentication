import React, { useState } from "react";
import { sendResetEmail } from "../services/auth";
import { Button, TextInput, Card } from "flowbite-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md w-full p-6">
        <h4 className="text-center text-xl font-semibold mb-4">
          Forgot Password
        </h4>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          {message && <p className="text-green-500 mt-3">{message}</p>}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
