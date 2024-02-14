import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./LoginScreen.css";
import { Button, TextField } from "../../components/elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enterEmailValidation } from "../../store/Actions/AuthActions";
import { useTranslation } from "react-i18next";
import { changeScreen } from "../../store/ActionsSlicers/AuthAction";

const LoginScreen = ({ onClickForgetPasswordText }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const screenName = useSelector((state) => state.Auth.screenName);

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

  const onClickSignIn = () => {
    let value = crendentials.Email;
    dispatch(enterEmailValidation({ value, navigate, t }));
    dispatch(changeScreen("PasswordVerification"));
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
          <span className="sign-in-text">{t("Sign-in")}</span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <TextField
            applyClass={"addOraganizer"}
            labelClass={"d-none"}
            name={"EmailAddress"}
            change={HandleChange}
            value={crendentials.Email}
            maxLength={250}
          />
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
            text={"Next"}
            onClick={onClickSignIn}
            className={"LoginButton"}
          />
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
