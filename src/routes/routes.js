import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import DashBoard from "../container/DashBoard/DashBoard";
import { Dashboard, TestRedux } from "../container";
import LoginCard from "../components/elements/loginsCard/LoginCard";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/" element={<LoginCard />}>
        <Route path="admin" element={<LoginCard />} />
      </Route>
    </>
  )
);
