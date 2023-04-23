import "../styles/button.css";
import "../styles/register.css";
import "../styles/form.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { FormInput, Alert } from "../components";

import { useAppContext } from "../context/appContext";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { displayAlert, showAlert, isLoading, user, registerUser } =
    useAppContext();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (!username || !email || !password) {
      displayAlert();
    }
    registerUser(values);
  };

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
          <h3 className="form-title">Register</h3>
          {showAlert && <Alert />}
          <FormInput
            name="username"
            labelText="Username"
            onChange={handleInputChange}
            placeholder="Please enter username"
            type="text"
            value={values.username}
          />
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
              Register
            </button>
            <p className="login-link-para">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
