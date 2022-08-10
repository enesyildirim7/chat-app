import React from "react";
import Axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    Axios.post("/api/user/logout").then(() => {
      dispatch(setAuth(false));
      navigate("/");
    });
  };
  return (
    <button
      className="w-24 h-9 rounded-lg border border-brand-dark dark:border-brand-light dark:text-brand-light text-sm"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
