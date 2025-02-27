import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // Dummy user data that would normally come from API
  const [dummyUser, setDummyUser] = useState({
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    created_at: "2022-03-15T00:00:00Z",
    bio: "Full-stack developer passionate about React, Node.js, and building beautiful user interfaces. When I'm not coding, I enjoy hiking and photography.",
    location: "San Francisco, CA",
    occupation: "Senior Developer at TechCorp",
    stats: {
      followers: 1289,
      following: 432,
      projects: 47,
    },
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "UI/UX Design",
    ],
    social: {
      github: "github.com/alexjdev",
      twitter: "twitter.com/alexjdev",
      linkedin: "linkedin.com/in/alexjohnson",
    },
  });

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

        const rawResponse = await response.text();
        console.log("Raw Response:", rawResponse); // ✅ Log raw response

        const data = JSON.parse(rawResponse);
        console.log("Parsed Data:", data); // ✅ Log parsed JSON data

        if (!response.ok) {
          throw new Error("Failed to fetch profile. Please log in again.");
        }

        const userData = data.errors ? data.errors : data; // ✅ Fix unexpected structure
        setUser(userData);
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
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0">
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
      {/* Cover Photo */}
      <div className="position-relative mb-5">
        <div
          className="w-100"
          style={{
            height: "240px",
            backgroundColor: "#e9ecef",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Profile Info Bar */}
        <div
          className="container position-relative"
          style={{ marginTop: "-90px" }}
        >
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex">
                <div className="me-3">
                  <img
                    src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                    alt={user.name}
                    className="rounded-circle border border-3 border-white"
                    width="150"
                    height="150"
                  />
                </div>
                <div className="d-flex flex-column justify-content-end mb-3">
                  <h1 className="display-5 fw-bold mb-0">{user.name}</h1>
                  <p className="text-muted">@{user.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-end justify-content-end mb-3">
              <button className="btn btn-outline-secondary me-2">
                <i className="bi bi-gear"></i> Settings
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-pencil"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title">About</h3>
                <p className="card-text">{dummyUser.bio}</p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <i className="bi bi-envelope text-muted me-2"></i>
                      {user.email}
                    </div>
                    <div className="mb-3">
                      <i className="bi bi-geo-alt text-muted me-2"></i>
                      {dummyUser.location}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <i className="bi bi-briefcase text-muted me-2"></i>
                      {dummyUser.occupation}
                    </div>
                    <div className="mb-3">
                      <i className="bi bi-calendar text-muted me-2"></i>
                      Joined{" "}
                      {new Date(dummyUser.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
