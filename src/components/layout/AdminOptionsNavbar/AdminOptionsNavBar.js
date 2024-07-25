import React, { useState } from "react";
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavbarAdmin.css";
import { useTranslation } from "react-i18next";
import { ModalIsOpen } from "../../../store/ActionsSlicers/UIModalsActions";
import { useDispatch, useSelector } from "react-redux";
import UserLoginHistoryModal from "../../../container/NavBarSelectorsModals/UserLoginHistoryModal/UserLoginHistoryModal";
import UserHistoryConfirmationModal from "../../../container/NavBarSelectorsModals/UserLoginHistoryModal/UserLoginConfirmationModal/UserHistoryConfirmationModal";
const AdminOptionsNavBar = () => {
  const { t } = useTranslation();
  const ModalReducer = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(
    t("Organization-level-configurations")
  );

  // for show select dropdown in navbar
  const selectHandler = (selectedDropdown) => {
    setSelectedItem(selectedDropdown);
  };

  const handleOpenModal = () => {
    dispatch(ModalIsOpen(true));
  };

  return (
    <>
      <Nav className=" m-0 p-0 d-flex justify-content-center flex-column ">
        <>
          <Navbar collapseOnSelect expand="lg" className="adminNavbar">
            <Container className="containerAd">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto d-flex justify-content-evenly w-100 py-1">
                  <Nav.Link
                    as={Link}
                    to="Summary"
                    className="DiskusAdminNavBar"
                    id="collasible-nav-dropdown"
                  >
                    {t("Summary")}
                  </Nav.Link>
                  <NavDropdown
                    title={t("Organizations")}
                    id="collasible-nav-dropdown"
                    className="DiskusAdminNavBar"
                  >
                    {/* <NavDropdown.Item
                      as={Link}
                      to="vieworganization"
                      eventKey="link-7"
                      className="text-black border-none"
                    >
                      {t("View-organization")}
                    </NavDropdown.Item> */}
                    <NavDropdown.Item
                      as={Link}
                      to="ViewOrganizations"
                      eventKey="link-7"
                      className="text-black border-none"
                    >
                      {t("View-organizations")}
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* Pakages Global Admin page Link */}
                  <Nav.Link
                    as={Link}
                    to="Pakages"
                    eventKey="link-8"
                    className="DiskusAdminNavBar"
                  >
                    {t("Packages")}
                  </Nav.Link>

                  <NavDropdown
                    title={t("Configurations")}
                    id="collasible-nav-dropdown"
                    className={"DiskusAdminNavBar"}
                    // onSelect={selectHandler}
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="OrganizationLevelSettings"
                      eventKey={t("Organization-level-configurations")}
                      className="text-black border-none"
                    >
                      {t("Organization-level-configurations")}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="GlobalLevelSettings"
                      eventKey={t("Global-level-configuration")}
                      className="text-black border-none "
                    >
                      {t("Global-level-configuration")}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title={t("Reports")}
                    id="collasible-nav-dropdown"
                    className="DiskusAdminNavBar"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="loginHistory"
                      // onClick={handleOpenModal}
                      eventKey="link-8"
                      className="text-black border-none  bg-white"
                    >
                      {t("User-login-history")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      </Nav>
      <UserLoginHistoryModal />
      <UserHistoryConfirmationModal />
    </>
  );
};

export default AdminOptionsNavBar;
