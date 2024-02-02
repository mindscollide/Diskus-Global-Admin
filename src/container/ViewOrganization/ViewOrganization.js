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
import {
  editOrganizationModalOpen,
  editSubscriptionModalOpen,
} from "../../store/ActionsSlicers/UIModalsActions";
import { useDispatch } from "react-redux";
import EditSubscriptionModal from "./EditSubscriptionModal/EditSubscriptionModal";
import EditSubscriptionConfirmationModal from "./EditSubscriptionModal/EditSubscriptionModalConfirmation/EditSubscriptionConfirmationModal";

const ViewOrganization = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const calendRef = useRef();

  let currentLanguage = localStorage.getItem("i18nextLng");

  const [searchBox, setSearchBox] = useState(false);
  const [calendarValue, setCalendarValue] = useState(gregorian);
  const [localValue, setLocalValue] = useState(gregorian_en);

  const ViewOrganizationColoumn = [
    {
      title: t("Organization-name"),
      dataIndex: "organizationName",
      key: "organizationName",
      width: "169px",
    },
    {
      title: t("Admin-name"),
      dataIndex: "adminName",
      key: "adminName",
      width: "125px",
    },
    {
      title: t("Contact-number"),
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: "150px",
    },
    {
      title: t("Subscription-expiry"),
      dataIndex: "SubscriptionExpiry",
      key: "SubscriptionExpiry",
      width: "170px",
    },
    {
      title: t("Subscription-status"),
      dataIndex: "subscriptionStatus",
      key: "subscriptionStatus",
      width: "170px",
    },
    {
      title: t("Edit-subscription"),
      dataIndex: "editSubscription",
      key: "editSubscription",
      width: "155px",
    },
    {
      title: t("Edit-organization"),
      dataIndex: "editOrganization",
      key: "editOrganization",
      width: "145px",
    },
  ];

  const handleEditOrganizationModal = () => {
    dispatch(editOrganizationModalOpen(true));
  };

  const handleEditSubscriptionModal = () => {
    dispatch(editSubscriptionModalOpen(true));
  };

  //Dummy data of Table

  const data = [
    {
      key: "1",
      editSubscription: (
        <>
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
        </>
      ),
      editOrganization: (
        <>
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
        </>
      ),
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
                          <Select options={options} />
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
              column={ViewOrganizationColoumn}
              pagination={false}
              rows={data}
              className="Table"
            />
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
