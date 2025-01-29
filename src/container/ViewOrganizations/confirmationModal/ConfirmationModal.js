import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "./../../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./ConfirmatioModal.module.css";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmatioModalFunc } from "../../../store/ActionsSlicers/ViewOrganizationActionSlicer";

const ConfirmationModal = ({ handleClose, handleProceedUpdate, status }) => {
  //For Localization
  const { t } = useTranslation();
  const navigate = useNavigate();
  const confirmatonModal = useSelector(
    (state) => state.searchOrganization.confirmationModal
  );
  console.log(confirmatonModal, "confirmatonModal");
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        show={confirmatonModal}
        onHide={() => dispatch(confirmatioModalFunc(false))}
        closeButton
        centered
        modalBodyClassName={styles["Modalsize"]}
        modalFooterClassName={styles["modal-confirmation-footer"]}
        modalHeaderClassName={styles["modal-header-class"]}
        size={"lg"}
        className={"confirmationModal"}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className='d-flex justify-content-center mt-4'>
                <span className={styles["confirmation-title"]}>
                  {status === "Reject"
                    ? t("Are-you-sure-you-want-to-reject-the-request")
                    : t("Are-you-sure-you-want-to-accept-the-request")}
                </span>
              </Col>
            </Row>
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
