import React, { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { RiSecurePaymentLine } from "react-icons/ri";

import "./MyOrderPage.scss";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import { convertPrice } from "../../until";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComp/MessageComponent";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);

  const fetchMyOrderDetails = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchMyOrderDetails },
    {
      enabled: state?.id && state?.token,
    }
  );
  const { data: dataOrder } = queryOrder;

  const renderProduct = (data) => {
    if (data?.length > 1) {
      return data?.map((items) => {
        return (
          <div className="prod-sonhieu" key={items?.product}>
            <div className="image-prod">
              <img src={items?.image} alt="imge" />
            </div>
            <div className="details-product">
              <div className="name-product">{items?.name}</div>
              <div className="quantity">Số lượng: x{items?.amount}</div>
              <div className="price">Giá bán: {convertPrice(items?.price)}</div>
            </div>
          </div>
        );
      });
    } else {
      return data?.map((items) => {
        return (
          <div className="prod-soit" key={items?.product}>
            <div className="image-prod">
              <img src={items?.image} alt="imge" />
            </div>
            <div className="details-product">
              <div className="name-product">{items?.name}</div>
              <div className="quantity">Số lượng: x{items?.amount}</div>
              <div className="price">Giá bán: {convertPrice(items?.price)}</div>
            </div>
          </div>
        );
      });
    }
  };

  const handleDetailsOrder = (id) => {
    navigate(`/detail-order/${id}`, {
      state: {
        token: state.token, // truyền đi token khi đá sang page 'detail-order'
      },
    });
  };

  const mutationCancel = useMutationHooks((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCancelOrder = (order) => {
    mutationCancel.mutate(
      { id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user?.id },
      {
        onSettled: () => {
          queryOrder.refetch(); // Tự động load data khi Delete 1 sản phẩm
        },
      }
    );
  };

  // const handleDeleteOrder = () => {
  //   alert("Chức năng này chưa hoàn thành, quay lại sau nhé 😎");
  // };

  const { data: dataCancelOrder, isSuccess: isSuccessCancelOrder, isLoading: isLoadingCancelOrder } = mutationCancel;

  useEffect(() => {
    if (isSuccessCancelOrder && dataCancelOrder?.status === "OK") {
      message.success("Hủy đơn hàng thành công");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCancelOrder]);

  return (
    <div className="wrapper-myOrderPage">
      <div className="header-title">
        <RiSecurePaymentLine />
        <span>Đơn hàng của tôi 🥰🥰🥰</span>
      </div>

      <LoadingComponent isLoading={isLoadingCancelOrder}>
        <div className="details-myorder">
          {dataOrder?.length > 0 ? (
            dataOrder?.map((order) => {
              return (
                <div className="label-product" key={order?._id}>
                  <div className="product-render">{renderProduct(order?.orderItems)}</div>
                  <div className="actions">
                    <div className="text-status">
                      {order?.isPaid === false ? (
                        <div className="trangthai-false">Trạng thái đơn hàng</div>
                      ) : (
                        <div className="trangthai-true">Trạng thái đơn hàng</div>
                      )}
                      <div className="chitiet">
                        <div className="giaohang">
                          Giao hàng: {order?.isDelivered ? <soan>Đã giao hàng</soan> : <p>Chưa giao hàng</p>}
                        </div>
                        <div className="thanhtoan">
                          Thanh toán: {order?.isPaid ? <span>Đã thanh toán</span> : <p>Chưa thanh toán</p>}
                        </div>
                      </div>
                    </div>
                    <div className="btn-actions">
                      <button className="xemchitiet" onClick={() => handleDetailsOrder(order?._id)}>
                        Xem chi tiết
                      </button>
                      {order?.isPaid === false ? (
                        <button className="huydon" onClick={() => handleCancelOrder(order)}>
                          Hủy đơn hàng
                        </button>
                      ) : (
                        <button className="huydon" onClick={() => handleCancelOrder(order)}>
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-myOrder" style={{ color: "blue", textAlign: "center", fontSize: "2rem" }}>
              Chưa có đơn hàng nào.
            </div>
          )}
        </div>
      </LoadingComponent>
    </div>
  );
};

export default MyOrderPage;
