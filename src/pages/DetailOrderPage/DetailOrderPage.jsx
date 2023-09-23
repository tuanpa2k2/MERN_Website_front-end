import React, { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BsCardChecklist } from "react-icons/bs";
import { LiaShippingFastSolid, LiaMapMarkedSolid } from "react-icons/lia";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FaAmazonPay } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../until";
import { orderContant } from "../../contant";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

import "./DetailOrderPage.scss";

const DetailOrderPage = () => {
  const params = useParams(); // lấy id được truyền đi ở MyOrderPage có trong useParams
  const location = useLocation();
  const { id } = params;
  const { state } = location;

  const fetchOrderDetails = async () => {
    const res = await OrderService.getOrderDetailId(id, state.token);
    return res.data;
  };

  const queryOrderDetail = useQuery(
    { queryKey: ["orders-details"], queryFn: fetchOrderDetails },
    {
      enabled: state?.id && state?.access_token,
    }
  );
  const { data, isLoading } = queryOrderDetail;

  // Xử lý phần order thanh toán -----------------------------------------------------------------------------------------
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [data]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0 || priceMemo >= 1000000) {
      return 0;
    } else if (500000 <= priceMemo) {
      return 10000;
    } else if (200000 <= priceMemo) {
      return 20000;
    } else {
      return 30000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMemo]);

  return (
    <div className="wrapper-detailOrderPage">
      <div className="header-title">
        <BsCardChecklist />
        <span>
          Chi tiết đơn hàng: <p>{id}</p>
        </span>
      </div>
      <LoadingComponent isLoading={isLoading}>
        <div className="content-details">
          <div className="info-details">
            <div className="diachi">
              <div className="title-textt">
                <LiaMapMarkedSolid />
                Thông tin người nhận
              </div>
              <div className="info-text">
                <div className="name">{data?.shippingAddress?.fullName}</div>
                <div className="address">{`${data?.shippingAddress?.address} - ${data?.shippingAddress?.city}`}</div>
                <div className="phone">
                  (+84) <p>{data?.shippingAddress?.phone}</p>
                </div>
              </div>
            </div>
            <div className="giaohang">
              {data?.isPaid === false ? (
                <div className="title-textt text-false">
                  <LiaShippingFastSolid /> Hình thức giao hàng
                </div>
              ) : (
                <div className="title-textt text-true">
                  <LiaShippingFastSolid /> Hình thức giao hàng
                </div>
              )}

              <div className="info-text">
                <div className="fast">
                  <p>FAST</p> Giao hàng tiết kiệm
                </div>
                <div className="delivery">
                  Phí giao hàng: <p>{convertPrice(diliveryPriceMemo)}</p>
                </div>
                <div className="isDelivered">
                  Trạng thái: {data?.isDelivered ? <span>Đã nhận hàng</span> : <p>Chưa nhận hàng</p>}
                </div>
              </div>
            </div>
            <div className="thanhtoan">
              {data?.isPaid === false ? (
                <div className="title-textt text-false">
                  <CiMoneyCheck1 />
                  Hình thức thanh toán
                </div>
              ) : (
                <div className="title-textt text-true">
                  <CiMoneyCheck1 />
                  Hình thức thanh toán
                </div>
              )}

              <div className="info-text">
                <div className="name">
                  <FaAmazonPay />
                  {orderContant.payment[data?.paymentMethod]}
                </div>
                <div className="status">
                  Trạng thái: {data?.isPaid ? <span>Đã thanh toán</span> : <p>Chưa thanh toán</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="product-details">
            {data?.orderItems?.length === 1
              ? data?.orderItems?.map((items) => {
                  return (
                    <div className="sanphamsoit" key={items?._id}>
                      <div className="image">
                        <img src={items?.image} alt="imagess" />
                      </div>
                      <div className="info-product">
                        <div className="name">{items?.name}</div>
                        <div className="quantity">
                          <p>- Số lượng:</p> <span style={{ fontStyle: "oblique" }}>x{items?.amount}</span>
                        </div>
                        <div className="price">
                          <p>- Giá:</p> <span style={{ color: "blue" }}>{convertPrice(items?.price)}</span>
                        </div>
                        <div className="discount">
                          <p>- Giảm giá:</p>{" "}
                          <span style={{ color: "blue" }}>{items?.discount || 0}% (cho mỗi sản phẩm)</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : data?.orderItems?.map((items) => {
                  return (
                    <div className="sanphamsonhieu" key={items?._id}>
                      <div className="image">
                        <img src={items?.image} alt="imagess" />
                      </div>
                      <div className="info-product">
                        <div className="name">{items?.name}</div>
                        <div className="quantity">
                          <p>- Số lượng:</p> <span style={{ fontStyle: "oblique" }}>x{items?.amount}</span>
                        </div>
                        <div className="price">
                          <p>- Giá:</p> <span style={{ color: "blue" }}>{convertPrice(items?.price)}</span>
                        </div>
                        <div className="discount">
                          <p>- Giảm giá:</p>{" "}
                          <span style={{ color: "blue" }}>{items?.discount || 0}% (cho mỗi sản phẩm)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

            <div className="price-container">
              <div className="text-title">Chi tiết các khoản</div>
              <div className="acbkkkk">
                {data?.orderItems?.map((item) => {
                  return (
                    <Fragment>
                      <div className="name-product" key={item._id}>
                        <div className="ten">* {item?.name}</div>
                        <div className="gia" style={{ color: "red" }}>
                          {convertPrice(item?.price * item?.amount)}
                        </div>
                      </div>
                      <div className="discount">
                        - Giảm giá: <p>-{convertPrice(((item.price * item.discount) / 100) * item.amount)}</p>
                      </div>
                      <div className="tinh-tong">
                        <div className="delivery">
                          <p>- Thuế:</p> <span>{convertPrice(0)}</span>
                        </div>
                        <div className="delivery">
                          <p>- Phí vận chuyển:</p> <span>{convertPrice(diliveryPriceMemo)}</span>
                        </div>
                        <div className="total-price">
                          <p>Tổng tiền thanh toán:</p>
                          <span>
                            {convertPrice(priceMemo + diliveryPriceMemo - (priceMemo * item?.discount) / 100)}
                          </span>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default DetailOrderPage;
