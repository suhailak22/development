import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";

import Header from "../Components/Header";
import "./Styles/ListCard.scss";
import "./Styles/PaymentHistory.scss";

import { Button, Input, Modal, Select, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import List from "../Components/List";
import profile from "./../Assets/images.jpeg";
import { AppContext } from "../App";
import { Fetch } from "../utils/FetchData";
import { HiMiniEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
// import { Chip } from "@mui/material";
function PaymentHistory() {
  // const [hideBar, sethideBar] = useState(true);
  const [Theme, setTheme] = useState(false);
  const [checked, setChecked] = useState([]);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [paymentData, setPaymentData] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    order_id: "",
    plan_name: "",
    order_status: "",
    cf_order_id: "",
    amount: "",
    username: "",
    user_type: "",
  });
  const navigate = useNavigate();

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
  // function handleSidebar(data) {
  //   sethideBar(data);
  // }
  function handleTheme(data) {
    setTheme(data);
  }
  const handlePaymentModel = (item) => {
    setModalData(() => ({
      order_id: item.order_id,
      plan_name: item.plan_name,
      order_status: item.order_status,
      cf_order_id: item.cf_order_id,
      amount: item.amount,
      username: item.username,
      user_type: getUserType(item.user_type_id),
    }));
    setmodalOpen(true);
  };
  const col = [
    {
      title: "User",
      dataIndex: "User",
      width: "30%",
      render: (data) => {
        return (
          <div className="user-container">
            <div className="logo-cont">
              <img src={data.img} alt="" />
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
      title: "Plan",
      dataIndex: "Plan",
      width: "15%",
      // filterMode: "tree",
      // filterSearch: true,
      // activFilter: true,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      // filters: [
      //   {
      //     text: "Basic",
      //     value: "Basic",
      //   },
      //   {
      //     text: "Prime",
      //     value: "Prime",
      //   },
      //   {
      //     text: "Pro",
      //     value: "Pro",
      //   },
      // ],
    },
    {
      title: "Payment_ID",
      dataIndex: "Payment_ID",
      width: "20%",
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: "15%",
      activSort: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (item) => {
        return (
          <div className="icon-btns">
            <button onClick={() => handlePaymentModel(item)}>
              <HiMiniEye />
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    // let resp=[];
    const getPay = async () => {
      const resp = await Fetch.getPayment("");
      console.log("resp=====", resp);
      getPaymentData(resp);
    };
    getPay();
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
  const getUserPlan = (plan) => {
    switch (plan) {
      default:
        return "Free";
      case "1":
        return "Basic";
      case "2":
        return "Prime";
      case "3":
        return "Pro";
    }
  };
  const getPaymentData = (data) => {
    const result = [];
    console.log("data========", data);
    !data.message &&
      data?.map((user) => {
        let res = {
          key: user.user_id,
          User: {
            name: user?.username,
            img: profile,
            type: getUserType(user?.user_type_id),
          },
          tags: [user?.plan_name],
          Payment_ID: user?.payment_id,
          Mobile: user?.mobile_number,
          Status: user?.order_status,
          Action: user,
        };
        result.push(res);
      });
    setPaymentData(result);
  };
  console.log("userData========", paymentData);
  // const tableData = {
  //   columns: [
  //     {
  //       title: "User",
  //       width: "30%",
  //       activSort: false,
  //       activFilter: false,
  //     },
  //     {
  //       title: "Plan",
  //       width: "15%",
  //       activSort: false,
  //       activFilter: true,
  //       filterData: [
  //         {
  //           key: 1,
  //           label: <a>Basic</a>,
  //         },
  //         {
  //           key: 2,
  //           label: <a>Prime</a>,
  //         },
  //         {
  //           key: 3,
  //           label:<a>Pro</a> ,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Payment ID",
  //       width: "20%",
  //       activSort: true,
  //       activFilter: false,
  //     },
  //     {
  //       title: "Price",
  //       width: "20%",
  //       activSort: true,
  //       activFilter: false,
  //     },
  //     {
  //       title: "Date",
  //       width: "15%",
  //       activSort: true,
  //       activFilter: false,
  //     },
  //   ],
  //   Data: [
  //     [
  //       UserContainer("Angaleesh", user, "Builder"),
  //       <Tag>
  //         <div className="tag-point"></div>
  //         <div className="tag-content">Prime</div>
  //       </Tag>,
  //       "ALB001",
  //       499,
  //       "20/10/2020",
  //     ],
  //   ],
  //   Access: [{ name: "view", path: "/user-view" }]
  // };
  console.log(checked, "cjdfd");
  return (
    <div className="payment_history">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"Payment History"}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <h3>Payment History</h3>
                <div className="filters">
                  <Select
                    // defaultValue="Tenant"
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
                    <Input placeholder="Search By ID" />
                    <Button>Search</Button>
                  </div>
                </div>
              </div>
              {/* <List tableData={tableData} /> */}
              <Table columns={col} dataSource={paymentData} />
            </div>
            <Modal
              title={
                <span
                  style={{
                    fontFamily: "Poppins",
                  }}
                >
                  INVOICE VIEW
                </span>
              }
              centered
              open={modalOpen}
              onCancel={() => setmodalOpen(false)}
              okText={"Change Status"}
              onOk={() => setmodalOpen(false)}
            >
              <table
                style={{
                  width: "80%",
                }}
              >
                <tbody
                  style={{
                    textAlign: "left",
                    fontFamily: "Poppins",
                  }}
                >
                  <tr>
                    <th>Order ID:</th>
                    <td>{modalData?.order_id}</td>
                  </tr>
                  <tr>
                    <th>Username:</th>
                    <td>{modalData?.username}</td>
                  </tr>
                  <tr>
                    <th>User Type:</th>
                    <td>{modalData?.user_type}</td>
                  </tr>
                  <tr>
                    <th>Plan:</th>
                    <td>{modalData?.plan_name}</td>
                  </tr>
                  <tr>
                    <th>CF_Order ID:</th>
                    <td>{modalData?.cf_order_id}</td>
                  </tr>
                  <tr>
                    <th>Amount:</th>
                    <td>{modalData?.amount}</td>
                  </tr>
                </tbody>
              </table>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistory;
