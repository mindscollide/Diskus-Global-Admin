import React, { useEffect } from "react";
import styles from "./UserHistoryConfirmationModal.module.css";
import { Button, Modal } from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  ModalIsOpen,
  ProceedHistoryModalOpen,
} from "../../../../store/ActionsSlicers/UIModalsActions";
import { Col, Row } from "react-bootstrap";
const UserHistoryConfirmationModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(ProceedHistoryModalOpen(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(ProceedHistoryModalOpen(false));
  };

  return (
    <>
      <Modal
        show={ModalReducer.ProceedUserHistoryModal}
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
                />
                <Button
                  text={t("Proceed")}
                  className={styles["ProceedBtnStyles"]}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default UserHistoryConfirmationModal;
