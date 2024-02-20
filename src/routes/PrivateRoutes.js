import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let RoleID = localStorage.getItem("userRoleId");
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="*" />;
};
export default PrivateRoutes;
