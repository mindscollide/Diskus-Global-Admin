import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getActionValue } from "../common/functions/Validate";
const PrivateRoutes = () => {
  let RoleID = localStorage.getItem("userRoleId");
  let currentURL = window.location.href;
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      if (
        currentURL
          .toLowerCase()
          .includes(
            "GlobalAdmin/ViewOrganizations?orgTrialAccept_action=".toLowerCase()
          )
      ) {
        let getValue = getActionValue(currentURL, "orgTrialAccept_action=");
        localStorage.setItem("orgTrialAccept_action", getValue);
      } else if (
        currentURL
          .toLowerCase()
          .includes(
            "GlobalAdmin/ViewOrganizations?orgTrialReject_action=".toLowerCase()
          )
      ) {
        let getValue = getActionValue(currentURL, "orgTrialReject_action=");
        localStorage.setItem("orgTrialReject_action", getValue);
      }
    } catch (error) {}
  }, [currentURL]);

  return RoleID !== null && Number(RoleID) === 0 && token ? (
    <Outlet />
  ) : (
    <Navigate
      to={
        currentURL !== "" &&
        currentURL.includes("GlobalAdmin/ViewOrganizations")
          ? "/"
          : "*"
      }
    />
  );
};
export default PrivateRoutes;
