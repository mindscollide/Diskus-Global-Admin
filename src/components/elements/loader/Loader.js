import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Loader.module.css";
import DikusGIF from "../../../assets/images/DiskusLogo/Loader.gif";

const Loader = () => {
  return (
    <Container className={styles["main-container"]} data-tut="welcomescreen">
      <Row className={styles["overlay-box"]}>
        <Col className={styles["overlay"]}></Col>
        <Col className={styles["overlay-content"]}>
          <img
            src={DikusGIF}
            className={styles["LoadderImageclass"]}
            alt="My GIF Icon"
            draggable="false"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
