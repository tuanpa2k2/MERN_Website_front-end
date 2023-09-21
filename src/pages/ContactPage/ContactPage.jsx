/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

import { Input } from "antd";

import image from "../../assets/images/news/image-shirt.jpg";

import "./ContactPage.scss";

const ContactPage = () => {
  const { TextArea } = Input;

  return (
    <div className="wrapper-ContactPage">
      <div className="image-slide">
        <span>LIÊN HỆ</span>
        <img src={image} alt="amg" />
      </div>
      <div className="content-contact">
        <div className="diachi">
          <div className="address">
            <div className="children">
              <div className="left-icons">
                <FaUserGraduate />
              </div>
              <div className="infos">
                <span>Chủ sở hữu</span>
                <p>Phí Anh Tuấn</p>
              </div>
            </div>

            <div className="children">
              <div className="left-icons">
                <MdMarkEmailRead />
              </div>
              <div className="infos">
                <span>Email</span>
                <p>tuanpa2k2@gmail.com</p>
              </div>
            </div>
            <div className="children">
              <div className="left-icons">
                <BsFillTelephoneFill />
              </div>
              <div className="infos">
                <span>Số điện thoại</span>
                <p>036 526 9311</p>
              </div>
            </div>
            <div className="children">
              <div className="left-icons">
                <FaLocationDot />
              </div>
              <div className="infos">
                <span>Địa chỉ</span>
                <p>Xã Thuần Thành, huyện Thái Thụy - Thái Bình</p>
              </div>
            </div>
          </div>

          <div className="gg-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5493.190893558539!2d105.80854631299862!3d21.00398387565708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac995a01a6b5%3A0xd3e723db8c691b51!2zOCBOZy4gMTQ0IFAuIFF1YW4gTmjDom4sIE5ow6JuIENow61uaCwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1695274430415!5m2!1svi!2s"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
        <div className="gui-thonhtin">
          <h2>Gửi thông tin cho chúng tôi...</h2>
          <p>
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có
            thể.
          </p>
          <div className="input-change">
            <label>Họ và tên</label>
            <Input placeholder="Nhập họ và tên..." />
          </div>
          <div className="input-change">
            <label>Email</label>
            <Input placeholder="Nhập địa chỉ email..." />
          </div>
          <div className="input-change">
            <label>Số điện thoại</label>
            <Input placeholder="Nhập số điện thoại..." />
          </div>
          <div className="input-change">
            <label>Nội dung</label>
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
              placeholder="Nhập nội dung..."
            />
          </div>
          <button>Gửi phản hồi</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
