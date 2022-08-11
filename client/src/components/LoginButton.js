import React from "react";
import { ROUTES } from "../configs/routes";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to={ROUTES.Login}>
      <button className="w-24 h-9 rounded-lg border border-brand-dark dark:border-brand-light dark:text-brand-light text-sm">
        Login
      </button>
    </Link>
  );
};

export default React.memo(LoginButton);
