import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewOrganization.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Button, Table, TextField } from "../../components/elements";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import Select from "react-select";
import EditIcon from "../../assets/images/OutletImages/Edit_Icon.svg";
import EditOrganizationModal from "./EditOrganizationModal/EditOrganizationModal";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  editOrganizationModalOpen,
  editSubscriptionModalOpen,
} from "../../store/ActionsSlicers/UIModalsActions";
import { useDispatch, useSelector } from "react-redux";
import EditSubscriptionModal from "./EditSubscriptionModal/EditSubscriptionModal";
import EditSubscriptionConfirmationModal from "./EditSubscriptionModal/EditSubscriptionModalConfirmation/EditSubscriptionConfirmationModal";
import {
  searchOrganizationApi,
  getAllOrganizationApi,
} from "../../store/Actions/ViewOrganizationActions";
import { useNavigate } from "react-router-dom";
import { newTimeFormaterForImportMeetingAgenda } from "../../common/functions/dateFormatters";
import moment from "moment";
import { viewOrganizationLoader } from "../../store/ActionsSlicers/ViewOrganizationActionSlicer";

const ViewOrganization = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("i18nextLng");

  const ViewOrganizationData = useSelector(
    (state) => state.searchOrganization.searchOrganizationData
  );

  const organizationIdData = useSelector(
    (state) => state.searchOrganization.getAllOrganizationData
  );

  const [organizationData, setOrganizationData] = useState([]);
  const [organizationDataValue, setOrganizationDataValue] = useState(null);

  //States for the component
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
  console.log(totalRecords, isRowsData, "isRowsDataisRowsData");
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
    dispatch(searchOrganizationApi({ data, navigate, t }));
  }, []);

  useEffect(() => {
    dispatch(viewOrganizationLoader(false));
    dispatch(getAllOrganizationApi({ navigate, t }));
  }, []);

  useEffect(() => {
    if (
      organizationIdData?.result.getAllOrganizations.length > 0 &&
      organizationIdData?.result.getAllOrganizations !== null
    ) {
      setOrganizationData(
        organizationIdData.result.getAllOrganizations.map((item) => ({
          value: item.organizationID,
          label: item.organizationName,
        }))
      );
    }
  }, [organizationIdData]);

  const organizerChangeHandler = (selectedOrganizer) => {
    setOrganizationDataValue(selectedOrganizer);
    console.log(selectedOrganizer, "selectedOrganizer");
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
        }
        setViewOrganizationData(
          ViewOrganizationData.result.searchOrganizations
        );
      }
    } catch {}
  }, [ViewOrganizationData]);

  const ViewOrganizationColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      align: "center",
      ellipsis: true,
      width: 220,
      render: (text, record) => (
        <>
          <span className={styles["inner-sub-Heading"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Admin-name"),
      dataIndex: "contactPersonName",
      key: "contactPersonName",
      align: "center",
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
          <span className={styles["inner-sub-Heading"]}>{text}</span>
        </>
      ),
    },
    {
      title: "Subscription Expiry",
      dataIndex: "subscriptionExpiry",
      key: "subscriptionExpiry",
      align: "center",
      width: 200,
      render: (text, record) => {
        const formattedDate = moment(text, "YYYYMMDD").format("DD - MM - YYYY");
        return (
          <div className={styles["inner-sub-Heading"]}>{formattedDate}</div>
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
      render: (text, record) => (
        <>
          <span className={styles["inner-sub-Heading"]}>{text}</span>
        </>
      ),
    },
    {
      title: t("Edit-subscription"),
      dataIndex: "editSubscription",
      key: "editSubscription",
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
                onClick={handleEditSubscriptionModal}
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
                onClick={handleEditOrganizationModal}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleEditOrganizationModal = () => {
    dispatch(editOrganizationModalOpen(true));
  };

  const handleEditSubscriptionModal = () => {
    dispatch(editSubscriptionModalOpen(true));
  };

  const HandleopenSearchBox = () => {
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

  console.log(
    searchOrganizationData.Status,
    "searchOrganizationDatasearchOrganizationData"
  );

  const handleSearchButton = () => {
    let data = {
      OrganizationID: 0,
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
        sRow: 0,
        Length: 10,
      };
      dispatch(viewOrganizationLoader(false));
      dispatch(searchOrganizationApi({ data, navigate, t }));
    } else {
      setIsScroll(false);
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col lg={7} md={7} sm={7}>
            <span className={styles["HeadingViewORganization"]}>
              {t("View-organization")}
            </span>
          </Col>
          <Col lg={5} md={5} sm={5}>
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
                        <Col lg={6} md={6} sm={6}>
                          <TextField
                            labelClass={"d-none"}
                            value={searchOrganizationData.userName}
                            name={"adminName"}
                            placeholder={t("Admin-name")}
                            change={searchViewOrganizationHandler}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <TextField
                            labelClass={"d-none"}
                            name={"adminEmail"}
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
                            placeholder="DD/MM/YYYY"
                            render={
                              <InputIcon
                                placeholder="DD/MM/YYYY"
                                className="datepicker_input"
                              />
                            }
                            editable={false}
                            className="datePickerTodoCreate2"
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
                            placeholder="DD/MM/YYYY"
                            render={
                              <InputIcon
                                placeholder="DD/MM/YYYY"
                                className="datepicker_input"
                              />
                            }
                            editable={false}
                            className="datePickerTodoCreate2"
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
                            options={options}
                            onChange={handleStatusChange}
                          />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <Select
                            value={organizationDataValue}
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
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <InfiniteScroll
              dataLength={viewOrganizationData.length}
              next={handleScroll}
              height={"60vh"}
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
              scrollableTarget="scrollableDiv"
            >
              <Table
                column={ViewOrganizationColoumn}
                pagination={false}
                rows={viewOrganizationData}
                footer={false}
                className={"userlogin_history_tableP"}
                size={"small"}
                // scroll={{
                //   x: false,
                // }}
              />
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
      <EditOrganizationModal />
      <EditSubscriptionModal />
      <EditSubscriptionConfirmationModal />
    </>
  );
};

export default ViewOrganization;
