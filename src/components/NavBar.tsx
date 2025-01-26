import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#6A4C9C" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">
          ArtVoyage
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/collection">
                My Collection
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/exhibitions">
                My Exhibitions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleSignOut}
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth">
                  Login/Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
