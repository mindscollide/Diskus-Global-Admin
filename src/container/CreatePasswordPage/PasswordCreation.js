import React, { useEffect, useRef, useState } from "react";
// import styles from "./PasswordCreation.module.css";
import "./PasswordCreation.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Button, Paper, Loader, Notification } from "../../components/elements";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
// import DiskusLogo from "../../../../assets/images/newElements/Diskus_newLogo.svg";
import { useSelector } from "react-redux";
import PasswordEyeIcon from "../../assets/images/OutletImages/password.svg";
import PasswordChecklist from "react-password-checklist";
import PasswordHideEyeIcon from "../../assets/images/OutletImages/password_hide.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordCreationMainApi } from "../../store/Actions/AuthActions";
import { resetAuthResponseMessage } from "../../store/ActionsSlicers/AuthLoginSlicer";
// import CreateAddtionalUsersModal from "../ModalsUserManagement/CreateAdditionalusersModal/CreateAddtionalUsersModal";
// import Cookies from "js-cookie";
// import {
//   createPasswordAction,
//   updatePasswordAction,
// } from "../../../../store/actions/Auth2_actions";
// import { LoginFlowRoutes } from "../../../../store/actions/UserManagementActions";

const PasswordCreation = ({ onClickGoBack }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const passwordRef = useRef();

  const Responsemessage = useSelector(
    (state) => state.AuthActions.Responsemessage
  );
  console.log(Responsemessage, "ResponsemessageResponsemessage");

  const [openNotification, setOpenNotification] = useState({
    Flag: false,
    Notification: null,
    severity: "none",
  });

  const { UserManagementModals } = useSelector((state) => state);

  const [errorBar, setErrorBar] = useState(false);
  const [remeberPassword, SetRememberPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordStrong, setPasswordStrong] = useState(false);
  const { Authreducer, LanguageReducer } = useSelector((state) => state);
  const [showNewPasswordIcon, setShowNewPasswordIcon] = useState(false);
  const [showConfirmPasswordIcon, setConfirmShowPasswordIcon] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    Password: "",
    ConfirmPassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  console.log(passwordDetails, "passwordDetailspasswordDetails");

  //Showing Password
  const showNewPassowrd = () => {
    setShowNewPasswordIcon(!showNewPasswordIcon);
  };

  //Hiding Password
  const showConfirmPassowrd = () => {
    setConfirmShowPasswordIcon(!showConfirmPasswordIcon);
  };

  // Languages
  const languages = [
    { name: "English", code: "en" },
    { name: "Français", code: "fr" },
    { name: "العربية", code: "ar", dir: "rtl" },
  ];

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
        severity: t("The-user's-email-has-been-verified") ? "success" : "error",
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

  //Encryption Password
  const encryptPassword = (password) => {
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
      const charCode = password.charCodeAt(i);
      encryptedPassword += String.fromCharCode(charCode + 1);
    }
    return encryptedPassword;
  };

  //OnChange Password handler
  const passwordChangeHandler = (e) => {
    setErrorBar(false);
    let value = e.target.value;
    let name = e.target.name;
    var valueCheck = value.replace(/\s+/g, "");
    if (valueCheck === "") {
      console.log("packageDetailpackageDetailpackageDetailpackageDetail");
      setPassword("");
      setPasswordDetails({
        ...passwordDetails,
        [name]: "",
      });
      setErrorBar(true);
    } else if (valueCheck !== "") {
      console.log("packageDetailpackageDetailpackageDetailpackageDetail");

      if (remeberPassword === true) {
        setPasswordDetails({
          ...passwordDetails,
          [name]: value,
        });
        // setPassword(value);
        let newPassword = encryptPassword(value);
        localStorage.setItem("rememberPasswordValue", newPassword);
      } else {
        setPasswordDetails({
          ...passwordDetails,
          [name]: value,
        });
        // setPassword(value);
        setErrorBar(false);
      }
    } else if (value === "") {
      console.log("packageDetailpackageDetailpackageDetailpackageDetail");

      setErrorBar(false);
    }
  };

  //Handler Password Verification
  const verifyHandlePassword = (e) => {
    e.preventDefault();
    if (
      passwordDetails.Password === "" &&
      passwordDetails.ConfirmPassword === "" &&
      passwordDetails.Password.length >= 8 &&
      passwordDetails.ConfirmPassword.length >= 8
    ) {
      setErrorBar(false);
      setOpen({
        ...open,
        open: true,
        message: "Please Enter Fields Value",
      });
    } else if (passwordDetails.Password !== passwordDetails.ConfirmPassword) {
      setErrorBar(true);
    } else {
      setErrorBar(false);
      // navigate("/")
      let UserID = localStorage.getItem("userID");
      let data = {
        UserID: JSON.parse(UserID),
        NewPassword: passwordDetails.Password,
      };
      dispatch(passwordCreationMainApi({ data, navigate, t }));
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center align-items-center mx-auto "
          >
            <Col sm={12} lg={12} md={12} className={"EmailVerifyBox"}>
              <Row className="mt-4 mb-3">
                <Col className="">
                  <span className={"signIn_heading"}>
                    {t("Create-password")}
                  </span>
                </Col>
              </Row>
              <Form onSubmit={verifyHandlePassword}>
                <Row className="mb-3">
                  <Col
                    lg={12}
                    md={12}
                    xs={12}
                    className="create-field-password position-relative d-flex justify-content-center"
                  >
                    <Form.Control
                      className={"PasswordTextField"}
                      type={showNewPasswordIcon ? "text" : "password"}
                      name="Password"
                      ref={passwordRef}
                      value={passwordDetails.Password || ""}
                      onChange={passwordChangeHandler}
                      placeholder={t("New-password")}
                      autoComplete="false"
                      iconClassName={"IconStyle"}
                    />
                    <span className={"passwordIcon"} onClick={showNewPassowrd}>
                      {showNewPasswordIcon ? (
                        <img
                          draggable="false"
                          src={PasswordHideEyeIcon}
                          alt=""
                        />
                      ) : (
                        <img draggable="false" src={PasswordEyeIcon} alt="" />
                      )}
                    </span>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col
                    lg={12}
                    md={12}
                    xs={12}
                    className="create-field-password position-relative d-flex  justify-content-center "
                  >
                    <Form.Control
                      className={"PasswordTextField"}
                      type={showConfirmPasswordIcon ? "text" : "password"}
                      name="ConfirmPassword"
                      value={passwordDetails.ConfirmPassword || ""}
                      onChange={passwordChangeHandler}
                      placeholder={t("Re-enter-password")}
                      iconClassName={"IconStyle"}
                    />
                    <span
                      className={"passwordIcon"}
                      onClick={showConfirmPassowrd}
                    >
                      {showConfirmPasswordIcon ? (
                        <img
                          draggable="false"
                          src={PasswordHideEyeIcon}
                          alt=""
                        />
                      ) : (
                        <img draggable="false" src={PasswordEyeIcon} alt="" />
                      )}
                    </span>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className={"PasswordCheckListstyle"}
                  >
                    <p className={"paragraph_password_must_have"}>
                      {t("Password-must-have")}
                    </p>
                    <PasswordChecklist
                      rules={["minLength", "specialChar", "letter", "match"]}
                      minLength={8}
                      className={"passwordTextHandler"}
                      value={passwordDetails.Password}
                      valueAgain={passwordDetails.ConfirmPassword}
                      onChange={(isValid) => {
                        setPasswordStrong(isValid);
                      }}
                      iconSize={"14px"}
                      messages={{
                        minLength: t("Password-has-atleast-8-characters"),
                        specialChar: t("Password-has-special-characters"),
                        letter: t("Password-has-a-letter"),
                        match: t("Passwords-match"),
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm={12}
                    lg={12}
                    md={12}
                    className="d-flex justify-content-center"
                  >
                    <Button
                      type="submit"
                      onClick={verifyHandlePassword}
                      text={t("Confirm")}
                      disableBtn={
                        passwordDetails.Password === ""
                          ? true
                          : passwordDetails.ConfirmPassword === ""
                          ? true
                          : !isPasswordStrong
                          ? true
                          : false
                      }
                      className={"subscribNow_button_EmailVerify"}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={12} md={12} lg={12} className={"forogt_email_link"}>
                    <span onClick={onClickGoBack} className={"ForgotPassword"}>
                      {t("Go-back")}
                    </span>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>

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

export default PasswordCreation;
