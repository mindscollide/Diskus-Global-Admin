import React, { useState, useRef, useEffect } from "react";
import { Button, Notification, TextField } from "../../components/elements";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import Select from "react-select";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import {
  getAllOrganizationApi,
  getAllTrailRejectedApi,
  getAllTrailRequestedApi,
  validateEncryptedStringForOrganizationTrialEmailApi,
} from "../../store/Actions/ViewOrganizationActions";
import "./ViewOrganizations.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { formatDate } from "../../common/functions/dateFormatters";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { getAllOrganizationNameMainApi } from "../../store/Actions/GlobalAdminDashboardActions";
import {
  globalAdminDashBoardLoader,
  resetResponseMessage,
} from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import CurrenrOrganization from "./CurrentOrganizations/CurrentOrganizations";
import TrailRequest from "./TrailRequest/TrailRequest";
import RejectedRequest from "./RejectedRequest/RejectedRequest";

const ViewOrganization = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calendRef = useRef();
  const [currentTab, setCurrentTab] = useState(1);

  // current language set in local storage
  let currentLanguage = localStorage.getItem("currentLanguage");

  // for response message
  const Responsemessage = useSelector(
    (state) => state.searchOrganization.Responsemessage
  );

  // reducer for get All Organization but in dropdown
  const organizationIdDataDropdown = useSelector(
    (state) => state.globalAdminDashboardReducer.getOrganizationNames
  );

  const [searchBox, setSearchBox] = useState(false);
  const [organizationDataValue, setOrganizationDataValue] = useState(null);

  // state for view Organizer Table data

  // for dropdown lazy loading state:
  const [organization, setOrganization] = useState([]);

  // states for search
  const [showsearchText, setShowSearchText] = useState(false);
  const [aminNameSearch, setAminNameSearch] = useState("");
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  let orgTrialAccept = localStorage.getItem("orgTrialAccept_action");
  let orgTrialReject = localStorage.getItem("orgTrialReject_action");

  const [userNameSearch, setUserNameSearch] = useState("");

  const [openNotification, setOpenNotification] = useState({
    historyFlag: false,
    historyNotification: "",
    severity: "none",
  });

  // search Organizer State
  const [searchOrganizationData, setSearchOrganizationData] = useState({
    OrganizationContactName: "",
    OrganizationContactEmail: "",
    OrganizationDateFrom: "",
    OrganizationDateTo: "",
    OrganizationName: "",
    OrganizationSubscriptionStatus: {
      value: 0,
      label: "",
    },
    OrganizationDateToView: "",
    OrganizationDateFromView: "",
  });

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

  //Calling Organization Api
  useEffect(() => {
    if (
      localStorage.getItem("orgTrialReject_action") !== null ||
      localStorage.getItem("orgTrialAccept_action") !== null
    ) {
      let Data = { EncryptedString: orgTrialAccept || orgTrialReject };
      dispatch(
        validateEncryptedStringForOrganizationTrialEmailApi({
          Data,
          navigate,
          t,
          setCurrentTab,
        })
      );
    } else {
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getAllOrganizationNameMainApi({ navigate, t }));
      setCurrentTab(1);
    }

    return () => {
      setSearchOrganizationData({
        OrganizationContactName: "",
        OrganizationContactEmail: "",
        OrganizationDateFrom: "",
        OrganizationDateTo: "",
        OrganizationName: "",
        OrganizationSubscriptionStatus: {
          value: 0,
          label: "",
        },
        OrganizationDateToView: "",
        OrganizationDateFromView: "",
      });
    };
  }, []);

  // useEffect for dropdown select organization Names
  useEffect(() => {
    if (
      organizationIdDataDropdown !== null &&
      organizationIdDataDropdown !== undefined &&
      organizationIdDataDropdown?.result?.organizations.length > 0
    ) {
      setOrganization(organizationIdDataDropdown.result.organizations);
    } else {
      setOrganization([]);
    }
  }, [organizationIdDataDropdown]);

  // for status Options
  const options = [
    { value: 1, label: "Active" },
    { value: 2, label: "InActive" },
    { value: 3, label: "suspended" },
    { value: 4, label: "Closed" },
    { value: 5, label: "Terminated Requested" },
    { value: 6, label: "Deleted" },
    { value: 7, label: "Archived" },
    { value: 8, label: "Locked By Global Admin" },
  ];

  // useEffect to set currentLanguag
  useEffect(() => {
    if (currentLanguage !== undefined && currentLanguage !== null) {
      if (currentLanguage === "en") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_en);
      } else if (currentLanguage === "ar") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
      }
    }
  }, [currentLanguage]);

  // onChange handler for Status dropdown
  const handleStatusChange = (selectedOption) => {
    setSearchOrganizationData((prevState) => ({
      ...prevState,
      OrganizationSubscriptionStatus: selectedOption,
    }));
  };

  // onChange Handler for organizer Dropdown
  const organizerChangeHandler = (selectedOrganizer) => {
    setOrganizationDataValue(selectedOrganizer);
  };
  //onChange for View Orgniazation Search
  const searchViewOrganizationHandler = (event) => {
    const { name, value } = event.target;
    if (name === "OrganizationContactName") {
      setSearchOrganizationData({
        ...searchOrganizationData,
        OrganizationContactName: value,
      });
    } else if (name === "OrganizationContactEmail") {
      setSearchOrganizationData({
        ...searchOrganizationData,
        OrganizationContactEmail: value,
      });
    }
  };

  // to open search box handler
  const HandleopenSearchBox = () => {
    if (aminNameSearch !== "") {
      setAminNameSearch("");
      let newData = {
        OrganizationContactName: "",
        OrganizationContactEmail: "",
        OrganizationDateTo: "",
        OrganizationDateFrom: "",
        OrganizationSubscriptionStatus: 0,
        OrganizationName: "",
        sRow: 0,
        eRow: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllOrganizationApi({ newData, navigate, t }));
    }
    setSearchOrganizationData({
      ...searchOrganizationData,
      OrganizationContactName: searchOrganizationData.OrganizationContactName,
      OrganizationContactEmail: searchOrganizationData.OrganizationContactEmail,
      OrganizationDateFrom: searchOrganizationData.OrganizationDateFrom,
      OrganizationDateTo: searchOrganizationData.OrganizationDateTo,
      OrganizationDateToView: searchOrganizationData.OrganizationDateToView,
      OrganizationDateFromView: searchOrganizationData.OrganizationDateFromView,
      OrganizationSubscriptionStatus: {
        value: searchOrganizationData.OrganizationSubscriptionStatus.value,
        label: searchOrganizationData.OrganizationSubscriptionStatus.label,
      },
    });
    setSearchBox(!searchBox);
  };

  // handler searched button
  const handleSearches = (fieldName) => {
    let updatedData = { ...searchOrganizationData };
    let updatedOrganizationDataValue = organizationDataValue;
    // Reset only the targeted date field
    if (
      fieldName === "OrganizationDateFrom" ||
      fieldName === "OrganizationDateTo"
    ) {
      updatedData.OrganizationDateFrom = "";
      updatedData.OrganizationDateFromView = "";
      updatedData.OrganizationDateTo = "";
      updatedData.OrganizationDateToView = "";
    } else if (fieldName === "OrganizationContactName") {
      updatedData.OrganizationContactName = "";
    } else if (fieldName === "organizationName") {
      updatedOrganizationDataValue = null;
      setUserNameSearch("");
      setOrganizationDataValue(null);
    } else if (fieldName === "OrganizationSubscriptionStatus") {
      updatedData.OrganizationSubscriptionStatus = { value: 0, label: "" };
    } else {
      updatedData[fieldName] = "";
    }

    setSearchOrganizationData(updatedData);
    // Clear the current data before fetching new data

    if (currentTab === 1) {
      let newData = {
        OrganizationContactName: searchOrganizationData.OrganizationContactName,
        OrganizationContactEmail: "",
        OrganizationDateTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        OrganizationDateFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        OrganizationSubscriptionStatus: Number(
          searchOrganizationData.OrganizationSubscriptionStatus.value
        ),
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        sRow: 0,
        eRow: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllOrganizationApi({ newData, navigate, t }));
      setSearchBox(false);
      setShowSearchText(true);
    } else if (currentTab === 2) {
      let newData = {
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        ContactPersonName: searchOrganizationData.OrganizationContactName,
        ContactPersonEmail: "",
        DateTimeTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        DateTimeFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
    } else if (currentTab === 3) {
      let newData = {
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        ContactPersonName: searchOrganizationData.OrganizationContactName,
        ContactPersonEmail: "",
        DateTimeTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        DateTimeFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
    }
  };

  // search Button Handler
  const handleSearchButton = () => {
    if (currentTab === 1) {
      let newData = {
        OrganizationContactName: searchOrganizationData.OrganizationContactName,
        OrganizationContactEmail: "",
        OrganizationDateTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        OrganizationDateFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        OrganizationSubscriptionStatus: Number(
          searchOrganizationData.OrganizationSubscriptionStatus.value
        ),
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        sRow: 0,
        eRow: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllOrganizationApi({ newData, navigate, t }));
      setSearchBox(false);
      setShowSearchText(true);
    } else if (currentTab === 2) {
      let newData = {
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        ContactPersonName: searchOrganizationData.OrganizationContactName,
        ContactPersonEmail: "",
        DateTimeTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        DateTimeFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
    } else if (currentTab === 3) {
      let newData = {
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        ContactPersonName: searchOrganizationData.OrganizationContactName,
        ContactPersonEmail: "",
        DateTimeTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        DateTimeFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
    }
  };

  // to reset field on handler reset button
  const handleResetButton = () => {
    setOrganizationDataValue(null);
    setSearchOrganizationData({
      OrganizationContactName: "",
      OrganizationContactEmail: "",
      OrganizationDateFrom: "",
      OrganizationDateTo: "",
      OrganizationName: "",
      OrganizationSubscriptionStatus: {
        value: 0,
        label: "",
      },
      OrganizationDateToView: "",
      OrganizationDateFromView: "",
    });
    if (currentTab === 1) {
      // Current Organizations
      let newData = {
        OrganizationContactName: "",
        OrganizationContactEmail: "",
        OrganizationDateTo: "",
        OrganizationDateFrom: "",
        OrganizationSubscriptionStatus: 0,
        OrganizationName: "",
        sRow: 0,
        eRow: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllOrganizationApi({ newData, navigate, t }));
    } else if (currentTab === 2) {
      // Trail Requests
      let newData = {
        OrganizationName: "",
        ContactPersonName: "",
        ContactPersonEmail: "",
        DateTimeTo: "",
        DateTimeFrom: "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
    } else if (currentTab === 3) {
      // Rejected Requests
      let newData = {
        OrganizationName: "",
        ContactPersonName: "",
        ContactPersonEmail: "",
        DateTimeTo: "",
        DateTimeFrom: "",
        SkipRows: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
    }
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
  };

  // date handler fromDate
  //onChange Date from
  const handleChangeFromDate = (date) => {
    if (date) {
      let getDate = new Date(date);
      let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
      setSearchOrganizationData((prevData) => ({
        ...prevData,
        OrganizationDateFrom: utcDate,
        OrganizationDateFromView: getDate,
      }));
    } else {
      setSearchOrganizationData((prevData) => ({
        ...prevData,
        OrganizationDateFrom: "",
        OrganizationDateFromView: "",
      }));
    }
  };

  const handleChangeToDate = (date) => {
    if (date) {
      let getDate = new Date(date);
      let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
      setSearchOrganizationData((prevData) => ({
        ...prevData,
        OrganizationDateTo: utcDate,
        OrganizationDateToView: getDate,
      }));
    } else {
      setSearchOrganizationData((prevData) => ({
        ...prevData,
        OrganizationDateTo: "",
        OrganizationDateToView: "",
      }));
    }
  };

  const onChangeEventForSearch = (e) => {
    let value = e.target.value;
    setShowSearchText(false);

    // Check if the first character is a space and remove it if it is
    if (value.charAt(0) === " ") {
      value = value.trimStart();
    }
    setUserNameSearch(value);
    console.log("value", value);
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      if (userNameSearch !== "") {
        if (currentTab === 1) {
          // Current Organizations
          let newData = {
            OrganizationContactName: "",
            OrganizationContactEmail: "",
            OrganizationDateTo: "",
            OrganizationDateFrom: "",
            OrganizationSubscriptionStatus: 0,
            OrganizationName: userNameSearch,
            sRow: 0,
            eRow: 10,
          };
          dispatch(viewOrganizationLoader(true));
          dispatch(getAllOrganizationApi({ newData, navigate, t }));
        } else if (currentTab === 2) {
          // Trail Requests
          let newData = {
            OrganizationName: userNameSearch,
            ContactPersonName: "",
            ContactPersonEmail: "",
            DateTimeTo: "",
            DateTimeFrom: "",
            SkipRows: 0,
            Length: 10,
          };
          dispatch(viewOrganizationLoader(true));
          dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
        } else if (currentTab === 3) {
          // Rejected Requests
          let newData = {
            OrganizationName: userNameSearch,
            ContactPersonName: "",
            ContactPersonEmail: "",
            DateTimeTo: "",
            DateTimeFrom: "",
            SkipRows: 0,
            Length: 10,
          };
          dispatch(viewOrganizationLoader(true));
          dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
        }
      }
      setShowSearchText(true);
    }
  };

  return (
    <>
      <Row className='mt-3'>
        <Col lg={7} md={7} sm={7}>
          <span className={"HeadingViewORganization"}>
            {t("View-organization")}
          </span>
        </Col>
        <Col lg={5} md={5} sm={5}>
          <span className='position-relative'>
            <TextField
              onKeyDown={handleKeyDownSearch}
              change={onChangeEventForSearch}
              placeholder={t("Search")}
              value={userNameSearch}
              name={"organizationName"}
              labelClass={"d-none"}
              applyClass={"NewMeetingFileds"}
              inputicon={
                <>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className='d-flex gap-2 align-items-center'>
                      <img
                        src={SearchIcon}
                        alt=''
                        className={"Search_Bar_icon_class"}
                        draggable='false'
                        onClick={HandleopenSearchBox}
                      />
                    </Col>
                  </Row>
                </>
              }
              iconClassName={"d-block"}
            />
            <Row>
              <Col lg={4} md={4} sm={4}>
                {showsearchText && userNameSearch !== "" ? (
                  <div className={"SearchablesItems"}>
                    <span className={"Searches"}>{userNameSearch}</span>
                    <img
                      src={Crossicon}
                      alt=''
                      className={"CrossIcon_Class"}
                      width={13}
                      onClick={() =>
                        handleSearches(userNameSearch, "organizationName")
                      }
                    />
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className='d-flex gap-2 flex-wrap'>
                {showsearchText &&
                  searchOrganizationData.OrganizationContactName && (
                    <div className={"SearchablesItems"}>
                      <span className={"Searches"}>
                        {searchOrganizationData.OrganizationContactName}
                      </span>
                      <img
                        src={Crossicon}
                        alt=''
                        className={"CrossIcon_Class"}
                        width={13}
                        onClick={() =>
                          handleSearches("OrganizationContactName")
                        }
                      />
                    </div>
                  )}

                {showsearchText &&
                searchOrganizationData.OrganizationContactEmail !== "" ? (
                  <div className={"SearchablesItems"}>
                    <span className={"Searches"}>
                      {searchOrganizationData.OrganizationContactEmail}
                    </span>
                    <img
                      src={Crossicon}
                      alt=''
                      className={"CrossIcon_Class"}
                      width={13}
                      onClick={() =>
                        handleSearches(
                          searchOrganizationData.OrganizationContactEmail,
                          "OrganizationContactEmail"
                        )
                      }
                    />
                  </div>
                ) : null}

                {showsearchText &&
                  searchOrganizationData.OrganizationDateFrom && (
                    <div className={"SearchablesItems"}>
                      <span className={"Searches"}>
                        {formatDate(
                          searchOrganizationData.OrganizationDateFrom,
                          currentLanguage
                        )}
                      </span>
                      <img
                        src={Crossicon}
                        alt=''
                        className={"CrossIcon_Class"}
                        width={13}
                        onClick={() => handleSearches("OrganizationDateFrom")}
                      />
                    </div>
                  )}

                {showsearchText &&
                  searchOrganizationData.OrganizationDateTo && (
                    <div className={"SearchablesItems"}>
                      <span className={"Searches"}>
                        {formatDate(
                          searchOrganizationData.OrganizationDateTo,
                          currentLanguage
                        )}
                      </span>
                      <img
                        src={Crossicon}
                        alt=''
                        className={"CrossIcon_Class"}
                        width={13}
                        onClick={() => handleSearches("OrganizationDateTo")}
                      />
                    </div>
                  )}

                {showsearchText && organizationDataValue && (
                  <div className='SearchablesItems'>
                    <span className='Searches'>
                      {organizationDataValue.label}
                    </span>
                    <img
                      src={Crossicon}
                      alt=''
                      className='CrossIcon_Class'
                      width={13}
                      onClick={() => handleSearches("organizationName")}
                    />
                  </div>
                )}

                {showsearchText &&
                  searchOrganizationData.OrganizationSubscriptionStatus
                    .label && (
                    <div className={"SearchablesItems"}>
                      <span className={"Searches"}>
                        {
                          searchOrganizationData.OrganizationSubscriptionStatus
                            .label
                        }
                      </span>
                      <img
                        src={Crossicon}
                        alt=''
                        className={"CrossIcon_Class"}
                        width={13}
                        onClick={() =>
                          handleSearches("OrganizationSubscriptionStatus")
                        }
                      />
                    </div>
                  )}
              </Col>
            </Row>
            {searchBox ? (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12} className={"SearchBox"}>
                    <Row className='mt-2'>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className='d-flex justify-content-end align-items-center'>
                        <img
                          alt=''
                          src={BlackCrossicon}
                          draggable='false'
                          className={"CrossIcon_Class"}
                          onClick={handleCancelSearchbox}
                        />
                      </Col>
                    </Row>
                    <Row className='mt-2'>
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          labelClass={"d-none"}
                          value={searchOrganizationData.OrganizationContactName}
                          name={"OrganizationContactName"}
                          applyClass={"SearchTextFiled"}
                          placeholder={t("Admin-name")}
                          change={searchViewOrganizationHandler}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          labelClass={"d-none"}
                          name={"OrganizationContactEmail"}
                          applyClass={"SearchTextFiled"}
                          placeholder={t("Admin-email")}
                          value={
                            searchOrganizationData.OrganizationContactEmail
                          }
                          change={searchViewOrganizationHandler}
                        />
                      </Col>
                    </Row>
                    <Row className='mt-3'>
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          value={
                            searchOrganizationData.OrganizationDateFromView
                          }
                          format={"MMM DD, YYYY"}
                          placeholder={t("Date-From")}
                          render={
                            <InputIcon
                              placeholder={t("Date-from")}
                              className={"UserLoginHistory_datePicker"}
                            />
                          }
                          editable={false}
                          className='datePickerTodoCreate2'
                          containerClassName={"datePicker_Container"}
                          onOpenPickNewDate={false}
                          inputMode=''
                          calendar={calendarValue}
                          locale={localValue}
                          ref={calendRef}
                          onChange={handleChangeFromDate}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          value={searchOrganizationData.OrganizationDateToView}
                          format={"MMM DD, YYYY"}
                          placeholder={t("Date-to")}
                          render={
                            <InputIcon
                              placeholder={t("Date-to")}
                              className={"UserLoginHistory_datePicker"}
                            />
                          }
                          editable={false}
                          className='datePickerTodoCreate2'
                          containerClassName={"datePicker_Container"}
                          onOpenPickNewDate={false}
                          inputMode=''
                          calendar={calendarValue}
                          locale={localValue}
                          ref={calendRef}
                          onChange={handleChangeToDate}
                        />
                      </Col>
                    </Row>

                    {currentTab === 1 && (
                      <Row className='mt-3'>
                        <Col lg={6} md={6} sm={6}>
                          <Select
                            value={
                              searchOrganizationData
                                .OrganizationSubscriptionStatus?.value !== 0
                                ? searchOrganizationData.OrganizationSubscriptionStatus
                                : null
                            }
                            placeholder={t("Subscription-status")}
                            options={options}
                            onChange={handleStatusChange}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <Select
                            value={organizationDataValue}
                            placeholder={t("Organization")}
                            options={organization.map((item) => ({
                              value: item.organizationID,
                              label: item.organizationName,
                            }))}
                            onChange={organizerChangeHandler}
                          />
                        </Col>
                      </Row>
                    )}

                    <Row className='mt-3'>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className='d-flex justify-content-end gap-2'>
                        <Button
                          text={t("Reset")}
                          className={"SearchBoxResetButton"}
                          onClick={handleResetButton}
                        />
                        <Button
                          text={t("Search")}
                          className={"SearchButton"}
                          onClick={handleSearchButton}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ) : null}
          </span>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col
          lg={12}
          md={12}
          sm={12}
          className='d-flex gap-2 justify-content-start'>
          <span
            onClick={() => {
              setCurrentTab(1);
            }}
            className={
              currentTab === 1
                ? "currenrOrganizationTab_active"
                : "currenrOrganizationTab"
            }>
            {t("Current-organizations")}
          </span>
          <span
            onClick={() => {
              setCurrentTab(2);
            }}
            className={
              currentTab === 2
                ? "currenrOrganizationTab_active"
                : "currenrOrganizationTab"
            }>
            {t("Trail-requests")}
          </span>
          <span
            onClick={() => {
              setCurrentTab(3);
            }}
            className={
              currentTab === 3
                ? "currenrOrganizationTab_active"
                : "currenrOrganizationTab"
            }>
            {t("Rejected-requests")}
          </span>
        </Col>
      </Row>

      {currentTab === 1 && <CurrenrOrganization />}
      {currentTab === 2 && (
        <TrailRequest currentTab={currentTab} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === 3 && (
        <RejectedRequest
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}

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
    </>
  );
};

export default ViewOrganization;
