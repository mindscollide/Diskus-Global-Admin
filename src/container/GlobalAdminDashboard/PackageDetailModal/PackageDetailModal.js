import React, { useEffect } from "react";
import styles from "./PackageDetailModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  dashboardSendInvoiceOpenModal,
  editOrganizationModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import CrossIcon from "../../../assets/images/OutletImages/Cross-Chat-Icon.png";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { getPackageDetailGlobalApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const PackageDetailModal = ({ subscribedPackageDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  // Reducer for modal in UIModalActions
  const ModalReducer = useSelector((state) => state.modal);

  const [emailState, setEmailState] = useState("");
  const [subscriptionCustomer, setSubscriptionCustomer] = useState("");
  const [packageDetails, setPackageDetails] = useState([]);

  // Reducer for getting Data
  const packageDetailModalData = useSelector(
    (state) => state.globalAdminDashboardReducer.packageDetailModalData
  );

  useEffect(() => {
    if (packageDetailModalData?.result?.details) {
      setEmailState(packageDetailModalData.result.details.organizationEmail);
      setSubscriptionCustomer(
        packageDetailModalData.result.details.subscriptionCustomerNumber
      );
      setPackageDetails(packageDetailModalData.result.details.packageDetails);
    }
  }, [packageDetailModalData]);

  const handleClose = () => {
    dispatch(dashboardSendInvoiceOpenModal(false));
  };

  const handleSendButton = () => {
    dispatch(dashboardSendInvoiceOpenModal(false));
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center">
          <Modal
            show={ModalReducer.openSendInvoiceModal}
            onHide={handleClose}
            closeButton={false}
            modalBodyClassName={styles["modalBody-class-Name"]}
            modalHeaderClassName={styles["modalHeaderClassName-Invoice"]}
            modalFooterClassName={styles["modalFooterClassName-Invoice"]}
            className={"PackageDetails"}
            size={"lg"}
            ModalBody={
              <>
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
                    <span className={styles["send-invoice-heading"]}>
                      {t("Package-details")}
                    </span>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6}>
                    <div className={styles["column-container"]}>
                      <span className={styles["send-invoice-subHeading"]}>
                        {t("Organization-name")}
                      </span>
                      <span className={styles["send-invoice-subheading-2"]}>
                        {subscribedPackageDetail.organizationName}
                      </span>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className={styles["column-container"]}>
                      <span className={styles["send-invoice-subHeading"]}>
                        {t("Email")}
                      </span>
                      <span className={styles["send-invoice-subheading-2"]}>
                        {emailState}
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={12} md={12} sm={12}>
                    <div className={styles["column-container"]}>
                      <span className={styles["send-invoice-subHeading"]}>
                        {t("Subscription-customer-number")}
                      </span>
                      <span className={styles["send-invoice-subheading-2"]}>
                        {subscriptionCustomer}
                      </span>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={12} md={12} sm={12}>
                    <span className={styles["send-invoice-subHeading"]}>
                      {t("Package-details")}
                    </span>
                  </Col>
                </Row>

                <div className={styles["all-cells"]}>
                  <div className={styles["table-wrapper"]}>
                    {/* Header Row */}
                    <div className={styles["custom-table-row"]}>
                      <div className={styles["custom-table-cell"]}>
                        <span className={styles["custom-table-header"]}>
                          {t("License-name")}
                        </span>
                      </div>
                      {packageDetails.map((detail, index) => (
                        <div
                          key={index}
                          className={styles["custom-table-cell"]}
                        >
                          <span className={styles["custom-table-header"]}>
                            {detail.packageName}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Data Row */}
                    <div className={styles["custom-table-row"]}>
                      <div className={styles["custom-table-cell"]}>
                        <span className={styles["custom-table-header"]}>
                          {t("No-of-Licenses")}
                        </span>
                      </div>
                      {packageDetails.map((detail, index) => (
                        <div
                          key={index}
                          className={styles["custom-table-cell"]}
                        >
                          <span className={styles["custom-table-data"]}>
                            {detail.headCount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                      className={styles["sendButtonOrganizationEdit"]}
                      onClick={handleSendButton}
                    />
                  </Col>
                </Row>
              </>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default PackageDetailModal;
