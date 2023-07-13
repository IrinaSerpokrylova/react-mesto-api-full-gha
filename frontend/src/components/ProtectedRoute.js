import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  // isLoggedIn = true;
  return isLoggedIn ? element : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;

// Доделать
