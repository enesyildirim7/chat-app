import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../configs/routes";

const ProfileButton = () => {
  return (
    <Link to={ROUTES.Messages}>
      <button className="w-24 h-9 rounded-lg border-b border-brand-dark hover:bg-brand-dark/10 dark:hover:bg-brand-light/10 transition-all dark:border-brand-light dark:text-brand-light text-sm">
        Messages
      </button>
    </Link>
  );
};

export default React.memo(ProfileButton);
