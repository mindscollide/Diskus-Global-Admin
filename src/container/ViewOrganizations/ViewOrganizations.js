import React, { useState, useRef, useEffect } from "react";
import { Collapse, Spin } from "antd";
import {
  Button,
  Notification,
  Table,
  TextField,
} from "../../components/elements";
import { UpOutlined } from "@ant-design/icons";
import { ChevronDown } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import Select from "react-select";
import NoOrganizationIcon from "../../assets/images/OutletImages/No_Organization.png";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import { getAllOrganizationApi } from "../../store/Actions/ViewOrganizationActions";
import "./ViewOrganizations.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import {
  convertUTCDateToLocalDate,
  convertUTCDateToLocalDateView,
  formatDate,
} from "../../common/functions/dateFormatters";
import ViewOrganizationModal from "./ViewOrganizationModal/ViewOrganizationModal";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import {
  editOrganizationModalOpen,
  editOrganizationSubscriptionModalOpen,
  editSubscriptionModalOpen,
} from "../../store/ActionsSlicers/UIModalsActions";
import EditOrganizationSubscriptions from "./EditOrganizationSubscriptionModal/EditOrganizationSubscription";
import EditSubscriptionModals from "./EditSubscriptionModal/EditSubscriptionModal";
import {
  getAllOrganizationNameMainApi,
  getPackageDetailGlobalApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import FlagCountryName from "./CountryFlagFunctionality/CountryFlag";
import {
  globalAdminDashBoardLoader,
  resetResponseMessage,
} from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const { Panel } = Collapse;

const ViewOrganization = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calendRef = useRef();
  const ModalReducer = useSelector((state) => state.modal);

  // current language set in local storage
  let currentLanguage = localStorage.getItem("currentLanguage");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";

  // for response message
  const Responsemessage = useSelector(
    (state) => state.searchOrganization.Responsemessage
  );
  console.log(Responsemessage, "ResponseMessageResponseMessage");

  // reducer for get All Organization In Organization Dropdown
  const organizationIdData = useSelector(
    (state) => state.searchOrganization.getAllOrganizationData
  );

  // reducer for get All Organization but in dropdown
  const organizationIdDataDropdown = useSelector(
    (state) => state.globalAdminDashboardReducer.getOrganizationNames
  );

  console.log(organizationIdData, "organizationIdDataResponseMessage");

  const [searchBox, setSearchBox] = useState(false);
  const [organizationDataValue, setOrganizationDataValue] = useState(null);

  // state for view Organizer Table data
  const [viewOrganizationData, setViewOrganizationData] = useState([]);
  const [viewOrganizationInsideData, setOrganizationInsideData] = useState([]);

  // for dropdown lazy loading state:
  const [organization, setOrganization] = useState([]);

  // for lazy Loading state
  const [isRowsData, setSRowsData] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  // view organization modal
  const [viewOrganizationsModal, setViewOrganizationsModal] = useState("");

  // edit state Modal
  const [editOrganizationID, setEditOrganizationID] = useState(0);
  const [editOrganzationName, setEditOrganzationName] = useState("");
  const [editSubscriptionName, setEditSubscriptionName] = useState("");

  // edit Subscription Update Modal
  const [editCurrentSubscriptionName, setCurrentEditSubscriptionName] =
    useState("");
  const [editSubscriptionOrgID, setEditSubscriptionOrgID] = useState(0);
  const [subcriptionStartDate, setSubcriptionStartDate] = useState("");
  const [subcriptionExpiry, setSubcriptionExpiry] = useState("");
  const [duration, setDuration] = useState(0);
  const [headData, setHeadData] = useState([]);
  const [editSubModal, setEditSubModal] = useState("");

  // states for search
  const [showsearchText, setShowSearchText] = useState(false);
  const [aminNameSearch, setAminNameSearch] = useState("");
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);

  const [userNameSearch, setUserNameSearch] = useState("");
  console.log(userNameSearch, "userNameSearchuserNameSearch");

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
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getAllOrganizationNameMainApi({ navigate, t }));
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

  // uesEffect to get data getAllOrganization to set data in table
  useEffect(() => {
    if (organizationIdData && organizationIdData.result) {
      const { getAllOrganizations, totalCount } = organizationIdData.result;

      if (getAllOrganizations && getAllOrganizations.length > 0) {
        const newOrganizations = isScroll
          ? [...viewOrganizationData, ...getAllOrganizations]
          : getAllOrganizations;

        const subscriptions = newOrganizations.flatMap((org) =>
          org.organizationSubscriptions.map((sub) => ({
            organizationId: org.organizationID,
            subscriptionStartDate: sub.subscriptionStartDate,
            subscriptionExpiryDate: sub.subscriptionExpiryDate,
            fK_TenureOfSubscriptionID: sub.fK_TenureOfSubscriptionID,
            fK_SubscriptionStatusID: sub.fK_SubscriptionStatusID,
            pK_OrganizationsSubscriptionID: sub.pK_OrganizationsSubscriptionID,
            uniqueKey: `${org.organizationID}-${sub.pK_OrganizationsSubscriptionID}`,
          }))
        );

        console.log(subscriptions, "subscriptionssubscriptions");

        const uniqueSubscriptions = Array.from(
          new Set(subscriptions.map((sub) => sub.uniqueKey))
        ).map((key) => subscriptions.find((sub) => sub.uniqueKey === key));

        setViewOrganizationData(newOrganizations);
        setOrganizationInsideData(uniqueSubscriptions);
        setSRowsData(newOrganizations.length);
        setTotalRecords(totalCount);
      } else {
        // Handle empty response
        setViewOrganizationData([]); // Ensure empty table renders
        setOrganizationInsideData([]);
        setSRowsData(0);
        setTotalRecords(0);
      }
    }
  }, [organizationIdData]);

  // handle scroll for lazy loader
  const handleScroll = () => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let newData = {
        OrganizationContactName: searchOrganizationData.OrganizationContactName
          ? searchOrganizationData.OrganizationContactName
          : "",
        OrganizationContactEmail: "",
        OrganizationDateTo: searchOrganizationData.OrganizationDateTo
          ? `${searchOrganizationData.OrganizationDateTo}000000`
          : "",
        OrganizationDateFrom: searchOrganizationData.OrganizationDateFrom
          ? `${searchOrganizationData.OrganizationDateFrom}000000`
          : "",
        OrganizationSubscriptionStatus: searchOrganizationData
          .OrganizationSubscriptionStatus.value
          ? searchOrganizationData.OrganizationSubscriptionStatus.value
          : 0,
        OrganizationName: organizationDataValue
          ? organizationDataValue.label
          : "",
        sRow: Number(isRowsData),
        eRow: 10,
      };

      dispatch(getAllOrganizationApi({ newData, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  const columns = [
    {
      title: t("Subscription-date"),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      className: "class-main-headerColumn",
      width: "270px",
      render: (text, record) => {
        return (
          <>
            <span className="inner-sub-Heading-insidetable">
              {text &&
                convertUTCDateToLocalDate(text + "201320", currentLanguage)}
            </span>
          </>
        );
      },
    },
    {
      title: t("Expiry-date"),
      dataIndex: "subscriptionExpiryDate",
      key: "subscriptionExpiryDate",
      className: "class-main-headerColumn",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <>
            <span className="inner-sub-Heading-insidetable">
              {text &&
                convertUTCDateToLocalDate(text + "201320", currentLanguage)}
            </span>
          </>
        );
      },
    },
    {
      title: t("Subscription"),
      dataIndex: "fK_TenureOfSubscriptionID",
      key: "fK_TenureOfSubscriptionID",
      className: "class-main-headerColumn",
      render: (text, record) => {
        return (
          <>
            {record.fK_TenureOfSubscriptionID === 1 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Annual")}
                </span>
              </>
            ) : record.fK_TenureOfSubscriptionID === 2 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Monthly")}
                </span>
              </>
            ) : record.fK_TenureOfSubscriptionID === 3 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Quarterly")}
                </span>
              </>
            ) : record.fK_TenureOfSubscriptionID === 4 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("HalfYearly")}
                </span>
              </>
            ) : record.fK_TenureOfSubscriptionID === 5 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Trial")}
                </span>
              </>
            ) : record.fK_TenureOfSubscriptionID === 6 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Trial-extended")}
                </span>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      title: t("Status"),
      dataIndex: "fK_SubscriptionStatusID",
      key: "fK_SubscriptionStatusID",
      className: "class-main-headerColumn",
      render: (text, record) => {
        return (
          <>
            {record.fK_SubscriptionStatusID === 1 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Active")}
                </span>
              </>
            ) : record.fK_SubscriptionStatusID === 2 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("In-active")}
                </span>
              </>
            ) : record.fK_SubscriptionStatusID === 3 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Suspended")}
                </span>
              </>
            ) : record.fK_SubscriptionStatusID === 4 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Closed")}
                </span>
              </>
            ) : record.fK_SubscriptionStatusID === 5 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Termination-requested")}
                </span>
              </>
            ) : record.fK_SubscriptionStatusID === 6 ? (
              <>
                <span className="inner-sub-Heading-insidetable">
                  {t("Cancelled")}
                </span>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Button
              className="update-button"
              text={t("Update-subscription")}
              onClick={() => handleEditSubscriptionModal(record)}
            />
          </>
        );
      },
    },
  ];

  const headerColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-main-headerColumn",
      width: "270px",
      ellipsis: true,
      render: (text, record) => (
        <>
          <span
            className="inner-organization-heading-view-modal"
            onClick={() => handlerViewOrganizer(record)}
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
      className: "class-main-headerColumn",
      render: (text, record) => (
        <>
          <span className="inner-sub-Heading">{text}</span>
        </>
      ),
    },
    {
      title: t("Contact-number"),
      dataIndex: "contactPersonNumber",
      key: "contactPersonNumber",
      className: "class-main-headerColumn",
      render: (text, record) => {
        const countryCode = record.mobileCode;
        return (
          <>
            <span className="d-flex gap-2">
              <FlagCountryName countryCode={countryCode} />
              <span className="inner-sub-Heading">{text}</span>
            </span>
          </>
        );
      },
    },
    {
      title: t("Organization-status"),
      dataIndex: "organizationStatus",
      key: "organizationStatus",
      className: "class-main-headerColumn",
      render: (text, record) => {
        return (
          <>
            {record.organizationStatus === 1 ? (
              <>
                <span className="inner-sub-Heading">{t("Active")}</span>
              </>
            ) : record.organizationStatus === 2 ? (
              <>
                <span className="inner-sub-Heading">{t("In-active")}</span>
              </>
            ) : record.organizationStatus === 3 ? (
              <>
                <span className="inner-sub-Heading">{t("Suspended")}</span>
              </>
            ) : record.organizationStatus === 4 ? (
              <>
                <span className="inner-sub-Heading">{t("Closed")}</span>
              </>
            ) : record.organizationStatus === 5 ? (
              <>
                <span className="inner-sub-Heading">
                  {t("Termination-requested")}
                </span>
              </>
            ) : record.organizationStatus === 6 ? (
              <>
                <span className="inner-sub-Heading">{t("Deleted")}</span>
              </>
            ) : record.organizationStatus === 7 ? (
              <>
                <span className="inner-sub-Heading">{t("Archived")}</span>
              </>
            ) : record.organizationStatus === 8 ? (
              <>
                <span className="inner-sub-Heading">
                  {t("Locked-by-global-admin")}
                </span>
              </>
            ) : null}
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "editOrganization",
      key: "editOrganization",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Button
              className="update-button"
              text={t("Edit-organization")}
              onClick={() => handleEditOrganizationModal(record)}
            />
          </>
        );
      },
    },
  ];

  // view handler for Header Column
  const handlerViewOrganizer = (record) => {
    const subscriptions = viewOrganizationInsideData.filter(
      (data) => data.organizationId === record.organizationID
    );
    console.log(record, "cwecwecwecwecwece");
    setViewOrganizationsModal({ ...record, subscriptions });
    dispatch(editOrganizationModalOpen(true));
  };

  // edit handler
  const handleEditOrganizationModal = (record) => {
    setEditOrganzationName(record.organizationName);
    setEditOrganizationID(record.organizationID);
    setEditSubscriptionName(record.organizationStatus);
    dispatch(editOrganizationSubscriptionModalOpen(true));
    // setEditSubModal(true);
  };

  const handleEditSubscriptionModal = (record) => {
    const subscriptions = viewOrganizationData.filter(
      (data) => data.organizationID === record.organizationId
    );
    console.log(subscriptions, "subscriptionssubscriptions");

    setSubcriptionStartDate(record.subscriptionStartDate);
    setDuration(record.fK_TenureOfSubscriptionID);
    setCurrentEditSubscriptionName(record.fK_SubscriptionStatusID);
    setSubcriptionExpiry(record.subscriptionExpiryDate);
    setEditSubscriptionOrgID(record.organizationId);
    setHeadData(subscriptions);
    dispatch(editSubscriptionModalOpen(true));
    setEditSubModal(record);
    let data = {
      OrganizationID: record.organizationId,
      SubscriptionID: record.pK_OrganizationsSubscriptionID,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getPackageDetailGlobalApi({ data, navigate, t }));
  };

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
      setViewOrganizationData([]);
      setOrganizationInsideData([]);
      setSRowsData(0);
      setTotalRecords(0);
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
    setViewOrganizationData([]);
    setOrganizationInsideData([]);
    setSRowsData(0);
    setTotalRecords(0);

    let newData = {
      OrganizationContactName: updatedData.OrganizationContactName,
      OrganizationContactEmail: updatedData.OrganizationContactEmail,
      OrganizationDateTo: updatedData.OrganizationDateTo
        ? `${updatedData.OrganizationDateTo}000000`
        : "",
      OrganizationDateFrom: updatedData.OrganizationDateFrom
        ? `${updatedData.OrganizationDateFrom}000000`
        : "",
      OrganizationSubscriptionStatus:
        updatedData.OrganizationSubscriptionStatus.value,
      OrganizationName: updatedOrganizationDataValue
        ? updatedOrganizationDataValue.label
        : "",
      sRow: 0,
      eRow: 10,
    };
    setShowSearchText(false);
    setUserNameSearch("");
    dispatch(viewOrganizationLoader(true));
    dispatch(getAllOrganizationApi({ newData, navigate, t }));
  };

  // search Button Handler
  const handleSearchButton = () => {
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
    setViewOrganizationData([]);
    setOrganizationInsideData([]);
    setTotalRecords(0);
    setSRowsData(0);
    dispatch(viewOrganizationLoader(true));
    dispatch(getAllOrganizationApi({ newData, navigate, t }));
    setSearchBox(false);
    setShowSearchText(true);
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
        setViewOrganizationData([]);
        setOrganizationInsideData([]);
        setSRowsData(0);
        setTotalRecords(0);
        dispatch(viewOrganizationLoader(true));
        dispatch(getAllOrganizationApi({ newData, navigate, t }));
      }
      setShowSearchText(true);
    }
  };

  return (
    <>
      <Row className="mt-3">
        <Col lg={7} md={7} sm={7}>
          <span className={"HeadingViewORganization"}>
            {t("View-organization")}
          </span>
        </Col>
        <Col lg={5} md={5} sm={5}>
          <span className="position-relative">
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
                      className="d-flex gap-2 align-items-center"
                    >
                      <img
                        src={SearchIcon}
                        alt=""
                        className={"Search_Bar_icon_class"}
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
              <Col lg={4} md={4} sm={4}>
                {showsearchText && userNameSearch !== "" ? (
                  <div className={"SearchablesItems"}>
                    <span className={"Searches"}>{userNameSearch}</span>
                    <img
                      src={Crossicon}
                      alt=""
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
              <Col lg={12} md={12} sm={12} className="d-flex gap-2 flex-wrap">
                {showsearchText &&
                  searchOrganizationData.OrganizationContactName && (
                    <div className={"SearchablesItems"}>
                      <span className={"Searches"}>
                        {searchOrganizationData.OrganizationContactName}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
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
                      alt=""
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
                        alt=""
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
                        alt=""
                        className={"CrossIcon_Class"}
                        width={13}
                        onClick={() => handleSearches("OrganizationDateTo")}
                      />
                    </div>
                  )}

                {showsearchText && organizationDataValue && (
                  <div className="SearchablesItems">
                    <span className="Searches">
                      {organizationDataValue.label}
                    </span>
                    <img
                      src={Crossicon}
                      alt=""
                      className="CrossIcon_Class"
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
                        alt=""
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
                          className={"CrossIcon_Class"}
                          onClick={handleCancelSearchbox}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
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
                    <Row className="mt-3">
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
                          className="datePickerTodoCreate2"
                          containerClassName={"datePicker_Container"}
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
                          value={searchOrganizationData.OrganizationDateToView}
                          format={"MMM DD, YYYY"}
                          placeholder={t("Date-to")}
                          render={
                            <InputIcon
                              placeholder={t("Date-from")}
                              className={"UserLoginHistory_datePicker"}
                            />
                          }
                          editable={false}
                          className="datePickerTodoCreate2"
                          containerClassName={"datePicker_Container"}
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
                          value={
                            searchOrganizationData.OrganizationSubscriptionStatus
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
                    <Row className="mt-3">
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex justify-content-end gap-2"
                      >
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

      <Row>
        <Col lg={12} md={12} sm={12}>
          {viewOrganizationData !== null &&
          viewOrganizationData !== undefined &&
          viewOrganizationData.length > 0 ? (
            <>
              <InfiniteScroll
                dataLength={viewOrganizationData.length}
                next={handleScroll}
                height={"75vh"} // Adjust height as needed
                className={"cashFLowClass-infinite"}
                hasMore={viewOrganizationData.length < totalRecords} // Simplified condition
                loader={
                  isRowsData <= totalRecords && isScroll ? (
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
                  ) : null
                }
              >
                {viewOrganizationData.map((org) => (
                  <Collapse
                    key={org.organizationId}
                    bordered={false}
                    expandIconPosition="end"
                    expandIcon={({ isActive }) => (
                      <UpOutlined
                        className="custom-icon"
                        rotate={isActive ? 180 : 0}
                      />
                    )}
                    className="organization-collapse"
                  >
                    <Panel
                      key={org.organizationId}
                      className="Panel-Class"
                      header={
                        <>
                          <div onClick={(e) => e.stopPropagation()}>
                            <Table
                              rows={[org]}
                              column={headerColumn}
                              pagination={false}
                              className="custom-table"
                            />
                          </div>
                        </>
                      }
                    >
                      <div onClick={(e) => e.stopPropagation()}>
                        <Table
                          rows={viewOrganizationInsideData.filter(
                            (data) => data.organizationId === org.organizationID
                          )}
                          column={columns}
                          pagination={false}
                          className="custom-table"
                        />
                      </div>
                    </Panel>
                  </Collapse>
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="view-organization-section"
                >
                  <img
                    src={NoOrganizationIcon}
                    width={"110px"}
                    alt="View Organization"
                  />

                  <span className="Main-Title-ViewOrganization">
                    {t("No-View-Organization")}
                  </span>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <EditOrganizationSubscriptions
        editOrganizationID={editOrganizationID}
        editOrganzationName={editOrganzationName}
        editSubscriptionName={editSubscriptionName}
        setShowSearchText={setShowSearchText}
        setUserNameSearch={setUserNameSearch}
      />

      <EditSubscriptionModals
        editSubscriptionOrgID={editSubscriptionOrgID}
        subcriptionStartDate={subcriptionStartDate}
        subcriptionExpiry={subcriptionExpiry}
        editCurrentSubscriptionName={editCurrentSubscriptionName}
        duration={duration}
        headData={headData}
        editSubModal={editSubModal}
        setShowSearchText={setShowSearchText}
        setUserNameSearch={setUserNameSearch}
      />
      <ViewOrganizationModal viewOrganizationsModal={viewOrganizationsModal} />

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
