import React, { useEffect, useState } from "react";
import { getAllTrailRequestedApi } from "../../../store/Actions/ViewOrganizationActions";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { viewOrganizationLoader } from "../../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationNameMainApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import styles from "./TrailRequest.module.css";
import CustomButton from "../../../components/elements/button/Button";
import { utcConvertintoGMT } from "../../../common/functions/dateFormatters";
import moment from "moment";

const TrailRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Global State for Data
  const trailRequesRequestData = useSelector(
    (state) => state.searchOrganization.trailRequestData
  );

  // Local State for Data
  const [totalRecord, setTotalRecords] = useState(0);
  const [trailRequestData, setTrailRequestData] = useState([]);
  console.log(
    { trailRequesRequestData, totalRecord, trailRequestData },
    "trailRequestDatatrailRequestData"
  );

  //Calling Organization Api
  useEffect(() => {
    let newData = {
      OrganizationName: "",
      ContactPersonName: "",
      ContactPersonEmail: "",
      DateTime: "",
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
        setTrailRequestData(trailRequesRequestData.result.organizations);
        setTotalRecords(trailRequesRequestData.result.totalCount);
      }
    } catch (error) {}
  }, [trailRequesRequestData]);
  
  return (
    <section className={styles["TrailRequestBox__Wrapper"]}>
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
                          {t("Trail-request-date")}
                        </p>
                        <p className={styles["TrailRequestBox__value"]}>
                          {moment(utcConvertintoGMT(item.creationDateTime).toString()).format("MM - DD - yyyy")}
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
                        />
                        <CustomButton
                          text={"Accept"}
                          className={styles["TrailRequestBox__AcceptBtn"]}
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
                        <p className={styles["TrailRequestBox__value"]}>
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
  );
};

export default TrailRequest;
