import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import DashBoard from "../container/GlobalAdmin/DashBoard/DashBoard";
import { TestRedux } from "../container";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/Forgot" element={<ForgotPassword />} /> */}

      <Route exact path="/Admin/" element={<DashBoard />}>
        {/* This TestRedux File is just for Testing of the Redux Toolkit Setup */}
        {/* <Route exact path="testRedux" element={<TestRedux />} /> */}
      </Route>
    </>
  )
);
