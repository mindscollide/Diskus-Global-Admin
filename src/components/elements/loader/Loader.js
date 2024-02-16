import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Loader.module.css";
import DikusGIF from "../../../assets/images/DiskusLogo/Loader.gif";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const messages = [
    t("Securing-your-session-one-step-at-a-time"),
    t("Deploying-multiple-encryption-layers"),
    t("Obfuscating-network"),
    t("Containing-&-encrypting-network"),
    t("Securing-your-data"),
    t("Generating-new-key-for-security"),
    t("Encrypting-your-data"),
    t("Authenticating-your-credentials"),
    t("Generating-secure-token"),
    t("Authenticating-identity"),
    t("Authenticating-your-credentials"),
    t("Containing-&-encrypting-network"),
    t("Authenticating-identity-&-encrypting-network"),
    t("Welcome-to-the-admin-panel-your-trusted-control-center"),
    t("Protecting-your-data-during-onboarding"),
    t("Protecting-your-data"),
    t("Advanced-data-protection-in-progress"),
    t("Securing-your-data-please-wait"),
    t("Downloading-file"),
  ];

  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") {
      setRandomIndex(messages[0]);
    } else if (location.pathname === "/Dashboard") {
      setRandomIndex(messages[0]);
    } else if (location.pathname === "/Dashboard/loginHistory") {
      setRandomIndex(messages[1]);
    } else if (location.pathname === "/Dashboard/vieworganization") {
      setRandomIndex(messages[1]);
    } else if (location.pathname === "/Dashboard/GlobalAdminDashboard") {
      setRandomIndex(messages[2]);
    } else {
      const randomIdx = Math.floor(Math.random() * messages.length);
      setRandomIndex(messages[randomIdx]);
    }
  }, []);

  return (
    <Container className={styles["main-container"]} data-tut="welcomescreen">
      <Row className={styles["overlay-box"]}>
        <Col className={styles["overlay"]}></Col>
        <Col className={styles["overlay-content"]}>
          <img
            src={DikusGIF}
            className={styles["LoadderImageclass"]}
            alt="My GIF Icon"
            draggable="false"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <p className={styles["Messeges_Styles"]}>{randomIndex}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
