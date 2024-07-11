import React, { useEffect, useState } from "react";
import styles from "./GlobalLevelSettings.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import line from "../../assets/images/OutletImages/Line 27.svg";
import MeetingIcon from "../../assets/images/OutletImages/MeetingSetting.svg";
import Calender from "../../assets/images/OutletImages/CalenderSetting.svg";
import Committee from "../../assets/images/OutletImages/CommitteSetting.svg";
import SecurityIcon from "../../assets/images/OutletImages/SecuritySetting.svg";
import TodoIcon from "../../assets/images/OutletImages/Todo_icon.svg";
import { Button, TextField } from "../../components/elements";
import Profilepicture from "../../assets/images/OutletImages/newprofile.png";

import { Checkbox, InputNumber } from "antd";
import {
  regexOnlyCharacters,
  regexOnlyForNumberNCharacters,
  regexOnlyNumbers,
} from "../../common/functions/Regex";
import {
  getGlobalLevelConfigurationsApi,
  UpdateGlobalLevelConfigurationApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
const GlobalLevelSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getGlobalLevelConfigData = useSelector(
    (state) => state.globalAdminDashboardReducer.getGlobalLevelConfigData
  );

  // const new states for Global Configuration
  const [mailState, setMailState] = useState(true);
  const [functionalState, setFunctionalState] = useState(false);
  const [userAccountState, setUserAccountState] = useState(false);
  const [organizationAccountState, setOrganizationAccountState] =
    useState(false);
  const [smsSettingState, setSmsSettingState] = useState(false);

  // useEffect to hit Api of Global Level Configuration
  useEffect(() => {
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getGlobalLevelConfigurationsApi({ navigate, t }));
  }, [navigate, t]);

  const [newData, setNewData] = useState({
    MailUser: {
      configKey: "MailUser",
      configValue: "no-reply@axis-work.com",
    },
    MailDisplayName: {
      configKey: "MailDisplayName",
      configValue: "Diskus",
    },
    MailPassword: {
      configKey: "MailPassword",
      configValue: "rj+MJQ[Z}Qyg",
    },
    MailHost: {
      configKey: "MailHost",
      configValue: "mail.axis-work.com",
    },
    MailPort: {
      configKey: "MailPort",
      configValue: "587",
    },
    HBL_URL_FOR_EMAIL: {
      configKey: "HBL_URL_FOR_EMAIL",
      configValue: "https://www.hbl.com",
    },
    MailEnableSSL: {
      configKey: "MailEnableSSL",
      configValue: "false",
    },
    MailIsSmtpNetworkDeliveryMethodEnabled: {
      configKey: "MailIsSmtpNetworkDeliveryMethodEnabled",
      configValue: "false",
    },
    LoginURL: {
      configKey: "LoginURL",
      configValue: "http://192.168.18.241:9026",
    },
    MaxAllowedFailedLoginAttempts: {
      configKey: "MaxAllowedFailedLoginAttempts",
      configValue: "3",
    },
    IdleTimeout: {
      configKey: "IdleTimeout",
      configValue: "720",
    },
    AccountDormantDays: {
      configKey: "AccountDormantDays",
      configValue: "90",
    },
    TokenValidationURL: {
      configKey: "TokenValidationURL",
      configValue: "http://192.168.18.241:11001/ERM_Auth",
    },
    DocumentPath: {
      configKey: "DocumentPath",
      configValue: "C:\\Diskus\\Services\\Setting",
    },
    DEFAULT_PROFILE_PICTURE_ORIGINAL_NAME: {
      configKey: "DEFAULT_PROFILE_PICTURE_ORIGINAL_NAME",
      configValue: "logo.png",
    },
    DEFAULT_PROFILE_PICTURE_DISPLAY_NAME: {
      configKey: "DEFAULT_PROFILE_PICTURE_DISPLAY_NAME",
      configValue: "logo.png",
    },
    OTP_RECREATION_TIME_LEFT: {
      configKey: "OTP_RECREATION_TIME_LEFT",
      configValue: "5",
    },
    DATA_ARCHIVING_GRACE_DAY: {
      configKey: "DATA_ARCHIVING_GRACE_DAY",
      configValue: "30",
    },
    Invoice_Clearance_Days_Margin: {
      configKey: "Invoice_Clearance_Days_Margin",
      configValue: "10",
    },
    Late_Fees_Days_Margin: {
      configKey: "Late_Fees_Days_Margin",
      configValue: "5",
    },
    Days_Before_Expiry_For_Invoice: {
      configKey: "Days_Before_Expiry_For_Invoice",
      configValue: "2",
    },
    MQTT_IPAdress: {
      configKey: "MQTT_IPAdress",
      configValue: "192.168.18.241",
    },
    MQTT_Port: {
      configKey: "MQTT_Port",
      configValue: "11111",
    },
    SMS_SERVICE_USERNAME: {
      configKey: "SMS_SERVICE_USERNAME",
      configValue: "923008385450",
    },
    SMS_SERVICE_PASSWORD: {
      configKey: "SMS_SERVICE_PASSWORD",
      configValue: "8547",
    },
    SMS_SERVICE_SENDER: {
      configKey: "SMS_SERVICE_SENDER",
      configValue: "Diskus",
    },
    SMS_SERVICE_BUNDLE_ID: {
      configKey: "SMS_SERVICE_BUNDLE_ID",
      configValue: "1",
    },
    TALK_URL: {
      configKey: "TALK_URL",
      configValue: "http://192.168.18.241:11014/Talk",
    },
    TODO_URL: {
      configKey: "TODO_URL",
      configValue: "http://192.168.18.241:11003/ToDoList",
    },
    MEETING_URL: {
      configKey: "MEETING_URL",
      configValue: "http://192.168.18.241:11002/Meeting",
    },
    TIME_ZONE_API_BASE_URL: {
      configKey: "TIME_ZONE_API_BASE_URL",
      configValue: "http://api.timezonedb.com/v2.1/",
    },
    TIME_ZONE_API_KEY: {
      configKey: "TIME_ZONE_API_KEY",
      configValue: "ZIB76EZFWELX",
    },
    MaxOTPFailedAttemptCount: {
      configKey: "MaxOTPFailedAttemptCount",
      configValue: "3",
    },
    GOOGLE_CALENDER_URL: {
      configKey: "GOOGLE_CALENDER_URL",
      configValue: "https://www.googleapis.com/calendar/v3/calendars",
    },
    Meeting_Started_Minutes_Ago: {
      configKey: "Meeting_Started_Minutes_Ago",
      configValue: "4",
    },
    Join_Meeting_Before_Minutes: {
      configKey: "Join_Meeting_Before_Minutes",
      configValue: "15",
    },
    Share_Folder_Base_Link: {
      configKey: "Share_Folder_Base_Link",
      configValue: "http://localhost:3000/#/",
    },
    Share_Folder_Sub_Link: {
      configKey: "Share_Folder_Sub_Link",
      configValue: "DisKus/dataroom?action=",
    },
    RSVP_BASE_URL: {
      configKey: "RSVP_BASE_URL",
      configValue: "http://localhost:3000/#/",
    },
    RSVP_SERVICE_URL: {
      configKey: "RSVP_SERVICE_URL",
      configValue: "DisKus/Meeting/Useravailabilityformeeting?action=",
    },
    MICROSOFT_CALENDER_URL: {
      configKey: "MICROSOFT_CALENDER_URL",
      configValue: "https://graph.microsoft.com/v1.0/me/calendar/events",
    },
    DataRoomApiUrl: {
      configKey: "DataRoomApiUrl",
      configValue: "http://localhost:11017/DataRoom",
    },
    LibreOfficePath: {
      configKey: "LibreOfficePath",
      configValue:
        "D:\\Diskus\\Services\\Third Party Libraries\\LibreOfficePortable\\App\\libreoffice\\program\\soffice.exe",
    },
    SignatureDocumentsFolderName: {
      configKey: "SignatureDocumentsFolderName",
      configValue: "Signature Flow Documents",
    },

    PROPOSE_MEETING_PARTICIPANT_SUBLINK: {
      configKey: "PROPOSE_MEETING_PARTICIPANT_SUBLINK",
      configValue: "DisKus/Meeting/Meetingproposed?action=",
    },
    PROPOSE_MEETING_ORGANIZER_SUBLINK: {
      configKey: "PROPOSE_MEETING_ORGANIZER_SUBLINK",
      configValue: "DisKus/Meeting/Usermeetingproposedatespoll?action=",
    },

    Meeting_Extra_Time_Active: {
      configKey: "Meeting_Extra_Time_Active",
      configValue: "12",
    },
    Minute_Collab_Url: {
      configKey: "Minute_Collab_Url",
      configValue: "DisKus/Meeting?Meetingminutecollaborate_action=",
    },
    Agenda_Contributor_Add_Url: {
      configKey: "Agenda_Contributor_Add_Url",
      configValue: "DisKus/Meeting?Addagendacontributor_action=",
    },
    Agenda_Contributor_Update_Url: {
      configKey: "Agenda_Contributor_Update_Url",
      configValue: "DisKus/Meeting?Updateagendacontributor_action=",
    },
    Meeting_Organizer_Add_Url: {
      configKey: "Meeting_Organizer_Add_Url",
      configValue: "DisKus/Meeting?Addorganizer_action=",
    },
    Meeting_Organizer_Update_Url: {
      configKey: "Meeting_Organizer_Update_Url",
      configValue: "DisKus/Meeting?Updateorganizer_action=",
    },
    Meeting_Cancel_Url: {
      configKey: "Meeting_Cancel_Url",
      configValue: "DisKus/Meeting?Cancelmeeting_action=",
    },
    Meeting_Delete_Url: {
      configKey: "Meeting_Delete_Url",
      configValue: "DisKus/Meeting?Deletemeeting_action=",
    },
    Meeting_Update_Url: {
      configKey: "Meeting_Update_Url",
      configValue: "DisKus/Meeting?Updatemeeting_action=",
    },
    Meeting_Start_Url: {
      configKey: "Meeting_Start_Url",
      configValue: "DisKus/Meeting?Startmeeting_action=",
    },
    Poll_Expire_Url: {
      configKey: "Poll_Expire_Url",
      configValue: "DisKus/polling?PollExpire_action=",
    },
    Grp_Poll_Expire_Url: {
      configKey: "Grp_Poll_Expire_Url",
      configValue: "DisKus/groups?GroupPollExpire_action=",
    },
    Com_Poll_Expire_Url: {
      configKey: "Com_Poll_Expire_Url",
      configValue: "DisKus/committee?CommitteePollExpire_action=",
    },
    Poll_Published_Url: {
      configKey: "Poll_Published_Url",
      configValue: "DisKus/polling?PollPublished_action=",
    },
    Grp_Poll_Published_Url: {
      configKey: "Grp_Poll_Published_Url",
      configValue: "DisKus/groups?GroupPollPublished_action=",
    },
    Com_Poll_Published_Url: {
      configKey: "Com_Poll_Published_Url",
      configValue: "DisKus/committee?CommitteePollPublished_action=",
    },
    Poll_Updated_Url: {
      configKey: "Poll_Updated_Url",
      configValue: "DisKus/polling?PollUpdated_action=",
    },
    Grp_Poll_Updated_Url: {
      configKey: "Grp_Poll_Updated_Url",
      configValue: "DisKus/groups?GroupPollUpdate_action=",
    },
    Com_Poll_Updated_Url: {
      configKey: "Com_Poll_Updated_Url",
      configValue: "DisKus/committee?CommitteePollUpdate_action=",
    },
    Resolution_Reminder_Url: {
      configKey: "Resolution_Reminder_Url",
      configValue: "DisKus/resolution?ResolutionReminder_action=",
    },
    Org_Status_Enabled_Url: {
      configKey: "Org_Status_Enabled_Url",
      configValue: "Admin?OrganizationSubscriptionEnable_action=",
    },
    Org_Sub_Status_Enabled_Url: {
      configKey: "Org_Sub_Status_Enabled_Url",
      configValue: "Admin?OrganizationStatusEnable_action=",
    },
    EdfaPayRedirectionUrl: {
      configKey: "EdfaPayRedirectionUrl",
      configValue: "http://192.168.18.241:2024?Payment_action=",
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
    numberOnlyState: /^[0-9]+$/,
    Meeting_Started_Minutes_Ago: /^[0-9]+$/,
    Join_Meeting_Before_Minutes: /^[0-9]+$/,
    Meeting_Extra_Time_Active: /^[0-9]+$/,
    MaxAllowedFailedLoginAttempts: /^[0-9]+$/,
    IdleTimeout: /^[0-9]+$/,
    AccountDormantDays: /^[0-9]+$/,
    MaxOTPFailedAttemptCount: /^[0-9]+$/,
    OTP_RECREATION_TIME_LEFT: /^[0-9]+$/,
    DATA_ARCHIVING_GRACE_DAY: /^[0-9]+$/,
    Invoice_Clearance_Days_Margin: /^[0-9]+$/,
    Late_Fees_Days_Margin: /^[0-9]+$/,
    Days_Before_Expiry_For_Invoice: /^[0-9]+$/,
    SMS_SERVICE_PASSWORD: /^[0-9]+$/,
    SMS_SERVICE_BUNDLE_ID: /^[0-9]+$/,
    MailDisplayName: /^[a-zA-Z\s]+$/,
  };

  // Single onChange Handler for Global Admin
  const onChangeHandlerGlobal = (key, value) => {
    if (
      regexPatterns[key.configKey] &&
      !regexPatterns[key.configKey].test(value)
    ) {
      console.error(`Invalid value for ${key.configKey}`);
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
        console.error(`Key "${key}" does not exist in the state.`);
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
    // console.log("Payload:", JSON.stringify(payload, null, 2));
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
                      src={SecurityIcon}
                      alt=""
                      width="25.51px"
                      height="30.69px"
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
                      src={TodoIcon}
                      alt=""
                      width="30px"
                      height="30px"
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
                      src={MeetingIcon}
                      alt=""
                      width="35.79px"
                      height="27.3px"
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
                      src={Calender}
                      alt=""
                      width="28.47px"
                      height="28.47px"
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
                      src={Committee}
                      alt=""
                      width="35.8px"
                      height="34.63px"
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
                        // change={changeHandler}
                        // value={functionalSettingState.dataroomlength.value}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Video-ringer-timeout")}
                      </span>
                      <TextField
                        name="videoringer"
                        // change={changeHandler}
                        // value={functionalSettingState.videoRinger.value}
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
                        // change={changeHandler}
                        // value={functionalSettingState.numberuploaded.value}
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

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Default-organizer-name")}
                      </span>
                      <br />
                      <img src={Profilepicture} width={50} />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        {t("Default-profile-name")}
                      </span>
                      <br />
                      <img src={Profilepicture} width={50} />
                    </Col>
                  </Row>
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
    </section>
  );
};

export default GlobalLevelSettings;
