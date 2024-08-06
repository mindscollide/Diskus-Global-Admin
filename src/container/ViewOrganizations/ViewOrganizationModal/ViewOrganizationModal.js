import React, { useEffect, useState } from "react";
import styles from "./ViewOrganizationModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { editOrganizationModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import { Col, Row } from "react-bootstrap";

const ViewOrganizationModal = ({ viewOrganizationsModal }) => {
  const ModalReducer = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // this is my state in which I set data from useEffect
  const [organizationData, setOrganizationData] = useState(null);

  //this is my useEffect in which I extract data from viewOrganizationsModal
  useEffect(() => {
    if (viewOrganizationsModal) {
      setOrganizationData(viewOrganizationsModal);
    }
  }, [viewOrganizationsModal]);

  const handleClose = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  const handleCloseButton = () => {
    dispatch(editOrganizationModalOpen(false));
  };

  // Check if viewOrganizationsModal and subscriptions are defined
  if (!organizationData) {
    return null; // or display a loading indicator or error message
  }

  const subscriptionStatuses = organizationData.subscriptions.map(
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

  // to show active from subscriptionStatusesZ
  const activeCount = subscriptionStatuses.filter(
    (status) => status === "Active"
  ).length;

  console.log("Active Count:", activeCount);

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
                    {organizationData.organizationName}
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
                    {organizationData.contactPersonName}
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
                    {organizationData.contactPersonEmail}
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
                    {organizationData.contactPersonNumber}
                  </span>
                </Col>
              </Row>
              {/* Render subscription expiry dates */}
              {/* <Row className="mt-4">
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
              </Row> */}
              {/* Render subscription statuses */}
              <Row className="mt-4">
                <Col lg={1} md={1} sm={1} />
                <Col
                  lg={5}
                  md={5}
                  sm={5}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Subscription-status")}
                  </span>
                  <div className={styles["DetialsSubHeading"]}>
                    {activeCount}
                  </div>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["SubHeadingsOrganizationDetails"]}>
                    {t("Organization-status")}
                  </span>
                  <span className={styles["DetialsSubHeading"]}>
                    {organizationData.organizationStatus === 1
                      ? t("Active")
                      : organizationData.organizationStatus === 2
                      ? t("In-active")
                      : organizationData.organizationStatus === 3
                      ? t("Suspended")
                      : organizationData.organizationStatus === 4
                      ? t("Closed")
                      : organizationData.organizationStatus === 5
                      ? t("Termination-requested")
                      : organizationData.organizationStatus === 6
                      ? t("Deleted")
                      : organizationData.organizationStatus === 7
                      ? t("Archived")
                      : null}
                  </span>
                </Col>
              </Row>
              {/* Render organization status */}
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
