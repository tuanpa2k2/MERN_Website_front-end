import React, { useEffect } from "react";
import AOS from "aos";
import { FaLocationArrow } from "react-icons/fa";
import { BsTelephoneForward, BsEnvelopeCheck } from "react-icons/bs";
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from "react-icons/bs";

import "./FooterComponent.scss";

const FooterComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="wrapper-footerComp">
      <div className="footer-content">
        <div
          className="col"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <div className="title">About</div>
          <div className="text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            beatae nesciunt maiores molestiae dolore. Fuga, minus saepe facere
            perspiciatis voluptate soluta aspernatur dolorum sed amet temporibus
            in iusto eligendi expedita.
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">Thái Thụy - Thái Bình</div>
          </div>
          <div className="c-item">
            <BsTelephoneForward />
            <div className="text">Phone: 0336 526 9311</div>
          </div>
          <div className="c-item">
            <BsEnvelopeCheck />
            <div className="text">Email: tuanpa2k2@gmail.com</div>
          </div>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <div className="title">Categories</div>
          <span className="text">Books English</span>
          <span className="text">Máy tính</span>
          <span className="text">Đồ dùng học tập</span>
          <span className="text">Điện thoại</span>
          <span className="text">Giày dép</span>
          <span className="text">Quần áo</span>
        </div>
        <div
          className="col"
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
          data-aos-duration="1000"
        >
          <div className="title">Page</div>
          <span className="text">home</span>
          <span className="text">about</span>
          <span className="text">Contact us</span>
          <span className="text">facebook</span>
          <span className="text">React JS</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="waves-image">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <div className="bottom-bar-content">
          <div className="text">
            created by TuanPA - Latest Design Template.
          </div>
          <div className="group-icon">
            <div className="text-icon">Following - Will be any more</div>
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsTiktok />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
