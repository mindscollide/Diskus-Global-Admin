import React, { useRef, useState } from "react";
import styles from "./GlobalAdminDashboard.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
const GlobalAdminDashboard = () => {
  const { t } = useTranslation();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Company = [
    "Apex Arcrane Enterprises",
    "Astral Apex Holdings",
    "Cascade Innovation Guild",
    "Mosaic Venture Groups",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const [isCompnayOpen, setIsCompnayOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(Company[0]);

  const toggling = () => setIsOpen(!isOpen);

  const togglingCompany = () => setIsCompnayOpen(!isCompnayOpen);

  const onMonthClick = (month) => () => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  const onCountryClickClick = (Country) => () => {
    setSelectedCompany(Country);
    setIsCompnayOpen(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col lg={5} md={5} sm={5}>
            <section className={styles["LeftBoxDashboard"]}>
              <Row>
                <Col lg={4} md={4} sm={12}>
                  <span className={styles["BillingDueHeading"]}>
                    {t("Billing-due")}
                  </span>
                </Col>
                <Col lg={3} md={3} sm={3}>
                  <div className={styles["dropdown-container"]}>
                    <div
                      className={styles["dropdown-header"]}
                      onClick={toggling}
                    >
                      <span className={styles["MonthName"]}>
                        {selectedMonth}
                      </span>

                      <span
                        className={
                          isOpen ? ` ${styles["down"]} ` : `${styles["up"]}`
                        }
                      ></span>
                    </div>
                    {isOpen && (
                      <>
                        <section className={styles["dropdown_list"]}>
                          {months.map((month) => {
                            return (
                              <>
                                <div
                                  className={styles["dropdown-list-item"]}
                                  onClick={onMonthClick(month)}
                                  key={month}
                                >
                                  {month}
                                </div>
                              </>
                            );
                          })}
                        </section>
                      </>
                    )}
                  </div>
                </Col>
                <Col lg={5} md={5} sm={5}>
                  <div className={styles["dropdown-container"]}>
                    <div
                      className={styles["dropdown-header"]}
                      onClick={togglingCompany}
                    >
                      <span className={styles["MonthName"]}>
                        {selectedCompany}
                      </span>

                      <span
                        className={
                          isCompnayOpen
                            ? ` ${styles["down"]} `
                            : `${styles["up"]}`
                        }
                      ></span>
                    </div>
                    {isCompnayOpen && (
                      <>
                        <section className={styles["dropdown_list"]}>
                          {Company.map((Country) => {
                            return (
                              <>
                                <div
                                  className={styles["dropdown-list-item"]}
                                  onClick={onCountryClickClick(Country)}
                                  key={Country}
                                >
                                  {Country}
                                </div>
                              </>
                            );
                          })}
                        </section>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
          <Col lg={7} md={7} sm={7}>
            <section className={styles["RightBoxDashboard"]}></section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GlobalAdminDashboard;
