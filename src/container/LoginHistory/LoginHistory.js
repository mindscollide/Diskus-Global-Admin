import React, { useRef, useState } from "react";
import styles from "./LoginHistory.module.css";
import { Button, Table, TextField } from "../../components/elements";
import { Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import PDFIcon from "../../assets/images/OutletImages/color pdf.svg";

const LoginHistory = () => {
  const { t } = useTranslation();

  const calendRef = useRef();

  const [searchBox, setSearchBox] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);

  const UserLoginHistoryColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      width: "175px",
    },
    {
      title: t("User-name"),
      dataIndex: "adminName",
      key: "adminName",
      width: "115px",
    },
    {
      title: t("User-email"),
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: "130px",
    },
    {
      title: t("Login-date-time"),
      dataIndex: "SubscriptionExpiry",
      key: "SubscriptionExpiry",
      width: "160px",
    },
    {
      title: t("Logout-date-time"),
      dataIndex: "subscriptionStatus",
      key: "subscriptionStatus",
      width: "160px",
    },
    {
      title: t("Session-duration"),
      dataIndex: "editSubscription",
      key: "editSubscription",
      width: "155px",
    },
    {
      title: t("Interface"),
      dataIndex: "editOrganization",
      key: "editOrganization",
      width: "60px",
    },
    {
      title: t("Ip-address"),
      dataIndex: "editOrganization",
      key: "editOrganization",
      width: "110px",
    },
  ];

  const HandleopenSearchBox = () => {
    setSearchBox(!searchBox);
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
  };

  const options = [
    { value: "Enabled", label: "Enabled" },
    { value: "Disabled", label: "Disabled" },
    { value: "Locked", label: "Locked" },
    { value: "Dormant", label: "Dormant" },
  ];

  const InterfaceOptions = [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "Tablet", label: "Tablet" },
  ];

  return (
    <Container>
      <Row className="mt-3">
        <Col lg={5} md={5} sm={5}>
          <span className={styles["HeadingViewORganization"]}>
            {t("User-login-history")}
          </span>
        </Col>
        <Col lg={2} md={2} sm={2} className="d-flex justify-content-end">
          <span className={styles["Export_To_Excel"]}>
            <img src={PDFIcon} alt="" draggable="false" />
            <span>Export to Excel</span>
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
                  <Col lg={12} md={12} sm={12} className={styles["SearchBox"]}>
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
                        <TextField labelClass={"d-none"} />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <TextField labelClass={"d-none"} />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          // value={searchFields.DateView}
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
                          // onChange={meetingDateChangeHandler}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <DatePicker
                          // value={searchFields.DateView}
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
                          // onChange={meetingDateChangeHandler}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={6}>
                        <Select
                          options={options}
                          placeholder={t("Ip-address")}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <Select
                          options={InterfaceOptions}
                          placeholder={t("Interface")}
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
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <Table
            column={UserLoginHistoryColoumn}
            pagination={false}
            // rows={data}
            className="Table"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginHistory;
