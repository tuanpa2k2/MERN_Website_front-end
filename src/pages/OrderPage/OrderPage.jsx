/* eslint-disable no-mixed-operators */
import React, { useEffect, useMemo, useState } from "react";
import { FcShipped } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCartX } from "react-icons/bs";

import "./OrderPage.scss";
import { Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  removeOrderProductAll,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import * as message from "../../components/MessageComp/MessageComponent";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { convertPrice } from "../../until";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComp/ModalComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import StepComponent from "../../components/StepComp/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listChecked, setListChecked] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const itemsDelevery = [
    {
      title: "30.000 vnd",
      description: "Dưới 200K",
    },
    {
      title: "20.000 vnd",
      description: "Từ 200K đến 499K",
    },
    {
      title: "10.000 vnd",
      description: "Từ 500K đến 999K",
    },
    {
      title: "0 vnd",
      description: "Trên 1.000K",
    },
  ];

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, rests);

    return res;
  });

  const { data: dataUpdated, isSuccess: isSuccessUpdated, isLoading: isLoadingUpdated } = mutationUpdate;

  const onchangeCheckbox = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const onchangeCheckboxAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((element) => {
        newListChecked.push(element?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (isModalOpen) {
      setStateUserDetail({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhập nguời dùng thành công");
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdated]);

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
      const dis = ((element.price * element.discount) / 100) * element.amount;
      arrOrdered.push(dis);
    });

    // Tính tổng giảm giá
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
    if ((priceMemo === 0 && order?.orderItemsSelected.length === 0) || priceMemo >= 1000000) {
      return 0;
    } else if (500000 <= priceMemo && priceMemo < 1000000) {
      return 10000;
    } else if (200000 <= priceMemo && priceMemo < 500000) {
      return 20000;
    } else if (priceMemo < 200000) {
      return 30000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountPriceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, discountPriceMemo, diliveryPriceMemo]);

  // Xử lý phần handle -----------------------------------------------------------------------------------------
  const handleOnchangeDetails = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteProduct = (idProduct) => {
    message.success("Xóa sản phẩm thành công!");
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleDeleteProductAll = () => {
    if (listChecked?.length > 0) {
      message.success("Xóa sản phẩm thành công!");
      dispatch(removeOrderProductAll({ listChecked }));
    }
  };

  const handleAddtocart = () => {
    if (!user?.name || !user?.phone || !user?.address || !user?.city) {
      setIsModalOpen(true);
    } else {
      navigate("/payment");
    }
  };

  const handleChangeAddress = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUserDetail({
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    form.resetFields();
  };

  const handleUpdateInfoUser = () => {
    const { name, phone, address, city } = stateUserDetail;

    if (name && phone && address && city) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetail,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  return (
    <div className="wrapper-containerOrderPage">
      <div className="header-title">
        <FcShipped />
        <span>
          Giỏ hàng của bạn<p>- vui lòng kiểm tra kĩ thông tin trước khi mua nhé... 🥰🥰🥰</p>
        </span>
      </div>
      <div className="detail-behind">
        <div className="left">
          <div className="steps">
            <p>Cước phí vận chuyển đơn hàng...</p>
            <StepComponent
              items={itemsDelevery}
              current={
                diliveryPriceMemo === 30000 ? 1 : diliveryPriceMemo === 20000 ? 2 : diliveryPriceMemo === 10000 ? 3 : 4
              }
            />
          </div>

          <div className="iiiiiiiii">
            <div className="selected-table">
              <div className="input-action">
                <Checkbox onChange={onchangeCheckboxAll} checked={listChecked?.length === order?.orderItems?.length} />
              </div>
              <div className="texttttt">
                Tất cả giỏ hàng có <p>{order?.orderItems?.length}</p> sản phẩm
              </div>
              {listChecked?.length > 0 && (
                <div className="btn-deleteAll" onClick={handleDeleteProductAll}>
                  <button>
                    <RiDeleteBin6Line /> <p>Xóa tất cả</p>
                  </button>
                </div>
              )}
            </div>

            <div className="header-table">
              <div className="input-action">#</div>
              <div className="image-product">Hình ảnh</div>
              <div className="name-product">Tên sản phẩm</div>
              <div className="quantity-product">Số lượng</div>
              <div className="price-product">Đơn giá</div>
              <div className="total-product">Tổng</div>
              <div className="action">Xóa</div>
            </div>

            <div className="kkkkkkk">
              {order?.orderItems?.length ? (
                order?.orderItems?.map((iten) => {
                  return (
                    <div className="content-table" key={iten?.product}>
                      <div className="input-action">
                        <Checkbox
                          onChange={onchangeCheckbox}
                          value={iten?.product}
                          checked={listChecked.includes(iten?.product)}
                        />
                      </div>
                      <div className="image">
                        <img src={iten?.image} alt="" />
                      </div>
                      <div className="name">
                        <div className="name-prod">{iten?.name}</div>
                        <div className="discount-prod">
                          Giảm giá: <p>{iten?.discount}%</p>
                        </div>
                      </div>
                      <div className="quantity">
                        <div className="abcd">
                          {iten?.amount === 1 ? (
                            <button className="btn-decrease" style={{ background: "#ececec", color: "#bfbfbf" }}>
                              -
                            </button>
                          ) : (
                            <button
                              className="btn-decrease"
                              onClick={() => handleOnchangeCount("decrease", iten?.product, iten?.amount === 1)}
                            >
                              -
                            </button>
                          )}

                          <input type="text" value={iten?.amount} min={1} max={iten?.countInStock} />
                          {iten?.amount === iten?.countInStock ? (
                            <button className="btn-increase" style={{ background: "#ececec", color: "#bfbfbf" }}>
                              +
                            </button>
                          ) : (
                            <button
                              className="btn-increase"
                              onClick={() =>
                                handleOnchangeCount("increase", iten?.product, iten?.amount === iten?.countInStock)
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="price">{convertPrice(iten?.price)}</div>
                      <div className="total">{convertPrice(iten?.price * iten?.amount)}</div>
                      <Tippy content="Xóa">
                        <div className="action">
                          <RiDeleteBin6Line onClick={() => handleDeleteProduct(iten?.product)} />
                        </div>
                      </Tippy>
                    </div>
                  );
                })
              ) : (
                <div className="card-empty">
                  <span>Giỏ hàng của bạn chưa có sản phẩm nào...</span>
                  <BsCartX />
                  <button onClick={() => navigate("/")}>Về Trang Chủ</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="right">
          <div className="title-order">Anhtuan shop</div>
          <div className="details-order">
            <div className="info-buyer">
              <div className="label-order">Thông tin người mua hàng</div>
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
                <div className="change-address" onClick={handleChangeAddress}>
                  Đổi địa chỉ
                </div>
              </div>
              <hr />
            </div>

            <div className="info-order">
              <div className="label-order">Chi tiết hóa đơn thanh toán</div>
              <div className="details-price">
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
            </div>
          </div>
          {listChecked.length > 0 ? (
            <button onClick={() => handleAddtocart()}>Đặt mua</button>
          ) : (
            <button style={{ opacity: 0.5, pointerEvents: "none" }}>Đặt mua</button>
          )}
        </div>
      </div>

      {/*-------------------------------------------------------------------------------- */}
      <ModalComponent
        title="Cập nhập thông tin giao hàng"
        forceRender
        open={isModalOpen}
        onCancel={handleCancel}
        // okButtonProps={{ style: { display: "none" } }} // Ẩn button OK trong ant design
        onOk={handleUpdateInfoUser}
      >
        <LoadingComponent isLoading={isLoadingUpdated}>
          <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} autoComplete="on" form={form}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input name="name" value={stateUserDetail.name} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input name="phone" value={stateUserDetail.phone} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Tỉnh (thành phố)"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input name="city" value={stateUserDetail.city} onChange={handleOnchangeDetails} />
            </Form.Item>

            <Form.Item
              label="Chi tiết địa chỉ"
              name="address"
              rules={[{ required: true, message: "Please input your address!" }]}
            >
              <Input name="address" value={stateUserDetail.address} onChange={handleOnchangeDetails} />
            </Form.Item>

            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Cập nhập
              </Button>
            </Form.Item> */}
          </Form>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
