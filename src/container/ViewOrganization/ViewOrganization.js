import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewOrganization.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Table, TextField } from "../../components/elements";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
import BlackCrossicon from "../../assets/images/OutletImages/BlackCrossIconModals.svg";
import DatePicker, { DateObject } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
const ViewOrganization = () => {
  const { t } = useTranslation();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("i18nextLng");

  const [searchBox, setSearchBox] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);

  const PollsColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "title",
      key: "title",
      width: "169px",
    },
    {
      title: t("Admin-name"),
      dataIndex: "title",
      key: "title",
      width: "125px",
    },
    {
      title: t("Contact-number"),
      dataIndex: "title",
      key: "title",
      width: "150px",
    },
    {
      title: t("Subscription-expiry"),
      dataIndex: "title",
      key: "title",
      width: "170px",
    },
    {
      title: t("Subscription-status"),
      dataIndex: "title",
      key: "title",
      width: "170px",
    },
    {
      title: t("Edit-subscription"),
      dataIndex: "title",
      key: "title",
      width: "155px",
    },
    {
      title: t("Edit-organization"),
      dataIndex: "title",
      key: "title",
      width: "139px",
    },
  ];

  const HandleopenSearchBox = () => {
    setSearchBox(!searchBox);
  };

  const handleCancelSearchbox = () => {
    setSearchBox(false);
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
                          <TextField labelClass={"d-none"} />
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                          <TextField labelClass={"d-none"} />
                        </Col>
                      </Row>
                      <Row>
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
                    </Col>
                  </Row>
                </>
              ) : null}
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Table column={PollsColoumn} pagination={false} className="Table" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewOrganization;
