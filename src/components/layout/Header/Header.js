import React from "react";
import { Nav, Navbar, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DiskusNotificationIcon from "../../../assets/images/DiskusLogo/Diskus-notification_icon.svg";
import DiskusLogoHeader from "../../../assets/images/DiskusLogo/diskus_newheader.svg";
import Profilepicture from "../../../assets/images/OutletImages/newprofile.png";
import "./Header.css";
import LanguageSelector from "../../elements/languageSelector/Language-selector";
import Changepassword from "../../../container/NavBarSelectorsModals/ChangePasswordModal/Changepassword";
import {
  ChangePasswordModalOpen,
  userConifrmationOpenModal,
  userInfoOpenModal,
} from "../../../store/ActionsSlicers/UIModalsActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { GlobalAdminLogOutApi } from "../../../store/Actions/AuthActions";
import UserProfileModal from "../../../container/userInformationModal/UserInfoModal";
import UserConfirmationModal from "../../../container/userConfirmationModal/UserConfirmationModal";
import { getUserInfoMainApi } from "../../../store/Actions/GlobalAdminDashboardActions";
import { globalAdminDashBoardLoader } from "../../../store/ActionsSlicers/GlobalAdminDasboardSlicer";
const Header = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePasswordModal = () => {
    dispatch(ChangePasswordModalOpen(true));
  };

  const handleUserModal = () => {
    dispatch(userInfoOpenModal(true));
    dispatch(globalAdminDashBoardLoader(true));
    dispatch(getUserInfoMainApi({ navigate, t }));
  };

  const handleDashboard = () => {
    navigate("/GlobalAdmin/");
  };

  const handleLogout = () => {
    dispatch(GlobalAdminLogOutApi({ navigate, t }));
  };

  return (
    <>
      <Navbar className="header2-container" sticky="top">
        <section className="d-flex justify-content-between w-100  align-items-center px-5">
          <Navbar.Brand>
            <img
              src={DiskusLogoHeader}
              alt=""
              width={120}
              draggable="false"
              className="pointerClass"
              onClick={handleDashboard}
            />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center">
            <LanguageSelector />
            <Dropdown className="profilebtn-dropdown">
              <Dropdown.Toggle className="dropdown-toggle">
                <img
                  src={Profilepicture}
                  className="user-img me-3 "
                  width={30}
                  alt=""
                  draggable="false"
                />
                <p className={"user-name me-2"}>SAIF UL ISLAM</p>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown_menu_admin">
                <Dropdown.Item className={" text-black"}>
                  <Nav.Link
                    // as={Link}
                    to="CustomerInformation"
                    className="text-black"
                    onClick={handleUserModal}
                  >
                    {t("User-information")}
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item className={" text-black"}>
                  <Nav.Link
                    // as={Link}
                    // to="changePassword"
                    className="text-black"
                    onClick={handleChangePasswordModal}
                  >
                    {t("Change-password")}
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Nav.Link
                    className="SignOutOptionMenu text-black border-none"
                    onClick={handleLogout}
                  >
                    {t("Logout")}
                  </Nav.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </section>
      </Navbar>
      <Changepassword />
      <UserProfileModal />
      {/* <UserConfirmationModal /> */}
    </>
  );
};

export default Header;
