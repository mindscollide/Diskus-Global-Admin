import React from "react";
import styles from "./PasswordVerification.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import { Button, TextField } from "../../components/elements";
const PasswordVerification = () => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="my-4 d-flex justify-content-center"
        >
          <span className="sign-in-text">{t("Enter-password")}</span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <TextField
            applyClass={"addOraganizer"}
            labelClass={"d-none"}
            name={"EmailAddress"}
            // change={HandleChange}
            // value={crendentials.Email}
            maxLength={250}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center w-100"
        >
          <Button text={"Next"} className={styles["LoginButton"]} />
        </Col>
      </Row>
    </>
  );
};

export default PasswordVerification;
