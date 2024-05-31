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
  convertUTCDateToLocalDate,
  formatDate,
} from "../../common/functions/dateFormatters";
import { Dropdown, Menu, Tag } from "antd";
import moment from "moment";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getCashFlowMainApi,
  getCashOutStandingFlowMainApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
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
  const [inflowTab, setInlowTab] = useState(true);
  const [outstandingTab, setOutstandingTab] = useState(false);

  // for cashflow table data state
  const [cashFlowTable, setCashFlowTable] = useState([]);

  // for total cash Inflow
  const [totalInflow, setTotalInflow] = useState(0);

  // for cash OutFLow Table Data state
  const [cashOutFlowTable, setCashOutFlowTable] = useState([]);

  // for total outstanding cashFlow
  const [totalOutstanding, setTotalOutstanding] = useState(0);

  // for lazy Loading state
  const [isRowsData, setSRowsData] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  const [cashInFlowData, setCashInFlowData] = useState([]);

  const [searchBox, setSearchBox] = useState(false);

  // open edit subscription modal
  // const [editSubModal, setEditSubModal] = useState(false);
  // console.log(editSubModal, "editSubModal");

  //States for the component

  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);

  // cashFlow Search Box
  const [cashFlowSearch, setCashFlowSearch] = useState({
    OrganizationName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    DateFrom: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    DateTo: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // cash flow sorting state
  const [sortCashFlow, setSortCashFlow] = useState(null);

  // cash Out Flow sorting state
  const [sortCashOutFlow, setSortCashOutFlow] = useState(null);

  const HandleopenSearchBox = () => {
    setSearchBox(!searchBox);
  };

  // fetch Data from cashIn flow reducer
  // useEffect(() => {
  //   if (cashFlowData !== null) {
  //     setTotalInflow(cashFlowData.result.totalCashFlows);
  //     if (cashFlowData.result.cashFlows.length > 0) {
  //       setCashFlowTable(cashFlowData.result.cashFlows);
  //     } else {
  //       console.log("Nothing");
  //       setCashFlowTable([]);
  //     }
  //   } else {
  //     setCashFlowTable(0);
  //     console.log("Nothing");
  //   }
  // }, [cashFlowData]);

  // To show lazy loading scroller

  useEffect(() => {
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
  }, [cashFlowData]);

  // fetch cashflow Api Data
  useEffect(() => {
    let data = {
      OrganizationName: "",
      DateFrom: "",
      DateTo: "",
      sRow: 1,
      eRow: 100,
    };
    dispatch(getCashFlowMainApi({ data, navigate, t }));
  }, []);

  // fetch Data from Cash Out Flow Reducer
  useEffect(() => {
    if (cashOutFlowData !== null) {
      setTotalOutstanding(cashOutFlowData.result.totalCashFlows);
      if (cashOutFlowData.result.cashFlows.length > 0) {
        setCashOutFlowTable(cashOutFlowData.result.cashFlows);
      } else {
        console.log("No Cash Out Flow");
      }
    } else {
      console.log("Nothing");
    }
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
      onFilter: (value, record) => record.Invoicemonth.indexOf(value) === 0,
      ellipsis: true,
      sortDirections: ["descend"],
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
      ],
      onFilter: (value, record) => record.Invoiceyear === value,
      ellipsis: true,
      sortDirections: ["descend"],
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
          text: "Yearly",
          value: "Yearly",
        },
        {
          text: "Monthly",
          value: "Monthly",
        },
        {
          text: "Quarterly",
          value: "Quarterly",
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
      onFilter: (value, record) => record.Invoicemonth.indexOf(value) === 0,
      render: (text, response) => {
        return (
          <>
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
          text: "2022",
          value: 2022,
        },
        {
          text: "2024",
          value: 2024,
        },
        {
          text: "2021",
          value: 2021,
        },
      ],
      onFilter: (value, record) => record.Invoiceyear === value,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
          text: "Yearly",
          value: "Yearly",
        },
        {
          text: "Monthly",
          value: "Monthly",
        },
        {
          text: "Quarterly",
          value: "Quarterly",
        },
      ],
      onFilter: (value, record) => record.Subscription.indexOf(value) === 0,
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
            <span className={styles["cashflow-column-title"]}>{text}</span>
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
      } else if (currentLanguage === "ar") {
        setCalendarValue(gregorian);
        setLocalValue(gregorian_ar);
      }
    }
  }, [currentLanguage]);

  // tab button of cash IN Flow
  const inflowClick = () => {
    setInlowTab(true);
    setOutstandingTab(false);
  };

  // tab button of outstanding cash Flow
  const outstandingClick = () => {
    setOutstandingTab(true);
    setInlowTab(false);
    let data = {
      OrganizationName: "",
      DateFrom: "",
      DateTo: "",
      sRow: 1,
      eRow: 100,
    };
    dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
  };

  // handle scroll for lazy loader
  const handleScroll = () => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let data = {
        OrganizationName: "",
        DateFrom: "",
        DateTo: "",
        sRow: Number(isRowsData),
        // sRow: 1,
        eRow: 100,
      };
      dispatch(getCashFlowMainApi({ data, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  // handle scroll for lazy loader
  const handleCashOutScroll = () => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let data = {
        OrganizationName: "",
        DateFrom: "",
        DateTo: "",
        sRow: 1,
        eRow: 100,
      };
      dispatch(getCashOutStandingFlowMainApi({ data, navigate, t }));
    }
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
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
                placeholder={t("Search")}
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
                            name={"adminName"}
                            applyClass={"SearchTextFiled"}
                            placeholder={t("Organization-name")}
                          />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col lg={6} md={6} sm={6}>
                          <DatePicker
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
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <DatePicker
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
                          />
                          <Button
                            text={t("Search")}
                            className={styles["SearchButton"]}
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
                  sm={12}
                  md={12}
                  lg={12}
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
              </Row>
            </div>
            {inflowTab ? (
              <>
                <InfiniteScroll
                  dataLength={cashInFlowData.length}
                  next={handleScroll}
                  height={"60vh"}
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
                    // scroll={{
                    //   x: false,
                    // }}
                  />
                  <div className={styles["top-cashflow-border"]}>
                    <Row>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className={styles["cashflow-bottom-text"]}
                      >
                        <span className={styles["total-text"]}>
                          Total Cash Inflows:{" "}
                          <span className={styles["total-amount-text"]}>
                            {`${totalInflow}${"$"}`}
                          </span>
                        </span>
                      </Col>
                    </Row>
                  </div>
                </InfiniteScroll>
              </>
            ) : outstandingTab ? (
              <>
                <InfiniteScroll
                  dataLength={cashOutFlowTable.length}
                  next={handleCashOutScroll}
                  height={"20vh"}
                  hasMore={
                    cashOutFlowTable.length === totalRecords ? false : true
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
                    column={OutstandingColumn}
                    pagination={false}
                    rows={cashOutFlowTable}
                    footer={false}
                    className={"outstandingFlow"}
                  />
                  <div className={styles["top-cashflow-border"]}>
                    <Row>
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className={styles["cashflow-bottom-text"]}
                      >
                        <span className={styles["total-text"]}>
                          Total Outstanding:{" "}
                          <span className={styles["total-amount-outstanding"]}>
                            {`${totalOutstanding}${"$"}`}
                          </span>
                        </span>
                      </Col>
                    </Row>
                  </div>
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
