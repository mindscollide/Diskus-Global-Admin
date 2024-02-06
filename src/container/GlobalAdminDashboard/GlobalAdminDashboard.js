import React, { useEffect, useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import magnifyGlassIcon from "../../assets/images/OutletImages/Magglass Search Icon.png";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Pie } from "@ant-design/plots";
import { Button, Table, TextField } from "../../components/elements";
const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const MonthsRef = useRef();

  const CompanyRef = useRef();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Company = [
    "Apex Arcrane Enterprises",
    "Astral Apex Holdings",
    "Cascade Innovation Guild",
    "Mosaic Venture Groups",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const [isCompnayOpen, setIsCompnayOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(Company[0]);

  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [users, setUsers] = useState(false);

  const [trialBtn, setTrialBtn] = useState(false);
  const [trialExtended, setTrialExtended] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [subsExpiry, setsubsExpiry] = useState(false);

  const [essentialTbl, setessentialTbl] = useState(false);
  const [professionalTbl, setProfessionalTbl] = useState(false);
  const [premiumTbl, setPremiumTbl] = useState(false);

  const handleOutsideClick = (event) => {
    if (
      MonthsRef.current &&
      !MonthsRef.current.contains(event.target) &&
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  const HandleOutSideClickCompany = (event) => {
    if (
      CompanyRef.current &&
      !CompanyRef.current.contains(event.target) &&
      isCompnayOpen
    ) {
      setIsCompnayOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", HandleOutSideClickCompany);
    return () => {
      document.removeEventListener("click", HandleOutSideClickCompany);
    };
  }, [isCompnayOpen]);

  const toggling = () => setIsOpen(!isOpen);

  const togglingCompany = () => setIsCompnayOpen(!isCompnayOpen);

  const onMonthClick = (month) => () => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  const onCountryClickClick = (Country) => () => {
    setSelectedCompany(Country);
    setIsCompnayOpen(false);
  };

  const handleOrgnizationStatus = () => {
    setessentialTbl(false);
    setProfessionalTbl(false);
    setPremiumTbl(false);
    setUsers(false);
    setOrganizationStatus(true);
  };

  const handleUsers = () => {
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setOrganizationStatus(false);
    setUsers(true);
  };

  const DashboardGlobalColumn = [
    {
      title: t("Month"),
      dataIndex: "Month",
      key: "Month",
      width: "135px",
    },
    {
      title: t("Amount-due"),
      dataIndex: "amountDue",
      key: "amountDue",
      width: "135px",
    },
    {
      title: t("Billing-date"),
      dataIndex: "billingDate",
      key: "billingDate",
      width: "130px",
    },
  ];

  //Chart
  // 1 Chart
  const config = {
    data: [
      { type: "One", value: 27 },
      { type: "Two", value: 25 },
      { type: "Three", value: 18 },
      { type: "Four", value: 15 },
      { type: "Five", value: 10 },
      { type: "Six", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    widht: "100%",
    height: 200,
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "right",
        rowPadding: 11,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          // text: "AntV\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  // Second Chart
  const configSecond = {
    data: [
      { type: "One", value: 27 },
      { type: "Two", value: 25 },
      { type: "Three", value: 18 },
      { type: "Four", value: 15 },
      { type: "Five", value: 10 },
      { type: "Six", value: 5 },
    ],
    angleField: "value",
    colorField: "type",
    widht: "100%",
    height: 200,
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: true,
        position: "right",
        rowPadding: 11,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          // text: "AntV\nCharts",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  const TrialColumn = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "175px",
    },
    {
      title: t("Trial-start-date"),
      dataIndex: "TrialStartDate",
      key: "TrialStartDate",
      width: "115px",
    },
    {
      title: t("Trial-end-date"),
      dataIndex: "TrialEndDate",
      key: "TrialEndDate",
      width: "115px",
    },
  ];

  const TraiExtendedColumn = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "135px",
    },
    {
      title: t("Trial-extended-date"),
      dataIndex: "TrialExtendedDate",
      key: "TrialExtendedDate",
      width: "135px",
    },
    {
      title: t("Trial-extended-end-date"),
      dataIndex: "TrialExtendedEndDate",
      key: "TrialExtendedEndDate",
      width: "145px",
    },
  ];

  const subscriptionColumn = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "135px",
    },
    {
      title: t("Expiry-date"),
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      width: "135px",
    },
    {
      title: t("Billing-date"),
      dataIndex: "BillingDate",
      key: "BillingDate",
      width: "145px",
    },
  ];

  const subscriptionExpiry = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "135px",
    },
    {
      title: t("Expiry-date"),
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      width: "135px",
    },
  ];

  const essentialColumns = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "125px",
    },
    {
      title: t("Organization-name"),
      dataIndex: "OrganizationName",
      key: "OrganizationName",
      width: "175px",
    },
    {
      title: t("Start-date"),
      dataIndex: "StartDate",
      key: "StartDate",
      width: "135px",
    },
    {
      title: t("End-date"),
      dataIndex: "EndDate",
      key: "EndDate",
      width: "115px",
    },
  ];

  const ProfessionalColumns = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "125px",
    },
    {
      title: t("Organization-name"),
      dataIndex: "OrganizationName",
      key: "OrganizationName",
      width: "175px",
    },
    {
      title: t("Start-date"),
      dataIndex: "StartDate",
      key: "StartDate",
      width: "135px",
    },
    {
      title: t("End-date"),
      dataIndex: "EndDate",
      key: "EndDate",
      width: "115px",
    },
  ];

  const PreimiumColumns = [
    {
      title: t("Name"),
      dataIndex: "Name",
      key: "Name",
      width: "125px",
    },
    {
      title: t("Organization-name"),
      dataIndex: "OrganizationName",
      key: "OrganizationName",
      width: "175px",
    },
    {
      title: t("Start-date"),
      dataIndex: "StartDate",
      key: "StartDate",
      width: "135px",
    },
    {
      title: t("End-date"),
      dataIndex: "EndDate",
      key: "EndDate",
      width: "115px",
    },
  ];

  const handleTrailButton = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setSubscription(false);
    setTrialExtended(false);
    setTrialBtn(true);
  };

  const handleTrialExtendedButton = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setSubscription(false);
    setTrialBtn(false);
    setTrialExtended(true);
  };

  const handleSubscriptionTable = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(true);
  };

  const handleSubscriptionExpiry = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(true);
  };

  const handleEssentialButton = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setessentialTbl(true);
  };

  const handleProfessionalButton = () => {
    setPremiumTbl(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setessentialTbl(false);
    setProfessionalTbl(true);
  };

  const handlePreiumButton = () => {
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setessentialTbl(false);
    setProfessionalTbl(false);
    setPremiumTbl(true);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col lg={5} md={5} sm={5}>
            <section className={styles["LeftBoxDashboard"]}>
              <Row>
                <Col lg={4} md={4} sm={12}>
                  <span className={styles["BillingDueHeading"]}>
                    {t("Billing-due")}
                  </span>
                </Col>
                <Col lg={3} md={3} sm={3} className="position-relative">
                  <div className={styles["dropdown-container"]}>
                    <div
                      className={styles["dropdown-header"]}
                      onClick={toggling}
                      ref={MonthsRef}
                    >
                      <span className={styles["MonthName"]}>
                        {selectedMonth}
                      </span>

                      <span
                        className={
                          isOpen ? ` ${styles["down"]} ` : `${styles["up"]}`
                        }
                      ></span>
                    </div>
                    {isOpen && (
                      <>
                        <section className={styles["dropdown_list"]}>
                          {months.map((month) => {
                            return (
                              <>
                                <div
                                  className={styles["dropdown-list-item"]}
                                  onClick={onMonthClick(month)}
                                  key={month}
                                >
                                  {month}
                                </div>
                              </>
                            );
                          })}
                        </section>
                      </>
                    )}
                  </div>
                </Col>
                <Col lg={5} md={5} sm={5}>
                  <div className={styles["dropdown-container"]}>
                    <div
                      className={styles["dropdown-header"]}
                      onClick={togglingCompany}
                      ref={CompanyRef}
                    >
                      <span className={styles["MonthName"]}>
                        {selectedCompany}
                      </span>

                      <span
                        className={
                          isCompnayOpen
                            ? ` ${styles["down"]} `
                            : `${styles["up"]}`
                        }
                      ></span>
                    </div>
                    {isCompnayOpen && (
                      <>
                        <section className={styles["dropdown_list"]}>
                          {Company.map((Country) => {
                            return (
                              <>
                                <div
                                  className={styles["dropdown-list-item"]}
                                  onClick={onCountryClickClick(Country)}
                                  key={Country}
                                >
                                  {Country}
                                </div>
                              </>
                            );
                          })}
                        </section>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center flex-column flex-wrap align-items-center"
                >
                  <span className={styles["PrizeStyles"]}>145$</span>
                  <span className={styles["PrizeSubHeading"]}>
                    Apex Arcane Enterprises Bill due
                  </span>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={DashboardGlobalColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                </Col>
              </Row>
            </section>
          </Col>
          <Col lg={7} md={7} sm={7}>
            <section className={styles["RightBoxDashboard"]}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <span className={styles["OrgazationStatusHeading"]}>
                    {t("Organization-status")}
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className={styles["OrgazationStatusHeading"]}>
                    {t("Users")}
                  </span>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={6} md={6} sm={12}>
                  <section
                    className={
                      organizationStatus
                        ? styles["OuterBoxPieChartActive"]
                        : styles["OuterBoxPieChart"]
                    }
                    onClick={handleOrgnizationStatus}
                  >
                    <Pie {...config} />
                  </section>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <section
                    className={
                      users
                        ? styles["OuterBoxPieChartActive"]
                        : styles["OuterBoxPieChart"]
                    }
                    onClick={handleUsers}
                  >
                    <Pie {...configSecond} />
                  </section>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12} className="d-flex gap-2">
                  {organizationStatus ? (
                    <>
                      <Button
                        text={t("Trial")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleTrailButton}
                      />
                      <Button
                        text={t("Trial-extended")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleTrialExtendedButton}
                      />
                      <Button
                        text={t("Subscribed")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleSubscriptionTable}
                      />
                      <Button
                        text={t("Subscription-expired")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleSubscriptionExpiry}
                      />
                    </>
                  ) : users ? (
                    <>
                      <Button
                        text={t("Essential")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleEssentialButton}
                      />
                      <Button
                        text={t("Professional")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handleProfessionalButton}
                      />
                      <Button
                        text={t("Premium")}
                        className={styles["ButtonsDashboard"]}
                        onClick={handlePreiumButton}
                      />
                    </>
                  ) : null}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} sm={12} md={12}>
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
                                src={magnifyGlassIcon}
                                alt=""
                                className={styles["Search_Bar_icon_class"]}
                                draggable="false"
                              />
                            </Col>
                          </Row>
                        </>
                      }
                      iconClassName={"d-block"}
                    />
                  </span>
                </Col>
              </Row>
              <Row>
                {trialBtn ? (
                  <Table
                    column={TrialColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : trialExtended ? (
                  <Table
                    column={TraiExtendedColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : subscription ? (
                  <Table
                    column={subscriptionColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : subsExpiry ? (
                  <Table
                    column={subscriptionExpiry}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : essentialTbl ? (
                  <Table
                    column={essentialColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : professionalTbl ? (
                  <Table
                    column={ProfessionalColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : premiumTbl ? (
                  <Table
                    column={PreimiumColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                  />
                ) : null}
                <Col lg={12} md={12} sm={12}></Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GlobalAdminDashboard;
