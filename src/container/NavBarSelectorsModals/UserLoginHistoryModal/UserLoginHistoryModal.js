import React, { useEffect } from "react";
import styles from "./UserLoginHistory.module.css";
import { Button, Modal, TextField } from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalIsOpen,
  ProceedHistoryModalOpen,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { countryNameforPhoneNumber } from "../CountryJson";

const UserLoginHistoryModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(ProceedHistoryModalOpen(false));
      dispatch(ModalIsOpen(false));
    };
  }, []);

  const handleClose = () => {
    dispatch(ModalIsOpen(false));
  };

  const hanleUpdateFunction = () => {
    dispatch(ModalIsOpen(false));
    dispatch(ProceedHistoryModalOpen(true));
  };
  return (
    <>
      <Modal
        show={ModalReducer.showModal}
        onHide={handleClose}
        closeButton={false}
        modalFooterClassName={styles["modalFooterClassName"]}
        modalHeaderClassName={styles["modalFooterClassName"]}
        centered
        size={"md"}
        ModalBody={
          <>
            <section className={styles["OverAllPadding"]}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["userInformationHeading"]}>
                    {t("User-information")}
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={6}>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex flex-column flex-wrap"
                    >
                      <span className={styles["Subheadings"]}>
                        {t("Organization-name")}
                        <span className={styles["redSteric"]}>*</span>
                      </span>
                      <span className={styles["PopulatedData"]}>
                        Waqas Associates
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex flex-column flex-wrap"
                >
                  <span className={styles["Subheadings"]}>
                    {t("Email")}
                    <span className={styles["redSteric"]}>*</span>
                  </span>
                  <span className={styles["PopulatedData"]}>
                    SaifKhan99@gmail.com
                  </span>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={6} md={6} sm={6}>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Subheadings"]}>
                        {t("Country-code")}{" "}
                        <span className={styles["redSteric"]}>*</span>
                      </span>
                      <ReactFlagsSelect
                        fullWidth={false}
                        searchable={true}
                        placeholder={"Select Co...."}
                        customLabels={countryNameforPhoneNumber}
                        className={"dropdown-countrylist"}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Subheadings"]}>
                        {t("Number")}
                        <span className={styles["redSteric"]}>*</span>
                      </span>
                      <TextField
                        labelClass={"d-none"}
                        applyClass={"NewMeetingFileds"}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
          </>
        }
        ModalFooter={
          <>
            <section className={styles["OverAllPadding"]}>
              <Row className="mt-5">
                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex justify-content-start"
                >
                  <Button
                    text={t("Revert")}
                    className={styles["RevertBtnStyles"]}
                  />
                </Col>

                <Col
                  lg={6}
                  md={6}
                  sm={6}
                  className="d-flex justify-content-end"
                >
                  <Button
                    text={t("Update")}
                    className={styles["UpdateBtnStyles"]}
                    onClick={hanleUpdateFunction}
                  />
                </Col>
              </Row>
            </section>
          </>
        }
      />
    </>
  );
};

export default UserLoginHistoryModal;
