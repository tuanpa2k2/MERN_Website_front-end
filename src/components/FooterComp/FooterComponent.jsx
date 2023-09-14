import React, { useEffect, useState } from "react";
import AOS from "aos";
import { FaLocationArrow } from "react-icons/fa";
import { BsTelephoneForward, BsEnvelopeCheck } from "react-icons/bs";
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from "react-icons/bs";
import * as ProductService from "../../services/ProductService";
import TypeProductComponent from "../TypeProductComp/TypeProductComponent";

import "./FooterComponent.scss";

const FooterComponent = () => {
  const [typeProduct, setTypeProduct] = useState([]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();

    if (res.status === "OK") {
      setTypeProduct(res.data);
    }
    return res;
  };

  // Gọi luôn type product
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="wrapper-footerComp">
      <div className="footer-content">
        <div className="col" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
          <div className="title">Giới thiệu</div>
          <div className="text">
            Dự án cá nhân đầu tiên tự học, có những chỗ chưa hoàn thành logic nên mong mọi người bỏ qua cho mình nhé
            <br />
            <p style={{ color: "blue", fontSize: "2rem" }}>THANKS ALL</p>
          </div>
        </div>
        <div className="col" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
          <div className="title">Liên hệ</div>
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
        <div className="col" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
          <div className="title">Thể loại</div>
          {typeProduct.map((type) => {
            return (
              <span key={type} className="text">
                <TypeProductComponent key={type} name={type} />
              </span>
            );
          })}
        </div>
        <div className="col" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
          <div className="title">Trang</div>
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
          <div className="text">created by TuanPA - Latest Design Template.</div>
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
