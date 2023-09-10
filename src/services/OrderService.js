import axios from "axios";
import { axiosJWT } from "./ProductService";

export const createOrder = async (access_token, data) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getOrderDetailId = async (id, access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const data = { orderItems, orderId: id };

  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`,
    { data },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
