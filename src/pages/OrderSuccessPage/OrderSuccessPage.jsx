import React from "react";
import { BsCardChecklist } from "react-icons/bs";

import "./OrderSuccessPage.scss";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../until";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="wrapper-conatinerOrderSuccessPage">
      <div className="header-text">
        <BsCardChecklist /> Đơn đặt hàng thành công
      </div>
      <div className="content-OrderSuccess">
        <div className="shipping">
          <div className="text-title">
            <div className="title-k">Phương thức giao hàng</div>
            <div className="title-k">Phương thức thanh toán</div>
          </div>
          <div className="details">
            <div className="detail-1">
              <p>{orderContant.delivery[state?.delivery]}</p> Giao hàng tiết kiệm
            </div>
            <div className="detail-1">{orderContant.payment[state?.payment]}</div>
          </div>
        </div>
        <div className="space-hr"></div>
        <div className="card-product">
          <div className="text-title-product">
            <div className="abcd">Các sản phẩm vừa mới đặt hàng</div>
            <div className="all-details">
              Tổng tiền tất cả sản phẩm <p>( phí giao hàng: {convertPrice(state.totalDilivery)} )</p>:
              <span>{convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </div>
          <div className="header-table">
            <div className="image-product">Hình ảnh</div>
            <div className="name-product">Tên sản phẩm</div>
            <div className="quantity-product">Số lượng</div>
            <div className="price-product">Đơn giá</div>
            <div className="discountPrice-product">Giảm giá</div>
            <div className="total-product">Tổng</div>
          </div>
          {state?.orders?.map((order) => {
            return (
              <div className="content-table" key={order?.product}>
                <div className="image">
                  <img src={order?.image} alt="alt" />
                </div>
                <div className="name-prod">
                  <div className="name">{order?.name}</div>
                  <div className="discount-prod">- Giảm giá: {order?.discount}% (cho mỗi sản phẩm)</div>
                </div>
                <div className="quantity">{order?.amount}</div>
                <div className="price">{convertPrice(order?.price)}</div>
                <div className="discount">{convertPrice(((order.price * order.discount) / 100) * order.amount)}</div>
                <div className="total">
                  {convertPrice(order.price * order.amount - ((order.discount * order.price) / 100) * order.amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
