import React from "react";

import banner from "../../assets/images/news/banner5.jpg";
import img1 from "../../assets/images/news/fancy-festival-t-shirt-026.jpg";
import img2 from "../../assets/images/news/balo2.jpg";
import img3 from "../../assets/images/news/mu1.jpg";
import img4 from "../../assets/images/news/banner5.jpg";
import r1 from "../../assets/images/news/girl.jpg";
import r2 from "../../assets/images/news/headphone.jpg";
import r3 from "../../assets/images/news/giay.jpg";
import r4 from "../../assets/images/news/laptop.jpg";

import "./NewPage.scss";

const NewPage = () => {
  return (
    <div className="wrapper-NewPage">
      <div className="image-slide">
        <span>TIN TỨC</span>
        <img src={banner} alt="amg" />
      </div>
      <div className="content-news">
        <div className="left">
          <h2>Tin tức trong ngày</h2>
          <div className="noidung">
            <div className="img">
              <img src={img1} alt="imgll" />
            </div>
            <div className="details">
              <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
              <p>
                Sau vài tháng ra mắt thị trường, các phiên bản đồng hồ thông minh Apple Watch đã có mặt tại thị trường
                Việt Nam qua kênh chính hãng, giá từ 11,5 triệu đồng
              </p>
            </div>
          </div>

          <div className="noidung">
            <div className="img">
              <img src={img2} alt="imgll" />
            </div>
            <div className="details">
              <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
              <p>
                Sau vài tháng ra mắt thị trường, các phiên bản đồng hồ thông minh Apple Watch đã có mặt tại thị trường
                Việt Nam qua kênh chính hãng, giá từ 11,5 triệu đồng
              </p>
            </div>
          </div>
          <div className="noidung">
            <div className="img">
              <img src={img3} alt="imgll" />
            </div>
            <div className="details">
              <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
              <p>
                Sau vài tháng ra mắt thị trường, các phiên bản đồng hồ thông minh Apple Watch đã có mặt tại thị trường
                Việt Nam qua kênh chính hãng, giá từ 11,5 triệu đồng
              </p>
            </div>
          </div>
          <div className="noidung">
            <div className="img">
              <img src={img4} alt="imgll" />
            </div>
            <div className="details">
              <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
              <p>
                Sau vài tháng ra mắt thị trường, các phiên bản đồng hồ thông minh Apple Watch đã có mặt tại thị trường
                Việt Nam qua kênh chính hãng, giá từ 11,5 triệu đồng
              </p>
            </div>
          </div>
          <div className="noidung">
            <div className="img">
              <img src={img1} alt="imgll" />
            </div>
            <div className="details">
              <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
              <p>
                Sau vài tháng ra mắt thị trường, các phiên bản đồng hồ thông minh Apple Watch đã có mặt tại thị trường
                Việt Nam qua kênh chính hãng, giá từ 11,5 triệu đồng
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <p>Có gì đáng xem...</p>
          <div className="noidung">
            <div className="img-con">
              <img src={r1} alt="imgll" />
            </div>
            <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
          </div>

          <div className="noidung">
            <div className="img-con">
              <img src={r2} alt="imgll" />
            </div>
            <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
          </div>
          <div className="noidung">
            <div className="img-con">
              <img src={r3} alt="imgll" />
            </div>
            <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
          </div>
          <div className="noidung">
            <div className="img-con">
              <img src={r4} alt="imgll" />
            </div>
            <span>Đồng hồ Apple Watch chính hãng bán ra tại VN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
