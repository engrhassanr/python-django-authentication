import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8000/api/user/profile/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("User Data:", data); // Debugging

        if (response.ok) {
          // Assuming the user data is inside `errors`
          setUser(data.errors); // Access the user data within `errors`
        } else {
          console.error("Failed to fetch user data:", data);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="/dashboard" className="navbar-brand">
            Dashboard
          </a>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 text-white">Hello, {user.name}</span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mt-4">
        {user ? (
          <div>
            <h2>Welcome to the Dashboard</h2>
            <p>
              <strong>Username:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
