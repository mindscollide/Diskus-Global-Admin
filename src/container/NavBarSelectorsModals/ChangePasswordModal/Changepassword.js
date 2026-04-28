import React, { useState, useEffect } from "react";
import styles from "./ChangePassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal, TextField } from "../../../components/elements";
import { ChangePasswordModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import PasswordEyeIcon from "../../../assets/images/OutletImages/password.svg";
import PasswordHideEyeIcon from "../../../assets/images/OutletImages/password_hide.svg";
import { Col, Container, Row } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";
import {
  globalAdminDashBoardLoader,
  resetResponseMessage,
} from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { ChangePasswordApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../../components/elements/snack_bar/snackbar";
// ✅ Add this helper at top
const generateName = () =>
  `field_${Math.random().toString(36).substring(2, 10)}`;
const Changepassword = () => {
  const ModalReducer = useSelector((state) => state.modal);
  const Responsemessage = useSelector(
    (state) => state.globalAdminDashboardReducer.Responsemessage
  );

  console.log(Responsemessage, "ResponsemessageResponsemessage");

  let userID = localStorage.getItem("userID");
  let Email = localStorage.getItem("userEmail");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [isPasswordStrong, setPasswordStrong] = useState(false);
  const [Password, setPassword] = useState({
    newPassword: "",
    ConfirmPassword: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleNewPasswordChange = (e, field) => {
    let value = e.target.value;
    setPassword((prev) => ({
      ...prev,
      [field]: value.trimStart(),
    }));
  };

  const handleClose = () => {
    dispatch(ChangePasswordModalOpen(false));
    setPassword({
      ...Password,
      newPassword: "",
      ConfirmPassword: "",
    });
    setOldPassword("");
  };

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = () => {
    setShownewPassword(!shownewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const oldpasswordChangeHandler = (e) => {
    setOldPassword(e.target.value.trimStart());
  };

  const hadneResetButton = () => {
    setPassword({
      newPassword: "",
      ConfirmPassword: "",
    });
    setOldPassword("");
  };

  const handleChangePassword = () => {
    if (!oldPassword || !Password.newPassword || !Password.ConfirmPassword) {
      showNotification("error", t("Please-enter-required-fields"));
      return;
    }

    if (Password.newPassword !== Password.ConfirmPassword) {
      showNotification("error", t("Passwords-do-not-match"));
      return;
    }

    if (!isPasswordStrong) {
      showNotification("error", t("Password-is-not-strong-enough"));
      return;
    }

    let data = {
      UserID: Number(userID),
      OldPassword: oldPassword,
      NewPassword: Password.newPassword,
      DeviceID: "1",
    };

    dispatch(globalAdminDashBoardLoader(true));
    dispatch(
      ChangePasswordApi({ data, navigate, t, setPassword, setOldPassword })
    );
  };

  useEffect(() => {
    if (!Responsemessage) return;

    const ignoredMessages = ["", t("No-data-available"), "No Data available"];

    if (ignoredMessages.includes(Responsemessage)) return;

    const isSuccess =
      Responsemessage === "" || Responsemessage === t("Updated-Successfully");

    showNotification(isSuccess ? "success" : "error", Responsemessage);

    dispatch(resetResponseMessage());
  }, [Responsemessage]);

  return (
    <>
      <Modal
        show={ModalReducer.ChangepasswordModal}
        onHide={handleClose}
        closeButton={true}
        modalHeaderClassName={styles["modalHeader-className"]}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalBodyClassName={styles["modalChangeBody-class-Name"]}
        className='changePassword'
        centered
        size={"lg"}
        ModalBody={
          <>
            <Container>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["ChangePasswordHeading"]}>
                    {t("Change-password")}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <Row className='mt-3'>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className='d-flex flex-column flex-wrap'>
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("Old-password")}
                        <span className={styles["aesterick-color"]}> *</span>
                      </span>
                      {/* <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        placeholder={t("Old-password")}
                        value={oldPassword || ""}
                        type={showOldPassword ? "text" : "password"}
                        change={oldpasswordChangeHandler}
                        autoComplete="current-password"

                        iconClassName='eye_icon'

                        inputicon={
                          showOldPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowOldPassword}
                      /> */}
                      <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        placeholder={t("Old-password")}
                        value={oldPassword || ""}
                        type={showOldPassword ? "text" : "password"}
                        change={oldpasswordChangeHandler}
                        autoComplete='new-password'
                        name={generateName()} // ✅ random name
                        readOnly // ✅ prevent autofill
                        onFocus={(e) => e.target.removeAttribute("readonly")} // ✅ enable typing
                        iconClassName='eye_icon'
                        inputicon={
                          showOldPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowOldPassword}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-1'>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className='d-flex flex-column flex-wrap mt-2'>
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("New-password")}
                        <span className={styles["aesterick-color"]}> *</span>
                      </span>
                      {/* <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        type={shownewPassword ? "text" : "password"}
                        placeholder={t("New-password")}
                        name='newPassword'
                        value={Password.newPassword || ""}
                        change={handleNewPasswordChange}
                        iconClassName='eye_icon_newPassowrd'
                        autoComplete='new-password'
                        inputicon={
                          shownewPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowNewPassword}
                      /> */}
                      <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        type={shownewPassword ? "text" : "password"}
                        placeholder={t("New-password")}
                        name={generateName()} // ❌ remove "newPassword"
                        value={Password.newPassword || ""}
                        change={(e) => handleNewPasswordChange(e, "newPassword")}
                        iconClassName='eye_icon_newPassowrd'
                        autoComplete='new-password'
                        readOnly
                        onFocus={(e) => e.target.removeAttribute("readonly")}
                        inputicon={
                          shownewPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowNewPassword}
                      />
                    </Col>
                  </Row>
                  <Row className='mt-1'>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className='d-flex flex-column flex-wrap mt-2'>
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("Confirm-password")}
                        <span className={styles["aesterick-color"]}> *</span>
                      </span>
                      {/* <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        type={showconfirmPassword ? "text" : "password"}
                        placeholder={t("Confirm-password")}
                        name='ConfirmPassword'
                        value={Password.ConfirmPassword || ""}
                        autoComplete='new-password'
                        change={handleNewPasswordChange}
                        iconClassName='eye_icon_ConfirmPassword'
                        inputicon={
                          showconfirmPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowConfirmPassword}
                      /> */}
                      <TextField
                        applyClass={"addOraganizer"}
                        labelClass={"d-none"}
                        type={showconfirmPassword ? "text" : "password"}
                        placeholder={t("Confirm-password")}
                        value={Password.ConfirmPassword || ""}
                        autoComplete='new-password'
                        readOnly
                        onFocus={(e) => e.target.removeAttribute("readonly")}
                        change={(e) => handleNewPasswordChange(e, "ConfirmPassword")}
                        name={generateName()} // ✅ random
                        iconClassName='eye_icon_ConfirmPassword'
                        inputicon={
                          showconfirmPassword ? (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordHideEyeIcon}
                            />
                          ) : (
                            <img
                              draggable='false'
                              alt=''
                              src={PasswordEyeIcon}
                            />
                          )
                        }
                        clickIcon={handleShowConfirmPassword}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className={styles["passwordCheckBox"]}>
                  <Row className='mt-3'>
                    <Col lg={12} md={12} sm={12}>
                      <p className={styles["HeadingForPassword"]}>
                        {t("Password-must-be")}
                      </p>
                      <PasswordChecklist
                        rules={["minLength", "specialChar", "letter", "match"]}
                        messages={{
                          minLength: t("Password-has-atleast-8-characters"),
                          specialChar: t("Password-has-special-characters"),
                          letter: t("Password-has-a-letter"),
                          match: t("Passwords-match"),
                        }}
                        minLength={8}
                        className={"borderRadius-4"}
                        // className={styles["passwordTextHandler"]}
                        value={Password.newPassword}
                        valueAgain={Password.ConfirmPassword}
                        onChange={(isValid) => {
                          console.log(
                            isValid,
                            "isValid",
                            setPasswordStrong(isValid)
                          );
                        }}
                        invalidColor='#ff0000'
                        validColor='#6172D6'
                        iconSize={"11px"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </>
        }
        ModalFooter={
          <>
            <Container>
              <Row className='mt-5'>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className='d-flex justify-content-start'>
                  <Button
                    text={t("Reset")}
                    className={styles["RevertBtnStyles"]}
                    onClick={hadneResetButton}
                  />
                </Col>

                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className='d-flex justify-content-end'>
                  <Button
                    disableBtn={
                      oldPassword === ""
                        ? true
                        : Password.newPassword === ""
                        ? true
                        : Password.ConfirmPassword === ""
                        ? true
                        : !isPasswordStrong
                        ? true
                        : false
                    }
                    text={t("Update")}
                    className={styles["UpdateBtnStyles"]}
                    onClick={handleChangePassword}
                  />
                </Col>
              </Row>
            </Container>
          </>
        }
      />
    </>
  );
};

export default Changepassword;
