import React, { useContext, useState } from "react";
import "./Styles/Sidebar.scss";
import logo from "./../Assets/albion logo.png";
import logo1 from "./../Assets/logo.png";
import logo2 from "./../Assets/logo2.png";
import logo3 from "./../Assets/logo.png";
import {AppContext} from './../Contexts/ThemeContext'
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiFillHome,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaUsers, FaBuilding, FaUserAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "antd";


function Sidebar(props) {
  const [selectedColumn, setSelectedColumn] = useState(
    props.activeColumn ? props.activeColumn : 1
  );
  const [hideBar, setHideBar] = useState(false);
  const [propertyDropDown, setPropertyDropDown] = useState(false);
  const [propertyFilterHover, setPropertyFilterHover] = useState(0);
  // const [hideBar, setHideBar] = useContext(AppContext);

  const navigate = useNavigate();
  return (
    <div className={hideBar ? "sidebar2" : "sidebar"}>
      <div className="sidebar-content">
        <div className="logo-container">
          <div className="logo">
            <img
              src={
                props.theme ? (hideBar ? logo1 : logo) : hideBar ? logo1 : logo2
              }
              alt=""
            />
          </div>
          <Button
            onClick={() => {
              setHideBar(!hideBar);
            }}
          >
            <AiOutlineMenu style={{ fontSize: "20px" }} />
          </Button>
        </div>
        <div className="content-container">
          <ul className="navigation-panel">
            <h5 style={{ margin: 0, fontWeight: "300", letterSpacing: "1px" }}>
              MAIN
            </h5>
            <li
              className={selectedColumn === 1 && "selected-column"}
              onClick={(e) => {
                setSelectedColumn((prevState) => 1);
                e.preventDefault();
                navigate("/");
              }}
            >
              <div className="sidebar-div">
                <AiFillHome style={{ fontSize: "20px" }} />
                <a>Dashboard</a>
              </div>
            </li>
            <li
              className={selectedColumn === 4 && "selected-column"}
              onClick={(e) => {
                setSelectedColumn((prevState) => 4);
                e.preventDefault();
                navigate("/profile");
              }}
            >
              <div className="sidebar-div">
                <FaUserAlt style={{ fontSize: "20px" }} />
                <a>Profile</a>
              </div>
            </li>
            <h5 style={{ margin: 0, fontWeight: "300", letterSpacing: "1px" }}>
              LISTS
            </h5>

            <li
              className={selectedColumn === 2 && "selected-column"}
              onClick={(e) => {
                setSelectedColumn((prevState) => 2);
                e.preventDefault();
                navigate("/users");
              }}
            >
              <div className="sidebar-div">
                <FaUsers style={{ fontSize: "20px" }} />
                <a>Users</a>
              </div>
            </li>
            <li
              className={
                selectedColumn === 3 && "selected-column sidebar-properties"
              }
              onClick={(e) => {
                selectedColumn===3&&setPropertyDropDown(!propertyDropDown);
                setSelectedColumn((prevState) => 3);
                e.preventDefault();
                navigate("/properties");
              }}
            >
              <div className="sidebar-div">
                <FaBuilding style={{ fontSize: "20px" }} />
                <a>Properties</a>
                <IoIosArrowDown
                  style={{
                    rotate: propertyDropDown && "180deg",
                    display:selectedColumn===3?"block":"none"
                  }}
                />
              </div>
              <ul
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
                
              </ul>
            </li>

            <li
              className={selectedColumn === 5 && "selected-column"}
              onClick={(e) => {
                setSelectedColumn((prevState) => 5);
                e.preventDefault();
                navigate("/settings");
              }}
            >
              <div className="sidebar-div">
                <AiFillSetting style={{ fontSize: "20px" }} />
                <a>Settings</a>
              </div>
            </li>
          </ul>
          <div className="logout-cont">
            <a href="">Logout</a>
            <AiOutlineLogout style={{ fontSize: "20px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
