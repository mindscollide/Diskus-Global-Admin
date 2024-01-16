import React from "react";
import "./DashBoard.css";
import { ConfigProvider, Layout } from "antd";
import Header from "../../components/layout/Header/Header";
import AdminOptionsNavBar from "../../components/layout/AdminOptionsNavbar/AdminOptionsNavBar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  const { Content } = Layout;
  return (
    <>
      <ConfigProvider
      // direction={currentLanguage === "ar" ? ar_EG : en_US}
      // locale={currentLanguage === "ar" ? ar_EG : en_US}
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
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default DashBoard;
