import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Avatar, Badge } from "flowbite-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/user/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile. Please log in again.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Card className="w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <Avatar
            img="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
            rounded
            size="lg"
            alt={user.name}
          />
          <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <p className="mt-2 text-center">{user.bio || "No bio available."}</p>
          <Badge color="gray" className="mt-2">
            {user.occupation || "User"}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="font-semibold">Email</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Location</p>
            <p className="text-gray-500">{user.location || "Unknown"}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-between">
          <Button onClick={handleLogout} color="red">
            Logout
          </Button>
          <Link to="/dashboard">
            <Button color="blue">Back to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
