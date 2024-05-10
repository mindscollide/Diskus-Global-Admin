import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import { DashBoard } from "../container";
import LoginCard from "../components/elements/loginsCard/LoginCard";
import ViewOrganization from "../container/ViewOrganization/ViewOrganization";
import LoginHistory from "../container/LoginHistory/LoginHistory";
import GlobalAdminDashboard from "../container/GlobalAdminDashboard/GlobalAdminDashboard";
import PrivateRoutes from "./PrivateRoutes";
import OrganizationLevelSettings from "../container/OrganizationLevelSettings/OrganizationLevelSettings";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/" element={<LoginCard />} />
      {/* <Route path="/admin" element={<LoginCard />} /> */}
      {/* </Route> */}
      <Route element={<PrivateRoutes />}>
        <Route exact path="/GlobalAdmin/" element={<DashBoard />}>
          <Route path="" element={<GlobalAdminDashboard />} />
          <Route path="GlobalDashboard" element={<GlobalAdminDashboard />} />
          <Route path="vieworganization" element={<ViewOrganization />} />
          <Route path="loginHistory" element={<LoginHistory />} />
          <Route
            path="OrganizationLevelSettings"
            element={<OrganizationLevelSettings />}
          />
        </Route>
      </Route>
    </>
  )
);
