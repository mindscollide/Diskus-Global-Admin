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
const EditSubscriptionModal = ({
  organizationID,
  editSubscriptionName,
  currentSubscriptionName,
}) => {
  const ModalReducer = useSelector((state) => state.modal);

  const isEditSubscriptionModalOpen = useSelector(
    (state) => state.modal.editSubscriptionConfirmationModal
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();
  console.log(currentSubscriptionName, "currentSubscriptionNameacduwvuc");

  const [subsciptionStatus, setSubsciptionStatus] = useState({
    value: 0,
    label: "",
  });

  console.log(subsciptionStatus, "subsciptionStatussubsciptionSt");

  //states
  // useEffect(() => {
  //   setSubsciptionStatus({
  //     value: currentSubscriptionName.toString(),
  //     label:
  //       currentSubscriptionName.toString() === "1"
  //         ? "Active"
  //         : currentSubscriptionName.toString() === "2"
  //         ? "InActive"
  //         : currentSubscriptionName.toString() === "3"
  //         ? "suspended"
  //         : currentSubscriptionName.toString() === "4"
  //         ? "Closed"
  //         : currentSubscriptionName.toString() === "5"
  //         ? "Terminated Request"
  //         : currentSubscriptionName.toString() === "6"
  //         ? "Cancelled"
  //         : "Active",
  //   });
  // }, [currentSubscriptionName]);

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
  };

  const handleUpdateButton = () => {
    dispatch(editSubscriptionConfirmationModalOpen(true));
    dispatch(editSubscriptionModalOpen(false));
  };

  // console.log(subscriptionOption, "vlayeeeee");

  //hardCode subscription Status
  const options = [
    { value: "1", label: "Active" },
    { value: "2", label: "InActive" },
    { value: "3", label: "suspended" },
    { value: "4", label: "Closed" },
    { value: "5", label: "Terminated Request" },
    { value: "6", label: "Cancelled" },
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
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalBody={
          <>
            <Row>
              <Col lg={1} md={1} sm={1}></Col>
              <Col lg={11} md={11} sm={11}>
                <span className={styles["EditSubscriptionHeading"]}>
                  {t("Edit-subscription")}
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
                <span className={styles["Data"]}>{editSubscriptionName}</span>
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
                <Select
                  options={options}
                  onChange={handleChange}
                  value={subscriptionOption}
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

      <EditSubscriptionConfirmationModal
        subsciptionStatus={subsciptionStatus.value}
        organizationID={organizationID}
      />
    </>
  );
};

export default EditSubscriptionModal;
