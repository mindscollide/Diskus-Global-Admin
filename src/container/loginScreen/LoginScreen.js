import React from "react";
import { Col, Row } from "react-bootstrap";
import "./LoginScreen.css";

const LoginScreen = ({ onClickForgetPasswordText, onClickSignIn }) => {
  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="my-4 d-flex justify-content-center"
        >
          <span className="sign-in-text">Sign In</span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center">
          <input
            type={"text"}
            placeholder="Enter Your Email"
            className="textfield-signIn-class"
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
          <button className="button-color" onClick={onClickSignIn}>
            Next
          </button>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <span
            className="forget-paswword-text"
            onClick={onClickForgetPasswordText}
          >
            Forget Password
          </span>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
