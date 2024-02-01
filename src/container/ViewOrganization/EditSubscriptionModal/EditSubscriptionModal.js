import React from "react";
import styles from "./EditSubscriptionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../components/elements";
import { editSubscriptionModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
const EditSubscriptionModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(editSubscriptionModalOpen(false));
  };

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
              <Col lg={12} md={12} sm={12}>
                <span className={styles["EditSubscriptionHeading"]}>
                  {t("Edit-subscription")}
                </span>
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default EditSubscriptionModal;
