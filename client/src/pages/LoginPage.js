import React, { useState } from "react";
import Axios from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { setAuth } from "../redux/authSlice";
import "../styles/LoginPage.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Checkbox } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode).darkMode;
  const [user, setUser] = useState({ email: "", password: "" });
  const showPassword = () => {
    const passhow = document.getElementById("password").type;

    if (passhow === "password") {
      document.getElementById("password").type = "text";
    } else {
      document.getElementById("password").type = "password";
    }
  };
  const loginChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/user/login", user)
      .then((res) =>
        res.status === 200
          ? (dispatch(setAuth(true)),
            navigate("/messages"),
            setUser({ email: "", password: "" }))
          : dispatch(setAuth(false))
      )
      .catch((err) => {
        dispatch(setAuth(false));
      });
  };
  return (
    <div className="flex flex-col w-full justify-center items-center max-w-xs">
      <form
        method="POST"
        onSubmit={loginSubmit}
        className="flex flex-col w-full space-y-4"
      >
        <input
          type="email"
          name="email"
          required
          value={user.email}
          onChange={loginChange}
          placeholder="Email"
          className="username-field"
        ></input>
        <div className="relative">
          <button
            type="button"
            className="absolute mt-0 mb-0 top-0 bottom-0 right-2 text-center text-brand-dark/50 dark:text-brand-light/20"
            onClick={showPassword}
          >
            <Checkbox
              icon={
                <VisibilityIcon
                  size="1.5rem"
                  sx={darkMode ? { color: "#4b535f" } : { color: "#9ca3af" }}
                />
              }
              checkedIcon={
                <VisibilityOffIcon
                  size="1.5rem"
                  sx={darkMode ? { color: "#4b535f" } : { color: "#9ca3af" }}
                />
              }
              disableRipple={true}
              disableFocusRipple={true}
              disableTouchRipple={true}
            />
          </button>
          <input
            id="password"
            type="password"
            name="password"
            required
            value={user.password}
            onChange={loginChange}
            placeholder="Password"
            className="password-field"
          ></input>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <div className="flex flex-row w-full justify-center divide-brand-light/30 text-sm mt-6 text-brand-dark dark:text-brand-light/75">
        <div className="mr-2">Don't have an account?</div>
        <Link to="/register" className="hover:text-brand-primary">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const auth = useSelector((state) => state.auth.auth);
  return auth === false || auth === "" ? (
    <>
      <Header logoarea darkmode buttons api />
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-4xl font-bold text-brand-dark dark:text-brand-light mb-10">
          Log in
        </div>
        <LoginForm />
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default LoginPage;
