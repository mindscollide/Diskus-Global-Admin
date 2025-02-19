import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  getAllTrailRequestedApi,
  updateOrganizationTrailRequestStatusApi,
} from "../../../store/Actions/ViewOrganizationActions";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import {
  confirmatioModalFunc,
  viewOrganizationLoader,
} from "../../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationNameMainApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import styles from "./TrailRequest.module.css";
import CustomButton from "../../../components/elements/button/Button";
import { utcConvertintoGMT } from "../../../common/functions/dateFormatters";
import moment from "moment";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { use } from "react";
import FlagCountryName from "../CountryFlagFunctionality/CountryFlag";

const TrailRequest = ({ currentTab, setCurrentTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const scrollableElementRef = useRef(null);
  // Global State for Data
  const trailRequesRequestData = useSelector(
    (state) => state.searchOrganization.trailRequestData
  );

  // Local State for Data
  const [totalRecords, setTotalRecords] = useState(0);
  const [isRowsData, setSRowsData] = useState(0);
  const [organizationID, setOrganizationID] = useState(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [status, setStatus] = useState("");

  const [trailRequestData, setTrailRequestData] = useState([]);
  console.log(
    { trailRequesRequestData, totalRecords, trailRequestData },
    "trailRequestDatatrailRequestData"
  );

  //Calling Organization Api
  useEffect(() => {
    let newData = {
      OrganizationName: "",
      ContactPersonName: "",
      ContactPersonEmail: "",
      DateTimeTo: "",
      DateTimeFrom: "",
      SkipRows: 0,
      Length: 10,
    };
    dispatch(viewOrganizationLoader(true));
    dispatch(getAllTrailRequestedApi({ newData, navigate, t }));

    return () => {
      // setSearchOrganizationData({
      //   OrganizationContactName: "",
      //   OrganizationContactEmail: "",
      //   OrganizationDateFrom: "",
      //   OrganizationDateTo: "",
      //   OrganizationName: "",
      //   OrganizationSubscriptionStatus: {
      //     value: 0,
      //     label: "",
      //   },
      //   OrganizationDateToView: "",
      //   OrganizationDateFromView: "",
      // });
    };
  }, []);

  useEffect(() => {
    try {
      if (
        trailRequesRequestData !== null &&
        trailRequesRequestData?.result !== null &&
        trailRequesRequestData?.result?.organizations.length > 0
      ) {
        const OrganizationsData = isScrolling
          ? [
              ...trailRequesRequestData.result.organizations,
              ...trailRequestData,
            ]
          : trailRequesRequestData.result.organizations;
        setSRowsData(OrganizationsData.length);
        setTrailRequestData(OrganizationsData);
        setTotalRecords(trailRequesRequestData.result.totalCount);
        setIsScrolling(false);
      } else {
        setSRowsData([]);
        setTrailRequestData([]);
        setTotalRecords(0);
        setIsScrolling(false);
      }
    } catch (error) {
      setSRowsData([]);
      setTrailRequestData([]);
      setTotalRecords(0);
      setIsScrolling(false);
    }
  }, [trailRequesRequestData]);

  const handleAccept = (organizationID) => {
    console.log(organizationID, "organizationIDorganizationID");
    setStatus("Accept");
    dispatch(confirmatioModalFunc(true));
    setOrganizationID(organizationID);
  };
  const handleReject = (organizationID) => {
    console.log(organizationID, "organizationIDorganizationID");

    setStatus("Reject");
    dispatch(confirmatioModalFunc(true));
    setOrganizationID(organizationID);
  };

  const handleCancel = useCallback(() => {
    dispatch(confirmatioModalFunc(false));
    setStatus("");
    setOrganizationID(0);
  }, []);

  const handleProceed = useCallback(() => {
    const Data = {
      OrganizationID: organizationID,
      IsAccepted: status === "Accept" ? true : false,
    };

    dispatch(
      updateOrganizationTrailRequestStatusApi({
        Data,
        setStatus,
        setCurrentTab,
        navigate,
        t,
      })
    );
  }, [organizationID]);

  const handleScrollApiCall = () => {
    const scrollableElement = scrollableElementRef.current;
    if (scrollableElement) {
      if (
        scrollableElement.scrollTop + scrollableElement.clientHeight >=
        scrollableElement.scrollHeight
      ) {
        if (isRowsData <= totalRecords) {
          setIsScrolling(true);
          let newData = {
            OrganizationName: "",
            ContactPersonName: "",
            ContactPersonEmail: "",
            DateTimeTo: "",
            DateTimeFrom: "",
            SkipRows: Number(isRowsData),
            Length: 10,
          };
          dispatch(viewOrganizationLoader(true));
          dispatch(getAllTrailRequestedApi({ newData, navigate, t }));
        } else {
          setIsScrolling(false);
        }
        console.log("You have reached the bottom of the element!");
        // Trigger API call or load more content
      }
    }
  };

  useEffect(() => {
    const scrollableElement = scrollableElementRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollApiCall);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollApiCall);
      }
    };
  }, []);

  return (
    <>
      <section
        className={styles["TrailRequestBox__Wrapper"]}
        ref={scrollableElementRef}>
        {trailRequestData.length > 0 &&
          trailRequestData.map((item, index) => {
            return (
              <>
                <Row className='mb-3'>
                  <Col sm={12} md={12} lg={12}>
                    <div className={styles["TrailRequestBox"]}>
                      <Row>
                        <Col sm={4} lg={4} md={4}>
                          <p className={styles["TrailRequestBox__label"]}>
                            {t("Organization-name")}
                          </p>
                          <p className={styles["TrailRequestBox__value"]}>
                            {item.organizationName}
                          </p>
                        </Col>
                        <Col sm={3} lg={3} md={3}>
                          <p className={styles["TrailRequestBox__label"]}>
                            {t("Admin-name")}
                          </p>
                          <p className={styles["TrailRequestBox__value"]}>
                            {item.contactPersonName}
                          </p>
                        </Col>

                        <Col sm={2} lg={2} md={2}>
                          <p className={styles["TrailRequestBox__label"]}>
                            {t("Trial-request-date")}
                          </p>
                          <p className={styles["TrailRequestBox__value"]}>
                            {moment(
                              utcConvertintoGMT(
                                item.creationDateTime
                              ).toString()
                            ).format("MMM - DD - yyyy")}
                          </p>
                        </Col>
                        <Col
                          sm={3}
                          lg={3}
                          md={3}
                          className='d-flex justify-content-center align-items-center gap-3'>
                          <CustomButton
                            text={"Reject"}
                            className={styles["TrailRequestBox__RejectBtn"]}
                            onClick={() => handleReject(item.organizationID)}
                          />
                          <CustomButton
                            text={"Accept"}
                            className={styles["TrailRequestBox__AcceptBtn"]}
                            onClick={() => handleAccept(item.organizationID)}
                          />
                        </Col>
                        <Col sm={4} lg={4} md={4} className='mt-2'>
                          <p className={styles["TrailRequestBox__label"]}>
                            {t("Email")}
                          </p>
                          <p className={styles["TrailRequestBox__value"]}>
                            {item.contactPersonEmail}
                          </p>
                        </Col>
                        <Col sm={5} lg={5} md={5} className='mt-2'>
                          <p className={styles["TrailRequestBox__label"]}>
                            {t("Contact-number")}
                          </p>
                          <p
                            className={`${styles["TrailRequestBox__value"]} d-flex justify-content-start align-items-center gap-1`}>
                            <FlagCountryName countryCode={item.mobileCode} />
                            {item.contactPersonNumber}
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </>
            );
          })}
      </section>
      <ConfirmationModal
        status={status}
        handleClose={handleCancel}
        handleProceedUpdate={handleProceed}
      />
    </>
  );
};

export default TrailRequest;
