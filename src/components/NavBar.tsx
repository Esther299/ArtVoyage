import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar: React.FC = () => {
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
    <nav>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <NavLink to="/exhibitions">My Exhibitions</NavLink>
        </li>
        {user ? (
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        ) : (
          <li>
            <NavLink to="/auth">Login/Register</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
