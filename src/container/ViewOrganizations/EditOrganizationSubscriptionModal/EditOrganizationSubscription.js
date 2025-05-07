import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditOrganziationSubscription.module.css";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../components/elements";
import {
  editOrganizationConfirmation,
  editOrganizationSubscriptionModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
import EditOrganizationConfirmations from "./EditOrganizationConfirmation/EditOrganizationConfirmation";
const EditOrganizationSubscriptions = ({
  editOrganizationID,
  editOrganzationName,
  editSubscriptionName,
  setShowSearchText,
  setUserNameSearch,
}) => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  //states
  const [organzationStatus, setOrganzationStatus] = useState({
    value: 0,
    label: "",
  });

  const [initialOrganzationStatus, setInitialOrganzationStatus] = useState({
    value: 0,
    label: "",
  });

  useEffect(() => {
    if (ModalReducer.editOraganizationSubscriptionModal) {
      const status = {
        value: Number(editSubscriptionName),
        label:
          editSubscriptionName === 1
            ? "Active"
            : editSubscriptionName === 2
            ? "InActive"
            : editSubscriptionName === 3
            ? "suspended"
            : editSubscriptionName === 4
            ? "Closed"
            : editSubscriptionName === 5
            ? "Terminated Request"
            : editSubscriptionName === 6
            ? "Deleted"
            : editSubscriptionName === 7
            ? "Archived"
            : editSubscriptionName === 8
            ? "Locked By Global Admin"
            : "Active",
      };
      setOrganzationStatus(status);
      setInitialOrganzationStatus(status);
    }
  }, [ModalReducer.editOraganizationSubscriptionModal, editSubscriptionName]);

  const handleChange = (option) => {
    setOrganzationStatus(option);
  };

  useEffect(() => {
    return () => {
      dispatch(editOrganizationSubscriptionModalOpen(false));
      dispatch(editOrganizationConfirmation(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(editOrganizationSubscriptionModalOpen(false));
  };

  const handleCloseButton = () => {
    dispatch(editOrganizationSubscriptionModalOpen(false));
    setOrganzationStatus(initialOrganzationStatus);
  };

  const handleUpdateButton = () => {
    dispatch(editOrganizationSubscriptionModalOpen(false));
    dispatch(editOrganizationConfirmation(true));
  };

  //hardCode Organization subscription Status
  const options = [
    { value: 1, label: t("Active") },
    { value: 2, label: t("In-active") },
    { value: 3, label: t("Suspended") },
    { value: 4, label: t("Closed") },
    { value: 5, label: t("Termination-requested") },
    { value: 6, label: t("Deleted") },
    { value: 7, label: t("Archived") },
    { value: 8, label: t("Locked-by-global-admin") },
  ];

  const organizationOption = options.find(
    (option) => option.value === organzationStatus.value
  );

  return (
    <>
      <Modal
        show={ModalReducer.editOraganizationSubscriptionModal}
        onHide={handleClose}
        closeButton={false}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalBody={
          <>
            <Row>
              <Col lg={1} md={1} sm={1}></Col>
              <Col lg={11} md={11} sm={11}>
                <span className={styles["EditSubscriptionHeadingMain"]}>
                  {t("Edit-organization")}
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={1} md={1} sm={1}></Col>
              <Col
                lg={11}
                md={11}
                sm={11}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Organization-name")}
                </span>
                <span className={styles["Data"]}>{editOrganzationName}</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={1} md={1} sm={1}></Col>
              <Col
                lg={8}
                md={8}
                sm={8}
                className="d-flex flex-column flex-wrap"
              >
                <span className={styles["EditSubscriptionSubHeading"]}>
                  {t("Organization-status")}
                </span>
                <Select
                  options={options}
                  onChange={handleChange}
                  value={organizationOption}
                />
              </Col>
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
      <EditOrganizationConfirmations
        organzationStatus={organzationStatus.value}
        editOrganizationID={editOrganizationID}
        setShowSearchText={setShowSearchText}
        setUserNameSearch={setUserNameSearch}
      />
    </>
  );
};

export default EditOrganizationSubscriptions;
