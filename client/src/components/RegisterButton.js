import React from "react";
import { ROUTES } from "../configs/routes";
import { Link } from "react-router-dom";

const RegisterButton = () => {
  return (
    <Link to={ROUTES.Signup}>
      <button className="w-24 h-9 rounded-lg border bg-brand-dark border-brand-dark dark:border-brand-light text-brand-light dark:text-brand-light text-sm">
        Sign Up
      </button>
    </Link>
  );
};

export default React.memo(RegisterButton);
