import React from "react";
import img from "../../assets/images/bgr-image/404-robot.jpg";

import "./NotFoundPage.scss";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper-notFound">
      <div className="content">
        <span>OOPS!</span>
        <h3>Không tìm thấy trang web của bạn! Vui lòng kiểm tra lại đường dẫn</h3>
        <button onClick={() => navigate("/")}>Back Home</button>
      </div>
      <div className="image">
        <img src={img} alt="not-found" />
      </div>
    </div>
  );
};

export default NotFoundPage;
