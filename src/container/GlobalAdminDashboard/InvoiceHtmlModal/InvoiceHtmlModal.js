import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/elements";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./InvoiceHtmlModal.module.css";
import { htmlInvoiceModalOpen } from "../../../store/ActionsSlicers/UIModalsActions";

const InvoiceHtmlModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const htmlStringData = useSelector(
    (state) => state.globalAdminDashboardReducer.htmlStringData
  );

  const ModalReducer = useSelector((state) => state.modal);

  const [invoiceHtml, setInvoiceHtml] = useState(null);
  console.log(invoiceHtml, "htmlStringDatahtmlStringData");

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
  };

  return (
    <Modal
      show={ModalReducer.htmlInvoiceModal}
      htmlCode={invoiceHtml}
      size={"xl"}
      modalBodyClassName={styles["InvocieHTMLPreview"]}
      onHide={handleClose}
    />
  );
};

export default InvoiceHtmlModal;
