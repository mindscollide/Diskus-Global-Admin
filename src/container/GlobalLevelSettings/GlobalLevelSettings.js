import React, { useState } from "react";
import styles from "./GlobalLevelSettings.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
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

import { Checkbox } from "antd";
import {
  regexOnlyCharacters,
  regexOnlyForNumberNCharacters,
  regexOnlyNumbers,
} from "../../common/functions/Regex";
const GlobalLevelSettings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const new states for Global Configuration
  const [mailState, setMailState] = useState(true);
  const [functionalState, setFunctionalState] = useState(false);
  const [userAccountState, setUserAccountState] = useState(false);
  const [organizationAccountState, setOrganizationAccountState] =
    useState(false);
  const [smsSettingState, setSmsSettingState] = useState(false);
  const [userOrganizationSetting, setOrganizationSetting] = useState({
    Is2FAEnabled: false,
    EmailOnNewMeeting: false,
    EmailEditMeeting: false,
    EmailCancelOrDeleteMeeting: false,
    PushNotificationonNewMeeting: false,
    PushNotificationEditMeeting: false,
    PushNotificationCancelledOrDeleteMeeting: false,
    ShowNotificationOnParticipantJoining: false,
    AllowCalenderSync: false,
    AllowMicrosoftCalenderSync: false,
    EmailWhenAddedToCommittee: false,
    EmailWhenRemovedFromCommittee: false,
    EmailWhenCommitteeIsDissolvedOrArchived: false,
    EmailWhenCommitteeIsInactive: false,
    EmailWhenCommitteeIsactive: false,
    PushNotificationWhenAddedToCommittee: false,
    PushNotificationWhenRemovedFromCommittee: false,
    PushNotificationWhenCommitteeIsDissolvedOrArchived: false,
    PushNotificationWhenCommitteeIsInActive: false,
    PushNotificationWhenCommitteeSetIsInActive: false,
    EmailWhenAddedToGroup: false,
    EmailWhenRemovedFromGroup: false,
    EmailWhenGroupIsDissolvedOrArchived: false,
    EmailWhenGroupisInactive: false,
    EmailWhenGroupisactive: false,
    PushNotificationWhenAddedToGroup: false,
    PushNotificationWhenRemovedFromGroup: false,
    PushNotificationWhenGroupIsDissolvedOrArchived: false,
    PushNotificationWhenGroupIsInActive: false,
    PushNotificationWhenGroupSetIsInActive: false,
    EmailWhenResolutionIsCirculated: false,
    EmailWhenNewResolutionIsCancelledAfterCirculation: false,
    EmailWhenResolutionIsClosed: false,
    PushNotificationWhenNewResolutionIsCirculated: false,
    PushNotificationWhenNewResolutionIsCancelledAfterCirculated: false,
    PushNotificationWhenResolutionISClosed: false,
    EmailWhenNewPollIsPublished: false,
    EmailWhenPollDueDateIsPassed: false,
    EmailWhenPublishedPollIsDeleted: false,
    EmailWhenPublishedPollIsUpdated: false,
    PushNotificationWhenNewPollIsPublished: false,
    PushNotificationWhenPollDueDateIsPassed: false,
    PushNotificationWhenPublishedPollIsDeleted: false,
    PushNotificationWhenPublishedPollIsUpdated: false,
    DormatInactiveUsersforDays: 0,
    MaximumMeetingDuration: 0,
    CalenderMonthsSpan: 0,
    AutoCloseResolution: 0,
    TimeZoneId: 0,
    worldCountryID: 0,
    EmailWhenGroupisActive: false,
    EmailWhenGroupIsSetInActive: false,
    PushNotificationWhenGroupisActive: false,
    PushNotificationWhenGroupisSetInActive: false,
    EmailWhenCommitteeisActive: false,
    EmailWhenCommitteeIsSetInActive: false,
    PushNotificationWhenCommitteeisActive: false,
    PushNotificationWhenCommitteeisSetInActive: false,
    PushNotificationWhenNewTODOAssigned: false,
    PushNotificationWhenNewTODODeleted: false,
    PushNotificationWhenNewTODOEdited: false,
    PushNotificationWhenNewCommentAdded: false,
    PushNotificationWhenCommentDeleted: false,
    EmailWhenCommentDeleted: false,
    EmailWhenNewCommentAdded: false,
    EmailWhenNewTODOAssigned: false,
    EmailWhenNewTODODeleted: false,
    EmailWhenNewTODOEdited: false,
  });

  // state management for mail setting for field
  const [mailSettingState, setMailSettingState] = useState({
    Mailhost: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailport: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailuser: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailname: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailpassword: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailurl: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailenablessl: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Mailisnetwork: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Loginurl: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Hblurlemail: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state management for Functional setting for field
  const [functionalSettingState, setFunctionalSettingState] = useState({
    dataroomlength: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    videoRinger: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    meetingMinutes: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    numberuploaded: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    joinmeeting: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    meetingextra: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    rsvpurl: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    sharefolder: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state management for user account setting for field
  const [accountState, setAccountState] = useState({
    maxAllowed: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    idleTimeout: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    accountDormant: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    otpCount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    otpRecreation: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state management for organization Account setting for field
  const [organizationSettingState, setOrganizationSettingState] = useState({
    dataArchiving: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    invoiceClearence: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    lateFees: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    daysExpiry: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state management for SMS setting for field
  const [smsState, setSmsState] = useState({
    smsServiceUser: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    smsServicePass: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    smsServiceSender: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    smsServiceBundle: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  console.log(functionalSettingState, "accountStateaccountState");

  // useEffect(() => {
  //   dispatch(getOrganizationLevelSetting(navigate, t));
  //   dispatch(getTimeZone(navigate, t));
  // }, []);

  // const handleGoogleLoginSuccess = (response) => {
  //   setSignUpCodeToken(response.code);
  //   setOrganizationSetting({
  //     ...userOrganizationSetting,
  //     AllowCalenderSync: true,
  //   });
  // };

  // const handleGoogleLoginFailure = (response) => {
  //   setSignUpCodeToken("");
  //   setOrganizationSetting({
  //     ...userOrganizationSetting,
  //     AllowMicrosoftCalenderSync:
  //       userOrganizationSetting.AllowMicrosoftCalenderSync,
  //   });
  // };

  // useEffect(() => {
  //   let TimeZone = settingReducer.TimeZone;
  //   if (TimeZone !== undefined && TimeZone !== null) {
  //     let newData = [];
  //     TimeZone.map((data, index) => {
  //       newData.push({
  //         label: data.gmtOffset
  //           ? data.countryName +
  //             " " +
  //             "(" +
  //             data.timeZone +
  //             ")" +
  //             " " +
  //             data.gmtOffset
  //           : null,
  //         value: data.pK_TZID,
  //       });
  //     });
  //     setTimeZone(newData);
  //   }
  // }, [settingReducer.TimeZone]);

  // useEffect(() => {
  //   if (
  //     settingReducer.GetOrganizationLevelSettingResponse !== null &&
  //     settingReducer.GetOrganizationLevelSettingResponse !== undefined
  //   ) {
  //     if (
  //       Object.keys(settingReducer.GetOrganizationLevelSettingResponse)
  //         .length > 0
  //     ) {
  //       let organizationSettings =
  //         settingReducer.GetOrganizationLevelSettingResponse;
  //       setOrganizationSetting({
  //         Is2FAEnabled: organizationSettings.is2FAEnabled,
  //         EmailOnNewMeeting: organizationSettings.emailOnNewMeeting,
  //         EmailEditMeeting: organizationSettings.emailOnEditMeeting,
  //         EmailCancelOrDeleteMeeting:
  //           organizationSettings.emailOnCancelledDeletedMeeting,
  //         PushNotificationonNewMeeting:
  //           organizationSettings.pushNotificationOnNewMeeting,
  //         PushNotificationEditMeeting:
  //           organizationSettings.pushNotificationOnEditMeeting,
  //         PushNotificationCancelledOrDeleteMeeting:
  //           organizationSettings.pushNotificationonCancelledDeletedMeeting,
  //         ShowNotificationOnParticipantJoining:
  //           organizationSettings.showNotificationOnParticipantJoining,
  //         AllowCalenderSync:
  //           organizationSettings.userAllowGoogleCalendarSynch,
  //         AllowMicrosoftCalenderSync:
  //           organizationSettings.userAllowMicrosoftCalendarSynch,
  //         EmailWhenAddedToCommittee:
  //           organizationSettings.emailWhenAddedToCommittee,
  //         EmailWhenRemovedFromCommittee:
  //           organizationSettings.emailWhenRemovedFromCommittee,
  //         EmailWhenCommitteeIsDissolvedOrArchived:
  //           organizationSettings.emailWhenCommitteeIsDissolvedArchived,
  //         EmailWhenCommitteeIsSetInactive:
  //           organizationSettings.emailWhenCommitteeIsInActive,
  //         PushNotificationWhenAddedToCommittee:
  //           organizationSettings.pushNotificationwhenAddedtoCommittee,
  //         PushNotificationWhenRemovedFromCommittee:
  //           organizationSettings.pushNotificationwhenRemovedfromCommittee,
  //         PushNotificationWhenCommitteeIsDissolvedOrArchived:
  //           organizationSettings.pushNotificationwhenCommitteeisDissolvedArchived,
  //         PushNotificationWhenCommitteeIsInActive:
  //           organizationSettings.pushNotificationwhenCommitteeissetInActive,
  //         EmailWhenAddedToGroup: organizationSettings.emailWhenAddedToGroup,
  //         EmailWhenRemovedFromGroup:
  //           organizationSettings.emailWhenRemovedFromGroup,
  //         EmailWhenGroupIsDissolvedOrArchived:
  //           organizationSettings.emailWhenGroupIsClosedArchived,
  //         EmailWhenGroupisSetInactive:
  //           organizationSettings.emailWhenGroupIsInActive,
  //         PushNotificationWhenAddedToGroup:
  //           organizationSettings.pushNotificationwhenAddedtoGroup,
  //         PushNotificationWhenRemovedFromGroup:
  //           organizationSettings.pushNotificationwhenRemovedfromGroup,
  //         PushNotificationWhenGroupIsDissolvedOrArchived:
  //           organizationSettings.pushNotificationwhenGroupisClosedArchived,
  //         PushNotificationWhenGroupIsInActive:
  //           organizationSettings.pushNotificationwhenGroupissetInActive,
  //         EmailWhenResolutionIsCirculated:
  //           organizationSettings.emailwhenaResolutionisClosed,
  //         EmailWhenNewResolutionIsCancelledAfterCirculation:
  //           organizationSettings.emailwhenResolutionisCancelledafterCirculation,
  //         EmailWhenResolutionIsClosed:
  //           organizationSettings.emailwhenaResolutionisClosed,
  //         PushNotificationWhenNewResolutionIsCirculated:
  //           organizationSettings.pushNotificationwhenNewResolutionisCirculated,
  //         PushNotificationWhenNewResolutionIsCancelledAfterCirculated:
  //           organizationSettings.pushNotificationwhenResolutionisCancelledafterCirculation,
  //         PushNotificationWhenResolutionISClosed:
  //           organizationSettings.pushNotificationWhenResolutionIsClosed,
  //         EmailWhenNewPollIsPublished:
  //           organizationSettings.emailWhenNewPollIsPublished,
  //         EmailWhenPollDueDateIsPassed:
  //           organizationSettings.emailWhenPollDueDateIsPassed,
  //         EmailWhenPublishedPollIsDeleted:
  //           organizationSettings.emailWhenPublishedPollIsDeleted,
  //         EmailWhenPublishedPollIsUpdated:
  //           organizationSettings.emailWhenPublishedPollIsUpdated,
  //         PushNotificationWhenNewPollIsPublished:
  //           organizationSettings.pushNotificationWhenNewPollIsPublished,
  //         PushNotificationWhenPollDueDateIsPassed:
  //           organizationSettings.pushNotificationWhenPollDueDateIsPassed,
  //         PushNotificationWhenPublishedPollIsDeleted:
  //           organizationSettings.pushNotificationWhenPublishedPollIsDeleted,
  //         PushNotificationWhenPublishedPollIsUpdated:
  //           organizationSettings.pushNotificationWhenPublishedPollIsUpdated,
  //         DormatInactiveUsersforDays:
  //           organizationSettings.dormantInactiveUsersForDays,
  //         MaximumMeetingDuration: organizationSettings.maximumMeetingDuration,
  //         CalenderMonthsSpan: organizationSettings.calenderMonthsSpan,
  //         TimeZoneId: organizationSettings.timeZones?.pK_TZID,
  //         worldCountryID: organizationSettings.worldCountry.fK_WorldCountryID,
  //         EmailWhenGroupisActive: organizationSettings.emailWhenGroupIsActive,
  //         EmailWhenGroupIsSetInActive:
  //           organizationSettings.emailWhenGroupIsInActive,
  //         PushNotificationWhenGroupisActive:
  //           organizationSettings.pushNotificationwhenGroupissetActive,
  //         PushNotificationWhenGroupisSetInActive:
  //           organizationSettings.pushNotificationwhenGroupissetInActive,
  //         EmailWhenCommitteeisActive:
  //           organizationSettings.emailWhenCommitteeIsActive,
  //         EmailWhenCommitteeIsSetInActive:
  //           organizationSettings.emailWhenCommitteeIsInActive,
  //         PushNotificationWhenCommitteeisActive:
  //           organizationSettings.pushNotificationwhenCommitteeissetActive,
  //         PushNotificationWhenCommitteeisSetInActive:
  //           organizationSettings.pushNotificationwhenCommitteeissetInActive,
  //         PushNotificationWhenNewTODOAssigned:
  //           organizationSettings.pushNotificationWhenNewTODOAssigned,
  //         PushNotificationWhenNewTODODeleted:
  //           organizationSettings.pushNotificationWhenNewTODODeleted,
  //         PushNotificationWhenNewTODOEdited:
  //           organizationSettings.pushNotificationWhenNewTODOEdited,
  //         PushNotificationWhenNewCommentAdded:
  //           organizationSettings.pushNotificationWhenNewCommentAdded,
  //         PushNotificationWhenCommentDeleted:
  //           organizationSettings.pushNotificationWhenCommentDeleted,
  //         EmailWhenCommentDeleted:
  //           organizationSettings.emailWhenCommentDeleted,
  //         EmailWhenNewCommentAdded:
  //           organizationSettings.emailWhenNewCommentAdded,
  //         EmailWhenNewTODOAssigned:
  //           organizationSettings.emailWhenNewTODOAssigned,
  //         EmailWhenNewTODODeleted:
  //           organizationSettings.emailWhenNewTODODeleted,
  //         EmailWhenNewTODOEdited: organizationSettings.emailWhenNewTODOEdited,
  //       });
  //       let timeZoneCode = {
  //         label: organizationSettings.timeZones
  //           ? organizationSettings.timeZones.countryName +
  //             " " +
  //             "(" +
  //             organizationSettings.timeZones.timeZone +
  //             ")" +
  //             " " +
  //             organizationSettings.timeZones.gmtOffset
  //           : null,
  //         value: organizationSettings.timeZones?.pK_TZID,
  //       };
  //       setTimeZoneValue(timeZoneCode);
  //     }
  //   }
  // }, [settingReducer.GetOrganizationLevelSettingResponse]);

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

  const onChangePushNotificationWhenNewTODOAssigned = (e) => {
    let value = e.target.checked;
    setOrganizationSetting({
      ...userOrganizationSetting,
      PushNotificationWhenNewTODOAssigned: value,
    });
  };

  const updateOrganizationLevelSettings = async () => {
    let OrganizationID = localStorage.getItem("organizationID");
    let Data = {
      CalenderMonthsSpan: userOrganizationSetting.CalenderMonthsSpan,
      DormantInactiveUsersForDays:
        userOrganizationSetting.DormatInactiveUsersforDays,
      EmailOnCancelledDeletedMeeting:
        userOrganizationSetting.EmailCancelOrDeleteMeeting,
      EmailOnEditMeeting: userOrganizationSetting.EmailEditMeeting,
      EmailOnNewMeeting: userOrganizationSetting.EmailOnNewMeeting,
      EmailWhenAddedToCommittee:
        userOrganizationSetting.EmailWhenAddedToCommittee,
      EmailWhenAddedToGroup: userOrganizationSetting.EmailWhenAddedToGroup,
      EmailWhenCommitteeIsActive:
        userOrganizationSetting.EmailWhenCommitteeisActive,
      EmailWhenCommitteeIsDissolvedArchived:
        userOrganizationSetting.EmailWhenCommitteeIsDissolvedOrArchived,
      EmailWhenCommitteeIsInActive:
        userOrganizationSetting.EmailWhenCommitteeisActive,
      EmailWhenGroupIsActive: userOrganizationSetting.EmailWhenGroupisActive,
      EmailWhenGroupIsClosedArchived:
        userOrganizationSetting.EmailWhenGroupIsDissolvedOrArchived,
      EmailWhenGroupIsInActive:
        userOrganizationSetting.EmailWhenGroupIsSetInActive,
      EmailWhenNewPollIsPublished:
        userOrganizationSetting.EmailWhenNewPollIsPublished,
      EmailWhenPollDueDateIsPassed:
        userOrganizationSetting.EmailWhenPollDueDateIsPassed,
      EmailWhenPublishedPollIsDeleted:
        userOrganizationSetting.EmailWhenPublishedPollIsDeleted,
      EmailWhenPublishedPollIsUpdated:
        userOrganizationSetting.EmailWhenPublishedPollIsUpdated,
      EmailWhenRemovedFromCommittee:
        userOrganizationSetting.EmailWhenRemovedFromCommittee,
      EmailWhenRemovedFromGroup:
        userOrganizationSetting.EmailWhenRemovedFromGroup,
      EmailwhenNewResolutionisCirculated:
        userOrganizationSetting.EmailWhenResolutionIsCirculated,
      EmailwhenResolutionisCancelledafterCirculation:
        userOrganizationSetting.EmailWhenNewResolutionIsCancelledAfterCirculation,
      EmailwhenaResolutionisClosed:
        userOrganizationSetting.EmailWhenResolutionIsClosed,
      FK_OrganizationID: JSON.parse(OrganizationID),
      FK_TZID: userOrganizationSetting.TimeZoneId,
      FK_WorldCountryID: userOrganizationSetting.worldCountryID,
      Is2FAEnabled: userOrganizationSetting.Is2FAEnabled,
      MaximumMeetingDuration: userOrganizationSetting.MaximumMeetingDuration,
      PushNotificationOnEditMeeting:
        userOrganizationSetting.PushNotificationEditMeeting,
      PushNotificationOnNewMeeting:
        userOrganizationSetting.PushNotificationonNewMeeting,
      PushNotificationWhenNewPollIsPublished:
        userOrganizationSetting.PushNotificationWhenNewPollIsPublished,
      PushNotificationWhenPollDueDateIsPassed:
        userOrganizationSetting.PushNotificationWhenPollDueDateIsPassed,
      PushNotificationWhenPublishedPollIsDeleted:
        userOrganizationSetting.PushNotificationWhenPublishedPollIsDeleted,
      PushNotificationWhenPublishedPollIsUpdated:
        userOrganizationSetting.PushNotificationWhenPublishedPollIsUpdated,
      PushNotificationWhenResolutionIsClosed:
        userOrganizationSetting.PushNotificationWhenResolutionISClosed,
      PushNotificationonCancelledDeletedMeeting:
        userOrganizationSetting.PushNotificationCancelledOrDeleteMeeting,
      PushNotificationwhenAddedtoCommittee:
        userOrganizationSetting.PushNotificationWhenAddedToCommittee,
      PushNotificationwhenAddedtoGroup:
        userOrganizationSetting.PushNotificationWhenAddedToGroup,
      PushNotificationwhenCommitteeisDissolvedArchived:
        userOrganizationSetting.PushNotificationWhenCommitteeIsDissolvedOrArchived,
      PushNotificationwhenCommitteeissetActive:
        userOrganizationSetting.PushNotificationWhenCommitteeisActive,
      PushNotificationwhenCommitteeissetInActive:
        userOrganizationSetting.PushNotificationWhenCommitteeisSetInActive,
      PushNotificationwhenGroupisClosedArchived:
        userOrganizationSetting.PushNotificationWhenGroupIsDissolvedOrArchived,
      PushNotificationwhenGroupissetActive:
        userOrganizationSetting.PushNotificationWhenGroupisSetInActive,
      PushNotificationwhenGroupissetInActive:
        userOrganizationSetting.PushNotificationWhenGroupisActive,
      PushNotificationwhenNewResolutionisCirculated:
        userOrganizationSetting.PushNotificationWhenNewResolutionIsCirculated,
      PushNotificationwhenRemovedfromCommittee:
        userOrganizationSetting.PushNotificationWhenRemovedFromCommittee,
      PushNotificationwhenRemovedfromGroup:
        userOrganizationSetting.PushNotificationWhenRemovedFromGroup,
      PushNotificationwhenResolutionisCancelledafterCirculation:
        userOrganizationSetting.PushNotificationWhenNewResolutionIsCancelledAfterCirculated,
      ShowNotificationOnParticipantJoining:
        userOrganizationSetting.ShowNotificationOnParticipantJoining,
      UserAllowGoogleCalendarSynch: userOrganizationSetting.AllowCalenderSync,
      UserAllowMicrosoftCalendarSynch:
        userOrganizationSetting.AllowMicrosoftCalenderSync,
      PushNotificationWhenNewTODOAssigned:
        userOrganizationSetting.PushNotificationWhenNewTODOAssigned,
      PushNotificationWhenNewTODODeleted:
        userOrganizationSetting.PushNotificationWhenNewTODODeleted,
      PushNotificationWhenNewTODOEdited:
        userOrganizationSetting.PushNotificationWhenNewTODOEdited,
      PushNotificationWhenNewCommentAdded:
        userOrganizationSetting.PushNotificationWhenNewCommentAdded,
      PushNotificationWhenCommentDeleted:
        userOrganizationSetting.PushNotificationWhenCommentDeleted,
      EmailWhenCommentDeleted: userOrganizationSetting.EmailWhenCommentDeleted,
      EmailWhenNewCommentAdded:
        userOrganizationSetting.EmailWhenNewCommentAdded,
      EmailWhenNewTODOAssigned:
        userOrganizationSetting.EmailWhenNewTODOAssigned,
      EmailWhenNewTODODeleted: userOrganizationSetting.EmailWhenNewTODODeleted,
      EmailWhenNewTODOEdited: userOrganizationSetting.EmailWhenNewTODOEdited,
    };
  };

  // onChange handler
  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "mailhost" && name !== "") {
      let valueCheck = regexOnlyCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailhost: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailport" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailport: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailuser" && name !== "") {
      let valueCheck = regexOnlyCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailuser: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailname" && name !== "") {
      let valueCheck = regexOnlyCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailname: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailpassword" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailpassword: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailenable" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailenablessl: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mailnetwork" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Mailisnetwork: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "loginurl" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Loginurl: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "hblurlemail" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setMailSettingState({
          ...mailSettingState,
          Hblurlemail: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "dataroom" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          dataroomlength: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "videoringer" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          videoRinger: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "meetingminutes" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          meetingMinutes: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "numberUploaded" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          numberuploaded: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "joinMeeting" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          joinmeeting: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "meetingExtra" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          meetingextra: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "rsvpUrl" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          rsvpurl: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "shareFolder" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setFunctionalSettingState({
          ...functionalSettingState,
          sharefolder: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "maxallowed" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setAccountState({
          ...accountState,
          maxAllowed: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "idletimeout" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setAccountState({
          ...accountState,
          idleTimeout: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "accountdormant" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setAccountState({
          ...accountState,
          accountDormant: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "otpcount" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setAccountState({
          ...accountState,
          otpCount: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "otprecreation" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setAccountState({
          ...accountState,
          otpRecreation: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "dataarchiving" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setOrganizationSettingState({
          ...organizationSettingState,
          dataArchiving: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "invoiceclearence" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setOrganizationSettingState({
          ...organizationSettingState,
          invoiceClearence: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "latefees" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setOrganizationSettingState({
          ...organizationSettingState,
          lateFees: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "daysexpiry" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setOrganizationSettingState({
          ...organizationSettingState,
          daysExpiry: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "smsserviceuser" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setSmsState({
          ...smsState,
          smsServiceUser: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "smsservicepass" && name !== "") {
      let valueCheck = regexOnlyForNumberNCharacters(value);
      if (valueCheck !== 0) {
        setSmsState({
          ...smsState,
          smsServicePass: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "smsservicesender" && name !== "") {
      let valueCheck = regexOnlyCharacters(value);
      if (valueCheck !== 0) {
        setSmsState({
          ...smsState,
          smsServiceSender: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "smsservicebundle" && name !== "") {
      let valueCheck = regexOnlyNumbers(value);
      if (valueCheck !== 0) {
        setSmsState({
          ...smsState,
          smsServiceBundle: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
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
                        Mail host
                      </span>
                      <TextField
                        name="mailhost"
                        value={mailSettingState.Mailhost.value}
                        change={changeHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Mail port
                      </span>
                      <TextField
                        name="mailport"
                        change={changeHandler}
                        value={mailSettingState.Mailport.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Mail User
                      </span>
                      <TextField
                        name="mailuser"
                        change={changeHandler}
                        value={mailSettingState.Mailuser.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Mail display name
                      </span>
                      <TextField
                        name="mailname"
                        change={changeHandler}
                        value={mailSettingState.Mailname.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Class_CheckBox"]}>
                        Mail password
                      </span>
                      <TextField
                        name="mailpassword"
                        change={changeHandler}
                        value={mailSettingState.Mailpassword.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <Checkbox
                        onChange={onChangePushNotificationWhenNewTODOAssigned}
                        checked={
                          userOrganizationSetting.PushNotificationWhenNewTODOAssigned
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          Mail Enable SSL
                        </span>
                      </Checkbox>
                    </Col>

                    <Col lg={6} md={6} sm={6}>
                      <Checkbox
                        onChange={onChangePushNotificationWhenNewTODOAssigned}
                        checked={
                          userOrganizationSetting.PushNotificationWhenNewTODOAssigned
                        }
                      >
                        <span className={styles["Class_CheckBox"]}>
                          Mail Is Smtp Network
                        </span>
                      </Checkbox>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Login url
                      </span>
                      <TextField
                        name="loginurl"
                        change={changeHandler}
                        value={mailSettingState.Loginurl.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        HBL url for email
                      </span>
                      <TextField
                        name="hblurlemail"
                        change={changeHandler}
                        value={mailSettingState.Hblurlemail.value}
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
                        Dataroom length
                      </span>
                      <TextField
                        labelClass="d-none"
                        name="dataroom"
                        change={changeHandler}
                        value={functionalSettingState.dataroomlength.value}
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Video ringer timeout
                      </span>
                      <TextField
                        name="videoringer"
                        change={changeHandler}
                        value={functionalSettingState.videoRinger.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Meeting started minutes
                      </span>
                      <TextField
                        name="meetingminutes"
                        change={changeHandler}
                        value={functionalSettingState.meetingMinutes.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Number of recently uploaded
                      </span>
                      <TextField
                        name="numberUploaded"
                        change={changeHandler}
                        value={functionalSettingState.numberuploaded.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Join meeting before minutes
                      </span>
                      <TextField
                        name="joinMeeting"
                        change={changeHandler}
                        value={functionalSettingState.joinmeeting.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Meeting extra time active
                      </span>
                      <TextField
                        name="meetingExtra"
                        change={changeHandler}
                        value={functionalSettingState.meetingextra.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        RSVP base url
                      </span>
                      <TextField
                        name="rsvpUrl"
                        change={changeHandler}
                        value={functionalSettingState.rsvpurl.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Share folder base link
                      </span>
                      <TextField
                        name="shareFolder"
                        change={changeHandler}
                        value={functionalSettingState.sharefolder.value}
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
                        Max Allowed Failed Attempts
                      </span>
                      <TextField
                        name="maxallowed"
                        change={changeHandler}
                        value={accountState.maxAllowed.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Idle Timeout
                      </span>
                      <TextField
                        name="idletimeout"
                        change={changeHandler}
                        value={accountState.idleTimeout.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Account Dormant Days
                      </span>
                      <TextField
                        name="accountdormant"
                        change={changeHandler}
                        value={accountState.accountDormant.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Max OTP Failed Attempt Count
                      </span>
                      <TextField
                        name="otpcount"
                        change={changeHandler}
                        value={accountState.otpCount.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12} md={12} sm={12}>
                      <span className={styles["Class_CheckBox"]}>
                        OTP Recreation Time Left
                      </span>
                      <TextField
                        name="otprecreation"
                        change={changeHandler}
                        value={accountState.otpRecreation.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Default Organizer Name
                      </span>
                      <br />
                      <img src={Profilepicture} width={50} />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Default Profile Name
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
                        Data Archiving Grace Day
                      </span>
                      <TextField
                        name="dataarchiving"
                        value={organizationSettingState.dataArchiving.value}
                        change={changeHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Invoice Clearence Days Magin
                      </span>
                      <TextField
                        name="invoiceclearence"
                        value={organizationSettingState.invoiceClearence.value}
                        change={changeHandler}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Late Fees Days Margin
                      </span>
                      <TextField
                        name="latefees"
                        value={organizationSettingState.lateFees.value}
                        change={changeHandler}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Days Before Expiry For Invoice
                      </span>
                      <TextField
                        name="daysexpiry"
                        value={organizationSettingState.daysExpiry.value}
                        change={changeHandler}
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
                        Sms Service Username
                      </span>
                      <TextField
                        name="smsserviceuser"
                        change={changeHandler}
                        value={smsState.smsServiceUser.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Sms Service Password
                      </span>
                      <TextField
                        name="smsservicepass"
                        change={changeHandler}
                        value={smsState.smsServicePass.value}
                        labelClass="d-none"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Sms Service Sender
                      </span>
                      <TextField
                        name="smsservicesender"
                        change={changeHandler}
                        value={smsState.smsServiceSender.value}
                        labelClass="d-none"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                      <span className={styles["Class_CheckBox"]}>
                        Sms Service Bundle Id
                      </span>
                      <TextField
                        name="smsservicebundle"
                        change={changeHandler}
                        value={smsState.smsServiceBundle.value}
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
            onClick={updateOrganizationLevelSettings}
          />
        </Col>
      </Row>
    </section>
  );
};

export default GlobalLevelSettings;
