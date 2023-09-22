import React from "react";
import "./recommended-property.css";
import { SwapRightOutlined } from "@ant-design/icons";
import RecommendedImageSlider from "./image-slider/RecommendedImageSlider";

const RecommendedProperty = () => {
  return (
    <div className="recommended-property_section">
      <div className="header-sec">
        <div className="text-intro">
          <h1>Recommended Property</h1>
          <p>Featured Residential projects across Bangalore</p>
        </div>
        <div className="allPropBtn">
          <span>See all property</span>
          <SwapRightOutlined />
        </div>
      </div>
      <RecommendedImageSlider />
    </div>
  );
};

export default RecommendedProperty;
