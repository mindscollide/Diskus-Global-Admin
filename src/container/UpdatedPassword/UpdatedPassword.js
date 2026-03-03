import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  Button,
  Paper,
  TextField,
} from "./../../components/elements";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import "./UpdatedPassword.css";
import { resetAuthResponseMessage } from "../../store/ActionsSlicers/AuthLoginSlicer";
import { showNotification } from "../../components/elements/snack_bar/snackbar";

const UpdatedPassword = ({ onClickGoBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const Responsemessage = useSelector(
    (state) => state.AuthActions.Responsemessage
  );



  useEffect(() => {
    if (
      Responsemessage &&
      Responsemessage !== t("No-data-available") &&
      Responsemessage !== "" &&
      Responsemessage !== t("Something-went-wrong") &&
      Responsemessage !== "No Data available"
    ) {
      // Determine type based on message (success/error)
      const type = Responsemessage === t("Password-updated-successfully") ? "success" : "error";
  
      // Show notification
      showNotification(type, Responsemessage);
  
      // Reset response message in Redux
      dispatch(resetAuthResponseMessage());
    }
  }, [Responsemessage, dispatch, t]);

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

   
    </>
  );
};

export default UpdatedPassword;
