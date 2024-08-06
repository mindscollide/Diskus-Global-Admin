import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import {
  Button,
  Notification,
  VerificationInputField,
} from "../../components/elements";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./VerificationCode.css";
import {
  otpVerifyMainApi,
  resendEmailMainApi,
  resendOTPMainApi,
} from "../../store/Actions/AuthActions";
import { resetAuthResponseMessage } from "../../store/ActionsSlicers/AuthLoginSlicer";

const VerificationCode = ({ onClickGoBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Responsemessage = useSelector(
    (state) => state.AuthActions.Responsemessage
  );
  console.log(Responsemessage, "ResponsemessageResponsemessage");

  const [openNotification, setOpenNotification] = useState({
    Flag: false,
    Notification: null,
    severity: "none",
  });

  const [key, setKey] = useState(1);
  const [verifyOTP, setVerifyOTP] = useState("");
  const [errorBar, setErrorBar] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  let userID = localStorage.getItem("userID");
  let email = localStorage.getItem("rememberEmailValue");

  const [minutes, setMinutes] = useState(
    localStorage.getItem("minutes") ? localStorage.getItem("minutes") : 4
  );
  const [seconds, setSeconds] = useState(
    localStorage.getItem("seconds") ? localStorage.getItem("seconds") : 60
  );

  // for response message useEffect
  useEffect(() => {
    if (
      Responsemessage !== "" &&
      Responsemessage !== t("No-data-available") &&
      Responsemessage !== "Success" &&
      Responsemessage !== t("Something-went-wrong") &&
      Responsemessage !== "No Data available"
    ) {
      setOpenNotification({
        Flag: true,
        Notification: Responsemessage,
        severity: t("OTP-has-been-sent-to-your-email") ? "success" : "error",
      });

      setTimeout(() => {
        dispatch(resetAuthResponseMessage());
        setOpenNotification({
          ...openNotification,
          Flag: false,
          Notification: "",
          severity: "none",
        });
      }, 4000);
    }
  }, [Responsemessage]);

  useEffect(() => {
    // if value was cleared, set key to re-render the element
    if (verifyOTP.length === 0) {
      setKey(key + 1);
      return;
    }
  }, [verifyOTP]);

  const verifyOTPClickHandler = (e) => {
    e.preventDefault();

    if (verifyOTP.length !== 6) {
      setVerifyOTP("");
      setErrorBar(true);
      setErrorMessage("OTP should be a 6 digit code");
    } else {
      setErrorBar(false);
      setErrorMessage("");
      setVerifyOTP("");
      setVerifyOTP("");
      let data = {
        UserID: JSON.parse(userID),
        Email: email,
        OTP: verifyOTP,
      };

      dispatch(otpVerifyMainApi({ data, navigate, t }));
    }
  };

  const sendRequestResend = () => {
    let nEmail = localStorage.getItem("rememberEmailValue");
    let data = {
      Email: nEmail,
    };

    localStorage.removeItem("seconds");
    localStorage.removeItem("minutes");
    dispatch(resendOTPMainApi({ data, setSeconds, setMinutes, navigate, t }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        localStorage.setItem("seconds", seconds - 1);
        localStorage.setItem("minutes", minutes);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          localStorage.removeItem("seconds");
          localStorage.removeItem("minutes");
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
          localStorage.setItem("seconds", 59);
          localStorage.setItem("minutes", minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    let s = localStorage.getItem("seconds");
    let m = localStorage.getItem("minutes");
    window.addEventListener("beforeunload ", (e) => {
      e.preventDefault();
      if (m !== undefined && s !== undefined) {
        if (s === 1) {
          setSeconds(59);
          setMinutes(m - 1);
        } else {
          setSeconds(s - 1);
          setMinutes(minutes);
        }
      } else {
        setSeconds(59);
        setMinutes(4);
      }
    });
  }, []);

  const changeHandler = (e) => {
    let otpval = e.toUpperCase();
    setVerifyOTP(otpval);
  };

  return (
    <>
      <Row className="mt-5">
        <Col lg={12} md={12} sm={12}>
          <>
            <span className="verification-subheading">
              {t("Enter-verification-code")}
            </span>
          </>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={12} lg={12}>
          <VerificationInputField
            fields={6}
            applyClass="OTPInput"
            change={changeHandler}
            key={key}
            value={verifyOTP}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          {/* <span>{t("Resend-code")}</span> */}
          <Button
            className="resendCode_btn"
            disableBtn={seconds > 0 || minutes > 0}
            text={t("Resend-code")}
            onClick={sendRequestResend}
          />
          <span className={"OTPCounter"}>
            0{minutes}: {seconds < 10 ? "0" + seconds : seconds}
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            className={
              errorBar
                ? ` ${"errorMessage-OTP"} `
                : `${"errorMessage-OTP_hidden"}`
            }
          >
            {errorMessage}
          </p>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <Button
            className="SendCode-button-color"
            text={t("Verify")}
            onClick={verifyOTPClickHandler}
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
          <span className="go-back-text" onClick={onClickGoBack}>
            {t("Go-back")}
          </span>
        </Col>
      </Row>

      <Notification
        show={openNotification.Flag}
        hide={setOpenNotification}
        message={openNotification.Notification}
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

export default VerificationCode;
