import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TextField, Button, Notification } from "../../components/elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validationEmail } from "../../common/functions/Validate";

import "./ForgotPassword.css";
import { forgotPasswordMainnApi } from "../../store/Actions/AuthActions";

const ForgotPassword = ({ onClickGoBack, onClickToVerification }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [messege, setMessege] = useState("");

  const [openNotification, setOpenNotification] = useState({
    loginFlag: false,
    loginNotification: null,
    severity: "none",
  });

  const emailChangeHandler = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    if (value !== "" && name === "forgotEmail") {
      setEmail(value);
    } else {
      setEmail("");
    }
  };

  const nextSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === "") {
      setOpenNotification({
        ...openNotification,
        loginFlag: true,
        loginNotification: t("Please-enter-email"),
        severity: "error",
      });

      // Close the notification after 3 seconds
      setTimeout(() => {
        setOpenNotification({
          ...openNotification,
          loginFlag: false,
        });
      }, 3000);
    } else if (!validationEmail(email)) {
      setOpenNotification({
        ...openNotification,
        loginFlag: true,
        loginNotification: t("Invalid-email-format"),
        severity: "error",
      });

      // Close the notification after 3 seconds
      setTimeout(() => {
        setOpenNotification({
          ...openNotification,
          loginFlag: false,
        });
      }, 3000);
    } else {
      await dispatch(forgotPasswordMainnApi({ email, navigate, t }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      nextSubmitHandler(e);
    }
  };

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
            {t("Forget-passwords")}
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="Email-text-forget">
            {t("Email-address")} <span className="forget-aesterick"> *</span>
          </span>
          <TextField
            applyClass={"addOraganizer"}
            labelClass={"d-none"}
            type="email"
            name={"forgotEmail"}
            change={emailChangeHandler}
            value={email}
            maxLength={250}
            placeholder={t("Email")}
            onKeyPress={handleKeyPress}
          />
          <p className={"ErrorMessege"}>{messege}</p>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-3"
        >
          <Button
            className="forget-button-color"
            text={t("Next")}
            onClick={nextSubmitHandler}
          />
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

      <Notification
        show={openNotification.loginFlag}
        hide={setOpenNotification}
        message={openNotification.loginNotification}
        severity={openNotification.severity}
        notificationClass={
          openNotification.severity
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default ForgotPassword;
