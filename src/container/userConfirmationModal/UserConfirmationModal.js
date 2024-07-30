import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Notification, TextField } from "./../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./UserConfirmationModal.module.css";
import Form from "react-bootstrap/Form";
// import { countryName } from "../../AllUsers/AddUser/CountryJson";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userConifrmationOpenModal } from "../../store/ActionsSlicers/UIModalsActions";
import { UpdateGlobalAdminUserApi } from "../../store/Actions/GlobalAdminDashboardActions";
import { globalAdminDashBoardLoader, resetResponseMessage } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const UserConfirmationModal = ({
  userDataInfo,
  selectedCountry,
  userInfoState,
}) => {
  //For Localization
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ModalReducer = useSelector((state) => state.modal);

  const Responsemessage = useSelector(
    (state) => state.globalAdminDashboardReducer.Responsemessage
  );
  console.log(selectedCountry, "userInfoStateuserInfoState");

  const [openNotification, setOpenNotification] = useState({
    changePasswordFlag: false,
    changePasswordNotification: null,
    severity: "none",
  });

  useEffect(() => {
    if (
      Responsemessage !== "" &&
      Responsemessage !== t("Data-available") &&
      Responsemessage !== t("No-data-available") &&
      Responsemessage !== "Success"
    ) {
      setOpenNotification({
        changePasswordFlag: true,
        changePasswordNotification: Responsemessage,
        severity: t("Updated-Successfully") ? "success" : "error",
      });

      setTimeout(() => {
        dispatch(resetResponseMessage());
        setOpenNotification({
          ...openNotification,
          changePasswordFlag: false,
          changePasswordNotification: "",
          severity: "none",
        });
      }, 4000);
    }
  }, [Responsemessage]);

  const handleClose = () => {
    dispatch(userConifrmationOpenModal(false));
  };

  const handleProceedUpdate = () => {
    let data = {
      CountryCodeID: selectedCountry.id,
      MobileNumber: userInfoState.Number.value,
    };

    dispatch(globalAdminDashBoardLoader(true));
    dispatch(UpdateGlobalAdminUserApi({ data, navigate, t }));
  };

  return (
    <>
      <Container>
        <Modal
          show={ModalReducer.ConfirmationInfoModal}
          onHide={handleClose}
          closeButton
          centered
          modalBodyClassName={styles["Modalsize"]}
          modalFooterClassName={styles["modal-confirmation-footer"]}
          modalHeaderClassName={styles["modal-header-class"]}
          size={"lg"}
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
                      {t("Are-you-sure-you-want-to-update-the-changes")}
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
                    onClick={handleClose}
                    className={styles["reset-User-btn"]}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Proceed")}
                    onClick={handleProceedUpdate}
                    className={styles["save-User-btn"]}
                  />
                </Col>
              </Row>
            </>
          }
        />
      </Container>
      <Notification
        show={openNotification.changePasswordFlag}
        hide={setOpenNotification}
        message={openNotification.changePasswordNotification}
        severity={openNotification.severity}
        notificationClass={
          openNotification.severity
            ? "notification-error"
            : "notification-success"
        }
      />
    </>
  );
};

export default UserConfirmationModal;
