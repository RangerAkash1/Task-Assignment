import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  //   const token = JSON.parse(localStorage.getItem("token")).access;

  const handleSubmit = () => {
    toast.loading("Registering");
    axios
      .post("http://127.0.0.1:8000/api/register/", {
        email,
        password,
        location,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/signin");
        toast.dismiss();
      })
      .catch((err) => console.log(err));
  };

  //   return (
  //     <div className="sign-in-form">
  //       <h2>Register</h2>
  //       <div className="input-field">
  //         <label htmlFor="email">Email:</label>
  //         <input
  //           type="email"
  //           id="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="input-field">
  //         <label htmlFor="location">Location:</label>
  //         <input
  //           type="text"
  //           id="location"
  //           value={location}
  //           onChange={(e) => setLocation(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="input-field">
  //         <label htmlFor="password">Password:</label>
  //         <input
  //           type="password"
  //           id="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <a
  //         style={{ color: "blue", cursor: "pointer" }}
  //         onClick={() => navigate("/register")}
  //       >
  //         Sign In Here
  //       </a>

  //       <button onClick={handleSubmit}>Register</button>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="registration-container">
        <div className="registration-content">
          <a href="#" className="logo">
            Logo
          </a>

          <div className="registration-form">
            <p className="registration-heading">Join Us.</p>
            <div className="registration-inputs">
              <div className="registration-input">
                <label htmlFor="location">Location</label>
                <input
                  type="location"
                  id="location"
                  placeholder="Your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="registration-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="registration-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button onClick={handleSubmit} className="registration-button">
                Register
              </button>
            </div>

            <p className="registration-login">
              Already have an account?{" "}
              <a onClick={() => navigate("/signin")}>Sign in here.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterForm;
