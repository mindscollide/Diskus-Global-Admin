import React from "react";
import styles from "./CreatePackageModal.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { packageCreateOpenModal } from "../../store/ActionsSlicers/UIModalsActions";
import CrossIcon from "../../assets/images/OutletImages/Cross-Chat-Icon.png";
import { Button, TextField, Modal } from "../../components/elements";
import { useTranslation } from "react-i18next";
import InputColor from "react-input-color";
import { useState } from "react";

const CreatePackageModal = ({ setPackageNames }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ModalReducer = useSelector((state) => state.modal);
  const [color, setColor] = useState({});
  const [createPackages, setCreatePackages] = useState({
    packageName: "",
  });
  console.log(color.hex, "hdhwevdjhev");

  const handleClose = () => {
    dispatch(packageCreateOpenModal(false));
    setCreatePackages({
      ...createPackages,
      packageName: "",
    });
  };

  const handleOnchange = (e) => {
    let { name, value } = e.target;

    if (name === "CreatePackageName") {
      setCreatePackages({
        ...createPackages,
        packageName: value,
      });
    }
  };

  const addHandler = () => {
    let getPackage = createPackages.packageName;
    let getColor = color.hex.slice(0, 7);
    setPackageNames((packagesData) => {
      const newData = {
        name: getPackage, // Assuming getPackage is a function that returns the name
        colorCode: getColor.toUpperCase(), // Assuming getColor is a function that returns the color code
      };

      return [...packagesData, newData];
    });

    handleClose();
  };

  return (
    <>
      <Modal
        show={ModalReducer.createPackageModal}
        onHide={handleClose}
        closeButton={false}
        modalBodyClassName={styles["modalBody-class-Name"]}
        modalHeaderClassName={styles["modalHeaderClassName-CreatePackage"]}
        modalFooterClassName={styles["modalFooterClassName-CreatePackage"]}
        className="TrialRenewClass"
        centered
        size={"lg"}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end"
              >
                <img
                  height="10px"
                  width="10px"
                  src={CrossIcon}
                  className={styles["Cross-X"]}
                  onClick={handleClose}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-2">
                <span className={styles["CreatePackage-heading"]}>
                  {t("Create-new-package")}
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6} md={6} sm={6} className={styles["flex-columns"]}>
                <label className={styles["title-Textfield-CreatePackage"]}>
                  {t("Package-name")}
                </label>
                <TextField
                  placeholder={t("Package-name")}
                  value={createPackages.packageName}
                  name="CreatePackageName"
                  labelClass="d-none"
                  change={handleOnchange}
                />
              </Col>
              <Col lg={6} md={6} sm={6} className="mt-3">
                <div className={styles["color-input-border"]}>
                  <span className={styles["package-color-text"]}>
                    {t("Package-color")}
                  </span>
                  <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="right"
                    className={styles["input-color"]}
                  />
                  <div backgroundColor={color.rgba} />
                </div>
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-end gap-3"
              >
                <Button
                  text={t("Cancel")}
                  className={styles["cancelButton-CreatePackage"]}
                  onClick={handleClose}
                />
                <Button
                  text={t("Add")}
                  className={styles["Add-Package"]}
                  onClick={addHandler}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default CreatePackageModal;
