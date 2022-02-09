import React from "react";
import { Redirect } from "react-router-dom";

export default function PublicRoute({ isAuthenticated, component, ...rest }) {
  return !isAuthenticated ? component : <Redirect to="/dashboard" />;
}
