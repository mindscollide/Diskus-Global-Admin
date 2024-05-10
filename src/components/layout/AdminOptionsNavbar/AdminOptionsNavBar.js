import React from "react";
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
                  <NavDropdown
                    title={t("Organization")}
                    id="collasible-nav-dropdown"
                    className="DiskusAdminNavBar"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="vieworganization"
                      eventKey="link-7"
                      className="text-black border-none"
                    >
                      {t("View-organization")}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={t("Pakages")}
                    id="collasible-nav-dropdown"
                    className="DiskusAdminNavBar"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="AllMeeting"
                      eventKey="link-8"
                      className="text-black border-none"
                    >
                      {t("All-meeting")}
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={t("Global-configurations")}
                    id="collasible-nav-dropdown"
                    className="DiskusAdminNavBar"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to="OrganizationLevelSettings"
                      eventKey="link-8"
                      className="text-black border-none "
                    >
                      {t("Organization-level-configurations")}
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="setting"
                      eventKey="link-8"
                      className="text-black border-none "
                    >
                      {t("User-level-configurations")}
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
