import React from "react";
import styles from "./SubscriptionRenewModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { subscriptionRenewOpenModal } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal, TextField } from "../../../components/elements";
import CrossIcon from "../../../assets/images/OutletImages/Cross-Chat-Icon.png";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { regexOnlyNumbers } from "../../../common/functions/Regex";

const SubscriptionRenewModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Reducer for modal in UIModalsActions
  const ModalReducer = useSelector((state) => state.modal);

  //State for Subscription Modal
  const [subscriptionState, setSubscriptionState] = useState({
    OrganizationName: {
      value: "Quantum Dynamics Consortium",
      errorMessage: "",
      errorStatus: false,
    },
    AddDays: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  //onChange Handler for handleChange
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "addDays" && name !== 0) {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setSubscriptionState({
          ...subscriptionState,
          AddDays: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
  };

  const handleClose = () => {
    dispatch(subscriptionRenewOpenModal(false));
    setSubscriptionState({
      ...subscriptionState,
      AddDays: {
        value: 0,
      },
    });
  };

  return (
    <>
      <Modal
        show={ModalReducer.openSubscriptionModal}
        onHide={handleClose}
        closeButton={false}
        modalBodyClassName={styles["modalBody-class-Name"]}
        modalHeaderClassName={styles["modalHeaderClassName-Invoice"]}
        modalFooterClassName={styles["modalFooterClassName-Invoice"]}
        className="TrialRenewClass"
        centered
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
                <span className={styles["trial-invoice-heading"]}>
                  {t("Subscription-renew")}
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                <label className={styles["title-small-name"]}>
                  {t("Organization-name")}
                </label>
                <label className={styles["main-organization-name"]}>
                  {subscriptionState.OrganizationName.value}
                </label>
              </Col>
              <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                <label className={styles["title-Textfield-name"]}>
                  {t("Add-days")}
                </label>
                <TextField
                  placeholder="0"
                  labelClass="d-none"
                  name="addDays"
                  change={handleChange}
                  value={subscriptionState.AddDays.value}
                />
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end gap-3"
              >
                <Button
                  text={t("Cancel")}
                  className={styles["cancelButton"]}
                  onClick={handleClose}
                />
                <Button
                  text={t("Save")}
                  className={styles["sendButtonOrganizationEdit"]}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default SubscriptionRenewModal;
