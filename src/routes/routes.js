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

      <Route exact path="/Admin/" element={<LoginCard />}>
        {/* This TestRedux File is just for Testing of the Redux Toolkit Setup */}
        {/* <Route exact path="testRedux" element={<TestRedux />} /> */}
      </Route>
    </>
  )
);
