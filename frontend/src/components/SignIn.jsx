import React, { useState } from "react";

import "./SignIn.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import img1 from "./../images/116.png";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   const token = JSON.parse(localStorage.getItem("token")).access;

  const handleSubmit = () => {
    toast.success("Signing In");
    axios
      .post("http://127.0.0.1:8000/api/signin/", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
        window.location.reload();
        toast.success("Logged in");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Info");
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <img src={img1} alt="Task Management" className="signin-logo" />

        <div className="signin-form">
          <h2 className="signin-heading">Task Management App</h2>
          <div className="signin-inputs">
            <div className="signin-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signin-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="signin-button" onClick={handleSubmit}>
              Sign In
            </button>
          </div>

          <p className="register-button">
            Don't have an account?{" "}
            <a onClick={() => navigate("/register")}>Register here.</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
