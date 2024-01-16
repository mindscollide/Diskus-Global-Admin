import React, { useState } from "react";
import "./LoginCard.css";
import { Col, Row } from "react-bootstrap";
import DiskusLogo from "./../../../assets/images/DiskusLogo/Diskus_newLogo.svg";
import { LoginScreen, ForgotPassword, TwoFaScreen } from "../../../container";

const LoginCard = () => {
  const [screen, setScreen] = useState("login");

  // Function to switch to the forgot password screen
  const onClickForgetPasswordText = () => {
    setScreen("forgotPassword");
  };

  // Function to switch to the login screen
  const onClickGoBack = () => {
    setScreen("login");
  };

  // Function to switch to the twofascreen
  const onClickSignIn = () => {
    setScreen("twoFaScreen");
  };

  return (
    <>
      <div className="screens-card">
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center mt-5"
          >
            <img src={DiskusLogo} alt="loginLogo" />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg={12} md={12} sm={12}>
            {screen === "login" && (
              <LoginScreen
                onClickForgetPasswordText={onClickForgetPasswordText}
                onClickSignIn={onClickSignIn}
              />
            )}
            {screen === "forgotPassword" && (
              <ForgotPassword onClickGoBack={onClickGoBack} />
            )}
            {screen === "twoFaScreen" && (
              <TwoFaScreen onClickGoBack={onClickGoBack} />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginCard;
