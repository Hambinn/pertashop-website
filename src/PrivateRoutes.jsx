import React, { useContext } from "react";
import { Outlet, Navigate, Router } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  return !!currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
