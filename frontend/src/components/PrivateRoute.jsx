import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Payments from "./Payments";

const PrivateRoute = () => {
  const { token } = useAuth();

  return token || localStorage.getItem("authToken") ? (
    <Payments />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
