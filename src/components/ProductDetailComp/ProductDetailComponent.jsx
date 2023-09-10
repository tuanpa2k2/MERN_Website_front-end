import React, { useEffect, useState } from "react";

import { AiOutlineShoppingCart, AiTwotoneMedicineBox } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import * as ProductService from "../../services/ProductService";
import * as message from "../MessageComp/MessageComponent";

import { useQuery } from "@tanstack/react-query";

import "./ProductDetailComponent.scss";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../until";
import CommentComponent from "../CommentComp/CommentComponent";

const ProductDetailComponent = ({ idProduct }) => {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [numQuantity, setNumQuantity] = useState(1);

  useEffect(() => {
    handleClickButton();
  }, []);

  const handleClickButton = () => {
    const cartButtons = document.querySelectorAll(".cart-button"); // tìm đến classname

    cartButtons.forEach((button) => {
      button.addEventListener("click", cartClick);
    });

    function cartClick() {
      let button = this;
      button.classList.add("clicked");
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const fetchGetDetailProduct = async (context) => {
    const idPro = context?.queryKey && context?.queryKey[1];

    const res = await ProductService.getDetailProduct(idPro);
    return res.data;
  };

  const { data: productsDetails, isLoading } = useQuery(["products-detils", idProduct], fetchGetDetailProduct, {
    enabled: !!idProduct,
  });

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      message.warning("Vui lòng phải đăng nhập để mua hàng!");
      navigate("/sign-in", { state: location?.pathname });
    } else {
      message.success("Thêm vào giỏ hàng thành công!");
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productsDetails?.name,
            amount: numQuantity,
            image: productsDetails?.image,
            price: productsDetails?.price,
            discount: productsDetails?.discount,
            countInStock: productsDetails?.countInStock,
            product: productsDetails?._id,
          },
        })
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="wrapper-productComp">
        <div className="col-left">
          <div className="img-big">
            <img src={productsDetails?.image} alt="prod" />
          </div>
          <div className="img-small">
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
            <div className="img-children">
              <img src={productsDetails?.image} alt="prod" />
            </div>
          </div>
        </div>
        <div className="col-right">
          <div className="title-name">{productsDetails?.name}</div>

          <div className="content-details">
            <div className="name-label">Giá bán:</div>
            <div className="detail-label">
              <span className="price">{convertPrice(productsDetails?.price)}</span>
              <span className="space">---</span>
              <span className="price-discount">Giảm giá: {productsDetails?.discount}%</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Kho hàng:</div>
            <div className="detail-label-quantity">
              <span className="countInStock">{productsDetails?.countInStock}</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Đánh giá:</div>
            <div className="detailRating-label">
              <Rate disabled defaultValue={productsDetails?.rating} value={productsDetails?.rating} />
              <div className="space">---</div>
              <span className="selled">Đã bán: {productsDetails?.selled}</span>
            </div>
          </div>

          <div className="content-details">
            <div className="name-label">Thể loại:</div>
            <div className="detail-label">
              <span className="type">{productsDetails?.type}</span>
            </div>
          </div>

          <div className="content2-details">
            <div className="name-label">Mô tả:</div>
            <div className="detail-label">
              <p>{productsDetails?.description}</p>
            </div>
          </div>

          <div className="content2-details">
            <div className="name-label">Vận chuyển:</div>
            <div className="detail-label">
              <div className="content-location">
                <div className="send-location">
                  <div className="icons">
                    <CiLocationOn />
                    kho hàng ở:
                  </div>
                  <span>Thuần Thành, huyện Thái Thụy - Thái Bình.</span>
                </div>
                <div className="receive-location">
                  <div className="icons">
                    <LiaShippingFastSolid />
                    địa chỉ của bạn:
                  </div>
                  <span>{user?.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-action">
            <button className="cart-button" onClick={handleAddOrderProduct}>
              <span className="add-to-cart">Thêm vào giỏ hàng</span>
              <span className="added">Đã thêm vào giỏ hàng</span>
              <i className="fa-shopping-cart">
                <AiOutlineShoppingCart />
              </i>
              <i className="fa-box">
                <AiTwotoneMedicineBox />
              </i>
            </button>
          </div>
        </div>
      </div>
      <CommentComponent
        dataHref={
          process.env.REACT_APP_IS_LOCAL
            ? "https://developers.facebook.com/docs/plugins/comments#configurator"
            : window.location.href
        }
        width="100%"
      />
    </LoadingComponent>
  );
};

export default ProductDetailComponent;
