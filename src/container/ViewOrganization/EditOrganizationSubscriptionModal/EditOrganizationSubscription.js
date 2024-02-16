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
import EditOrganizationConfirmation from "./EditOrganizationConfirmation/EditOrganizationConfirmation";
const EditOrganizationSubscription = ({
  editOrganizationID,
  editOrganzationName,
}) => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  //states
  const [organzationStatus, setOrganzationStatus] = useState({
    value: 0,
    label: "",
  });

  console.log(organzationStatus.value, "organzationStatusorganzationStatus");

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
  };

  const handleUpdateButton = () => {
    dispatch(editOrganizationSubscriptionModalOpen(false));
    dispatch(editOrganizationConfirmation(true));
  };

  //hardCode Organization subscription Status
  const options = [
    { value: "1", label: "Active" },
    { value: "2", label: "InActive" },
    { value: "3", label: "suspended" },
    { value: "4", label: "Closed" },
    { value: "5", label: "Terminated Requested" },
    { value: "6", label: "Deleted" },
    { value: "7", label: "Archived" },
  ];

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
                  {t("Subscription-status")}
                </span>
                <Select options={options} onChange={handleChange} />
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
      <EditOrganizationConfirmation
        organzationStatus={organzationStatus.value}
        editOrganizationID={editOrganizationID}
      />
    </>
  );
};

export default EditOrganizationSubscription;
