import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
  },
});
