import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { images, propertyCardStyles } from "../../../../../../../common/styles";
import "../../../../best-offers/best-offers.css";
import "./project-is.css";

const StyledDiv = styled.div`
  width: 99.5%;
  position: relative;
`;

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="slider-button"
      style={{
        position: "absolute",
        top: "36%",
        left: "-2%",
        zIndex: 1,
      }}
    >
      <LeftOutlined />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="slider-button"
      style={{
        position: "absolute",
        top: "36%",
        right: "-1%",
      }}
    >
      <RightOutlined />
    </button>
  );
};

const ProjectsImageSlider = ({ data }) => {
  const settings = {
    slidesToShow: 4,
    lazyLoad: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <StyledDiv>
      <Slider {...settings}>
        {images.map((item) => (
          <>
            <div
              key={item.id}
              style={{
                borderRadius: "5px",
                height: "250px",
                width: "95%",
                display: "flex",
                flexDirection: "column",
                cursor:"pointer"
              }}
            >
              <div
                style={{
                  height: "50%",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <div className="project-content">
                <div className="left-panel">
                  <span style={propertyCardStyles.propertyDescCommon}>
                    2BHK Flat | 3200 Sqft
                  </span>
                  <span style={propertyCardStyles.builderName}>
                    Town City | House
                  </span>
                  <span style={propertyCardStyles.propertyDescCommon}>
                    Bangalore, city
                  </span>
                  <span style={propertyCardStyles.propertyDescCommon}>
                    Ready To Move
                  </span>
                </div>
                <div className="right-panel">
                  <span style={propertyCardStyles.propertyPrice}>
                    ₹ 65 Lakh
                  </span>
                </div>
              </div>
            </div>
          </>
        ))}
      </Slider>
    </StyledDiv>
  );
};

export default ProjectsImageSlider;
