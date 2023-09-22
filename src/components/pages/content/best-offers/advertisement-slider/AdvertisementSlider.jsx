import React from "react";
import "./advertise.css";
import { images } from "../../../../../common/styles";
import Slider from "react-slick";

const CustomDots = (dots) => {
  return (
    <div
      style={{
        position: "relative",
        top: "-150%",
        left : "-10px"
      }}
    >
      <ul style={{ margin: "0px" }}>
        {dots.map((dot) => (
          <li
            style={{
                width : "20px",
            }}
            key={dot.key}
          >
            <button
              style={{
                backgroundColor: "transparent",
                borderRadius : "100%",
                transform : "scale(1.5  )"
              }}
            >
              {dot.props.children}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AdvertisementSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    lazyLoad: true,
    appendDots: CustomDots,
    dots: true,
  };
  return (
    <div>
      <Slider
        {...settings}
        style={{
          width: "100%",
          height: "235px",
          overflow: "hidden",
          cursor : "pointer"
        }}
      >
        {images.map((item) => (
          <>
            <div key={item.id}>
              <img
                src={
                  "https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=1024x1024&w=is&k=20&c=C9JwCd6nvW_0hmfolDgi5uq2yAqeNWwyqLgZdODGsEQ="
                }
              />
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};
