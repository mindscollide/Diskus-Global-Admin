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
  const authState = useSelector((state) => state.EmailValidation);
  const { loading } = authState;
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

        <Layout>
          <Content>
            <div className="dashbaord_data">
              <Outlet />
            </div>
          </Content>
          {loading && <Loader />}
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default DashBoard;
