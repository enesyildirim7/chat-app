import React from "react";
import Axios from "../api/axios";
import Header from "../components/Header";

const APITest = () => {
  const checkauth = () => {
    Axios.get("/api/user/checkauth")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Header logoarea logout darkMode api />
      <div className="flex w-full h-full justify-center items-center">
        <button
          className="rounded-lg bg-slate-700 text-slate-200 dark:bg-slate-200 dark:text-slate-700 p-4"
          onClick={checkauth}
        >
          CheckAuth
        </button>
      </div>
    </>
  );
};

export default APITest;
