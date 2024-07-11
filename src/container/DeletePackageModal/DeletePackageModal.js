import React, { useState } from "react";
import { Button, Modal } from "../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./DeletePackageModal.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePackageOpenModal } from "../../store/ActionsSlicers/UIModalsActions";
import { deleteMainPackageApi } from "../../store/Actions/PackageAction";
import { packageAdminLoader } from "../../store/ActionsSlicers/PackageSlicer";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const DeletePackageModal = ({
  packageID,
  removeMainPackage,
  onClickDelete,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(packageID, "javjsvjavsja");

  const ModalReducer = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(deletePackageOpenModal(false));
  };

  // const onClickDelete = () => {
  //   let data = {
  //     PackageID: Number(packageID),
  //   };
  //   // dispatch(packageAdminLoader(true));
  //   dispatch(globalAdminDashBoardLoader(true));
  //   dispatch(deleteMainPackageApi({ data, navigate, t }));
  // };

  // const onClickDelete = () => {
  //   removeMainPackage();
  //   dispatch(deletePackageOpenModal(false));
  // };
  return (
    <>
      <Modal
        show={ModalReducer.packageDeleteModal}
        onHide={handleClose}
        closeButton
        centered
        modalBodyClassName={styles["Modalsize"]}
        modalFooterClassName={styles["modal-confirmation-footer"]}
        modalHeaderClassName={styles["modal-header-class"]}
        size={"md"}
        className={"confirmationModal"}
        ModalBody={
          <>
            <Container>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-4"
                >
                  <span className={styles["confirmation-title"]}>
                    {t("Delete-package")}
                  </span>
                </Col>
              </Row>
            </Container>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <Button
                  text={t("Cancel")}
                  className={styles["reset-User-btn"]}
                  onClick={handleClose}
                />
              </Col>

              <Col lg={6} md={6} sm={6} xs={12}>
                <Button
                  text={t("Delete")}
                  className={styles["Delete-User-btn"]}
                  onClick={onClickDelete}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default DeletePackageModal;
