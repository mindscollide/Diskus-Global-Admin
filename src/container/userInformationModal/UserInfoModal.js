import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, TextField } from "./../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./UserInfoModal.module.css";
import Form from "react-bootstrap/Form";
// import { countryName } from "../../AllUsers/AddUser/CountryJson";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useDispatch, useSelector } from "react-redux";
import CrossIcon from "../../assets/images/OutletImages/Cross-Chat-Icon.png";

import {
  userConifrmationOpenModal,
  userInfoConfirmationModal,
  userInfoOpenModal,
} from "../../store/ActionsSlicers/UIModalsActions";

const UserProfileModal = () => {
  //For Localization
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ModalReducer = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(userInfoOpenModal(false));
  };

  const openConfirmationModal = () => {
    dispatch(userInfoOpenModal(false));
    dispatch(userConifrmationOpenModal(true));
  };

  return (
    <>
      <Container>
        <Modal
          show={ModalReducer.userInfoModal}
          onHide={handleClose}
          closeButton
          //   ButtonTitle={ModalTitle}
          modalBodyClassName={styles["Modalsize"]}
          centered
          modalFooterClassName={styles["modal-userprofile-footer"]}
          modalHeaderClassName={styles["modal-header-class"]}
          size={"lg"}
          className={"userProfileModal"}
          ModalBody={
            <>
              <Container>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-end"
                  >
                    <img
                      height="10px"
                      width="10px"
                      src={CrossIcon}
                      className={styles["Cross-X"]}
                      onClick={handleClose}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className={styles["User-info-heading"]}>
                      {t("User-Information")}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Organization-name")}
                    </label>
                    <label className={styles["main-user-name"]}>
                      Quantum Dynamics Consortium
                    </label>
                  </Col>
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Email")}
                    </label>
                    <label className={styles["main-user-name"]}>
                      Quantum Dynamics Consortium
                    </label>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Country-code")}
                      <span className={styles["aesterick-class"]}> *</span>
                    </label>
                    <ReactFlagsSelect
                      fullWidth={false}
                      searchable={true}
                      placeholder={"Select Co...."}
                      className={styles["userProfileFlagSelect"]}
                    />
                  </Col>

                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["reactflag-label"]}>
                      {t("Number")}
                      <span className={styles["aesterick-class"]}> *</span>
                    </label>
                    <TextField
                      labelClass="d-none"
                      className={"react-flag-field"}
                    />
                  </Col>
                </Row>
              </Container>
            </>
          }
          ModalFooter={
            <>
              <Row className="mb-4 mt-2">
                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Revert")}
                    className={styles["reset-User-btn"]}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Update")}
                    className={styles["save-User-btn"]}
                    onClick={openConfirmationModal}
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

export default UserProfileModal;
