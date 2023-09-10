import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { searchProduct } from "../../redux/slides/productSlide";

import "./HeaderComponent.scss";

const HeaderComponent = ({ isHidenSearch = false, isHidenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false); // scrolled add className 'sticky-header'
  const [userAvatar, setUserAvatar] = useState("");
  // eslint-disable-next-line
  const [search, setSearch] = useState(""); // search product

  const user = useSelector((state) => state.user); // lấy user trong redux-store
  const order = useSelector((state) => state.order);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user?.avatar]);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogoutUser = () => {
    UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
  };

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-page");
    } else if (type === "admin") {
      navigate("/system-admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    }
  };

  return (
    <div>
      <header className={`wrapper-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="inner">
          <div className="left" onClick={() => navigate("/")}>
            <div className="logo">anhtuan shop</div>
          </div>
          {!isHidenSearch && (
            <div className="center">
              <input placeholder="Tìm kiếm sản phẩm..." spellCheck={false} onChange={handleOnSearch} />
              <button className="btn-search">
                <AiOutlineSearch />
              </button>
            </div>
          )}
          <div className="right">
            {user?.access_token ? (
              <Tippy
                interactive
                render={(attrs) => (
                  <div className="tippy-popper" tabIndex="-1" {...attrs}>
                    {user?.isAdmin === true && (
                      <span onClick={() => handleClickNavigate("admin")}>Quản lý hệ thống</span>
                    )}
                    <span onClick={() => handleClickNavigate("my-order")}>Đơn hàng của tôi</span>
                    <span onClick={() => handleClickNavigate("profile")}>Thông tin cá nhân</span>
                    <span onClick={handleLogoutUser}>Đăng Xuất</span>
                  </div>
                )}
              >
                <p className="name-account">
                  {userAvatar ? <img src={userAvatar} alt="userAvatar" /> : <VscAccount />}
                  {user?.name.length ? user?.name : user?.email}
                </p>
              </Tippy>
            ) : (
              <Tippy
                interactive
                render={(attrs) => (
                  <div className="tippy-popper" tabIndex="-1" {...attrs}>
                    <p>Đăng nhập</p>
                  </div>
                )}
              >
                <div className="popper-intro" onClick={() => navigate("/sign-in")}>
                  <VscAccount />
                  tài khoản
                </div>
              </Tippy>
            )}

            {!isHidenCart && (
              <Tippy
                interactive
                render={(attrs) => (
                  <div className="tippy-popper" tabIndex="-1" {...attrs}>
                    <p>Giỏ hàng</p>
                  </div>
                )}
              >
                <div className="cart-icon" onClick={() => navigate("/order")}>
                  <AiOutlineShoppingCart />
                  <span>{order?.orderItems?.length}</span>
                </div>
              </Tippy>
            )}

            <span className="btn-more">
              <CiMenuKebab />
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
