import React from "react";
import styles from "./PakagesGlobalAdmin.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const PakagesGlobalAdmin = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Row className="mt-2">
        <Col lg={4} md={4} sm={4}>
          <Card className={styles["packagecard"]}>
            <Row>
              <Col sm={12}>
                {/* {GetSubscriptionPackage.getCurrentActiveSubscriptionPackage !== */}
                {/* null && */}
                {/* GetSubscriptionPackage.getCurrentActiveSubscriptionPackage !== */}

                <>
                  {/* <img
                        className={styles["package-icon"]}
                        src={GoldPackage}
                        alt=""
                      /> */}
                  <span class="icon-star package-icon-style">
                    <span
                      class="path1"
                      //   style={{ color: packageColorPath1 }}
                    ></span>
                    <span
                      class="path2"
                      //   style={{ color: packageColorPath2 }}
                    ></span>
                    <span
                      class="path3"
                      //   style={{ color: packageColorPath2 }}
                    ></span>
                  </span>
                  <h3 className={styles["packageCard_title"]}>
                    {/* {isPackageDetail.PackageTitle} */}
                  </h3>{" "}
                </>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PakagesGlobalAdmin;
