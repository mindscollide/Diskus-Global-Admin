import React, { useEffect, useRef, useState } from "react";
import styles from "./CashFlowSummary.module.css";
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
import SortAscending from "../../assets/images/OutletImages/SorterIconAscend.png";
import SortDescending from "../../assets/images/OutletImages/SorterIconDescend.png";

import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  convertNumbersInToArabic,
  convertUTCDateToLocalDate,
  ExtractMonthAndYear,
  formatDate,
} from "../../common/functions/dateFormatters";
import { Dropdown, Menu, Tag } from "antd";
import moment, { locale } from "moment";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getCashFlowMainApi,
  getCashOutStandingFlowMainApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { formatNumber } from "../../common/functions/Regex";
// import FlagCountryName from "./CountryFlagFunctionality/CountryFlag";

const CashFlowSummary = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const calendRef = useRef();

  //Get CashInFLow Reducer Data
  const cashFlowData = useSelector(
    (state) => state.globalAdminDashboardReducer.cashFlowData
  );

  //Get Cash Out Flow Reducer Data
  const cashOutFlowData = useSelector(
    (state) => state.globalAdminDashboardReducer.cashOutFlowData
  );

  console.log(cashOutFlowData, "cashFlowTablecashFlowTable");

  let currentLanguage = localStorage.getItem("currentLanguage");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";

  // For tabs condition
  const [inflowTab, setInFlowTab] = useState(true);
  const [outstandingTab, setOutstandingTab] = useState(false);

  // for total cash Inflow
  const [totalInflow, setTotalInflow] = useState(0);

  // for cash OutFLow Table Data state
  const [cashOutFlowTable, setCashOutFlowTable] = useState([]);
  // for lazy Loading state
  const [isRowsOutData, setSRowsOutData] = useState(0);
  const [totalOutRecords, setTotalOutRecords] = useState(0);
  const [isOutScroll, setIsOutScroll] = useState(false);

  // for total outstanding cashFlow
  const [totalOutstanding, setTotalOutstanding] = useState(0);

  // for lazy Loading state
  const [isRowsData, setSRowsData] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  const [cashInFlowData, setCashInFlowData] = useState([]);

  const [searchBox, setSearchBox] = useState(false);

  const [userNameSearch, setUserNameSearch] = useState("");

  // open edit subscription modal
  // const [editSubModal, setEditSubModal] = useState(false);
  // console.log(editSubModal, "editSubModal");

  //States for the component

  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(
    currentLanguage === "en" ? gregorian_en : gregorian_ar
  );
  console.log({ localValue, currentLanguage }, "localValuelocalValue");

  // to show Search text below the seacrh Field
  const [showsearchText, setShowSearchText] = useState(false);

  // for organization Name
  const [organizationNameSearch, setOrganizationNameSearch] = useState("");

  // cashFlow Search Box
  const [flowsSearch, setFlowsSearch] = useState({
    organizationName: "",
    DateFrom: "",
    DateTo: "",
    displayDateFrom: "",
    displayDateTo: "",
  });
  console.log(flowsSearch, "flowsSearchflowsSearch");

  // cash flow sorting state
  const [sortCashFlow, setSortCashFlow] = useState(null);

  // cash Out Flow sorting state
  const [sortCashOutFlow, setSortCashOutFlow] = useState(null);

  // To show lazy loading scroller
  useEffect(() => {
    try {
      if (cashFlowData !== null && cashFlowData !== undefined) {
        if (
          cashFlowData.result.cashFlows.length > 0 &&
          cashFlowData.result.totalCount > 0
        ) {
          if (isScroll) {
            setIsScroll(false);
            let dataCopy = [...cashInFlowData];
            cashFlowData.result.cashFlows.forEach((data, index) => {
              dataCopy.push(data);
            });
            setCashInFlowData(dataCopy);
            setSRowsData((prev) => prev + cashFlowData.result.cashFlows.length);
            setTotalRecords(cashFlowData.result.totalCount);
          } else {
            setCashInFlowData(cashFlowData.result.cashFlows);
            setTotalRecords(cashFlowData.result.totalCount);
            setSRowsData(cashFlowData.result.cashFlows.length);
          }
        } else {
          setCashInFlowData([]);
          setTotalRecords(0);
          setSRowsData(0);
        }
        setTotalInflow(cashFlowData.result.totalCashFlows);
      }
    } catch {}
  }, [cashFlowData]);

  // fetch cashflow Api Data
  useEffect(() => {
    let data = {
      OrganizationName: "",
      DateFrom: "",
      DateTo: "",
      sRow: 0, // index
      eRow: 8, // length
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getCashFlowMainApi({ data, navigate, t }));

    return () => {
      setFlowsSearch({
        ...flowsSearch,
        organizationName: "",
        DateFrom: "",
        DateTo: "",
        displayDateFrom: "",
        displayDateTo: "",
      });
      setShowSearchText(false);
      setIsScroll(false);
      setTotalRecords(0);
      setSRowsData(0);
      setCashOutFlowTable([]);
    };
  }, []);

  // fetch Data from Cash Out Flow Reducer
  useEffect(() => {
    try {
      if (cashOutFlowData !== null && cashOutFlowData !== undefined) {
        if (
          cashOutFlowData.result.cashFlows.length > 0 &&
          cashOutFlowData.result.totalCount > 0
        ) {
          if (isOutScroll) {
            setIsOutScroll(false);
            let dataCopy = [...cashOutFlowTable];
            cashOutFlowData.result.cashFlows.forEach((data, index) => {
              dataCopy.push(data);
            });
            setCashOutFlowTable(dataCopy);
            setSRowsOutData(
              (prev) => prev + cashOutFlowData.result.cashFlows.length
            );
            setTotalOutRecords(cashOutFlowData.result.totalCount);
          } else {
            setCashOutFlowTable(cashOutFlowData.result.cashFlows);
            setTotalOutRecords(cashOutFlowData.result.totalCount);
            setSRowsOutData(cashOutFlowData.result.cashFlows.length);
          }
        } else {
          setCashOutFlowTable([]);
          setTotalOutRecords(0);
          setSRowsOutData(0);
        }
        setTotalOutstanding(cashOutFlowData.result.totalCashFlows);
      }
    } catch {}
  }, [cashOutFlowData]);

  // cash flow column
  const cashFlowColumn = [
    {
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortCashFlow === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      ellipsis: true,
      width: "200px",
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortCashFlow,
      onHeaderCell: () => ({
        onClick: () => {
          setSortCashFlow((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice"),
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice-month"),
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      align: "center",
      filters: [
        {
          text: "January",
          value: "January",
        },
        {
          text: "February",
          value: "February",
        },
        {
          text: "March",
          value: "March",
        },
        {
          text: "April",
          value: "April",
        },
        {
          text: "May",
          value: "May",
        },
        {
          text: "June",
          value: "June",
        },
        {
          text: "July",
          value: "July",
        },
        {
          text: "August",
          value: "August",
        },
        {
          text: "September",
          value: "September",
        },
        {
          text: "October",
          value: "October",
        },
        {
          text: "November",
          value: "November",
        },
        {
          text: "December",
          value: "December",
        },
      ],
      onFilter: (value, record) => {
        let { Month } = ExtractMonthAndYear(record.invoiceDate);
        return Month === value;
      },
      ellipsis: true,
      sortDirections: ["descend"],
      render: (text, response) => {
        let { Month } = ExtractMonthAndYear(response.invoiceDate);
        console.log(Month, "recordrecord");
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{Month}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice-year"),
      dataIndex: "Invoiceyear",
      key: "Invoiceyear",
      align: "center",
      filters: [
        { text: "2022", value: 2022 },
        { text: "2023", value: 2023 },
        { text: "2024", value: 2024 },
        { text: "2025", value: 2025 },
        { text: "2026", value: 2026 },
        { text: "2027", value: 2027 },
        { text: "2028", value: 2028 },
        { text: "2029", value: 2029 },
        { text: "2030", value: 2030 },
        { text: "2031", value: 2031 },
        { text: "2032", value: 2032 },
        { text: "2033", value: 2033 },
        { text: "2034", value: 2034 },
        { text: "2035", value: 2035 },
        { text: "2036", value: 2036 },
        { text: "2037", value: 2037 },
        { text: "2038", value: 2038 },
        { text: "2039", value: 2039 },
        { text: "2040", value: 2040 },
      ],
      onFilter: (value, record) => {
        let { Year } = ExtractMonthAndYear(record.invoiceDate);
        return Year === value;
      },
      ellipsis: true,
      sortDirections: ["descend"],
      render: (text, record) => {
        let { Year } = ExtractMonthAndYear(record.invoiceDate);
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(Year) : Year}
            </span>
          </>
        );
      },
    },
    {
      title: t("Essential"),
      dataIndex: "essential",
      key: "essential",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Professional"),
      dataIndex: "professional",
      key: "professional",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Premium"),
      dataIndex: "premium",
      key: "premium",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Subscription"),
      dataIndex: "tenure",
      key: "tenure",
      ellipsis: true,
      filters: [
        {
          text: "Annual",
          value: "Annual",
        },
        {
          text: "Monthly",
          value: "Monthly",
        },
        {
          text: "Quaterly",
          value: "Quaterly",
        },
      ],
      onFilter: (value, record) => record.tenure.indexOf(value) === 0,
      align: "center",
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      ellipsis: true,

      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-amount-column-title"]}>
              {`${
                currentLanguage === "ar"
                  ? convertNumbersInToArabic(formatNumber(text))
                  : formatNumber(text)
              } ${"$"}`}
            </span>
          </>
        );
      },
    },
  ];

  //Outstanding Column
  const OutstandingColumn = [
    {
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortCashOutFlow === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      ellipsis: true,
      width: "200px",
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortCashOutFlow,
      onHeaderCell: () => ({
        onClick: () => {
          setSortCashOutFlow((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice"),
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice-month"),
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      align: "center",
      ellipsis: true,
      filters: [
        {
          text: "January",
          value: "January",
        },
        {
          text: "February",
          value: "February",
        },
        {
          text: "March",
          value: "March",
        },
        {
          text: "April",
          value: "April",
        },
        {
          text: "May",
          value: "May",
        },
        {
          text: "June",
          value: "June",
        },
        {
          text: "July",
          value: "July",
        },
        {
          text: "August",
          value: "August",
        },
        {
          text: "September",
          value: "September",
        },
        {
          text: "October",
          value: "October",
        },
        {
          text: "November",
          value: "November",
        },
        {
          text: "December",
          value: "December",
        },
      ],
      onFilter: (value, record) => {
        let { Month } = ExtractMonthAndYear(record.invoiceDate);
        return Month === value;
      },
      render: (text, response) => {
        let { Month } = ExtractMonthAndYear(response.invoiceDate);
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{Month}</span>
          </>
        );
      },
    },
    {
      title: t("Invoice-year"),
      dataIndex: "Invoiceyear",
      key: "Invoiceyear",
      align: "center",
      filters: [
        {
          text: "2010",
          value: 2010,
        },
        {
          text: "2011",
          value: 2011,
        },
        {
          text: "2012",
          value: 2012,
        },
        {
          text: "2013",
          value: 2013,
        },
        {
          text: "2014",
          value: 2014,
        },
        {
          text: "2015",
          value: 2015,
        },
        {
          text: "2016",
          value: 2016,
        },
        {
          text: "2017",
          value: 2017,
        },
        {
          text: "2018",
          value: 2018,
        },
        {
          text: "2019",
          value: 2019,
        },
        {
          text: "2020",
          value: 2020,
        },
        {
          text: "2021",
          value: 2021,
        },
        {
          text: "2022",
          value: 2022,
        },
        {
          text: "2023",
          value: 2023,
        },
        {
          text: "2024",
          value: 2024,
        },
      ],
      onFilter: (value, record) => {
        let { Year } = ExtractMonthAndYear(record.invoiceDate);
        return Year === value;
      },
      render: (text, record) => {
        let { Year } = ExtractMonthAndYear(record.invoiceDate);
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(Year) : Year}
            </span>
          </>
        );
      },
    },
    {
      title: t("Essential"),
      dataIndex: "essential",
      key: "essential",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Professional"),
      dataIndex: "professional",
      key: "professional",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Premium"),
      dataIndex: "premium",
      key: "premium",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>
              {currentLanguage === "ar" ? convertNumbersInToArabic(text) : text}
            </span>
          </>
        );
      },
    },
    {
      title: t("Subscription"),
      dataIndex: "tenure",
      key: "tenure",
      align: "center",
      ellipsis: true,
      filters: [
        {
          text: "Annual",
          value: "Annual",
        },
        {
          text: "Monthly",
          value: "Monthly",
        },
        {
          text: "Quaterly",
          value: "Quaterly",
        },
      ],
      onFilter: (value, record) => record.tenure.indexOf(value) === 0,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      ellipsis: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashOutflow-amount-column-title"]}>{`${
              currentLanguage === "ar"
                ? convertNumbersInToArabic(formatNumber(text))
                : formatNumber(text)
            } ${"$"}`}</span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (currentLanguage !== undefined && currentLanguage !== null) {
      if (currentLanguage === "en") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_en);
        setInFlowTab(true);
        setOutstandingTab(false);
      } else if (currentLanguage === "ar" || currentLanguage === "ar-SA") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
        setInFlowTab(true);
        setOutstandingTab(false);
      }
    }
  }, [currentLanguage]);

  // tab button of cash IN Flow
  const inflowClick = () => {
    setInFlowTab(true);
    setOutstandingTab(false);
    setShowSearchText(false); // Clear search text when switching tabs

    setFlowsSearch({
      ...flowsSearch,
      organizationName: "",
      DateFrom: "",
      DateTo: "",
      displayDateFrom: "",
      displayDateTo: "",
    });

    let data = {
      OrganizationName: "",
      DateFrom: "",
      DateTo: "",
      sRow: 0, // index
      eRow: 8, // length
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getCashFlowMainApi({ data, navigate, t }));
  };

  // tab button of outstanding cash Flow
  const outstandingClick = () => {
    setOutstandingTab(true);
    setInFlowTab(false);

    setFlowsSearch({
      ...flowsSearch,
      organizationName: "",
      DateFrom: "",
      DateTo: "",
      displayDateFrom: "",
      displayDateTo: "",
    });

    setShowSearchText(false); // Clear search text when switching tabs
    let data = {
      OrganizationName: "",
      DateFrom: "",
      DateTo: "",
      sRow: 0, // index
      eRow: 8, // length
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
  };

  const handleChangeSearchBoxValues = (e) => {
    setShowSearchText(false);
    const { name, value } = e.target;
    setFlowsSearch({
      ...flowsSearch,
      [name]: value,
    });
  };

  // For Open Search Box
  const HandleopenSearchBox = () => {
    if (organizationNameSearch !== "") {
      setOrganizationNameSearch("");
      let data = {
        OrganizationName: "",
        DateFrom: "",
        DateTo: "",
        sRow: 1, // index
        eRow: 8, // leng
      };
      dispatch(getCashFlowMainApi({ data, navigate, t }));
    }

    setFlowsSearch({
      ...flowsSearch,
      OrganizationName: flowsSearch.organizationName,
      DateFrom: flowsSearch.DateFrom,
      DateTo: flowsSearch.DateTo,
      displayDateFrom: flowsSearch.displayDateFrom,
      displayDateTo: flowsSearch.displayDateTo,
    });
    setSearchBox(!searchBox);
  };
  // handle scroll for lazy loader
  const handleScroll = () => {
    if (isRowsData <= totalRecords) {
      console.log(isRowsData, "jgavjavajvja");
      setIsScroll(true);
      let data = {
        OrganizationName: flowsSearch.organizationName,
        DateFrom: flowsSearch.DateFrom,
        DateTo: flowsSearch.DateTo,
        sRow: Number(isRowsData), // index
        eRow: 8, // Length
      };
      dispatch(globalAdminDashBoardLoader(false));
      dispatch(getCashFlowMainApi({ data, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  // handle scroll for lazy loader
  const handleCashOutScroll = () => {
    if (isRowsOutData <= totalOutRecords) {
      setIsOutScroll(true);
      let data = {
        OrganizationName: flowsSearch.organizationName,
        DateFrom: flowsSearch.DateFrom,
        DateTo: flowsSearch.DateTo,
        sRow: Number(isRowsOutData),
        eRow: 8,
      };
      dispatch(globalAdminDashBoardLoader(false));
      dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
    } else {
      setIsOutScroll(false);
    }
  };

  // on close Icon to close search box
  const handleCancelSearchbox = () => {
    setSearchBox(false);
    setFlowsSearch({
      ...flowsSearch,
      organizationName: "",
      DateFrom: "",
      DateTo: "",
      displayDateFrom: "",
      displayDateTo: "",
    });
  };

  // when Show search data below the search Box
  const handleSearches = (data, fieldName) => {
    const updatedFlowsSearch = {
      ...flowsSearch,
      [fieldName]: "",
      ...(fieldName === "DateFrom" || fieldName === "DateTo"
        ? { DateFrom: "", DateTo: "", displayDateFrom: "", displayDateTo: "" }
        : {}),
    };

    if (fieldName === "organizationName") {
      setUserNameSearch("");
    }
    setFlowsSearch(updatedFlowsSearch);

    if (inflowTab) {
      let data = {
        OrganizationName: updatedFlowsSearch.organizationName,
        DateFrom: updatedFlowsSearch.DateFrom,
        DateTo: updatedFlowsSearch.DateTo,
        sRow: 0,
        eRow: 8,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(
        getCashFlowMainApi({
          data,
          navigate,
          t,
        })
      );
    } else {
      let data = {
        OrganizationName: updatedFlowsSearch.organizationName,
        DateFrom: updatedFlowsSearch.DateFrom,
        DateTo: updatedFlowsSearch.DateTo,
        sRow: 0,
        eRow: 8,
      };
      setShowSearchText(false);
      setUserNameSearch("");
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
    }
  };

  const onChangeFromDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setFlowsSearch({
      ...flowsSearch,
      DateFrom: `${utcDate}000000`,
      displayDateFrom: date,
    });
  };

  const onChangeToDate = (date) => {
    let getDate = new Date(date);
    let utcDate = getDate.toISOString().slice(0, 10).replace(/-/g, "");
    setFlowsSearch({
      ...flowsSearch,
      DateTo: `${utcDate}000000`,
      displayDateTo: date,
    });
  };

  // onClick to search from search box
  const handleSearch = () => {
    try {
      if (inflowTab === true) {
        let data = {
          OrganizationName: flowsSearch.organizationName
            ? flowsSearch.organizationName
            : "",
          DateFrom: flowsSearch.DateFrom ? flowsSearch.DateFrom : "",
          DateTo: flowsSearch.DateTo ? flowsSearch.DateTo : "",
          sRow: 0, // index
          eRow: 8, // Lnegth
        };
        dispatch(globalAdminDashBoardLoader(true));
        // Clear previous results
        setCashInFlowData([]);
        setTotalRecords(0);
        setSRowsData(0);
        dispatch(getCashFlowMainApi({ data, navigate, t }));
        setSearchBox(false);
        setShowSearchText(true);
      } else {
        let data = {
          OrganizationName: flowsSearch.organizationName
            ? flowsSearch.organizationName
            : "",
          DateFrom: flowsSearch.DateFrom,
          DateTo: flowsSearch.DateTo,
          sRow: 0, // index
          eRow: 8, // leng
        };
        dispatch(globalAdminDashBoardLoader(true));
        // Clear previous results
        setCashOutFlowTable([]);
        setTotalRecords(0);
        setSRowsData(0);
        dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
        setSearchBox(false);
        setShowSearchText(true);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // handler for Reset
  const handleReset = () => {
    setFlowsSearch({
      ...flowsSearch,
      organizationName: "",
      DateFrom: "",
      DateTo: "",
      displayDateFrom: null,
      displayDateTo: null,
    });
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
        if (inflowTab === true) {
          let data = {
            OrganizationName: userNameSearch,
            DateFrom: "",
            DateTo: "",
            sRow: 0, // index
            eRow: 8, // length
          };
          setCashInFlowData([]);
          setTotalRecords(0);
          setSRowsData(0);
          dispatch(globalAdminDashBoardLoader(true));
          dispatch(getCashFlowMainApi({ data, navigate, t }));
        } else if (outstandingTab === true && inflowTab === false) {
          let data = {
            OrganizationName: userNameSearch,
            DateFrom: "",
            DateTo: "",
            sRow: 0, // index
            eRow: 8, // length
          };
          setCashOutFlowTable([]);
          setTotalRecords(0);
          setSRowsData(0);
          dispatch(globalAdminDashBoardLoader(true));
          dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
        }
      }
      setShowSearchText(true);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col lg={7} md={7} sm={7}>
            <span className={styles["HeadingViewORganization"]}>
              {t("Cash-flow-summary")}
            </span>
          </Col>
          <Col lg={5} md={5} sm={5}>
            <span className="position-relative">
              <TextField
                onKeyDown={handleKeyDownSearch}
                placeholder={t("Search")}
                labelClass={"d-none"}
                applyClass={"NewMeetingFileds"}
                name={"organizationName"}
                change={onChangeEventForSearch}
                value={userNameSearch}
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
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex gap-2 flex-wrap"
                          >
                            {showsearchText &&
                            flowsSearch.organizationName !== "" ? (
                              <div className={styles["SearchablesItems"]}>
                                <span className={styles["Searches"]}>
                                  {flowsSearch.organizationName}
                                </span>
                                <img
                                  src={Crossicon}
                                  alt=""
                                  className={styles["CrossIcon_Class"]}
                                  width={13}
                                  onClick={() =>
                                    handleSearches(
                                      flowsSearch.organizationName,
                                      "organizationName"
                                    )
                                  }
                                />
                              </div>
                            ) : null}

                            {showsearchText && flowsSearch.DateFrom !== "" ? (
                              <div className={styles["SearchablesItems"]}>
                                <span className={styles["Searches"]}>
                                  {formatDate(
                                    flowsSearch.DateFrom,
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
                                      flowsSearch.DateFrom,
                                      "DateFrom"
                                    )
                                  }
                                />
                              </div>
                            ) : null}

                            {showsearchText && flowsSearch.DateTo !== "" ? (
                              <div className={styles["SearchablesItems"]}>
                                <span className={styles["Searches"]}>
                                  {formatDate(
                                    flowsSearch.DateTo,
                                    currentLanguage
                                  )}
                                </span>
                                <img
                                  src={Crossicon}
                                  alt=""
                                  className={styles["CrossIcon_Class"]}
                                  width={13}
                                  onClick={() =>
                                    handleSearches(flowsSearch.DateTo, "DateTo")
                                  }
                                />
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                }
                iconClassName={"d-block"}
              />

              <Row>
                <Col lg={4} md={4} sm={4}>
                  {showsearchText && userNameSearch !== "" ? (
                    <div className={styles["SearchablesItems"]}>
                      <span className={styles["Searches"]}>
                        {userNameSearch}
                      </span>
                      <img
                        src={Crossicon}
                        alt=""
                        className={styles["CrossIcon_Class"]}
                        width={13}
                        onClick={() =>
                          handleSearches(userNameSearch, "organizationName")
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
                        <Col lg={12} md={12} sm={12}>
                          <TextField
                            labelClass={"d-none"}
                            value={flowsSearch.organizationName}
                            name={"organizationName"}
                            applyClass={"SearchTextFiled"}
                            placeholder={t("Organization-name")}
                            change={handleChangeSearchBoxValues}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col lg={6} md={6} sm={6}>
                          <DatePicker
                            format={"MMM DD, YYYY"}
                            placeholder={t("Date-From")}
                            value={flowsSearch.displayDateFrom}
                            render={
                              <InputIcon
                                placeholder={t("Date-from")}
                                className={
                                  styles["UserLoginHistory_datePicker"]
                                }
                              />
                            }
                            onChange={onChangeFromDate}
                            editable={false}
                            className="datePickerTodoCreate2"
                            containerClassName={styles["datePicker_Container"]}
                            onOpenPickNewDate={false}
                            inputMode=""
                            calendar={calendarValue}
                            locale={localValue}
                            ref={calendRef}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <DatePicker
                            format={"MMM DD, YYYY"}
                            placeholder={t("Date-to")}
                            value={flowsSearch.displayDateTo}
                            render={
                              <InputIcon
                                placeholder={t("Date-to")}
                                className={
                                  styles["UserLoginHistory_datePicker"]
                                }
                              />
                            }
                            editable={false}
                            className="datePickerTodoCreate2"
                            containerClassName={styles["datePicker_Container"]}
                            onOpenPickNewDate={false}
                            onChange={onChangeToDate}
                            inputMode=""
                            calendar={calendarValue}
                            locale={localValue}
                            ref={calendRef}
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
                            onClick={handleSearch}
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
            <div>
              <Row>
                <Col
                  sm={9}
                  md={9}
                  lg={9}
                  className="d-flex justify-content-start gap-3 my-3"
                >
                  <Button
                    text="Inflows"
                    className={
                      inflowTab
                        ? `${styles["InflowsButton"]} ${styles["active"]}`
                        : styles["InflowsButton"]
                    }
                    onClick={inflowClick}
                  />
                  <Button
                    text="Outstandings"
                    className={
                      outstandingTab
                        ? `${styles["OutstandingButton"]} ${styles["active"]}`
                        : styles["OutstandingButton"]
                    }
                    onClick={outstandingClick}
                  />
                </Col>
                {inflowTab ? (
                  <>
                    <Col
                      sm={3}
                      md={3}
                      lg={3}
                      className={styles["cashflow-bottom-text"]}
                    >
                      <span className={styles["total-text"]}>
                        {t("Total-cash-inflows")}{" "}
                        <span className={styles["total-amount-text"]}>
                          {`${
                            currentLanguage === "ar"
                              ? convertNumbersInToArabic(
                                  formatNumber(totalInflow)
                                )
                              : formatNumber(totalInflow)
                          } ${"$"}`}
                        </span>
                      </span>
                    </Col>
                  </>
                ) : outstandingTab ? (
                  <>
                    <Col
                      sm={3}
                      md={3}
                      lg={3}
                      className={styles["cashflow-bottom-text"]}
                    >
                      <span className={styles["total-text"]}>
                        {t("Total-outstanding")}{" "}
                        <span className={styles["total-amount-outstanding"]}>
                          {`${
                            currentLanguage === "ar"
                              ? convertNumbersInToArabic(
                                  formatNumber(totalOutstanding)
                                )
                              : formatNumber(totalOutstanding)
                          } ${"$"}`}
                        </span>
                      </span>
                    </Col>
                  </>
                ) : null}
              </Row>
            </div>
            {inflowTab ? (
              <>
                <InfiniteScroll
                  dataLength={cashInFlowData.length}
                  next={handleScroll}
                  height={"60vh"}
                  className={styles["cashFLowClass-infinite"]}
                  hasMore={
                    cashInFlowData.length === totalRecords ? false : true
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
                    column={cashFlowColumn}
                    pagination={false}
                    rows={cashInFlowData}
                    footer={false}
                    className="cashFLowClass"
                  />
                </InfiniteScroll>
              </>
            ) : outstandingTab ? (
              <>
                <InfiniteScroll
                  dataLength={cashOutFlowTable.length}
                  next={handleCashOutScroll}
                  className={styles["cashFLowClass-infinite"]}
                  height={"60vh"}
                  hasMore={
                    cashOutFlowTable.length === totalOutRecords ? false : true
                  }
                  loader={
                    isRowsOutData <= totalOutRecords && isOutScroll ? (
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
                    column={OutstandingColumn}
                    pagination={false}
                    rows={cashOutFlowTable}
                    footer={false}
                    className={"outstandingFlow"}
                  />
                </InfiniteScroll>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CashFlowSummary;
