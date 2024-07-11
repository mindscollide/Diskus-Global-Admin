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
import PakagesGlobalAdmin from "../container/PakagesGlobalAdmin/PakagesGlobalAdmin";
import GlobalLevelSettings from "../container/GlobalLevelSettings/GlobalLevelSettings";
import CashFlowSummary from "../container/CashFlowSumarry/CashFlowSummary";
import NewViewOrganization from "../container/NewViewOrganization/NewViewOrganization";
import ViewOrganizations from "../container/ViewOrganizations/ViewOrganizations";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/" element={<LoginCard />} />
      {/* <Route path="/admin" element={<LoginCard />} /> */}
      {/* </Route> */}
      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="/GlobalAdmin/" element={<DashBoard />}>
        <Route path="" element={<GlobalAdminDashboard />} />
        <Route path="GlobalDashboard" element={<GlobalAdminDashboard />} />
        {/* <Route path="vieworganization" element={<ViewOrganization />} /> */}
        <Route path="ViewOrganizations" element={<ViewOrganizations />} />
        <Route path="loginHistory" element={<LoginHistory />} />
        <Route path="Pakages" element={<PakagesGlobalAdmin />} />
        <Route
          path="OrganizationLevelSettings"
          element={<OrganizationLevelSettings />}
        />
        <Route path="GlobalLevelSettings" element={<GlobalLevelSettings />} />
        <Route path="Summary" element={<CashFlowSummary />} />
      </Route>
      {/* </Route> */}

      {/* <Route exact path="/GlobalAdmin/" element={<DashBoard />}>
        <Route path="" element={<GlobalAdminDashboard />} />
        <Route path="GlobalDashboard" element={<GlobalAdminDashboard />} />
        <Route path="vieworganization" element={<ViewOrganization />} />
        <Route path="loginHistory" element={<LoginHistory />} />
        <Route path="Pakages" element={<PakagesGlobalAdmin />} />
        <Route
          path="OrganizationLevelSettings"
          element={<OrganizationLevelSettings />}
        />
        <Route path="GlobalLevelSettings" element={<GlobalLevelSettings />} />
        <Route path="Summary" element={<CashFlowSummary />} />
      </Route> */}
    </>
  )
);
