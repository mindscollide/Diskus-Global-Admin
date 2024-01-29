import React from "react";
import styles from "./UserLoginHistory.module.css";
import { Modal } from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { ModalIsOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import ReactFlagsSelect from "react-flags-select";
import { countryNameforPhoneNumber } from "../CountryJson";

const UserLoginHistoryModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(ModalIsOpen(false));
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
                <span className={styles["Subheadings"]}>{t("Email")}</span>
                <span className={styles["PopulatedData"]}>
                  SaifKhan99@gmail.com
                </span>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={6} sm={6}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className={styles["Subheadings"]}>
                      {t("Country-code")}
                    </span>
                    <ReactFlagsSelect
                      fullWidth={false}
                      searchable={true}
                      placeholder={"Select Co...."}
                      customLabels={countryNameforPhoneNumber}
                      className={styles["dropdown-countrylist"]}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default UserLoginHistoryModal;
