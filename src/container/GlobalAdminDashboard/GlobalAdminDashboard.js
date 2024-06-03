import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import Search_Icon from "../../assets/images/OutletImages/Search_Icon.png";
import BillingDue from "../../assets/images/OutletImages/BillingDue.png";
import NoOrganizationIcon from "../../assets/images/OutletImages/No_Organization.png";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ExcelIcon from "../../assets/images/OutletImages/Excel-Icon.png";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { Button, Table, TextField } from "../../components/elements";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { Chart } from "react-google-charts";
import { Calendar, DateObject } from "react-multi-date-picker";
import {
  OrganizationsByActiveLicenseApi,
  StatsOfActiveLicenseApi,
  GetAllBillingDueApi,
  TotalThisMonthDueApi,
  organziationStatsBySubscriptionApi,
  dashBoardReportApi,
  OrganizationSubscriptionTypeApi,
  SendInvoiceApi,
  getListTrialSubscription,
  getListOfExtendedTrailSubscriptions,
  getListOfSubscribedSubscriptions,
  getListOfExpiredSubscriptions,
  trialSubscribeReportApi,
  trialExtendedReportApi,
  trialSubscribeExpiredReportApi,
} from "../../store/Actions/GlobalAdminDashboardActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationApi } from "../../store/Actions/ViewOrganizationActions";
import {
  convertUTCDateToLocalDate,
  formatDate,
  formatSessionDurationArabicAndEng,
} from "../../common/functions/dateFormatters";
import SendInvoiceModal from "./PackageDetailModal/PackageDetailModal";
import {
  dashboardSendInvoiceOpenModal,
  subscriptionRenewOpenModal,
  trialRenewOpenModal,
} from "../../store/ActionsSlicers/UIModalsActions";
import TrialRenewModal from "./TrialRenewModal/TrialRenewModal";
import SubscriptionRenewModal from "./SubscriptionRenewModal/SubscriptionRenewModal";
import PackageDetailModal from "./PackageDetailModal/PackageDetailModal";

