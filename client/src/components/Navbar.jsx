import "../styles/navbar.css";
import { Link } from "react-router-dom";

import { FaAngleDown } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link active">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact-us" className="navbar-link">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
