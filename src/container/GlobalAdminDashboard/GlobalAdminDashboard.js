import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import Search_Icon from "../../assets/images/OutletImages/Search_Icon.png";
import BillingDue from "../../assets/images/OutletImages/BillingDue.png";
import NoOrganizationIcon from "../../assets/images/OutletImages/No_Organization.png";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ExcelIcon from "../../assets/images/OutletImages/Excel-Icon.png";
import Crossicon from "../../assets/images/OutletImages/WhiteCrossIcon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import SortAscending from "../../assets/images/OutletImages/SorterIconAscend.png";
import SortDescending from "../../assets/images/OutletImages/SorterIconDescend.png";
import descendingArrow from "../../assets/images/OutletImages/DownArrow.png";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Button, Table, TextField } from "../../components/elements";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { Chart } from "react-google-charts";
import { Calendar, DateObject } from "react-multi-date-picker";
import {
  StatsOfActiveLicenseApi,
  GetAllBillingDueApi,
  organziationStatsBySubscriptionApi,
  dashBoardReportApi,
  SendInvoiceApi,
  getListTrialSubscription,
  getListOfExtendedTrailSubscriptions,
  getListOfSubscribedSubscriptions,
  getListOfExpiredSubscriptions,
  trialSubscribeReportApi,
  trialExtendedReportApi,
  trialSubscribeExpiredReportApi,
  trialReportExportApi,
  getInvoiceHtmlApi,
  getPackageDetailGlobalApi,
  essentialDownloadExportApi,
  professionalDownloadExportApi,
  premiumDownloadExportApi,
  getAllPackagesDynamicTabsApi,
  listOfPackageLisencesMainApi,
  getAllOrganizationNameMainApi,
  dynamicalyDownloadReportApi,
} from "../../store/Actions/GlobalAdminDashboardActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import {
  convertUTCDateToLocalDate,
  formatDate,
  formatSessionDurationArabicAndEng,
} from "../../common/functions/dateFormatters";
import SendInvoiceModal from "./PackageDetailModal/PackageDetailModal";
import {
  dashboardSendInvoiceOpenModal,
  htmlInvoiceModalOpen,
  subscriptionRenewOpenModal,
  trialRenewOpenModal,
} from "../../store/ActionsSlicers/UIModalsActions";
import TrialRenewModal from "./TrialRenewModal/TrialRenewModal";
import SubscriptionRenewModal from "./SubscriptionRenewModal/SubscriptionRenewModal";
import PackageDetailModal from "./PackageDetailModal/PackageDetailModal";
import InvoiceHtmlModal from "./InvoiceHtmlModal/InvoiceHtmlModal";

