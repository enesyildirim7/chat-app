import React, { useState } from "react";
import "../styles/RegisterPage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passcheck: "",
  });
  const registerChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerSubmit = () => {};
  return (
    <div className="flex flex-col w-full justify-center items-center max-w-md">
      <form
        method="POST"
        onSubmit={registerSubmit}
        className="flex flex-col w-full space-y-4"
      >
        <div className="flex flex-row space-x-4">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={registerChange}
            placeholder="Name"
            className="form-field"
            required
          ></input>
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={registerChange}
            placeholder="Surname"
            className="form-field"
            required
          ></input>
        </div>

        <input
          type="text"
          name="username"
          value={user.username}
          onChange={registerChange}
          placeholder="Username"
          className="form-field"
          required
        ></input>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={registerChange}
          placeholder="Email"
          className="form-field"
          required
        ></input>

        <div className="flex flex-row space-x-4">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={registerChange}
            placeholder="Password"
            className="form-field"
            required
          ></input>
          <input
            type="password"
            name="passcheck"
            value={user.passcheck}
            onChange={registerChange}
            placeholder="Confirm password"
            className="form-field"
            required
          ></input>
        </div>
        <div className="flex flex-row space-x-1 items-center text-brand-dark dark:text-brand-light/75">
          <Checkbox
            sx={{ color: "#005eff" }}
            checkedIcon={<DoneAllRoundedIcon sx={{ color: "#005eff" }} />}
          />
          <div className="text-sm">
            I accept the{" "}
            <Link to="/terms" className="text-brand-primary hover:text-brand-second">
              terms of use.
            </Link>
          </div>
        </div>
        <Link to="/messages">
          <button type="button" className="register-btn">
            Sign Up
          </button>
        </Link>
      </form>
      <div className="flex flex-row w-full justify-center divide-brand-light/30 text-sm mt-6 text-brand-dark dark:text-brand-light/75">
        <div className="mr-2">Already have an account?</div>
        <Link to="/login" className="hover:text-brand-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <>
      <Header logoarea darkmode buttons />
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-4xl font-bold text-brand-dark dark:text-brand-light mb-10">
          Sign up
        </div>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
