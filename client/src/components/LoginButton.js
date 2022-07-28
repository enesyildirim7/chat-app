import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/login">
      <button className="w-24 h-9 rounded-lg border border-brand-dark dark:border-brand-light dark:text-brand-light text-sm">
        Login
      </button>
    </Link>
  );
};

export default LoginButton;
