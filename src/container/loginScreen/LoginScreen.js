import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import "./LoginScreen.css";
import {
  Button,
  Checkbox,
  TextField,
  Notification,
} from "../../components/elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enterEmailValidation } from "../../store/Actions/AuthActions";
import { useTranslation } from "react-i18next";
import { changeScreen } from "../../store/ActionsSlicers/AuthScreenActionSlicer";
import { validationEmail } from "../../common/functions/Validate";
import { async } from "q";
import { resetAuthResponseMessage } from "../../store/ActionsSlicers/AuthLoginSlicer";

const LoginScreen = () => {
  const navigate = useNavigate();
  const ResponseMessage = useSelector(
    (state) => state.AuthActions.Responsemessage
  );
  console.log(ResponseMessage, "authReducer");
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [openNotification, setOpenNotification] = useState({
    loginFlag: false,
    loginNotification: null,
    severity: "none",
  });

  const [rememberEmail, setRemeberEmail] = useState(false);
  const screenName = useSelector((state) => state.Auth.screenName);

  const [email, setEmail] = useState("");

  const [crendentials, setCrendentials] = useState({
    Email: "",
  });

  const HandleChange = (e, index) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "EmailAddress") {
      if (value !== "") {
        setCrendentials({
          ...crendentials,
          Email: value.trimStart(),
        });
      } else {
        setCrendentials({
          ...crendentials,
          Email: "",
        });
      }
    }
  };

  const emailChangeHandler = (e) => {
    let value = e.target.value;
    let nValue = value.trim();
    if (nValue === "" && validationEmail(value)) {
    } else {
      let RememberEmailLocal = JSON.parse(
        localStorage.getItem("rememberEmail")
      );
      if (RememberEmailLocal === true) {
        setEmail(nValue);
        localStorage.setItem("rememberEmailValue", nValue);
      } else {
        setEmail(nValue);
      }
    }
  };

  useEffect(() => {
    let RememberEmailLocal = JSON.parse(localStorage.getItem("rememberEmail"));
    let orgTrialAccept = localStorage.getItem("orgTrialAccept_action");
    let orgTrialReject = localStorage.getItem("orgTrialReject_action");
    let RememberPasswordLocal = JSON.parse(
      localStorage.getItem("remeberPassword")
    );
    let currentLanguage =
      localStorage.getItem("currentLanguage") !== null
        ? localStorage.getItem("currentLanguage")
        : "en";
    if (RememberEmailLocal === true && RememberPasswordLocal === true) {
      let RememberEmailLocalValue = localStorage.getItem("rememberEmailValue");

      let RememberPasswordLocalValue = localStorage.getItem(
        "rememberPasswordValue"
      );
      localStorage.clear();
      if (orgTrialAccept !== null) {
        localStorage.setItem("orgTrialAccept_action", orgTrialAccept);
      }
      if (orgTrialReject !== null) {
        localStorage.setItem("orgTrialReject_action", orgTrialReject);
      }
      localStorage.setItem("currentLanguage", currentLanguage);
      localStorage.setItem("remeberPassword", RememberPasswordLocal);
      localStorage.setItem("rememberPasswordValue", RememberPasswordLocalValue);
      localStorage.setItem("rememberEmail", RememberEmailLocal);
      localStorage.setItem("rememberEmailValue", RememberEmailLocalValue);
      setRemeberEmail(RememberEmailLocal);
      setEmail(RememberEmailLocalValue);
    } else if (RememberEmailLocal === true) {
      let RememberEmailLocalValue = localStorage.getItem("rememberEmailValue");
      localStorage.clear();
      if (orgTrialAccept !== null) {
        localStorage.setItem("orgTrialAccept_action", orgTrialAccept);
      }
      if (orgTrialReject !== null) {
        localStorage.setItem("orgTrialReject_action", orgTrialReject);
      }
      localStorage.setItem("rememberEmail", RememberEmailLocal);
      localStorage.setItem("rememberEmailValue", RememberEmailLocalValue);
      localStorage.setItem("currentLanguage", currentLanguage);

      setRemeberEmail(RememberEmailLocal);
      setEmail(RememberEmailLocalValue);
    } else if (RememberPasswordLocal === true) {
      let RememberPasswordLocalValue = localStorage.getItem(
        "rememberPasswordValue"
      );
      localStorage.clear();
      if (orgTrialAccept !== null) {
        localStorage.setItem("orgTrialAccept_action", orgTrialAccept);
      }
      if (orgTrialReject !== null) {
        localStorage.setItem("orgTrialReject_action", orgTrialReject);
      }
      localStorage.setItem("remeberPassword", RememberPasswordLocal);
      localStorage.setItem("rememberPasswordValue", RememberPasswordLocalValue);
      localStorage.setItem("currentLanguage", currentLanguage);
    } else {
      localStorage.clear();
      if (orgTrialAccept !== null) {
        localStorage.setItem("orgTrialAccept_action", orgTrialAccept);
      }
      if (orgTrialReject !== null) {
        localStorage.setItem("orgTrialReject_action", orgTrialReject);
      }
      localStorage.setItem("rememberEmail", false);
      localStorage.setItem("rememberEmailValue", "");
      localStorage.setItem("remeberPassword", false);
      localStorage.setItem("rememberPasswordValue", "");
      localStorage.setItem("currentLanguage", currentLanguage);
    }
  }, []);

  useEffect(() => {
    if (
      ResponseMessage !== null &&
      ResponseMessage !== undefined &&
      ResponseMessage !== ""
    ) {
      setOpenNotification({
        ...openNotification,
        loginFlag: true,
        loginNotification: ResponseMessage,
        severity: "error",
      });
      setTimeout(() => {
        setOpenNotification({
          ...openNotification,
          loginFlag: false,
        });
      }, 3000);
      dispatch(resetAuthResponseMessage(""))
    }
  }, [ResponseMessage]);

  const onClickSignIn = async (e) => {
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
      await dispatch(enterEmailValidation({ email, navigate, t }));
    }
  };

  const rememberChangeEmail = () => {
    setRemeberEmail(!rememberEmail);
    if (!rememberEmail === true) {
      localStorage.setItem("rememberEmail", true);
      localStorage.setItem("rememberEmailValue", email);
    } else {
      localStorage.setItem("rememberEmail", false);
      localStorage.setItem("rememberEmailValue", "");
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickSignIn(e);
    }
  };

  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className='my-4 d-flex justify-content-center'>
          <span className='sign-in-text'>{t("Sign-in")}</span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <TextField
            applyClass={"addOraganizer"}
            labelClass={"d-none"}
            // className={"inputEmailField"}
            name={"email"}
            placeholder={t("Email")}
            change={emailChangeHandler}
            value={email || ""}
            maxLength={250}
            onKeyPress={handleKeyPress}
          />
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={12} lg={12} className='d-flex gap-2'>
          <Checkbox
            classNameDiv=''
            checked={rememberEmail}
            onChange={rememberChangeEmail}
          />
          <span className='remember-email'>{t("Remember-email")}</span>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col
          lg={12}
          md={12}
          sm={12}
          className='d-flex justify-content-center w-100'>
          <Button
            text={t("Next")}
            onClick={onClickSignIn}
            className={"LoginButton"}
          />
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

export default LoginScreen;
