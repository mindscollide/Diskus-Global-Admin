import React, { useState } from "react";
import styles from "./OrganizationLevelSettings.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import line from "../../assets/images/OutletImages/Line 27.svg";
import MeetingIcon from "../../assets/images/OutletImages/MeetingSetting.svg";
import Calender from "../../assets/images/OutletImages/CalenderSetting.svg";
import pollsIcon from "../../assets/images/OutletImages/pollsIcon.svg";
import Committee from "../../assets/images/OutletImages/CommitteSetting.svg";
import SecurityIcon from "../../assets/images/OutletImages/SecuritySetting.svg";
import TodoIcon from "../../assets/images/OutletImages/Todo_icon.svg";
import GroupIcon from "../../assets/images/OutletImages/GroupSetting.svg";
import ResolutionIcon from "../../assets/images/OutletImages/new_ResolutionIcon2.svg";
import { Button, Notification, TextField } from "../../components/elements";
import {
  MonthOptions,
  MonthValues,
  options,
} from "./OrganizationLevelSettingsValues";
import { Checkbox } from "antd";
import { useEffect } from "react";
import {
  GetSystemConfigurationsApi,
  UpdateAllOrganizationLevelConfigurationApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import {
  globalAdminDashBoardLoader,
  resetResponseMessage,
} from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
const OrganizationLevelSettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // for response message
  const Responsemessage = useSelector(
    (state) => state.globalAdminDashboardReducer.Responsemessage
  );

  const [securitystate, setSecuritystate] = useState(true);
  const [todo, setTodo] = useState(false);
  const [meetingsState, setmeetingsState] = useState(false);
  const [calender, setCalender] = useState(false);
  const [committee, setCommittee] = useState(false);
  const [group, setGroup] = useState(false);
  const [resolution, setResolution] = useState(false);
  const [polls, setpolls] = useState(false);
  const roleID = localStorage.getItem("roleID");
  const [timeZoneValue, setTimeZoneValue] = useState({
    label: "",
    value: "",
  });

  const GetSystemConfigurationsData = useSelector(
    (state) => state.globalAdminDashboardReducer.GetSystemConfigurationsData
  );

  console.log(
    GetSystemConfigurationsData,
    "GetSystemConfigurationsDataGetSystemConfigurationsData"
  );

  // api hit of getSystemConfirgurationsApi
  useEffect(() => {
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(GetSystemConfigurationsApi({ navigate, t }));
  }, []);

  // for toaste notification
  const [openNotification, setOpenNotification] = useState({
    historyFlag: false,
    historyNotification: "",
    severity: "none",
  });

  const [newData, setNewData] = useState({
    MAXIMUM_MEETING_DURATION: {
      configKey: "MAXIMUM_MEETING_DURATION",
      configValue: "",
    },
    EMAIL_ON_NEW_MEETINGS: {
      configKey: "EMAIL_ON_NEW_MEETINGS",
      configValue: "",
    },
    EMAIL_EDIT_MEETING: {
      configKey: "EMAIL_EDIT_MEETING",
      configValue: "",
    },
    PUSH_NOTIFICATION_ON_NEW_MEETING: {
      configKey: "PUSH_NOTIFICATION_ON_NEW_MEETING",
      configValue: "",
    },
    PUSH_NOTIFICATION_ON_EDIT_MEETINGS: {
      configKey: "PUSH_NOTIFICATION_ON_EDIT_MEETINGS",
      configValue: "",
    },
    SHOW_NOTIFICATION_ON_PARTICIPANT_JOINING: {
      configKey: "SHOW_NOTIFICATION_ON_PARTICIPANT_JOINING",
      configValue: "",
    },
    DORMANT_INACTIVE_USERS_FOR_DAYS: {
      configKey: "DORMANT_INACTIVE_USERS_FOR_DAYS",
      configValue: "",
    },
    IS_2FA_ENABLED: { configKey: "IS_2FA_ENABLED", configValue: "" },

    Email_When_Added_To_Committee: {
      configKey: "Email_When_Added_To_Committee",
      configValue: "",
    },
    Email_When_Removed_From_Committee: {
      configKey: "Email_When_Removed_From_Committee",
      configValue: "",
    },
    Email_When_Committee_Is_Dissolved_Archived: {
      configKey: "Email_When_Committee_Is_Dissolved_Archived",
      configValue: "",
    },
    Email_When_Committee_Is_InActive: {
      configKey: "Email_When_Committee_Is_InActive",
      configValue: "",
    },
    Email_When_Added_To_Group: {
      configKey: "Email_When_Added_To_Group",
      configValue: "",
    },
    Email_When_Removed_From_Group: {
      configKey: "Email_When_Removed_From_Group",
      configValue: "",
    },
    Email_When_Group_Is_Closed_Archived: {
      configKey: "Email_When_Group_Is_Closed_Archived",
      configValue: "",
    },
    Email_When_Group_Is_In_Active: {
      configKey: "Email_When_Group_Is_In_Active",
      configValue: "",
    },
    Email_On_Cancelled_Deleted_Meeting: {
      configKey: "Email_On_Cancelled_Deleted_Meeting",
      configValue: "",
    },
    Push_Notification_on_Cancelled_Deleted_Meeting: {
      configKey: "Push_Notification_on_Cancelled_Deleted_Meeting",
      configValue: "",
    },
    Push_Notification_when_Added_to_Committee: {
      configKey: "Push_Notification_when_Added_to_Committee",
      configValue: "",
    },
    Push_Notification_when_Removed_from_Committee: {
      configKey: "Push_Notification_when_Removed_from_Committee",
      configValue: "",
    },
    Push_Notification_when_Committee_is_Dissolved_Archived: {
      configKey: "Push_Notification_when_Committee_is_Dissolved_Archived",
      configValue: "",
    },
    Push_Notification_when_Committee_is_set_InActive: {
      configKey: "Push_Notification_when_Committee_is_set_InActive",
      configValue: "",
    },
    Push_Notification_when_Added_to_Group: {
      configKey: "Push_Notification_when_Added_to_Group",
      configValue: "",
    },
    Push_Notification_when_Removed_from_Group: {
      configKey: "Push_Notification_when_Removed_from_Group",
      configValue: "",
    },
    Push_Notification_when_Group_is_Closed_Archived: {
      configKey: "Push_Notification_when_Group_is_Closed_Archived",
      configValue: "",
    },
    Push_Notification_when_Group_is_set_InActive: {
      configKey: "Push_Notification_when_Group_is_set_InActive",
      configValue: "",
    },
    Email_when_New_Resolution_is_Circulated: {
      configKey: "Email_when_New_Resolution_is_Circulated",
      configValue: "",
    },
    Push_Notification_when_New_Resolution_is_Circulated: {
      configKey: "Push_Notification_when_New_Resolution_is_Circulated",
      configValue: "",
    },
    Email_when_Resolution_is_Cancelled_after_Circulation: {
      configKey: "Email_when_Resolution_is_Cancelled_after_Circulation",
      configValue: "",
    },
    Push_Notification_when_Resolution_is_Cancelled_after_Circulation: {
      configKey:
        "Push_Notification_when_Resolution_is_Cancelled_after_Circulation",
      configValue: "",
    },
    Email_when_a_Resolution_is_Closed: {
      configKey: "Email_when_a_Resolution_is_Closed",
      configValue: "",
    },
    Push_Notification_when_Resolution_is_Closed: {
      configKey: "Push_Notification_when_Resolution_is_Closed",
      configValue: "",
    },
    User_Allow_Google_Calendar_Synch: {
      configKey: "User_Allow_Google_Calendar_Synch",
      configValue: "",
    },
    User_Allow_Microsoft_Calendar_Synch: {
      configKey: "User_Allow_Microsoft_Calendar_Synch",
      configValue: "",
    },
    Calender_Months_Span: {
      configKey: "Calender_Months_Span",
      configValue: "",
    },
    AUTO_CLOSE_RESOLUTION: {
      configKey: "AUTO_CLOSE_RESOLUTION",
      configValue: "",
    },
    Email_When_New_Poll_Is_Published: {
      configKey: "Email_When_New_Poll_Is_Published",
      configValue: "",
    },
    Push_Notification_When_New_Poll_Is_Published: {
      configKey: "Push_Notification_When_New_Poll_Is_Published",
      configValue: "",
    },
    Email_When_Published_Poll_Is_Updated: {
      configKey: "Email_When_Published_Poll_Is_Updated",
      configValue: "",
    },
    Push_Notification_When_Published_Poll_Is_Updated: {
      configKey: "Push_Notification_When_Published_Poll_Is_Updated",
      configValue: "",
    },
    Email_When_Poll_Due_Date_Is_Passed: {
      configKey: "Email_When_Poll_Due_Date_Is_Passed",
      configValue: "",
    },
    Push_Notification_When_Poll_Due_Date_Is_Passed: {
      configKey: "Push_Notification_When_Poll_Due_Date_Is_Passed",
      configValue: "",
    },
    Email_When_Published_Poll_Is_Deleted: {
      configKey: "Email_When_Published_Poll_Is_Deleted",
      configValue: "",
    },
    Push_Notification_When_Published_Poll_Is_Deleted: {
      configKey: "Push_Notification_When_Published_Poll_Is_Deleted",
      configValue: "",
    },
    Push_Notification_when_Committee_is_set_Active: {
      configKey: "Push_Notification_when_Committee_is_set_Active",
      configValue: "",
    },
    Email_When_Committee_Is_Active: {
      configKey: "Email_When_Committee_Is_Active",
      configValue: "",
    },
    Push_Notification_when_Group_is_set_Active: {
      configKey: "Push_Notification_when_Group_is_set_Active",
      configValue: "",
    },
    Email_When_Group_Is_Active: {
      configKey: "Email_When_Group_Is_Active",
      configValue: "",
    },
    Email_When_New_TODO_Assigned: {
      configKey: "Email_When_New_TODO_Assigned",
      configValue: "",
    },
    Push_Notification_When_New_TODO_Assigned: {
      configKey: "Push_Notification_When_New_TODO_Assigned",
      configValue: "",
    },
    Email_When_New_TODO_Edited: {
      configKey: "Email_When_New_TODO_Edited",
      configValue: "",
    },
    Push_Notification_When_New_TODO_Edited: {
      configKey: "Push_Notification_When_New_TODO_Edited",
      configValue: "",
    },
    Email_When_New_TODO_Deleted: {
      configKey: "Email_When_New_TODO_Deleted",
      configValue: "",
    },
    Push_Notification_When_New_TODO_Deleted: {
      configKey: "Push_Notification_When_New_TODO_Deleted",
      configValue: "",
    },
    Email_When_New_Comment_Added: {
      configKey: "Email_When_New_Comment_Added",
      configValue: "",
    },
    Push_Notification_When_New_Comment_Added: {
      configKey: "Push_Notification_When_New_Comment_Added",
      configValue: "",
    },
    Email_When_Comment_Deleted: {
      configKey: "Email_When_Comment_Deleted",
      configValue: "",
    },
    Push_Notification_When_Comment_Deleted: {
      configKey: "Push_Notification_When_Comment_Deleted",
      configValue: "",
    },
    Push_Notification_when_microsoft_calendar_is_changed: {
      configKey: "Push_Notification_when_microsoft_calendar_is_changed",
      configValue: "",
    },
    Push_Notification_when_google_calendar_is_changed: {
      configKey: "Push_Notification_when_google_calendar_is_changed",
      configValue: "",
    },
    AutomatedReminderDaysForWorkFlowExpiry: {
      configKey: "AutomatedReminderDaysForWorkFlowExpiry",
      configValue: "",
    },
    Active_Meeting_Agenda_Edit_Email: {
      configKey: "Active_Meeting_Agenda_Edit_Email",
      configValue: "",
    },
  });

  console.log(newData.AUTO_CLOSE_RESOLUTION, "hsgashagahsgah");

  console.log({ newData }, "newData");

  useEffect(() => {
    if (
      GetSystemConfigurationsData !== null &&
      GetSystemConfigurationsData !== undefined
    ) {
      const { result } = GetSystemConfigurationsData;
      if (
        result &&
        result.systemCofigurations &&
        result.systemCofigurations.length > 0
      ) {
        setNewData((prevData) => {
          // Create a copy of the previous state
          const updatedData = { ...prevData };
          // Iterate over each configuration from the API response
          result.systemCofigurations.forEach((configData) => {
            // Update the configuration in the state using its configKey as the key
            updatedData[configData.configKey] = {
              configKey: configData.configKey,
              configValue: configData.configValue,
            };
          });
          return updatedData; // Return the updated state
        });
      }
    }
  }, [GetSystemConfigurationsData]);

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

  const openSecurityTab = () => {
    setSecuritystate(true);
    setmeetingsState(false);
    setCalender(false);
    setCommittee(false);
    setGroup(false);
    setResolution(false);
    setpolls(false);
    setTodo(false);
  };
  const opentodo = () => {
    setTodo(true);
    setmeetingsState(false);
    setSecuritystate(false);
    setCalender(false);
    setCommittee(false);
    setGroup(false);
    setResolution(false);
    setpolls(false);
  };
  const openMeetingTab = () => {
    setmeetingsState(true);
    setSecuritystate(false);
    setCalender(false);
    setCommittee(false);
    setGroup(false);
    setResolution(false);
    setpolls(false);
    setTodo(false);
  };

  const openCalenderTab = () => {
    setCalender(true);
    setmeetingsState(false);
    setSecuritystate(false);
    setCommittee(false);
    setGroup(false);
    setResolution(false);
    setpolls(false);
    setTodo(false);
  };

  const openCommitteTab = () => {
    setCommittee(true);
    setCalender(false);
    setmeetingsState(false);
    setSecuritystate(false);
    setGroup(false);
    setResolution(false);
    setpolls(false);
    setTodo(false);
  };

  const openGroupTab = () => {
    setGroup(true);
    setCommittee(false);
    setCalender(false);
    setmeetingsState(false);
    setSecuritystate(false);
    setResolution(false);
    setpolls(false);
    setTodo(false);
  };

  const openResolutionTab = () => {
    setResolution(true);
    setGroup(false);
    setCommittee(false);
    setCalender(false);
    setmeetingsState(false);
    setSecuritystate(false);
    setpolls(false);
    setTodo(false);
  };

  const openPollsTab = () => {
    setpolls(true);
    setResolution(false);
    setGroup(false);
    setCommittee(false);
    setCalender(false);
    setmeetingsState(false);
    setSecuritystate(false);
    setTodo(false);
  };

  const globalOnChangeFunction = (key, value) => {
    setNewData((prevData) => {
      // Check if the provided key exists in the previous state
      if (prevData.hasOwnProperty(key.configKey)) {
        // Create a copy of the previous state
        const updatedData = { ...prevData };
        // Update the configuration in the state using its configKey as the key
        updatedData[key.configKey] = {
          configKey: key.configKey,
          configValue: String(value),
        };
        return updatedData;
      } else {
        // Key doesn't exist in the previous state, handle this scenario accordingly
        console.error(`Key "${key}" does not exist in the state.`);
        return prevData; // Return the previous state unchanged
      }
    });
  };

  console.log(newData, "onChangeIsTwoFaceEnabledonChangeIsTwoFaceEnabled");

  // for Dormant Inactive User for
  const onChangeDormantInactive = (event) => {
    let value = event.target.value;
    setNewData((prevState) => ({
      ...prevState,
      DORMANT_INACTIVE_USERS_FOR_DAYS: {
        ...prevState.DORMANT_INACTIVE_USERS_FOR_DAYS,
        configValue: value,
      },
    }));
  };

  // for changeMeetingDuration in meeting field
  const changeMeetingDuration = (event) => {
    let value = event.target.value;
    setNewData((prevState) => ({
      ...prevState,
      MAXIMUM_MEETING_DURATION: {
        ...prevState.MAXIMUM_MEETING_DURATION,
        configValue: value,
      },
    }));
  };

  // for onChangeCalendarSpan in Calendar field
  const onChangeCalendarSpan = (event) => {
    let value = event.target.value;
    setNewData((prevState) => ({
      ...prevState,
      Calender_Months_Span: {
        ...prevState.Calender_Months_Span,
        configValue: value,
      },
    }));
  };

  // for onChangeResolutionSpan  in Resolution FIeld
  const onChangeResolution = (event) => {
    let value = event.target.value;
    setNewData((prevState) => ({
      ...prevState,
      AUTO_CLOSE_RESOLUTION: {
        ...prevState.AUTO_CLOSE_RESOLUTION,
        configValue: value,
      },
    }));
  };

  const updateOrganizationLevelSettingss = () => {
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
    dispatch(UpdateAllOrganizationLevelConfigurationApi({ data, navigate, t }));

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
            {t("Organization-level-configurations")}
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className={styles["Padding_around_class"]}>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={3}>
              <div onClick={openSecurityTab} className="cursor-pointer">
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
                        securitystate
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Security-settings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={opentodo} className="cursor-pointer">
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
                        todo
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Tasks")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openMeetingTab} className="cursor-pointer">
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
                        meetingsState
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Meetings")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div className="cursor-pointer" onClick={openCalenderTab}>
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
                        calender
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Calendar")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openCommitteTab} className="cursor-pointer">
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
                        committee
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Committees")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openGroupTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={GroupIcon}
                      alt=""
                      width="29px"
                      height="26.04px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        group
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Groups")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openResolutionTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      src={ResolutionIcon}
                      alt=""
                      width="30px"
                      height="31.18px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        resolution
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Resolutions")}
                    </span>
                  </Col>
                </Row>
              </div>
              <hr />

              <div onClick={openPollsTab} className="cursor-pointer">
                <Row className="mt-3">
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <img
                      draggable="false"
                      alt=""
                      src={pollsIcon}
                      width="33.52px"
                      height="34.59px"
                    />
                  </Col>
                  <Col lg={10} md={10} ms={12}>
                    <span
                      className={
                        polls
                          ? styles["Options_headings_active"]
                          : styles["Options_headings"]
                      }
                    >
                      {t("Polls")}
                    </span>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={1} md={1} sm={1} className="d-flex justify-content-center">
              <img
                draggable="false"
                alt=""
                src={line}
                className={styles["user-setting-row"]}
              />
            </Col>
            <Col lg={4} md={4} sm={4} className="m-0 p-0 justify-content-start">
              {securitystate ? (
                <>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.IS_2FA_ENABLED,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.IS_2FA_ENABLED.configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("2FA-is-enabled")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                </>
              ) : null}
              {todo ? (
                <>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_New_TODO_Assigned,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_New_TODO_Assigned.configValue ===
                          "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-new-todo-assigned")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_New_TODO_Assigned,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_New_TODO_Assigned
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-new-todo-assigned")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_New_TODO_Edited,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_New_TODO_Edited.configValue ===
                          "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-new-todo-edited")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_New_TODO_Edited,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_New_TODO_Edited
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-new-todo-edited")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_New_TODO_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_New_TODO_Deleted.configValue ===
                          "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-new-todo-deleted")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_New_TODO_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_New_TODO_Deleted
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-new-todo-deleted")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_New_Comment_Added,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_New_Comment_Added.configValue ===
                          "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-new-comment-added")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_New_Comment_Added,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_New_Comment_Added
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-new-comment-added")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_Comment_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_Comment_Deleted.configValue ===
                          "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-comment-deleted")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_Comment_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_Comment_Deleted
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-comment-deleted")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                </>
              ) : null}
              {meetingsState ? (
                <>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.EMAIL_ON_NEW_MEETINGS,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.EMAIL_ON_NEW_MEETINGS.configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-on-new-meeting")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.PUSH_NOTIFICATION_ON_NEW_MEETING,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.PUSH_NOTIFICATION_ON_NEW_MEETING
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-on-new-meeting")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.EMAIL_EDIT_MEETING,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.EMAIL_EDIT_MEETING.configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-on-edit-meeting")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.PUSH_NOTIFICATION_ON_EDIT_MEETINGS,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.PUSH_NOTIFICATION_ON_EDIT_MEETINGS
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-on-edit-meeting")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_On_Cancelled_Deleted_Meeting,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_On_Cancelled_Deleted_Meeting
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-on-cancelled-or-deleted-meeting")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_on_Cancelled_Deleted_Meeting,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_on_Cancelled_Deleted_Meeting
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Push-notification-on-cancelled-or-deleted-meeting"
                          )}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.SHOW_NOTIFICATION_ON_PARTICIPANT_JOINING,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.SHOW_NOTIFICATION_ON_PARTICIPANT_JOINING
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Show-notification-on-joining-participant")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-0">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Active_Meeting_Agenda_Edit_Email,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Active_Meeting_Agenda_Edit_Email
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          <p className={styles["new-data-text"]}>
                            {t(
                              "Allow-changes-in-the-Agenda-items-after-the-meeting-has-been-started"
                            )}
                          </p>
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                </>
              ) : null}
              {calender ? (
                <>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.User_Allow_Google_Calendar_Synch,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.User_Allow_Google_Calendar_Synch
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("User-allow-google-calendar-synch")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.User_Allow_Microsoft_Calendar_Synch,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.User_Allow_Microsoft_Calendar_Synch
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("User-allow-microsoft-calendar-synch")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                </>
              ) : null}
              {committee ? (
                <>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className={styles["Committee_material"]}
                    >
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Added_To_Committee,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Added_To_Committee
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-added-to-committee")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Added_to_Committee,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Push_Notification_when_Added_to_Committee
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-added-to-committee")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Removed_From_Committee,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Removed_From_Committee
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-removed-from-committee")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Removed_from_Committee,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Removed_from_Committee
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t(
                                "Push-notification-when-removed-from-committee"
                              )}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Committee_Is_Dissolved_Archived,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Committee_Is_Dissolved_Archived
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t(
                                "Email-when-committee-is-dissolved-or-archived"
                              )}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Committee_is_Dissolved_Archived,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Committee_is_Dissolved_Archived
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t(
                                "Push-notification-when-committee-is-dissolved-or-archived"
                              )}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Committee_Is_InActive,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Committee_Is_InActive
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-committee-is-set-inactive")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Committee_is_set_InActive,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Committee_is_set_InActive
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t(
                                "Push-notification-when-committee-is-set-inActive"
                              )}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Committee_Is_Active,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Committee_Is_Active
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-committee-is-active")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Committee_is_set_Active,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Committee_is_set_Active
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-committee-is-active")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              ) : null}
              {group ? (
                <>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className={styles["Committee_material"]}
                    >
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Added_To_Group,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Added_To_Group.configValue ===
                              "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-added-to-group")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Added_to_Group,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Push_Notification_when_Added_to_Group
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-added-to-group")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Removed_From_Group,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Removed_From_Group
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-removed-from-group")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Removed_from_Group,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Push_Notification_when_Removed_from_Group
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-removed-from-group")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Group_Is_Closed_Archived,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Group_Is_Closed_Archived
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-group-is-dissolved-or-archived")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Group_is_Closed_Archived,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Group_is_Closed_Archived
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t(
                                "Push-notification-when-group-is-dissolved-or-archived"
                              )}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Group_Is_In_Active,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Group_Is_In_Active
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-group-is-set-inactive")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Group_is_set_InActive,
                                event.target.checked
                              )
                            }
                            checked={
                              newData
                                .Push_Notification_when_Group_is_set_InActive
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-group-is-inActive")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Email_When_Group_Is_Active,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Email_When_Group_Is_Active.configValue ===
                              "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Email-when-group-is-active")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col lg={12} md={12} sm={12}>
                          <Checkbox
                            onChange={(event) =>
                              globalOnChangeFunction(
                                newData.Push_Notification_when_Group_is_set_Active,
                                event.target.checked
                              )
                            }
                            checked={
                              newData.Push_Notification_when_Group_is_set_Active
                                .configValue === "true"
                                ? true
                                : false
                            }
                          >
                            <span className={styles["Class_CheckBox"]}>
                              {t("Push-notification-when-group-is-active")}
                            </span>
                          </Checkbox>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              ) : null}
              {resolution ? (
                <>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_when_New_Resolution_is_Circulated,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_when_New_Resolution_is_Circulated
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-resolution-is-circulated")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_when_New_Resolution_is_Circulated,
                            event.target.checked
                          )
                        }
                        checked={
                          newData
                            .Push_Notification_when_New_Resolution_is_Circulated
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Push-notification-when-new-resolution-is-circulated"
                          )}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_when_Resolution_is_Cancelled_after_Circulation,
                            event.target.checked
                          )
                        }
                        checked={
                          newData
                            .Email_when_Resolution_is_Cancelled_after_Circulation
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Email-when-new-resolution-is-cancelled-after-circulation"
                          )}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_when_Resolution_is_Cancelled_after_Circulation,
                            event.target.checked
                          )
                        }
                        checked={
                          newData
                            .Push_Notification_when_Resolution_is_Cancelled_after_Circulation
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Push-notification-when-new-resolution-is-cancelled-after-circulated"
                          )}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_when_a_Resolution_is_Closed,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_when_a_Resolution_is_Closed
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-resolution-is-closed")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_when_Resolution_is_Closed,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_when_Resolution_is_Closed
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-resolution-is-closed")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                </>
              ) : null}
              {polls ? (
                <>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_New_Poll_Is_Published,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_New_Poll_Is_Published
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-new-poll-is-published")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_New_Poll_Is_Published,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_New_Poll_Is_Published
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-new-poll-is-published")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_Poll_Due_Date_Is_Passed,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_Poll_Due_Date_Is_Passed
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-poll-duedate-is-passed")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_Poll_Due_Date_Is_Passed,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Push_Notification_When_Poll_Due_Date_Is_Passed
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Push-notification-when-poll-duedate-is-passed")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_Published_Poll_Is_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_Published_Poll_Is_Deleted
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-published-poll-is-deleted")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_Published_Poll_Is_Deleted,
                            event.target.checked
                          )
                        }
                        checked={
                          newData
                            .Push_Notification_When_Published_Poll_Is_Deleted
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Push-notification-when-published-poll-is-deleted"
                          )}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Email_When_Published_Poll_Is_Updated,
                            event.target.checked
                          )
                        }
                        checked={
                          newData.Email_When_Published_Poll_Is_Updated
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t("Email-when-published-poll-is-updated")}
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <Checkbox
                        onChange={(event) =>
                          globalOnChangeFunction(
                            newData.Push_Notification_When_Published_Poll_Is_Updated,
                            event.target.checked
                          )
                        }
                        checked={
                          newData
                            .Push_Notification_When_Published_Poll_Is_Updated
                            .configValue === "true"
                            ? true
                            : false
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          {t(
                            "Push-notification-when-published-poll-is--updated"
                          )}
                        </span>
                      </Checkbox>
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
            <Col lg={3} md={3} sm={3} className="m-0 p-0">
              {calender ? (
                <>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex gap-4 w-100 justify-content-center align-items-center"
                    >
                      <span className={styles["Class_CheckBox2"]}>
                        {t("Calendar-months-span")}
                      </span>
                      <TextField
                        type={"number"}
                        change={onChangeCalendarSpan}
                        value={newData.Calender_Months_Span.configValue}
                        name={"maximumduration"}
                        labelClass={"d-none"}
                        width="80px"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {securitystate ? (
                <>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex gap-4 w-100 justify-content-between align-items-center"
                    >
                      <span className={styles["Class_CheckBox2"]}>
                        {t("Dormant-inactive-users-for")}
                      </span>
                      <TextField
                        type="number"
                        value={
                          newData.DORMANT_INACTIVE_USERS_FOR_DAYS.configValue
                        }
                        change={onChangeDormantInactive}
                        name={"maximumduration"}
                        labelClass={"d-none"}
                        width="80px"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {resolution ? (
                <>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex gap-4 w-100 justify-content-center align-items-center"
                    >
                      <span className={styles["Class_CheckBox2"]}>
                        {t("Auto-close-resolution")}
                      </span>

                      <TextField
                        type={"number"}
                        change={onChangeResolution}
                        value={newData.AUTO_CLOSE_RESOLUTION.configValue}
                        name={"maximumduration"}
                        labelClass={"d-none"}
                        width="80px"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
              {meetingsState ? (
                <>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex gap-4 w-100 justify-content-center align-items-center"
                    >
                      <span className={styles["Class_CheckBox3"]}>
                        {t("Maximum-meeting-duration")}
                      </span>
                      <TextField
                        type={"number"}
                        change={changeMeetingDuration}
                        value={newData.MAXIMUM_MEETING_DURATION.configValue}
                        name={"maximumduration"}
                        labelClass={"d-none"}
                        width="80px"
                      />
                    </Col>
                  </Row>
                </>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-end">
          <Button
            text={t("Update")}
            className={styles["New_settings_Update_Button"]}
            onClick={updateOrganizationLevelSettingss}
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

export default OrganizationLevelSettings;
