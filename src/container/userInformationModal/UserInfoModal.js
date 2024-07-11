import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, TextField } from "./../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./UserInfoModal.module.css";
import Form from "react-bootstrap/Form";
// import { countryName } from "../../AllUsers/AddUser/CountryJson";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useDispatch, useSelector } from "react-redux";
import CrossIcon from "../../assets/images/OutletImages/Cross-Chat-Icon.png";
import {
  countryName,
  countryNameforPhoneNumber,
} from "../../common/functions/CountryJson";
import {
  userConifrmationOpenModal,
  userInfoOpenModal,
} from "../../store/ActionsSlicers/UIModalsActions";
import { regexOnlyNumbers } from "../../common/functions/Regex";

const UserProfileModal = () => {
  //For Localization
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Reducer for modal in UIModalsActions
  const ModalReducer = useSelector((state) => state.modal);

  // error state to show error on empty field
  const [errorBar, setErrorBar] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // select for country dropdown
  const [select, setSelect] = useState("");

  const [selected, setSelected] = useState("US");
  const [selectedCountry, setSelectedCountry] = useState({});

  // state for User Information Modal
  const [userInfoState, setUserInfoState] = useState({
    OrganizationName: {
      value: "Quantum Organization Ali",
      errorMessage: "",
      errorStatus: false,
    },

    OrganizationEmail: {
      value: "OwaisUddin23@gmail.com",
      errorMessage: "",
      errorStatus: false,
    },

    CountryCode: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    Number: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // onSelect for onChange
  const onSelect = (code) => setSelect(code);

  // on Change handler
  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "number" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setUserInfoState({
          ...userInfoState,
          Number: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
  };

  // update handler for userInfo Modal
  const userInfoUpdate = () => {
    if (userInfoState.Number.value !== "") {
      console.log("field is filled");
      setErrorBar(false);
    } else {
      setErrorBar(true);
    }
  };

  const handleClose = () => {
    dispatch(userInfoOpenModal(false));
    setUserInfoState({
      ...userInfoState,
      Number: {
        value: "",
      },
    });
    setSelect("");
    setErrorBar(false);
    setSubmitted(false);
  };

  const handleSelect = (country) => {
    setSelected(country);
    setSelectedCountry(country);
    let a = Object.values(countryNameforPhoneNumber).find((obj) => {
      return obj.primary === country;
    });

    setUserInfoState({
      ...userInfoState,
      CountryCode: {
        value: a.id,
      },
    });
  };

  const openConfirmationModal = () => {
    setSubmitted(true);
    if (userInfoState.Number.value !== "" && select !== "") {
      setErrorBar(false);
      dispatch(userInfoOpenModal(false));
      dispatch(userConifrmationOpenModal(true));
    } else {
      setErrorBar(true);
    }
  };

  return (
    <>
      <Container>
        <Modal
          show={ModalReducer.userInfoModal}
          onHide={handleClose}
          closeButton
          modalBodyClassName={styles["Modalsize"]}
          centered
          modalFooterClassName={styles["modal-userprofile-footer"]}
          modalHeaderClassName={styles["modal-header-class"]}
          size={"lg"}
          className={"userProfileModal"}
          ModalBody={
            <>
              <Container>
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
                    <span className={styles["User-info-heading"]}>
                      {t("User-Information")}
                    </span>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Organization-name")}
                    </label>
                    <label className={styles["main-user-name"]}>
                      {userInfoState.OrganizationName.value}
                    </label>
                  </Col>
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Email")}
                    </label>
                    <label className={styles["main-user-name"]}>
                      {userInfoState.OrganizationEmail.value}
                    </label>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Country-code")}
                      <span className={styles["aesterick-class"]}> *</span>
                    </label>
                    <ReactFlagsSelect
                      selected={selected}
                      onSelect={handleSelect}
                      fullWidth={false}
                      searchable={true}
                      placeholder={"Select Co...."}
                      customLabels={countryNameforPhoneNumber}
                      className={styles["userProfileFlagSelect"]}
                    />
                    {errorBar && select === "" && submitted === true ? (
                      <Row className="mt-4">
                        <Col>
                          <p
                            className={
                              errorBar && select === "" && submitted === true
                                ? styles["errorMessage"]
                                : styles["errorMessage-hidden"]
                            }
                          >
                            {t("Please-Select-this-field")}
                          </p>
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </Col>

                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["reactflag-label"]}>
                      {t("Number")}
                      <span className={styles["aesterick-class"]}> *</span>
                    </label>
                    <TextField
                      name="number"
                      value={userInfoState.Number.value}
                      change={onChangeHandler}
                      labelClass="d-none"
                      className={"react-flag-field"}
                    />
                    {errorBar &&
                    userInfoState.Number.value === "" &&
                    submitted === true ? (
                      <Row className="mt-2">
                        <Col>
                          <p
                            className={
                              errorBar &&
                              userInfoState.Number.value === "" &&
                              submitted === true
                                ? styles["errorMessage"]
                                : styles["errorMessage-hidden"]
                            }
                          >
                            {t("Fill-the-number-field")}
                          </p>
                        </Col>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Container>
            </>
          }
          ModalFooter={
            <>
              <Row className="mb-5 mt-2">
                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Revert")}
                    className={styles["reset-User-btn"]}
                  />
                </Col>

                <Col lg={6} md={6} sm={6} xs={12}>
                  <Button
                    text={t("Update")}
                    className={styles["save-User-btn"]}
                    onClick={openConfirmationModal}
                  />
                </Col>
              </Row>
            </>
          }
        />
      </Container>
    </>
  );
};

export default UserProfileModal;