const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const MonthsRef = useRef();

  const CompanyRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  //Reducer for listOfTrialSubscription to Show in trial table
  const listOfTrialSubscription = useSelector(
    (state) => state.globalAdminDashboardReducer.listOfTrialSubscription
  );

  //Reducer for listOfTrialExtendedSubscription to Show in trial Extended table
  const listOfTrialExtendedSubscription = useSelector(
    (state) => state.globalAdminDashboardReducer.listOfTrialExtendedSubscription
  );

  //Reducer for listofTrialSubscribeSubscription to Show in Subscribed Subscription table
  const listofTrialSubscribeSubscription = useSelector(
    (state) =>
      state.globalAdminDashboardReducer.listofTrialSubscribeSubscription
  );

  //Reducer for listOfExpiredSubscriptions to Show in Expired Subscription table
  const listOfExpiredSubscriptions = useSelector(
    (state) => state.globalAdminDashboardReducer.listOfExpiredSubscriptions
  );

  console.log(listofTrialSubscribeSubscription, "listofTriallistofTrial");

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [showSearchedDate, setShowSearchedDate] = useState(false);
  const dropdownRef = useRef(null);
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
  const [searchTerm, setSearchTerm] = useState("");
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

  //MultiDate Picker states
  const [currentMonth, setCurrentMonth] = useState(new DateObject().month);
  const [selectingStart, setSelectingStart] = useState(true);
  const currentDate = new Date(); // Creates a new date object representing now
  const newDate = new DateObject(currentDate); // Assumes DateObject takes a Date
  const formattedCurrentDate = newDate.format("YYYYMMDD") + "000000";
  const [startDate, setStartDate] = useState(formattedCurrentDate);
  const [endDate, setEndDate] = useState(null);

  //send trial renew data in modal state
  const [trialRenewOrganizationId, setTrialRenewOrganizationId] = useState(0);
  const [trialRenewOrganizationName, setTrialRenewOrganizationName] =
    useState("");
  const [trialRenewRemainingDays, setTrialRenewRemainingDays] = useState(0);

  //Clicking outside closing Calender
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenCalender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect for listOfTrialSubscription Trial Tab
  useEffect(() => {
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(getListTrialSubscription({ data, navigate, t }));
  }, []);

  // useEffect for ListOfExtendedTrailSubscriptions Trial Extended Tab
  useEffect(() => {
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(getListOfExtendedTrailSubscriptions({ data, navigate, t }));
  }, []);

  // useEffect for getListOfSubscribedSubscriptions for Subscribed Tab
  useEffect(() => {
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(getListOfSubscribedSubscriptions({ data, navigate, t }));
  }, []);

  // useEffect for getListOfExpiredSubscriptions Subscribed Expired Tab
  useEffect(() => {
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(getListOfExpiredSubscriptions({ data, navigate, t }));
  }, []);

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
    return () => {
      setSelectingStart(true);
      setShowSearchedDate(false);
      setIsOpen(true);
    };
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

  //listOfTrialSubscription Data in table to set Row of trial column
  useEffect(() => {
    try {
      if (
        listOfTrialSubscription?.result.listOfTrial !== undefined &&
        listOfTrialSubscription?.result.listOfTrial !== null
      ) {
        if (
          listOfTrialSubscription?.result.listOfTrial.length > 0 &&
          listOfTrialSubscription?.result.totalCount > 0
        ) {
          if (isScroll) {
            setIsScroll(false);
            //copy pf the rows of table
            let copyData = [...trialRow];
            listOfTrialSubscription.result.listOfTrial.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setTrialRow(copyData);
            setSRowsData(
              (prev) => prev + listOfTrialSubscription.result.listOfTrial.length
            );
            setTotalRecords(listOfTrialSubscription.result.totalCount);
          } else {
            setTrialRow(listOfTrialSubscription.result.listOfTrial);
            setTotalRecords(listOfTrialSubscription.result.totalCount);
            setSRowsData(listOfTrialSubscription.result.listOfTrial.length);
          }
        } else {
          setTrialRow([]);
          setTotalRecords(0);
          setSRowsData(0);
        }
      }
    } catch {}
  }, [listOfTrialSubscription]);

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

  //listOfTrialExtendedSubscription Data in table to set Row of trial Extended column
  useEffect(() => {
    try {
      if (
        listOfTrialExtendedSubscription?.result.listOfExtendedTrail !==
          undefined &&
        listOfTrialExtendedSubscription?.result.listOfExtendedTrail !== null
      ) {
        if (
          listOfTrialExtendedSubscription?.result.listOfExtendedTrail.length >
            0 &&
          listOfTrialExtendedSubscription?.result.totalCount > 0
        ) {
          if (isScrollTrialExtended) {
            setIsScrollTrialExtended(false);
            //copy pf the rows of table
            let copyData = [...trialExtendedRow];
            listOfTrialExtendedSubscription?.result.listOfExtendedTrail.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setTrialExtendedRow(copyData);
            setSRowsDataTrialExtended(
              (prev) =>
                prev +
                listOfTrialExtendedSubscription?.result.listOfExtendedTrail
                  .length
            );
            setTotalRecordsTrialExtended(
              listOfTrialExtendedSubscription.result.totalCount
            );
          } else {
            setTrialExtendedRow(
              listOfTrialExtendedSubscription.result.listOfExtendedTrail
            );
            setTotalRecordsTrialExtended(
              listOfTrialExtendedSubscription.result.totalCount
            );
            setSRowsDataTrialExtended(
              listOfTrialExtendedSubscription.result.listOfExtendedTrail.length
            );
          }
        } else {
          setTrialExtendedRow([]);
          setTotalRecordsTrialExtended(0);
          setSRowsDataTrialExtended(0);
        }
      }
    } catch {}
  }, [listOfTrialExtendedSubscription]);

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
        listofTrialSubscribeSubscription?.result.listOfSubscribed !==
          undefined &&
        listofTrialSubscribeSubscription?.result.listOfSubscribed !== null
      ) {
        if (
          listofTrialSubscribeSubscription?.result.listOfSubscribed.length >
            0 &&
          listofTrialSubscribeSubscription?.result.totalCount > 0
        ) {
          if (isScrollSubscribed) {
            setIsScrollSubscribed(false);
            //copy pf the rows of table
            let copyData = [...subscribedRow];
            listofTrialSubscribeSubscription?.result.listOfSubscribed.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setSubscribedRow(copyData);
            setSRowsDataSubscribed(
              (prev) =>
                prev +
                listofTrialSubscribeSubscription?.result.listOfSubscribed.length
            );
            setTotalRecordsSubscribed(
              listofTrialSubscribeSubscription?.result.totalCount
            );
          } else {
            setSubscribedRow(
              listofTrialSubscribeSubscription?.result.listOfSubscribed
            );
            setTotalRecordsSubscribed(
              listofTrialSubscribeSubscription.result.totalCount
            );
            setSRowsDataSubscribed(
              listofTrialSubscribeSubscription?.result.listOfSubscribed.length
            );
          }
        } else {
          setSubscribedRow([]);
          setTotalRecordsSubscribed(0);
          setSRowsDataSubscribed(0);
        }
      }
    } catch {}
  }, [listofTrialSubscribeSubscription]);

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
        listOfExpiredSubscriptions?.result.listOfExpiredSubscription !==
          undefined &&
        listOfExpiredSubscriptions?.result.listOfExpiredSubscription !== null
      ) {
        if (
          listOfExpiredSubscriptions?.result.listOfExpiredSubscription.length >
            0 &&
          listOfExpiredSubscriptions?.result.totalCount > 0
        ) {
          if (isScrollSubscriptionExpiry) {
            setIsScrollSubscriptionExpiry(false);
            //copy pf the rows of table
            let copyData = [...subscriptionExpiredRow];
            listOfExpiredSubscriptions?.result.listOfExpiredSubscription.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setSubscriptionExpiredRow(copyData);
            setSRowsDataSubscriptionExpiry(
              (prev) =>
                prev +
                listOfExpiredSubscriptions?.result.listOfExpiredSubscription
                  .length
            );
            setTotalRecordsSubscriptionExpiry(
              listOfExpiredSubscriptions?.result.totalCount
            );
          } else {
            setSubscriptionExpiredRow(
              listOfExpiredSubscriptions?.result.listOfExpiredSubscription
            );
            setTotalRecordsSubscriptionExpiry(
              listOfExpiredSubscriptions?.result.totalCount
            );
            setSRowsDataSubscriptionExpiry(
              listOfExpiredSubscriptions?.result.listOfExpiredSubscription
                .length
            );
          }
        } else {
          setSubscriptionExpiredRow([]);
          setTotalRecordsSubscriptionExpiry(0);
          setSRowsDataSubscriptionExpiry(0);
        }
      }
    } catch {}
  }, [listOfExpiredSubscriptions]);

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
        // OrganizationID: Number(organziations[0].organizationID),
        // FromDate: startDate,
        // ToDate: endDate ? endDate : "",
        // PageNumber: 1,
        // Length: 15,
        OrganizationID: 0,
        FromDate: "20230308000000",
        ToDate: "20230408000000",
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
    document.addEventListener("click", HandleOutSideClickCompany);
    return () => {
      document.removeEventListener("click", HandleOutSideClickCompany);
    };
  }, [isCompnayOpen]);

  const toggling = () => setIsOpenCalender(!isOpenCalender);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setIsCompnayOpen(true);
  };

  // to filters organization company from dropdown
  const filteredOrganizations = organziations.filter((org) =>
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      ellipses: true,
      align: "center",
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
      align: "center",
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
      title: t("Organization-name"),
      className: "random",
      key: "billingMonth",
      dataIndex: "billingMonth",
      align: "center",
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
      width: "100px",
      align: "center",
      render: (text, record) => (
        <span className={styles["dashboard-table-insidetext"]}>
          <Button
            text={t("Send-invoice")}
            // onClick={() => openSendInvoiceModal(record)}
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
    tooltip: { trigger: "none" },
  };

  // to open renew modal
  const onClickRenew = (record) => {
    dispatch(trialRenewOpenModal(true));
    setTrialRenewOrganizationId(record.organizationId);
    setTrialRenewOrganizationName(record.organizationName);
    setTrialRenewRemainingDays(record.remainingDays);
  };

  // to open Subscription Renew Modal
  const onClickSubscriptionRenew = () => {
    dispatch(subscriptionRenewOpenModal(true));
  };

  const TrialColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
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
      key: "subscriptionStartDate",
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
      key: "subscriptionEndDate",
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
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      // sorter: (a, b) => a.TrialEndDate.localeCompare(b.TrialEndDate),
      render: (text, record) => {
        console.log(record, "recorddssstextttt");
        return (
          <>
            {record.remainingDays <= 7 ? (
              <>
                <Button
                  text={t("Renew")}
                  className={styles["send-invoice-button"]}
                  onClick={() => onClickRenew(record)}
                />
              </>
            ) : (
              <div className={styles["dashboard-user-dates"]}>
                {text} {"Days"}
              </div>
            )}
          </>
        );
      },
    },
  ];

  const TraiExtendedColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "start",
      ellipsis: true,
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.Name.localeCompare(b.Name),
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
      // className: "random",
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
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
      key: "subscriptionEndDate",
      align: "center",
      ellipsis: true,
      align: "center",
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
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      // sorter: (a, b) => a.remainingDays.localeCompare(b.remainingDays),
      render: (text, record) => {
        return (
          <>
            <div className={styles["dashboard-user-dates"]}>{text}</div>
            {/* <Button
              text={t("Renew")}
              className={styles["send-invoice-button"]}
              onClick={onClickSubscriptionRenew}
            /> */}
          </>
        );
      },
    },
  ];

  const subscriptionColumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
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
      title: "",
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      align: "right",
      render: (text, record) => {
        return (
          <>
            <Button
              text={t("Package-details")}
              className={styles["send-invoice-button"]}
              onClick={() => openSendInvoiceModal(record)}
            />
          </>
        );
      },
    },
    {
      title: t("Expiration-date"),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
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
      title: t("Remaining-days"),
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      // sorter: (a, b) => a.remainingDays.localeCompare(b.remainingDays),
      render: (text, record) => {
        return (
          <>
            <div className={styles["dashboard-user-dates"]}>
              {text} {"Days"}
            </div>
            {/* <Button
              text={t("Renew")}
              className={styles["send-invoice-button"]}
              onClick={onClickSubscriptionRenew}
            /> */}
          </>
        );
      },
    },
  ];

  const subscriptionExpiry = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
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
    {
      title: "",
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Button
              text={t("Package-details")}
              className={styles["send-invoice-button"]}
              // onClick={() => openSendInvoiceModal(record)}
            />
          </>
        );
      },
    },
    {
      title: t("Trial-end-date"),
      dataIndex: "subscriptionEndDate",
      key: "subscriptionEndDate",
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
      align: "start",
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
      dataIndex: "organizationName",
      key: "organizationName",
      width: "200px",
      align: "start",
      ellipsis: true,
      sorter: (a, b) => a.organizationName.localeCompare(b.organizationName),
      render: (text, record) => {
        return <span className={styles["dashboard-tabletext"]}>{text}</span>;
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
      align: "start",
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
    // let data = {
    //   OrganizationID: Number(record.organizationID),
    //   InvoiceID: Number(record.invoiceID),
    //   SubscriptionID: Number(record.fK_OSID),
    // };
    // dispatch(globalAdminDashBoardLoader(true));
    // dispatch(SendInvoiceApi({ data, navigate, t }));
  };

  //Multi Date Picker Date Pickers Month Function
  const handleMonthChange = (newMonth) => {
    console.log(newMonth, "newMonthnewMonthnewMonth");
    setCurrentMonth(newMonth);
  };

  //Multi Date Picker Date Pickers Date Function
  const handleDateChange = (date) => {
    let newDate = new DateObject(date);
    let formattedDate = newDate.format("YYYYMMDD") + "000000";

    // Check if we're setting the endDate
    if (!selectingStart) {
      // Compare if the selected endDate is before the startDate
      if (new Date(formattedDate) < new Date(startDate)) {
        console.log("End Date is before Start Date, swapping dates");
        setEndDate(startDate);
        setStartDate(formattedDate);
        return;
      }
    }

    if (selectingStart) {
      console.log("Setting startDate");
      setStartDate(formattedDate);
      setSelectingStart(false);
    } else {
      console.log("Setting endDate");
      setEndDate(formattedDate);
      setSelectingStart(true);

      let data = {
        OrganizationID: Number(organziations[0].organizationID),
        FromDate: startDate,
        ToDate: formattedDate,
        PageNumber: 1,
        Length: 15,
      };

      if (startDate && formattedDate) {
        setIsOpen(false);
        setIsOpenCalender(false);
        setShowSearchedDate(true);
        dispatch(globalAdminDashBoardLoader(true));
        dispatch(GetAllBillingDueApi({ data, navigate, t }));
      }
    }
  };

  const handleCrossIcon = () => {
    setShowSearchedDate(false);
    setIsOpen(true);
  };

  // for Download Trial  Subscription Report
  const downloadSubscriptionReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(trialSubscribeReportApi({ data, navigate, t }));
  };

  //for Download Trial extended Report
  const downloadTrialExtendedReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(trialExtendedReportApi({ data, navigate, t }));
  };

  //for Download Trial Expired SUbscription Report
  const downloadTrialExpireSubscriptionReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(trialSubscribeExpiredReportApi({ data, navigate, t }));
  };

  return (
    <>
      <Container fluid className={styles["global-admin-dashboard-container"]}>
        <Row className="mt-3">
          <Col lg={5} md={5} sm={5}>
            <section className={styles["LeftBoxDashboard"]}>
              <Row>
                <Col lg={5} md={5} sm={5}>
                  <span className={styles["BillingDueHeading"]}>
                    {t("Billing-due")}
                  </span>
                </Col>
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                  className="d-flex justify-content-end"
                >
                  <div
                    ref={dropdownRef}
                    className={styles["dropdown-container"]}
                  >
                    <div
                      className={styles["dropdown-header"]}
                      onClick={toggling}
                    >
                      {isOpen ? (
                        <>
                          <span className={styles["MonthName"]}>
                            {t("Month")}
                          </span>
                          <span
                            className={isOpen ? styles.down : styles.up}
                          ></span>
                        </>
                      ) : null}
                    </div>
                    {isOpenCalender ? (
                      <>
                        <Calendar
                          numberOfMonths={2}
                          style={{ position: "absolute", zIndex: 1000 }}
                          onFocusedDateChange={handleDateChange}
                          onMonthChange={handleMonthChange}
                          multiple
                          format="YYYY-MM-DD"
                        />
                      </>
                    ) : null}
                    {showSearchedDate ? (
                      <>
                        <div className={styles["SearchDataes"]}>
                          <span className={styles["Searches"]}>
                            {formatDate(startDate, currentLanguage)}-
                            {formatDate(endDate, currentLanguage)}
                          </span>
                          <img
                            src={Crossicon}
                            alt=""
                            className={styles["CrossIcon_Class"]}
                            width={13}
                            onClick={handleCrossIcon}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  className="d-flex justify-content-end"
                >
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
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className={styles["search-input"]}
                          />
                          {filteredOrganizations.map((CountryData, index) => (
                            <div
                              className={styles["dropdown-list-item"]}
                              onClick={onCountryClickClick(CountryData)}
                              key={index}
                            >
                              {CountryData.organizationName}
                            </div>
                          ))}
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
                    {/* {selectedCompany} */}
                    {t("Total-due")}
                  </span>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col lg={12} md={12} sm={12} className={styles["Scroller"]}>
                  <Table
                    column={DashboardGlobalColumn}
                    pagination={false}
                    rows={billDueTable}
                    // scroll={{
                    //   y: 300,
                    //   x: false,
                    // }}
                    className="Table"
                    locale={{
                      emptyText: (
                        <>
                          <section className="d-flex flex-column align-items-center justify-content-center mt-3">
                            <img src={BillingDue} width={"180px"} alt="" />

                            <span className="Main-Title">
                              {t("No-billing-due")}
                            </span>
                            <span className="Sub-Title">
                              {t("No-payment-due-for-this-organization")}
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
                      width={"280px"}
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
                      width={"280px"}
                      data={userData}
                      options={userOptions}
                    />
                  </section>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={10} md={10} sm={12} className="d-flex gap-3 mt-2">
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

                <Col lg={2} md={2} sm={12} className="mt-2">
                  {users === true || organizationStatus === true ? (
                    <>
                      {subscription === true ? (
                        <>
                          <Button
                            text={t("Export")}
                            className={styles["ExportBUtton"]}
                            onClick={downloadSubscriptionReport}
                            icon={
                              <>
                                <img src={ExcelIcon} alt="" draggable="false" />
                              </>
                            }
                          />
                        </>
                      ) : trialExtended === true ? (
                        <>
                          <Button
                            text={t("Export")}
                            className={styles["ExportBUtton"]}
                            onClick={downloadTrialExtendedReport}
                            icon={
                              <>
                                <img src={ExcelIcon} alt="" draggable="false" />
                              </>
                            }
                          />
                        </>
                      ) : subsExpiry === true ? (
                        <>
                          <Button
                            text={t("Export")}
                            className={styles["ExportBUtton"]}
                            onClick={downloadTrialExpireSubscriptionReport}
                            icon={
                              <>
                                <img src={ExcelIcon} alt="" draggable="false" />
                              </>
                            }
                          />
                        </>
                      ) : (
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
                      )}
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
                      height={"30vh"}
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
                      height={"30vh"}
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
                      height={"30vh"}
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
                      height={"30vh"}
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
                      height={"30vh"}
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
                      height={"30vh"}
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
                      height={"30vh"}
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

      <PackageDetailModal />
      <TrialRenewModal
        trialRenewOrganizationId={trialRenewOrganizationId}
        trialRenewOrganizationName={trialRenewOrganizationName}
        trialRenewRemainingDays={trialRenewRemainingDays}
      />
      <SubscriptionRenewModal />
    </>
  );
};

export default GlobalAdminDashboard;
