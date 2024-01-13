import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { AppContext } from "../App";
import { Button, Card, Input, Modal, Select, Table, Tag } from "antd";
import "./Styles/Reports.scss";
import profile from "./../Assets/images.jpeg";
import "./Styles/ListCard.scss";
import { Fetch } from "../utils/FetchData";
import { useNavigate } from "react-router-dom";
import { HiMiniEye } from "react-icons/hi2";
import altimg from "./../Assets/img-alt.jpg";
import { IMAGE_BASE_URL, PROFILE_IMAGE_BASE_URL } from "../utils/Contants";
import { MdBlockFlipped } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { formatText } from "../utils/Helpers";

function Reports() {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [reportData, setReportData] = useState([]);
  const [propertiesData, setPropertiesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedFilter, setselectedFilter] = useState("Property Reports");
  const navigate = useNavigate();
  const columns = ["Property Reports", "User Reports"];
  const { confirm } = Modal;

  const getReports = async () => {
    const params = "";
    const res = await Fetch.get_reports(params);
    setReportData(res);
  };
  useEffect(() => {
    getReports();
  }, [selectedFilter]);
  const col = [
    // {
    //   title: "",
    //   dataIndex: "img",
    //   width: "15%",
    //   render: (src) => (
    //     <>
    //       <div className="table-img">
    //         <img
    //           src={src}
    //           alt=""
    //           onError={({ currentTarget }) => {
    //             currentTarget.src = altimg;
    //           }}
    //         />
    //       </div>
    //     </>
    //   ),
    // },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Report Count",
      dataIndex: "report_count",
      width: "10%",
    },
    {
      title: "User",
      dataIndex: "user",
      width: "10%",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      width: "10%",
    },

    {
      title: "Reason",
      dataIndex: "reason",
      width: "25%",
    },
    {
      title: "Action",
      key: "operation",
      width: "10%",

      render: (data) => {
        return (
          <div className="icon-btns">
            <button
              onClick={() => {
                navigate(`/property_details/${data.p_id}`, {
                  state: {
                    property: data,
                  },
                });
              }}
            >
              <HiMiniEye />
              <span className="btn-name">View</span>
            </button>
          </div>
        );
      },
    },
  ];
  const handleBlock = async (key) => {
    // console.log("asdfa",key)
    const res = await Fetch.block_user({
      user_id: key,
      // blocked:true
    });
    console.log(res);
  };
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this blog?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleBlock(item);
      },
      onCancel() {
        console.log("cancel");
      },
      centered: true,
    });
  };

  const col2 = [
    // {
    //   title: "",
    //   dataIndex: "img",
    //   width: "15%",
    //   render: (src) => (
    //     <>
    //       <div className="table-img">
    //         <img
    //           src={src}
    //           alt=""
    //           onError={({ currentTarget }) => {
    //             currentTarget.src = altimg;
    //           }}
    //         />
    //       </div>
    //     </>
    //   ),
    // },
    {
      title: "User",
      dataIndex: "User",
      width: "20%",
      render: (data) => {
        return (
          <div className="user-container">
            <div className="logo-cont">
              <img
                src={data.img}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.src = profile;
                }}
              />
              {data.blocked == 1 && (
                <div className="block">
                  <MdBlockFlipped
                    style={{ color: "#8C193F", fontSize: "18px" }}
                  />
                </div>
              )}
            </div>
            <div className="userDetail">
              <p>
                <b>{data.name}</b>
              </p>
              <span>{data.type}</span>
              {/* <Chip label={type} icon={<FaRegCircleDot/>} /> */}
            </div>
          </div>
        );
      },
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      width: "20%",
      render: (data) => {
        return (
          <div className="user-container">
            <div className="logo-cont">
              <img
                src={data.img}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.src = profile;
                }}
              />
            </div>
            <div className="userDetail">
              <p>
                <b>{data.name}</b>
              </p>
              <span>{data.type}</span>
              {/* <Chip label={type} icon={<FaRegCircleDot/>} /> */}
            </div>
          </div>
        );
      },
    },
    {
      title: "Report Count",
      dataIndex: "report_count",
      width: "10%",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: "25%",
    },
    {
      title: "Action",
      key: "operation",
      width: "10%",

      render: (data) => {
        return (
          <div className="icon-btns">
            <button onClick={() => showDeleteConfirm(data.user_id)}>
              <MdBlockFlipped />
              <span className="btn-name">Block</span>
            </button>
            <button
              onClick={() => {
                navigate(`/user-view/${data.user_id}`, {});
              }}
            >
              <HiMiniEye />
              <span className="btn-name">View</span>
            </button>
          </div>
        );
      },
    },
  ];

  const getuser = async () => {
    const param = "filter=users";
    console.log("params-----", param);
    const propertyData = await Fetch.get_reports(param);
    console.log(propertyData, "propertyData===>");
    getUserData(propertyData);
  };
  const getprop = async () => {
    const param = "filter=properties";
    console.log("params-----", param);
    const propertyData = await Fetch.get_reports(param);
    console.log(propertyData, "propertyData===>");
    GetProprtiesData(propertyData);
  };
  useEffect(() => {
    getprop();
    getuser();
  }, []);
  const getUserType = (seller) => {
    switch (seller) {
      default:
        return "rejected";
      case "1":
        return "Buyer";
      case "2":
        return "Agent";
      case "3":
        return "Builder";
    }
  };
  const getUserData = (data) => {
    const result = [];
    (!data.message && data.length>0) &&
      data?.map((item) => {
        // console.log("asdf-----", item?.reports?.images[0]?.image_url)
        let res = {
          key: item.reports.report_id,
          User: {
            name: item?.reports?.username,
            img: PROFILE_IMAGE_BASE_URL + item?.reports?.profile,
            type: getUserType(item?.reports?.user_type_id),
            blocked: item?.reports?.blocked,
          },
          // img: IMAGE_BASE_URL + item?.reports?.images[0]?.image_url,
          user_id: item?.reports?.user_id,
          report_count: item?.reports?.report_count,
          reporter: {
            name: item?.reporter?.username,
            img: PROFILE_IMAGE_BASE_URL + item?.reporter?.profile,
            type: getUserType(item?.reporter?.user_type_id),
          },
          reason: item?.reports?.reason,
          operation: item?.reports?.user_id,
        };
        console.log(res, "result--->");
        result.push(res);
      });
    setUserData(result);
  };
  const GetProprtiesData = (data) => {
    const result = [];
    !data.message &&
      data?.map((item) => {
        // console.log("asdf-----", item?.reports?.images[0]?.image_url)
        let res = {
          key: item.reports.report_id,
          p_id: item.reports.p_id,
          // img: IMAGE_BASE_URL + item?.reports?.images[0]?.image_url,
          name: item?.reports?.property_name,
          report_count: item?.reports?.report_count,
          user: item?.reports?.username,
          reporter: item?.reporter?.user_id,
          reason: item?.reports?.reason,
          operation: item,
        };
        console.log(res, "result--->");
        result.push(res);
      });
    setPropertiesData(result);
  };
  const cardBody = () => {
    switch (selectedFilter) {
      default:
      case "User Reports":
        return (
          // <List tableData={PaymentData}/>
          <Table columns={col2} dataSource={userData} />
          // <></>
        );
      case "Property Reports":
        return (
          // <List tableData={PropertyData}/>
          <Table
            columns={col}
            // rowSelection={rowSelection}
            dataSource={propertiesData}
            // onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="reports">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Reports"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="header-card">
              <div className="head-btn-grid">
                {columns.map((item) => (
                  <div
                    className={
                      selectedFilter === item
                        ? "selected-filter btn-div"
                        : "btn-div"
                    }
                    onClick={() => setselectedFilter(item)}
                  >
                    <span>{formatText(item)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="table-card">
              {/* <List tableData={tableData} /> */}
              {/* <Table columns={col} dataSource={paymentData} /> */}
              {cardBody()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
