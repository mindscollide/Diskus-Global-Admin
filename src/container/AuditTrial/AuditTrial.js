import React, { useEffect, useState } from "react";
import styles from "./AuditTrial.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import Select from "react-select";
import gregorian_en from "react-date-object/locales/gregorian_en";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, TextField } from "../../components/elements";
import {
  getAllOrganizationNameMainApi,
  getOrganizationUserAuditActionsAPI,
  getOrganizationUserAuditListingAPI,
} from "../../store/Actions/GlobalAdminDashboardActions";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import CrossIcon from "../../assets/images/NewElements/BlackCrossIconModals.svg";
import DatePicker from "react-multi-date-picker";
import { AuditTrialDateTimeFunction } from "../../common/functions/dateFormatters";
import ViewActionModal from "./ViewActionModal/ViewActionModal";
import { useTableScrollBottom } from "../../common/functions/useTableScrollBottom";
const AuditTrial = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentlang = localStorage.getItem("currentLanguage");
  console.log(currentlang, "localelocale");
  //Calling Get Audit Listing
  const GetAuditListingReducerGlobalState = useSelector(
    (state) => state.globalAdminDashboardReducer.getOrganizationAuditListingData
  );

  //All Orgniazations Data
  const organizationIdData = useSelector(
    (state) => state.globalAdminDashboardReducer.getOrganizationNames
  );

  // Local States
  const [auditTrialListingTableData, setAuditTrialListingTableData] = useState(
    []
  );
  const [totalRecords, setTotalRecords] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [organization, setOrganization] = useState([]);
  const [isRowsData, setSRowsData] = useState(0);
  const [searchBar, setSearchBar] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  const [enterPressedSearch, setEnterPressedSearch] = useState(false);
  const [selectOrganization, setSelectOrganization] = useState({
    value: 0,
    label: "",
  });
  const [viewActionModalDataState, setViewActionModalDataState] = useState([]);
  const [auditTrialSearch, setAuditTrialSearch] = useState({
    title: "",
    userName: "",
    IpAddress: "",
    LoginDate: "",
    LoginDateView: "",
    LogoutDate: "",
    LogoutDateView: "",
    LogoutTime: "",
    LogoutTimeView: "",
    LoginTime: "",
    LoginTimeView: "",
    Interface: {
      value: 0,
      label: "",
    },
  });

  //Calling Get Audit Listing API
  useEffect(() => {
    try {
      let data = {
        Username: "",
        IpAddress: "",
        DeviceID: "",
        DateLogin: "",
        DateLogOut: "",
        OrganizationName: "",
        sRow: 0,
        Length: 10,
      };
      dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
      dispatch(getAllOrganizationNameMainApi({ navigate, t }));
    } catch (error) {
      console.log(error, "errorerrorerror");
    }
    return () => {
      setAuditTrialSearch({
        userName: "",
        IpAddress: "",
        LoginDate: "",
        LoginDateView: "",
        LogoutDate: "",
        LogoutDateView: "",
        LogoutTime: "",
        LogoutTimeView: "",
        LoginTime: "",
        LoginTimeView: "",
        Interface: {
          value: 0,
          label: "",
        },
      });
    };
  }, []);

  // Extracting the Audit listing Data
  useEffect(() => {
    try {
      const result = GetAuditListingReducerGlobalState?.result;

      if (
        result &&
        result.organizationUserAuditListingModel?.length > 0 &&
        result.totalCount > 0
      ) {
        const newData = result.organizationUserAuditListingModel;

        if (isScroll) {
          setAuditTrialListingTableData((prev) => [...prev, ...newData]);
        } else {
          setAuditTrialListingTableData(newData);
        }

        setSRowsData((prev) => prev + newData.length);
        setTotalRecords(result.totalCount);
        setIsScroll(false);
      } else {
        if (!isScroll) {
          setAuditTrialListingTableData([]);
          setTotalRecords(0);
          setSRowsData(0);
        }
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [GetAuditListingReducerGlobalState]);

  //Extracting the Orgnaizaitons Names Data
  useEffect(() => {
    if (
      organizationIdData !== null &&
      organizationIdData !== undefined &&
      organizationIdData?.result?.organizations.length > 0
    ) {
      const formatted = organizationIdData.result.organizations.map((org) => ({
        value: org.organizationID,
        label: org.organizationName,
      }));
      setOrganization(formatted);
    } else {
      setOrganization([]);
    }
  }, [organizationIdData]);

  //Handling the Arabic
  useEffect(() => {
    if (currentlang !== null && currentlang !== undefined) {
      if (currentlang === "en") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_en);
      } else if (currentlang === "ar") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
      }
    }
  }, [currentlang]);

  //handle View ActionModal
  const handleViewActionModal = (record) => {
    setViewActionModalDataState(record);
    let data = { UserLoginHistoryID: Number(record.userLoginHistoryID) };
    dispatch(getOrganizationUserAuditActionsAPI({ data, navigate, t }));
  };

  // columns Audit Trial
  const AuditTrialColumns = [
    {
      title: t("Organization"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>
              {record.organizationName}
            </span>
          </>
        );
      },
    },
    {
      title: t("User"),
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>{record.userName}</span>
          </>
        );
      },
    },

    {
      title: t("IP"),
      dataIndex: "loggedInFromIP",
      key: "loggedInFromIP",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>
              {record.loggedInFromIP}
            </span>
          </>
        );
      },
    },

    {
      title: t("Interface"),
      dataIndex: "deviceID",
      key: "deviceID",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        const deviceType =
          record.deviceID === "1"
            ? "Web"
            : record.deviceID === "2"
            ? "Mobile"
            : "Tablet";
        return <span className={styles["NameStylesTable"]}>{deviceType}</span>;
      },
    },

    {
      title: t("Login"),
      dataIndex: "dateLogin",
      key: "dateLogin",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>
              {AuditTrialDateTimeFunction(record.dateLogin, currentlang)}
            </span>
          </>
        );
      },
    },

    {
      title: t("Action"),
      dataIndex: "Action",
      key: "Action",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>
              {record.actionCount} Actions taken
            </span>
          </>
        );
      },
    },

    {
      title: t("Logout"),
      dataIndex: "dateLogOut",
      key: "dateLogOut",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            <span className={styles["NameStylesTable"]}>
              {AuditTrialDateTimeFunction(record.dateLogOut, currentlang)}
            </span>
          </>
        );
      },
    },
    {
      title: t("View-action"),
      dataIndex: "viewAction",
      key: "viewAction",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <Button
              text={t("View-action")}
              className={styles["ViewActions"]}
              onClick={() => handleViewActionModal(record)}
            />
          </>
        );
      },
    },
  ];

  //Handle Search icon
  const handleSearchIcon = () => {
    setSearchBar(!searchBar);
  };

  //Validation IP
  const validateIPInput = (value) => {
    const ipRegex = /^(\d{1,3}\.){0,3}\d{0,3}$/;
    return ipRegex.test(value);
  };

  //Devices
  const DeviceIdType = [
    {
      label: "Browser",
      value: 1,
    },
    {
      label: "Mobile",
      value: 2,
    },
    {
      label: "Tablet",
      value: 3,
    },
  ];

  //Handle Search Box entities
  const handeSearchBoxTextField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log({ name, value }, "handleChangeSearchBoxValues");

    // Normalize the key to match state
    const key = name.charAt(0).toLowerCase() + name.slice(1);

    if (name === "UserName" || name === "Title") {
      if (value !== "") {
        console.log("saif");
        let valueCheck = /^[A-Za-z\s]*$/i.test(value);
        if (valueCheck) {
          setAuditTrialSearch((prevState) => ({
            ...prevState,
            [key]: value.trim(),
          }));
        } else {
          setAuditTrialSearch((prevState) => ({
            ...prevState,
            userName: "",
            title: "",
          }));
        }
      } else {
        console.log("saif");
        setAuditTrialSearch((prevState) => ({
          ...prevState,
          userName: "",
          title: "",
        }));
      }
    }

    if (name === "IPAddress") {
      if (value !== "") {
        if (validateIPInput(value)) {
          setAuditTrialSearch((prevState) => ({
            ...prevState,
            IpAddress: value.trim(),
          }));
        }
      } else {
        setAuditTrialSearch((prevState) => ({
          ...prevState,
          IpAddress: "",
        }));
      }
    }
  };

  //Handle Change React Select logout Time
  const handleChangeInterface = (event) => {
    setAuditTrialSearch({
      ...auditTrialSearch,
      Interface: {
        label: event.label,
        value: event.value,
      },
    });
  };

  // Handle Change organization
  const handleChangeOrganization = (option) => {
    setSelectOrganization(option);
  };

  //handle Login Date Change
  const handleChangeLoginDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setAuditTrialSearch({
      ...auditTrialSearch,
      LoginDate: utcDate,
      LoginDateView: getDate,
    });
  };

  // Handle Logout Date Change
  const handleChangeLogoutDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setAuditTrialSearch({
      ...auditTrialSearch,
      LogoutDate: utcDate,
      LogoutDateView: getDate,
    });
  };

  //handle Search Button in Search Popup
  const handleSearchAuditTrialListing = () => {
    let data = {
      Username: auditTrialSearch.userName || "",
      IpAddress: auditTrialSearch.IpAddress || "",
      DeviceID: auditTrialSearch.Interface?.value
        ? String(auditTrialSearch.Interface.value)
        : "",
      DateLogin: auditTrialSearch.LoginDate || "",
      DateLogOut: auditTrialSearch.LogoutDate || "",
      OrganizationName: selectOrganization.label || "",
      sRow: 0,
      Length: 10,
    };
    console.log(data, "handleSearchAuditTrialListing");
    console.log(typeof data.Username, "handleSearchAuditTrialListing");
    dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
    setSearchBar(false);
  };

  //Handle Reset Button
  const handleResetButton = () => {
    try {
      let data = {
        Username: "",
        IpAddress: "",
        DeviceID: "",
        DateLogin: "",
        DateLogOut: "",
        OrganizationName: "",
        sRow: 0,
        Length: 10,
      };
      dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
      setSearchBar(false);
      setEnterPressedSearch(false);
      setAuditTrialSearch({
        ...auditTrialSearch,
        userName: "",
        IpAddress: "",
        LoginDate: "",
        LoginDateView: "",
        LogoutDate: "",
        LogoutDateView: "",
        LogoutTime: "",
        LogoutTimeView: "",
        LoginTime: "",
        LoginTimeView: "",
        Interface: {
          value: 0,
          label: "",
        },
      });
      setSelectOrganization({
        value: 0,
        label: "",
      });
    } catch (error) {
      console.log(error, "errorerror");
    }
  };

  //Handle Enter Pressed Search
  const handlePressedEnterSearch = () => {
    try {
      let data = {
        Username: "",
        IpAddress: "",
        DeviceID: "",
        DateLogin: "",
        DateLogOut: "",
        OrganizationName: "",
        sRow: 0,
        Length: 10,
      };
      dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
      setSearchBar(false);
      setEnterPressedSearch(false);
      setAuditTrialSearch({
        ...auditTrialSearch,
        title: "",
        userName: "",
        IpAddress: "",
        LoginDate: "",
        LoginDateView: "",
        LogoutDate: "",
        LogoutDateView: "",
        LogoutTime: "",
        LogoutTimeView: "",
        LoginTime: "",
        LoginTimeView: "",
        Interface: {
          value: 0,
          label: "",
        },
      });
      setSelectOrganization({
        value: 0,
        label: "",
      });
    } catch (error) {
      console.log(error, "errorerror");
    }
  };

  //Enter key pressed Search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let data = {
        Username: auditTrialSearch.title,
        IpAddress: auditTrialSearch.IpAddress,
        DeviceID: auditTrialSearch.Interface?.value
          ? String(auditTrialSearch.Interface.value)
          : "",
        DateLogin: auditTrialSearch.LoginDate,
        DateLogOut: auditTrialSearch.LogoutDate,
        OrganizationName: "",
        sRow: 0,
        Length: 10,
      };
      dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
      setEnterPressedSearch(true);
    }
  };

  //Search bar cross icon
  const handleCrossIcon = () => {
    setSearchBar(false);
  };

  //Handle Scroll Function
  useTableScrollBottom(async () => {
    if (auditTrialListingTableData.length >= totalRecords) return;

    setIsScroll(true);

    const data = {
      Username: "",
      IpAddress: "",
      DeviceID: "",
      DateLogin: "",
      DateLogOut: "",
      OrganizationName: "",
      sRow: isRowsData, // starting row
      Length: 10,
    };

    await dispatch(getOrganizationUserAuditListingAPI({ data, navigate, t }));
  });

  return (
    <Container fluid>
      <>
        <Row className="mt-2">
          <Col lg={8} md={8} sm={8} className="d-flex">
            <span className={styles["AuditTrialHeading"]}>
              {t("Audit-trial")}
            </span>
          </Col>
          <Col lg={4} md={4} sm={4}>
            <section className={styles["report_search_Box"]}>
              <TextField
                applyClass={"NewMeetingFileds"}
                labelclass={"d-none"}
                width={"100%"}
                iconclassname={"d-block"}
                value={auditTrialSearch.title}
                onKeyDown={handleKeyDown}
                change={handeSearchBoxTextField}
                placeholder={`${t("Search")}...`}
                name={"Title"}
                iconClassName={"d-block"}
                inputicon={
                  <img
                    draggable="false"
                    src={SearchIcon}
                    alt=""
                    className={styles["Search_Bar_icon_class"]}
                    onClick={handleSearchIcon}
                  />
                }
              />
              {enterPressedSearch && (
                <img
                  src={CrossIcon}
                  className={styles["SearchFieldCrossIcon"]}
                  onClick={handlePressedEnterSearch}
                  alt=""
                />
              )}
              {searchBar && (
                <>
                  <span className={styles["SearchBoxAuditTrial"]}>
                    <Row className="mt-2">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <img
                          src={CrossIcon}
                          className="cursor-pointer"
                          alt=""
                          onClick={handleCrossIcon}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          labelclass={"d-none"}
                          label={
                            <>
                              <span className={styles["SearchBoxEntities"]}>
                                {t("User")}
                              </span>
                            </>
                          }
                          applyClass={"SearchTextFiled"}
                          width={"100%"}
                          value={auditTrialSearch.userName}
                          iconclassname={"d-block"}
                          placeholder={`${t("UserName")}...`}
                          name={"UserName"}
                          change={handeSearchBoxTextField}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <TextField
                          labelclass={"d-none"}
                          label={
                            <>
                              <span className={styles["SearchBoxEntities"]}>
                                {t("IP")}
                              </span>
                            </>
                          }
                          applyClass={"SearchTextFiled"}
                          width={"100%"}
                          value={auditTrialSearch.IpAddress}
                          iconclassname={"d-block"}
                          placeholder={`${t("IP")}`}
                          name={"IPAddress"}
                          change={handeSearchBoxTextField}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col lg={6} md={6} sm={6}>
                        <div className="d-flex flex-column flex-wrap  gap-1">
                          <span className={styles["SearchBoxEntities"]}>
                            {t("Login-date")}
                          </span>

                          <DatePicker
                            format={"DD/MM/YYYY"}
                            placeholder={t("Login-date")}
                            value={auditTrialSearch.LoginDateView}
                            render={
                              <InputIcon
                                placeholder={t("Date-from")}
                                className={
                                  styles["UserLoginHistory_datePicker"]
                                }
                              />
                            }
                            editable={false}
                            className="datePickerTodoCreate2"
                            containerClassName={styles["datePicker_Container"]}
                            onOpenPickNewDate={true}
                            inputMode=""
                            calendar={calendarValue}
                            locale={localValue}
                            onFocusedDateChange={handleChangeLoginDate}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="d-flex flex-column flex-wrap gap-1">
                          <span className={styles["SearchBoxEntities"]}>
                            {t("Logout-date")}
                          </span>

                          <DatePicker
                            format={"DD/MM/YYYY"}
                            placeholder={t("Logout-date")}
                            value={auditTrialSearch.LogoutDateView}
                            render={
                              <InputIcon
                                placeholder={t("Logout-date")}
                                className={
                                  styles["UserLoginHistory_datePicker"]
                                }
                              />
                            }
                            editable={false}
                            className="datePickerTodoCreate2"
                            onOpenPickNewDate={true}
                            containerClassName={styles["datePicker_Container"]}
                            inputMode=""
                            calendar={calendarValue}
                            locale={localValue}
                            onFocusedDateChange={handleChangeLogoutDate}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col lg={6} md={6} sm={6}>
                        <div className="d-flex flex-column flex-wrap gap-1">
                          <span className={styles["SearchBoxEntities"]}>
                            {t("Interface")}
                          </span>
                          <Select
                            placeholder={t("Interface")}
                            options={DeviceIdType}
                            onChange={handleChangeInterface}
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="d-flex flex-column flex-wrap gap-1">
                          <span className={styles["SearchBoxEntities"]}>
                            {t("Organization")}
                          </span>
                          <Select
                            placeholder={t("Organization")}
                            options={organization}
                            value={
                              selectOrganization.value !== 0
                                ? selectOrganization
                                : null
                            }
                            onChange={handleChangeOrganization}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-end gap-2 align-items-center"
                      >
                        <Button
                          text={t("Reset")}
                          className={styles["ResetBtn"]}
                          onClick={handleResetButton}
                        />
                        <Button
                          text={t("Search")}
                          className={styles["SearchBtn"]}
                          onClick={handleSearchAuditTrialListing}
                        />
                      </Col>
                    </Row>
                  </span>
                </>
              )}
            </section>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col lg={12} md={12} sm={12}>
            <span className={styles["AuditTrial_Box"]}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={AuditTrialColumns}
                    rows={auditTrialListingTableData}
                    pagination={false}
                    footer={false}
                    className={"userlogin_history_tableP"}
                    size="small"
                    scroll={{ y: "49vh", x: "100%" }}
                  />
                </Col>
              </Row>
            </span>
          </Col>
        </Row>
      </>
      <ViewActionModal viewActionModalDataState={viewActionModalDataState} />
    </Container>
  );
};

export default AuditTrial;
