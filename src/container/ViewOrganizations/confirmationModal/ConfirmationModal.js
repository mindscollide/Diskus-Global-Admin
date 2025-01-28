import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
} from "./../../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./ConfirmatioModal.module.css";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmationModal = ({
  handleClose,
  handleProceedUpdate
}) => {
  //For Localization
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const [openNotification, setOpenNotification] = useState({
    changePasswordFlag: false,
    changePasswordNotification: null,
    severity: "none",
  });






  return (
    <>
        <Modal
          show={ModalReducer.ConfirmationInfoModal}
          onHide={handleClose}
          closeButton
          centered
          modalBodyClassName={styles["Modalsize"]}
          modalFooterClassName={styles["modal-confirmation-footer"]}
          modalHeaderClassName={styles["modal-header-class"]}
          size={"lg"}
          className={"confirmationModal"}
          ModalBody={
            <>
              <Container>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-center mt-4"
                  >
                    <span className={styles["confirmation-title"]}>
                      {t("Are-you-sure-you-want-to-update-the-changes")}
                    </span>
                  </Col>
                </Row>
              </Container>
            </>
          }
          ModalFooter={
            <>
              <Row>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Cancel")}
                    onClick={handleClose}
                    className={styles["reset-User-btn"]}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Proceed")}
                    onClick={handleProceedUpdate}
                    className={styles["save-User-btn"]}
                  />
                </Col>
              </Row>
            </>
          }
        />
    
    </>
  );
};

export default ConfirmationModal;
