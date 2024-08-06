import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  Button,
  Paper,
  TextField,
  Notification,
} from "./../../components/elements";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import "./UpdatedPassword.css";
import { resetAuthResponseMessage } from "../../store/ActionsSlicers/AuthLoginSlicer";

const UpdatedPassword = ({ onClickGoBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const Responsemessage = useSelector(
    (state) => state.AuthActions.Responsemessage
  );

  const [openNotification, setOpenNotification] = useState({
    Flag: false,
    Notification: null,
    severity: "none",
  });

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
        severity: t("Password-updated-successfully") ? "success" : "error",
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

  return (
    <>
      <Form>
        <Row className="mt-5">
          <Col
            sm={12}
            md={12}
            lg={12}
            className="d-flex justify-content-center"
          >
            <span className={"Update_Password_Heading"}>
              {t("Your-password")}
            </span>
          </Col>
        </Row>
        <Row className={"update_password_second_heading"}>
          <Col
            sm={12}
            md={12}
            lg={12}
            className="d-flex justify-content-center"
          >
            <span className={"Update_Password_Heading"}>
              {t("Has-been-updated")}
            </span>
          </Col>
        </Row>

        {/* for button */}
        <Row className="mt-5 d-flex justify-content-center">
          <Col
            sm={12}
            lg={12}
            md={12}
            className="d-flex justify-content-center mt-1 "
          >
            <Button
              text={t("Back-to-sign-in")}
              className={"Update_Password_successfull_Next_button_EmailVerify"}
              onClick={onClickGoBack}
            />
          </Col>
        </Row>
      </Form>

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

export default UpdatedPassword;
