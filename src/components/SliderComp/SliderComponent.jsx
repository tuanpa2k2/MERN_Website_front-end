import React from "react";
import { Image } from "antd";
import Slider from "react-slick";
import "./SliderComponent.scss";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    // <div className="wrapper-sliderComp">
    <Slider {...settings} className="wrapper-sliderComp">
      {arrImages.map((img) => {
        return (
          <Image
            key={img}
            src={img}
            alt="slider"
            preview={false}
            width="100%"
            height="500px"
            className="image-slider"
          />
        );
      })}
    </Slider>
    // </div>
  );
};

export default SliderComponent;
