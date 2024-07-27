import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Button, VerificationInputField } from "../../../components/elements";
import img10 from "./../../../assets/images/DiskusLogo/10.png";
import img5 from "./../../../assets/images/DiskusLogo/5.png";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./VerificationCode.css";

const VerificationCode = ({ onClickGoBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTP, setVerifyOTP] = useState("");

  useEffect(() => {
    // if value was cleared, set key to re-render the element
    if (verifyOTP.length === 0) {
      // setKey(key + 1);
      return;
    }
  }, [verifyOTP]);

  const changeHandler = (e) => {
    let otpval = e.toUpperCase();
    setVerifyOTP(otpval);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="verification-heading">{t("2fa-verification")}</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <>
            <span className="verification-subheading">
              {t("6-digit-code-has-sent-on-to-this")}
            </span>
          </>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="enter-code-subheading">{t("Enter-code")}</span>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={12} lg={12} className="Enter-Code-Label">
          <VerificationInputField
            fields={6}
            applyClass="OTPInput"
            // change={handleChange}
            // key={key}
            // value={otpCode}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="resend-heading">{t("Resend-code")}</span>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <Button className="SendCode-button-color" text="Verify" />
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <span className="go-back-text" onClick={onClickGoBack}>
            {t("Go-back")}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default VerificationCode;
