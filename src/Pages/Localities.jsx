import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import property from "./../Assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg";
import "./Styles/Localities.scss";
import "./Styles/ListCard.scss";
import { HiMiniPlus, HiViewfinderCircle } from "react-icons/hi2";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Select,
  Upload,
} from "antd";
import { AppContext } from "../App";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import { Fetch } from "../utils/FetchData";
import { BLOG_IMAGE_BASE_URL } from "../utils/Contants";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";

function Localities() {
  const { confirm } = Modal;
  const { hideBar, updatehidebar } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);
  console.log("res---->", selectedState);
  const [refresh, setrefresh] = useState(false);
  const [localityData, setlocalityData] = useState([]);
  const [edit, setedit] = useState(localityData.some((e) => e.locality === ""));
  console.log("localityData", localityData[0]);
  useEffect(() => {
    const getState = async () => {
      const res = await Fetch.get_states(" ");
      let result = [];
      // console.log(res,"res--->")
      res.state.forEach((item) => {
        result.push({
          label: item.state,
          value: item.state_id,
        });
      });
      console.log(result, "res--->");
      setStates(result);
    };
    getState();
  }, []);

  const LocalityList = ({ item, index }) => {
    const [enableInput, setEnableInput] = useState(false);
    const [locality, setLocality] = useState(localityData[index]["locality"]);
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function handleOnchangeInput() {
      localityData[index]["locality"] = locality;
      setedit(locality === "");
      setEnableInput((prevState) => false);
      const updateLocality = async () => {
        const res = await Fetch.update_locality({
          locality_id: item.key,
          locality: capitalizeFirstLetter(locality),
        });
      };
      const addLocality = async () => {
        const res = await Fetch.add_locality({
          locality: capitalizeFirstLetter(locality),
          city_id: selectedCity,
        });
      };
      item.key === 0 ? addLocality() : updateLocality();
    }
    const showDeleteConfirm = (item) => {
      confirm({
        title: "Are you sure delete this Locality?",
        icon: <ExclamationCircleFilled />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          handleDelete(item);
        },
        onCancel() {
          console.log("cancel");
        },
        centered: true,
      });
    };
    function handleDelete(index) {
      let newData = localityData;
      const deleteLocality = async () => {
        const res = await Fetch.delete_locality({ locality_id: item.key });
      };
      setedit(() => localityData.some((e) => e.locality === ""));

      if (newData[0].locality === "") {
        newData.shift();
      } else {
        deleteLocality();
        newData.pop(index);
      }
      setlocalityData((prevState) => {
        return [...newData];
      });

      deleteLocality();
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        {enableInput ? (
          <Input
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            style={{
              width: "250px",
            }}
          />
        ) : (
          <span>{item.locality}</span>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          {enableInput ? (
            <CheckOutlined onClick={() => handleOnchangeInput()} />
          ) : (
            <EditOutlined onClick={() => setEnableInput((prevState) => true)} />
          )}
          <DeleteOutlined onClick={() => showDeleteConfirm(index)} />
        </div>
      </div>
    );
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const getCities = async (value) => {
    const res = await Fetch.get_cities(value);
    let result = [];
    console.log(res, "res--->");
    res.city.forEach((item) => {
      result.push({
        label: item.city,
        value: item.city_id,
      });
    });
    console.log(result, "res--->");
    setCities(result);
  };
  const getLocalities = async (value) => {
    const res = await Fetch.get_localities(value);
    let result = [];
    console.log(res, "res--->");
    res.locality.forEach((item, index) => {
      result.push({
        key: item.locality_id,
        locality: item.locality,
      });
    });
    console.log(result, "res--->");
    setlocalityData(result);
  };
  const handleSelectState = (value) => {
    setSelectedState(value);
    getCities(value);
  };
  const handleSelectCity = (value) => {
    setSelectedCity(value);
    getLocalities(value);
  };

  const searchLocality = async (value) => {
    const res = await Fetch.search_locality(
      "city_id=" + selectedCity + "&search=" + value
    );
    let result = [];
    res.locality.forEach((item, index) => {
      result.push({
        key: item.locality_id,
        locality: item.locality,
      });
    });
    console.log(result, "res--->");
    setlocalityData(result);
  };
  return (
    <div className="localities">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header pagePath={"Localities"} width={!hideBar ? "75%" : "85%"} />
          <div className="main-section">
            <div className="table-card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <label>Select State:</label>
                    <Select
                      showSearch
                      placeholder="Select State"
                      optionFilterProp="children"
                      onChange={(value) => handleSelectState(value)}
                      // onSearch={onSearch}
                      filterOption={filterOption}
                      options={states}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <label>Select City:</label>
                    <Select
                      showSearch
                      placeholder="Select District"
                      optionFilterProp="children"
                      onChange={(value) => handleSelectCity(value)}
                      // onSearch={onSearch}
                      filterOption={filterOption}
                      options={cities}
                    />
                  </div>
                  <Button
                    onClick={() =>
                      setlocalityData((prevState) => {
                        let newData = {
                          key: 0,
                          locality: "",
                        };
                        let prev = localityData;
                        setedit(true);
                        prev.unshift(newData);
                        return [...prev];
                      })
                    }
                    disabled={edit || selectedCity === 0 || selectedState === 0}
                  >
                    Add Locality
                  </Button>
                  <Input
                    placeholder="Search for locality"
                    disabled={selectedCity === 0}
                    onChange={(e) => searchLocality(e.target.value)}
                    style={{
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <List
                  bordered
                  dataSource={localityData}
                  renderItem={(item, index) => (
                    <List.Item>
                      <LocalityList item={item} index={index} />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Localities;
