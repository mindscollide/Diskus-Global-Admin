import React from "react";
import styles from "./PakagesGlobalAdmin.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import GoldPackage from "../../assets/images/OutletImages/Gold-Package.png";
import SilverPackage from "../../assets/images/OutletImages/Silver-Package.png";
import PremiunPackage from "../../assets/images/OutletImages/Premium-Package.png";
import { InputNumber } from "antd";
import Select from "react-select";
import { useState } from "react";
import crossIcon from "../../assets/images/OutletImages/Artboard 9.png";
import { packageCreateOpenModal } from "../../store/ActionsSlicers/UIModalsActions";
import { useDispatch } from "react-redux";
import CreatePackageModal from "../CreatePackageModal/CreatePackageModal";

const PakagesGlobalAdmin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // state for select dropdown
  const [selectedOptions, setSelectedOptions] = useState([]);

  // state for packages name
  const [packageNames, setPackageNames] = useState([
    { name: t("Essential"), colorCode: "#CCCCCC" },
  ]);
  console.log(packageNames, "packageNamespackageNamespackageNames");

  //handler for Select dropdown
  const handleSelectChange = (selectedOption) => {
    setSelectedOptions([...selectedOptions, selectedOption]);
  };

  // To remove selected Options
  const removeSelectedOption = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
  };

  // to open Add Package Modal
  const openAddPackageModal = () => {
    dispatch(packageCreateOpenModal(true));
  };

  //Remove Main Packages handler
  const removeMainPackage = (index) => {
    const updatedOptions = [...packageNames];
    updatedOptions.splice(index, 1);
    setPackageNames(updatedOptions);
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col lg={10} md={10} sm={10}>
            <Row className="mt-2">
              <Col>
                <div className={styles["Specific-width-scroller"]}>
                  {packageNames.map((pkg, index) => {
                    console.log(pkg, "pkgpkgpkg");
                    let colorCode = pkg.colorCode;
                    return (
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card className={styles["packagecard"]}>
                            <>
                              <span className="icon-star package-icon-style">
                                <span
                                  className="path1"
                                  style={{
                                    color: colorCode,
                                  }}
                                ></span>
                                <span
                                  className="path2"
                                  style={{
                                    color: colorCode,
                                  }}
                                ></span>
                                <span
                                  style={{
                                    color: colorCode,
                                  }}
                                  className="path3"
                                ></span>
                              </span>
                              <h3 className={styles["package-card-title"]}>
                                {pkg.name}
                              </h3>{" "}
                            </>
                            <span className={styles["InputNumber-class"]}>
                              <InputNumber
                                min={0}
                                size="small"
                                defaultValue={0}
                              />
                              <p className={styles["month-year-text"]}>
                                $ / month
                              </p>
                            </span>
                            <span className={styles["InputNumber-class-two"]}>
                              <InputNumber
                                min={0}
                                size="small"
                                defaultValue={0}
                              />
                              <p className={styles["month-year-text"]}>
                                $ / Yearly
                              </p>
                            </span>

                            <div>
                              <Row>
                                <Col lg={12} md={12} sm={12} className="mt-4">
                                  <Select
                                    onChange={handleSelectChange}
                                    options={[
                                      { value: "mango", label: "Mango" },
                                      {
                                        value: "strawberry",
                                        label: "Strawberry",
                                      },
                                      { value: "banana", label: "Banana" },
                                      { value: "orange", label: "Orange" },
                                    ]}
                                  />
                                  <div
                                    className={
                                      styles["selected-options-container"]
                                    }
                                  >
                                    {selectedOptions.map((option, index) => (
                                      <div
                                        key={index}
                                        className={
                                          styles["selected-option-box"]
                                        }
                                      >
                                        {option.label}
                                        <img
                                          width="15px"
                                          height="15px"
                                          src={crossIcon}
                                          className={styles["cross-icon"]}
                                          onClick={() =>
                                            removeSelectedOption(index)
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </Col>
                              </Row>
                            </div>

                            <div className={styles["card-cross-icon"]}>
                              <img
                                width="25px"
                                height="25px"
                                src={crossIcon}
                                onClick={() => removeMainPackage(index)}
                              />
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={2} md={2} sm={2}>
            <span
              className={styles["create-border"]}
              onClick={openAddPackageModal}
            >
              <span className={styles["Plus-Icon"]}>+</span>
              <br />
              <span className={styles["create-heading"]}>
                {t("Create-new-package")}
              </span>
            </span>
          </Col>
        </Row>
      </Container>
      <CreatePackageModal
        setPackageNames={setPackageNames}
        // setPackageColor={setPackageColor}
      />
    </>
  );
};

export default PakagesGlobalAdmin;
