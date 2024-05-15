import React from "react";
import styles from "./PackageDetailModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  dashboardSendInvoiceOpenModal,
  editOrganizationModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { Button, Modal } from "../../../components/elements";
import CrossIcon from "../../../assets/images/OutletImages/Cross-Chat-Icon.png";
import { Col, Container, Row } from "react-bootstrap";

const PackageDetailModal = () => {
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
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-center">
          <Modal
            show={ModalReducer.openSendInvoiceModal}
            onHide={handleClose}
            closeButton={false}
            modalBodyClassName={styles["modalBody-class-Name"]}
            modalHeaderClassName={styles["modalHeaderClassName-Invoice"]}
            modalFooterClassName={styles["modalFooterClassName-Invoice"]}
            className={"PackageDetails"}
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
                    <span className={styles["send-invoice-heading"]}>
                      {t("Package-details")}
                    </span>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6}>
                    <div className={styles["column-container"]}>
                      <span className={styles["send-invoice-subHeading"]}>
                        {t("Organization-name")}
                      </span>
                      <span className={styles["send-invoice-subheading-2"]}>
                        Quantum Dynamics Consortium
                      </span>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className={styles["column-container"]}>
                      <span className={styles["send-invoice-subHeading"]}>
                        {t("Email")}
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
                      {t("Package-details")}
                    </span>
                  </Col>
                </Row>

                <div className={styles["all-cells"]}>
                  <Row className={`${styles["custom-table-row"]} ${"mt-3 "}`}>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-header"]}>
                        Column 1
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-header"]}>
                        Column 2
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-header"]}>
                        Column 3
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-header"]}>
                        Column 4
                      </span>
                    </Col>
                  </Row>

                  {/* Custom Table - Second Row with Data */}
                  <Row className={styles["custom-table-row"]}>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-data"]}>
                        Data 1
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-data"]}>
                        Data 2
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-data"]}>
                        Data 3
                      </span>
                    </Col>
                    <Col
                      lg={3}
                      md={3}
                      sm={3}
                      className={styles["custom-table-cell"]}
                    >
                      <span className={styles["custom-table-data"]}>
                        Data 4
                      </span>
                    </Col>
                  </Row>
                </div>
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
                      text={t("Close")}
                      className={styles["sendButtonOrganizationEdit"]}
                      onClick={handleSendButton}
                    />
                  </Col>
                </Row>
              </>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default PackageDetailModal;
