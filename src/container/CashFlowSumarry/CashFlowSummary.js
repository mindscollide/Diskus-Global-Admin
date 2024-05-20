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
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
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
// import FlagCountryName from "./CountryFlagFunctionality/CountryFlag";

const CashFlowSummary = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("currentLanguage");
  const local = currentLanguage === "en" ? "en-US" : "ar-SA";

  // For tabs condition
  const [inflowTab, setInlowTab] = useState(true);
  const [outstandingTab, setOutstandingTab] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const [yearFilterVisible, setYearFilterVisible] = useState(false);

  const [subscriptionFilter, setSubscriptionFilter] = useState(false);

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

  const HandleopenSearchBox = () => {
    setSearchBox(!searchBox);
  };

  const handleMenuClick = (e) => {
    setSelectedMonth(e.key);
    setFilterVisible(false);
  };

  const handleCloseTag = () => {
    setSelectedMonth(null);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="January">January</Menu.Item>
      <Menu.Item key="February">February</Menu.Item>
      <Menu.Item key="March">March</Menu.Item>
      <Menu.Item key="April">April</Menu.Item>
      <Menu.Item key="May">May</Menu.Item>
      <Menu.Item key="June">June</Menu.Item>
      <Menu.Item key="July">July</Menu.Item>
      <Menu.Item key="August">August</Menu.Item>
      <Menu.Item key="September">September</Menu.Item>
      <Menu.Item key="October">October</Menu.Item>
      <Menu.Item key="November">November</Menu.Item>
      <Menu.Item key="December">December</Menu.Item>

      {/* Add other months as needed */}
    </Menu>
  );

  const handleMenuYearClick = (e) => {
    console.log("Selected year:", e.key);
    setYearFilterVisible(false);
  };

  const menuYear = (
    <Menu onClick={handleMenuYearClick}>
      <Menu.Item key="2010">2010</Menu.Item>
      <Menu.Item key="2011">2011</Menu.Item>
      <Menu.Item key="2012">2012</Menu.Item>
      <Menu.Item key="2013">2013</Menu.Item>
      <Menu.Item key="2014">2014</Menu.Item>
      <Menu.Item key="2015">2015</Menu.Item>
      <Menu.Item key="2016">2016</Menu.Item>
      <Menu.Item key="2017">2017</Menu.Item>
      <Menu.Item key="2018">2018</Menu.Item>

      {/* Add other months as needed */}
    </Menu>
  );

  const handleSubscriptionClick = () => {
    setSubscriptionFilter(false);
  };

  const menuSubscription = (
    <Menu onClick={handleSubscriptionClick}>
      <Menu.Item key="Monthly">Monthly</Menu.Item>
      <Menu.Item key="Quarterly">Quarterly</Menu.Item>
      <Menu.Item key="Yearly">Yearly</Menu.Item>

      {/* Add other months as needed */}
    </Menu>
  );

  //cash flow dummy data
  const dummyData = [
    {
      organizationName: "Organization 1",
      Invoice: "INV-001",
      Invoicemonth: "January",
      Invoiceyear: 2024,
      Essential: 100,
      Professional: 200,
      Premium: 300,
      Subscription: 600,
      Amount: t("1200$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
  ];

  //outsanding dummy data
  const outstandingDummyData = [
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1440$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1840$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1760$"),
    },
    {
      organizationName: "Organization 2",
      Invoice: "INV-002",
      Invoicemonth: "February",
      Invoiceyear: 2024,
      Essential: 120,
      Professional: 240,
      Premium: 360,
      Subscription: 720,
      Amount: t("1990$"),
    },
  ];

  // cash flow column
  const cashFlowColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "left",
      ellipsis: true,
      width: 180,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Invoice"),
      dataIndex: "Invoice",
      key: "Invoice",
      align: "left",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: selectedMonth ? (
        <Tag
          color="blue"
          closable
          // className={styles["selected-class"]}
          onClose={handleCloseTag}
          closeIcon={<CloseOutlined />}
        >
          {selectedMonth}
        </Tag>
      ) : (
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={filterVisible}
          onVisibleChange={(visible) => setFilterVisible(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Invoice-month")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Invoicemonth",
      key: "Invoicemonth",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: (
        <Dropdown
          overlay={menuYear}
          trigger={["click"]}
          visible={yearFilterVisible}
          onVisibleChange={(visible) => setYearFilterVisible(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Invoice-year")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Invoiceyear",
      key: "Invoiceyear",
      align: "center",
      width: 150,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Essential"),
      dataIndex: "Essential",
      key: "Essential",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Professional"),
      dataIndex: "Professional",
      key: "Professional",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Premium"),
      dataIndex: "Premium",
      key: "Premium",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: (
        <Dropdown
          overlay={menuSubscription}
          trigger={["click"]}
          visible={subscriptionFilter}
          onVisibleChange={(visible) => setSubscriptionFilter(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Subscription")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Subscription",
      key: "Subscription",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Amount"),
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-amount"]}>{text}</span>
        </>
      ),
    },
  ];

  //Outstanding Column
  const OutstandingColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "left",
      ellipsis: true,
      width: 180,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Invoice"),
      dataIndex: "Invoice",
      key: "Invoice",
      align: "left",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: selectedMonth ? (
        <Tag
          color="blue"
          closable
          // className={styles["selected-class"]}
          onClose={handleCloseTag}
          closeIcon={<CloseOutlined />}
        >
          {selectedMonth}
        </Tag>
      ) : (
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          visible={filterVisible}
          onVisibleChange={(visible) => setFilterVisible(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Invoice-month")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Invoicemonth",
      key: "Invoicemonth",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: (
        <Dropdown
          overlay={menuYear}
          trigger={["click"]}
          visible={yearFilterVisible}
          onVisibleChange={(visible) => setYearFilterVisible(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Invoice-year")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Invoiceyear",
      key: "Invoiceyear",
      align: "center",
      width: 150,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Essential"),
      dataIndex: "Essential",
      key: "Essential",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Professional"),
      dataIndex: "Professional",
      key: "Professional",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Premium"),
      dataIndex: "Premium",
      key: "Premium",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: (
        <Dropdown
          overlay={menuSubscription}
          trigger={["click"]}
          visible={subscriptionFilter}
          onVisibleChange={(visible) => setSubscriptionFilter(visible)}
          className={styles["dropdown-arrow"]}
        >
          <span>
            {t("Subscription")}
            <span className={styles["arrow-aside"]}>
              <DownOutlined />
            </span>
          </span>
        </Dropdown>
      ),
      dataIndex: "Subscription",
      key: "Subscription",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["cashflow-column-title"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Amount"),
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span className={styles["oustanding-column-amount"]}>{text}</span>
        </>
      ),
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

  const inflowClick = () => {
    setInlowTab(true);
    setOutstandingTab(false);
  };

  const outstandingClick = () => {
    setOutstandingTab(true);
    setInlowTab(false);
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
                <Table
                  column={cashFlowColumn}
                  pagination={false}
                  rows={dummyData}
                  footer={false}
                  className={"userlogin_history_tableP"}
                  size={"medium"}
                />
                <div className={styles["top-cashflow-border"]}>
                  <Row>
                    <Col
                      sm={11}
                      md={11}
                      lg={11}
                      className={styles["cashflow-bottom-text"]}
                    >
                      <span className={styles["total-text"]}>
                        Total Cash Inflows:{" "}
                        <span className={styles["total-amount-text"]}>
                          10,000$
                        </span>
                      </span>
                    </Col>
                    <Col lg={1} md={1} sm={1} />
                  </Row>
                </div>
              </>
            ) : outstandingTab ? (
              <>
                <Table
                  column={OutstandingColumn}
                  pagination={false}
                  rows={outstandingDummyData}
                  footer={false}
                  className={"userlogin_history_tableP"}
                  size={"medium"}
                />
                <div className={styles["top-cashflow-border"]}>
                  <Row>
                    <Col
                      sm={11}
                      md={11}
                      lg={11}
                      className={styles["cashflow-bottom-text"]}
                    >
                      <span className={styles["total-text"]}>
                        Total Outstanding:{" "}
                        <span className={styles["total-amount-outstanding"]}>
                          15,000$
                        </span>
                      </span>
                    </Col>
                    <Col lg={1} md={1} sm={1} />
                  </Row>
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CashFlowSummary;
