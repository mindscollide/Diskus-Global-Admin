import React from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "../../../components/elements";
import img10 from "./../../../assets/images/DiskusLogo/10.png";
import img5 from "./../../../assets/images/DiskusLogo/5.png";

import "./VerificationPhone.css";

const VerificationPhone = ({ onClickGoBack }) => {
  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="phone-verification-heading">2FA verification</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="phone-verification-subheading">
            Select any device
          </span>
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="radio-column-verification-phone"
        >
          <div className="phone-radio-option">
            <img src={img10} width="15px" alt="" className="icon" />
            <label className="phone-radio-text">
              Samsung A23
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on Device"
                className="phone-radio-button-class"
              />
            </label>
          </div>

          <div className="phone-radio-option mt-2">
            <img src={img10} width="15px" alt="" className="icon mt-1" />
            <label className="phone-radio-text">
              Iphone 13 pro
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on Email"
                className="phone-radio-button-class-1"
              />
            </label>
          </div>

          <div className="phone-radio-option mt-2">
            <img src={img10} width="15px" alt="" className="icon mt-1" />

            <label className="phone-radio-text">
              Iphone 11 pro
              <Form.Check
                type="radio"
                name="twoFaOption"
                value="Send Notification on SMS"
                className="phone-radio-button-class-2"
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
          <Button className="phone-SendCode-button-color" text="Send Code" />
        </Col>
      </Row>

      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center mt-4"
        >
          <span className="phone-go-back-text" onClick={onClickGoBack}>
            Go back
          </span>
        </Col>
      </Row>
    </>
  );
};

export default VerificationPhone;
