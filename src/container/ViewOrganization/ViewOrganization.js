import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewOrganization.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  Button,
  Table,
  TextField,
  Notification,
} from "../../components/elements";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import Select from "react-select";
import EditIcon from "../../assets/images/OutletImages/Edit_Icon.svg";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  editOrganizationModalOpen,
  editOrganizationSubscriptionModalOpen,
  editSubscriptionModalOpen,
} from "../../store/ActionsSlicers/UIModalsActions";
import { useDispatch, useSelector } from "react-redux";
import EditSubscriptionModal from "./EditSubscriptionModal/EditSubscriptionModal";
import {
  searchOrganizationApi,
  getAllOrganizationApi,
} from "../../store/Actions/ViewOrganizationActions";
import { useNavigate } from "react-router-dom";
import {
  convertUTCDateToLocalDate,
  formatDate,
} from "../../common/functions/dateFormatters";
import moment from "moment";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import EditOrganizationSubscription from "./EditOrganizationSubscriptionModal/EditOrganizationSubscription";
import ViewOrganizationModal from "./ViewOrganizationModal/ViewOrganizationModal";
import FlagCountryName from "./CountryFlagFunctionality/CountryFlag";

const ViewOrganization = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("currentLanguage");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";

  const ModalReducer = useSelector((state) => state.modal);

  const isEditSubscriptionModalOpen = useSelector(
    (state) => state.modal.editSubscriptionModal
  );

  const Responsemessage = useSelector(
    (state) => state.searchOrganization.Responsemessage
  );

  const ViewOrganizationData = useSelector(
    (state) => state.searchOrganization.searchOrganizationData
  );

  const organizationIdData = useSelector(
    (state) => state.searchOrganization.getAllOrganizationData
  );

  const [organizationData, setOrganizationData] = useState([]);
  const [aminNameSearch, setAminNameSearch] = useState("");

  const [organizationDataValue, setOrganizationDataValue] = useState(null);
  console.log(
    organizationDataValue,
    "organizationDataValueorganizationDataValue"
  );

  const [openNotification, setOpenNotification] = useState({
    organizationFlag: false,
    organizationNotification: null,
    severity: "none",
  });

  // open edit subscription modal
  // const [editSubModal, setEditSubModal] = useState(false);
  // console.log(editSubModal, "editSubModal");

  //States for the component
  const [showsearchText, setShowSearchText] = useState(false);
  const [searchorganizationID, setSearchOrganizationID] = useState(0);
  const [editOrganizationID, setEditOrganizationID] = useState(0);
  const [editOrganzationName, setEditOrganzationName] = useState("");
  const [editSubscriptionName, setEditSubscriptionName] = useState("");

  // view organization modal
  const [viewOrganizationModal, setViewOrganizationModal] = useState("");

  const [currentSubscriptionName, setCurrentSubscriptionName] = useState(0);
  const [
    currentOrganisationSubscriptionName,
    setCurrentOrganisationSubscriptionName,
  ] = useState(0);

  const [organizationID, setOrganizationID] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isRowsData, setSRowsData] = useState(0);
  const [searchBox, setSearchBox] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);
  const [viewOrganizationData, setViewOrganizationData] = useState([]);
  const [searchOrganizationData, setSearchOrganizationData] = useState({
    userName: "",
    userEmail: "",
    DateFrom: "",
    DateTo: "",
    DateToView: "",
    DateFromView: "",
    Status: {
      value: 0,
      label: "",
    },
    OrganizationID: {
      value: 0,
      label: "",
    },
  });

  //Calling Organization Api
  useEffect(() => {
    let data = {
      OrganizationID: 0,
      CountryID: 0,
      ContactPersonName: "",
      Email: "",
      StatusID: 0,
      PackageID: 0,
      SubsictionExpiryStart: "",
      SubscriptionExpiryEnd: "",
      sRow: 0,
      Length: 10,
    };
    dispatch(viewOrganizationLoader(true));
    let newData = {
      OrganizationContactName: "",
      OrganizationContactEmail: "",
      OrganizationDateTo: "",
      OrganizationDateFrom: "",
      OrganizationSubscriptionStatus: 0,
      OrganizationName: "",
    };
    dispatch(getAllOrganizationApi({ newData, navigate, t }));
    dispatch(searchOrganizationApi({ data, navigate, t }));
    return () => {
      setSearchOrganizationData({
        userName: "",
        userEmail: "",
        DateFrom: "",
        DateTo: "",
        DateToView: "",
        DateFromView: "",
        Status: {
          value: 0,
          label: "",
        },
        OrganizationID: {
          value: 0,
          label: "",
        },
      });
      setShowSearchText(false);
    };
  }, []);

  useEffect(() => {
    console.log(
      organizationIdData,
      "getAllOrganizationDatagetAllOrganizationData"
    );
    if (
      organizationIdData?.result !== null &&
      organizationIdData?.result !== undefined &&
      organizationIdData?.result.length > 0
    ) {
      setOrganizationData(
        organizationIdData.result.map((item) => ({
          value: item.organizationID,
          label: item.organizationName,
        }))
      );
    }
  }, [organizationIdData]);

  const organizerChangeHandler = (selectedOrganizer) => {
    console.log(selectedOrganizer, "selectedOrganizerselectedOrganizer");
    setSearchOrganizationID(selectedOrganizer.value);
    setOrganizationDataValue(selectedOrganizer);
  };

  useEffect(() => {
    try {
      if (ViewOrganizationData !== null && ViewOrganizationData !== undefined) {
        if (
          ViewOrganizationData.result.searchOrganizations.length > 0 &&
          ViewOrganizationData.result.totalCount > 0
        ) {
          if (isScroll) {
            setIsScroll(false);
            //copy pf the rows of table
            let copyData = [...viewOrganizationData];
            ViewOrganizationData.result.searchOrganizations.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setViewOrganizationData(copyData);
            setSRowsData(
              (prev) =>
                prev + ViewOrganizationData.result.searchOrganizations.length
            );
            setTotalRecords(ViewOrganizationData.result.totalCount);
          } else {
            setViewOrganizationData(
              ViewOrganizationData.result.searchOrganizations
            );
            setTotalRecords(ViewOrganizationData.result.totalCount);
            setSRowsData(
              ViewOrganizationData.result.userLoginHistoryModel.length
            );
          }
        } else {
          setViewOrganizationData([]);
          setTotalRecords(0);
          setSRowsData(0);
        }
      }
    } catch {}
  }, [ViewOrganizationData]);

  const ViewOrganizationColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "left",
      ellipsis: true,
      width: 220,
      render: (text, record) => (
        <>
          <span
            className={styles["inner-organization-heading-view-modal"]}
            onClick={() => handleViewOrganizationModal(record)}
          >
            {text}
          </span>
        </>
      ),
    },
    {
      title: t("Admin-name"),
      dataIndex: "contactPersonName",
      key: "contactPersonName",
      align: "left",
      ellipsis: true,
      width: 220,
      render: (text, record) => (
        <>
          <span className={styles["inner-sub-Heading"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Contact-number"),
      dataIndex: "number",
      key: "number",
      align: "center",
      ellipsis: true,
      width: 200,
      render: (text, record) => (
        <>
          <span className="d-flex gap-2">
            <FlagCountryName countryCode={record.mobileCode} />
            <span className={styles["inner-sub-Heading"]}>{text}</span>
          </span>
        </>
      ),
    },
    {
      title: t("Subscription-expiry"),
      dataIndex: "subscriptionExpiry",
      key: "subscriptionExpiry",
      align: "center",
      width: 200,
      render: (text, record) => {
        return (
          <div className={styles["inner-sub-Heading"]}>
            {text != "" &&
              convertUTCDateToLocalDate(text + "235958", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Subscription-status"),
      dataIndex: "currentSubscrtionStatus",
      key: "currentSubscrtionStatus",
      align: "center",
      ellipsis: true,
      width: 200,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            {record.currentSubscrtionStatus === 1 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Active")}
                </span>
              </>
            ) : record.currentSubscrtionStatus === 2 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("In-active")}
                </span>
              </>
            ) : record.currentSubscrtionStatus === 3 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Suspended")}
                </span>
              </>
            ) : record.currentSubscrtionStatus === 4 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Closed")}
                </span>
              </>
            ) : record.currentSubscrtionStatus === 5 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Termination-requested")}
                </span>
              </>
            ) : record.currentSubscrtionStatus === 6 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Cancelled")}
                </span>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      title: t("Organization-status"),
      dataIndex: "organizationStatusID",
      key: "organizationStatusID",
      align: "center",
      ellipsis: true,
      width: 180,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <>
            {record.organizationStatusID === 1 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Active")}
                </span>
              </>
            ) : record.organizationStatusID === 2 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("In-active")}
                </span>
              </>
            ) : record.organizationStatusID === 3 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Suspended")}
                </span>
              </>
            ) : record.organizationStatusID === 4 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Closed")}
                </span>
              </>
            ) : record.organizationStatusID === 5 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Termination-requested")}
                </span>
              </>
            ) : record.organizationStatusID === 6 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Deleted")}
                </span>
              </>
            ) : record.organizationStatusID === 7 ? (
              <>
                <span className={styles["inner-sub-Heading"]}>
                  {t("Archived")}
                </span>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      title: t("Edit-subscription"),
      dataIndex: "editSubscription",
      key: "editSubscription",
      align: "center",
      ellipsis: true,
      width: 200,
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center"
            >
              <img
                src={EditIcon}
                alt=""
                draggable="false"
                className={styles["EditIcon"]}
                onClick={() => handleEditSubscriptionModal(record)}
              />
            </Col>
          </Row>
        );
      },
    },
    {
      title: t("Edit-organization"),
      dataIndex: "editOrganization",
      key: "editOrganization",
      align: "center",
      ellipsis: true,
      width: 200,
      render: (text, record) => {
        return (
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center"
            >
              <img
                src={EditIcon}
                alt=""
                draggable="false"
                className={styles["EditIcon"]}
                onClick={() => handleEditOrganizationModal(record)}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleEditOrganizationModal = (record) => {
    console.log(record, "recordrecordrecordrecord");
    // dispatch(editOrganizationModalOpen(true));
    setEditOrganzationName(record.organizationName);
    setEditOrganizationID(record.organizationID);
    setCurrentOrganisationSubscriptionName(record.organizationStatusID);
    dispatch(editOrganizationSubscriptionModalOpen(true));
  };

  const handleEditSubscriptionModal = (record) => {
    setEditSubscriptionName(record.organizationName);
    setOrganizationID(record.organizationID);
    setCurrentSubscriptionName(record.currentSubscrtionStatus);
    dispatch(editSubscriptionModalOpen(true));
    // setEditSubModal(true);
  };

  // to open view Organization modal
  const handleViewOrganizationModal = (record) => {
    setViewOrganizationModal(record);
    dispatch(editOrganizationModalOpen(true));
  };

  const HandleopenSearchBox = () => {
    if (aminNameSearch !== "") {
      setAminNameSearch("");
      let data = {
        OrganizationID: 0,
        CountryID: 0,
        ContactPersonName: "",
        Email: "",
        StatusID: 0,
        PackageID: 0,
        SubsictionExpiryStart: "",
        SubscriptionExpiryEnd: "",
        sRow: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(true));
      dispatch(searchOrganizationApi({ data, navigate, t }));
    }
    setSearchOrganizationData({
      ...searchOrganizationData,
      userName: searchOrganizationData.userName,
      userEmail: searchOrganizationData.userEmail,
      DateFrom: searchOrganizationData.DateFrom,
      DateTo: searchOrganizationData.DateTo,
      DateToView: searchOrganizationData.DateToView,
      DateFromView: searchOrganizationData.DateFromView,
      Status: {
        value: searchOrganizationData.Status.value,
        label: searchOrganizationData.Status.label,
      },
      OrganizationID: {
        value: searchOrganizationData.OrganizationID.value,
        label: searchOrganizationData.OrganizationID.label,
      },
    });
    setSearchBox(!searchBox);
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
  };

  const options = [
    { value: "1", label: "Enabled" },
    { value: "2", label: "Disabled" },
    { value: "3", label: "Locked" },
    { value: "4", label: "Dormant" },
  ];

  //onChange for View Orgniazation Search

  const searchViewOrganizationHandler = (event) => {
    const { name, value } = event.target;
    if (name === "adminName") {
      setSearchOrganizationData({
        ...searchOrganizationData,
        userName: value,
      });
    } else if (name === "adminEmail") {
      setSearchOrganizationData({
        ...searchOrganizationData,
        userEmail: value,
      });
    }
  };

  //onChange Date from
  const handleChangeFromDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setSearchOrganizationData({
      ...searchOrganizationData,
      DateFrom: utcDate,
      DateFromView: getDate,
    });
  };

  //onChange Date TO
  const handleChangeToDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setSearchOrganizationData({
      ...searchOrganizationData,
      DateTo: utcDate,
      DateToFrom: getDate,
    });
  };

  //handle status change

  const handleStatusChange = (selectedOption) => {
    setSearchOrganizationData((prevState) => ({
      ...prevState,
      Status: selectedOption,
    }));
  };

  const handleSearchButton = () => {
    if (
      Responsemessage !== null &&
      Responsemessage !== undefined &&
      Responsemessage !== ""
    ) {
      let data = {
        OrganizationID: Number(searchorganizationID),
        CountryID: 0,
        ContactPersonName: searchOrganizationData.userName,
        Email: searchOrganizationData.userEmail,
        StatusID: Number(searchOrganizationData.Status.value),
        PackageID: 0,
        SubscriptionExpiryStart: searchOrganizationData.DateFrom,
        SubscriptionExpiryEnd: searchOrganizationData.DateTo,
        sRow: 0,
        Length: 10,
      };
      console.log(data, "handleSearchButtonhandleSearchButton");
      dispatch(viewOrganizationLoader(true));
      dispatch(searchOrganizationApi({ data, navigate, t }));
      setSearchBox(false);
      setShowSearchText(true);
      if (Responsemessage === "Success") {
        setTimeout(
          setOpenNotification({
            ...openNotification,
            organizationFlag: true,
            organizationNotification: t("Data Available"),
            severity: "success",
          }),
          10000
        );
      } else {
        setTimeout(
          setOpenNotification({
            ...openNotification,
            organizationFlag: true,
            organizationNotification: t("No Data Available"),
            severity: "error",
          }),
          3000
        );
      }
    }
  };

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

  const handleSearches = (Data, fieldName) => {
    setSearchOrganizationData({
      ...searchOrganizationData,
      [fieldName]: "",
    });

    let data = {
      OrganizationID: 0,
      CountryID: 0,
      ContactPersonName:
        fieldName === "userName" ? "" : searchOrganizationData.userName,
      Email: fieldName === "userEmail" ? "" : searchOrganizationData.userEmail,
      StatusID: 0,
      PackageID: 0,
      SubsictionExpiryStart:
        fieldName === "DateFrom" ? "" : searchOrganizationData.DateFrom,
      SubscriptionExpiryEnd:
        fieldName === "DateTo" ? "" : searchOrganizationData.DateTo,
      sRow: 0,
      Length: 10,
    };
    dispatch(viewOrganizationLoader(true));
    dispatch(searchOrganizationApi({ data, navigate, t }));
  };

  const handleScroll = async (e) => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let data = {
        OrganizationID: 0,
        CountryID: 0,
        ContactPersonName: "",
        Email: "",
        StatusID: 0,
        PackageID: 0,
        SubsictionExpiryStart: "",
        SubscriptionExpiryEnd: "",
        sRow: Number(isRowsData),
        Length: 10,
      };
      dispatch(viewOrganizationLoader(false));
      dispatch(searchOrganizationApi({ data, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  const handleResetButton = () => {
    setOrganizationDataValue(null);
    setSearchOrganizationData({
      userName: "",
      userEmail: "",
      DateFrom: "",
      DateTo: "",
      DateToView: "",
      DateFromView: "",
      Status: {
        value: 0,
        label: "",
      },
      OrganizationID: {
        value: 0,
        label: "",
      },
    });
  };

  // USEEFFECT FOR SHOW NOTIFICATION

  // useEffect(() => {
  //   if (
  //     Responsemessage !== null &&
  //     Responsemessage !== undefined &&
  //     Responsemessage !== ""
  //   ) {
  //     if (Responsemessage === "Success") {
  //       setTimeout(
  //         setOpenNotification({
  //           ...openNotification,
  //           organizationFlag: true,
  //           organizationNotification: t("Data Available"),
  //           severity: "success",
  //         }),
  //         10000
  //       );
  //     } else {
  //       setTimeout(
  //         setOpenNotification({
  //           ...openNotification,
  //           organizationFlag: true,
  //           organizationNotification: t("No Data Available"),
  //           severity: "error",
  //         }),
  //         3000
  //       );
  //     }
  //   }
  // }, [Responsemessage]);
  function onChangeEventForSearch(e) {
    let value = e.target.value;
    setSearchBox(false);
    // Check if the first character is a space and remove it if it is
    if (value.charAt(0) === " ") {
      value = value.trimStart();
    }
    setAminNameSearch(value);
    console.log("value", value);
  }
  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      if (aminNameSearch !== "") {
        let data = {
          OrganizationID: 0,
          CountryID: 0,
          ContactPersonName: aminNameSearch,
          Email: "",
          StatusID: 0,
          PackageID: 0,
          SubsictionExpiryStart: "",
          SubscriptionExpiryEnd: "",
          sRow: 0,
          Length: 10,
        };
        dispatch(viewOrganizationLoader(true));
        dispatch(searchOrganizationApi({ data, navigate, t }));
        setShowSearchText(true);
      } else {
        setTimeout(
          setOpenNotification({
            ...openNotification,
            organizationFlag: true,
            organizationNotification: t("Please-enter-data-in-inputfield"),
            severity: "error",
          }),
          3000
        );
      }
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col lg={7} md={7} sm={7}>
            <span className={styles["HeadingViewORganization"]}>
              {t("View-organization")}
            </span>
          </Col>
          <Col lg={5} md={5} sm={5}>
            <span className="position-relative">
              <TextField
                onKeyDown={handleKeyDownSearch}
                change={onChangeEventForSearch}
                placeholder={t("Search")}
                value={aminNameSearch}
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
                  {showsearchText && searchOrganizationData.userName !== "" ? (
                    <div className={styles["SearchablesItems"]}>
                      <span className={styles["Searches"]}>
                        {searchOrganizationData.userName}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
                        className={styles["CrossIcon_Class"]}
                        width={13}
                        onClick={() =>
                          handleSearches(
                            searchOrganizationData.userName,
                            "userName"
                          )
                        }
                      />
                    </div>
                  ) : null}

                  {showsearchText && searchOrganizationData.userEmail !== "" ? (
                    <div className={styles["SearchablesItems"]}>
                      <span className={styles["Searches"]}>
                        {searchOrganizationData.userEmail}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
                        className={styles["CrossIcon_Class"]}
                        width={13}
                        onClick={() =>
                          handleSearches(
                            searchOrganizationData.userEmail,
                            "userEmail"
                          )
                        }
                      />
                    </div>
                  ) : null}

                  {showsearchText && searchOrganizationData.DateFrom !== "" ? (
                    <div className={styles["SearchablesItems"]}>
                      <span className={styles["Searches"]}>
                        {formatDate(
                          searchOrganizationData.DateFrom,
                          currentLanguage
                        )}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
                        className={styles["CrossIcon_Class"]}
                        width={13}
                        onClick={() =>
                          handleSearches(
                            searchOrganizationData.DateFrom,
                            "DateFrom"
                          )
                        }
                      />
                    </div>
                  ) : null}

                  {showsearchText && searchOrganizationData.DateTo !== "" ? (
                    <div className={styles["SearchablesItems"]}>
                      <span className={styles["Searches"]}>
                        {formatDate(
                          searchOrganizationData.DateTo,
                          currentLanguage
                        )}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
                        className={styles["CrossIcon_Class"]}
                        width={13}
                        onClick={() =>
                          handleSearches(
                            searchOrganizationData.DateTo,
                            "DateTo"
                          )
                        }
                      />
                    </div>
                  ) : null}
                </Col>
              </Row>
              {searchBox ? (
                <>
                  <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className={styles["SearchBox"]}
                    >
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
                            labelClass={"d-none"}
                            value={searchOrganizationData.userName}
                            name={"adminName"}
                            applyClass={"SearchTextFiled"}
                            placeholder={t("Admin-name")}
                            change={searchViewOrganizationHandler}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <TextField
                            labelClass={"d-none"}
                            name={"adminEmail"}
                            applyClass={"SearchTextFiled"}
                            placeholder={t("Admin-email")}
                            value={searchOrganizationData.userEmail}
                            change={searchViewOrganizationHandler}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col lg={6} md={6} sm={6}>
                          <DatePicker
                            value={searchOrganizationData.DateFromView}
                            format={"DD/MM/YYYY"}
                            placeholder={t("Date-From")}
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
                            value={searchOrganizationData.DateToView}
                            format={"DD/MM/YYYY"}
                            placeholder={t("Date-to")}
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
                          <Select
                            value={searchOrganizationData.Status}
                            placeholder={t("Subscription-status")}
                            options={options}
                            onChange={handleStatusChange}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <Select
                            value={organizationDataValue}
                            placeholder={t("Organization")}
                            options={organizationData}
                            onChange={organizerChangeHandler}
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
                            onClick={handleResetButton}
                          />
                          <Button
                            text={t("Search")}
                            className={styles["SearchButton"]}
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
        <Row className="mt-2">
          <Col sm={12} md={12} lg={12} className="py-2  px-4 bg-white">
            <InfiniteScroll
              dataLength={viewOrganizationData.length}
              next={handleScroll}
              height={"70vh"}
              hasMore={
                viewOrganizationData.length === totalRecords ? false : true
              }
              loader={
                isRowsData <= totalRecords && isScroll ? (
                  <>
                    <Row>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="d-flex justify-content-center mt-2"
                      >
                        <Spin />
                      </Col>
                    </Row>
                  </>
                ) : null
              }
              // scrollableTarget="scrollableDiv"
            >
              <Table
                column={ViewOrganizationColoumn}
                pagination={false}
                rows={viewOrganizationData}
                footer={false}
                className={"userlogin_history_tableP"}
                size={"medium"}
                // scroll={{
                //   x: false,
                // }}
              />
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
      {/* <EditOrganizationModal /> */}
      {/* {isEditSubscriptionModalOpen && ( */}
      <EditSubscriptionModal
        organizationID={organizationID}
        editSubscriptionName={editSubscriptionName}
        currentSubscriptionName={currentSubscriptionName}
      />
      {/* )} */}

      <EditOrganizationSubscription
        editOrganizationID={editOrganizationID}
        editOrganzationName={editOrganzationName}
        currentOrganisationSubscriptionName={
          currentOrganisationSubscriptionName
        }
      />

      {/* for view Organization Modal */}

      <ViewOrganizationModal viewOrganizationModal={viewOrganizationModal} />

      <Notification
        show={openNotification.organizationFlag}
        hide={setOpenNotification}
        message={openNotification.organizationNotification}
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
