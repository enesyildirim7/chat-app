import React from "react";
import { ROUTES } from "../configs/routes";
import Axios from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { toggleDarkMode } from "../redux/darkModeSlice";
import LoginButton from "../components/LoginButton";
import RegisterButton from "../components/RegisterButton";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";

export const LogoArea = () => {
  return (
    <Link to={ROUTES.Home}>
      <div className="font-bold text-brand-primary dark:text-brand-light text-md cursor-pointer">
        SJ Chat App
      </div>
    </Link>
  );
};

export const DarkModeIcon = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const toggleDarkMod = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <IconButton
      onClick={() => {
        toggleDarkMod();
        dispatch(toggleDarkMode());
        console.log(darkMode);
      }}
      edge="start"
    >
      {darkMode.darkMode ? (
        <Brightness7Icon sx={{ color: "#dce4f2" }} />
      ) : (
        <Brightness4Icon sx={{ color: "#131a26" }} />
      )}
    </IconButton>
  );
};

const Header = React.memo(({ logoarea, darkmode, buttons, api }) => {
  const auth = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  if (auth === "") {
    Axios.get("/api/user/checkauth")
      .then((res) => {
        res.status === 200 ? dispatch(setAuth(true)) : dispatch(setAuth(false));
      })
      .catch((err) => {
        dispatch(setAuth(false));
      });
  }
  return (
    <header className="flex w-full justify-between items-center min-h-24 px-48 py-6">
      {logoarea ? <LogoArea /> : null}
      <div className="flex flex-row space-x-3 justify-center items-center">
        {darkmode ? <DarkModeIcon /> : null}
        {buttons ? (
          auth === true ? (
            <>
              <ProfileButton /> <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton /> <RegisterButton />
            </>
          )
        ) : null}
        {api ? (
          <Link to={ROUTES.ApiTest}>
            <button className="rounded-lg bg-violet-500 text-slate-800 px-4 py-1.5">
              Api Test
            </button>
          </Link>
        ) : null}
      </div>
    </header>
  );
});

export default Header;
