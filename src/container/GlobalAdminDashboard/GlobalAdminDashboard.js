import React, { useEffect, useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import Search_Icon from "../../assets/images/OutletImages/Search_Icon.png";
import NoOrganizationIcon from "../../assets/images/OutletImages/No_Organization.png";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Pie } from "@ant-design/plots";
import { Button, Table, TextField } from "../../components/elements";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import {
  GetAllBillingDueApi,
  StatsOfActiveLicenseApi,
  TotalThisMonthDueApi,
} from "../../store/Actions/GlobalAdminDashboardActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationApi } from "../../store/Actions/ViewOrganizationActions";
import { convertUTCDateToLocalDate } from "../../common/functions/dateFormatters";
const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const MonthsRef = useRef();

  const CompanyRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //StatsOfActiveLicenseApi Reducer Data
  const StatsOfActiveLicenseApiReducerData = useSelector(
    (state) => state.globalAdminDashboardReducer.StatsOfActiveLicenseApiData
  );

  //Get All Organization Reducer Data
  const organizationIdData = useSelector(
    (state) => state.searchOrganization.getAllOrganizationData
  );

  //Get All TotalThisMonthDueApi Reducer Data
  const TotalThisMonthDueApiData = useSelector(
    (state) => state.globalAdminDashboardReducer.TotalThisMonthDueApiData
  );

  //Get All TotalThisMonthDueApi Reducer Data
  const GetAllBillingDueApiData = useSelector(
    (state) => state.globalAdminDashboardReducer.GetAllBillingDueApiData
  );

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

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [isCompnayOpen, setIsCompnayOpen] = useState(false);

  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [users, setUsers] = useState(false);

  const [trialBtn, setTrialBtn] = useState(false);
  const [trialExtended, setTrialExtended] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [subsExpiry, setsubsExpiry] = useState(false);

  const [essentialTbl, setessentialTbl] = useState(false);
  const [professionalTbl, setProfessionalTbl] = useState(false);
  const [premiumTbl, setPremiumTbl] = useState(false);

  //StatsOfActiveLicenseApi States
  const [activelicenses, setActivelicenses] = useState({
    totalActiveLicense: 0,
    totalNumberOfEssentialLicense: 0,
    totalNumberOfEssentialLicensePercentage: 0,
    totalNumberOfPremiumLicense: 0,
    totalNumberOfPremiumLicensePercentage: 0,
    totalNumberOfProfessionalLicense: 0,
    totalNumberOfProfessionalLicensePercentage: 0,
  });

  //TotalThisMonthDueApi states
  const [totalDue, setTotalDue] = useState(null);

  //Organizataion State
  const [organziations, setOrganizations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(
    organziations[0]?.organizationName || "Default Company Name"
  );
  const [organizationID, setOrganizationID] = useState(0);

  //Billing Dues Table data
  const [billDueTable, setBillDueTable] = useState([]);

  //Calling StatsOfActiveLicenseApi
  useEffect(() => {
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(StatsOfActiveLicenseApi({ navigate, t }));
  }, []);

  //StatsOfActiveLicenseApi Data
  useEffect(() => {
    try {
      if (
        StatsOfActiveLicenseApiReducerData !== null &&
        StatsOfActiveLicenseApiReducerData !== undefined
      ) {
        setActivelicenses({
          totalActiveLicense:
            StatsOfActiveLicenseApiReducerData.result.totalActiveLicense,
          totalNumberOfEssentialLicense:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfEssentialLicense,
          totalNumberOfEssentialLicensePercentage:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfEssentialLicensePercentage,
          totalNumberOfPremiumLicense:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfPremiumLicense,
          totalNumberOfPremiumLicensePercentage:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfPremiumLicensePercentage,
          totalNumberOfProfessionalLicense:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfProfessionalLicense,
          totalNumberOfProfessionalLicensePercentage:
            StatsOfActiveLicenseApiReducerData.result
              .totalNumberOfProfessionalLicensePercentage,
        });
      } else {
      }
    } catch (error) {
      console.log(error, "errors");
    }
  }, [StatsOfActiveLicenseApiReducerData]);

  //Getting All Organizations
  useEffect(() => {
    dispatch(viewOrganizationLoader(true));
    dispatch(getAllOrganizationApi({ navigate, t }));
  }, []);

  //Getting All Organizations Data
  useEffect(() => {
    let newarr = [];
    try {
      if (organizationIdData !== null && organizationIdData !== undefined) {
        console.log(organizationIdData, "organizationIdData");
        let organizations = organizationIdData.result.getAllOrganizations;
        organizations.map((data, index) => {
          console.log(data, "datadatadatadata");
          newarr.push(data);
        });
        setOrganizations(newarr);
      } else {
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [organizationIdData]);

  //byDefault Selection
  useEffect(() => {
    if (organziations.length > 0) {
      setSelectedCompany(organziations[0].organizationName);
      setOrganizationID(organziations[0].organizationID);
      let data = {
        OrganizationID: Number(organziations[0].organizationID),
      };
      dispatch(TotalThisMonthDueApi({ data, navigate, t }));
      dispatch(GetAllBillingDueApi({ data, navigate, t }));
    }
  }, [organziations]);

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

  //OutSide Click Functionality handled Both DropDowns
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
    setSelectedCompany(Country.organizationName);
    setOrganizationID(Country.organizationID);
    setIsCompnayOpen(false);
    if (Country.organizationID !== 0) {
      let data = {
        OrganizationID: Number(Country.organizationID),
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(TotalThisMonthDueApi({ data, navigate, t }));
      dispatch(GetAllBillingDueApi({ data, navigate, t }));
    }
  };
  //Data for Dues
  useEffect(() => {
    try {
      if (
        TotalThisMonthDueApiData !== null &&
        TotalThisMonthDueApiData !== undefined
      ) {
        setTotalDue(TotalThisMonthDueApiData.result.totalBillingThisMonth);
      } else {
      }
    } catch (error) {}
  }, [TotalThisMonthDueApiData]);

  //Billling Due Table Data
  useEffect(() => {
    try {
      if (
        GetAllBillingDueApiData !== null &&
        GetAllBillingDueApiData !== undefined
      ) {
        setBillDueTable(GetAllBillingDueApiData.result.billingDue);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }, [GetAllBillingDueApiData]);

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
      dataIndex: "billingMonth",
      key: "billingMonth",
      width: "135px",
      render: (text, response) => {
        return (
          <>
            <span className={styles["dashboard-table-insidetext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Amount-due"),
      dataIndex: "amountDue",
      key: "amountDue",
      width: "135px",
      render: (text, response) => {
        return (
          <>
            <span className={styles["dashboard-table-insidetext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Billing-date"),
      dataIndex: "billingDate",
      key: "billingDate",
      width: "130px",
      render: (text, response) => {
        console.log(response, "responseresponse");
        console.log(text, "responseresponse");
        return (
          <>
            <span className={styles["dashboard-table-insidetext"]}>
              {convertUTCDateToLocalDate(text)}
            </span>
          </>
        );
      },
    },
  ];

  //Chart
  // Users Chart
  const config = {
    data: [
      { type: "one", value: 27 },
      { type: "two", value: 25 },
      { type: "three", value: 18 },
    ],
    color: ({ type }) => {
      switch (type) {
        case "Saif":
          return "#ff7f0e";
        case "Aun":
          return "#1f77b4";
        case "Huzaifa":
          return "#2ca02c";
        default:
          return "#d3d3d3";
      }
    },
    angleField: "value",
    colorField: "type",
    widht: "100%",
    height: 200,
    paddingRight: 80,
    innerRadius: 0.5,
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

  // (User) Chart
  const configSecond = {
    data: [
      {
        type: "Essential",
        value: activelicenses.totalNumberOfEssentialLicense,
      },
      {
        type: "Professional",
        value: activelicenses.totalNumberOfProfessionalLicense,
      },
      { type: "Premium", value: activelicenses.totalNumberOfPremiumLicense },
    ],
    color: ({ type }) => {
      switch (type) {
        case "Essential":
          return "#ff7f0e";
        case "Professional":
          return "#1f77b4";
        case "Premium":
          return "#2ca02c";
        default:
          return "#d3d3d3";
      }
    },
    angleField: "value",
    colorField: "type",
    widht: "100%",
    height: 200,
    paddingRight: 80,
    innerRadius: 0.5,
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
                          {organziations.map((CountryData, index) => {
                            console.log(CountryData, "CountryDataCountryData");
                            return (
                              <>
                                <div
                                  className={styles["dropdown-list-item"]}
                                  onClick={onCountryClickClick(CountryData)}
                                  key={index}
                                >
                                  {CountryData.organizationName}
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
                  <span className={styles["PrizeStyles"]}>{totalDue}$</span>
                  <span className={styles["PrizeSubHeading"]}>
                    {selectedCompany}
                  </span>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={DashboardGlobalColumn}
                    pagination={false}
                    rows={billDueTable}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"180px"}
                              alt=""
                            />

                            <span className="Main-Title">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
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
                                src={Search_Icon}
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
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : trialExtended ? (
                  <Table
                    column={TraiExtendedColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : subscription ? (
                  <Table
                    column={subscriptionColumn}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : subsExpiry ? (
                  <Table
                    column={subscriptionExpiry}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : essentialTbl ? (
                  <Table
                    column={essentialColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : professionalTbl ? (
                  <Table
                    column={ProfessionalColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
                  />
                ) : premiumTbl ? (
                  <Table
                    column={PreimiumColumns}
                    pagination={false}
                    // rows={data}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center ">
                            <img
                              src={NoOrganizationIcon}
                              width={"80px"}
                              alt=""
                            />

                            <span className="Main-Title Table">
                              {t("No-organization")}
                            </span>
                            <span className="Sub-Title Table">
                              {t("No-organization-found-this-month")}
                            </span>
                          </section>
                        </>
                      ), // Set your custom empty text here
                    }}
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
