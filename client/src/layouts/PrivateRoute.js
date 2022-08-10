import React from "react";
import Axios from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  if (auth === "") {
    Axios.get("/api/user/checkauth")
      .then((res) => {
        res.status === 200 ? dispatch(setAuth(true)) : dispatch(setAuth(false));
      })
      .catch((err) => {
        dispatch(setAuth(false));
      });
  } else {
    return auth === true ? children : <Navigate to="/login" />;
  }
};

PrivateRoute.prototype = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
