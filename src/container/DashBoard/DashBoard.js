import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { ConfigProvider, Layout } from "antd";
import Header from "../../components/layout/Header/Header";
import AdminOptionsNavBar from "../../components/layout/AdminOptionsNavbar/AdminOptionsNavBar";
import { Outlet } from "react-router-dom";
import ar_EG from "antd/es/locale/ar_EG";
import en_US from "antd/es/locale/en_US";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/elements/loader/Loader";
import { mqttConnection } from "../../common/functions/mqttConnection";
import Helper from "../../common/functions/historyLogout";
import { GlobalAdminLogOutApi } from "../../store/Actions/AuthActions";
import { useTranslation } from "react-i18next";

const DashBoard = () => {
  const { t } = useTranslation();
  const { Content } = Layout;
  const dispatch = useDispatch();
  const authStateLoader = useSelector((state) => state.AuthActions.loading);
  const LoginHistoryLoader = useSelector((state) => state.loginHistory.loading);
  let newClient = Helper.socket;
  const mqttClient = useSelector(
    (state) => state.realtimeSlice.connectionClient
  );
  console.log("mqttConnection", mqttClient);
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
  const onMessageArrived = async (msg) => {
    let data = JSON.parse(msg.payloadString);
    console.log(data, "MQTT onMessageArrived");
    switch (data.message) {
      case "GA_LOGIN_ACTIVITY":
        let token = localStorage.getItem("token");
        let userID = localStorage.getItem("userID");
        if (
          token !== data.payload.authToken.token &&
          userID !== data.payload.authToken.userID
        ) {
          dispatch(GlobalAdminLogOutApi({ t }));
        }
        break;

      default:
        break;
    }
  };

  const onConnectionLost = () => {
    let userId = localStorage.getItem("userID");
    setTimeout(mqttConnection(Number(userId), dispatch), 3000);
  };

  useEffect(() => {
    if (mqttClient !== null) {
      if (newClient !== null) {
        newClient.onConnectionLost = onConnectionLost;
        newClient.onMessageArrived = onMessageArrived;
      }
    } else {
      let userId = localStorage.getItem("userID");
      userId && mqttConnection(Number(userId), dispatch);
      // console.log("mqttConnection is null");
    }
  }, [mqttClient, newClient, dispatch]);

  useEffect(() => {
    setCurrentLanguage(i18nextLng);
  }, [i18nextLng]);
  return (
    <>
      <ConfigProvider
        direction={currentLanguage === "ar" ? ar_EG : en_US}
        locale={currentLanguage === "ar" ? ar_EG : en_US}>
        <Layout>
          <Header />
          <AdminOptionsNavBar />
        </Layout>

        <Layout className='dashboard-background'>
          <Content>
            <div className='dashbaord_data'>
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
