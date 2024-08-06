import React, { useState, useEffect } from "react";
import { Button, Modal, TextField } from "./../../components/elements";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./UserInfoModal.module.css";
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import UserConfirmationModal from "../userConfirmationModal/UserConfirmationModal";
import { getUserInfoMainApi } from "../../store/Actions/GlobalAdminDashboardActions";

const UserProfileModal = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ModalReducer = useSelector((state) => state.modal);
  const getUserInfoData = useSelector(
    (state) => state.globalAdminDashboardReducer.getUserInfoData
  );

  const userEmail = localStorage.getItem("userEmail");
  const orgName = localStorage.getItem("adminname");

  const [errorBar, setErrorBar] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState("US");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [userDataInfo, setUserDataInfo] = useState([]);

  const [userInfoState, setUserInfoState] = useState({
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

  useEffect(() => {
    if (getUserInfoData && getUserInfoData?.result?.data) {
      const { mobileCode, mobileNumber, fK_WorldCountryID } =
        getUserInfoData.result.data;
      const country = Object.keys(countryNameforPhoneNumber).find(
        (key) => countryNameforPhoneNumber[key].secondary === mobileCode
      );

      setUserInfoState({
        CountryCode: {
          value: fK_WorldCountryID,
          errorMessage: "",
          errorStatus: false,
        },
        Number: {
          value: mobileNumber,
          errorMessage: "",
          errorStatus: false,
        },
      });

      setUserDataInfo(getUserInfoData?.result?.data);
      setSelected(country);
    }
  }, [getUserInfoData]);

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

  const handleClose = () => {
    dispatch(userInfoOpenModal(false));
    setUserInfoState({
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
    setSelected("US");
    setErrorBar(false);
    setSubmitted(false);
  };

  const handleSelect = (country) => {
    setSelected(country);
    const selectedCountry = countryNameforPhoneNumber[country];
    setSelectedCountry(selectedCountry);
    setUserInfoState({
      ...userInfoState,
      CountryCode: {
        value: selectedCountry.id,
      },
    });
  };

  const openConfirmationModal = () => {
    setSubmitted(true);
    if (
      userInfoState.Number.value !== "" &&
      userInfoState.CountryCode.value !== 0
    ) {
      setErrorBar(false);
      dispatch(userInfoOpenModal(false));
      dispatch(userConifrmationOpenModal(true));
    } else {
      setErrorBar(true);
    }
  };

  const onClickRevert = () => {
    if (getUserInfoData && getUserInfoData?.result?.data) {
      const { mobileCode, mobileNumber, fK_WorldCountryID } =
        getUserInfoData.result.data;
      const country = Object.keys(countryNameforPhoneNumber).find(
        (key) => countryNameforPhoneNumber[key].secondary === mobileCode
      );

      setUserInfoState({
        CountryCode: {
          value: fK_WorldCountryID,
          errorMessage: "",
          errorStatus: false,
        },
        Number: {
          value: mobileNumber,
          errorMessage: "",
          errorStatus: false,
        },
      });

      setUserDataInfo(getUserInfoData?.result?.data);
      setSelected(country);
      setSubmitted(false);
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
                      {orgName}
                    </label>
                  </Col>
                  <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                    <label className={styles["title-user-name"]}>
                      {t("Email")}
                    </label>
                    <label className={styles["main-user-name"]}>
                      {userEmail}
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
                      value={userInfoState.CountryCode.value}
                      fullWidth={false}
                      searchable={true}
                      placeholder={"Select Co...."}
                      customLabels={countryNameforPhoneNumber}
                      className={styles["userProfileFlagSelect"]}
                    />

                    <Row className="mt-4">
                      <Col>
                        <p
                          className={
                            errorBar &&
                            userInfoState.CountryCode.value === 0 &&
                            submitted === true
                              ? styles["errorMessage"]
                              : styles["errorMessage-hidden"]
                          }
                        >
                          {t("Please-Select-this-field")}
                        </p>
                      </Col>
                    </Row>
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
                  </Col>
                </Row>
              </Container>
            </>
          }
          ModalFooter={
            <Row className="mb-5 mt-2">
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex justify-content-start"
              >
                <Button
                  text={t("Revert")}
                  className={styles["reset-User-btn"]}
                  onClick={onClickRevert}
                />
              </Col>
              <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
                <Button
                  text={t("Update")}
                  className={styles["save-User-btn"]}
                  onClick={openConfirmationModal}
                />
              </Col>
            </Row>
          }
        />
      </Container>
      <UserConfirmationModal userInfoState={userInfoState} />
    </>
  );
};

export default UserProfileModal;
