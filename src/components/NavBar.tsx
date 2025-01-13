import { NavLink } from "react-router-dom";

const Navbar = () => (
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
    </ul>
  </nav>
);

export default Navbar;
