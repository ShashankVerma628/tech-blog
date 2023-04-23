import "../styles/navigation.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import { useAppContext } from "../context/appContext";

const Navigation = () => {
  const { user, logOutUser } = useAppContext();
  return (
    <header className="site-header">
      <Logo />
      <Navbar />

      {user == null ? (
        <Link to="/login" className="header-link btn">
          Login
        </Link>
      ) : (
        <button
          onClick={() => logOutUser()}
          type="button"
          className="header-link btn"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Navigation;
