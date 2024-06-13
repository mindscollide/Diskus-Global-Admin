import React from "react";
import styles from "./TrialRenewModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { trialRenewOpenModal } from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal, TextField } from "../../../components/elements";
import CrossIcon from "../../../assets/images/OutletImages/Cross-Chat-Icon.png";
import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { regexOnlyNumbers } from "../../../common/functions/Regex";
import { trialRenewApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { useNavigate } from "react-router-dom";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const TrialRenewModal = ({
  trialRenewOrganizationId,
  trialRenewOrganizationName,
  trialRenewRemainingDays,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  //Reducer from UIModalActions
  const ModalReducer = useSelector((state) => state.modal);

  console.log(
    { trialRenewOrganizationName, trialRenewOrganizationId },
    "trialRenewOrganizationName"
  );

  // state for Trial Renew Modal
  const [trialState, setTrialState] = useState({
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

  const onChangeFields = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "adddays" && name !== 0) {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setTrialState({
          ...trialState,
          AddDays: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
  };

  //HandleClose handler for closing modal
  const handleClose = () => {
    dispatch(trialRenewOpenModal(false));
    setTrialState({
      ...trialState,
      AddDays: {
        value: 0,
      },
    });
  };

  // onsave handler modal
  const saveHandlerRenewTrial = () => {
    let data = {
      OrganizationID: Number(trialRenewOrganizationId),
      NumberOfExtensionDays: Number(trialState.AddDays.value),
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(trialRenewApi({ data, navigate, t }));
  };

  return (
    <>
      <Modal
        show={ModalReducer.openTrialRenewModal}
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
                  {t("Extend-Trial-for-No-of-days")}
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                <label className={styles["title-small-name"]}>
                  {t("Organization-name")}
                </label>
                <label className={styles["main-organization-name"]}>
                  {trialRenewOrganizationName}
                </label>
              </Col>
              <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                <label className={styles["title-Textfiels-name"]}>
                  {t("Add-days")}
                </label>
                <TextField
                  placeholder="0"
                  labelClass="d-none"
                  name="adddays"
                  change={onChangeFields}
                  value={trialState.AddDays.value}
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
                  onClick={saveHandlerRenewTrial}
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

export default TrialRenewModal;
