import React from "react";
import { Col, Row } from "react-bootstrap";
import "./ForgotPassword.css";

const ForgotPassword = ({ onClickGoBack }) => {
  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center my-4"
        >
          <span className="forget-password-in-text">Forget Password</span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center">
          <input
            type={"text"}
            placeholder="Enter Your Password"
            className="textfield-forget-password-class"
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
          <button className="forget-button-color">Sign In</button>
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
            Go back
          </span>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
