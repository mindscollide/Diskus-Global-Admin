import React, { useEffect } from "react";
import styles from "./ViewOrganizationModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { editOrganizationModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { convertUTCDateToLocalDate } from "../../../common/functions/dateFormatters";
const ViewOrganizationModal = ({ viewOrganizationModal }) => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      // dispatch(editOrganizationModalOpen(true));
    };
  }, []);

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
                <Col lg={1} md={1} sm={1}></Col>

                <Col lg={11} md={11} sm={11}>
                  <span className={styles["OrganizationDetaisHeading"]}>
                    {t("Organization-details")}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Organization-name")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.organizationName}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Admin-name")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.contactPersonName}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Admin-email")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.emailAddress}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Contact")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.number}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Subscription-expiry")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {convertUTCDateToLocalDate(
                      viewOrganizationModal.subscriptionExpiry
                    )}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>

                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Subscription-status")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.currentSubscrtionStatus === 1 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Active")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 2 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("In-active")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 3 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Suspended")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 4 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Closed")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 5 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Termination-requested")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 6 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Cancelled")}
                        </span>
                      </>
                    ) : null}
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1}></Col>
                <Col
                  lg={11}
                  md={11}
                  sm={11}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Organization-status")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {viewOrganizationModal.currentSubscrtionStatus === 1 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Active")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 2 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("In-active")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 3 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Suspended")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 4 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Closed")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 5 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Termination-requested")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 6 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Deleted")}
                        </span>
                      </>
                    ) : viewOrganizationModal.currentSubscrtionStatus === 7 ? (
                      <>
                        <span className={styles["inner-sub-Heading"]}>
                          {t("Archived")}
                        </span>
                      </>
                    ) : null}
                  </span>
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

export default ViewOrganizationModal;
