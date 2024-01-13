import React, { useContext, useEffect, useState } from "react";
import "./Styles/Header.scss";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { MdBrightness4, MdOutlineBrightness4 } from "react-icons/md";
import { FaUserAlt, FaBell, FaUserCircle } from "react-icons/fa";
import { Badge, Button, Dropdown, Input, Menu, Space } from "antd";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import profile from "./../Assets/images.jpeg";
import { Fetch } from "../utils/FetchData";
import Notifications from "./Notifications";
import Cookies from "js-cookie";

function Header(props) {
  const { theme, updateTheme } = useContext(AppContext);
  const [fixedHeader, setfixedHeader] = useState(false);
  const [notifications, setnotifications] = useState([]);
  const [notifyClick, setnotifyClick] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const changeTheme = () => {
    updateTheme(!theme);
    document.querySelector("body").setAttribute("dark-theme", theme);
  };
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setfixedHeader(true);
    } else {
      setfixedHeader(false);
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const FetchNotification = async () => {
      const res = await Fetch.get_admin_notification_list("");
      setnotifications(() => res);
      setNotificationCount(() => res.length);
    };
    FetchNotification();
  }, []);

  function Logout() {
    Cookies.remove("userLoggedIn");
    navigate("/login");
  }

  const items = [
    {
      key: "1",
      label: (
        <a
          style={{ fontFamily: "Poppins" }}
          href="https://albionpropertyhub.com"
        >
          PropertyHub
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a style={{ fontFamily: "Poppins" }} onClick={() => Logout()}>
          Logout
        </a>
      ),
    },
  ];

  const menu = (
    <Menu>
      {notifications?.map((item) => {
        return (
          <Menu.Item key="option1">
            <div className="menu-cont">
              <div className="content-cont">
                <div className="image-cont">
                  <img src={profile} alt="" />
                </div>
                <div className="meta-cont">
                  <h3>{item.title}</h3>
                  <p>
                    <b>Avenexa </b>Posted Property in Coimbatore
                  </p>
                  <span>2h ago</span>
                </div>
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div>
      <div
        className={fixedHeader ? "header fixed-head" : "header"}
        style={{
          width: props.width,
        }}
      >
        <div className="content-left">
          <p>
            <a href onClick={() => navigate("/")}>
              Albion
            </a>{" "}
            / <a href="#">{props.pagePath}</a>
          </p>
          <h1>{props.pagePath}</h1>
        </div>
        <div className="content-right">
          <div className="right-cont">
            {/* <Input
              placeholder="Search"
              prefix={
                <SearchOutlined style={{ marginRight: "5px", color: "#999" }} />
              }
            /> */}
            <div className="search-cont">
              {/* <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <button>
               
              </button>
            </Dropdown> */}

              {/* <Badge
                count={notificationCount}
                color={"#8C193F"}
                style={{
                  fontSize: "8px",
                  boxShadow:"none"
                }}
                showZero={true}
              >
                <button onClick={() => setnotifyClick(true)}>
                  <FaBell style={{ color: "#999" }} />
                </button>
              </Badge> */}
              <button onClick={changeTheme}>
                {!theme ? (
                  <MdOutlineBrightness4 style={{ color: "#ccc" }} />
                ) : (
                  <MdBrightness4 style={{ color: "#999" }} />
                )}
              </button>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <button>
                  <FaUserCircle color="#999" />
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          right: !notifyClick && "-25%",
        }}
        className="notifications"
      >
        <div className="notify-header">
          <h3>Notifications</h3>
          <button onClick={() => setnotifyClick(false)}>x</button>
        </div>
        <Notifications />
      /</div> */}
    </div>
  );
}

export default Header;
