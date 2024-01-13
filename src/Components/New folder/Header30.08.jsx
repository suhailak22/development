import React, { useEffect, useState } from "react";
import "./Styles/Header.css";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { BsBell, BsMoon, BsFillMoonStarsFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Input } from "antd";

function Header(props) {
  const [theme, setTheme] = useState(false);
  const [fixedHeader, setfixedHeader] = useState(false);
  const changeTheme = () => {
    setTheme(!theme);
    if (theme) {
      document.body.classList.add("dark-body");
    } else {
      document.body.classList.remove("dark-body");
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setfixedHeader(true);
    } else {
      setfixedHeader(false);
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={fixedHeader ? "header fixed-head" : "header"}
      style={{
        width: props.width,
        boxShadow:
          fixedHeader &&
          "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        backgroundColor: fixedHeader && (!theme ? "#333" : "#fff"),
        top:fixedHeader&&0,
        
      }}
    >
      <div className="content-left">
        <p>Albion / Main Dashboard</p>
        <h1>Main Dashboard</h1>
      </div>
      <div className="content-right">
        <div className="right-cont">
          <Input
            placeholder="Search"
            prefix={
              <SearchOutlined style={{ marginRight: "5px", color: "#999" }} />
            }
          />
          <div className="search-cont">
            <BsBell style={{ color: "#999" }} />
            <button onClick={changeTheme}>
              {!theme ? (
                <BsFillMoonStarsFill />
              ) : (
                <BsMoon style={{ color: "#999" }} />
              )}
            </button>
          </div>
          <div className="header-profile">
            <FaUserAlt color="#999" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
