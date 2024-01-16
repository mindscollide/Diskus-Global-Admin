import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TwoFaScreen.css";

const TwoFaScreen = ({ onClickGoBack }) => {
  return (
    <>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-start ms-5 mt-2"
        >
          <span className="two-fa-verification-heading">2FA verification</span>
        </Col>
      </Row>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-start ms-5 mb-4"
        >
          <span className="two-fa-verification-subheading">
            Select any one option
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12} className="d-block ms-5 gap-2">
          <label className="d-block radio-text">
            <input
              type="radio"
              name="twoFaOption"
              value="Send Notification on Device"
              className="radio-button-class"
            />
            Send Notification on Device
          </label>

          <label className="d-block radio-text mt-1">
            <input
              type="radio"
              name="twoFaOption"
              value="Send Notification on Email"
              className="radio-button-class"
            />
            Send Notification on Email
          </label>

          <label className="d-block radio-text mt-1">
            <input
              type="radio"
              name="twoFaOption"
              value="Send Notification on SMS"
              className="radio-button-class"
            />
            Send Notification on SMS
          </label>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <button className="SendCode-button-color">Send Code</button>
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

export default TwoFaScreen;
