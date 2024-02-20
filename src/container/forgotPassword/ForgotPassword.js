import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "../../components/elements";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClickGoBack }) => {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center my-4"
        >
          <span className="forget-password-in-text">
            {t("Forget-password")}
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <TextField applyClass={"addOraganizer"} labelClass={"d-none"} />
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-3"
        >
          <Button className="forget-button-color" text={t("Sign-in")} />
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <span className="go-back-text-for-pass" onClick={onClickGoBack}>
            {t("Go-back")}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
