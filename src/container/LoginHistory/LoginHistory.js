import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginHistory.module.css";
import { Button, Table, TextField } from "../../components/elements";
import { Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import moment from "moment";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import PDFIcon from "../../assets/images/OutletImages/color pdf.svg";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import { validateEmailEnglishAndArabicFormat } from "../../common/functions/Validate";
import { LoginHistoryAPI } from "../../store/Actions/LoginHistoryActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTimeDifference } from "../../common/functions/timeFormatters";
import { newTimeFormaterForImportMeetingAgenda } from "../../common/functions/dateFormatters";

const LoginHistory = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("i18nextLng");

  const UserLoginHistoryData = useSelector(
    (state) => state.loginHistory.loginHistoryData
  );

  console.log(UserLoginHistoryData, "UserLoginHistoryDataUserLoginHistoryData");

  //states for the component
  const [searchBox, setSearchBox] = useState(false);
  const [showsearchText, setShowSearchText] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  const [tablerows, setTablerows] = useState([]);
  console.log(tablerows, "tablerowstablerowstablerowstablerows");
  const [userLoginHistorySearch, setUserLoginHistorySearch] = useState({
    userName: "",
    userEmail: "",
    DateFrom: "",
    DateForView: "",
    DateTo: "",
    DateToView: "",
    IpAddress: "",
    InterFaceType: {
      value: 0,
      label: "",
    },
    Title: "",
  });
  const [isIpAddressValid, setIsIpAddressValid] = useState(false);

  //Login history Api calling
  useEffect(() => {
    let data = {
      OrganizationID: 0,
      Username: "",
      UserEmail: "",
      IpAddress: "",
      DeviceID: "",
      DateLogin: "",
      DateLogOut: "",
      sRow: 0,
      Length: 10,
    };
    dispatch(LoginHistoryAPI({ data, navigate, t }));
  }, []);

  useEffect(() => {
    if (currentLanguage !== null && currentLanguage !== undefined) {
      if (currentLanguage === "en") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_en);
      } else if (currentLanguage === "ar") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
      }
    }
  }, [currentLanguage]);

  useEffect(() => {
    try {
      if (UserLoginHistoryData !== null && UserLoginHistoryData !== undefined) {
        setTablerows(UserLoginHistoryData.result.userLoginHistoryModel);
      }
    } catch {}
  }, [UserLoginHistoryData]);

  console.log(tablerows, "useEffectuseEffect");

  const UserLoginHistoryColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "center",
      ellipsis: true,
      width: 220,
    },
    {
      title: t("User-name"),
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ellipsis: true,
      width: 220,
    },
    {
      title: t("User-email"),
      dataIndex: "emailAddress",
      key: "emailAddress",
      align: "center",
      ellipsis: true,
      width: 200,
    },
    {
      title: t("Login-date-time"),
      dataIndex: "dateLogin",
      key: "dateLogin",
      align: "center",
      width: 200,
      render: (text, record) => {
        return newTimeFormaterForImportMeetingAgenda(text);
      },
    },
    {
      title: t("Logout-date-time"),
      dataIndex: "dateLogOut",
      key: "dateLogOut",
      align: "center",
      width: 200,
      render: (text, record) => {
        return newTimeFormaterForImportMeetingAgenda(text);
      },
    },
    {
      title: t("Session-duration"),
      dataIndex: "decision",
      key: "decision",
      align: "center",
      width: 150,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return getTimeDifference(record.dateLogin, record.dateLogOut);
      },
    },
    {
      title: t("Interface"),
      dataIndex: "deviceID",
      align: "center",
      key: "deviceID",
      width: 100,

      render: (text, data) => (
        <span className={styles["voterCountStyle"]}>{text}</span>
      ),
    },
    {
      title: t("Ip-address"),
      dataIndex: "loggedInFromIP",
      align: "center",
      key: "loggedInFromIP",
      width: 120,
    },
  ];

  const HandleopenSearchBox = () => {
    setSearchBox(!searchBox);
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
  };

  const validateIPInput = (value) => {
    const ipRegex = /^(\d{1,3}\.){0,3}\d{0,3}$/;
    return ipRegex.test(value);
  };

  const handleChangeFromDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setUserLoginHistorySearch({
      ...userLoginHistorySearch,
      DateFrom: utcDate,
      DateForView: getDate,
    });
  };

  const handleChangeToDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setUserLoginHistorySearch({
      ...userLoginHistorySearch,
      DateTo: utcDate,
      DateToView: getDate,
    });
  };

  const handleChangeSearchBoxValues = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log({ name, value }, "handleChangeSearchBoxValues");

    // For userName or Title, ensure only letters and whitespace are allowed
    if (name === "userName" || name === "Title") {
      if (value !== "") {
        let valueCheck = /^[A-Za-z\s]*$/i.test(value);
        if (valueCheck) {
          setUserLoginHistorySearch((prevState) => ({
            ...prevState,
            [name]: value.trim(),
          }));
        }
      } else {
        setUserLoginHistorySearch((prevState) => ({
          ...prevState,
          userName: "",
          Title: "",
        }));
      }
    } else if (name === "userEmail") {
      setUserLoginHistorySearch((prevState) => ({
        ...prevState,
        userEmail: value.trim(),
      }));
    }

    // For IpAddress, validate the input and update the state accordingly
    if (name === "IpAddress") {
      if (value !== "") {
        if (validateIPInput(value)) {
          setUserLoginHistorySearch((prevState) => ({
            ...prevState,
            IpAddress: value.trim(),
          }));
          setIsIpAddressValid(true);
        } else {
          setIsIpAddressValid(false);
        }
      } else {
        setUserLoginHistorySearch((prevState) => ({
          ...prevState,
          IpAddress: "",
        }));
        setIsIpAddressValid(true);
      }
    }
  };

  const InterfaceOptions = [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "Tablet", label: "Tablet" },
  ];

  const handleSearh = () => {
    try {
      if (
        userLoginHistorySearch.userName !== "" ||
        userLoginHistorySearch.Title !== "" ||
        userLoginHistorySearch.userEmail !== "" ||
        userLoginHistorySearch.IpAddress !== "" ||
        userLoginHistorySearch.InterFaceType.value !== 0 ||
        userLoginHistorySearch.DateFrom !== "" ||
        userLoginHistorySearch.DateTo !== "" ||
        validateEmailEnglishAndArabicFormat(userLoginHistorySearch.userEmail)
      ) {
        let data = {
          OrganizationID: 0,
          Username: userLoginHistorySearch.userName,
          UserEmail: userLoginHistorySearch.userEmail,
          IpAddress: userLoginHistorySearch.IpAddress,
          DeviceID: "1",
          DateLogin: userLoginHistorySearch.DateFrom,
          DateLogOut: userLoginHistorySearch.DateTo,
          sRow: 0,
          Length: 10,
        };
        dispatch(LoginHistoryAPI({ data, navigate, t }));
        setSearchBox(false);
        setShowSearchText(true);
      } else {
      }
    } catch {}
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let Data = {
        OrganizationID: 0,
        Username: userLoginHistorySearch.userName,
        UserEmail: userLoginHistorySearch.userEmail,
        IpAddress: userLoginHistorySearch.IpAddress,
        DeviceID:
          userLoginHistorySearch.InterFaceType.value === 0
            ? ""
            : userLoginHistorySearch.InterFaceType.value,
        DateLogin: userLoginHistorySearch.DateFrom,
        DateLogOut: userLoginHistorySearch.DateTo,
        sRow: 0,
        Length: 10,
      };
      dispatch(LoginHistoryAPI({ Data, navigate, t }));
      setUserLoginHistorySearch([
        ...userLoginHistorySearch,
        userLoginHistorySearch.userName,
      ]);
    }
  };

  const handleSearches = (Data, fieldName) => {
    console.log(Data, fieldName, "datadatadatahandleSearches");
    setUserLoginHistorySearch({
      ...userLoginHistorySearch,
      [fieldName]: "",
    });

    let data = {
      Username: fieldName === "userName" ? "" : userLoginHistorySearch.userName,
      UserEmail:
        fieldName === "userEmail" ? "" : userLoginHistorySearch.userEmail,
      IpAddress:
        fieldName === "IpAddress" ? "" : userLoginHistorySearch.IpAddress,
      DeviceID: "",
      DateLogin:
        fieldName === "DateFrom" ? "" : userLoginHistorySearch.DateFrom,
      DateLogOut: fieldName === "DateTo" ? "" : userLoginHistorySearch.DateTo,
      sRow: 0,
      Length: 10,
    };
    console.log(data, "consoleconsole");
    dispatch(LoginHistoryAPI({ data, navigate, t }));
  };

  const handleReset = () => {
    try {
      setShowSearchText(false);
      setUserLoginHistorySearch({
        ...userLoginHistorySearch,
        userName: "",
        userEmail: "",
        DateFrom: "",
        DateForView: "",
        DateTo: "",
        DateToView: "",
        IpAddress: "",
        InterFaceType: {
          value: 0,
          label: "",
        },
        Title: "",
      });
    } catch (error) {
      console.log(error, "userLoginHistorySearchuserLoginHistorySearch");
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col lg={5} md={5} sm={5}>
          <span className={styles["HeadingViewORganization"]}>
            {t("User-login-history")}
          </span>
        </Col>
        <Col lg={2} md={2} sm={2} className="d-flex justify-content-end">
          <span className={styles["Export_To_Excel"]}>
            <img src={PDFIcon} alt="" draggable="false" />
            <span>Export to Excel</span>
          </span>
        </Col>
        <Col lg={5} md={5} sm={5}>
          <span className="position-relative">
            <TextField
              labelClass={"d-none"}
              applyClass={"NewMeetingFileds"}
              inputicon={
                <>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex gap-2 align-items-center"
                    >
                      <img
                        src={SearchIcon}
                        alt=""
                        className={styles["Search_Bar_icon_class"]}
                        draggable="false"
                        onClick={HandleopenSearchBox}
                      />
                    </Col>
                  </Row>
                </>
              }
              iconClassName={"d-block"}
            />
            <Row>
              <Col lg={12} md={12} sm={12} className="d-flex gap-2 flex-wrap">
                {showsearchText && userLoginHistorySearch.userName !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {userLoginHistorySearch.userName}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(
                          userLoginHistorySearch.userName,
                          "userName"
                        )
                      }
                    />
                  </div>
                ) : null}

                {showsearchText && userLoginHistorySearch.Title !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {userLoginHistorySearch.Title}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(userLoginHistorySearch.Title, "Title")
                      }
                    />
                  </div>
                ) : null}

                {showsearchText && userLoginHistorySearch.userEmail !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {userLoginHistorySearch.userEmail}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(
                          userLoginHistorySearch.userEmail,
                          "userEmail"
                        )
                      }
                    />
                  </div>
                ) : null}

                {showsearchText && userLoginHistorySearch.IpAddress !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {userLoginHistorySearch.IpAddress}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(
                          userLoginHistorySearch.IpAddress,
                          "IpAddress"
                        )
                      }
                    />
                  </div>
                ) : null}

                {showsearchText && userLoginHistorySearch.DateFrom !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {moment
                        .utc(userLoginHistorySearch.DateFrom, "YYYYMMDD")
                        .format("DD-MMM-YYYY")}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(
                          userLoginHistorySearch.DateFrom,
                          "DateFrom"
                        )
                      }
                    />
                  </div>
                ) : null}

                {showsearchText && userLoginHistorySearch.DateTo !== "" ? (
                  <div className={styles["SearchablesItems"]}>
                    <span className={styles["Searches"]}>
                      {moment
                        .utc(userLoginHistorySearch.DateTo, "YYYYMMDD")
                        .format("DD-MMM-YYYY")}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className={styles["CrossIcon_Class"]}
                      width={13}
                      onClick={() =>
                        handleSearches(userLoginHistorySearch.DateTo, "DateTo")
                      }
                    />
                  </div>
                ) : null}
              </Col>
            </Row>
            {searchBox ? (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12} className={styles["SearchBox"]}>
                    <Row className="mt-2">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <img
                          alt=""
                          src={BlackCrossicon}
                          draggable="false"
                          className={styles["crossIconClass"]}
                          onClick={handleCancelSearchbox}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          placeholder={t("User-name")}
                          name={"userName"}
                          onKeyDown={handleKeyDown}
                          type="text"
                          labelClass={"d-none"}
                          value={userLoginHistorySearch.userName}
                          change={handleChangeSearchBoxValues}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          labelClass={"d-none"}
                          name={"userEmail"}
                          type="email"
                          value={userLoginHistorySearch.userEmail}
                          change={handleChangeSearchBoxValues}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          value={userLoginHistorySearch.DateForView}
                          format={"DD/MM/YYYY"}
                          placeholder="DD/MM/YYYY"
                          render={
                            <InputIcon
                              placeholder="DD/MM/YYYY"
                              className="datepicker_input"
                            />
                          }
                          editable={false}
                          className="datePickerTodoCreate2"
                          onOpenPickNewDate={false}
                          inputMode=""
                          calendar={calendarValue}
                          locale={localValue}
                          ref={calendRef}
                          onChange={handleChangeFromDate}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          value={userLoginHistorySearch.DateToView}
                          format={"DD/MM/YYYY"}
                          placeholder="DD/MM/YYYY"
                          render={
                            <InputIcon
                              placeholder="DD/MM/YYYY"
                              className="datepicker_input"
                            />
                          }
                          editable={false}
                          className="datePickerTodoCreate2"
                          onOpenPickNewDate={false}
                          inputMode=""
                          calendar={calendarValue}
                          locale={localValue}
                          ref={calendRef}
                          onChange={handleChangeToDate}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={6}>
                        {/* <Select options={options} /> */}
                        <TextField
                          labelClass={"d-none"}
                          placeholder={t("Ip-address")}
                          value={userLoginHistorySearch.IpAddress}
                          name={"IpAddress"}
                          change={handleChangeSearchBoxValues}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Select
                          options={InterfaceOptions}
                          placeholder={t("Interface")}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-end gap-2"
                      >
                        <Button
                          text={t("Reset")}
                          className={styles["SearchBoxResetButton"]}
                          onClick={handleReset}
                        />
                        <Button
                          text={t("Search")}
                          className={styles["SearchButton"]}
                          onClick={handleSearh}
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
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <Table
            column={UserLoginHistoryColoumn}
            pagination={false}
            rows={tablerows}
            footer={false}
            className={"userlogin_history_tableP"}
            size={"small"}
            scroll={{
              x: false,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginHistory;
