import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import { DashBoard } from "../container";
import LoginCard from "../components/elements/loginsCard/LoginCard";
import ViewOrganization from "../container/ViewOrganization/ViewOrganization";
import LoginHistory from "../container/LoginHistory/LoginHistory";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/" element={<LoginCard />}>
        <Route path="admin" element={<LoginCard />} />
      </Route>
      <Route path="/Dashboard" element={<DashBoard />}>
        <Route path="vieworganization" element={<ViewOrganization />} />
        <Route path="loginHistory" element={<LoginHistory />} />
      </Route>
    </>
  )
);
