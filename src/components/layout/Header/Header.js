import React from "react";
import { Nav, Navbar, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DiskusNotificationIcon from "../../../assets/images/DiskusLogo/Diskus-notification_icon.svg";
import DiskusLogoHeader from "../../../assets/images/DiskusLogo/diskus_newheader.svg";
import Profilepicture from "../../../assets/images/OutletImages/newprofile.png";
import "./Header.css";
import LanguageSelector from "../../elements/languageSelector/Language-selector";
const Header = () => {
  return (
    <>
      <Navbar className="header2-container" sticky="top">
        <section className="d-flex justify-content-between w-100  align-items-center px-5">
          <Navbar.Brand>
            <img src={DiskusLogoHeader} alt="" width={120} draggable="false" />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center">
            <LanguageSelector />
            <Nav.Link className="me-2">
              <div className="dropdown-btn_dotted">
                <DropdownButton
                  id="dropdown-btn_dotted"
                  className="dropdown-btn_dotted"
                  title={
                    <img
                      src={DiskusNotificationIcon}
                      alt=""
                      width={28}
                      draggable="false"
                    />
                  }
                >
                  <Dropdown.Item className="d-flex title-className">
                    <span>{"Quick-meeting"}</span>
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex title-className">
                    {"Upload-document"}
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex title-className">
                    {"Recently-added-files"}
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </Nav.Link>
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
                    as={Link}
                    to="CustomerInformation"
                    className="text-black"
                  >
                    {"User Information"}
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item className={" text-black"}>
                  <Nav.Link
                    as={Link}
                    to="changePassword"
                    className="text-black"
                  >
                    {"Change password"}
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Nav.Link className="SignOutOptionMenu text-black border-none">
                    {"Logout"}
                  </Nav.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </section>
      </Navbar>
    </>
  );
};

export default Header;
