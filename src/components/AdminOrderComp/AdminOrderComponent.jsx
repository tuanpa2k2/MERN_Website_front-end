import React from "react";
import "./AdminOrderComponent.scss";

import TableComponent from "../TableComp/TableComponent";
import { AiOutlineSetting } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../until";
import { orderContant } from "../../contant";
import ChartOrderPaymentComponent from "./ChartOrderPaymentComponent";
import ChartOrderStatusComponent from "./ChartOrderStatusComponent";

const AdminOrderComponent = () => {
  const user = useSelector((state) => state.user);

  // Handle API ---------------------------------------------------------------------------
  const getOrderAll = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery(["users"], getOrderAll, {
    retry: 3,
    retryDelay: 1000,
  });
  const { data: orders, isLoading: isLoadingOrder } = queryOrder;

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
    },

    {
      title: "Trạng thái",
      dataIndex: "isPaid",
    },
    {
      title: "Giao hàng",
      dataIndex: "isDelivered",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
    },
  ];
  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: `0${order?.shippingAddress?.phone}`,
        address: `${order?.shippingAddress?.address} - ${order?.shippingAddress?.city}`,
        totalPrice: convertPrice(order?.totalPrice),
        isPaid:
          order.isPaid === true ? (
            <p style={{ color: "blue", fontStyle: "oblique" }}>Đã thanh toán</p>
          ) : (
            <p style={{ color: "red", fontStyle: "oblique" }}>Chưa thanh toán</p>
          ),
        isDelivered:
          order.isDelivered === true ? (
            <p style={{ color: "blue", fontStyle: "oblique" }}>Đã giao hàng</p>
          ) : (
            <p style={{ color: "red", fontStyle: "oblique" }}>Chưa giao hàng</p>
          ),
        paymentMethod: orderContant.payment[order.paymentMethod],
      };
    });

  return (
    <div className="wapper-adminOrderComp">
      <div className="right-content-header">
        <h3>
          <AiOutlineSetting />
          Quản lý thông tin đơn hàng
        </h3>
      </div>
      <div className="constainer-chart">
        <ChartOrderPaymentComponent data={orders?.data} />
        <ChartOrderStatusComponent data={orders?.data} />
      </div>
      <div className="right-content-table">
        <TableComponent columns={columns} data={dataTable} isLoading={isLoadingOrder} />
      </div>
    </div>
  );
};

export default AdminOrderComponent;
