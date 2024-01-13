import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "./Styles/ListCard.scss";
import "./Styles/Profile.scss";
import user from "./../Assets/images.jpeg";
import banner from "./../Assets/banner.jpg";
import { FaMoneyCheck, FaLandmark,FaRegAddressCard,FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import List from "./../Components/List";
import { Tag } from "antd";
// import { PropertyData } from "./Properties";
import { AppContext } from "../App";

function Profile() {
  const {hideBar,updatehidebar}= useContext(AppContext);
  const [Theme, setTheme] = useState(true);
  const [divider, setDivider] = useState(1);

  function handleTheme(data) {
    setTheme(data);
  }
  const UserContainer = (name, img, type) => {
    return (
      <div className="user-container">
        <div className="logo-cont">
          <img src={img} alt="" />
        </div>
        <div className="userDetail">
          <p>
            <b>{name}</b>
          </p>
          <span>{type}</span>
          {/* <Chip label={type} icon={<FaRegCircleDot/>} /> */}
        </div>
      </div>
    );
  };
  const PaymentData = {
    columns: [
      {
        title: "User",
        width: "30%",
        activSort: false,
        activFilter: false,
      },
      {
        title: "Plan",
        width: "15%",
        activSort: false,
        activFilter: true,
        filterData: [
          {
            key: 1,
            label: <a>Basic</a>,
          },
          {
            key: 2,
            label: <a>Prime</a>,
          },
          {
            key: 3,
            label: <a>Pro</a>,
          },
        ],
      },
      {
        title: "Payment ID",
        width: "20%",
        activSort: true,
        activFilter: false,
      },
      {
        title: "Price",
        width: "20%",
        activSort: true,
        activFilter: false,
      },
      {
        title: "Date",
        width: "15%",
        activSort: true,
        activFilter: false,
      },
    ],
    Data: [
      [
        UserContainer("Angaleesh", user, "Builder"),
        <Tag>
          <div className="tag-point"></div>
          <div className="tag-content">Prime</div>
        </Tag>,
        "ALB001",
        499,
        "20/10/2020",
      ],
    ],
    Access: [{ name: "view", path: "/user-view" }],
  };

  const cardBody = () => {
    switch (divider) {
      // default:
      case 1:
        return <List tableData={PaymentData} />;
      case 2:
        // return <List tableData={PropertyData} />;
    }
  };
  return (
    <div className="profile">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"User Profile"}
            Changetheme={handleTheme}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="banner">
            <img src={banner} alt="" />
          </div>
          <div className="main-section">
            <div className="col1">
              <div className="profile-card">
                <div className="profile-cont">
                  <div className="img-cont">
                    <img src={user} alt="" />
                  </div>
                  <div className="img-content">
                    <h3>Angaleesh</h3>
                    <p>Builder</p>
                  </div>
                </div>
                <div className="content-cont">
                  <div className="content">
                    <span className="span-title"><FaUserAlt/>Name:</span>
                    <p>Angaleesh</p>
                  </div>
                  <div className="content">
                    <span className="span-title"><BsFillTelephoneFill/>Mobile:</span>
                    <p>7397687841</p>
                  </div>
                  <div className="content">
                    <span className="span-title"><MdEmail/>Email:</span>
                    <p>ag@gmail.com</p>
                  </div>
                  <div className="content">
                    <span className="span-title"><FaRegAddressCard/>Address:</span>
                    <p>123,somewhere</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col2">
              <div className="table-card">
                <div className="card-head">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="head-dividers">
                      <div
                        className={divider === 1 ? "div1 clicked" : "div1"}
                        onClick={() => setDivider(1)}
                      >
                        <FaMoneyCheck />
                        <p>Subscription History</p>
                      </div>
                      <div
                        className={divider === 2 ? "div2 clicked" : "div2"}
                        onClick={() => setDivider(2)}
                      >
                        <FaLandmark />
                        <p>Posted Properties</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="card-body">{cardBody()}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
