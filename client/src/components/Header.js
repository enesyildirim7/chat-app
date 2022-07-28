import React, { useState } from "react";
import LoginButton from "../components/LoginButton";
import RegisterButton from "../components/RegisterButton";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

const Header = () => {
  const [dark, setDark] = useState(true);
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };
  return (
    <header className="flex w-full justify-between items-center min-h-24 px-48 py-6">
      <Link to="/">
        <div className="font-bold text-brand-primary dark:text-brand-light text-md cursor-pointer">
          SJ Chat App
        </div>
      </Link>
      <div className="flex flex-row space-x-3 justify-center items-center">
        <IconButton onClick={toggleDarkMode} edge="start">
          {dark ? (
            <Brightness7Icon sx={{ color: "#dce4f2" }} />
          ) : (
            <Brightness4Icon sx={{ color: "#131a26" }} />
          )}
        </IconButton>
        <LoginButton />
        <RegisterButton />
      </div>
    </header>
  );
};

export default Header;
