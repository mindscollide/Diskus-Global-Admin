import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "../../components/elements";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validationEmail } from "../../common/functions/Validate";
import { forgotPasswordMainnApi } from "../../store/Actions/AuthActions";

import "./ForgotPassword.css";
import { showNotification } from "../../components/elements/snack_bar/snackbar";

const ForgotPassword = ({ onClickGoBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value || "");
  };

  const nextSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      showNotification("error", t("Please-enter-email"));
      return;
    }

    if (!validationEmail(email)) {
      showNotification("error", t("Invalid-email-format"));
      return;
    }

    await dispatch(forgotPasswordMainnApi({ email, navigate, t }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      nextSubmitHandler(e);
    }
  };

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-center my-4">
          <span className="forget-password-in-text">
            {t("Forget-passwords")}
          </span>
        </Col>
      </Row>

      <Row>
        <Col>
          <span className="Email-text-forget">
            {t("Email-address")} <span className="forget-aesterick"> *</span>
          </span>

          <TextField
            applyClass="addOraganizer"
            labelClass="d-none"
            type="email"
            name="forgotEmail"
            change={emailChangeHandler}
            value={email}
            maxLength={250}
            placeholder={t("Email")}
            onKeyPress={handleKeyPress}
          />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <Button
            className="forget-button-color"
            text={t("Next")}
            onClick={nextSubmitHandler}
          />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <span className="go-back-text-for-pass" onClick={onClickGoBack}>
            {t("Go-back")}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
