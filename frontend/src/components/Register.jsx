import React, { useState } from "react";
import "./SignIn.css";
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
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
          <a
            href="#"
            className="bg-black text-white font-bold text-xl p-4"
            alt="Logo"
          >
            Logo
          </a>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Join Us.</p>
          <div className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label htmlFor="location" className="text-lg">
                Location
              </label>
              <input
                type="location"
                id="location"
                placeholder="your@email.com"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              value="Sign In"
              onClick={handleSubmit}
              className="bg-black text-white font-bold text-lg hover:text-white hover:bg-gray-700 p-2 mt-8"
            >
              Register
            </button>
          </div>
          <div className="text-center pt-12 pb-12">
            <p>
              Already have an account?{" "}
              <a
                className="underline font-semibold"
                onClick={() => navigate("/signin")}
              >
                Sign in here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisterForm;
