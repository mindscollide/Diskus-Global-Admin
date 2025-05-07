import React, { useEffect, useState } from "react";
import styles from "./GlobalLevelSettings.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import line from "../../assets/images/OutletImages/Line 27.svg";
import MailSettings from "../../assets/images/OutletImages/MailSettings.svg";
import Calender from "../../assets/images/OutletImages/CalenderSetting.svg";
import Committee from "../../assets/images/OutletImages/CommitteSetting.svg";
import FunctionalSettings from "../../assets/images/OutletImages/FunctionalSettings.svg";
import UserAccountsetting from "../../assets/images/OutletImages/UserAccountsetting.svg";
import OrganizationAccountSettings from "../../assets/images/OutletImages/OrganizationAccountSettings.svg";
import SMSSettings from "../../assets/images/OutletImages/SMSSettings.svg";
import TodoIcon from "../../assets/images/OutletImages/Todo_icon.svg";
import { Button, Notification, TextField } from "../../components/elements";
import Profilepicture from "../../assets/images/OutletImages/newprofile.png";

import { Checkbox } from "antd";
import {
  onlyCharactersPattern,
  onlyNumbersPattern,
  regexOnlyCharacters,
  regexOnlyForNumberNCharacters,
  regexOnlyNumbers,
} from "../../common/functions/Regex";
import {
  getGlobalLevelConfigurationsApi,
  UpdateGlobalLevelConfigurationApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import {
  globalAdminDashBoardLoader,
  resetResponseMessage,
} from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
const GlobalLevelSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getGlobalLevelConfigData = useSelector(
    (state) => state.globalAdminDashboardReducer.getGlobalLevelConfigData
  );

  // for response message
  const Responsemessage = useSelector(
    (state) => state.globalAdminDashboardReducer.Responsemessage
  );

  console.log(getGlobalLevelConfigData, "ajgvajsvjavjavsjv");

  // const new states for Global Configuration
  const [mailState, setMailState] = useState(true);
  const [functionalState, setFunctionalState] = useState(false);
  const [userAccountState, setUserAccountState] = useState(false);
  const [organizationAccountState, setOrganizationAccountState] =
    useState(false);
  const [smsSettingState, setSmsSettingState] = useState(false);

  // for toaste notification
  const [openNotification, setOpenNotification] = useState({
    historyFlag: false,
    historyNotification: "",
    severity: "none",
  });

  // useEffect to hit Api of Global Level Configuration
  useEffect(() => {
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getGlobalLevelConfigurationsApi({ navigate, t }));
  }, [navigate, t]);

  const [newData, setNewData] = useState({
    MailUser: {
      configKey: "MailUser",
      configValue: "",
    },
    MailDisplayName: {
      configKey: "MailDisplayName",
      configValue: "",
    },
    MailPassword: {
      configKey: "MailPassword",
      configValue: "",
    },
    MailHost: {
      configKey: "MailHost",
      configValue: "",
    },
    MailPort: {
      configKey: "MailPort",
      configValue: "",
    },
    HBL_URL_FOR_EMAIL: {
      configKey: "HBL_URL_FOR_EMAIL",
      configValue: "",
    },
    MailEnableSSL: {
      configKey: "MailEnableSSL",
      configValue: "",
    },
    MailIsSmtpNetworkDeliveryMethodEnabled: {
      configKey: "MailIsSmtpNetworkDeliveryMethodEnabled",
      configValue: "",
    },
    LoginURL: {
      configKey: "LoginURL",
      configValue: "",
    },
    MaxAllowedFailedLoginAttempts: {
      configKey: "MaxAllowedFailedLoginAttempts",
      configValue: "",
    },
    IdleTimeout: {
      configKey: "IdleTimeout",
      configValue: "",
    },
    AccountDormantDays: {
      configKey: "AccountDormantDays",
      configValue: "",
    },

    DEFAULT_PROFILE_PICTURE_ORIGINAL_NAME: {
      configKey: "DEFAULT_PROFILE_PICTURE_ORIGINAL_NAME",
      configValue: "",
    },
    DEFAULT_PROFILE_PICTURE_DISPLAY_NAME: {
      configKey: "DEFAULT_PROFILE_PICTURE_DISPLAY_NAME",
      configValue: "",
    },
    OTP_RECREATION_TIME_LEFT: {
      configKey: "OTP_RECREATION_TIME_LEFT",
      configValue: "",
    },
    DATA_ARCHIVING_GRACE_DAY: {
      configKey: "DATA_ARCHIVING_GRACE_DAY",
      configValue: "",
    },
    Invoice_Clearance_Days_Margin: {
      configKey: "Invoice_Clearance_Days_Margin",
      configValue: "",
    },
    Late_Fees_Days_Margin: {
      configKey: "Late_Fees_Days_Margin",
      configValue: "",
    },
    Days_Before_Expiry_For_Invoice: {
      configKey: "Days_Before_Expiry_For_Invoice",
      configValue: "",
    },

    SMS_SERVICE_USERNAME: {
      configKey: "SMS_SERVICE_USERNAME",
      configValue: "",
    },
    SMS_SERVICE_PASSWORD: {
      configKey: "SMS_SERVICE_PASSWORD",
      configValue: "",
    },
    SMS_SERVICE_SENDER: {
      configKey: "SMS_SERVICE_SENDER",
      configValue: "",
    },
    SMS_SERVICE_BUNDLE_ID: {
      configKey: "SMS_SERVICE_BUNDLE_ID",
      configValue: "",
    },
    MaxOTPFailedAttemptCount: {
      configKey: "MaxOTPFailedAttemptCount",
      configValue: "",
    },
    Meeting_Started_Minutes_Ago: {
      configKey: "Meeting_Started_Minutes_Ago",
      configValue: "",
    },
    Number_Of_Recently_Uploaded: {
      configKey: "Number_Of_Recently_Uploaded",
      configValue: "",
    },
    Join_Meeting_Before_Minutes: {
      configKey: "Join_Meeting_Before_Minutes",
      configValue: "",
    },
    DATA_ROOM_LAZY_LOADING_LENGTH: {
      configKey: "DATA_ROOM_LAZY_LOADING_LENGTH",
      configValue: "",
    },
    Video_Call_Ringer_Timeout_Seconds: {
      configKey: "Video_Call_Ringer_Timeout_Seconds",
      configValue: "",
    },
    Share_Folder_Base_Link: {
      configKey: "Share_Folder_Base_Link",
      configValue: "",
    },
    RSVP_BASE_URL: {
      configKey: "RSVP_BASE_URL",
      configValue: "",
    },
    Meeting_Extra_Time_Active: {
      configKey: "Meeting_Extra_Time_Active",
      configValue: "",
    },
  });

  // useEffect to set Data from reducer of global Level Setting
  useEffect(() => {
    if (
      getGlobalLevelConfigData !== null &&
      getGlobalLevelConfigData !== undefined
    ) {
      const { result } = getGlobalLevelConfigData;
      if (result && result.configuration && result.configuration.length > 0) {
        setNewData((prevData) => {
          // Create a copy of the previous state
          const updatedData = { ...prevData };
          // Iterate over each configuration from the API response
          result.configuration.forEach((configData) => {
            // Update the configuration in the state using its configKey as the key
            updatedData[configData.configKey] = {
              configKey: configData.configKey,
              configValue: configData.configValue,
            };
            console.log(updatedData, "hasvjvdjadvasjhdv");
          });
          return updatedData; // Return the updated state
        });
      }
    }
  }, [getGlobalLevelConfigData]);

  useEffect(() => {
    if (
      Responsemessage !== "" &&
      Responsemessage !== t("No-data-available") &&
      Responsemessage !== "Success" &&
      Responsemessage !== t("Something-went-wrong") &&
      Responsemessage !== "No Data available"
    ) {
      setOpenNotification({
        historyFlag: true,
        historyNotification: Responsemessage,
        severity: t("Updated-Successfully") ? "success" : "error",
      });

      setTimeout(() => {
        dispatch(resetResponseMessage());
        setOpenNotification({
          ...openNotification,
          historyFlag: false,
          historyNotification: "",
          severity: "none",
        });
      }, 4000);
    }
  }, [Responsemessage]);

  // to open mail Tab
  const openMailTab = () => {
    setMailState(true);
    setFunctionalState(false);
    setUserAccountState(false);
    setOrganizationAccountState(false);
    setSmsSettingState(false);
  };

  // to Open Functional setting tab
  const openFunctionalTab = () => {
    setMailState(false);
    setFunctionalState(true);
    setUserAccountState(false);
    setOrganizationAccountState(false);
    setSmsSettingState(false);
  };

  // to Open User Account Setting tab
  const openAccountSettingTab = () => {
    setMailState(false);
    setFunctionalState(false);
    setUserAccountState(true);
    setOrganizationAccountState(false);
    setSmsSettingState(false);
  };

  // to Open Organization Account Tab
  const openOrganizationAccountTab = () => {
    setMailState(false);
    setFunctionalState(false);
    setUserAccountState(false);
    setOrganizationAccountState(true);
    setSmsSettingState(false);
  };

  //to Open SMS Settings Tab
  const openSettingTab = () => {
    setMailState(false);
    setFunctionalState(false);
    setUserAccountState(false);
    setOrganizationAccountState(false);
    setSmsSettingState(true);
  };

  const regexPatterns = {
    numberOnlyState: onlyNumbersPattern,
    Meeting_Started_Minutes_Ago: onlyNumbersPattern,
    Number_Of_Recently_Uploaded: onlyNumbersPattern,
    Join_Meeting_Before_Minutes: onlyNumbersPattern,
    DATA_ROOM_LAZY_LOADING_LENGTH: onlyNumbersPattern,
    Video_Call_Ringer_Timeout_Seconds: onlyNumbersPattern,
    Meeting_Extra_Time_Active: onlyNumbersPattern,
    MaxAllowedFailedLoginAttempts: onlyNumbersPattern,
    IdleTimeout: onlyNumbersPattern,
    AccountDormantDays: onlyNumbersPattern,
    MaxOTPFailedAttemptCount: onlyNumbersPattern,
    OTP_RECREATION_TIME_LEFT: onlyNumbersPattern,
    DATA_ARCHIVING_GRACE_DAY: onlyNumbersPattern,
    Invoice_Clearance_Days_Margin: onlyNumbersPattern,
    Late_Fees_Days_Margin: onlyNumbersPattern,
    Days_Before_Expiry_For_Invoice: onlyNumbersPattern,
    SMS_SERVICE_PASSWORD: onlyNumbersPattern,
    SMS_SERVICE_BUNDLE_ID: onlyNumbersPattern,
    MailDisplayName: onlyCharactersPattern,
  };

  // Single onChange Handler for Global Admin
  const onChangeHandlerGlobal = (key, value) => {
    if (
      value !== "" &&
      regexPatterns[key.configKey] &&
      !regexPatterns[key.configKey].test(value)
    ) {
      return;
    }

    setNewData((prevData) => {
      if (prevData.hasOwnProperty(key.configKey)) {
        const updatedData = { ...prevData };
        updatedData[key.configKey] = {
          configKey: key.configKey,
          configValue: String(value),
        };
        return updatedData;
      } else {
        return prevData;
      }
    });
  };

  // update handler for global level setting
  const updateGlobalLevelSettingHandler = () => {
    // Transform the state data into the required format
    const transformedData = Object.keys(newData).map((key) => {
      return {
        ConfigKey: newData[key].configKey,
        ConfigValue: newData[key].configValue,
      };
    });
    // Create the payload object
    const data = {
      Configs: transformedData,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(UpdateGlobalLevelConfigurationApi({ data, navigate, t }));
    // Log the payload to the console
  };

  return (
    <section className={styles["UserConfigsContainer"]}>
      <Row className="mt-3">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex gap-3 align-items-center"
        >
          <span className={styles["UserLevelConfig_Heading"]}>
            {t("Global-level-configuration")}
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className={styles["Padding_around_class"]}>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={3}>
              <div onClick={openMailTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={MailSettings}
                      alt=""
                      width="35.8px"
                      height="33.63px"
                    />
                  </Col>
                  <Col lg={10} md={10} sm={12}>
                    <span
                      className={
                        mailState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Mail-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openFunctionalTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={FunctionalSettings}
                      alt=""
                      width="40.8px"
                      height="38.63px"
                    />
                  </Col>
                  <Col lg={10} md={10} sm={12}>
                    <span
                      className={
                        functionalState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Functional-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openAccountSettingTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={UserAccountsetting}
                      alt=""
                      width="37.8px"
                      height="35.63px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        userAccountState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("User-account-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div
                className="cursor-pointer"
                onClick={openOrganizationAccountTab}
              >
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={OrganizationAccountSettings}
                      alt=""
                      width="40.8px"
                      height="40.63px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        organizationAccountState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Organization-account-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openSettingTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={SMSSettings}
                      alt=""
                      width="40.8px"
                      height="38.63px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        smsSettingState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Sms-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />
            </Col>
            <Col lg={1} md={1} sm={1} className="d-flex justify-content-center">
              <img
                draggable="false"
                alt=""
                src={line}
                className={styles["user-setting-row"]}
              />
            </Col>
            <Col lg={5} md={5} sm={5} className="m-0 p-0 justify-content-start">
              {mailState ? (
                <>
                  <Row className="mt-2">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Mail-host")}
                      </span>
                      <TextField
                        name="mailhost"
                        value={newData.MailHost.configValue}
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailHost,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Mail-port")}
                      </span>
                      <TextField
                        name="mailport"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailPort,
                            e.target.value
                          )
                        }
                        value={newData.MailPort.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Mail-user")}
                      </span>
                      <TextField
                        name="mailuser"
                        value={newData.MailUser.configValue}
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailUser,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Mail-display-name")}
                      </span>
                      <TextField
                        name="mailname"
                        value={newData.MailDisplayName.configValue}
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailDisplayName,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Mail-password")}
                      </span>
                      <TextField
                        name="mailpassword"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailPassword,
                            e.target.value
                          )
                        }
                        value={newData.MailPassword.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <Checkbox
                        onChange={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailEnableSSL,
                            e.target.checked
                          )
                        }
                        checked={
                          newData.MailEnableSSL.configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Mail-enable-SSL")}
                        </span>
                      </Checkbox>
                    </Col>

                    <Col lg={6} md={6} sm={6}>
                      <Checkbox
                        onChange={(e) =>
                          onChangeHandlerGlobal(
                            newData.MailIsSmtpNetworkDeliveryMethodEnabled,
                            e.target.checked
                          )
                        }
                        checked={
                          newData.MailIsSmtpNetworkDeliveryMethodEnabled
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Mail-is-smtp-network")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Login-url")}
                      </span>
                      <TextField
                        name="loginurl"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.LoginURL,
                            e.target.value
                          )
                        }
                        value={newData.LoginURL.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("URL-to-be-used-in-email")}
                      </span>
                      <TextField
                        name="hblurlemail"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.HBL_URL_FOR_EMAIL,
                            e.target.value
                          )
                        }
                        value={newData.HBL_URL_FOR_EMAIL.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {functionalState ? (
                <>
                  <Row className="mt-2">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Dataroom-lazy-loading-length")}
                      </span>
                      <TextField
                        labelClass="d-none"
                        name="dataroom"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.DATA_ROOM_LAZY_LOADING_LENGTH,
                            e.target.value
                          )
                        }
                        value={
                          newData.DATA_ROOM_LAZY_LOADING_LENGTH.configValue
                        }
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Video-ringer-timeout")}
                      </span>
                      <TextField
                        name="videoringer"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Video_Call_Ringer_Timeout_Seconds,
                            e.target.value
                          )
                        }
                        value={
                          newData.Video_Call_Ringer_Timeout_Seconds.configValue
                        }
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Meeting-started-minutes")}
                      </span>
                      <TextField
                        name="meetingminutes"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Meeting_Started_Minutes_Ago,
                            e.target.value
                          )
                        }
                        value={newData.Meeting_Started_Minutes_Ago.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Number-of-recently-uploaded")}
                      </span>
                      <TextField
                        name="numberUploaded"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Number_Of_Recently_Uploaded,
                            e.target.value
                          )
                        }
                        value={newData.Number_Of_Recently_Uploaded.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Join-meeting-before-minutes")}
                      </span>
                      <TextField
                        name="joinMeeting"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Join_Meeting_Before_Minutes,
                            e.target.value
                          )
                        }
                        value={newData.Join_Meeting_Before_Minutes.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Meeting-extra-time-active")}
                      </span>
                      <TextField
                        name="meetingExtra"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Meeting_Extra_Time_Active,
                            e.target.value
                          )
                        }
                        value={newData.Meeting_Extra_Time_Active.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("RSVP-base-url")}
                      </span>
                      <TextField
                        name="rsvpUrl"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.RSVP_BASE_URL,
                            e.target.value
                          )
                        }
                        value={newData.RSVP_BASE_URL.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Share-folder-base-link")}
                      </span>
                      <TextField
                        name="shareFolder"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Share_Folder_Base_Link,
                            e.target.value
                          )
                        }
                        value={newData.Share_Folder_Base_Link.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {userAccountState ? (
                <>
                  <Row className="mt-2">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Max-allowed-failed-attempts")}
                      </span>
                      <TextField
                        name="maxallowed"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MaxAllowedFailedLoginAttempts,
                            e.target.value
                          )
                        }
                        value={
                          newData.MaxAllowedFailedLoginAttempts.configValue
                        }
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Idle-timeout")}
                      </span>
                      <TextField
                        name="idletimeout"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.IdleTimeout,
                            e.target.value
                          )
                        }
                        value={newData.IdleTimeout.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Account-dormant-days")}
                      </span>
                      <TextField
                        name="accountdormant"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.AccountDormantDays,
                            e.target.value
                          )
                        }
                        value={newData.AccountDormantDays.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Max-OTP-failed-attempt-count")}
                      </span>
                      <TextField
                        name="otpcount"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.MaxOTPFailedAttemptCount,
                            e.target.value
                          )
                        }
                        value={newData.MaxOTPFailedAttemptCount.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("OTP-recreation-time-left")}
                      </span>
                      <TextField
                        name="otprecreation"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.OTP_RECREATION_TIME_LEFT,
                            e.target.value
                          )
                        }
                        value={newData.OTP_RECREATION_TIME_LEFT.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  {/* <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Default-organizer-name")}
                      </span>
                      <br />
                      <img
                        src={newData.DEFAULT_PROFILE_PICTURE_ORIGINAL_NAME}
                        width={50}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Default-profile-name")}
                      </span>
                      <br />
                      <img
                        src={newData.DEFAULT_PROFILE_PICTURE_DISPLAY_NAME}
                        width={50}
                      />
                    </Col>
                  </Row> */}
                </>
              ) : null}
              {organizationAccountState ? (
                <>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Data-archiving-grace-day")}
                      </span>
                      <TextField
                        name="dataarchiving"
                        value={newData.DATA_ARCHIVING_GRACE_DAY.configValue}
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.DATA_ARCHIVING_GRACE_DAY,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Invoice-clearence-days-magin")}
                      </span>
                      <TextField
                        name="invoiceclearence"
                        value={
                          newData.Invoice_Clearance_Days_Margin.configValue
                        }
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Invoice_Clearance_Days_Margin,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Late-fees-days-margin")}
                      </span>
                      <TextField
                        name="latefees"
                        value={newData.Late_Fees_Days_Margin.configValue}
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Late_Fees_Days_Margin,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Days-before-expiry-for-invoice")}
                      </span>
                      <TextField
                        name="daysexpiry"
                        value={
                          newData.Days_Before_Expiry_For_Invoice.configValue
                        }
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.Days_Before_Expiry_For_Invoice,
                            e.target.value
                          )
                        }
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {smsSettingState ? (
                <>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Sms-service-username")}
                      </span>
                      <TextField
                        name="smsserviceuser"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.SMS_SERVICE_USERNAME,
                            e.target.value
                          )
                        }
                        value={newData.SMS_SERVICE_USERNAME.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Sms-service-password")}
                      </span>
                      <TextField
                        name="smsservicepass"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.SMS_SERVICE_PASSWORD,
                            e.target.value
                          )
                        }
                        value={newData.SMS_SERVICE_PASSWORD.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Sms-service-sender")}
                      </span>
                      <TextField
                        name="smsservicesender"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.SMS_SERVICE_SENDER,
                            e.target.value
                          )
                        }
                        value={newData.SMS_SERVICE_SENDER.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Sms-service-bundle-Id")}
                      </span>
                      <TextField
                        name="smsservicebundle"
                        change={(e) =>
                          onChangeHandlerGlobal(
                            newData.SMS_SERVICE_BUNDLE_ID,
                            e.target.value
                          )
                        }
                        value={newData.SMS_SERVICE_BUNDLE_ID.configValue}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
            </Col>
            <Col lg={1} md={1} sm={1} className="d-flex justify-content-center">
              <img
                draggable="false"
                alt=""
                src={line}
                className={styles["user-setting-row"]}
              />
            </Col>
            <Col lg={2} md={2} sm={2} className="m-0 p-0">
              {organizationAccountState ? <></> : null}
              {mailState ? <></> : null}

              {userAccountState ? <></> : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-end">
          <Button
            text={t("Update")}
            className={styles["New_settings_Update_Button"]}
            onClick={updateGlobalLevelSettingHandler}
          />
        </Col>
      </Row>

      <Notification
        show={openNotification.historyFlag}
        hide={setOpenNotification}
        message={openNotification.historyNotification}
        severity={openNotification.severity}
        notificationClass={
          openNotification.severity
            ? "notification-error"
            : "notification-success"
        }
      />
    </section>
  );
};

export default GlobalLevelSettings;
