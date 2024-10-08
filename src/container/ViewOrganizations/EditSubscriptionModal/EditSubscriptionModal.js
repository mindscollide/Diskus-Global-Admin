import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./EditSubscriptionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../components/elements";
import {
  editSubscriptionConfirmationModalOpen,
  editSubscriptionModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
import EditSubscriptionConfirmationModal from "./EditSubscriptionModalConfirmation/EditSubscriptionConfirmationModal";
import { convertUTCDateToLocalDateView } from "../../../common/functions/dateFormatters";
const EditSubscriptionModals = ({
  editSubscriptionOrgID,
  subcriptionStartDate,
  subcriptionExpiry,
  duration,
  editCurrentSubscriptionName,
  headData,
  editSubModal,
  setUserNameSearch,
  setShowSearchText,
}) => {
  const ModalReducer = useSelector((state) => state.modal);

  const isEditSubscriptionModalOpen = useSelector(
    (state) => state.modal.editSubscriptionConfirmationModal
  );

  const [packageDetails, setPackageDetails] = useState([]);

  // Reducer for getting Data
  const packageDetailModalData = useSelector(
    (state) => state.globalAdminDashboardReducer.packageDetailModalData
  );

  useEffect(() => {
    if (packageDetailModalData?.result?.details) {
      setPackageDetails(packageDetailModalData.result.details.packageDetails);
    }
  }, [packageDetailModalData]);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [subsciptionStatus, setSubsciptionStatus] = useState({
    value: 0,
    label: "",
  });

  const [initialOrganzationStatus, setInitialOrganzationStatus] = useState({
    value: 0,
    label: "",
  });

  const [organizationName, setOrganizationName] = useState("");

  // extract organizationName
  useEffect(() => {
    if (headData && headData.length > 0) {
      setOrganizationName(headData[0].organizationName);
    }
  }, [headData]);

  //states
  useEffect(() => {
    if (ModalReducer.editSubscriptionModal) {
      const status = {
        value: Number(editCurrentSubscriptionName),
        label:
          editCurrentSubscriptionName === 1
            ? "Active"
            : editCurrentSubscriptionName === 2
            ? "InActive"
            : editCurrentSubscriptionName === 3
            ? "suspended"
            : editCurrentSubscriptionName === 4
            ? "Closed"
            : editCurrentSubscriptionName === 5
            ? "Terminated Request"
            : editCurrentSubscriptionName === 6
            ? "Cancelled"
            : "Active",
      };
      setSubsciptionStatus(status);
      setInitialOrganzationStatus(status);
    }
  }, [ModalReducer.editSubscriptionModal, editCurrentSubscriptionName]);

  const handleChange = (option) => {
    setSubsciptionStatus(option);
  };

  useEffect(() => {
    return () => {
      dispatch(editSubscriptionConfirmationModalOpen(false));
      dispatch(editSubscriptionModalOpen(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(editSubscriptionModalOpen(false));
  };

  const handleCloseButton = () => {
    dispatch(editSubscriptionModalOpen(false));
    setSubsciptionStatus(initialOrganzationStatus);
  };

  const handleUpdateButton = () => {
    dispatch(editSubscriptionConfirmationModalOpen(true));
    dispatch(editSubscriptionModalOpen(false));
  };

  //hardCode subscription Status
  const options = [
    { value: 1, label: t("Active") },
    { value: 2, label: t("In-active") },
    { value: 3, label: t("Suspended") },
    { value: 4, label: t("Closed") },
    { value: 5, label: t("Termination-requested") },
    { value: 6, label: t("Cancelled") },
  ];

  const subscriptionOption = options.find(
    (option) => option.value === subsciptionStatus.value
  );

  return (
    <>
      <Modal
        show={ModalReducer.editSubscriptionModal}
        onHide={handleClose}
        closeButton={false}
        modalBodyClassName={styles["modalBody-class-Name"]}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        className="update-SUbscription"
        centered
        size={"md"}
        ModalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={styles["EditSubscriptionHeading"]}>
                  {t("Update-subscription")}
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Organization-name")}
                </span>
                <span className={styles["Data"]}>{organizationName}</span>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Subscription-date")}
                </span>
                <span className={styles["Data"]}>
                  {convertUTCDateToLocalDateView(subcriptionStartDate)}
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Expiry-date")}
                </span>
                <span className={styles["Data"]}>
                  {convertUTCDateToLocalDateView(subcriptionExpiry)}
                </span>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Subscription")}
                </span>
                <span className={styles["Data"]}>
                  {duration === 1 ? (
                    <>
                      <span className="Data">{t("Annual")}</span>
                    </>
                  ) : duration === 2 ? (
                    <>
                      <span className="Data">{t("Monthly")}</span>
                    </>
                  ) : duration === 3 ? (
                    <>
                      <span className="Data">{t("Quarterly")}</span>
                    </>
                  ) : duration === 4 ? (
                    <>
                      <span className="Data">{t("HalfYearly")}</span>
                    </>
                  ) : duration === 5 ? (
                    <>
                      <span className="Data">{t("Trial")}</span>
                    </>
                  ) : duration === 6 ? (
                    <>
                      <span className="Data">{t("Trial-extended")}</span>
                    </>
                  ) : null}
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <table className={styles["licenseTable"]}>
                  <tbody>
                    {packageDetails.map((license, index) => (
                      <tr key={index}>
                        <td>{license.packageName}</td>
                        <td>{license.headCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={8}
                md={8}
                sm={8}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Subscription-statuses")}
                </span>
                <Select
                  options={options}
                  onChange={handleChange}
                  value={subscriptionOption}
                />
              </Col>
              <Col lg={4} md={4} sm={4} />
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row className="mt-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end gap-2"
              >
                <Button
                  text={t("Close")}
                  className={styles["closeButtonSubscriptionEdit"]}
                  onClick={handleCloseButton}
                />

                <Button
                  text={t("Update")}
                  className={styles["UpdateButtonSubscriptionEdit"]}
                  onClick={handleUpdateButton}
                />
              </Col>
            </Row>
          </>
        }
      />

      <EditSubscriptionConfirmationModal
        subsciptionStatus={subsciptionStatus.value}
        editSubscriptionOrgID={editSubscriptionOrgID}
        setShowSearchText={setShowSearchText}
        setUserNameSearch={setUserNameSearch}
      />
    </>
  );
};

export default EditSubscriptionModals;