const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const CompanyRef = useRef();
  const containerRef = useRef(null);
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

  //Get All Organization Reducer Data
  const organizationIdData = useSelector(
    (state) => state.globalAdminDashboardReducer.getOrganizationNames
  );
  console.log(organizationIdData, "organizationIdDataorganizationIdData");

  //Get All TotalThisMonthDueApi Reducer Data
  const GetAllBillingDueApiData = useSelector(
    (state) => state.globalAdminDashboardReducer.GetAllBillingDueApiData
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

  // Reducer for ListOfAllTheActiveOrganizationProfessionalLisences in essential Tab on dashboard
  const listOfPackageLisencesData = useSelector(
    (state) => state.globalAdminDashboardReducer.listOfPackageLisencesData
  );

  // Reducer for get ALL Packages for Dynamic tabs
  const getPackagesDynamicTabs = useSelector(
    (state) => state.globalAdminDashboardReducer.getPackagesDynamicTabs
  );

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [showSearchedDate, setShowSearchedDate] = useState(false);

  const dropdownRef = useRef(null);

  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [users, setUsers] = useState(false);
  console.log(users, "organizationStatusorganizationStatus");

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
  console.log(essentialTbl, "essentialTblessentialTblessentialTbl");

  // state for row of essential
  const [essentialRow, setEssentialRow] = useState([]);
  console.log(essentialRow, "essentialRowessentialRow");

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
  console.log(activelicenses, "organizationStatsLicense");

  //TotalThisMonthDueApi states
  const [totalDue, setTotalDue] = useState(null);
  console.log(totalDue, "totalDuetotalDuetotalDue");

  //Organizataion State
  const [isOpenCom, setIsOpenCom] = useState(true);
  const [organziations, setOrganizations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isCompnayOpen, setIsCompnayOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSelectedCompany, setShowSelectedCompany] = useState(false);
  const [organizationID, setOrganizationID] = useState(0);
  console.log(selectedCompany, "selectedCompanyselectedCompany");

  //Billing Dues Table data
  const [billDueTable, setBillDueTable] = useState([]);

  // for billing due scrolling
  const [billingScroll, setBillingScroll] = useState(false);
  const [totalBillingRecord, setTotalBillingRecord] = useState(0);
  const [isBillingRowData, setIsBillingRowData] = useState(0);
  const [billingPageNo, setBillingPageNo] = useState(0);

  //Lazy Loading States of Trial Table (Organization Status)
  const [isScroll, setIsScroll] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isRowsData, setSRowsData] = useState(0);

  // fot trial table
  const [trialPageNo, setTrialPageNo] = useState(0);

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

  // Page no state for Essential, professional and premium tabs
  const [essentialPageNo, setEssentialPageNo] = useState(0);

  //Lazy Loading States of Professional Table (users)
  const [sRow, setSRow] = useState(0); // Start index for pagination
  const [eRow, setERow] = useState(10); // End index for pagination
  const [isLoading, setIsLoading] = useState(false);

  //MultiDate Picker states
  const [currentMonth, setCurrentMonth] = useState(new DateObject().month);
  const [selectingStart, setSelectingStart] = useState(true);
  const currentDate = new Date(); // Creates a new date object representing now
  const newDate = new DateObject(currentDate); // Assumes DateObject takes a Date
  const formattedCurrentDate = newDate.format("YYYYMMDD") + "000000";
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // sort for billing table
  const [billingSort, setBillingSort] = useState(null);

  // Trial Btn sorting state
  const [sortTrial, setSortTrial] = useState(null);
  const [sortTrialDate, setSortTrialDate] = useState(null);
  const [sortTrialEndDate, setSortTrialEndDate] = useState(null);
  const [sortTrialRemaining, setSortTrialRemaining] = useState(null);

  // Essential Sorting State
  const [essentialSort, setEssentialSort] = useState(null);
  const [essentialSortDate, setEssentialSortDate] = useState(null);

  // Search Box for search data in trials, essential, Professional and Premium table
  const [searchData, setSearchData] = useState("");
  const [searchExecuted, setSearchExecuted] = useState(false);

  // send data of subscribed Trial through this state in package detail Modal
  const [subscribedPackageDetail, setSubscribedPackageDetail] = useState("");

  //send trial renew data in modal state
  const [trialRenewOrganizationId, setTrialRenewOrganizationId] = useState(0);
  const [trialRenewOrganizationName, setTrialRenewOrganizationName] =
    useState("");
  const [trialRenewRemainingDays, setTrialRenewRemainingDays] = useState(0);

  // for get Packages dynamic tabs by clicking on(Lisences or User) Graph
  const [dynamicPackagesTab, setDynamicPackagesTab] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  console.log(activeTab, "activeTabactiveTab");

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

  // for get Biilling DUe Api useEffect
  useEffect(() => {
    let data = {
      OrganizationID: 0,
      FromDate: "",
      ToDate: "",
      PageNumber: 1,
      Length: 15,
    };
    dispatch(GetAllBillingDueApi({ data, navigate, t }));
  }, []);

  //Billling Due Table Data
  useEffect(() => {
    try {
      if (
        GetAllBillingDueApiData !== null &&
        GetAllBillingDueApiData !== undefined
      ) {
        if (
          GetAllBillingDueApiData?.result.billingDue.length > 0 &&
          GetAllBillingDueApiData?.result.totalCount > 0
        ) {
          if (billingScroll) {
            setBillingScroll(false);
            //copy pf the rows of table
            let copyData = [...billDueTable];
            GetAllBillingDueApiData.result.billingDue.forEach((data, index) => {
              copyData.push(data);
            });
            setBillDueTable(copyData);
            setIsBillingRowData(
              (prev) => prev + GetAllBillingDueApiData.result.billingDue.length
            );
            setBillingPageNo((prev) => prev + 1);
            setTotalBillingRecord(GetAllBillingDueApiData.result.totalCount);
            setTotalDue(GetAllBillingDueApiData.result.totalAmount);
          } else {
            setBillDueTable(GetAllBillingDueApiData.result.billingDue);
            setTotalBillingRecord(GetAllBillingDueApiData.result.totalCount);
            setBillingPageNo(2);
            setIsBillingRowData(
              GetAllBillingDueApiData.result.billingDue.length
            );
            setTotalDue(GetAllBillingDueApiData.result.totalAmount);
          }
        } else {
          setBillDueTable([]);
          setBillingPageNo(0);
          setTotalBillingRecord(0);
          setIsBillingRowData(0);
        }
      } else {
        setBillDueTable([]);
      }
    } catch {}
  }, [GetAllBillingDueApiData]);

  //handle scroll function for lazy loading of Trial Table
  const handleBillingScroll = async (e) => {
    if (isBillingRowData <= totalBillingRecord) {
      setBillingScroll(true);
      let data = {
        OrganizationID: organizationID ? organizationID : 0,
        FromDate: startDate ? `${startDate}000000` : "",
        ToDate: endDate ? `${endDate}000000` : "",
        PageNumber: Number(billingPageNo),
        Length: 15,
      };
      dispatch(GetAllBillingDueApi({ data, navigate, t }));
    } else {
      setBillingScroll(false);
    }
  };

  // useEffect for listOfTrialSubscription,ListOfExtendedTrailSubscriptions,getListOfSubscribedSubscriptions
  // and getListOfExpiredSubscriptions for trial Tabs
  useEffect(() => {
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(getListTrialSubscription({ data, navigate, t }));

    return () => {
      setIsScroll(false);
      setTotalRecords(0);
      setTrialRow([]);
      // for extended trial Subscription
      setIsScrollTrialExtended(false);
      setTotalRecordsTrialExtended(0);
      setTrialExtendedRow([]);
      //for SubscribedSubscriptions on Trial Tabs
      setIsScrollSubscribed(false);
      setTotalRecordsSubscribed(0);
      setSubscribedRow([]);
      //for getListOfExpiredSubscriptions on Trial Tabs
      setIsScrollSubscriptionExpiry(false);
      setTotalRecordsSubscriptionExpiry(0);
      setSubscriptionExpiredRow([]);
    };
  }, []);

  //Calling StatsOfActiveLicenseApi
  useEffect(() => {
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(StatsOfActiveLicenseApi({ navigate, t }));
    //Calling organziationStatsBySubscriptionApi
    dispatch(organziationStatsBySubscriptionApi({ navigate, t }));
    //Getting All Organizations
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getAllOrganizationNameMainApi({ navigate, t }));

    setTrialBtn(true);
    setOrganizationStatus(true);
    return () => {
      setSelectingStart(true);
      setShowSearchedDate(false);
      // setShowSelectedCompany(false);
      // setIsCompnayOpen(true);
      // setIsOpen(true);
      // setIsOpenCom(false);
    };
  }, []);

  const handleTabClick = (tabName, packageId) => {
    let newData = {
      OrganizationName: "",
      PackageID: Number(packageId),
      PageNumber: 1,
      length: 15,
    };
    setSearchData("");
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(listOfPackageLisencesMainApi({ newData, navigate, t }));
    setActiveTab({ tabName, packageId });
  };

  // useEffect for getting All Packages in Dynamic Tabs
  useEffect(() => {
    if (
      getPackagesDynamicTabs !== null &&
      getPackagesDynamicTabs !== undefined &&
      getPackagesDynamicTabs?.result?.packageNames.length > 0
    ) {
      setDynamicPackagesTab(getPackagesDynamicTabs.result.packageNames);
      const firstEssentialTab = getPackagesDynamicTabs.result.packageNames.find(
        (tab) => tab.pK_PackageID === 1
      );
      if (firstEssentialTab !== undefined) {
        setActiveTab({
          tabName: firstEssentialTab.name,
          packageId: firstEssentialTab.pK_PackageID,
        });
        let newData = {
          OrganizationName: "",
          PackageID: Number(firstEssentialTab.pK_PackageID === 1),
          PageNumber: 1,
          length: 15,
        };
        setSearchData("");
        dispatch(globalAdminDashBoardLoader(true));
        dispatch(listOfPackageLisencesMainApi({ newData, navigate, t }));
      }
      console.log(firstEssentialTab, "jasvjgsvjgdvasjdvasjg");
    } else {
      setDynamicPackagesTab([]);
    }
  }, [getPackagesDynamicTabs]);

  //StatsOfActiveLicenseApi Data
  useEffect(() => {
    try {
      if (
        StatsOfActiveLicenseApiReducerData &&
        StatsOfActiveLicenseApiReducerData.result &&
        StatsOfActiveLicenseApiReducerData.result.packageStats &&
        StatsOfActiveLicenseApiReducerData.result.packageStats.length > 0
      ) {
        const packageStats =
          StatsOfActiveLicenseApiReducerData.result.packageStats;

        const essentialData =
          packageStats.find((pkg) => pkg.packageName === "Essential") || {};
        const professionalData =
          packageStats.find((pkg) => pkg.packageName === "Professional") || {};
        const premiumData =
          packageStats.find((pkg) => pkg.packageName === "Premium") || {};

        setActivelicenses({
          totalActiveLicense:
            StatsOfActiveLicenseApiReducerData.result.totalActiveLicense || 0,
          totalNumberOfEssentialLicense: essentialData.count || 0,
          totalNumberOfEssentialLicensePercentage:
            essentialData.percentage || 0,
          totalNumberOfPremiumLicense: premiumData.count || 0,
          totalNumberOfPremiumLicensePercentage: premiumData.percentage || 0,
          totalNumberOfProfessionalLicense: professionalData.count || 0,
          totalNumberOfProfessionalLicensePercentage:
            professionalData.percentage || 0,
        });
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
            OrganizationStatsSubscriptionReducer.result.totalOrganizations || 0,
          totalNumberOfTrialOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfTrialOrganizations || 0,
          totalNumberOfTrialOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfTrialOrganizationsPercentage || 0,
          totalNumberOfExtendedTrialOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExtendedTrialOrganizations || 0,
          totalNumberOfExtendedTrialOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExtendedTrialOrganizationsPercentage || 0,
          totalNumberOfSubscribedOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfSubscribedOrganizations || 0,
          totalNumberOfSubscribedOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfSubscribedOrganizationsPercentage || 0,
          totalNumberOfExpiredSubscriptionOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredSubscriptionOrganizations || 0,
          totalNumberOfExpiredSubscriptionOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredSubscriptionOrganizationsPercentage || 0,
          totalNumberOfExpiredTrialSubscriptionOrganizations:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredTrialSubscriptionOrganizations || 0,
          totalNumberOfExpiredTrialSubscriptionOrganizationsPercentage:
            OrganizationStatsSubscriptionReducer.result
              .totalNumberOfExpiredTrialSubscriptionOrganizationsPercentage ||
            0,
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
        listOfTrialSubscription !== undefined &&
        listOfTrialSubscription !== null
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
            setTrialPageNo((prev) => prev + 1);
            setTotalRecords(listOfTrialSubscription.result.totalCount);
          } else {
            setTrialRow(listOfTrialSubscription.result.listOfTrial);
            setTotalRecords(listOfTrialSubscription.result.totalCount);
            setTrialPageNo(2);
            setSRowsData(listOfTrialSubscription.result.listOfTrial.length);
          }
        } else {
          setTrialRow([]);
          setTrialPageNo(0);
          setTotalRecords(0);
          setSRowsData(0);
        }
      } else {
        setTrialRow([]);
      }
    } catch {}
  }, [listOfTrialSubscription]);

  //handle scroll function for lazy loading of Trial Table
  const handleScroll = async (e) => {
    if (isRowsData <= totalRecords) {
      setIsScroll(true);
      let data = {
        OrganizationName: "",
        PageNumber: Number(trialPageNo),
        length: 15,
      };
      dispatch(getListTrialSubscription({ data, navigate, t }));
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
            setTrialPageNo((prev) => prev + 1);
            setTotalRecordsTrialExtended(
              listOfTrialExtendedSubscription.result.totalCount
            );
          } else {
            setTrialExtendedRow(
              listOfTrialExtendedSubscription.result.listOfExtendedTrail
            );
            setTrialPageNo(2);
            setTotalRecordsTrialExtended(
              listOfTrialExtendedSubscription.result.totalCount
            );
            setSRowsDataTrialExtended(
              listOfTrialExtendedSubscription.result.listOfExtendedTrail.length
            );
          }
        } else {
          setTrialExtendedRow([]);
          setTrialPageNo(0);
          setTotalRecordsTrialExtended(0);
          setSRowsDataTrialExtended(0);
        }
      } else {
        setTrialExtendedRow([]);
      }
    } catch {}
  }, [listOfTrialExtendedSubscription]);

  //handle scroll function for lazy loading of Trial Extended Table
  const handleScrollTrialExtended = async (e) => {
    if (isRowsDataTrialExtended <= totalRecordsTrialExtended) {
      setIsScrollTrialExtended(true);
      let data = {
        OrganizationName: "",
        PageNumber: Number(trialPageNo),
        length: 15,
      };
      dispatch(getListOfExtendedTrailSubscriptions({ data, navigate, t }));
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
            setTrialPageNo((prev) => prev + 1);
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
            setTrialPageNo(2);
            setSRowsDataSubscribed(
              listofTrialSubscribeSubscription?.result.listOfSubscribed.length
            );
          }
        } else {
          setSubscribedRow([]);
          setTotalRecordsSubscribed(0);
          setTrialPageNo(0);
          setSRowsDataSubscribed(0);
        }
      } else {
        setSubscribedRow([]);
      }
    } catch {}
  }, [listofTrialSubscribeSubscription]);

  //handle scroll function for lazy loading of Subscribed Table
  const handleScrollSubscribed = async (e) => {
    if (isRowsDataSubscribed <= totalRecordsSubscribed) {
      setIsScrollSubscribed(true);
      let data = {
        OrganizationName: "",
        PageNumber: Number(trialPageNo),
        length: 15,
      };
      dispatch(getListOfSubscribedSubscriptions({ data, navigate, t }));
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
            setTrialPageNo((prev) => prev + 1);
            setTotalRecordsSubscriptionExpiry(
              listOfExpiredSubscriptions?.result.totalCount
            );
          } else {
            setSubscriptionExpiredRow(
              listOfExpiredSubscriptions?.result.listOfExpiredSubscription
            );
            setTotalRecordsSubscriptionExpiry(
              listOfExpiredSubscriptions.result.totalCount
            );
            setTrialPageNo(2);
            setSRowsDataSubscriptionExpiry(
              listOfExpiredSubscriptions?.result.listOfExpiredSubscription
                .length
            );
          }
        } else {
          setSubscriptionExpiredRow([]);
          setTotalRecordsSubscriptionExpiry(0);
          setTrialPageNo(0);
          setSRowsDataSubscriptionExpiry(0);
        }
      } else {
        setSubscriptionExpiredRow([]);
      }
    } catch {}
  }, [listOfExpiredSubscriptions]);

  //handle scroll function for lazy loading of Subscription Expiry Table
  const handleScrollSubscriptionExpiry = async (e) => {
    if (isRowsDataSubscriptionExpiry <= totalRecordsSubscriptionExpiry) {
      setIsScrollSubscriptionExpiry(true);
      let data = {
        OrganizationName: "",
        PageNumber: Number(trialPageNo),
        length: 15,
      };
      dispatch(getListOfExpiredSubscriptions({ data, navigate, t }));
    } else {
      setIsScrollSubscriptionExpiry(false);
    }
  };

  //getAllListOrganizationEssentialApi Data in table to set Row data of Essential column
  useEffect(() => {
    try {
      if (
        listOfPackageLisencesData?.result.listOfEssential !== undefined &&
        listOfPackageLisencesData?.result.listOfEssential !== null
      ) {
        if (
          listOfPackageLisencesData?.result.listOfEssential.length > 0 &&
          listOfPackageLisencesData?.result.totalCount > 0
        ) {
          if (isScrollEssential) {
            setIsScrollEssential(false);
            //copy pf the rows of table
            let copyData = [...essentialRow];
            listOfPackageLisencesData?.result.listOfEssential.forEach(
              (data, index) => {
                copyData.push(data);
              }
            );
            setEssentialRow(copyData);
            setSRowsDataEssential(
              (prev) =>
                prev + listOfPackageLisencesData?.result.listOfEssential.length
            );
            setEssentialPageNo((prev) => prev + 1);
            setTotalRecordsEssential(
              listOfPackageLisencesData?.result.totalCount
            );
          } else {
            console.log(
              listOfPackageLisencesData?.result.listOfEssential,
              "listOfPackageLisencesData?.result.listOfEssential"
            );
            setEssentialRow(listOfPackageLisencesData?.result.listOfEssential);
            setTotalRecordsEssential(
              listOfPackageLisencesData.result.totalCount
            );
            setEssentialPageNo(2);
            setSRowsDataEssential(
              listOfPackageLisencesData?.result.listOfEssential.length
            );
          }
        } else {
          setEssentialRow([]);
          setEssentialPageNo(0);
          setTotalRecordsEssential(0);
          setSRowsDataEssential(0);
        }
      } else {
        setEssentialRow([]);
      }
    } catch (error) {
      console.log(error, "listOfPackageLisencesDatalistOfPackageLisencesData");
    }
  }, [listOfPackageLisencesData]);

  //handle scroll function for lazy loading of Essential Table (Users)
  const handleScrollEssential = async (e) => {
    if (isRowsDataEssential <= totalRecordsEssential) {
      setIsScrollEssential(true);
      let data = {
        OrganizationName: "",
        PackageID: 1,
        PageNumber: Number(essentialPageNo),
        length: 15,
      };
      dispatch(listOfPackageLisencesMainApi({ data, navigate, t }));
    } else {
      setIsScrollEssential(false);
    }
  };

  //Getting All Organizations Data
  useEffect(() => {
    let newarr = [];
    try {
      if (
        organizationIdData?.result !== null &&
        organizationIdData?.result !== undefined &&
        organizationIdData?.result.organizations.length > 0
      ) {
        console.log(organizationIdData, "organizationIdData");
        let organizations = organizationIdData.result.organizations;
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

  const toggling = () => setIsOpenCalender(!isOpenCalender);

  //OutSide Click Functionality handled Both DropDowns
  const handleOutsideClick = (event) => {
    if (
      CompanyRef.current &&
      !CompanyRef.current.contains(event.target) &&
      isCompnayOpen
    ) {
      setIsCompnayOpen(false);
    }
  };

  // Effect to add click event listener when dropdown is open
  useEffect(() => {
    if (isCompnayOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCompnayOpen]);

  const togglingCompany = () => setIsCompnayOpen(!isCompnayOpen);

  const onCountryClickClick = (Country) => () => {
    console.log("company select dropdown");
    setSelectedCompany(Country.organizationName);
    setOrganizationID(Country.organizationID);
    setIsOpenCom(false);
    setIsCompnayOpen(false);
    setShowSelectedCompany(true);

    // Determine the correct values for start and end dates
    let fromDateParam = startDate ? `${startDate}000000` : "";
    let toDateParam = endDate ? `${endDate}000000` : "";

    fetchBillingData(Country.organizationID, fromDateParam, toDateParam);
  };

  const handleSearchChange = (event) => {
    event.stopPropagation();
    setSearchTerm(event.target.value);
    setIsOpenCom(true);
    setIsCompnayOpen(true);
  };

  // to filters organization company from dropdown
  const filteredOrganizations = organziations.filter((org) =>
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredOrganizations, "gaakakakkaka");

  const handleOrgnizationStatus = () => {
    setessentialTbl(false);
    setProfessionalTbl(false);
    setPremiumTbl(false);
    setUsers(false);
    setOrganizationStatus(true);
    setTrialBtn(true);
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getListTrialSubscription({ data, navigate, t }));
  };

  const handleUsers = () => {
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(false);
    setOrganizationStatus(false);
    setUsers(true);
    setessentialTbl(true);
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getAllPackagesDynamicTabsApi({ navigate, t }));
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

  const onClickSendInvoice = (record) => {
    console.log(record, "recordrecordwewe");
    let data = {
      OrganizationID: record.organizationID,
      InvoiceID: record.invoiceID,
      SubscriptionID: record.fK_OSID,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getInvoiceHtmlApi({ data, navigate, t }));
  };

  const DashboardGlobalColumn = [
    {
      title: t("Billing-date"),
      dataIndex: "billingDate",
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
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {billingSort === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      billingSort,
      onHeaderCell: () => ({
        onClick: () => {
          setBillingSort((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
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
      dataIndex: "billingMonth",
      width: "150px",
      align: "center",
      render: (text, record) => (
        <span className={styles["dashboard-table-insidetext"]}>
          {record.isInvoiceSent === false ? (
            <Button
              text={t("Send-invoice")}
              onClick={() => onClickSendInvoice(record)}
              className={styles["send-invoice-button"]}
            />
          ) : (
            <Button
              text={t("Invoice-sent")}
              className={styles["send-invoice-button-disable"]}
            />
          )}
        </span>
      ),
      // render: (text, record) => {
      //   console.log(record, "newRecordCheck");
      // },
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
      `Subscription Expired (${formatSessionDurationArabicAndEng(
        organizationStatsLicense.totalNumberOfExpiredSubscriptionOrganizations,
        currentLanguage
      )})`,
      organizationStatsLicense.totalNumberOfExpiredSubscriptionOrganizations,
    ],
  ];

  const options = {
    pieHole: 0.45,
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

  const userOptions = {
    pieHole: 0.45,
    is3D: false,
    colors: ["#81DB86", "#6172D6", "#D8A709", "#F16B6B"],
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
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortTrial === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortTrial,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrial((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Trial-start-date")}{" "}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate
          .toLowerCase()
          .localeCompare(b.subscriptionStartDate.toLowerCase()),
      sortTrialDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Trial-end-date")}{" "}
            {sortTrialEndDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionEndDate",
      key: "subscriptionEndDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionEndDate
          .toLowerCase()
          .localeCompare(b.subscriptionEndDate.toLowerCase()),
      sortTrialEndDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialEndDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Remaining-days")}{" "}
            {sortTrialRemaining === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.remainingDays - b.remainingDays,
      sortTrialRemaining,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialRemaining((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        console.log(record, "aadadadadadada");
        const roundedRemainingDays = Math.floor(record.remainingDays);
        return (
          <>
            <div className={styles["dashboard-user-dates"]}>
              {roundedRemainingDays} {"Days"}
            </div>
          </>
        );
      },
    },
  ];

  const TraiExtendedColumn = [
    {
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortTrial === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortTrial,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrial((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Trial-extend-date")}{" "}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate
          .toLowerCase()
          .localeCompare(b.subscriptionStartDate.toLowerCase()),
      sortTrialDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Trial-extend-end-date")}{" "}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionEndDate",
      key: "subscriptionEndDate",
      align: "center",
      ellipsis: true,
      align: "center",
      sorter: (a, b) =>
        a.subscriptionEndDate
          .toLowerCase()
          .localeCompare(b.subscriptionEndDate.toLowerCase()),
      sortTrialEndDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialEndDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Remaining-days")}{" "}
            {sortTrialRemaining === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.remainingDays - b.remainingDays,
      sortTrialRemaining,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialRemaining((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        const roundedRemainingDays = Math.floor(record.remainingDays);
        return (
          <>
            {record.remainingDays === 0 ? (
              <Button
                text={t("Extend-trial")}
                className={styles["Extend-trial-btn"]}
                onClick={() => onClickRenew(record)}
              />
            ) : (
              <>
                <div className={styles["dashboard-user-dates"]}>
                  {roundedRemainingDays} {"Days"}
                </div>
              </>
            )}
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
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortTrial === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortTrial,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrial((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
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
      title: (
        <>
          <span>
            {t("Expiration-date")}{" "}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate
          .toLowerCase()
          .localeCompare(b.subscriptionStartDate.toLowerCase()),
      sortTrialDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Remaining-days")}{" "}
            {sortTrialRemaining === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "remainingDays",
      key: "remainingDays",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.remainingDays - b.remainingDays,
      sortTrialRemaining,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialRemaining((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        const roundedRemainingDays = Math.floor(record.remainingDays);
        return (
          <>
            <div className={styles["dashboard-user-dates"]}>
              {roundedRemainingDays}
            </div>
          </>
        );
      },
    },
  ];

  const subscriptionExpiry = [
    {
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {sortTrial === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      sortTrial,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrial((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
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
              onClick={() => openSendInvoiceModal(record)}
            />
          </>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Expiration-date")}{" "}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionEndDate",
      key: "subscriptionEndDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate
          .toLowerCase()
          .localeCompare(b.subscriptionStartDate.toLowerCase()),
      sortTrialDate,
      onHeaderCell: () => ({
        onClick: () => {
          setSortTrialDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    ,
  ];

  const essentialColumns = [
    {
      title: (
        <>
          <span>
            {t("Organization-name")}{" "}
            {essentialSort === "descend" ? (
              <img src={SortDescending} alt="" />
            ) : (
              <img src={SortAscending} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "organizationName",
      key: "organizationName",
      className: "class-table-loginhistory",
      ellipsis: true,
      sorter: (a, b) =>
        a.organizationName
          .toLowerCase()
          .localeCompare(b.organizationName.toLowerCase()),
      essentialSort,
      onHeaderCell: () => ({
        onClick: () => {
          setEssentialSort((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-tabletext"]}>{text}</span>
          </>
        );
      },
    },
    {
      title: (
        <>
          <span>
            {t("Start-date")}
            {sortTrialDate === "descend" ? (
              <img src={descendingArrow} alt="" />
            ) : (
              <img src={descendingArrow} alt="" />
            )}
          </span>
        </>
      ),
      dataIndex: "subscriptionStartDate",
      key: "subscriptionStartDate",
      align: "center",
      ellipsis: true,
      sorter: (a, b) =>
        a.subscriptionStartDate
          .toLowerCase()
          .localeCompare(b.subscriptionStartDate.toLowerCase()),
      essentialSortDate,
      onHeaderCell: () => ({
        onClick: () => {
          setEssentialSortDate((order) => {
            if (order === "descend") return "ascend";
            if (order === "ascend") return null;
            return "descend";
          });
        },
      }),
      render: (text, record) => {
        return (
          <div className={styles["dashboard-user-dates"]}>
            {convertUTCDateToLocalDate(text + "000000", currentLanguage)}
          </div>
        );
      },
    },
    {
      title: t("No-of-licenses"),
      dataIndex: "headCount",
      key: "headCount",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <span className={styles["dashboard-user-dates"]}>{text}</span>
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

  const handleTrailButton = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setSubscription(false);
    setTrialExtended(false);
    setTrialBtn(true);
    setSearchData("");
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getListTrialSubscription({ data, navigate, t }));
  };

  const handleTrialExtendedButton = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setSubscription(false);
    setTrialBtn(false);
    setTrialExtended(true);
    setIsScroll(false);
    setTotalRecords(0);
    setSRowsData(0);
    setTrialPageNo(1);
    setSearchData("");
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getListOfExtendedTrailSubscriptions({ data, navigate, t }));
  };

  const handleSubscriptionTable = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setsubsExpiry(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(true);
    setSearchData("");
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getListOfSubscribedSubscriptions({ data, navigate, t }));
  };

  const handleSubscriptionExpiry = () => {
    setPremiumTbl(false);
    setProfessionalTbl(false);
    setessentialTbl(false);
    setTrialBtn(false);
    setTrialExtended(false);
    setSubscription(false);
    setsubsExpiry(true);
    setSearchData("");
    let data = {
      OrganizationName: "",
      PageNumber: 1,
      length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getListOfExpiredSubscriptions({ data, navigate, t }));
  };

  useEffect(() => {
    if (users === true) {
      setessentialTbl(true);
    } else if (organizationStatus === true) {
      setTrialBtn(true);
    }
  }, []);

  const fetchBillingData = (orgID, start, end) => {
    let data = {
      OrganizationID: orgID,
      FromDate: start || "",
      ToDate: end || "",
      PageNumber: 1,
      Length: 15,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(GetAllBillingDueApi({ data, navigate, t }));
  };

  const openSendInvoiceModal = (record) => {
    console.log(record, "daadsdasdasdas");
    let data = {
      OrganizationID: record.organizationId,
      SubscriptionID: record.subscriptionID,
    };
    setSubscribedPackageDetail(record);
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getPackageDetailGlobalApi({ data, navigate, t }));

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
    let newDate = new Date(date);
    let utcDate = newDate.toISOString().slice(0, 10).replace(/-/g, "");

    if (selectingStart) {
      setStartDate(utcDate);
      setSelectingStart(false);
    } else {
      if (new Date(utcDate) < new Date(startDate)) {
        // If the end date is before the start date, swap the dates
        setEndDate(startDate);
        setStartDate(utcDate);
      } else {
        setEndDate(utcDate);
      }
      setSelectingStart(true);

      // Prepare the data object with the updated dates
      fetchBillingData(
        organizationID,
        `${startDate}000000`,
        `${utcDate}000000`
      );

      if (startDate && utcDate) {
        setIsOpen(false);
        setIsOpenCalender(false);
        setShowSearchedDate(true);
      }
    }
  };

  // handler cross for date
  const handleCrossIcon = () => {
    setShowSearchedDate(false);
    setIsOpen(true);
    setStartDate("");
    setEndDate("");
    fetchBillingData(organizationID, "", "");
  };

  // handler cross for company
  const handleCompanyCrossIcon = () => {
    setIsCompnayOpen(false);
    setShowSelectedCompany(false);
    setIsOpenCom(true);
    setSelectedCompany("");
    setOrganizationID(0);
    let fromDateParam = startDate ? `${startDate}000000` : "";
    let toDateParam = endDate ? `${endDate}000000` : "";
    fetchBillingData(0, fromDateParam, toDateParam);
  };

  // for Download Trial Report Only
  const downloadTrialReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(trialReportExportApi({ data, navigate, t }));
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

  // for download Essential Report
  const downloadEssentialReport = () => {
    let data = {
      OrganizationName: "",
      PackageID: activeTab.packageId,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(dynamicalyDownloadReportApi({ data, navigate, t }));
  };

  // for download Professional Report
  const downloadProfessionalReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(professionalDownloadExportApi({ data, navigate, t }));
  };

  // for download Premium Report
  const downloadPremiumReport = () => {
    let data = {
      OrganizationName: "",
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(premiumDownloadExportApi({ data, navigate, t }));
  };

  useEffect(() => {
    // Check if searchData is empty or contains only spaces
    if (searchData.trim() === "") {
      setSearchExecuted(false);
    }
  }, [searchData]);

  // Search Bar conditioning on both graphs
  const onClickSearchHandler = () => {
    if (searchData.trim() === "") {
      setSearchExecuted(false);
      return;
    }
    try {
      let data = {
        OrganizationName: searchData,
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));

      if (trialBtn) {
        dispatch(getListTrialSubscription({ data, navigate, t }));
      } else if (trialExtended === true) {
        dispatch(getListOfExtendedTrailSubscriptions({ data, navigate, t }));
      } else if (subscription) {
        dispatch(getListOfSubscribedSubscriptions({ data, navigate, t }));
      } else if (subsExpiry) {
        dispatch(getListOfExpiredSubscriptions({ data, navigate, t }));
      } else if (essentialTbl) {
        let newData = {
          OrganizationName: searchData,
          PackageID: activeTab.packageId,
          PageNumber: 1,
          length: 15,
        };
        dispatch(listOfPackageLisencesMainApi({ newData, navigate, t }));
      }
      setSearchExecuted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onKeyPressSearchHandler = (e) => {
    if (e.key === "Enter") {
      onClickSearchHandler();
    }
  };

  const onClickClearSearchHandler = () => {
    // Clear the search data and reset the state
    if (trialBtn === true) {
      let data = {
        OrganizationName: "",
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getListTrialSubscription({ data, navigate, t }));
      setSearchExecuted(false);
      setSearchData("");
    } else if (trialExtended === true) {
      let data = {
        OrganizationName: "",
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getListOfExtendedTrailSubscriptions({ data, navigate, t }));
      setSearchData("");
      setSearchExecuted(false);
    } else if (subscription === true) {
      let data = {
        OrganizationName: "",
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getListOfSubscribedSubscriptions({ data, navigate, t }));
      setSearchData("");
      setSearchExecuted(false);
    } else if (subsExpiry === true) {
      let data = {
        OrganizationName: "",
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      dispatch(getListOfExpiredSubscriptions({ data, navigate, t }));
      setSearchData("");
      setSearchExecuted(false);
    } else if (essentialTbl === true) {
      let newData = {
        OrganizationName: "",
        PackageID: activeTab.packageId,
        PageNumber: 1,
        length: 15,
      };
      dispatch(globalAdminDashBoardLoader(true));
      setSearchData("");
      dispatch(listOfPackageLisencesMainApi({ newData, navigate, t }));
      setSearchExecuted(false);
    }
  };

  // onChange Handler for search
  const onChangeSearchHandler = (e) => {
    const value = e.target.value;
    setSearchData(value);

    if (value.trim() === "") {
      setSearchExecuted(false);
    }
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Container fluid className={styles["global-admin-dashboard-container"]}>
        <Row className="mt-3">
          <Col lg={6} md={6} sm={6}>
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
                  <div
                    ref={CompanyRef}
                    className={styles["dropdown-container-companyName"]}
                  >
                    <div
                      className={styles["dropdown-header"]}
                      onClick={togglingCompany}
                      // ref={CompanyRef}
                    >
                      {isOpenCom ? (
                        <>
                          <span className={styles["MonthName"]}>
                            {t("Company")}
                          </span>
                          <span
                            className={isOpenCom ? styles.down : styles.up}
                          ></span>
                        </>
                      ) : null}

                      {isCompnayOpen ? (
                        <>
                          <section className={styles["dropdown_list"]}>
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={handleSearchChange}
                              placeholder="Search..."
                              className={styles["search-input"]}
                              onClick={(event) => event.stopPropagation()}
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
                            {isLoading && (
                              <div className={styles["loading-spinner"]}>
                                <Spin>
                                  <span className="sr-only">Loading...</span>
                                </Spin>
                              </div>
                            )}
                          </section>
                        </>
                      ) : null}

                      {showSelectedCompany ? (
                        <>
                          <div className={styles["Search-Company"]}>
                            <span className={styles["Search-Company-Searches"]}>
                              {selectedCompany}
                            </span>
                            <img
                              src={Crossicon}
                              alt=""
                              className={styles["CrossIcon_Class-company"]}
                              width={13}
                              onClick={handleCompanyCrossIcon}
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
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
                  <InfiniteScroll
                    dataLength={billDueTable.length}
                    next={handleBillingScroll}
                    height={"55vh"}
                    className={styles["infinite-hidden-class"]}
                    hasMore={
                      billDueTable.length === totalBillingRecord ? false : true
                    }
                    loader={
                      isBillingRowData <= totalBillingRecord &&
                      billingScroll ? (
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
                      column={DashboardGlobalColumn}
                      pagination={false}
                      rows={billDueTable}
                      footer={false}
                      className="billingTable"
                      locale={{
                        emptyText: (
                          <>
                            <section className="d-flex flex-column align-items-center justify-content-center">
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
                  </InfiniteScroll>
                </Col>
              </Row>
            </section>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <section className={styles["RightBoxDashboard"]}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <span className={styles["OrgazationStatusHeading"]}>
                    {t("Organization-status")}
                  </span>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <span className={styles["OrgazationStatusHeading"]}>
                    {t("Licenses")}
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
                    style={{ position: "relative" }} // Ensure the section has a relative position
                  >
                    <Chart
                      chartType="PieChart"
                      height={"200px"}
                      width={"280px"}
                      data={exData}
                      options={options}
                    />
                    <div className={styles["inside-pie-chart"]}>
                      {Number(organizationStatsLicense.totalOrganizations)}
                    </div>
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
                    style={{ position: "relative" }}
                  >
                    {/* <Pie {...configSecond} /> */}
                    <Chart
                      chartType="PieChart"
                      height={"200px"}
                      width={"280px"}
                      data={userData}
                      options={userOptions}
                    />
                    <div className={styles["inside-pie-chart"]}>
                      {Number(activelicenses.totalActiveLicense)}
                    </div>
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
                        className={
                          trialBtn === false &&
                          subscription === false &&
                          subsExpiry === false &&
                          trialExtended
                            ? styles["activeEssentialButton"]
                            : styles["ButtonsDashboard"]
                        }
                        onClick={handleTrialExtendedButton}
                      />
                      <Button
                        text={t("Subscribed")}
                        className={
                          trialBtn === false &&
                          subsExpiry === false &&
                          trialExtended === false &&
                          subscription
                            ? styles["activeEssentialButton"]
                            : styles["ButtonsDashboard"]
                        }
                        onClick={handleSubscriptionTable}
                      />
                      <Button
                        text={t("Subscription-expired")}
                        className={
                          trialBtn === false &&
                          trialExtended === false &&
                          subscription === false &&
                          subsExpiry
                            ? styles["activeEssentialButton"]
                            : styles["ButtonsDashboard"]
                        }
                        onClick={handleSubscriptionExpiry}
                      />
                    </>
                  ) : users ? (
                    <>
                      <div className={styles.scrollContainer}>
                        <span onClick={scrollLeft}>
                          <CaretLeftOutlined
                            className={styles["button-slides-class"]}
                          />
                        </span>
                        <div
                          className={styles["scrollContent"]}
                          ref={containerRef}
                        >
                          {dynamicPackagesTab &&
                            dynamicPackagesTab.map((dynamicTab, index) => (
                              <div key={index} className={styles.scrollItem}>
                                <Button
                                  text={dynamicTab.name}
                                  className={
                                    activeTab &&
                                    activeTab.tabName === dynamicTab.name &&
                                    activeTab.packageId ===
                                      dynamicTab.pK_PackageID
                                      ? styles["activeEssentialButton-Licenses"]
                                      : styles["ButtonsDashboard-Licenses"]
                                  }
                                  onClick={() =>
                                    handleTabClick(
                                      dynamicTab.name,
                                      dynamicTab.pK_PackageID
                                    )
                                  }
                                />
                              </div>
                            ))}
                        </div>
                        <span onClick={scrollRight}>
                          <CaretRightOutlined
                            className={styles["button-slides-class"]}
                          />
                        </span>
                      </div>
                    </>
                  ) : null}
                </Col>

                <Col lg={2} md={2} sm={12} className="mt-2">
                  {organizationStatus === true && users === false ? (
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
                      ) : trialBtn === true ? (
                        <>
                          <Button
                            text={t("Export")}
                            className={styles["ExportBUtton"]}
                            onClick={downloadTrialReport}
                            icon={
                              <>
                                <img src={ExcelIcon} alt="" draggable="false" />
                              </>
                            }
                          />
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {users ? (
                    <>
                      {essentialTbl === true ? (
                        <>
                          <Button
                            text={t("Export")}
                            className={styles["ExportBUtton-essential"]}
                            onClick={downloadEssentialReport}
                            icon={
                              <>
                                <img src={ExcelIcon} alt="" draggable="false" />
                              </>
                            }
                          />
                        </>
                      ) : null}
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
                      placeholder={t("Search")}
                      value={searchData}
                      change={onChangeSearchHandler}
                      onKeyPress={onKeyPressSearchHandler}
                      inputicon={
                        <>
                          <Row>
                            <Col
                              lg={12}
                              md={12}
                              sm={12}
                              className="d-flex gap-2 align-items-center"
                            >
                              {searchData.trim() === "" || !searchExecuted ? (
                                <img
                                  src={Search_Icon}
                                  alt=""
                                  onClick={onClickSearchHandler}
                                  className={styles["Search_Bar_icon_class"]}
                                  draggable="false"
                                />
                              ) : (
                                <img
                                  src={BlackCrossicon}
                                  alt=""
                                  onClick={onClickClearSearchHandler}
                                  className={styles["CrossIcon_Class-users"]}
                                  draggable="false"
                                />
                              )}
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
                      className={styles["infinite-hidden-class"]}
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
                      className={styles["infinite-hidden-class"]}
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
                      className={styles["infinite-hidden-class"]}
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
                      className={styles["infinite-hidden-class"]}
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
                      className={styles["infinite-hidden-class"]}
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
                ) : null}
                <Col lg={12} md={12} sm={12}></Col>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>

      <PackageDetailModal subscribedPackageDetail={subscribedPackageDetail} />
      <TrialRenewModal
        trialRenewOrganizationId={trialRenewOrganizationId}
        trialRenewOrganizationName={trialRenewOrganizationName}
        trialRenewRemainingDays={trialRenewRemainingDays}
      />
      <SubscriptionRenewModal />
      <InvoiceHtmlModal />
    </>
  );
};

export default GlobalAdminDashboard;
