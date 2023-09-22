import React from "react";
import "./best-offers.css";
import ImageSlider from "./ImageSlider";
import { AdvertisementSlider } from "./advertisement-slider/AdvertisementSlider";
import adImage from "../../../../assets/adImage.png";

const BestOffers = () => {
  return (
    <div className="best-offers-page">
      <h2>Best Offers for you</h2>
      <span className="divider" />
      <div className="carousel_advertisment">
        <ImageSlider />
        <div className="albion-advertisements">
          <div className="static-banner">
            <img src={adImage} className="ad-img" />
          </div>
          <div className="dynamic_banner">
            <AdvertisementSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOffers;
