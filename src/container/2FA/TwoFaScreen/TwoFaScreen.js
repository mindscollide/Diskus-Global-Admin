import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import img10 from "./../../../assets/images/DiskusLogo/10.png";
import img5 from "./../../../assets/images/DiskusLogo/5.png";

import "./TwoFaScreen.css";

const TwoFaScreen = ({ onClickGoBack }) => {
  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="two-fa-verification-heading">2FA verification</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="two-fa-verification-subheading">
            Select any one option
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12} className="radio-column-2fa">
          <div className="radio-option">
            <img src={img10} width="15px" alt="" className="icon" />
            <label className="radio-text">
              Send Notification on Device
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on Device"
                className="radio-button-class"
              />
            </label>
          </div>

          <div className="radio-option mt-2">
            <img src={img5} width="15px" alt="" className="icon mt-1" />
            <label className="radio-text">
              Send Notification on Email
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on Email"
                className="radio-button-class-1"
              />
            </label>
          </div>

          <div className="radio-option mt-2">
            <img src={img5} width="15px" alt="" className="icon mt-1" />

            <label className="radio-text">
              Send Notification on SMS
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on SMS"
                className="radio-button-class-2"
              />
            </label>
          </div>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <Button className="SendCode-button-color" text="Send Code" />
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
