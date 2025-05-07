import React, { useEffect, useState } from "react";
import { Modal, Button } from "../../../components/elements";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./InvoiceHtmlModal.module.css";
import { htmlInvoiceModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { SendInvoiceApi } from "../../../store/Actions/GlobalAdminDashboardActions";

const InvoiceHtmlModal = ({
  onClickSendInvoice,
  setSendInvoiceData,
  onClickDownloadInvoice,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const htmlStringData = useSelector(
    (state) => state.globalAdminDashboardReducer.htmlStringData
  );

  const ModalReducer = useSelector((state) => state.modal);

  const [invoiceHtml, setInvoiceHtml] = useState(null);
  console.log(htmlStringData, "htmlStringDatahtmlStringData");

  useEffect(() => {
    if (
      htmlStringData?.result !== null &&
      htmlStringData?.result !== undefined
    ) {
      let { htmlString } = htmlStringData?.result;
      setInvoiceHtml(htmlString);
    }
  }, [htmlStringData?.result]);

  const handleClose = () => {
    dispatch(htmlInvoiceModalOpen(false));
    setSendInvoiceData(null);
  };

  return (
    <Modal
      show={ModalReducer.htmlInvoiceModal}
      htmlCode={invoiceHtml}
      size={"xl"}
      modalBodyClassName={styles["InvocieHTMLPreview"]}
      modalFooterClassName={styles["modalFooterClassName-Invoice"]}
      onHide={handleClose}
      ModalFooter={
        <>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className={styles["footer-column-class"]}
            >
              <Button
                text={t("Send-invoice")}
                className={styles["sendInvoice-Button"]}
                onClick={onClickSendInvoice}
              />
              <Button
                text={t("Download-invoice")}
                className={styles["sendInvoice-Button"]}
                onClick={onClickDownloadInvoice}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default InvoiceHtmlModal;
