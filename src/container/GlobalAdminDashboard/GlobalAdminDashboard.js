import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import Search_Icon from "../../assets/images/OutletImages/Search_Icon.png";
import NoOrganizationIcon from "../../assets/images/OutletImages/No_Organization.png";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ExcelIcon from "../../assets/images/OutletImages/Excel-Icon.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { Button, Table, TextField } from "../../components/elements";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { Chart } from "react-google-charts";
import { Calendar } from "react-multi-date-picker";
import {
  OrganizationsByActiveLicenseApi,
  StatsOfActiveLicenseApi,
  GetAllBillingDueApi,
  TotalThisMonthDueApi,
  organziationStatsBySubscriptionApi,
  dashBoardReportApi,
  OrganizationSubscriptionTypeApi,
} from "../../store/Actions/GlobalAdminDashboardActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationApi } from "../../store/Actions/ViewOrganizationActions";
import {
  convertUTCDateToLocalDate,
  formatSessionDurationArabicAndEng,
} from "../../common/functions/dateFormatters";
import SendInvoiceModal from "./SendInvoiceModal/SendInvoiceModal";
import { dashboardSendInvoiceOpenModal } from "../../store/ActionsSlicers/UIModalsActions";

const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const MonthsRef = useRef();

  const CompanyRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const calenderRef = useRef();

  let currentLanguage = localStorage.getItem("currentLanguage");

  //StatsOfActiveLicenseApi Reducer Data
  const StatsOfActiveLicenseApiReducerData = useSelector(
    (state) => state.globalAdminDashboardReducer.StatsOfActiveLicenseApiData
  );

  //OrganizationStatsSubscriptionApi Reducer Data
  const OrganizationStatsSubscriptionReducer = useSelector(
    (state) =>
      state.globalAdminDashboardReducer.OrganizationStatsSubscriptionData
  );

  //OrganizationsByActiveLicenseApi Reducer Data
  const OrganizationLicenseReducer = useSelector(
    (state) =>
      state.globalAdminDashboardReducer.OrganizationsByActiveLicenseApiData
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

  // Reducer for Organization Stats graph Table Reducer
  const OrganizationStatsTableDataReducer = useSelector(
    (state) =>
      state.globalAdminDashboardReducer.OrganizationSubscriptionStatsGraphData
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

  const handleClick = useCallback(() => {
    if (calenderRef.current.isOpen) {
      return calenderRef.current.closeCalendar();
    } else {
      return calenderRef.current.openCalendar();
    }
  }, [calenderRef]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [isCompnayOpen, setIsCompnayOpen] = useState(false);

  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [users, setUsers] = useState(false);

  const [trialBtn, setTrialBtn] = useState(false);
  const [trialExtended, setTrialExtended] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [subsExpiry, setsubsExpiry] = useState(false);

  // state for row of Trial Btn
  const [trialRow, setTrialRow] = useState([]);

  // state for row trial Extended
  const [trialExtendedRow, setTrialExtendedRow] = useState([]);

  // state for row list of subscribed
  const [subscribedRow, setSubscribedRow] = useState([]);

  // state for row list of subscription expired
  const [subscriptionExpiredRow, setSubscriptionExpiredRow] = useState([]);

  const [essentialTbl, setessentialTbl] = useState(false);
  const [professionalTbl, setProfessionalTbl] = useState(false);
  const [premiumTbl, setPremiumTbl] = useState(false);

  // state for row of essential
  const [essentialRow, setEssentialRow] = useState([]);

  // state for row of professional
  const [professionalRow, setProfessionalRow] = useState([]);

  // state for row of Premium
  const [premiumRow, setPremiumRow] = useState([]);

  //to open sendInvoice Modal
  const [sendInvoice, setSendInvoice] = useState("");

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

  //OrganizationActiveStatsAPi states
  const [organizationStatsLicense, setOrganizationStatsLicense] = useState({
    totalOrganizations: 0,
    totalNumberOfTrialOrganizations: 0,
    totalNumberOfTrialOrganizationsPercentage: 0,
    totalNumberOfExtendedTrialOrganizations: 0,
    totalNumberOfExtendedTrialOrganizationsPercentage: 0,
    totalNumberOfSubscribedOrganizations: 0,
    totalNumberOfSubscribedOrganizationsPercentage: 0,
    totalNumberOfExpiredSubscriptionOrganizations: 0,
    totalNumberOfExpiredSubscriptionOrganizationsPercentage: 0,
    totalNumberOfExpiredTrialSubscriptionOrganizations: 0,
    totalNumberOfExpiredTrialSubscriptionOrganizationsPercentage: 0,
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

  //Lazy Loading States of Trial Table (Organization Status)
  const [isScroll, setIsScroll] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isRowsData, setSRowsData] = useState(0);

  //Lazy Loading States of Trial Table (Organization Status)
  const [isScrollTrialExtended, setIsScrollTrialExtended] = useState(false);
  const [totalRecordsTrialExtended, setTotalRecordsTrialExtended] = useState(0);
  const [isRowsDataTrialExtended, setSRowsDataTrialExtended] = useState(0);

  //Lazy Loading States of Subscribed Table (Organization Status)
  const [isScrollSubscribed, setIsScrollSubscribed] = useState(false);
  const [totalRecordsSubscribed, setTotalRecordsSubscribed] = useState(0);
  const [isRowsDataSubscribed, setSRowsDataSubscribed] = useState(0);

  //Lazy Loading States of Subscription Expiry Table (Organization Status)
  const [isScrollSubscriptionExpiry, setIsScrollSubscriptionExpiry] =
    useState(false);
  const [totalRecordsSubscriptionExpiry, setTotalRecordsSubscriptionExpiry] =
    useState(0);
  const [isRowsDataSubscriptionExpiry, setSRowsDataSubscriptionExpiry] =
    useState(0);

  //Lazy Loading States of Essential Table (users)
  const [isScrollEssential, setIsScrollEssential] = useState(false);
  const [totalRecordsEssential, setTotalRecordsEssential] = useState(0);
  const [isRowsDataEssential, setSRowsDataEssential] = useState(0);

  //Lazy Loading States of Professional Table (users)
  const [isScrollProfessional, setIsScrollProfessional] = useState(false);
  const [totalRecordsProfessional, setTotalRecordsProfessional] = useState(0);
  const [isRowsDataProfessional, setSRowsDataProfessional] = useState(0);

  //Lazy Loading States of Premium Table (users)
  const [isScrollPremium, setIsScrollPremium] = useState(false);
  const [totalRecordsPremium, setTotalRecordsPremium] = useState(0);
  const [isRowsDataPremium, setSRowsDataPremium] = useState(0);

  //Lazy Loading States of Billing Due Table (users)
  const [isScrollBilling, setIsScrollBilling] = useState(false);
  const [totalRecordsBilling, setTotalRecordsBilling] = useState(0);
  const [isRowsDataBilling, setSRowsDataBilling] = useState(0);

  //Calling StatsOfActiveLicenseApi
  useEffect(() => {
    let userData = {
      PageNumber: 1,
      length: 15,
    };
    let data = {
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(StatsOfActiveLicenseApi({ navigate, t }));
    //Calling organziationStatsBySubscriptionApi
    dispatch(organziationStatsBySubscriptionApi({ navigate, t }));
    // Calling Organization Subscription Stats Graph Api
    dispatch(OrganizationSubscriptionTypeApi({ userData, navigate, t }));
    //Calling OrganizationsByActiveLicenseApi
    dispatch(OrganizationsByActiveLicenseApi({ data, navigate, t }));
    //Getting All Organizations
    dispatch(viewOrganizationLoader(true));
    dispatch(getAllOrganizationApi({ navigate, t }));

    setTrialBtn(true);
    setOrganizationStatus(true);
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

  //OrganizationStatsSubscription from Reducer
  useEffect(() => {
    try {
      if (
        OrganizationStatsSubscriptionReducer !== null &&
        OrganizationStatsSubscriptionReducer !== undefined
      ) {
        setOrganizationStatsLicense({
          totalOrganizations:
            OrganizationStatsSubscriptionReducer.result.totalOrganizations,
          totalNumberOfTrialOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfTrialOrganizations,
          totalNumberOfTrialOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfTrialOrganizationsPercentage,
          totalNumberOfExtendedTrialOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExtendedTrialOrganizations,
          totalNumberOfExtendedTrialOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExtendedTrialOrganizationsPercentage,
          totalNumberOfSubscribedOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfSubscribedOrganizations,
          totalNumberOfSubscribedOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfSubscribedOrganizationsPercentage,
          totalNumberOfExpiredSubscriptionOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredSubscriptionOrganizations,
          totalNumberOfExpiredSubscriptionOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredSubscriptionOrganizationsPercentage,
          totalNumberOfExpiredTrialSubscriptionOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredTrialSubscriptionOrganizations,
          totalNumberOfExpiredTrialSubscriptionOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredTrialSubscriptionOrganizationsPercentage,
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [OrganizationStatsSubscriptionReducer]);

  //OrganizationSubscriptionGraphTable Data in table to set Row of trial column
  useEffect(() => {
    try {
      if (
        OrganizationStatsTableDataReducer?.result.listOfTrial !== undefined &&
        OrganizationStatsTableDataReducer?.result.listOfTrial !== null
      ) {
        if (
          OrganizationStatsTableDataReducer?.result.listOfTrial.length > 0 &&
          OrganizationStatsTableDataReducer?.result.totalCount > 0
        ) {
          if (isScroll) {
            setIsScroll(false);
            //copy pf the rows of table
            let copyData = [...trialRow];
            OrganizationStatsTableDataReducer.result.listOfTrial.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setTrialRow(copyData);
            setSRowsData(
              (prev) =>
                prev +
                OrganizationStatsTableDataReducer.result.listOfTrial.length
            );
            setTotalRecords(
              OrganizationStatsTableDataReducer.result.totalCount
            );
          } else {
            setTrialRow(OrganizationStatsTableDataReducer.result.listOfTrial);
            setTotalRecords(
              OrganizationStatsTableDataReducer.result.totalCount
            );
            setSRowsData(
              OrganizationStatsTableDataReducer.result.listOfTrial.length
            );
          }
        } else {
          setTrialRow([]);
          setTotalRecords(0);
          setSRowsData(0);
        }
      }
    } catch {}
  }, [OrganizationStatsTableDataReducer]);

  //handle scroll function for lazy loading of Trial Table
  const handleScroll = async (e) => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let userData = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationSubscriptionTypeApi({ userData, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  //OrganizationSubscriptionGraphTable Data in table to set Row of trial Extended column
  useEffect(() => {
    try {
      if (
        OrganizationStatsTableDataReducer?.result.listOfExtendedTrail !==
          undefined &&
        OrganizationStatsTableDataReducer?.result.listOfExtendedTrail !== null
      ) {
        if (
          OrganizationStatsTableDataReducer?.result.listOfExtendedTrail.length >
            0 &&
          OrganizationStatsTableDataReducer?.result.totalCount > 0
        ) {
          if (isScrollTrialExtended) {
            setIsScrollTrialExtended(false);
            //copy pf the rows of table
            let copyData = [...trialExtendedRow];
            OrganizationStatsTableDataReducer?.result.listOfExtendedTrail.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setTrialExtendedRow(copyData);
            setSRowsDataTrialExtended(
              (prev) =>
                prev +
                OrganizationStatsTableDataReducer?.result.listOfExtendedTrail
                  .length
            );
            setTotalRecordsTrialExtended(
              OrganizationStatsTableDataReducer.result.totalCount
            );
          } else {
            setTrialExtendedRow(
              OrganizationStatsTableDataReducer.result.listOfExtendedTrail
            );
            setTotalRecordsTrialExtended(
              OrganizationStatsTableDataReducer.result.totalCount
            );
            setSRowsDataTrialExtended(
              OrganizationStatsTableDataReducer.result.listOfTrial.length
            );
          }
        } else {
          setTrialExtendedRow([]);
          setTotalRecordsTrialExtended(0);
          setSRowsDataTrialExtended(0);
        }
      }
    } catch {}
  }, [OrganizationStatsTableDataReducer]);

  //handle scroll function for lazy loading of Trial Extended Table
  const handleScrollTrialExtended = async (e) => {
    if (isRowsDataTrialExtended <= totalRecordsTrialExtended) {
      setIsScrollTrialExtended(true);
      let userData = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationSubscriptionTypeApi({ userData, navigate, t }));
    } else {
      setIsScrollTrialExtended(false);
    }
  };

  //OrganizationSubscriptionGraphTable Data in table to set Row of Subscribed column
  useEffect(() => {
    try {
      if (
        OrganizationStatsTableDataReducer?.result.listOfSubscribed !==
          undefined &&
        OrganizationStatsTableDataReducer?.result.listOfSubscribed !== null
      ) {
        if (
          OrganizationStatsTableDataReducer?.result.listOfSubscribed.length >
            0 &&
          OrganizationStatsTableDataReducer?.result.totalCount > 0
        ) {
          if (isScrollSubscribed) {
            setIsScrollSubscribed(false);
            //copy pf the rows of table
            let copyData = [...subscribedRow];
            OrganizationStatsTableDataReducer?.result.listOfSubscribed.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setSubscribedRow(copyData);
            setSRowsDataSubscribed(
              (prev) =>
                prev +
                OrganizationStatsTableDataReducer?.result.listOfSubscribed
                  .length
            );
            setTotalRecordsSubscribed(
              OrganizationStatsTableDataReducer?.result.totalCount
            );
          } else {
            setSubscribedRow(
              OrganizationStatsTableDataReducer?.result.listOfSubscribed
            );
            setTotalRecordsSubscribed(
              OrganizationStatsTableDataReducer.result.totalCount
            );
            setSRowsDataSubscribed(
              OrganizationStatsTableDataReducer?.result.listOfSubscribed.length
            );
          }
        } else {
          setSubscribedRow([]);
          setTotalRecordsSubscribed(0);
          setSRowsDataSubscribed(0);
        }
      }
    } catch {}
  }, [OrganizationStatsTableDataReducer]);

  //handle scroll function for lazy loading of Subscribed Table
  const handleScrollSubscribed = async (e) => {
    if (isRowsDataSubscribed <= totalRecordsSubscribed) {
      setIsScrollSubscribed(true);
      let userData = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationSubscriptionTypeApi({ userData, navigate, t }));
    } else {
      setIsScrollSubscribed(false);
    }
  };

  //OrganizationSubscriptionGraphTable Data in table to set Row of Expire Subscribed column
  useEffect(() => {
    try {
      if (
        OrganizationStatsTableDataReducer?.result.listOfExpiredSubscription !==
          undefined &&
        OrganizationStatsTableDataReducer?.result.listOfExpiredSubscription !==
          null
      ) {
        if (
          OrganizationStatsTableDataReducer?.result.listOfExpiredSubscription
            .length > 0 &&
          OrganizationStatsTableDataReducer?.result.totalCount > 0
        ) {
          if (isScrollSubscriptionExpiry) {
            setIsScrollSubscriptionExpiry(false);
            //copy pf the rows of table
            let copyData = [...subscriptionExpiredRow];
            OrganizationStatsTableDataReducer?.result.listOfExpiredSubscription.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setSubscriptionExpiredRow(copyData);
            setSRowsDataSubscriptionExpiry(
              (prev) =>
                prev +
                OrganizationStatsTableDataReducer?.result
                  .listOfExpiredSubscription.length
            );
            setTotalRecordsSubscriptionExpiry(
              OrganizationStatsTableDataReducer?.result.totalCount
            );
          } else {
            setSubscriptionExpiredRow(
              OrganizationStatsTableDataReducer?.result
                .listOfExpiredSubscription
            );
            setTotalRecordsSubscriptionExpiry(
              OrganizationStatsTableDataReducer?.result.totalCount
            );
            setSRowsDataSubscriptionExpiry(
              OrganizationStatsTableDataReducer?.result
                .listOfExpiredSubscription.length
            );
          }
        } else {
          setSubscriptionExpiredRow([]);
          setTotalRecordsSubscriptionExpiry(0);
          setSRowsDataSubscriptionExpiry(0);
        }
      }
    } catch {}
  }, [OrganizationStatsTableDataReducer]);

  //handle scroll function for lazy loading of Subscription Expiry Table
  const handleScrollSubscriptionExpiry = async (e) => {
    if (isRowsDataSubscriptionExpiry <= totalRecordsSubscriptionExpiry) {
      setIsScrollSubscriptionExpiry(true);
      let userData = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationSubscriptionTypeApi({ userData, navigate, t }));
    } else {
      setIsScrollSubscriptionExpiry(false);
    }
  };

  //OrganizationsByActiveLicenseApi Data in table to set Row data of Essential column
  useEffect(() => {
    try {
      if (
        OrganizationLicenseReducer?.result.listOfEssential !== undefined &&
        OrganizationLicenseReducer?.result.listOfEssential !== null
      ) {
        if (
          OrganizationLicenseReducer?.result.listOfEssential.length > 0 &&
          OrganizationLicenseReducer?.result.totalCount > 0
        ) {
          if (isScrollEssential) {
            setIsScrollEssential(false);
            //copy pf the rows of table
            let copyData = [...essentialRow];
            OrganizationLicenseReducer?.result.listOfEssential.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setEssentialRow(copyData);
            setSRowsDataEssential(
              (prev) =>
                prev + OrganizationLicenseReducer?.result.listOfEssential.length
            );
            setTotalRecordsEssential(
              OrganizationLicenseReducer?.result.totalCount
            );
          } else {
            setEssentialRow(OrganizationLicenseReducer?.result.listOfEssential);
            setTotalRecordsEssential(
              OrganizationLicenseReducer?.result.totalCount
            );
            setSRowsDataEssential(
              OrganizationLicenseReducer?.result.listOfEssential.length
            );
          }
        } else {
          setEssentialRow([]);
          setTotalRecordsEssential(0);
          setSRowsDataEssential(0);
        }
      }
    } catch {}
  }, [OrganizationLicenseReducer]);

  //handle scroll function for lazy loading of Essential Table (Users)
  const handleScrollEssential = async (e) => {
    if (isRowsDataEssential <= totalRecordsEssential) {
      setIsScrollEssential(true);
      let data = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationsByActiveLicenseApi({ data, navigate, t }));
    } else {
      setIsScrollEssential(false);
    }
  };

  //OrganizationsByActiveLicenseApi Data in table to set Row data of Professional column
  useEffect(() => {
    try {
      if (
        OrganizationLicenseReducer?.result.listOfProfessional !== undefined &&
        OrganizationLicenseReducer?.result.listOfProfessional !== null
      ) {
        if (
          OrganizationLicenseReducer?.result.listOfProfessional.length > 0 &&
          OrganizationLicenseReducer?.result.totalCount > 0
        ) {
          if (isScrollProfessional) {
            setIsScrollProfessional(false);
            //copy pf the rows of table
            let copyData = [...professionalRow];
            OrganizationLicenseReducer?.result.listOfProfessional.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setProfessionalRow(copyData);
            setSRowsDataProfessional(
              (prev) =>
                prev +
                OrganizationLicenseReducer?.result.listOfProfessional.length
            );
            setTotalRecordsProfessional(
              OrganizationLicenseReducer?.result.totalCount
            );
          } else {
            setProfessionalRow(
              OrganizationLicenseReducer?.result.listOfProfessional
            );
            setTotalRecordsEssential(
              OrganizationLicenseReducer?.result.totalCount
            );
            setSRowsDataEssential(
              OrganizationLicenseReducer?.result.listOfProfessional.length
            );
          }
        } else {
          setProfessionalRow([]);
          setTotalRecordsProfessional(0);
          setSRowsDataProfessional(0);
        }
      }
    } catch {}
  }, [OrganizationLicenseReducer]);

  //handle scroll function for lazy loading of Professional Table (Users)
  const handleScrollProfessional = async (e) => {
    if (isRowsDataProfessional <= totalRecordsProfessional) {
      setIsScrollProfessional(true);
      let data = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationsByActiveLicenseApi({ data, navigate, t }));
    } else {
      setIsScrollProfessional(false);
    }
  };

  //OrganizationsByActiveLicenseApi Data in table to set Row data of Premium column
  useEffect(() => {
    try {
      if (
        OrganizationLicenseReducer?.result.listOfPremium !== undefined &&
        OrganizationLicenseReducer?.result.listOfPremium !== null
      ) {
        if (
          OrganizationLicenseReducer?.result.listOfPremium.length > 0 &&
          OrganizationLicenseReducer?.result.totalCount > 0
        ) {
          if (isScrollProfessional) {
            setIsScrollProfessional(false);
            //copy pf the rows of table
            let copyData = [...premiumRow];
            OrganizationLicenseReducer?.result.listOfPremium.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setPremiumRow(copyData);
            setSRowsDataPremium(
              (prev) =>
                prev + OrganizationLicenseReducer?.result.listOfPremium.length
            );
            setTotalRecordsPremium(
              OrganizationLicenseReducer?.result.totalCount
            );
          } else {
            setPremiumRow(OrganizationLicenseReducer?.result.listOfPremium);
            setTotalRecordsPremium(
              OrganizationLicenseReducer?.result.totalCount
            );
            setSRowsDataPremium(
              OrganizationLicenseReducer?.result.listOfPremium.length
            );
          }
        } else {
          setPremiumRow([]);
          setTotalRecordsPremium(0);
          setSRowsDataPremium(0);
        }
      }
    } catch {}
  }, [OrganizationLicenseReducer]);

  //handle scroll function for lazy loading of Professional Table (Users)
  const handleScrollPremium = async (e) => {
    if (isRowsDataPremium <= totalRecordsPremium) {
      setIsScrollPremium(true);
      let data = {
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(OrganizationsByActiveLicenseApi({ data, navigate, t }));
    } else {
      setIsScrollPremium(false);
    }
  };

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
        FromDate: "",
        ToDate: "",
        PageNumber: 1,
        Length: 15,
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
    setTrialBtn(true);
  };

  const handleUsers = () => {
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setOrganizationStatus(false);
    setUsers(true);
    setessentialTbl(true);
  };

  const onClickExport = () => {
    let data = {
      OrganizationID: Number(organizationID),
      StartDate: "",
      StartEnd: "",
    };

    dispatch(globalAdminDashBoardLoader(true));
    dispatch(dashBoardReportApi({ data, navigate, t }));
  };

  const DashboardGlobalColumn = [
    {
      title: t("Billing-date"),
      dataIndex: "billingDate",
      className: "random",
      key: "billingDate",
      width: "190px",
      ellipses: true,
      render: (text, response) => {
        return (
          <>
            <span className={styles["dashboard-user-dates"]}>
              {convertUTCDateToLocalDate(text + "235958", currentLanguage)}
            </span>
          </>
        );
      },
    },
    {
      title: t("Amount-due"),
      className: "random",
      dataIndex: "amountDue",
      key: "amountDue",
      width: "190px",
      render: (text, response) => {
        const formattedText = formatSessionDurationArabicAndEng(
          text,
          currentLanguage
        );
        const amountWithDollar = `${formattedText}$`;
        return (
          <>
            <span className={styles["dashboard-table-insidetext"]}>
              {amountWithDollar}
            </span>
          </>
        );
      },
    },
    {
      title: t("Month"),
      className: "random",
      key: "billingMonth",
      dataIndex: "billingMonth",
      width: "80px",
      render: (text, response) => (
        <span className={styles["dashboard-table-insidetext"]}>{text}</span>
      ),
    },
    {
      title: (
        <span
          className={styles["Export_To_Excel_dashboardTableButton"]}
          onClick={onClickExport}
        >
          <img src={ExcelIcon} alt="" draggable="false" />
          <span>{t("Export")}</span>
        </span>
      ),
      key: "billingMonth",
      className: "random",
      dataIndex: "billingMonth",
      width: "120px",
      render: (text, record) => (
        <span className={styles["dashboard-table-insidetext"]}>
          <Button
            text={t("Send-invoice")}
            onClick={() => openSendInvoiceModal(record)}
            className={styles["send-invoice-button"]}
          />
        </span>
      ),
    },
  ];

  // google chart
  // for organization Chart
  const exData = [
    ["Task", "Hours per Day"],
    [
      `Trial (${formatSessionDurationArabicAndEng(
        organizationStatsLicense.totalNumberOfTrialOrganizations,
        currentLanguage
      )})`,
      organizationStatsLicense.totalNumberOfTrialOrganizations,
    ],
    [
      `Trial Extended (${formatSessionDurationArabicAndEng(
        organizationStatsLicense.totalNumberOfExtendedTrialOrganizations,
        currentLanguage
      )})`,
      organizationStatsLicense.totalNumberOfExtendedTrialOrganizations,
    ],
    [
      `Subscribed (${formatSessionDurationArabicAndEng(
        organizationStatsLicense.totalNumberOfSubscribedOrganizations,
        currentLanguage
      )})`,
      organizationStatsLicense.totalNumberOfSubscribedOrganizations,
    ],
    [
      `Subscribed (${formatSessionDurationArabicAndEng(
        organizationStatsLicense.totalNumberOfExpiredSubscriptionOrganizations,
        currentLanguage
      )})`,
      organizationStatsLicense.totalNumberOfExpiredSubscriptionOrganizations,
    ],
  ];

  const options = {
    pieHole: 0.5,
    is3D: false,
    colors: ["#81DB86", "#D8A709", "#6172D6", "#F16B6B"],
    chartArea: {
      width: "90%", // Adjust the width of the chart area
      height: "90%", // Adjust the height of the chart area
    },
    direction: currentLanguage === "ar" ? "rtl" : "ltr",
    legend: {
      alignment: "center",
    },
    // pieSliceText: formatSessionDurationArabicAndEng("value", currentLanguage), // Display the values inside the slices
    // pieSliceTextStyle: {
    //   color: "#5A5A5A",
    //   bold: true,
    //   fontSize: 16,
    // },
    tooltip: { trigger: "none" },
  };

  // google chart
  // for User Chart

  const userData = [
    ["Task", "Hours per Day"],
    [
      `Essential (${formatSessionDurationArabicAndEng(
        activelicenses.totalNumberOfEssentialLicense,
        currentLanguage
      )})`,
      activelicenses.totalNumberOfEssentialLicense,
    ],
    [
      `Professional (${formatSessionDurationArabicAndEng(
        activelicenses.totalNumberOfProfessionalLicense,
        currentLanguage
      )})`,
      activelicenses.totalNumberOfProfessionalLicense,
    ],
    [
      `Premium (${formatSessionDurationArabicAndEng(
        activelicenses.totalNumberOfProfessionalLicense,
        currentLanguage
      )})`,
      activelicenses.totalNumberOfPremiumLicense,
    ],
  ];

  const totalNumber =
    activelicenses.totalNumberOfEssentialLicense +
    activelicenses.totalNumberOfProfessionalLicense +
    activelicenses.totalNumberOfProfessionalLicense;

  const userOptions = {
    pieHole: 0.5,
    is3D: false,
    colors: ["#81DB86", "#D8A709", "#6172D6", "#F16B6B"],
    chartArea: {
      width: "90%", // Adjust the width of the chart area
      height: "90%", // Adjust the height of the chart area
    },
    direction: currentLanguage === "ar" ? "rtl" : "ltr",
    legend: {
      alignment: "center",
    },
    // pieSliceText: formatSessionDurationArabicAndEng("value", currentLanguage), // Display the values inside the slices
    // pieSliceTextStyle: {
    //   color: "#5A5A5A",
    //   bold: true,
    //   fontSize: 16,
    // },
    tooltip: { trigger: "none" },
  };

  const TrialColumn = [
    {
      title: t("Organization-name"),
      className: "random",
      dataIndex: "organizationName",
      key: "organizationName",
      width: "100px",
      align: "center",
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.organizationName.localeCompare(b.organizationName),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Trial-start-date"),
      dataIndex: "subscriptionStartDate",
      className: "random",
      key: "subscriptionStartDate",
      width: "110px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate.localeCompare(b.subscriptionStartDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Trial-end-date"),
      dataIndex: "subscriptionEndDate",
      className: "random",
      key: "subscriptionEndDate",
      width: "100px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionEndDate.localeCompare(b.subscriptionEndDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Remaining-days"),
      className: "random",
      dataIndex: "TrialEndDate",
      key: "TrialEndDate",
      width: "100px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.TrialEndDate.localeCompare(b.TrialEndDate),
    },
  ];

  const TraiExtendedColumn = [
    {
      title: t("Trial-extended-date"),
      className: "random",
      dataIndex: "Name",
      key: "Name",
      width: "140px",
      align: "center",
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: t("Trial-extended-date"),
      className: "random",
      dataIndex: "TrialExtendedDate",
      key: "TrialExtendedDate",
      width: "140px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.TrialExtendedDate.localeCompare(b.TrialExtendedDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Trial-extended-end-date"),
      dataIndex: "TrialExtendedEndDate",
      className: "random",
      key: "TrialExtendedEndDate",
      width: "170px",
      align: "center",
      ellipsis: true,
      align: "center",
      sorter: (a, b) =>
        a.TrialExtendedEndDate.localeCompare(b.TrialExtendedEndDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Remaining-days"),
      className: "random",
      dataIndex: "remaingDate",
      key: "remaingDate",
      width: "160px",
      align: "center",
      ellipsis: true,
      align: "center",
      sorter: (a, b) => a.remaingDate.localeCompare(b.remaingDate),
    },
  ];

  const subscriptionColumn = [
    {
      title: t("Organization-name"),
      className: "random",
      dataIndex: "Name",
      key: "Name",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    // {
    //   title: t("ExpiryDate"),
    //   dataIndex: "ExpiryDate",
    //   key: "ExpiryDate",
    //   width: "135px",
    // },
    {
      title: t("Expiration-date"),
      dataIndex: "ExpiryDate",
      className: "random",
      key: "ExpiryDate",
      width: "300px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.ExpiryDate.localeCompare(b.ExpiryDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Remaining-days"),
      dataIndex: "remaingDate",
      className: "random",
      key: "remaingDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.remaingDate.localeCompare(b.remaingDate),
    },
  ];

  const subscriptionExpiry = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      className: "random",
      key: "organizationName",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: t("Trial-start-date"),
      dataIndex: "subscriptionStartDate",
      className: "random",
      key: "subscriptionStartDate",
      width: "110px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate.localeCompare(b.subscriptionStartDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Trial-end-date"),
      className: "random",
      dataIndex: "subscriptionEndDate",
      key: "subscriptionEndDate",
      width: "100px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionEndDate.localeCompare(b.subscriptionEndDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
  ];

  const essentialColumns = [
    {
      title: t("Organization-name"),
      className: "random",
      dataIndex: "organizationName",
      key: "organizationName",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.organizationName.localeCompare(b.organizationName),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Start-date"),
      className: "random",
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate.localeCompare(b.subscriptionStartDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Name"),
      className: "random",
      dataIndex: "name",
      key: "name",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-table-insidetext"]}>{text}</span>
          </>
        );
      },
    },

    // {
    //   title: t("End-date"),
    //   dataIndex: "subscriptionEndDate",
    //   key: "subscriptionEndDate",
    //   width: "130px",
    //   align: "center",
    //   render: (text, record) => {
    //     // const formattedDate = convertUTCDateToLocalDateDiffFormat(text);

    //     return (
    //       <div className={styles["dashboard-user-dates"]}>
    //         {convertUTCDateToLocalDate(text + "235958", currentLanguage)}
    //       </div>
    //     );
    //   },
    // },
  ];

  const ProfessionalColumns = [
    {
      title: t("Organization-name"),
      className: "random",
      dataIndex: "OrganizationName",
      key: "OrganizationName",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.organizationName.localeCompare(b.organizationName),
    },
    {
      title: t("Start-date"),
      className: "random",
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate.localeCompare(b.subscriptionStartDate),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Name"),
      dataIndex: "Name",
      className: "random",
      key: "Name",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },

    // {
    //   title: t("End-date"),
    //   dataIndex: "subscriptionEndDate",
    //   key: "subscriptionEndDate",
    //   width: "115px",
    //   render: (text, record) => {
    //     const formattedDate = convertUTCDateToLocalDateDiffFormat(text);

    //     return (
    //       <div className={styles["dashboard-user-dates"]}>{formattedDate}</div>
    //     );
    //   },
    // },
  ];

  const PreimiumColumns = [
    {
      title: t("Organization-name"),
      className: "random",
      dataIndex: "organizationName",
      key: "organizationName",
      width: "200px",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.organizationName.localeCompare(b.organizationName),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: t("Start-date"),
      className: "random",
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      width: "200px",
      align: "center",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("Name"),
      className: "random",
      dataIndex: "Name",
      key: "Name",
      width: "200px",
      align: "center",
      ellipsis: true,
    },

    // {
    //   title: t("End-date"),
    //   dataIndex: "subscriptionEndDate",
    //   key: "subscriptionEndDate",
    //   width: "115px",
    //   render: (text, record) => {
    //     const formattedDate = convertUTCDateToLocalDateDiffFormat(text);

    //     return (
    //       <div className={styles["dashboard-user-dates"]}>{formattedDate}</div>
    //     );
    //   },
    // },
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

  useEffect(() => {
    if (users === true) {
      setessentialTbl(true);
    } else if (organizationStatus === true) {
      setTrialBtn(true);
    }
  }, []);

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

  const openSendInvoiceModal = (record) => {
    dispatch(dashboardSendInvoiceOpenModal(true));
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
                    >
                      <span className={styles["MonthName"]}>{t("Month")}</span>
                      <span className={isOpen ? styles.down : styles.up}></span>
                    </div>
                    {isOpen && (
                      <>
                        <Calendar
                          numberOfMonths={2}
                          style={{ position: "absolute", zIndex: 1000 }}
                        />
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
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center flex-column flex-wrap align-items-center"
                >
                  <span className={styles["PrizeStyles"]}>
                    {formatSessionDurationArabicAndEng(
                      totalDue,
                      currentLanguage
                    )}
                    $
                  </span>
                  <span className={styles["PrizeSubHeading"]}>
                    {selectedCompany}
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Table
                    column={DashboardGlobalColumn}
                    pagination={false}
                    rows={billDueTable}
                    scroll={{
                      x: false,
                    }}
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
                    {/* <Pie {...config} /> */}
                    <Chart
                      chartType="PieChart"
                      height={"200px"}
                      width={"250px"}
                      data={exData}
                      options={options}
                    />
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
                    {/* <Pie {...configSecond} /> */}
                    <Chart
                      chartType="PieChart"
                      height={"200px"}
                      width={"250px"}
                      data={userData}
                      options={userOptions}
                    />
                  </section>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={10} md={10} sm={12} className="d-flex gap-2">
                  {organizationStatus ? (
                    <>
                      <Button
                        text={t("Trial")}
                        className={
                          trialExtended === false &&
                          subscription === false &&
                          subsExpiry === false &&
                          organizationStatus
                            ? styles["activeEssentialButton"]
                            : styles["ButtonsDashboard"]
                        }
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
                        className={
                          professionalTbl === false &&
                          premiumTbl === false &&
                          users
                            ? styles["activeEssentialButton"]
                            : styles["ButtonsDashboard"]
                        }
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

                <Col lg={2} md={2} sm={12}>
                  {users === true || organizationStatus === true ? (
                    <>
                      <Button
                        text={t("Export")}
                        className={styles["ExportBUtton"]}
                        icon={
                          <>
                            <img src={ExcelIcon} alt="" draggable="false" />
                          </>
                        }
                      />
                    </>
                  ) : // <span className={styles["Export_To_Excel_dashboard"]}>
                  //
                  //   <span>{t("Export")}</span>
                  // </span>
                  null}
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
                  <>
                    <InfiniteScroll
                      dataLength={trialRow.length}
                      next={handleScroll}
                      height={"25vh"}
                      hasMore={trialRow.length === totalRecords ? false : true}
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
                    >
                      <Table
                        column={TrialColumn}
                        pagination={false}
                        rows={trialRow}
                        footer={false}
                        className="TrialTableDashboard"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : trialExtended ? (
                  <>
                    <InfiniteScroll
                      dataLength={trialExtendedRow.length}
                      next={handleScrollTrialExtended}
                      height={"25vh"}
                      hasMore={
                        trialExtendedRow.length === totalRecordsTrialExtended
                          ? false
                          : true
                      }
                      loader={
                        isRowsDataTrialExtended <= totalRecordsTrialExtended &&
                        isScrollTrialExtended ? (
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
                    >
                      <Table
                        column={TraiExtendedColumn}
                        pagination={false}
                        rows={trialExtendedRow}
                        footer={false}
                        className="TrialExtendedDashboard"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : subscription ? (
                  <>
                    <InfiniteScroll
                      dataLength={subscribedRow.length}
                      next={handleScrollSubscribed}
                      height={"25vh"}
                      hasMore={
                        subscribedRow.length === totalRecordsSubscribed
                          ? false
                          : true
                      }
                      loader={
                        isRowsDataSubscribed <= totalRecordsSubscribed &&
                        isScrollSubscribed ? (
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
                    >
                      <Table
                        column={subscriptionColumn}
                        pagination={false}
                        rows={subscribedRow}
                        footer={false}
                        className="TrialTableDashboard"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : subsExpiry ? (
                  <>
                    <InfiniteScroll
                      dataLength={subscriptionExpiredRow.length}
                      next={handleScrollSubscriptionExpiry}
                      height={"25vh"}
                      hasMore={
                        subscriptionExpiredRow.length ===
                        totalRecordsSubscriptionExpiry
                          ? false
                          : true
                      }
                      loader={
                        isRowsDataSubscriptionExpiry <=
                          totalRecordsSubscriptionExpiry &&
                        isScrollSubscriptionExpiry ? (
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
                    >
                      <Table
                        column={subscriptionExpiry}
                        pagination={false}
                        rows={subscriptionExpiredRow}
                        footer={false}
                        className="TrialExtendedDashboard"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : essentialTbl ? (
                  <>
                    <InfiniteScroll
                      dataLength={essentialRow.length}
                      next={handleScrollEssential}
                      height={"25vh"}
                      hasMore={
                        essentialRow.length === totalRecordsEssential
                          ? false
                          : true
                      }
                      loader={
                        isRowsDataEssential <= totalRecordsEssential &&
                        isScrollEssential ? (
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
                    >
                      <Table
                        column={essentialColumns}
                        pagination={false}
                        rows={essentialRow}
                        footer={false}
                        className="EssentialTable"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : professionalTbl ? (
                  <>
                    <InfiniteScroll
                      dataLength={professionalRow.length}
                      next={handleScrollProfessional}
                      height={"25vh"}
                      hasMore={
                        professionalRow.length === totalRecordsProfessional
                          ? false
                          : true
                      }
                      loader={
                        isRowsDataProfessional <= totalRecordsProfessional &&
                        isScrollProfessional ? (
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
                    >
                      <Table
                        column={ProfessionalColumns}
                        pagination={false}
                        rows={professionalRow}
                        footer={false}
                        className="EssentialTable"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : premiumTbl ? (
                  <>
                    <InfiniteScroll
                      dataLength={premiumRow.length}
                      next={handleScrollPremium}
                      height={"25vh"}
                      hasMore={
                        premiumRow.length === totalRecordsPremium ? false : true
                      }
                      loader={
                        isRowsDataPremium <= totalRecordsPremium &&
                        isScrollPremium ? (
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
                    >
                      <Table
                        column={PreimiumColumns}
                        pagination={false}
                        rows={premiumRow}
                        footer={false}
                        className="EssentialTable"
                        locale={{
                          emptyText: (
                            <>
                              <section className="d-flex flex-column align-items-center justify-content-center ">
                                <img
                                  src={NoOrganizationIcon}
                                  width={"45px"}
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
                    </InfiniteScroll>
                  </>
                ) : null}
                <Col lg={12} md={12} sm={12}></Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>

      <SendInvoiceModal />
    </>
  );
};

export default GlobalAdminDashboard;
