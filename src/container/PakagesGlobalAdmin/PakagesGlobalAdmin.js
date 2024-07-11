import React, { useEffect } from "react";
import styles from "./PakagesGlobalAdmin.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { InputNumber } from "antd";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../assets/images/OutletImages/Artboard 9.png";
import {
  deletePackageOpenModal,
  packageCreateOpenModal,
} from "../../store/ActionsSlicers/UIModalsActions";
import { useDispatch, useSelector } from "react-redux";
import CreatePackageModal from "../CreatePackageModal/CreatePackageModal";
import { Button } from "../../components/elements";
import DeletePackageModal from "../DeletePackageModal/DeletePackageModal";
import {
  deletePackageFeatureApi,
  getAllPackageApi,
  getPackageFeaturesApi,
  addPackageFeatureApi,
  addUpdatePackagesMainApi,
} from "../../store/Actions/PackageAction";
import { packageAdminLoader } from "../../store/ActionsSlicers/PackageSlicer";
import { globalAdminDashBoardLoader } from "../../store/ActionsSlicers/GlobalAdminDasboardSlicer";

const PakagesGlobalAdmin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // call reducer of get ALl package Reducer
  const packagesFeaturesGlobalData = useSelector(
    (state) => state.packageAdminReducer.packagesFeaturesGlobalData
  );
  console.log(
    packagesFeaturesGlobalData?.result?.featuresGlobalAdmin,
    "packagesFeaturesGlobalData"
  );

  // call reducer of get ALL Package Feature Api
  const getPackageFeatureData = useSelector(
    (state) => state.packageAdminReducer.getPackageFeatureData
  );

  const addPackageFeaturesData = useSelector(
    (state) => state.packageAdminReducer.addPackageFeaturesData
  );

  console.log(
    getPackageFeatureData?.result?.packageFeatures,
    "getPackageFeatureDatagetPackage"
  );

  // dropdown of package Feature in dropdown states
  const [packageFeature, setPackageFeature] = useState([]);
  const [packageFeatureValue, setPackageFeatureValue] = useState(null);
  const [selectedPackageFeatures, setSelectedPackageFeatures] = useState({});

  // set state for package Id for deletion
  const [packageIDToDelete, setPackageIDToDelete] = useState(null);
  const [isDatafromApi, setIsDataFromApi] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  console.log(allPackages, "allPackagesallPackages");

  // useEffect for calling getAllPackageApi
  useEffect(() => {
    // dispatch(packageAdminLoader(true));
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getAllPackageApi({ navigate, t }));
    dispatch(getPackageFeaturesApi({ navigate, t }));
  }, []);

  // useEffect for dropdown Package Features
  useEffect(() => {
    if (
      getPackageFeatureData &&
      getPackageFeatureData.result !== null &&
      getPackageFeatureData?.result !== undefined &&
      getPackageFeatureData?.result?.packageFeatures.length > 0
    ) {
      setPackageFeature(
        getPackageFeatureData.result.packageFeatures.map((item) => ({
          value: item.pK_PackageFeatureID,
          label: item.name,
        }))
      );
    }
  }, [getPackageFeatureData]);

  // this is how I store data of main Packages in reducer from useEffect
  useEffect(() => {
    if (
      packagesFeaturesGlobalData?.result?.featuresGlobalAdmin &&
      packagesFeaturesGlobalData?.result.badgeColor !== ""
    ) {
      // newResponseData check if the isApiComing Data is true it means data coming from backend
      // if newResponseData isApiComing Data is false it means data coming from frontend
      let newResponseData =
        packagesFeaturesGlobalData?.result?.featuresGlobalAdmin.map(
          (data, index) => {
            return {
              ...data,
              isApiComing: true,
            };
          }
        );

      const filteredPackages = newResponseData.filter(
        (pkg, index, self) =>
          index === self.findIndex((p) => p.packageName === pkg.packageName)
      );

      setAllPackages(filteredPackages);
    }
  }, [packagesFeaturesGlobalData]);

  //handler for Select dropdown
  const handleSelectChange = (selectedFeature, packageID) => {
    setAllPackages((prevAllPackage) =>
      prevAllPackage.map((packageData) => {
        if (packageData.packageID === packageID) {
          const isFeatureAlreadySelected = packageData.packageFeatures.some(
            (feature) => feature.pK_PackageFeatureID === selectedFeature.value
          );

          if (!isFeatureAlreadySelected) {
            return {
              ...packageData,
              packageFeatures: [
                ...packageData.packageFeatures,
                {
                  name: selectedFeature.label,
                  pK_PackageFeatureID: selectedFeature.value,
                  packageID: packageID,
                },
              ],
            };
          }
        }
        return packageData;
      })
    );
    //    setSelectedPackageFeatures((prevSelected) => ({
    //   ...prevSelected,
    //   [packageID]: null,
    // }));
  };

  // to open Add Package Modal
  const openAddPackageModal = () => {
    dispatch(packageCreateOpenModal(true));
  };

  //To Open Delete Modal In Cross Icon and send packageID to setPackageIDToDelete
  const openDeleteModal = (packageID, isApiComing) => {
    setPackageIDToDelete(packageID);
    setIsDataFromApi(isApiComing);
    dispatch(deletePackageOpenModal(true));
  };

  //Remove Main Packages handler
  const removeMainPackage = (packageId) => {
    setAllPackages((prev) =>
      prev.filter((newData, _) => newData.packageID !== packageId)
    );
  };

  // To remove selected Options
  const removeSelectedOption = (pkgID, optionIndex) => {
    console.log(pkgID, optionIndex, "pkgIDoptionIndex");
    setAllPackages((prevData) =>
      prevData.map((packageData) => {
        console.log(packageData, "packageDatapackageData");
        if (packageData.packageID === pkgID) {
          return {
            ...packageData,
            packageFeatures: packageData.packageFeatures.filter(
              (_, index) => index !== optionIndex
            ),
          };
        }
        return packageData;
      })
    );
  };

  // Update price Monthly handlers on Counter
  const handleMonthlyPriceChange = (value, packageID) => {
    setAllPackages((prevAllPackages) =>
      prevAllPackages.map((packageData) => {
        if (packageData.packageID === packageID) {
          return {
            ...packageData,
            price: value,
            yearlyPrice: value * 12,
          };
        }
        return packageData;
      })
    );
  };

  // Update price Yearly handlers on Counter
  const handleYearlyPriceChange = (value, packageID) => {
    setAllPackages((prevAllPackages) =>
      prevAllPackages.map((packageData) => {
        if (packageData.packageID === packageID) {
          return {
            ...packageData,
            yearlyPrice: value,
          };
        }
        return packageData;
      })
    );
  };

  // Update Button handler
  const updateHandler = () => {
    const packagesForApi = allPackages.map((pkg) => {
      console.log(pkg, "pkgpkgpkgpkg");
      return {
        PK_PackageID: pkg.isApiComing === true ? pkg.packageID : 0,
        Name: pkg.packageName,
        Description: "Testing New Package II",
        Price: pkg.price,
        AvailableForSubscription: true,
        AvailableForExtension: true,
        FK_PackageTypeID: 1, // Mapping packageID to FK_PackageTypeID
        ApplicableTaxPercentage: 15,
        LateFeesApplicableDays: 5,
        LateFeesToBeCharged: 20,
        FirstYearDiscountPercentage: 10,
        YearlyPurchaseDiscountPercentage: 10,
        SubscriptionDurationInDays: 30,
        SetupChargesIfAny: 10,
        BadgeColor: pkg.badgeColor,
        PackageFeatures: pkg.packageFeatures.map((feature) => ({
          FK_PackageFeatureID: feature.pK_PackageFeatureID,
          IsVisible: true,
        })),
      };
    });
    const data = {
      Packages: packagesForApi,
    };
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(addUpdatePackagesMainApi({ data, navigate, t }));
  };

  // Delete Main Package
  const deletePackageCard = () => {
    if (isDatafromApi === true) {
      setAllPackages((prevState) =>
        prevState.map((newData, index) => {
          if (Number(newData.packageID) === Number(packageIDToDelete)) {
            return {
              ...newData,
              badgeColor: "",
            };
          }
          return newData;
        })
      );
      dispatch(deletePackageOpenModal(false));
    } else {
      setAllPackages((prevState) =>
        prevState.filter(
          (newData, index) =>
            Number(newData.packageID) !== Number(packageIDToDelete)
        )
      );
      dispatch(deletePackageOpenModal(false));
    }
  };

  // For disable already selected Option
  const isOptionDisabled = (option, packageID) => {
    console.log(option, packageID, "ajvajvadjvajvdajsdv");
    // this variable compare selected packageId and current PackageID
    const packageData = allPackages.find((pkg) => pkg.packageID === packageID);
    // isme saray selected packageFeatures hai
    if (packageData) {
      // agar package Id same hai to check karou ka feature already selected hai ya nahi agar selected hai tou IsDisabled krdou
      return packageData.packageFeatures.some(
        (feature) => feature.pK_PackageFeatureID === option.value
      );
    }
    return false;
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col lg={10} md={10} sm={10}>
            <Row className="mt-2">
              <Col>
                <div className={styles["Specific-width-scroller"]}>
                  {allPackages.map((pkg, index) => {
                    let colorCode = pkg.badgeColor ? pkg.badgeColor : "";
                    if (colorCode !== "") {
                      return (
                        <Row key={index}>
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
                                  {pkg.packageName}
                                </h3>{" "}
                              </>
                              <span className={styles["InputNumber-class"]}>
                                <InputNumber
                                  min={0}
                                  size="small"
                                  value={pkg.price}
                                  onChange={(value) =>
                                    handleMonthlyPriceChange(
                                      value,
                                      pkg.packageID
                                    )
                                  }
                                />
                                <p className={styles["month-year-text"]}>
                                  $ / month
                                </p>
                              </span>
                              <span className={styles["InputNumber-class-two"]}>
                                <InputNumber
                                  min={0}
                                  size="small"
                                  disabled={true}
                                  value={pkg.yearlyPrice || pkg.price * 12}
                                  onChange={(value) =>
                                    handleYearlyPriceChange(
                                      value,
                                      pkg.packageID
                                    )
                                  }
                                />
                                <p className={styles["month-year-text"]}>
                                  $ / Yearly
                                </p>
                              </span>
                              <div>
                                <Row>
                                  <Col lg={12} md={12} sm={12} className="mt-4">
                                    <Select
                                      onChange={(selectedFeature) =>
                                        handleSelectChange(
                                          selectedFeature,
                                          pkg.packageID
                                        )
                                      }
                                      isSearchable={true}
                                      value={
                                        selectedPackageFeatures[pkg.packageID]
                                      }
                                      options={packageFeature}
                                      isOptionDisabled={(option) =>
                                        isOptionDisabled(option, pkg.packageID)
                                      }
                                      className="Select-type"
                                      maxMenuHeight={200}
                                      placeholder="Search Features"
                                    />
                                    <div
                                      className={
                                        styles["selected-options-container"]
                                      }
                                    >
                                      {pkg.packageFeatures.length > 0 &&
                                        pkg.packageFeatures.map(
                                          (option, optionIndex) => {
                                            console.log(option, "option");
                                            return (
                                              <div
                                                key={option.pK_PackageFeatureID}
                                                className={
                                                  styles["selected-option-box"]
                                                }
                                              >
                                                {option.name}
                                                <img
                                                  width="15px"
                                                  height="15px"
                                                  src={crossIcon}
                                                  className={
                                                    styles["cross-icon"]
                                                  }
                                                  onClick={() =>
                                                    removeSelectedOption(
                                                      pkg.packageID,
                                                      optionIndex
                                                    )
                                                  }
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className={styles["card-cross-icon"]}>
                                <img
                                  width="25px"
                                  height="25px"
                                  src={crossIcon}
                                  onClick={() =>
                                    openDeleteModal(
                                      pkg.packageID,
                                      pkg.isApiComing
                                    )
                                  }
                                />
                              </div>
                            </Card>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                  <div>
                    <span
                      className={styles["create-border"]}
                      onClick={openAddPackageModal}
                    >
                      <span className={styles["Plus-Icon"]}>+</span>
                      <br />
                      <span className={styles["create-heading"]}>
                        {t("create")}
                        <br />
                        {t("New-Package")}
                      </span>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center mt-3 mb-2"
          >
            <Button
              text={t("Update")}
              className={styles["update-class-btn"]}
              onClick={updateHandler}
            />
          </Col>
        </Row>
      </Container>
      <CreatePackageModal
        setNewPackageNames={setAllPackages}
        allPackages={allPackages}
      />
      <DeletePackageModal
        packageID={packageIDToDelete}
        removeMainPackage={removeMainPackage}
        onClickDelete={deletePackageCard}
      />
    </>
  );
};

export default PakagesGlobalAdmin;
