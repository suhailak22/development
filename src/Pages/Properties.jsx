import React, { useContext, useEffect, useState } from "react";
import "./Styles/Properties.scss";
import "./Styles/ListCard.scss";
import Header from "../Components/Header";
import {
  Button,
  ConfigProvider,
  Input,
  Pagination,
  Select,
  Table,
  Tag,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { AppContext } from "../App";
import { Fetch } from "../utils/FetchData";
import { HiMiniEye } from "react-icons/hi2";
import {
  APP_BASE_URL,
  BACKEND_BASE_URL,
  IMAGE_BASE_URL,
} from "../utils/Contants";
import altimg from "./../Assets/img-alt.jpg";
import axios from "axios";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Loader from "../Components/Loader";
import confirm from "antd/es/modal/confirm";
import {
  formatLargeNumber,
  getPostedBy,
  getStatus,
  queryStringToObject,
} from "../utils/Helpers";
import { useLocation } from "react-router-dom";

function Properties() {
  const lsc = JSON.parse(localStorage.getItem("property_filter"));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [propertiesData, setPropertiesData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [Search, setSearch] = useState("");
  const [pageNo, setpageNo] = useState(lsc.page ? lsc.page : 1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Filters, setFilters] = useState(
    lsc.filters
      ? lsc.filters
      : {
          location: [],
          status: ["posted", "in_review", "sold", "rejected", "cancelled"],
          property_type: [],
          seller_type: [],
          property_action: [],
          sort: [],
          order: [],
        }
  );

  const col = [
    {
      title: " ",
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
      render: (data) => (
        <>
          <div className="property-name-container">
            <p>{data.name}</p>
            <p>
              ID: <span>{data.id}</span>
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: "10%",
      filterMode: "tree",
      filterSearch: true,
      activFilter: true,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "success" : "green";
            if (tag === "1") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {/* <span></span> */}
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: "Posted",
          value: "posted",
        },
        {
          text: "In Review",
          value: "in_review",
        },
        {
          text: "Sold",
          value: "sold",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      defaultFilteredValue:Filters.status
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "10%",
      filterMode: "tree",
      filterSearch: true,
      activFilter: true,
      filters: [
        {
          text: "Flat",
          value: "Flat",
        },
        {
          text: "House",
          value: "house",
        },
        {
          text: "Villa",
          value: "Villa",
        },
        {
          text: "Plot",
          value: "Plot",
        },
        {
          text: "Office",
          value: "Office",
        },
        {
          text: "Shop",
          value: "Shop",
        },
      ],
      defaultFilteredValue:Filters.property_type
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      filterMode: "tree",
      filterSearch: true,
      activFilter: true,
      filters: [
        {
          text: "sell",
          value: "sell",
        },
        {
          text: "Rent",
          value: "rent",
        },
        {
          text: "PG",
          value: "PG",
        },
      ],
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      activSort: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Posted",
      dataIndex: "posted",
      width: "10%",
      filterMode: "tree",
      filterSearch: true,
      activFilter: true,
      filters: [
        {
          text: "Buyer",
          value: "Buyer",
        },
        {
          text: "Agent",
          value: "Agent",
        },
        {
          text: "Builder",
          value: "Builder",
        },
      ],
      defaultFilteredValue:Filters.selle_type
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "10%",
      activSort: true,
      sorter: (a, b) => a.age - b.age,
      
    },
    // {
    //   title: "Action",
    //   key: "operation",
    //   render: (data) => {
    //     return (
    //       <div className="icon-btns">
    //         <button
    //           onClick={() => {
    //             navigate(`/property_details/${data.key}`, {
    //               state: {
    //                 property: data,
    //               },
    //             });
    //           }}
    //         >
    //           <HiMiniEye />
    //         </button>
    //         <DeleteOutlined
    //           title="Delete Property"
    //           onClick={() => showDeleteConfirm(data)}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];
  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this Property?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteSingleProperty(item);
      },
      onCancel() {
        console.log("cancel");
      },
      centered: true,
    });
  };

  const createQueryString = () => {
    let p = "";
    Object.keys(Filters).forEach((key) => {
      console.log("first", Filters[key], key);
      if (Filters[key] && Filters[key].length !== 0) {
        p += `&${key}=${Filters[key].join(",")}`; // Use .join(',') to concatenate array elements with a comma
      }
    });
    return p;
  };

  useEffect(() => {
    setLoading(true);
    getprop();
    setpageNo((prevState) => 1);
  }, [Filters]);

  useEffect(() => {
    setLoading(true);
    getprop();
  }, [pageNo]);
  useEffect(() => {
    getLocation();
    // if (localStorage.getItem("property_filter")) {
    //   const lsc = JSON.parse(localStorage.getItem("property_filter"));
    //   console.log(lsc,'lsc')
    //   setFilters((prvState) => lsc.filters);
    //   setpageNo((prevState) => lsc.page);
    // }
  }, []);

  const getLocation = async () => {
    const result = await Fetch.getLocation("location=city&state=31");

    const LocationFilters = [];
    result.city.map((item) => {
      LocationFilters.push({
        value: item.city,
        label: item.city,
      });
    });
    setLocationFilter((prevState) => LocationFilters);
  };
  const getprop = async () => {
    let param = createQueryString();

    if (pageNo > 1) {
      param += "&page_number=" + pageNo;
    } else {
      const count = await Fetch.getPropertiesCount(param);
      setTotal(() => count.count);
      setpageNo((prevState) => 1);
    }
    const propertyData = await Fetch.getProperties(param).then((e) => {
      setLoading(false);
      GetProprtiesData(e);
    });
  };

  const getSellerTypeID = (seller) => {
    seller?.map((item, index) => {
      seller[index] = getSellerType(item);
    });
    return seller;
  };
  const getSellerType = (seller) => {
    switch (seller) {
      default:
        return "Unknown";
      case "Buyer":
        return "1";
      case "Agent":
        return "2";
      case "Builder":
        return "3";
    }
  };

  async function handleDeleteSingleProperty(item) {
    const response = await axios.delete(`${APP_BASE_URL}/Properties/delete`, {
      data: {
        p_id: item.operation.p_id,
      },
    });
    if (response.status === 200) {
      notification.success({
        message: "Propety Deleted Successfully",
      });
      // window.location.reload(true);
    } else {
    }
  }
  async function handleDeleteMultipleProperty() {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/properties/delete`,
      {
        data: {
          p_id: selectedRowKeys,
        },
      }
    );
    if (response.status === 200) {
      notification.success({
        message: "Propeties Deleted Successfully",
      });
      window.location.reload(true);
    } else {
      console.log(response);
    }
  }

  const GetProprtiesData = (data) => {
    const result = [];
    !data.message &&
      data?.map((item) => {
        let res = {
          key: item.p_id,
          img: IMAGE_BASE_URL + item.images[0]?.image_url,
          name: {
            name: item?.property_name,
            id: item?.p_id,
          },
          tags: getStatus(item.status),
          type: item?.property_type.pt_name,
          action: item?.property_action,
          price: formatLargeNumber(item?.expected_price),
          posted: getPostedBy(item.seller_details?.user_type_id),
          date: item?.created_at,
          operation: item,
        };
        result.push(res);
      });
    setPropertiesData(result);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChangeLocation = (value) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        location: [value],
        property_type: Filters?.property_type,
        property_action: Filters?.property_action,
        status: Filters?.status,
        seller_type: Filters?.seller_type,
        sort: Filters?.sort,
        order: Filters?.order,
      };
    });
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // if (pagination.current == pageNo) {
    setFilters((prevState) => {
      return {
        ...prevState,
        property_type: filters.type,
        property_action: filters.action,
        status: !filters.Status
          ? ["posted", "in_review", "sold", "rejected", "cancelled"]
          : filters.Status,
        seller_type: getSellerTypeID(filters.posted),
        sort: sorter.column
          ? [
              sorter?.field === "price"
                ? "expected_price"
                : sorter.field === "date"
                ? "created_at"
                : sorter?.field,
            ]
          : [],
        order: sorter.column
          ? [sorter?.order.split("").slice(0, -3).join("")]
          : [],
      };
    });
    // } else {
    //   setpageNo(() => pagination.current);
    // }
  };

  return (
    <div className="properties">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Properties"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="table-card">
              <div className="card-head">
                <div className="head-left">
                  <h3>Properties</h3>
                  <span
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {hasSelected
                      ? `Selected ${selectedRowKeys.length} items`
                      : ""}
                  </span>
                </div>
                <div className="filters">
                  <Button
                    className="deleteSelectedItems"
                    disabled={!(selectedRowKeys.length != "0")}
                    onClick={() => handleDeleteMultipleProperty()}
                  >
                    Delete Properties
                  </Button>
                  <Select
                    showSearch
                    placeholder="Select City"
                    optionFilterProp="children"
                    onChange={(value) => onChangeLocation(value)}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    options={locationFilter}
                  />
                  <div className="search-cont">
                    <Input
                      placeholder="Search By ID"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      onClick={() => navigate("/property_details/" + Search)}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              {/* <List tableData={tableData} checkedData={handleCheck}/> */}
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      headerBg: "#000",
                      borderColor: "#000",
                    },
                  },
                }}
              >
                <Table
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        localStorage.setItem(
                          "property_filter",
                          JSON.stringify({
                            filters: Filters,
                            page: pageNo,
                          })
                        );
                        navigate("/property_details/" + record.key, {
                          state: {
                            path: createQueryString(),
                            page: pageNo,
                          },
                        });
                      },
                    };
                  }}
                  columns={col}
                  rowSelection={rowSelection}
                  dataSource={propertiesData}
                  onChange={onChange}
                  pagination={false}
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
                    setpageNo((prevState) => page_number)
                  }
                />
              </ConfigProvider>
            </div>
          </div>
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
}

export default Properties;
