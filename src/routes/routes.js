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

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/" element={<LoginCard />}>
        <Route path="admin" element={<LoginCard />} />
      </Route>
      <Route path="/GlobalAdmin/" element={<DashBoard />}>
        <Route path="" element={<GlobalAdminDashboard />} />
        <Route path="vieworganization" element={<ViewOrganization />} />
        <Route path="loginHistory" element={<LoginHistory />} />
      </Route>
    </>
  )
);
