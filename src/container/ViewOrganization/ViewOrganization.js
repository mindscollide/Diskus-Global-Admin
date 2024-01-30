import React, { useState } from "react";
import styles from "./ViewOrganization.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Table, TextField } from "../../components/elements";
import SearchIcon from "../../assets/images/OutletImages/searchicon.svg";
const ViewOrganization = () => {
  const { t } = useTranslation();

  const [searchBox, setSearchBox] = useState(false);

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
                    ></Col>
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
