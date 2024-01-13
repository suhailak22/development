import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import "./Styles/Users.scss";
import "./Styles/ListCard.scss";

import { Select, Tag } from "antd";
import Search from "antd/es/input/Search";
import List from "../Components/List";
import user from "./../Assets/images.jpeg";
import { AppContext } from "../App";
function Users() {

  const [checked, setChecked] = useState([]);
  const {hideBar,updatehidebar}= useContext(AppContext);

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

  const tableData = {
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
        title: "Email",
        width: "20%",
        activSort: false,
        activFilter: false,
      },
      {
        title: "Mobile",
        width: "20%",
        activSort: false,
        activFilter: false,
      },
      {
        title: "Post",
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
        "agangaleesh@gmail.com",
        7397687841,
        50,
      ],
    ],
    Access: [{ name: "view", path: "/user-view" }],
  };
  console.log(checked, "cjdfd");
  return (
    <div className="users">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"Users"}
            
            width={!hideBar ? "80%" : "85%"}
          />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <h3>Users</h3>
                <div className="filters">
                  <Select
                    placeholder="User Type"
                    style={{
                      width: 120,
                    }}
                    options={[
                      {
                        value: "Builder",
                        label: "Builder",
                      },
                      {
                        value: "Tenant",
                        label: "Tenant",
                      },
                      {
                        value: "Agent",
                        label: "Agent",
                      },
                      
                    ]}
                  />
                  <div className="search-cont">
                    <label>Search :</label>
                    <Search
                      placeholder="input search text"
                      // onSearch={onSearch}
                      style={{
                        width: 200,
                      }}
                    />
                  </div>
                </div>
              </div>
              <List tableData={tableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
