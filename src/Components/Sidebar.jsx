import React, { useContext, useState } from "react";
import "./Styles/Sidebar.scss";
import logo from "./../Assets/albion logo.png";
import logo1 from "./../Assets/logo.png";
import logo2 from "./../Assets/logo2.png";
import logo3 from "./../Assets/logo.png";
import { MdOutlineReport } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaUsers, FaBuilding, FaUserAlt, FaUserClock } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { GiKnightBanner } from "react-icons/gi";
import { FaBlog } from "react-icons/fa6";
import { Button, Tooltip } from "antd";
import { AppContext } from "../App";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function Sidebar(props) {
  // const [selectedColumn, setSelectedColumn] = useState(
  //   props.activeColumn ? props.activeColumn : 1
  // );
  const selectedColumn = window.location.pathname.split("/")[1];
  // console.log(window.location.pathname.split("/"),"selectedColumn")
  // const [hideBar, setHideBar] = useState(false);
  // const [propertyDropDown, setPropertyDropDown] = useState(false);
  const [propertyFilterHover, setPropertyFilterHover] = useState(0);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const { theme, updateTheme } = useContext(AppContext);
  const navigate = useNavigate();

  function Logout() {
    Cookies.remove("userLoggedIn");
    navigate("/login");
  }

  return (
    <div
      className={hideBar ? "sidebar2" : "sidebar"}
      style={{
        backgroundColor: theme && "#8C193F",
        // background:" rgb(140,25,63)";
        background: theme && "background-color : #8C193F",
      }}
    >
      <div className="sidebar-content">
        <div className="logo-container">
          <div className="logo">
            <img src={hideBar ? logo1 : logo} alt="" />
          </div>
          <Button
            onClick={() => {
              updatehidebar(!hideBar);
            }}
            style={{
              border: "none!important"
            }}
          >
            <AiOutlineMenu style={{ fontSize: "20px" }} />
          </Button>
        </div>
        <div className="content-container">
          <ul className="navigation-panel">
            <h5
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: "300",
                letterSpacing: "1px",
                color: theme && "#fff",
                // backgroundColor: "#666",
              }}
            >
              MAIN
            </h5>
            <Tooltip
              placement="left"
              title={"Dashboard"}
              trigger={hideBar && "hover"}
            >
              <li
                className={!selectedColumn && "selected-column"}
                onClick={(e) => {
                  // setSelectedColumn((prevState) => 1);
                  e.preventDefault();
                  navigate("/");
                }}
                style={{
                  backgroundColor: !selectedColumn && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <AiFillHome style={{ fontSize: "20px" }} />
                  <a>Dashboard</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Requests"}
              trigger={hideBar && "hover"}
            >
              <li
                className={selectedColumn === "requests" && "selected-column"}
                onClick={(e) => {
                  // setSelectedColumn((prevState) => 'requests');
                  e.preventDefault();
                  navigate("/requests");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "requests" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <FaUserClock style={{ fontSize: "20px" }} />
                  <a>Requests</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Reports"}
              trigger={hideBar && "hover"}
            >
              <li
                className={selectedColumn === "reports" && "selected-column"}
                onClick={(e) => {
                  // setSelectedColumn((prevState) => 'requests');
                  e.preventDefault();
                  navigate("/reports");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "reports" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <MdOutlineReport  style={{ fontSize: "20px" }} />
                  <a>Reports</a>
                </div>
              </li>
            </Tooltip>
            {/* <li
              className={selectedColumn === 2 && "selected-column"}
              onClick={(e) => {
                setSelectedColumn((prevState) => 2);
                e.preventDefault();
                navigate("/profile");
              }}
              style={{
                backgroundColor:(selectedColumn===2 && theme )&& "#fff"
              }}

            >
              <div className="sidebar-div">
                <FaUserAlt style={{ fontSize: "20px" }} />
                <a>Profile</a>
              </div>
            </li> */}
            <h5
              style={{
                margin: 0,
                fontWeight: "300",
                fontSize: "12px",
                letterSpacing: "0.5px",
                color: theme && "#fff",
              }}
            >
              LISTS
            </h5>
            <Tooltip
              placement="left"
              title={"Users"}
              trigger={hideBar && "hover"}
            >
              <li
                className={selectedColumn === "users" && "selected-column"}
                onClick={(e) => {
                  // setSelectedColumn((prevState) => 4);
                  e.preventDefault();
                  navigate("/users");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "users" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <FaUsers style={{ fontSize: "20px" }} />
                  <a>Users</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Properties"}
              trigger={hideBar && "hover"}
            >
              <li
                className={
                  selectedColumn === "properties" &&
                  "selected-column sidebar-properties"
                }
                onClick={(e) => {
                  // selectedColumn === 'properties' && setPropertyDropDown(!propertyDropDown);
                  // setSelectedColumn((prevState) => 3);
                  e.preventDefault();
                  navigate("/properties");
                }}
                style={{
                  backgroundColor: selectedColumn === 3 && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <FaBuilding style={{ fontSize: "20px" }} />
                  <a>Properties</a>
                </div>
                {/* <ul
              className="property-sub-content"
                style={{
                  display: propertyDropDown ? "block" : "none",
  
                }}
              >
                <li className="property-filter" onMouseEnter={()=>setPropertyFilterHover(1)} onMouseLeave={()=>setPropertyFilterHover(0)} ><span>Status</span>
                  <ul  className="right-sidebar" style={{
                    display:propertyFilterHover===1?"block":"none"
                  }}>
                      <li>Sold</li>
                      <li>In Review</li>
                      <li>Posted</li>
                    </ul>
                </li>
                <li className="property-filter" onMouseEnter={()=>setPropertyFilterHover(2)} onMouseLeave={()=>setPropertyFilterHover(0)} ><span>Type</span>
                  <ul  className="right-sidebar" style={{
                    display:propertyFilterHover===2?"block":"none"
                  }}>
                      <li>Villa</li>
                      <li>Plot</li>
                      <li>Apartment</li>
                    </ul>
                </li>
                <li className="property-filter" onMouseEnter={()=>setPropertyFilterHover(3)} onMouseLeave={()=>setPropertyFilterHover(0)} ><span>Action</span>
                  <ul  className="right-sidebar" style={{
                    display:propertyFilterHover===3?"block":"none"
                  }}>
                      <li>Sale</li>
                      <li>Rent</li>
                      <li>PG</li>
                    </ul>
                </li>
                <li className="property-filter" onMouseEnter={()=>setPropertyFilterHover(4)} onMouseLeave={()=>setPropertyFilterHover(0)} ><span>Posted by</span>
                  <ul className="right-sidebar" style={{
                    display:propertyFilterHover===4?"block":"none"
                  }}>
                      <li>Builder</li>
                      <li>Tenant</li>
                      <li>Agent</li>
                    </ul>
                </li>
                
              </ul> */}
              </li>
            </Tooltip>{" "}
            <Tooltip
              placement="left"
              title={"Payment History"}
              trigger={hideBar && "hover"}
            >
              <li
                className={
                  selectedColumn === "payment_history" &&
                  "selected-column sidebar-properties"
                }
                onClick={(e) => {
                  // selectedColumn === 'payment_history' && setPropertyDropDown(!propertyDropDown);
                  // setSelectedColumn((prevState) => 6);
                  e.preventDefault();
                  navigate("/payment_history");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "payment_history" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <MdOutlinePayment style={{ fontSize: "20px" }} />
                  <a>Payment History</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Blogs"}
              trigger={hideBar && "hover"}
            >
              <li
                className={
                  selectedColumn === "blogs" &&
                  "selected-column sidebar-properties"
                }
                onClick={(e) => {
                  // selectedColumn === 'blogs' && setPropertyDropDown(!propertyDropDown);
                  // setSelectedColumn((prevState) => 'blogs');
                  e.preventDefault();
                  navigate("/blogs");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "blogs" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <FaBlog style={{ fontSize: "20px" }} />
                  <a>Blogs</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Banners"}
              trigger={hideBar && "hover"}
            >
              <li
                className={
                  selectedColumn === "banners" &&
                  "selected-column sidebar-properties"
                }
                onClick={(e) => {
                  // selectedColumn === 8 && setPropertyDropDown(!propertyDropDown);
                  // setSelectedColumn((prevState) => 8);
                  e.preventDefault();
                  navigate("/banners");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "banners" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <GiKnightBanner style={{ fontSize: "20px" }} />
                  <a>Banners</a>
                </div>
              </li>
            </Tooltip>
            <Tooltip
              placement="left"
              title={"Localities"}
              trigger={hideBar && "hover"}
            >
              <li
                className={
                  selectedColumn === "localities" &&
                  "selected-column sidebar-properties"
                }
                onClick={(e) => {
                  // selectedColumn === 8 && setPropertyDropDown(!propertyDropDown);
                  // setSelectedColumn((prevState) => 8);
                  e.preventDefault();
                  navigate("/localities");
                }}
                style={{
                  backgroundColor:
                    selectedColumn === "localities" && theme && "#fff",
                }}
              >
                <div className="sidebar-div">
                  <FaLocationArrow style={{ fontSize: "20px" }} />
                  <a>Localities</a>
                </div>
              </li>
            </Tooltip>
          </ul>
          <Tooltip
            placement="left"
            title={"Logout"}
            trigger={hideBar && "hover"}
          >
            <div onClick={() => Logout()} className="logout-cont">
              <p>Logout</p>
              <AiOutlineLogout style={{ fontSize: "20px" }} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
