import React, { useEffect } from "react";
import styles from "./ViewOrganizationModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { editOrganizationModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { convertUTCDateToLocalDate } from "../../../common/functions/dateFormatters";

const ViewOrganizationModal = ({ viewOrganizationsModal }) => {
  const ModalReducer = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      // Cleanup logic here if needed
    };
  }, []);

  const handleClose = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  const handleCloseButton = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  // Check if viewOrganizationsModal and subscriptions are defined
  if (!viewOrganizationsModal || !viewOrganizationsModal.subscriptions) {
    return null; // or display a loading indicator or error message
  }

  // Aggregate subscription expiry dates and statuses
  const subscriptionExpiryDates = viewOrganizationsModal.subscriptions.map(
    (subscription) =>
      convertUTCDateToLocalDate(subscription.subscriptionExpiryDate)
  );
  const subscriptionStatuses = viewOrganizationsModal.subscriptions.map(
    (subscription) => {
      switch (subscription.fK_SubscriptionStatusID) {
        case 1:
          return t("Active");
        case 2:
          return t("In-active");
        case 3:
          return t("Suspended");
        case 4:
          return t("Closed");
        case 5:
          return t("Termination-requested");
        case 6:
          return t("Cancelled");
        default:
          return null;
      }
    }
  );

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
                    {viewOrganizationsModal.organizationName}
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
                    {viewOrganizationsModal.contactPersonName}
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
                    {viewOrganizationsModal.emailAddress}
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
                    {viewOrganizationsModal.contactPersonNumber}
                  </span>
                </Col>
              </Row>
              {/* Render subscription expiry dates */}
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
                  {subscriptionExpiryDates.map((expiryDate, index) => (
                    <span key={index} className={styles["DetialsSubHeading"]}>
                      {expiryDate}
                    </span>
                  ))}
                </Col>
              </Row>
              {/* Render subscription statuses */}
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
                  {subscriptionStatuses.map((status, index) => (
                    <span key={index} className={styles["DetialsSubHeading"]}>
                      {status}
                    </span>
                  ))}
                </Col>
              </Row>
              {/* Render organization status */}
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
                    {viewOrganizationsModal.organizationStatus === 1
                      ? t("Active")
                      : viewOrganizationsModal.organizationStatus === 2
                      ? t("In-active")
                      : viewOrganizationsModal.organizationStatus === 3
                      ? t("Suspended")
                      : viewOrganizationsModal.organizationStatus === 4
                      ? t("Closed")
                      : viewOrganizationsModal.organizationStatus === 5
                      ? t("Termination-requested")
                      : viewOrganizationsModal.organizationStatus === 6
                      ? t("Deleted")
                      : viewOrganizationsModal.organizationStatus === 7
                      ? t("Archived")
                      : null}
                  </span>
                </Col>
              </Row>
            </section>
          </>
        }
        ModalFooter={
          <Row>
            <Col lg={12} md={12} sm={12} className="d-flex justify-content-end">
              <Button
                text={t("Close")}
                className={styles["closeButtonOrganizationEdit"]}
                onClick={handleCloseButton}
              />
            </Col>
          </Row>
        }
      />
    </>
  );
};

export default ViewOrganizationModal;
