import React, { useEffect, useState } from "react";
import { getAllTrailRejectedApi } from "../../../store/Actions/ViewOrganizationActions";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
import { viewOrganizationLoader } from "../../../store/ActionsSlicers/ViewOrganizationActionSlicer";
import { getAllOrganizationNameMainApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import styles from "./RejectedRequest.module.css";
import CustomButton from "../../../components/elements/button/Button";

const RejectedRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Global State for Data
  const rejctedRequestData = useSelector(
    (state) => state.searchOrganization.rejectedRequestData
  );
  // Local State for Data
  const [totalRecord, setTotalRecords] = useState(0);
  const [rejectedRequestData, setRejectedRequestData] = useState([]);

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
        setRejectedRequestData(rejctedRequestData.result.organizations);
        setTotalRecords(rejctedRequestData.result.totalCount);
      }
    } catch (error) {}
  }, [rejctedRequestData]);

  return (
    <>
      <section className={styles["RejectedRequestBox__Wrapper"]}>
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
                          <p className={styles["RejectedRequestBox__value"]}>
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
    </>
  );
};

export default RejectedRequest;
