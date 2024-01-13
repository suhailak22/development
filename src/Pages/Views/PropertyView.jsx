import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import "./Styles/PropertyView.scss";
import { Pagination } from "swiper/modules";
import "./../Styles/ListCard.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import bedImg from "./../../Assets/bed.png";
import profile from "./../../Assets/user-out.jpg";
import sofaImg from "./../../Assets/sofaIcon.png";
import balconyImg from "./../../Assets/balcony.png";
import Map from "./../../Assets/map42.jpg";

import { MdLocationPin } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { Button, Card, Modal, Tag } from "antd";

import { AppContext } from "../../App";
import { Fetch } from "../../utils/FetchData";
import { IMAGE_BASE_URL } from "../../utils/Contants";
import TextArea from "antd/es/input/TextArea";
import altimg from "./../../Assets/img-alt.jpg";

import {
  formatLargeNumber,
  formatText,
  getAmenityBox,
  getPostedBy,
  getStatus,
} from "../../utils/Helpers";

function PropertyView() {
  const location = useLocation();
  // const Property = location.state.property.operation;
  const { hideBar, updatehidebar } = useContext(AppContext);
  const [Theme, setTheme] = useState(true);
  const [Property, setProperty] = useState({});
  const [status, setStatus] = useState(Property.status);
  const [selectedStatus, setSelectedStatus] = useState(Property.status);
  const [remarks, setremarks] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [propertyImage, setpropertyImage] = useState([]);
  const [page, setPage] = useState("");
  const [path, setPath] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  // const location  = useLocation();
  // const { path, page } = location.state;
  console.log(location, "1234");
  const onchangeModal = async () => {
    setModalOpen(false);
    await Fetch.changeStatus(
      {
        status: selectedStatus,
        remarks: remarks,
        p_id: id,
      },
      setStatus
    );
    setStatus((prevState) => selectedStatus);
  };
  useEffect(() => {
    const fun = async () => {
      const res = await Fetch.getSingleProperty("p_id=" + id);
      // console.log("ressssss", res);

      setProperty(res);
      setStatus((prevState) => res.status);
      setSelectedStatus((prevState) => res.status);
      setpropertyImage((prevState) => res?.images);
      location.state.page && setPage((prevState) => location.state.page);
      location.state.path && setPath((prevState) => location.state.path);
    };

    fun();
  }, []);

  console.log(page, path, "12345");
  function handleTheme(data) {
    setTheme(data);
  }

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

  function getFormattedString(text) {
    return (
      <>
        <span className="desc">
          {text.substring(0, 250).concat("...")}
          <a className="read-more">Read More</a>
        </span>
      </>
    );
  }
  const FeatureArr = [
    "bedroom",
    "balconies",
    "furnish_status",
    "bath",
    "gender",
    "sharing",
    "tenant_preference",
  ];
  function getFeatures(obj) {
    // console.log(
    //   "fsdfadf"
    // )
    switch (obj.title) {
      default:
        break;
      case "bedroom":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <img src={bedImg} alt="imf" />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span
                style={{ color: "#666666", fontWeight: 600, fontSize: "14px" }}
              >
                Beds
              </span>
            </p>
          </div>
        );
      case "balconies":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <img src={balconyImg} alt="imf" />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span
                style={{ color: "#666666", fontWeight: 600, fontSize: "14px" }}
              >
                Balcony
              </span>
            </p>
          </div>
        );
      case "furnish_status":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <img src={sofaImg} alt="imf" />
            </div>
            <p>
              &nbsp;
              <span
                style={{ color: "#666666", fontWeight: 600, fontSize: "14px" }}
              >
                {formatText(obj.value)}
              </span>
            </p>
          </div>
        );
      case "bath":
      case "gender":
      case "sharing":
      case "tenant_preference":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <img src={bedImg} alt="imf" />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span
                style={{ color: "#666666", fontWeight: 600, fontSize: "14px" }}
              >
                Beds
              </span>
            </p>
          </div>
        );
    }
  }
  const openGoogleMaps = () => {
    const mapUrl = `https://www.google.com/maps?q=loc:${Property?.address}`;
    window.open(mapUrl, "_blank");
  };
  return (
    <div className="property-view">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"Property View"}
            Changetheme={handleTheme}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="main-section">
            <div
              className="table-card"
              style={{
                marginLeft: "10px",
              }}
            >
              <div className="content-left">
                <div className="row1">
                  {/* <Slider {...settings}> */}
                  <Swiper
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="property_img_container"
                  >
                    {propertyImage.map((item) => {
                      console.log("status", status);
                      return (
                        <SwiperSlide className="">
                          {/* <img src={property} alt="" /> */}
                          <img
                            src={IMAGE_BASE_URL + item.image_url}
                            alt="property_image"
                            onError={({ currentTarget }) => {
                              currentTarget.src = altimg;
                            }}
                          />
                          <Tag className="property-status">
                            {getStatus(status)}
                          </Tag>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>

                  {/* </Slider> */}
                  <div className="property-detail-cont">
                    <div className="detailss">
                      <div className="detail-head">
                        <h3>{formatText(Property.property_name)}</h3>
                        <p>
                          ID: <span>{Property.p_id}</span>
                        </p>
                      </div>
                      <span>
                        {formatText(Property?.property_action)}&nbsp;|| &nbsp;
                        {formatText(Property?.property_type?.pt_name)}
                      </span>
                      <h5 className="property-address">
                        <MdLocationPin />
                        {formatText(Property?.address)}
                      </h5>

                      {/* <div className="star-count-cont">
                        <div style={{ color: "#FDCC0D" }}>
                          <AiFillStar />4
                        </div>
                        <span>|</span>
                        <span>4 ratings</span>
                      </div> */}
                      <p>
                        &#8377; {formatLargeNumber(Property?.expected_price)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row2">
                  <div className="property-details">
                    {Property?.description && (
                      <div className="desc">
                        <h3>Description :</h3>
                        <p>{formatText(Property?.description)}</p>
                      </div>
                    )}
                    {Property?.features?.filter((item) => {
                      return FeatureArr.includes(item.title);
                    }).length > 0 && (
                      <div className="features">
                        {Property?.features?.map(
                          (item) => item.value !== 0 && getFeatures(item)
                        )}
                        {/* {propertyData?.features.map((item)=>console.log(item))} */}
                      </div>
                    )}
                    <div className="amenities">
                      {Property?.features?.map((item) => {
                        console.log("item", item?.title === "gender");
                        item?.title === "gender" && (
                          <div className="amenity">
                            <span>Operating Since</span>
                            <p>{item?.title}</p>
                          </div>
                        );
                      })}
                      {Property?.area?.carpet_area && (
                        <div className="amenity">
                          <span>Carpet Area</span>
                          <p>{Property?.area?.carpet_area}</p>
                        </div>
                      )}
                      {Property?.area?.super_area && (
                        <div className="amenity">
                          <span>Super Area</span>
                          <p>
                            {Property?.area?.super_area}{" "}
                            <span>{Property?.area?.super_area_unit}</span>
                          </p>
                        </div>
                      )}
                      {Property?.availability && (
                        <div className="amenity">
                          <span>Status</span>
                          <p>{formatText(Property?.availability)}</p>
                        </div>
                      )}
                      {Property?.facing && (
                        <div className="amenity">
                          <span>Facing</span>
                          <p>{formatText(Property?.facing)}</p>
                        </div>
                      )}
                      <div className="amenity">
                        <span>Rera ID</span>
                        <p>Approved</p>
                      </div>
                    </div>
                    <div className="amenities-card">
                      {Property?.amenities?.length > 0 && (
                        <div className="amenities-section">
                          {Property?.amenities &&
                            Property?.amenities?.map((item) =>
                              getAmenityBox(item?.title)
                            )}
                        </div>
                      )}
                    </div>
                    <div className="status-and-back">
                      <Button type="primary" onClick={() => setModalOpen(true)}>
                        Change Status
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(-1, {
                            state: {
                              path: path,
                              page: page,
                            },
                          });
                        }}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                  <div className="contact-details">
                    <div className="map-container">
                      <button className="map" onClick={openGoogleMaps}>
                        <img src={Map} alt="" />
                      </button>
                    </div>
                    {/* <div className="contact">
                    <h3>Contact Owner</h3>
                    <div className="user-cont">
                      <div className="avatar-cont">
                        <img src={profile} alt="" />
                      </div>
                      <div className="meta-cont">
                        <h3>{formatText(Property.seller_details.username)}</h3>
                        <p>
                          <b>+91 &nbsp;</b>
                          {Property.seller_details.mobile_number}
                        </p>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <Card
                className="table-card"
                style={{ borderRadius: 0 }}
                loading={!Property}
              >
                <div className="user-cont">
                  <div className="avatar-cont">
                    <img
                      src={Property?.seller_details?.profile}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src = profile;
                      }}
                    />
                  </div>
                  <div className="meta-cont">
                    <h3>{formatText(Property?.seller_details?.username)}</h3>
                    <p>
                      {formatText(
                        getPostedBy(Property?.seller_details?.user_type_id)
                      )}
                    </p>
                    <Tag style={{ marginTop: "5px" }}>
                      {formatText(
                        getUserPlan(Property?.seller_details?.plan_id)
                      )}
                    </Tag>
                  </div>
                </div>
                <hr />
                <div className="content-right">
                  <div className="content-cont">
                    <div className="content">
                      <span>Mobile Number:</span>
                      <p>
                        {" "}
                        {formatText(Property?.seller_details?.mobile_number)}
                      </p>
                    </div>
                    <div className="content">
                      <span>Email:</span>
                      <p> {formatText(Property?.seller_details?.email)}</p>
                    </div>
                    <div className="content">
                      <span>Location:</span>
                      <p>{Property?.location}</p>
                    </div>
                    <div className="content">
                      <span>Locality:</span>
                      <p>{formatText(Property?.locality)}</p>
                    </div>
                    <div className="content">
                      <span>Report Count:</span>
                      <p>{parseInt(Property?.report_count)}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="count-cont">
                    <p>Post Count</p>
                    <h1>{Property?.seller_details?.properties_posted}</h1>
                  </div>
                  <Modal
                    title="Alert : Changes Might Affect Properties View Page "
                    centered
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    okText={"Change Status"}
                    onOk={() => onchangeModal()}
                  >
                    <div className="btn-grid">
                      <Button
                        className={selectedStatus == "0" && "selected-status"}
                        onClick={() => setSelectedStatus(0)}
                      >
                        Reject
                      </Button>

                      <Button
                        className={selectedStatus == "1" && "selected-status"}
                        onClick={() => setSelectedStatus(1)}
                      >
                        Post
                      </Button>
                      <Button
                        className={selectedStatus == "2" && "selected-status"}
                        onClick={() => setSelectedStatus(2)}
                      >
                        Keep in Review
                      </Button>
                    </div>
                    <div className="remarks-cont">
                      <label>Remarks:</label>
                      <TextArea
                        onChange={(e) => setremarks(e.target.value)}
                        required
                      />
                    </div>
                  </Modal>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyView;
