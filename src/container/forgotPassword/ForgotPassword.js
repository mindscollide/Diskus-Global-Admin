import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "../../components/elements";
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
  const [open, setOpen] = useState({
    open: false,
    message: "",
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
    onClickToVerification();
    e.preventDefault();
    if (email !== "") {
      if (validationEmail(email)) {
        setMessege("");
        await dispatch(forgotPasswordMainnApi({ email, navigate, t }));
      } else {
        setMessege(t("Please-enter-a-valid-email"));
      }
    } else {
      setOpen({
        ...open,
        open: true,
        message: t("Please-enter-email"),
      });
      setTimeout(() => {
        setOpen({
          ...open,
          open: false,
          message: "",
        });
      }, 3000);
      setMessege("");
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
            name={"forgotEmail"}
            change={emailChangeHandler}
            value={email || ""}
            maxLength={250}
            // onKeyPress={handleKeyPress}
          />
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
    </>
  );
};

export default ForgotPassword;
