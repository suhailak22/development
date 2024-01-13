import React, { useContext, useEffect, useState } from "react";

import Header from "../../Components/Header";
import "./../Styles/ListCard.scss";
import "./Styles/UserView.scss";
import userProfile from "./../../Assets/images.jpeg";
import profile from "./../../Assets/user-out.jpg";
import {
  FaMoneyCheck,
  FaLandmark,
  FaRegAddressCard,
  FaUserAlt,
} from "react-icons/fa";

import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Modal, Pagination, Table, Tag } from "antd";

import { AppContext } from "../../App";
import {
  useLocation,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { Fetch } from "../../utils/FetchData";
import { useParams } from "react-router-dom";
import { HiMiniEye } from "react-icons/hi2";
import altimg from "./../../Assets/img-alt.jpg";
import { IMAGE_BASE_URL } from "../../utils/Contants";
import { getStatus } from "../../utils/Helpers";

function UserView() {
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [Theme, setTheme] = useState(true);
  const [divider, setDivider] = useState(1);
  const [pageNo, setpageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [user, setuser] = useState({});
  const [propertiesData, setPropertiesData] = useState([]);
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
  const location = useLocation();
  const navigate = useNavigate();

  // const users=location.state.user;
  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const res = await Fetch.getUsers("user_id=" + id);
      setuser(res);
    };
    getUser();
  }, []);
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
  function handleTheme(data) {
    setTheme(data);
  }
  const UserContainer = (name, img, type) => {
    return (
      <div className="user-container">
        <div className="logo-cont">
          <img src={userProfile} alt="" />
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
  const col = [
    {
      title: "",
      dataIndex: "img",
      width: "15%",
      render: (src) => (
        <>
          <div className="table-img">
            <img
              src={src}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.src = altimg;
              }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: "10%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "1") {
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
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
    },

    {
      title: "Date",
      dataIndex: "date",
      width: "10%",
    },
    {
      title: "Action",
      key: "operation",
      render: (data) => {
        return (
          <div className="icon-btns">
            <button
              onClick={() => {
                navigate(`/property_details/${data.key}`, {
                  state: {
                    property: data,
                  },
                });
              }}
            >
              <HiMiniEye />
            </button>
          </div>
        );
      },
    },
  ];
  const col2 = [
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
    getprop();
  }, [pageNo]);
  const getPaymentData = (data) => {
    const result = [];
    console.log("data========", data);
    !data.message &&
      data?.map((user) => {
        let res = {
          key: user.user_id,
          User: {
            name: user?.username,
            img: userProfile,
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
  useEffect(() => {
    // let resp=[];
    const getPay = async () => {
      const resp = await Fetch.getPayment("");
      console.log("resp=====", resp);
      getPaymentData(resp);
    };
    getPay();
  }, []);
  const getprop = async () => {
    const param =
      "&status=in_review,rejected,posted,cancelled&seller_id=" +
      id +
      "&page_number=" +
      pageNo;
    console.log("params-----", param);
    const propertyData = await Fetch.getProperties(param);
    const propertyCount = await Fetch.getPropertiesCount(param);
    console.log(propertyCount, "propertyCount");
    setTotal((prevState) => propertyCount.count);
    GetProprtiesData(propertyData);
  };

  const GetProprtiesData = (data) => {
    const result = [];
    !data.message &&
      data?.map((item) => {
        let res = {
          key: item.p_id,
          img: IMAGE_BASE_URL + item.images[0]?.image_url,
          name: item?.property_name,
          tags: getStatus(item.status),
          type: item?.property_type.pt_name,
          action: item?.property_action,
          price: item?.expected_price,
          date: item?.created_at,
          operation: item,
        };
        result.push(res);
      });
    setPropertiesData(result);
  };
  const cardBody = () => {
    switch (divider) {
      default:
      case 1:
        return (
          // <List tableData={PaymentData}/>
          <Table columns={col2} dataSource={paymentData} />
        );
      case 2:
        return (
          // <List tableData={PropertyData}/>
          <>
            <Table
              columns={col}
              // rowSelection={rowSelection}
              dataSource={propertiesData}
              pagination={false}
              // onChange={onChange}
            />
            <Pagination
              total={total}
              showSizeChanger={false}
              current={pageNo}
              style={{
                float: "right",
                margin: "10px",
              }}
              onChange={(page_number) => setpageNo((prevState) => page_number)}
            />
          </>
        );
    }
  };

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
  return (
    <div className="user-view">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"User Profile"}
            Changetheme={handleTheme}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="main-section">
            <div className="col1">
              <div className="profile-card">
                <div className="profile-cont">
                  <div className="img-cont">
                    <img
                      src={user.profile}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src = profile;
                      }}
                    />
                  </div>
                  <div className="img-content">
                    <h3>{user.username}</h3>
                    <p>{getUserType(user.user_type_id)}</p>
                  </div>
                </div>
                <div className="content-cont">
                  <div className="content">
                    <span className="span-title">
                      <FaUserAlt />
                      Name:
                    </span>
                    <p>{user.username}</p>
                  </div>
                  <div className="content">
                    <span className="span-title">
                      <BsFillTelephoneFill />
                      Mobile:
                    </span>
                    <p>{user.mobile_number}</p>
                  </div>
                  <div className="content">
                    <span className="span-title">
                      <MdEmail />
                      Email:
                    </span>
                    <p>{user.email}</p>
                  </div>
                  {user.address && (
                    <div className="content">
                      <span className="span-title">
                        <FaRegAddressCard />
                        Address:
                      </span>
                      <p>{user.address}</p>
                    </div>
                  )}
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
                <div className="card-body">
                  {cardBody()}
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
        </div>
      </div>
    </div>
  );
}

export default UserView;
