import "../styles/logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <h1>Tech Blog</h1>
    </Link>
  );
};

export default Logo;
