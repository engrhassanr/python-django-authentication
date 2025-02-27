import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route {...rest} element={token ? <Element /> : <Navigate to="/login" />} />
  );
};

export default PrivateRoute;
