const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// ✅ Register User
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/user/register/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Registration failed.");
    }
    return data;
  } catch (error) {
    console.error("Register Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

// ✅ Login User
export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/user/login/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Login failed.");
    }
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

// ✅ Send password reset email
export const sendResetEmail = async (email) => {
  try {
    const response = await fetch(
      `${API_URL}/api/user/send-reset-password-email/`,
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Error sending reset email.");
    }
    return data;
  } catch (error) {
    console.error("Reset Email Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

// ✅ Reset password
export const resetPassword = async (uid, token, newPassword) => {
  try {
    const response = await fetch(
      `${API_URL}/api/user/reset-password/${uid}/${token}/`, // ✅ API call to backend
      {
        method: "POST",
        body: JSON.stringify({ password: newPassword, password2: newPassword }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Error resetting password.");
    }
    return data;
  } catch (error) {
    console.error("Reset Password Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/user/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error || "Failed to fetch profile.");
    }
    return data;
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
};
