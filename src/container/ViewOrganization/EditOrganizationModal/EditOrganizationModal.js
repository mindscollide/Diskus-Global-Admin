import React from "react";
import styles from "./EditOrganizationModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { editOrganizationModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import { Col, Row } from "react-bootstrap";
const EditOrganizationModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  const handleCloseButton = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  return (
    <>
      <Modal
        show={ModalReducer.editOrganization}
        onHide={handleClose}
        closeButton={false}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalTitle={<></>}
        ModalBody={
          <>
            <section className="m-3">
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["OrganizationDetaisHeading"]}>
                    {t("Organization-details")}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Organization-name")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    Waqas Associate
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Admin-name")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    Muhammad Waqas
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Admin-email")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    Muhammadwaqas@gmail.com
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Contact #")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    03112234563
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Subscription-expiry")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>31-4-2024</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Subscription-status")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>Enabled</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Organization-status")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>Enabled</span>
                </Col>
              </Row>
            </section>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end"
              >
                <Button
                  text={t("Close")}
                  className={styles["closeButtonOrganizationEdit"]}
                  onClick={handleCloseButton}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default EditOrganizationModal;
