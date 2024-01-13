import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import "./Styles/Users.scss";
import "./Styles/ListCard.scss";

import {
  Button,
  Checkbox,
  Input,
  Modal,
  Pagination,
  Select,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import profile from "./../Assets/user-out.jpg";
import { AppContext } from "../App";
import { Fetch } from "../utils/FetchData";
import { HiMiniEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import {
  APP_BASE_URL,
  BACKEND_BASE_URL,
  PROFILE_IMAGE_BASE_URL,
} from "../utils/Contants";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Form } from "react-router-dom";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const StyledSelect = styled(Select)`
  width: 18%;
  .ant-select-selection__placeholder {
    color: #969595 !important;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  &::placeholder {
    color: #969595 !important;
  }
  @media (max-width: 1024px) {
    height: 30px !important;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

let possibleUsers = [
  {
    id: 1,
    key: "buyer",
    value: "Buyer",
  },
  {
    id: 2,
    key: "agent",
    value: "Agent",
  },
  {
    id: 3,
    key: "builder",
    value: "Builder",
  },
];

function Users() {
  const [checked, setChecked] = useState([]);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedUserType, setselectedUserType] = useState(0);
  const [userType, setUserType] = useState(1);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alternateMobileNumber, setAlternateMobileNumber] = useState();
  const [password, setPassword] = useState();
  const confirmPassword = useRef();
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalData, setmodalData] = useState({
    user_id: 0,
    username: "",
    email: "",
  });

  const SubmitCreateUser = async () => {};
  const navigate = useNavigate();
  const UserContainer = (name, img, type) => {
    return (
      <div className="user-container">
        <div className="logo-cont">
          <img
            src={img}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.src = profile;
            }}
          />
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

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
      title: "Email",
      dataIndex: "Email",
      width: "20%",
    },
    {
      title: "Mobile number",
      dataIndex: "Mobile",
      width: "20%",
    },
    {
      title: "Post",
      dataIndex: "Post",
      width: "15%",
      activSort: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (item) => {
        return (
          <div
            className="icon-btns"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <HiMiniEye
              onClick={() => {
                navigate("/user-view/" + item.user_id, {
                  state: { user: item },
                });
              }}
            />
            <DeleteOutlined
              title="Delete Property"
              onClick={() => showDeleteConfirm(item)}
            />
            <EditOutlined
              onClick={() => {
                setMobileNumber((prevState) => item.mobile_number);
                setEmailId((prevState) => item.email);
                setUserType((prevState) => item.user_type_id);
                setUserName((prevState) => item.username);
                setShowEditModal((prevState) => true);
                setUserId((prevState) => item.user_id);
                setIsChecked((prevState) => item.user_data == "5555");
                console.log(item, "item", isChecked);
              }}
            />
          </div>
        );
      },
    },
  ];
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this User?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteSingleUser(item);
      },
      onCancel() {
        console.log("cancel");
      },
      centered: true,
    });
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
  useEffect(() => {
    getUsers();
  }, [selectedUserType, search, pageNo]);
  const getUsers = async () => {
    let paramStr =
      selectedUserType !== 0 ? "user_type_id=" + selectedUserType : "";
    paramStr += selectedUserType !== 0 ? "&" : "";
    paramStr += search !== "" ? "like=" + search : "";
    const usercount = await Fetch.getUsersCount(paramStr);
    paramStr += pageNo !== 1 ? "&page_number=" + pageNo : "";
    const users = await Fetch.getUsers(paramStr);
    getUsersData(users);
    // pageNo !==1 ?setPageNo(1)
    setTotal((prevState) => usercount.count);
    console.log("users", users);
  };
  useEffect(() => {
    pageNo !== 1 && setPageNo(1);
  }, [selectedUserType, search]);

  function getTooltipTitle() {
    return (
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* {!userNameRegex.test(userName) && (
          <span>Please Enter Valid User name</span>
        )}
        {!emailRegex.test(emailId) && <span>Please Enter Valid Email</span>}
        {!mobileNumberRegex.test(mobileNumber) && (
          <span>Please Enter Valid Mobile Number</span>
        )} */}
      </div>
    );
  }

  async function handleDeleteSingleUser(item) {
    try {
      const response = await axios.delete(`${BACKEND_BASE_URL}/users/delete`, {
        data: {
          user_id: item.user_id,
        },
      });
      if (response.status === 200) {
        notification.success({
          message: "Deleted Successfully",
        });
        window.location.reload(true);
      }
    } catch (error) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  }
  async function handleDeleteMultipleUser() {
    const response = await axios.delete(`${BACKEND_BASE_URL}/users/delete`, {
      data: {
        user_id: selectedRowKeys,
      },
    });
    if (response.status === 200) {
      notification.success({
        message: "Users Deleted Successfully",
      });
      window.location.reload(true);
    } else {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  }

  async function registerUser() {
    setLoading((prevState) => true);
    await axios
      .post(
        `${APP_BASE_URL}users/create`,
        {
          user_type_id: userType,
          username: userName,
          email: emailId,
          mobile_number: mobileNumber,
          password: "",
          user_data: isChecked ? "5555" : "",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserName((prevState) => "");
          setMobileNumber((prevState) => "");
          setEmailId((prevState) => "");
          setShowCreateModal((prevState) => false);
          setIsChecked((prevState) => false);
          notification.success({
            message: "Registered Successfully",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
    setLoading((prevState) => false);
    window.location.reload(true);
  }

  async function updateUser() {
    setLoading((prevState) => true);
    await axios
      .put(
        `${APP_BASE_URL}users/update`,
        {
          user_type_id: userType,
          username: userName,
          email: emailId,
          mobile_number: mobileNumber,
          password: "",
          user_data: isChecked ? "5555" : "",
          user_id: userId,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserName((prevState) => "");
          setMobileNumber((prevState) => "");
          setEmailId((prevState) => "");
          setIsChecked((prevState) => false);
          setShowEditModal((prevState) => false);
          notification.success({
            message: "Updated Successfully",
          });
        }
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.message,
        });
      });
    setLoading((prevState) => false);
    // window.location.reload(true);
  }
  const getUsersData = (data) => {
    const result = [];
    !data.message &&
      data?.map((user) => {
        let res = {
          key: user.user_id,
          User: {
            name: user?.username,
            img: PROFILE_IMAGE_BASE_URL + user?.profile,
            type: getUserType(user?.user_type_id),
          },
          tags: [getUserPlan(user?.plan_id)],
          Email: user?.email,
          Mobile: user?.mobile_number,
          Post: user?.properties_posted,
          Action: user,
        };
        result.push(res);
      });
    setUserData(result);
    // console.log("userData========",userData)
  };
  console.log("userData-------", userData);
  console.log(checked, "cjdfd");
  return (
    <div className="users">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Users"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <h3>Users</h3>
                <div className="filters" style={{ width: "45vw" }}>
                  <Button
                    className="deleteSelectedItems"
                    disabled={!(selectedRowKeys.length != "0")}
                    onClick={() => handleDeleteMultipleUser()}
                  >
                    Delete Users
                  </Button>
                  <Button
                    className="deleteSelectedItems"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Add Users
                  </Button>
                  <Select
                    placeholder="User Type"
                    style={{
                      width: 120,
                    }}
                    onChange={(value) => setselectedUserType(value)}
                    options={[
                      {
                        value: "3",
                        label: "Builder",
                      },
                      {
                        value: "1",
                        label: "Buyer",
                      },
                      {
                        value: "2",
                        label: "Agent",
                      },
                    ]}
                  />
                  <div className="search-cont">
                    <Input
                      placeholder="Search By Mobilenumber"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      suffix={<SearchOutlined />}
                    />
                  </div>
                </div>
              </div>
              {/* <List tableData={tableData} /> */}
              <Table
                columns={col}
                dataSource={userData}
                rowSelection={rowSelection}
                pagination={false}
                locale={{
                  emptyText:
                    loading &&
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((u) => (
                      <Skeleton.Input
                        height={50}
                        style={{ marginTop: "10px", width: "100%" }}
                        active={true}
                      />
                    )),
                }}
              />
              <Pagination
                total={total}
                showSizeChanger={false}
                current={pageNo}
                style={{
                  float: "right",
                  margin: "10px",
                }}
                onChange={(page_number) =>
                  setPageNo((prevState) => page_number)
                }
              />
              <Modal
                centered
                open={showEditModal}
                onCancel={() => {
                  setShowEditModal((prevState) => false);
                  setUserName((prevState) => "");
                  setEmailId((prevState) => "");
                  setMobileNumber((prevState) => "");
                  setUserType((prevState) => "1");
                  setIsChecked((prevState) => false);
                }}
                footer={null}
              >
                <div className="signUpDiv">
                  <h2 className="signUpText">Edit User</h2>
                  <div className="signUpInputs">
                    <div className="inputDiv" style={{ gap: "15px" }}>
                      <StyledLabel>You are</StyledLabel>
                      <div className="you_are_buttons">
                        {possibleUsers.map((user) => (
                          <Button
                            key={user.id}
                            className={
                              user.id == userType
                                ? `ActiveBtn responsiveBtn`
                                : `inActiveBtn responsiveBtn`
                            }
                            style={{
                              border:
                                user.key === userType && "1px solid #8c193f",
                            }}
                            onClick={() => setUserType(user.id)}
                          >
                            {user.value}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Enter your Name</StyledLabel>
                      <StyledInput
                        placeholder="Enter your Name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Enter your Email Id </StyledLabel>
                      <StyledInput
                        placeholder="Enter your Email Id"
                        value={emailId}
                        onChange={(e) => {
                          setEmailId(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Mobile Number</StyledLabel>
                      <div className="mobileNumberSelection">
                        {/* <StyledSelect defaultValue={91} className="responsiveSelect">
                    <Select.Option value={91}>+91</Select.Option>
                  </StyledSelect> */}
                        <StyledInput
                          placeholder="Primary Mobile Number"
                          className="mobileNumberInput"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                          }}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        checked={isChecked}
                        onChange={() => setIsChecked((prevState) => !prevState)}
                        className="checkbox-text"
                      >
                        Use Custom OTP
                      </Checkbox>
                    </div>
                    <div className="signUpBtnContainer">
                      <Button
                        className="signUpBtn"
                        onClick={updateUser}
                        loading={loading}
                      >
                        <Tooltip open={showTooltip} title={getTooltipTitle()}>
                          Submit
                        </Tooltip>
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
              <Modal
                centered
                open={showCreateModal}
                onCancel={() => setShowCreateModal(false)}
                footer={null}
                className="blog-modal"
              >
                <div className="signUpDiv">
                  <h2 className="signUpText">Create User</h2>
                  <div className="signUpInputs">
                    <div className="inputDiv" style={{ gap: "15px" }}>
                      <StyledLabel>You are</StyledLabel>
                      <div className="you_are_buttons">
                        {possibleUsers.map((user) => (
                          <Button
                            key={user.id}
                            className={
                              user.id == userType
                                ? `ActiveBtn responsiveBtn`
                                : `inActiveBtn responsiveBtn`
                            }
                            style={{
                              border:
                                user.key === userType && "1px solid #8c193f",
                            }}
                            onClick={() => setUserType(user.id)}
                          >
                            {user.value}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Enter your Name</StyledLabel>
                      <StyledInput
                        placeholder="Enter your Name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Enter your Email Id </StyledLabel>
                      <StyledInput
                        placeholder="Enter your Email Id"
                        value={emailId}
                        onChange={(e) => {
                          setEmailId(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <div className="inputDiv">
                      <StyledLabel>Mobile Number</StyledLabel>
                      <div className="mobileNumberSelection">
                        {/* <StyledSelect defaultValue={91} className="responsiveSelect">
                    <Select.Option value={91}>+91</Select.Option>
                  </StyledSelect> */}
                        <StyledInput
                          placeholder="Primary Mobile Number"
                          className="mobileNumberInput"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                          }}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        value={isChecked}
                        onChange={() => setIsChecked((prevState) => !isChecked)}
                        className="checkbox-text"
                      >
                        Use Custom OTP
                      </Checkbox>
                    </div>
                    <div className="signUpBtnContainer">
                      <Button
                        className="signUpBtn"
                        onClick={registerUser}
                        loading={loading}
                      >
                        <Tooltip open={showTooltip} title={getTooltipTitle()}>
                          Submit
                        </Tooltip>
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
