import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});
