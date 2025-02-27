import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Sidebar from "../Components/AdminDashbord/Sidebar";
import Mail from "../Components/AdminDashbord/Mail";

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
        console.log("User Data:", data);

        if (response.ok) {
          setUser(data.errors);
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
      <Mail />
    </div>
  );
};

export default Dashboard;
