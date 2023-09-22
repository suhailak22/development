import React from "react";
import Slider from "react-slick";
import { images, propertyCardStyles } from "../../../../../../../common/styles";
import "./featured-image-slider.css";
import { Button } from "antd";

const FeaturedImageSlider = () => {
  const settings = {
    slidesToShow: 3,
    lazyLoad: true,
    centerMode: true,
    centerPadding: "-60px",
  };

  return (
    <Slider {...settings} style={{ marginTop: "-30px" }}>
      {images.map((item) => (
        <>
          <div key={item.id} className="property-card">
            <div
              style={{
                height: "60%",
                width: "100%",
                cursor:"pointer"
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={
                  "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </div>
            <div className="product-card_footer">
              <section className="left-panel">
                <span style={propertyCardStyles.propertyDescCommon}>2 BHK</span>
                <span style={propertyCardStyles.builderName}>
                  Candeur Sunshine
                </span>
                <span style={propertyCardStyles.propertyDescCommon}>3,4 BHK Apartment, Whitefield, Bangalore East</span>
                <span style={propertyCardStyles.propertyDescCommon}>Ready To Move</span>
              </section>
              <section className="right-panel">
                <span style={propertyCardStyles.priceSpan}>&#x20B9;&nbsp; <span style={propertyCardStyles.propertyPrice}>65 Lakh</span>&nbsp; onwards</span>
                <Button className="viewDetailsBtn">VIEW DETAILS</Button>
              </section>
            </div>
          </div>
        </>
      ))}
    </Slider>
  );
};

export default FeaturedImageSlider;
