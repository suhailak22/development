import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { AppContext } from "../App";
import { Button, Card, Dropdown } from "antd";
import "./Styles/Requests.scss";
import { Fetch } from "../utils/FetchData";
import { useNavigate } from "react-router-dom";
import { formatText } from "../utils/Helpers";

function Requests() {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [formData, setFormData] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("");
  // const [item, setitem] = useState([])
  const navigate = useNavigate();
  const items = [
    {
      label:'home_interior',
      key:'1',
    },
    {
      label:'legal_service',
      key:'2',
    },
    {
      label:'package_movers',
      key:'3',
    },
    {
      label:'home_loan',
      key:'4',
    },
    {
      label:'free_rental_agreement',
      key:'5',
    },
    {
      label:'help',
      key:'6',
    },
    {
      label:'feedback',
      key:'7',
    },
    {
      label:'followed',
      key:'8',
    },
  ];

  const formatString = (str) => {
    console.log("str", str);
    return str?.city ? str?.city : formatText(str);
  };
  const getForms = async () => {
    console.log("selectedFilter", selectedFilter);
    const params =
      selectedFilter !== ""
        ? selectedFilter === "followed"
          ? "followed=true"
          : "form_name=" + selectedFilter
        : "";
    const res = await Fetch.getForm(params);
    setFormData(res);
  };
  useEffect(() => {
    getForms();
    // getColumns();
  }, [selectedFilter]);

  const handleFollow = async (item) => {
    const res = await Fetch.update_request({
      form_id: item,
      status: 2,
    });
    getForms();
  };
  // const getColumns=()=>{
  //   let temp=[{
  //     key:0,
  //     label:"<a>all</a>"
  //   }];
  //   columns.map((item,index)=>{
  //     temp.push({
  //       key:index+1,
  //       label:"<a>"+item+"<a/>"
  //     })
  //   })
  // //  setitem(()=>temp)
  //  console.log(temp,"temp45")
  // }
  return (
    <div className="requests">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Requests"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="header-card ">
              <div className="head-btn-grid">
                <div
                  className={
                    selectedFilter === ""
                      ? "selected-filter btn-div"
                      : "btn-div"
                  }
                  onClick={() => setselectedFilter("")}
                >
                  <span>All</span>
                </div>
                {items.map((item) => (
                  <div
                    className={
                      selectedFilter === item.label
                        ? "selected-filter btn-div"
                        : "btn-div"
                    }
                    onClick={() => setselectedFilter(item.label)}
                  >
                    <span>{formatString(item.label)}</span>
                  </div>
                ))}
              </div>
              {/* <div className="head-btn-grid-tab">
                <Dropdown
                  menu={items}
                  // menu={[
                  //   {
                  //     label: (
                  //       <a href="https://www.antgroup.com">1st menu item</a>
                  //     ),
                  //     key: "0",
                  //   },
                  //   {
                  //     label: <a href="https://www.aliyun.com">2nd menu item</a>,
                  //     key: "1",
                  //   },
                  //   {
                  //     type: "divider",
                  //   },
                  //   {
                  //     label: "3rd menu item",
                  //     key: "3",
                  //   },
                  // ]}
                />
              </div> */}
            </div>
            <div className="card-list">
              {formData?.map((item) => {
                return (
                  <Card bordered={false}>
                    <div className="card-head">
                      <h3>{formatString(item?.form_name)}</h3>
                      <Button onClick={() => handleFollow(item.form_id)}>
                        Followed
                      </Button>
                    </div>
                    <div className="card-content">
                      <p>
                        User:{" "}
                        <a
                          onClick={() => navigate("/user-view/" + item.user_id)}
                        >
                          {item.username}
                        </a>{" "}
                      </p>
                      {/* <p>Mobile : {item?.mobile_number}</p>
                      <p>Email : {item?.email}</p> */}
                      {console.log(")))", item.payload)}
                      {!Array.isArray(item.payload) &&
                        Object.keys(item.payload).length > 0 &&
                        Object.keys(item.payload).map((key) => (
                          <p>
                            {formatString(key)} :{" "}
                            {typeof item.payload === "string"
                              ? formatString(item?.payload[key])
                              : item?.payload[key]}
                          </p>
                        ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
