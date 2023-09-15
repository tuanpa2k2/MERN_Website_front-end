import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";

import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import * as PaymentService from "../../services/PaymentService";
import * as message from "../../components/MessageComp/MessageComponent";
import { convertPrice } from "../../until";
import "./PaymentPage.scss";
import { removeOrderProductAll } from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payment, setPayment] = useState("later_money");
  const [delivery, setDelivery] = useState("fast");
  const [sdkReady, setSdkReady] = useState(false);

  // -----------------------------------------------------------------------------------------------------------------------------
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder(token, rests);

    return res;
  });

  const addPaymentScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaymentScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  // -----------------------------------------------------------------------------------------------------------------------------
  const { data: dataAddOrdered, isSuccess: isSuccessAddOrdered, isLoading: isLoadingAddOrderd } = mutationAddOrder;

  useEffect(() => {
    if (isSuccessAddOrdered && dataAddOrdered?.status === "OK") {
      // Khi đặt hàng thành công thì sẽ xóa giỏ hàng
      const arrOrdered = [];
      order?.orderItemsSelected?.forEach((element) => {
        arrOrdered.push(element.product);
      });
      dispatch(removeOrderProductAll({ listChecked: arrOrdered }));

      message.success("Đặt hàng thành công...");
      // Truyền các state khi đặt hàng thành công vào location
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalDilivery: diliveryPriceMemo,
          totalPriceMemo: totalPriceMemo,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAddOrdered]);

  // Xử lý phần order thanh toán -----------------------------------------------------------------------------------------
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [order]);

  const discountPriceMemo = useMemo(() => {
    // forEach các cái giá giảm của từng sản phầm vào 1 mảng
    const arrOrdered = [];
    order?.orderItemsSelected?.forEach((element) => {
      const dis = ((element.price * element.discount) / 100) * element.amount; //Tính tổng tiền giảm giá của từng sản phẩm
      arrOrdered.push(dis); // push vào mảng
    });

    // Tính tổng tiền giảm giá của đơn hàng
    let sum = 0;
    for (let i = 0; i < arrOrdered.length; i++) {
      sum += arrOrdered[i];
    }

    if (Number(sum)) {
      return sum;
    }
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0 && priceMemo >= 1000000) {
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

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountPriceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, discountPriceMemo, diliveryPriceMemo]);

  // Xử lý phần handle -----------------------------------------------------------------------------------------
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  // Xử lý phần mutate -----------------------------------------------------------------------------------------
  const handleAddOrderPayment = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.phone &&
      user?.address &&
      user?.city &&
      user?.id &&
      priceMemo
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        email: user?.email,
      });
    }
  };

  const onSuccessPaypal = (details) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
  };

  return (
    <LoadingComponent isLoading={isLoadingAddOrderd}>
      <div className="wrapper-containerPaymentPage">
        <div className="header-title">
          <RiSecurePaymentLine />
          <span>
            Xác nhận thanh toán<p>- vui lòng kiểm tra kĩ thông tin trước khi mua nhé... 🥰🥰🥰</p>
          </span>
        </div>
        <div className="detail-behind">
          <div className="left">
            <div className="container-rafce">
              <div className="text-label">Chọn phương thức giao hàng</div>
              <div className="select-radio">
                <Radio.Group onChange={handleDilivery} value={delivery}>
                  <Radio value="fast">
                    <span className="abcd">FAST</span> Giao hàng tiết kiệm
                  </Radio>
                </Radio.Group>
              </div>
              <div className="select-radio">
                <Radio.Group onChange={handleDilivery} value={delivery}>
                  <Radio value="goject">
                    <span className="abcd">GO_JECT</span> Giao hàng nhanh
                  </Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="container-rafce">
              <div className="text-label">Chọn phương thức thanh toán</div>
              <div className="select-radio">
                <Radio.Group onChange={handlePayment} value={payment}>
                  <Radio value="later_money">Thanh toán khi nhận hàng</Radio>
                </Radio.Group>
              </div>
              <div className="select-radio">
                <Radio.Group onChange={handlePayment} value={payment}>
                  <Radio value="paypal">Thanh toán bằng Paypal</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="title-payment">Anhtuan shop</div>
            <div className="details-payment">
              <div className="info-buyer">
                <div className="label-payment">Thông tin người mua hàng</div>
                <div className="details-infobuyer">
                  <div className="name">
                    <div className="name-label">Họ và tên:</div>
                    <div className="name-info">{user?.name}</div>
                  </div>
                  <div className="phone">
                    <div className="name-label">Số điện thoại:</div>
                    <div className="name-info" style={{ fontWeight: "500" }}>
                      {user?.phone}
                    </div>
                  </div>
                  <div className="address">
                    <div className="name-label">Địa chỉ nhận:</div>
                    <div className="name-info">{`${user?.address} - ${user?.city}`}</div>
                  </div>
                </div>
                <hr />
              </div>

              <div className="info-product">
                <div className="label-payment">Các sản phẩm đã chọn</div>
                <div className="details-infoproduct">
                  {order.orderItems.map((items) => {
                    return (
                      <div className="name" key={items?.product}>
                        <div className="name-product">* {items?.name}</div>
                        <div className="price-product">
                          {items?.amount} x {convertPrice(items?.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="info-payment">
              <div className="label-payment">Chi tiết hóa đơn thanh toán</div>
              <div className="details-prices">
                <div className="row-1">
                  <div className="name-label">Tạm tính:</div>
                  <div className="price-order">{convertPrice(priceMemo)}</div>
                </div>
                <div className="row-2">
                  <div className="name-label">Giảm giá:</div>
                  <div className="price-order" style={{ color: "blue" }}>
                    -{convertPrice(discountPriceMemo)}
                  </div>
                </div>
                <div className="row-4">
                  <div className="name-label">Phí giao hàng:</div>
                  <div className="price-order">{convertPrice(diliveryPriceMemo)}</div>
                </div>
                <hr />
                <div className="row-5">
                  <div className="name-label">Tổng tiền:</div>
                  <div className="total-price">{convertPrice(totalPriceMemo)}</div>
                </div>
              </div>
              {payment === "paypal" && sdkReady ? (
                <div style={{ margin: "5px" }}>
                  <PayPalButton
                    amount={Math.round(totalPriceMemo / 30000)}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Thanh toán thất bại");
                    }}
                  />
                </div>
              ) : (
                <div style={{ margin: "5px" }}>
                  <button onClick={() => handleAddOrderPayment()}>Thanh Toán</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default PaymentPage;
