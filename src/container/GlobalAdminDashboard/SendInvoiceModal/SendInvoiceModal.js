import React from "react";
import styles from "./SendInvoiceModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  dashboardSendInvoiceOpenModal,
  editOrganizationModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import { Col, Row } from "react-bootstrap";

const SendInvoiceModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ModalReducer = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(dashboardSendInvoiceOpenModal(false));
  };

  const handleSendButton = () => {
    dispatch(dashboardSendInvoiceOpenModal(false));
  };

  return (
    <>
      <Modal
        show={ModalReducer.openSendInvoiceModal}
        onHide={handleClose}
        closeButton={false}
        modalBodyClassName={styles["modalBody-class-Name"]}
        modalFooterClassName={styles["modalFooterClassName-Invoice"]}
        modalHeaderClassName={styles["modalFooterClassName-Invoice"]}
        centered
        size={"lg"}
        ModalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={styles["send-invoice-heading"]}>
                  Send Invoice
                </span>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col lg={6} md={6} sm={6}>
                <div className={styles["column-container"]}>
                  <span className={styles["send-invoice-subHeading"]}>
                    Organizataion Name
                  </span>
                  <span className={styles["send-invoice-subheading-2"]}>
                    Quantum Dynamics Consortium
                  </span>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6}>
                <div className={styles["column-container"]}>
                  <span className={styles["send-invoice-subHeading"]}>
                    Email
                  </span>
                  <span className={styles["send-invoice-subheading-2"]}>
                    Quantum Dynamics Consortium
                  </span>
                </div>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col lg={12} md={12} sm={12}>
                <span className={styles["send-invoice-subHeading"]}>
                  Package Details
                </span>
              </Col>
            </Row>

            <Row className={styles["custom-table-row"]}>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-header"]}>Column 1</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-header"]}>Column 2</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-header"]}>Column 3</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-header"]}>Column 4</span>
              </Col>
            </Row>

            {/* Custom Table - Second Row with Data */}
            <Row className={styles["custom-table-row"]}>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-data"]}>Data 1</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-data"]}>Data 2</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-data"]}>Data 3</span>
              </Col>
              <Col lg={3} md={3} sm={3} className={styles["custom-table-cell"]}>
                <span className={styles["custom-table-data"]}>Data 4</span>
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
                className="d-flex justify-content-end"
              >
                <Button
                  text={t("Send")}
                  className={styles["sendButtonOrganizationEdit"]}
                  onClick={handleSendButton}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default SendInvoiceModal;
