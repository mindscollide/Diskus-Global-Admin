import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, TextField } from "./../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./UserConfirmationModal.module.css";
import Form from "react-bootstrap/Form";
// import { countryName } from "../../AllUsers/AddUser/CountryJson";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useDispatch, useSelector } from "react-redux";
import { userConifrmationOpenModal } from "../../store/ActionsSlicers/UIModalsActions";

const UserConfirmationModal = () => {
  //For Localization
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ModalReducer = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(userConifrmationOpenModal(false));
  };

  return (
    <>
      <Container>
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
                    className={styles["reset-User-btn"]}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Proceed")}
                    className={styles["save-User-btn"]}
                  />
                </Col>
              </Row>
            </>
          }
        />
      </Container>
    </>
  );
};

export default UserConfirmationModal;
