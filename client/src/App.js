import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./layouts/PrivateRoute";
import store from "./redux/store";
import { ROUTES } from "./configs/routes";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import MessagesPage from "./pages/MessagesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import APITest from "./pages/APITest";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.Home} element={<HomePage />} />
          <Route
            path={ROUTES.Messages}
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ApiTest}
            element={
              <PrivateRoute>
                <APITest />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.Login} element={<LoginPage />} />
          <Route path={ROUTES.Signup} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
