import React, { useState } from "react";
import { Menu } from "antd";

import { AiOutlineUsergroupAdd, AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";
import { getItem } from "../../until";
import HeaderComponent from "../../components/HeaderComp/HeaderComponent";
import AdminUserComponent from "../../components/AdminUserComp/AdminUserComponent";
import AdminProductComponent from "../../components/AdminProductComp/AdminProductComponent";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import "./AdminPage.scss";
import AdminOrderComponent from "../../components/AdminOrderComp/AdminOrderComponent";

const AdminPage = () => {
  const items = [
    getItem("Quản lý người dùng", "user", <AiOutlineUsergroupAdd />),
    getItem("Quản lý sản phẩm", "product", <AiOutlineUnorderedList />),
    getItem("Quản lý đơn hàng", "order", <AiOutlineShoppingCart />),
  ];
  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUserComponent />;

      case "product":
        return <AdminProductComponent />;

      case "order":
        return <AdminOrderComponent />;

      default:
        return <NotFoundPage />;
    }
  };
  const handleOnclick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHidenSearch isHidenCart isNews isMore />
      <div className="wrapper-adminPage">
        <Menu className="menu-adminPage" mode="inline" items={items} onClick={handleOnclick} />
        {keySelected === "" ? (
          <div className="right-notKey"></div>
        ) : (
          <div className="right-content">{renderPage(keySelected)}</div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
