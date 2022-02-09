import React from "react";
import { Redirect } from "react-router-dom";

export default function PrivateRoute({ isAuthenticated, children, ...rest }) {
  return isAuthenticated ? children : <Redirect to="/login" />;
}
