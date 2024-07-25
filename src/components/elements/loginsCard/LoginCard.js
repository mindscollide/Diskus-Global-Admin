import React from "react";
import styles from "./LoginCard.module.css";
import { Col, Row, Container } from "react-bootstrap";
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
  PasswordVerification,
  VerificationCode,
} from "../../../container";
import { useDispatch, useSelector } from "react-redux";
import { changeScreen } from "../../../store/ActionsSlicers/AuthScreenActionSlicer";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/elements/loader/Loader";

const LoginCard = () => {
  const { t } = useTranslation();

  const screenName = useSelector((state) => state.Auth.screenName);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.AuthActions);
  const { loading } = authState;

  // Function to switch to the forgot password screen
  const onClickForgetPasswordText = () => {
    dispatch(changeScreen("forgotPassword"));
  };

  // Function to switch to the login screen
  const onClickGoBack = () => {
    dispatch(changeScreen("login"));
  };

  // Function to switch to the Enter Password screen
  const onClickToVerification = () => {
    dispatch(changeScreen("VerificationCode"));
  };

  return (
    <>
      <Container>
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className={styles["language-selector-class"]}
          >
            <LanguageSelector />
          </Col>
        </Row>
        {/* Inside the Card functionality */}
        <Row className={styles["login-cards-container"]}>
          <Col lg={4} md={4} sm={12}>
            <div className={styles["screens-card"]}>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center"
                >
                  <img src={DiskusLogo} alt="loginLogo" />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center flex-column px-4"
                >
                  {screenName === "login" && <LoginScreen />}
                  {screenName === "forgotPassword" && (
                    <ForgotPassword
                      onClickGoBack={onClickGoBack}
                      onClickToVerification={onClickToVerification}
                    />
                  )}
                  {screenName === "TwoFaScreen" && (
                    <TwoFaScreen onClickGoBack={onClickGoBack} />
                  )}
                  {screenName === "PasswordVerification" && (
                    <PasswordVerification
                      onClickGoBack={onClickGoBack}
                      onClickForgetPasswordText={onClickForgetPasswordText}
                    />
                  )}

                  {screenName === "VerificationCode" && (
                    <VerificationCode
                      onClickGoBack={onClickGoBack}
                      onClickToVerification={onClickToVerification}
                    />
                  )}
                </Col>
              </Row>
            </div>
          </Col>
          {/* OutSide the Card Functionality */}
          <Col
            lg={8}
            md={8}
            sm={12}
            className={styles["column-class-heading-login"]}
          >
            {screenName === "forgotPassword" && (
              <>
                <h1 className={styles["heading-1"]}>
                  {t("Simplify-management")}
                </h1>
                <h1 className={styles["heading-2"]}>{t("Collaborate")}</h1>
                <h1 className={styles["heading-1"]}>{t("Prioritize")}</h1>

                <img
                  src={DiskusRoundLogo}
                  alt="login-round-logo"
                  width="600px"
                  className={styles["forgotpassword-round-circle-class"]}
                />
              </>
            )}

            {screenName === "login" && (
              <>
                <div className={styles["login-screen-headings"]}>
                  <h1 className={styles["heading-1"]}>
                    {t("Simplify-management")}
                  </h1>
                  <h1 className={styles["heading-2"]}>{t("Collaborate")}</h1>
                  <h1 className={styles["heading-1"]}>{t("Prioritize")}</h1>
                </div>
                <div className="Diskus_rounded_logo">
                  <img
                    src={DiskusRoundLogo}
                    alt="login-round-logo"
                    className={styles["round-circle-class"]}
                  />
                </div>
              </>
            )}

            {screenName === "VerificationCode" && (
              <>
                <img
                  src={img7}
                  width="500px"
                  height="450px"
                  alt="verification"
                  className={styles["phone-verification-image"]}
                />

                <img
                  src={DiskusRoundLogo}
                  alt="login-round-logo"
                  width="600px"
                  className={styles["VerificationCode-round-circle-class"]}
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
                  className={styles["phone-notification-verification-image"]}
                />
                <img
                  src={DiskusRoundLogo}
                  alt="login-round-logo"
                  width="600px"
                  className={styles["phone-notification-round-circle-class"]}
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
                  className={styles["phone-notification-verification-image"]}
                />
                <img
                  src={DiskusRoundLogo}
                  alt="login-round-logo"
                  width="600px"
                  className={styles["phone-notification-round-circle-class"]}
                />
              </>
            )}

            {screenName === "TwoFaScreen" && (
              <>
                <div className={styles["login-screen-headings"]}>
                  <img
                    src={img2}
                    alt=""
                    className={styles["twoFaScreen_mobileIcon"]}
                  />
                </div>
                <div className="Diskus_rounded_logo">
                  <img
                    src={DiskusRoundLogo}
                    alt="login-round-logo"
                    className={styles["phone-notification-round-circle-class"]}
                  />
                </div>
              </>
            )}

            {screenName === "PasswordVerification" && (
              <>
                <div className={styles["login-screen-headings"]}>
                  <h1 className={styles["heading-1"]}>
                    {t("Simplify-management")}
                  </h1>
                  <h1 className={styles["heading-2"]}>{t("Collaborate")}</h1>
                  <h1 className={styles["heading-1"]}>{t("Prioritize")}</h1>
                </div>
                <div className="Diskus_rounded_logo">
                  <img
                    src={DiskusRoundLogo}
                    alt="login-round-logo"
                    className={styles["round-circle-class"]}
                  />
                </div>
              </>
            )}
          </Col>
        </Row>
        {loading && <Loader />}
      </Container>
    </>
  );
};

export default LoginCard;
