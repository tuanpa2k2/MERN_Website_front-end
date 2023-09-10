import React from "react";

import "./ProductDetailPage.scss";
import ProductDetailComponent from "../../components/ProductDetailComp/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="wrapper-proDetailPage">
      <div className="breadcrumb">
        <ul>
          <li onClick={() => navigate("/")} style={{ fontWeight: "bold" }}>
            <p>Home</p>
          </li>
          <li>
            <p>Chi tiết sản phẩm</p>
          </li>
        </ul>
      </div>
      <div className="wrapper-productDetailComp">
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
