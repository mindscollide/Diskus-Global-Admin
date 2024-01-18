import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import img10 from "./../../../assets/images/DiskusLogo/10.png";

import "./VerificationNotificationPhone.css";

const VerificationNotificationPhone = ({ onClickGoBack }) => {
  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="phone-notification-verification-heading">
            2FA verification
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="phone-notification-verification-subheading">
            A notification has been sent on your device
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12} className="radio-column">
          <div className="phone-notification-div">
            <img src={img10} width="40px" alt="" className="icon" />
          </div>
          <label className="phone-verification-subheading-two">
            Realme Xtra Zoom
          </label>

          <label className="number-notification-verification-subheading">
            367 673
          </label>

          <label className="timer-verification-subheading">00:30</label>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-3"
        >
          <Button
            className="phone-notification-SendCode-button-color"
            text="Send Code"
          />
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-2"
        >
          <span
            className="phone-notification-go-back-text"
            onClick={onClickGoBack}
          >
            Go back
          </span>
        </Col>
      </Row>
    </>
  );
};

export default VerificationNotificationPhone;
