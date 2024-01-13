import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import "./Styles/PropertyView.scss";
import "./../Styles/ListCard.scss";
import profile from "./../../Assets/images.jpeg";
import bedImg from "./../../Assets/bed.png";
import bathImg from "./../../Assets/shower.png";
import sofaImg from "./../../Assets/sofaIcon.png";
import balconyImg from "./../../Assets/balcony.png";
import property from "./../../Assets/property.jpg";
import Map from "./../../Assets/Map.jpg";
// import floorIcon from "../../../assets/tabler-icon-stairs-down.png";

import {
  useLocation,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { Avatar, Button, Card, Modal, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { AppContext } from "../../App";
import { formatText, getPostedBy, getStatus } from "../../../utils/Helpers";

function PropertyView() {
  const { hideBar, updatehidebar } = useContext(AppContext);

  const [Theme, setTheme] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const Property = location.state.property.operation;
  useEffect(() => {
    console.log(Property, "Property");
  }, 1000);

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
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <img src={bathImg} alt="imf" />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span
                style={{ color: "#666666", fontWeight: 600, fontSize: "14px" }}
              >
                Bath
              </span>
            </p>
          </div>
        );
    }
  }
  const openGoogleMaps = () => {
    const mapUrl = `https://www.google.com/maps?q=${Property?.latitude},${Property.longitude}`;
    window.open(mapUrl, '_blank');
  };
  return (
    <div className="property-view">
      <div className="page-content" style={{ width: !hideBar ? "82%" : "95%" }}>
        <div className="page-section">
          <Header
            pagePath={"User Profile"}
            Changetheme={handleTheme}
            width={!hideBar ? "75%" : "85%"}
          />
          <div className="main-section">
            <div className="table-card">
              <div className="content-left">
                <div className="property_img_container">
                  <img src={property} alt="" />
                  {/* <img src={location.state.property.img} alt="" /> */}
                </div>
                <div className="property-details">
                  <div className="features">
                    {Property?.features.map((item) => getFeatures(item))}
                    {/* {propertyData?.features.map((item)=>console.log(item))} */}
                  </div>
                  <div className="amenities">
                    <div className="amenity">
                      <span>Area</span>
                      <p>10000</p>
                    </div>
                    <div className="amenity">
                      <span>Status</span>
                      <p>Ready to move</p>
                    </div>
                    <div className="amenity">
                      <span>Facing</span>
                      <p>North</p>
                    </div>
                    <div className="amenity">
                      <span>Rera ID</span>
                      <p>Approved</p>
                    </div>
                  </div>
                </div>
                <div className="contact-details">
                  <div className="map-container">
                    <button className="map" onClick={openGoogleMaps}>
                      <img src={Map} alt="" />
                    </button>
                  </div>
                  <div className="contact">
                    <h3>Contact Owner</h3>
                    <div className="user-cont">
                  <div className="avatar-cont">
                    <img src={profile} alt="" />
                  </div>
                  <div className="meta-cont">
                    <h3>{formatText(Property.seller_details.username)}</h3>
                    <p><b>+91 &nbsp;</b>{Property.seller_details.mobile_number}</p>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <Card  className="table-card" style={{ width: "100%", marginTop: "20px",borderRadius:0 }} loading={hideBar}>
                <div className="user-cont">
                  <div className="avatar-cont">
                    <img src={profile} alt="" />
                  </div>
                  <div className="meta-cont">
                    <h3>{formatText(Property.seller_details.username)}</h3>
                    <p>
                      {formatText(
                        getPostedBy(Property.seller_details.user_type_id)
                      )}
                    </p>
                    <Tag style={{ marginTop: "5px" }}>
                      {formatText(getUserPlan(Property.seller_details.plan_id))}
                    </Tag>
                  </div>
                  <div className="count-cont">
                    <p>Post Count</p>
                    <h1>{Property.seller_details.properties_posted}</h1>
                  </div>
                </div>
                <hr />
                <div className="content-right">
                  {/* <div className="btn-add-back">
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/properties_edit");
                    }}
                  >
                    Add Property
                  </Button>
                  
                </div> */}
                  <div className="right-main">
                    <h3>{formatText(Property.property_name)}</h3>
                    <p>
                      {formatText(Property.real_estate)}&nbsp;|| &nbsp;
                      {formatText(location.state.property.type)}
                    </p>
                    <p>{formatText(location.state.property.action)}</p>
                  </div>
                  <hr />
                  <div className="content-cont">
                    <div className="content">
                      <span>Address:</span>
                      <p> {formatText(Property.address)}</p>
                    </div>
                    <div className="content">
                      <span>Location:</span>
                      <p>{Property.location}</p>
                    </div>
                    <div className="content">
                      <span>Locality:</span>
                      <p>{Property.locality}</p>
                    </div>
                    <div className="content">
                      <span>Price:</span>
                      <p>{Property.expected_price}</p>
                    </div>
                    <div className="content">
                      <span>Status:</span>
                      <p>
                        <Tag>{getStatus(Property.status)}</Tag>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="status-and-back">
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                      Click to Change Status
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/properties");
                      }}
                    >
                      Back
                    </Button>
                  </div>
                  <Modal
                    title="Alert : Changes Might Affect Properties View Page "
                    centered
                    open={modalOpen}
                  >
                    <div className="btn-grid">
                      <Button onClick={() => setModalOpen(false)}>
                        Reject
                      </Button>
                      <Button onClick={() => setModalOpen(false)}>Post</Button>
                      <Button onClick={() => setModalOpen(false)}>
                        Keep in Review
                      </Button>
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
