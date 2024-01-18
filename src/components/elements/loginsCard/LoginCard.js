import React, { useState } from "react";
import "./LoginCard.css";
import { Col, Row } from "react-bootstrap";
import DiskusLogo from "./../../../assets/images/DiskusLogo/Diskus_newLogo.svg";
import DiskusRoundLogo from "./../../../assets/images/DiskusLogo/Diskus_newRoundIcon.svg";
import LanguageSelector from "../../elements/languageSelector/Language-selector";
import img7 from "./../../../assets/images/DiskusLogo/7.png";
import img9 from "./../../../assets/images/DiskusLogo/9.png";
import img2 from "./../../../assets/images/DiskusLogo/2.png";

import {
  LoginScreen,
  ForgotPassword,
  TwoFaScreen,
  VerificationCode,
  VerificationPhone,
  VerificationNotificationPhone,
} from "../../../container";
import { useDispatch, useSelector } from "react-redux";
import { changeScreen } from "../../../store/AuthAction";
import { useTranslation } from "react-i18next";

const LoginCard = () => {
  const { t, i18n } = useTranslation();

  const screenName = useSelector((state) => state.Auth.screenName);

  const dispatch = useDispatch();
  // Function to switch to the forgot password screen
  const onClickForgetPasswordText = () => {
    dispatch(changeScreen("forgotPassword"));
  };

  // Function to switch to the login screen
  const onClickGoBack = () => {
    dispatch(changeScreen("login"));
  };

  // Function to switch to the twofascreen
  const onClickSignIn = () => {
    dispatch(changeScreen("TwoFaScreen"));
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} className="language-selector-class">
          <LanguageSelector />
        </Col>
      </Row>
      <Row>
        <Col lg={3} md={3} sm={3}>
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
                {screenName === "login" && (
                  <LoginScreen
                    onClickForgetPasswordText={onClickForgetPasswordText}
                    onClickSignIn={onClickSignIn}
                  />
                )}
                {screenName === "forgotPassword" && (
                  <ForgotPassword onClickGoBack={onClickGoBack} />
                )}
                {screenName === "TwoFaScreen" && (
                  <TwoFaScreen onClickGoBack={onClickGoBack} />
                )}
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={5} md={5} sm={5} className="column-class-heading-login">
          {screenName === "forgotPassword" && (
            <>
              <h1 className="heading-1">{t("Simplify-management")}</h1>
              <h1 className="heading-2">{t("Collaborate")}</h1>
              <h1 className="heading-1">{t("Prioritize")}</h1>
            </>
          )}

          {screenName === "login" && (
            <>
              <h1 className="heading-1">{t("Simplify-management")}</h1>
              <h1 className="heading-2">{t("Collaborate")}</h1>
              <h1 className="heading-1">{t("Prioritize")}</h1>
            </>
          )}

          {screenName === "VerificationCode" && (
            <>
              <img
                src={img7}
                width="480px"
                alt="verification"
                className="phone-verification-image"
              />
            </>
          )}

          {screenName === "VerificationNotificationPhone" && (
            <>
              <img
                src={img9}
                width="270px"
                height="450px"
                alt="verification"
                className="phone-notification-verification-image"
              />
            </>
          )}

          {screenName === "VerificationPhone" && (
            <>
              <img
                src={img2}
                width="400px"
                height="450px"
                alt="verification"
                className="phone-notification-verification-image"
              />
            </>
          )}

          {screenName === "TwoFaScreen" && (
            <>
              <img
                src={img2}
                width="400px"
                height="450px"
                alt="verification"
                className="phone-notification-verification-image"
              />
            </>
          )}
        </Col>
        <Col lg={4} md={4} sm={4}>
          {screenName === "login" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="round-circle-class"
              />
            </>
          )}

          {screenName === "forgotPassword" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="forgotpassword-round-circle-class"
              />
            </>
          )}

          {screenName === "VerificationCode" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="VerificationCode-round-circle-class"
              />
            </>
          )}

          {screenName === "VerificationNotificationPhone" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="phone-notification-round-circle-class"
              />
            </>
          )}

          {screenName === "VerificationPhone" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="phone-notification-round-circle-class"
              />
            </>
          )}

          {screenName === "TwoFaScreen" && (
            <>
              <img
                src={DiskusRoundLogo}
                alt="login-round-logo"
                width="600px"
                className="phone-notification-round-circle-class"
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default LoginCard;
