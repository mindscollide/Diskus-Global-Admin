import React, { useEffect } from "react";
import styles from "./EditSubscriptionConfirmation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../../components/elements";
import { editSubscriptionConfirmationModalOpen } from "../../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
import { viewOrganizationLoader } from "../../../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { EditSubscriptionAPI } from "../../../../store/Actions/ViewOrganizationActions";
import { useNavigate } from "react-router-dom";
const EditSubscriptionConfirmationModal = ({
  subsciptionStatus,
  editSubscriptionOrgID,
}) => {
  const ModalReducer = useSelector((state) => state.modal);
  console.log(
    { editSubscriptionOrgID, subsciptionStatus },
    "ModalReducerModalReducerModalReducer"
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(editSubscriptionConfirmationModalOpen(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(editSubscriptionConfirmationModalOpen(false));
  };

  const handleCancelButton = () => {
    dispatch(editSubscriptionConfirmationModalOpen(false));
  };

  const handleEditSubscriptionProceed = () => {
    let data = {
      OrganizationID: Number(editSubscriptionOrgID),
      SubscriptionStatusID: Number(subsciptionStatus),
    };
    dispatch(viewOrganizationLoader(true));
    dispatch(EditSubscriptionAPI({ data, navigate, t }));
    dispatch(editSubscriptionConfirmationModalOpen(false));
  };

  return (
    <>
      <Modal
        show={ModalReducer.editSubscriptionConfirmationModal}
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

export default EditSubscriptionConfirmationModal;
