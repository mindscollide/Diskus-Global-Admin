import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  getAllTrailRejectedApi,
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
import styles from "./RejectedRequest.module.css";
import CustomButton from "../../../components/elements/button/Button";
import FlagCountryName from "../CountryFlagFunctionality/CountryFlag";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";

const RejectedRequest = ({ currentTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Global State for Data
  const rejctedRequestData = useSelector(
    (state) => state.searchOrganization.rejectedRequestData
  );
  // Local State for Data
  const scrollableElementRef = useRef(null);
  const [status, setStatus] = useState("");
  const [organizationID, setOrganizationID] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isRowsData, setSRowsData] = useState(0);

  const [totalRecords, setTotalRecords] = useState(0);
  const [rejectedRequestData, setRejectedRequestData] = useState([]);

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
    dispatch(getAllTrailRejectedApi({ newData, navigate, t }));

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
        rejctedRequestData !== null &&
        rejctedRequestData?.result !== null &&
        rejctedRequestData?.result?.organizations.length > 0
      ) {
        const newRejectedData = isScrolling
          ? [...rejectedRequestData, ...rejctedRequestData.result.organizations]
          : rejctedRequestData.result.organizations;
        setRejectedRequestData(newRejectedData);
        setSRowsData(newRejectedData.length);
        setTotalRecords(rejctedRequestData.result.totalCount);
        setIsScrolling(false);
      }
    } catch (error) {
      setRejectedRequestData([]);
      setSRowsData(0);
      setTotalRecords(0);
      setIsScrolling(false);
    }
  }, [rejctedRequestData]);

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
          dispatch(getAllTrailRejectedApi({ newData, navigate, t }));
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

  const handleConsiderFunc = (organizationID) => {
    dispatch(confirmatioModalFunc(true));
    setOrganizationID(organizationID);
    setStatus("Accept");
  };

  const handleCancel = useCallback(() => {
    dispatch(confirmatioModalFunc(false));
    setStatus("");
  }, []);

  const handleProceed = useCallback(() => {
    const Data = {
      OrganizationID: organizationID,
      IsAccepted: true,
    };

    dispatch(
      updateOrganizationTrailRequestStatusApi({
        Data,
        setStatus,
        currentTab,
        navigate,
        t,
      })
    );
    // setStatus("");
  }, [organizationID]);

  return (
    <>
      <section
        className={styles["RejectedRequestBox__Wrapper"]}
        ref={scrollableElementRef}>
        {rejectedRequestData.length > 0 &&
          rejectedRequestData.map((item, index) => {
            return (
              <>
                <Row className='mb-3'>
                  <Col sm={12} md={12} lg={12}>
                    <div className={styles["RejectedRequestBox"]}>
                      <Row>
                        <Col sm={4} lg={4} md={4}>
                          <p className={styles["RejectedRequestBox__label"]}>
                            {t("Organization-name")}
                          </p>
                          <p className={styles["RejectedRequestBox__value"]}>
                            {item.organizationName}
                          </p>
                        </Col>
                        <Col sm={3} lg={3} md={3}>
                          <p className={styles["RejectedRequestBox__label"]}>
                            {t("Admin-name")}
                          </p>
                          <p className={styles["RejectedRequestBox__value"]}>
                            {item.contactPersonName}
                          </p>
                        </Col>

                        <Col sm={2} lg={2} md={2}>
                          <p className={styles["RejectedRequestBox__label"]}>
                            {t("Trail-request-date")}
                          </p>
                          <p className={styles["RejectedRequestBox__value"]}>
                            {item.creationDateTime}
                          </p>
                        </Col>
                        <Col
                          sm={3}
                          lg={3}
                          md={3}
                          className='d-flex justify-content-center align-items-center'>
                          <CustomButton
                            text={"Reconsider"}
                            className={
                              styles["RejectedRequestBox__ReconsiderBtn"]
                            }
                            onClick={() =>
                              handleConsiderFunc(item.organizationID)
                            }
                          />
                        </Col>
                        <Col sm={4} lg={4} md={4} className='mt-2'>
                          <p className={styles["RejectedRequestBox__label"]}>
                            {t("Email")}
                          </p>
                          <p className={styles["RejectedRequestBox__value"]}>
                            {item.contactPersonEmail}
                          </p>
                          {/* Email */}
                        </Col>
                        <Col sm={8} lg={8} md={8} className='mt-2'>
                          <p className={styles["RejectedRequestBox__label"]}>
                            {t("Contact-number")}
                          </p>
                          <p
                            className={`${styles["RejectedRequestBox__value"]} d-flex justify-content-start align-items-center gap-1`}>
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

export default RejectedRequest;
