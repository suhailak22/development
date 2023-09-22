import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import "./best-offers.css";
import { items } from "../../../../utils/Utils";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { images } from "../../../../common/styles";

const StyledDiv = styled.div`
  width: 69%;
  height: 160px;
  margin-top : -20px
`;

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="slider-button"
      style={{
        position: "relative",
        left: "-50%",
        top: "80px",
        zIndex : 1
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
        position: "relative",
        left: "48%",
        top: "-112px",
      }}
    >
      <RightOutlined />
    </button>
  );
};

const ImageSlider = ({ data }) => {
  const settings = {
    slidesToShow: 4,
    lazyLoad: true,
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <StyledDiv>
      <Slider {...settings}>
        {images.map((item) => (
          <>
            <div key={item.id} className="slider-card">
              <div className="property-image-sec">
                <img
                  src={
                    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                />
              </div>
              <p
                className="property-name"
                style={{
                  textAlign: "left",
                  position: "relative",
                  top: "-15%",
                  left: "5px",
                }}
              >
                Sowparnika Pragati
              </p>
            </div>
          </>
        ))}
      </Slider>
    </StyledDiv>
  );
};

export default ImageSlider;
