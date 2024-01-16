import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <>
      <Row className="sidebar-row">
        <Col
          sm={2}
          className={
            // ? "justify-content-start align-items-start admin-width"
            "diskus-sidebar m-0 p-0"
          }
        >
          <Nav className="new_sidebar p-0 d-flex justify-content-center  gap-3 align-items-center flex-column">
            {/* <Nav.Link as={Link} to="home" eventKey="link-1">
              <img src={Logo} className="mb-5" />
            </Nav.Link> */}

            <>
              {/* Meeting Menu */}

              <Nav.Link
                as={Link}
                to="Meeting"
                eventKey="link-2"
                className={
                  // "m-0 p-0 iconSidebar-active-sidebar"
                  "m-0 p-0 iconSidebar"
                }
              >
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  draggable="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="28.165"
                    viewBox="0 0 37 28.165"
                  >
                    <path
                      id="Union_1"
                      data-name="Union 1"
                      d="M979.356,547.7H968.775a.326.326,0,0,1-.045,0H967.9a.562.562,0,0,1-.581-.381l-1.4-4.191H958.7a1.825,1.825,0,0,1-1.825-1.821V530.6a1.815,1.815,0,0,1,1.773-1.82h.005l5.81.01a1.819,1.819,0,0,1,1.312.534l2.966,2.96h2.242a1.825,1.825,0,0,1,1.822,1.751h5.131a1.825,1.825,0,0,1,1.823-1.751h2.246l2.976-2.969a1.8,1.8,0,0,1,1.294-.535h5.78a1.824,1.824,0,0,1,1.82,1.82v10.51a1.824,1.824,0,0,1-1.824,1.819h-7.217l-1.459,4.383a.529.529,0,0,1-.546.386h-3.473Zm1.224-1.888h1.295l1.18-3.523a1.818,1.818,0,0,1,1.729-1.244h7.2V530.662H986.3l-2.975,2.97a1.835,1.835,0,0,1-.721.443h4.116a1.823,1.823,0,0,1,1.821,1.725v1.976a1.818,1.818,0,0,1-1.751,1.884l-.071,0h-3.7Zm-14.853-8.032h2.012a1.818,1.818,0,0,1,1.694,1.145l2.759,6.885h6.325l2.759-6.885a1.817,1.817,0,0,1,1.7-1.146h3.675v-1.809H965.733Zm-6.96,3.457h7.2a1.821,1.821,0,0,1,1.73,1.244l1.11,3.328h1.348l-2.46-6.139h-2.031a1.832,1.832,0,0,1-1.828-1.712v-.029l.008-1.962a1.821,1.821,0,0,1,1.756-1.884h2.551a1.832,1.832,0,0,1-.72-.443l-2.969-2.959-5.695-.01Zm26.194-17.252a4.457,4.457,0,1,1,4.457,4.448h0A4.458,4.458,0,0,1,984.961,523.981Zm1.892,0a2.565,2.565,0,1,0,2.565-2.56h0a2.564,2.564,0,0,0-2.563,2.56Zm-29.978,0a4.457,4.457,0,1,1,4.457,4.448h0A4.458,4.458,0,0,1,956.875,523.981Zm1.892,0a2.565,2.565,0,1,0,2.565-2.56h0A2.564,2.564,0,0,0,958.767,523.981Z"
                      transform="translate(-956.875 -519.533)"
                      fill="#fff"
                    />
                  </svg>
                  <span
                    className={
                      // ? "Meeting_Side_bar_Tag_active"
                      "Meeting_Side_bar_Tag"
                    }
                  >
                    {"Meetings"}
                  </span>
                </div>
              </Nav.Link>

              {/* Todo Menu */}
              <Nav.Link
                as={Link}
                to="todolist"
                eventKey="link-3"
                className={
                  // ? "m-0 p-0 iconSidebar-active-sidebar"
                  "m-0 p-0 iconSidebar"
                }
              >
                <div
                  className="d-flex align-items-center flex-column"
                  draggable="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.63"
                    height="30.82"
                    viewBox="0 0 30.63 30.82"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="1"
                        y1="0.167"
                        x2="0.07"
                        y2="0.947"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop offset="0" stopColor="#4adede" />
                        <stop offset="1" stopColor="#6172d6" />
                      </linearGradient>
                    </defs>
                    <path
                      id="Path_1827"
                      data-name="Path 1827"
                      d="M1079.458,542.705l-1.768-1.767a.725.725,0,0,1,0-1.024l0,0,.514-.514a.727.727,0,0,1,1.027,0l.74.741,2.382-2.381a.729.729,0,0,1,1.027,0l.514.515a.725.725,0,0,1,0,1.024l0,0-3.409,3.41a.725.725,0,0,1-1.027,0h0Zm7.227-1.343a.647.647,0,0,1-.55-.71v-.744a.653.653,0,0,1,.539-.724h10.48a.656.656,0,0,1,.552.722v.733a.655.655,0,0,1-.54.724h-10.482Zm-7.227-6.5-1.768-1.77a.725.725,0,0,1,0-1.024l0,0,.514-.514a.727.727,0,0,1,1.027,0l.74.741,2.382-2.381a.729.729,0,0,1,1.027,0l.514.515a.725.725,0,0,1,0,1.024l0,0-3.409,3.41a.725.725,0,0,1-1.027,0h0Zm7.227-1.342a.647.647,0,0,1-.55-.71v-.748a.653.653,0,0,1,.539-.724h10.48a.656.656,0,0,1,.552.722v.733a.657.657,0,0,1-.55.724h0Zm10.315-12.9h-1.63v-.48a1.91,1.91,0,0,0-1.91-1.91h-11.84a1.908,1.908,0,0,0-1.9,1.91v.48h-1.54a5.9,5.9,0,0,0-5.9,5.9v16.63a5.9,5.9,0,0,0,5.9,5.9H1097a5.907,5.907,0,0,0,5.91-5.9v-16.63A5.907,5.907,0,0,0,1097,520.625Zm-14.563-.19h10.216a.518.518,0,0,1,.517.517v1.606a.517.517,0,0,1-.517.517h-10.216a.517.517,0,0,1-.517-.517v-1.606A.518.518,0,0,1,1082.437,520.435Zm18.273,22.72a3.713,3.713,0,0,1-3.71,3.7h-18.82a3.7,3.7,0,0,1-3.7-3.7v-16.63a3.7,3.7,0,0,1,3.7-3.7h1.54v.55a1.9,1.9,0,0,0,1.9,1.9h11.84a1.9,1.9,0,0,0,1.91-1.9v-.55H1097a3.713,3.713,0,0,1,3.71,3.7Z"
                      transform="translate(-1072.28 -518.235)"
                      fill="url(#linear-gradient)"
                    />
                  </svg>
                  <span
                    className={
                      // ? "Meeting_Side_bar_Tag_active_active_todo mt-1"
                      "Meeting_Side_bar_Tag_todo mt-1"
                    }
                  >
                    {"Tasks"}
                  </span>
                </div>
              </Nav.Link>

              {/* Calendar Menu */}
              <Nav.Link
                as={Link}
                to="calendar"
                eventKey="link-5"
                className={
                  // location.pathname === "/DisKus/calendar" ||
                  // ? "m-0 p-0 iconSidebar-active-sidebar"
                  "m-0 p-0 iconSidebar"
                }
              >
                <div
                  className="d-flex align-items-center flex-column"
                  draggable="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.628"
                    height="30.625"
                    viewBox="0 0 30.628 30.625"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="1"
                        y1="0.069"
                        x2="0.079"
                        y2="0.945"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop offset="0" stopColor="#4adede" />
                        <stop offset="1" stopColor="#6172d6" />
                      </linearGradient>
                    </defs>
                    <path
                      id="Group_1258"
                      data-name="Group 1258"
                      d="M1029.42,548.958c.008-.012-.06-.033-.128-.047a5.819,5.819,0,0,1-4.991-4.488c-.041-.167-.073-.333-.107-.5l-.039-.2,0-17.822a.414.414,0,0,0,.054-.164,5.822,5.822,0,0,1,5.268-4.982c.172-.011.348-.015.525-.015s1.3.015,1.3.015l0-.521c0-.2.006-.381-.005-.56a1.156,1.156,0,0,1,.834-1.338l.434.006a1.183,1.183,0,0,1,.784,1.348,4.392,4.392,0,0,0-.008.559l0,.458H1045.6l0-.46c0-.182.007-.36,0-.536a1.185,1.185,0,0,1,.822-1.378l.429.007a1.154,1.154,0,0,1,.787,1.311,5.124,5.124,0,0,0-.008.593l.005.477h1.334a5.817,5.817,0,0,1,5.606,4.294c.06.216.1.435.15.654l.056.271-.005,17.82h0c-.012,0-.032.064-.047.128a5.81,5.81,0,0,1-4.43,4.908c-.187.044-.374.081-.561.118l-.236.046Zm-3.221-5.893a3.757,3.757,0,0,0,3.652,3.848l9.62.005,9.431,0a3.794,3.794,0,0,0,3.835-3.66V529.918H1026.2Zm4.114-20.312a4.078,4.078,0,0,0-3.148,1.257,4.584,4.584,0,0,0-.941,3.661l.018.169H1052.7l.018-.169a4.616,4.616,0,0,0-.951-3.673,4.048,4.048,0,0,0-3.072-1.251,5.459,5.459,0,0,0-.9.076l-.159.027,0,.925c0,.51,0,1.021,0,1.534a1.018,1.018,0,1,1-2.035.012c-.008-.52-.005-1.035,0-1.554l0-.982h-12.258l0,1.2c0,.443,0,.887,0,1.331a1.018,1.018,0,1,1-2.036-.007c0-.238,0-.472,0-.705l0-1.777-.166-.022A6.4,6.4,0,0,0,1030.313,522.753Zm11.219,12.817a.647.647,0,0,1-.55-.71v-.744a.653.653,0,0,1,.538-.724h8.49a.654.654,0,0,1,.551.722v.733a.654.654,0,0,1-.539.724h-8.491Zm-12.353,0a.647.647,0,0,1-.55-.71v-.744a.653.653,0,0,1,.539-.724h8.49a.656.656,0,0,1,.551.722v.733a.654.654,0,0,1-.54.724h-8.491Zm12.353,7.025a.646.646,0,0,1-.55-.71v-.744a.653.653,0,0,1,.538-.724h8.49a.655.655,0,0,1,.551.723v.732a.654.654,0,0,1-.539.724h-8.491Zm-12.353,0a.647.647,0,0,1-.55-.71v-.744a.653.653,0,0,1,.539-.724h8.49a.657.657,0,0,1,.551.723v.732a.654.654,0,0,1-.54.724h-8.491Z"
                      transform="translate(-1024.155 -518.333)"
                      fill="url(#linear-gradient)"
                    />
                  </svg>
                  <span
                    className={
                      // "Meeting_Side_bar_Tag_active"
                      "Meeting_Side_bar_Tag"
                    }
                  >
                    {"Calendar"}
                  </span>
                </div>
              </Nav.Link>

              {/* Note*/}
              <Nav.Link
                as={Link}
                disabled={false}
                to="Notes"
                eventKey="link-4"
                className={
                  // location.pathname === "/DisKus/Notes" ||
                  // location.pathname === "/Diskus/Notes"
                  //   ? "m-0 p-0 iconSidebar-active-sidebar"
                  "m-0 p-0 iconSidebar"
                }
              >
                <div className="d-flex flex-column noteIcon" draggable="false">
                  <svg
                    id="Group_2034"
                    data-name="Group 2034"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.237"
                    height="39.841"
                    viewBox="0 0 35.237 39.841"
                  >
                    {/* <title className="tooltip">Notes </title> */}
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="0.5"
                        x2="0.5"
                        y2="1"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop offset="0" stopColor="#4adede" />
                        <stop offset="1" stopColor="#6172d6" />
                      </linearGradient>
                    </defs>
                    <path
                      id="Path_626"
                      data-name="Path 626"
                      d="M-2698.652-1265.7"
                      transform="translate(2704.536 1299.632)"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="44"
                      fill="url(#linear-gradient)"
                    />
                    <path
                      id="Path_627"
                      data-name="Path 627"
                      d="M-2768.777-1804.2v-2.6a3.285,3.285,0,0,0,3.282-3.281v-23.469a3.285,3.285,0,0,0-3.282-3.281h-23.469a3.285,3.285,0,0,0-3.281,3.281v23.469a3.285,3.285,0,0,0,3.281,3.281v2.6a5.891,5.891,0,0,1-5.884-5.884v-23.469a5.891,5.891,0,0,1,5.884-5.884h23.469a5.891,5.891,0,0,1,5.884,5.884v23.469A5.891,5.891,0,0,1-2768.777-1804.2Z"
                      transform="translate(2798.13 1839.435)"
                      fill="url(#linear-gradient)"
                    />
                    <path
                      id="Path_628"
                      data-name="Path 628"
                      d="M-2696.09-1353.713h-19.288a3.277,3.277,0,0,1-3.274-3.274v-5.262a3.277,3.277,0,0,1,3.274-3.274h19.288a3.277,3.277,0,0,1,3.273,3.274v5.262A3.277,3.277,0,0,1-2696.09-1353.713Zm-19.288-9.443a.909.909,0,0,0-.908.908v5.262a.909.909,0,0,0,.908.907h19.288a.909.909,0,0,0,.908-.907v-5.262a.909.909,0,0,0-.908-.908Z"
                      transform="translate(2723.353 1393.553)"
                      fill="url(#linear-gradient)"
                    />
                    <rect
                      id="Rectangle_830"
                      data-name="Rectangle 830"
                      width="22.914"
                      height="2.366"
                      rx="1.183"
                      transform="translate(5.884 8.173)"
                      fill="url(#linear-gradient)"
                    />
                    <rect
                      id="Rectangle_831"
                      data-name="Rectangle 831"
                      width="13.401"
                      height="2.366"
                      rx="1.183"
                      transform="translate(5.884 13.728)"
                      fill="url(#linear-gradient)"
                    />
                    <rect
                      id="Rectangle_832"
                      data-name="Rectangle 832"
                      width="9.027"
                      height="2.366"
                      rx="1.183"
                      transform="translate(5.884 19.977)"
                      fill="url(#linear-gradient)"
                    />
                  </svg>
                  <span
                    className={
                      // location.pathname === "/DisKus/Notes" ||
                      // location.pathname === "/Diskus/Notes"
                      //   ? "Meeting_Side_bar_Tag_active"
                      "Meeting_Side_bar_Tag"
                    }
                  >
                    {"Notes"}
                  </span>
                </div>
              </Nav.Link>

              {/* Add more btn */}
              <Nav.Link
                disabled={false}
                eventKey="link-6"
                className={
                  // showMore ||
                  // location.pathname === "/DisKus/dataroom" ||
                  // location.pathname === "/DisKus/groups" ||
                  // location.pathname === "/DisKus/committee" ||
                  // location.pathname === "/DisKus/resolution" ||
                  // location.pathname === "/DisKus/polling"
                  //   ? "m-0 p-0 iconSidebar-active-sidebar position-relative"
                  "m-0 p-0 iconSidebar  position-relative"
                }
              >
                <div className="d-flex flex-column" draggable="false">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.718"
                    height="30.721"
                    viewBox="0 0 30.718 30.721"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="0.5"
                        x2="0.5"
                        y2="1"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop offset="0" stopColor="#4adede" />
                        <stop offset="1" stopColor="#6172d6" />
                      </linearGradient>
                    </defs>
                    <g
                      id="Group_3154"
                      data-name="Group 3154"
                      transform="translate(-105.102 -74.249)"
                    >
                      <path
                        id="Path_1849"
                        data-name="Path 1849"
                        d="M283.519,250.144c-.725,0-1.451.012-2.176-.006-.253-.006-.328.052-.325.317.014,1.463.008,2.926.006,4.39a1.14,1.14,0,0,1-.651,1.074,1.094,1.094,0,0,1-1.186-.076,1.17,1.17,0,0,1-.525-1.037c0-1.439-.009-2.877.01-4.316,0-.3-.092-.353-.366-.351-1.414.013-2.828.008-4.242.006a1.186,1.186,0,1,1-.015-2.361c1.426,0,2.853-.008,4.279.006.269,0,.347-.053.344-.336-.017-1.463-.013-2.926,0-4.39a1.177,1.177,0,0,1,2.32-.29,1.814,1.814,0,0,1,.038.438c0,1.414.011,2.828-.006,4.242,0,.285.078.337.345.335,1.414-.014,2.828-.008,4.242-.006a1.188,1.188,0,1,1,.018,2.361C284.921,250.145,284.22,250.144,283.519,250.144Z"
                        transform="translate(-151.114 -151.087)"
                        fill="url(#linear-gradient)"
                      />
                      <path
                        id="Path_1850"
                        data-name="Path 1850"
                        d="M119.286,81.34c0-1.143,0-2.287,0-3.43a3.537,3.537,0,0,0-3.645-3.656q-3.449-.009-6.9,0a3.535,3.535,0,0,0-3.629,3.635q-.009,3.449,0,6.9a3.535,3.535,0,0,0,3.626,3.638q3.449.011,6.9,0a3.538,3.538,0,0,0,3.648-3.654C119.289,83.627,119.286,82.483,119.286,81.34Zm-3.731,4.724H112.2q-1.7,0-3.393,0a1.2,1.2,0,0,1-1.332-1.313q0-3.411,0-6.822a1.192,1.192,0,0,1,1.33-1.313q3.393,0,6.785,0a1.2,1.2,0,0,1,1.333,1.349q0,3.374,0,6.748A1.206,1.206,0,0,1,115.555,86.064Z"
                        transform="translate(-0.006 0)"
                        fill="url(#linear-gradient)"
                      />
                      <path
                        id="Path_1851"
                        data-name="Path 1851"
                        d="M286.9,77.905a3.535,3.535,0,0,0-3.655-3.646q-3.43-.008-6.861,0a3.54,3.54,0,0,0-3.656,3.646c0,1.144,0,2.287,0,3.43s0,2.311,0,3.467a3.538,3.538,0,0,0,3.637,3.628q3.449.009,6.9,0A3.533,3.533,0,0,0,286.9,84.8Q286.915,81.354,286.9,77.905Zm-2.362,6.849a1.2,1.2,0,0,1-1.33,1.315q-3.393,0-6.785,0a1.2,1.2,0,0,1-1.333-1.35q0-3.374,0-6.749a1.2,1.2,0,0,1,1.33-1.35q3.393,0,6.785,0a1.2,1.2,0,0,1,1.334,1.348q0,1.7,0,3.393C284.543,82.493,284.545,83.623,284.543,84.754Z"
                        transform="translate(-151.089 -0.006)"
                        fill="url(#linear-gradient)"
                      />
                      <path
                        id="Path_1852"
                        data-name="Path 1852"
                        d="M119.278,245.516a3.537,3.537,0,0,0-3.656-3.646c-1.143,0-2.287,0-3.43,0s-2.311-.005-3.467,0a3.535,3.535,0,0,0-3.617,3.61q-.012,3.467,0,6.934a3.536,3.536,0,0,0,3.637,3.627q3.449.009,6.9,0a3.534,3.534,0,0,0,3.636-3.628Q119.289,248.965,119.278,245.516Zm-3.747,8.165h-3.356q-1.678,0-3.356,0a1.2,1.2,0,0,1-1.351-1.331q0-3.393,0-6.785a1.2,1.2,0,0,1,1.348-1.332q3.374,0,6.749,0a1.207,1.207,0,0,1,1.352,1.367q0,3.356,0,6.712A1.211,1.211,0,0,1,115.531,253.681Z"
                        transform="translate(0 -151.081)"
                        fill="url(#linear-gradient)"
                      />
                    </g>
                  </svg>
                  <span
                    className={
                      // showMore ||
                      // location.pathname === "/DisKus/dataroom" ||
                      // location.pathname === "/DisKus/groups" ||
                      // location.pathname === "/DisKus/committee" ||
                      // location.pathname === "/DisKus/resolution" ||
                      // location.pathname === "/DisKus/polling"
                      //   ? "Meeting_Side_bar_Tag_active"
                      "Meeting_Side_bar_Tag"
                    }
                  >
                    {"More"}
                  </span>
                </div>

                {/* {showMore ? (
                  <>
                    <section className="expanded_menu">
                      <ExpandedMenu />
                    </section>
                  </>
                ) : null} */}
              </Nav.Link>
            </>
          </Nav>
        </Col>
        <Col sm={11} className={""}></Col>
      </Row>
    </>
  );
};

export default Sidebar;
