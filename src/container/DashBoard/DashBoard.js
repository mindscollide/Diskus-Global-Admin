import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { ConfigProvider, Layout } from "antd";
import Header from "../../components/layout/Header/Header";
import AdminOptionsNavBar from "../../components/layout/AdminOptionsNavbar/AdminOptionsNavBar";
import { Outlet } from "react-router-dom";
import ar_EG from "antd/es/locale/ar_EG";
import en_US from "antd/es/locale/en_US";
import { useSelector } from "react-redux";
import Loader from "../../components/elements/loader/Loader";

const DashBoard = () => {
  const { Content } = Layout;
  const authStateLoader = useSelector((state) => state.AuthActions.loading);
  const LoginHistoryLoader = useSelector((state) => state.loginHistory.loading);
  const globalAdminDashboardLoader = useSelector(
    (state) => state.globalAdminDashboardReducer.loading
  );
  const LanguageReducerLoader = useSelector(
    (state) => state.LanguageReducer.loading
  );

  const ViewOrganizationData = useSelector(
    (state) => state.searchOrganization.loading
  );
  let i18nextLng = localStorage.getItem("i18nextLng");
  console.log("i18nextLng", i18nextLng);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") === null
      ? "en"
      : localStorage.getItem("i18nextLng")
  );

  useEffect(() => {
    setCurrentLanguage(i18nextLng);
  }, [i18nextLng]);
  return (
    <>
      <ConfigProvider
        direction={currentLanguage === "ar" ? ar_EG : en_US}
        locale={currentLanguage === "ar" ? ar_EG : en_US}
      >
        <Layout>
          <Header />
          <AdminOptionsNavBar />
        </Layout>

        <Layout className="dashboard-background">
          <Content>
            <div className="dashbaord_data">
              <Outlet />
            </div>
          </Content>
          {LoginHistoryLoader ||
          authStateLoader ||
          ViewOrganizationData ||
          globalAdminDashboardLoader ||
          LanguageReducerLoader ? (
            <Loader />
          ) : null}
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default DashBoard;
