import React from "react";
import { NavLink } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/firebase";

export const NavBar: React.FC = () => {
  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("User signed out");
  //     })
  //     .catch((error) => {
  //       console.error("Sign out error:", error);
  //     });
  // };

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
        {/* <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li> */}
      </ul>
    </nav>
  );
};

