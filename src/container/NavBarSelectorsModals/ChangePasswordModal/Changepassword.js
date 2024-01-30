import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal, TextField } from "../../../components/elements";
import { ChangePasswordModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
import PasswordChecklist from "react-password-checklist";

const Changepassword = () => {
  const ModalReducer = useSelector((state) => state.modal);
  const [isPasswordStrong, setPasswordStrong] = useState(false);
  const [modalFlag, setmMdalFlag] = useState(false);
  const [Password, setPassword] = useState({
    newPassword: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(ChangePasswordModalOpen(false));
  };
  const handleNewPasswordChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPassword({
      ...Password,
      [name]: value.trimStart(),
    });
  };

  return (
    <>
      <Modal
        show={ModalReducer.ChangepasswordModal}
        onHide={handleClose}
        closeButton={false}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalBody={
          <>
            <section className=" p-1">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["ChangePasswordHeading"]}>
                    {t("Change-password")}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <Row className="mt-1">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex flex-column flex-wrap"
                    >
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("Old-password")}
                      </span>
                      <TextField labelClass={"d-none"} />
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex flex-column flex-wrap"
                    >
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("New-password")}
                      </span>
                      <TextField
                        labelClass={"d-none"}
                        value={Password.newPassword}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex flex-column flex-wrap"
                    >
                      <span className={styles["SubHeadingsPassword"]}>
                        {t("Confirm-password")}
                      </span>
                      <TextField
                        labelClass={"d-none"}
                        value={Password.ConfirmPassword}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className={styles["passwordCheckBox"]}
                >
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <PasswordChecklist
                        rules={["minLength", "specialChar", "letter", "match"]}
                        messages={{
                          minLength: t("Password-has-atleast-8-characters"),
                          specialChar: t("Password-has-special-characters"),
                          letter: t("Password-has-a-letter"),
                          match: t("Passwords-match"),
                        }}
                        minLength={8}
                        value={Password.newPassword}
                        valueAgain={Password.ConfirmPassword}
                        onChange={(isValid) => {
                          console.log(
                            isValid,
                            "isValid",
                            setPasswordStrong(isValid)
                          );
                        }}
                        className={"borderRadius-4"}
                        invalidColor="#ff0000"
                        validColor="#6172D6"
                        iconSize={"11px"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
          </>
        }
        ModalFooter={
          <>
            <section className="p-1">
              <Row className="mt-5">
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex justify-content-start"
                >
                  <Button
                    text={t("Reset")}
                    className={styles["RevertBtnStyles"]}
                  />
                </Col>

                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex justify-content-end"
                >
                  <Button
                    text={t("Update")}
                    className={styles["UpdateBtnStyles"]}
                  />
                </Col>
              </Row>
            </section>
          </>
        }
      />
    </>
  );
};

export default Changepassword;
