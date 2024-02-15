import React, { useRef, useState } from "react";
import styles from "./PasswordVerification.module.css";
import { useTranslation } from "react-i18next";
import { Col, Form, Row } from "react-bootstrap";
import { Button, Checkbox, TextField } from "../../components/elements";
import PasswordEyeIcon from "../../assets/images/OutletImages/password.svg";
import PasswordHideEyeIcon from "../../assets/images/OutletImages/password_hide.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PasswordVerificationApi } from "../../store/Actions/AuthActions";

const PasswordVerification = () => {
  const { t } = useTranslation();

  const passwordRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //States
  const [showNewPasswordIcon, setShowNewPasswordIcon] = useState(false);
  const [password, setPassword] = useState("");
  const [remeberPassword, SetRememberPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorBar, setErrorBar] = useState(false);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  //Functions
  const showNewPassowrd = () => {
    setShowNewPasswordIcon(!showNewPasswordIcon);
  };

  //Encryption Of Password
  const encryptPassword = (password) => {
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      encryptedPassword += String.fromCharCode(charCode + 1);
    }
    return encryptedPassword;
  };

  //Decryption Of Password
  const decryptPassword = (encryptedPassword) => {
    let password = "";
    for (let i = 0; i < encryptedPassword.length; i++) {
      const charCode = encryptedPassword.charCodeAt(i);
      password += String.fromCharCode(charCode - 1);
    }
    return password;
  };

  //onChange For Password
  const passwordChangeHandler = (e) => {
    setErrorBar(false);
    let value = e.target.value;
    var valueCheck = value.replace(/\s+/g, "");
    if (valueCheck === "") {
      setPassword("");
      setErrorBar(true);
    } else if (valueCheck !== "") {
      if (remeberPassword === true) {
        setPassword(value);
        let newPassword = encryptPassword(value);
        localStorage.setItem("rememberPasswordValue", newPassword);
      } else {
        setPassword(value);
        setErrorBar(false);
      }
    } else if (value === "") {
      setErrorBar(false);
    }
  };

  //Remember Password
  const rememberPasswordCheck = () => {
    SetRememberPassword(!remeberPassword);
    if (!remeberPassword === true) {
      localStorage.setItem("remeberPassword", true);
      let newPassword = encryptPassword(password);
      localStorage.setItem("rememberPasswordValue", newPassword);
    } else {
      localStorage.setItem("remeberPassword", false);
      localStorage.setItem("rememberPasswordValue", "");
    }
  };
  console.log(password, "password");

  //Form Submission Login Handler
  const loginHandler = (e) => {
    e.preventDefault();
    if (password === "") {
      setOpen({
        ...open,
        open: true,
        message: "Enter Password",
      });
    } else {
      setErrorBar(false);
      dispatch(PasswordVerificationApi({ password, navigate, t }));
    }
  };

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
      <Form onSubmit={loginHandler}>
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="Enter-password-field position-relative d-flex justify-content-center"
          >
            <Form.Control
              className={styles["PasswordTextField"]}
              type={showNewPasswordIcon ? "text" : "password"}
              name="MyUniquePasswordField"
              ref={passwordRef}
              value={password || ""}
              onChange={passwordChangeHandler}
              placeholder={t("Password")}
              iconClassName={styles["IconStyle"]}
              labelClass="lightLabel"
              autoComplete="off"
              maxLength={200}
            />
            <span className={styles["passwordIcon"]} onClick={showNewPassowrd}>
              {showNewPasswordIcon ? (
                <img draggable="false" alt="" src={PasswordHideEyeIcon} />
              ) : (
                <img draggable="false" alt="" src={PasswordEyeIcon} />
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <p
              className={
                errorBar
                  ? ` ${styles["errorMessage-inLogin"]} `
                  : `${styles["errorMessage-inLogin_hidden"]}`
              }
            >
              {errorMessage}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={12} className="d-flex gap-2">
            <Checkbox
              classNameDiv=""
              checked={remeberPassword}
              onChange={rememberPasswordCheck}
            />
            <span className={styles["Remember-password"]}>
              {t("Remember-password")}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center w-100"
          >
            <Button
              text={"SignIn"}
              className={styles["LoginButton"]}
              onClick={loginHandler}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PasswordVerification;
