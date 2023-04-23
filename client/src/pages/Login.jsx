import "../styles/button.css";
import "../styles/register.css";
import "../styles/form.css";
import { FormInput, Alert } from "../components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { loginUser, showAlert, displayAlert, isLoading, user } =
    useAppContext();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    const { email, password } = values;
    if (!email || !password) {
      displayAlert();
    }
    loginUser({ email, password });
  };

  // if user exists in the state, then we want user to navigate to dashboard
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="register-page-wrapper">
      <div className="form-wrapper">
        <form className="form-container">
          <h3 className="form-title">Login</h3>
          {showAlert && <Alert />}
          <FormInput
            name="email"
            labelText="Email"
            onChange={handleInputChange}
            placeholder="Please enter Email"
            type="text"
            value={values.email}
          />
          <FormInput
            name="password"
            labelText="Password"
            onChange={handleInputChange}
            placeholder="Please enter password"
            type="password"
            value={values.password}
          />
          <div className="submit-btn-container">
            <button
              disabled={isLoading ? true : false}
              className="btn"
              onClick={handleSubmit}
            >
              Login
            </button>
            <p className="login-link-para">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
