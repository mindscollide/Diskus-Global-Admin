import React, { useEffect, useState } from "react";
import styles from "./ViewAction.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import NoActionsAudits from "../../../assets/images/OutletImages/NoActionsAudits.png";
import CrossIcon from "../../../assets/images/OutletImages/BlackCrossIconModals.svg";
import Excelicon from "../../../assets/images/OutletImages/ExcelIcon.png";
import { viewActionModalState } from "../../../store/ActionsSlicers/UIModalsActions";
import { AuditTrialDateTimeFunctionViewActionDetails } from "../../../common/functions/dateFormatters";
import { Button, Modal } from "../../../components/elements";
const ViewActionModal = ({ viewActionModalDataState }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const locale = localStorage.getItem("i18nextLng");
  //Get Audit Action Data
  const GetUserActionsAuditData = useSelector(
    (state) => state.globalAdminDashboardReducer.getAuditActions
  );
  const ModalReducer = useSelector((state) => state.modal);

  console.log(viewActionModalDataState, "viewActionModalDataState");

  //Local state
  const [auditActionsData, setAuditActionsData] = useState([]);

  console.log(GetUserActionsAuditData, "GetUserActionsAuditData");
  console.log(GetUserActionsAuditData?.result, "GetUserActionsAuditData");

  // //Extracting the Audit actions data
  useEffect(() => {
    try {
      const result = GetUserActionsAuditData?.result;
      if (result && result.userLoginAuditActions?.length > 0) {
        setAuditActionsData(
          GetUserActionsAuditData.result.userLoginAuditActions
        );
      } else {
        setAuditActionsData([]);
      }
    } catch (error) {
      console.log("Error in fetching audit actions:", error);
    }
  }, [GetUserActionsAuditData]);

  console.log(auditActionsData, "GetUserActionsAuditData");

  const handleCrossIconClick = () => {
    dispatch(viewActionModalState(false));
  };

  return (
    <div>
      <Modal
        show={ModalReducer.viewActionModalState}
        modalHeaderClassName={"d-block"}
        onHide={() => {
          dispatch(viewActionModalState(false));
        }}
        size={"lg"}
        ModalTitle={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end"
              >
                <img
                  src={CrossIcon}
                  className="cursor-pointer"
                  alt=""
                  onClick={handleCrossIconClick}
                />
              </Col>
            </Row>
            <Row className="mt-1">
              <Col
                lg={6}
                md={6}
                sm={6}
                className="d-flex justify-content-start"
              >
                <span className={styles["UserNameStyles"]}>
                  {t("User")}
                  {""}
                  <span>
                    :&nbsp;
                    {viewActionModalDataState.userName}
                  </span>
                </span>
              </Col>
              <Col lg={6} md={6} sm={6} className="d-flex justify-content-end">
                <span className={styles["UserNameStyles"]}>
                  {t("Interface")}
                  {""}
                  <span>
                    :&nbsp;
                    {viewActionModalDataState.deviceID === "1"
                      ? "Web"
                      : viewActionModalDataState.deviceID === "2"
                      ? "Mobile"
                      : "Tablet"}
                  </span>
                </span>
              </Col>
            </Row>
          </>
        }
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className={styles["ViewActionModal_scroll_bar"]}
              >
                <div className={styles["classOne"]}>
                  {/* LOGIN ITEM */}
                  <span
                    className={`
                        ${styles["item-base"]}
                        ${styles["item-border-Bottom"]}
                      `}
                  >
                    {`${AuditTrialDateTimeFunctionViewActionDetails(
                      viewActionModalDataState.dateLogin,
                      locale
                    )} – `}
                    {t("Logged-In")}
                  </span>
                  {/* ACTIVITY ITEMS OR NO ACTIVITY MESSAGE */}
                  {auditActionsData.length > 0 ? (
                    auditActionsData.map((item, index, arr) => (
                      <span
                        key={`activity-${index}`}
                        className={`
                          ${styles["item-base"]}
                          ${styles["item-activity"]}
                        `}
                      >
                        <span className={styles["InnerSideDescription"]}>
                          {AuditTrialDateTimeFunctionViewActionDetails(
                            item.datetime,
                            locale
                          )}{" "}
                          – {item.message}
                        </span>
                        {index !== arr.length - 1 && (
                          <hr className={styles["H1styles"]} />
                        )}
                      </span>
                    ))
                  ) : (
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="d-flex flex-column flex-wrap justify-content-center align-items-center p-4"
                      >
                        <img src={NoActionsAudits} alt="" width={150} />
                        <span className={styles["NoActivity"]}>
                          {t("No-activity")}
                        </span>
                      </Col>
                    </Row>
                  )}
                  <span
                    className={`
                        ${styles["item-base"]}
                        ${styles["item-border-top"]}
                      `}
                  >
                    {`${AuditTrialDateTimeFunctionViewActionDetails(
                      viewActionModalDataState.dateLogOut,
                      locale
                    )} – `}
                    {t("Logged-out")}
                  </span>
                </div>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Button
                  text={t("Download")}
                  icon={
                    <>
                      <img src={Excelicon} width={20} alt="" />
                    </>
                  }
                  className={styles["DownloadExcelButton"]}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default ViewActionModal;
