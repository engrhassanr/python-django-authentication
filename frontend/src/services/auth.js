const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/user/register/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { errors: "Server error" };
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/user/login/`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { errors: "Server error" };
  }
};
