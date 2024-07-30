import React, { useEffect } from "react";
import styles from "./EditOrganizationConfirmation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../../components/elements";
import {
  editOrganizationConfirmation,
  editSubscriptionConfirmationModalOpen,
} from "../../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
import { viewOrganizationLoader } from "../../../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import {
  EditOrganizationAPI,
  EditSubscriptionAPI,
} from "../../../../store/Actions/ViewOrganizationActions";
import { useNavigate } from "react-router-dom";
const EditOrganizationConfirmations = ({
  organzationStatus,
  editOrganizationID,
  setShowSearchText,
}) => {
  const ModalReducer = useSelector((state) => state.modal);
  console.log(editOrganizationID, "ModalReducerModalReducerModalReducer");

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(editOrganizationConfirmation(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(editOrganizationConfirmation(false));
  };

  const handleCancelButton = () => {
    dispatch(editOrganizationConfirmation(false));
  };

  const handleEditSubscriptionProceed = () => {
    let data = {
      OrganizationID: Number(editOrganizationID),
      StatusID: Number(organzationStatus),
    };
    dispatch(viewOrganizationLoader(true));
    dispatch(EditOrganizationAPI({ data, navigate, t }));
    setShowSearchText(false);
    dispatch(editOrganizationConfirmation(false));
  };

  return (
    <>
      <Modal
        show={ModalReducer.editOrganizationConfirmationModal}
        onHide={handleClose}
        closeButton={false}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <span className={styles["ConfirmationModalHeading"]}>
                  {t("Are-you-sure-you-want-to-update-the-changes")}
                </span>
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
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  text={t("Cancel")}
                  className={styles["CancelBtnStyles"]}
                  onClick={handleCancelButton}
                />
                <Button
                  text={t("Proceed")}
                  className={styles["ProceedBtnStyles"]}
                  onClick={handleEditSubscriptionProceed}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default EditOrganizationConfirmations;
