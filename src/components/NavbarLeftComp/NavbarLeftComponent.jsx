import React from "react";
import "./NavbarLeftComponent.scss";

const NavbarLeftComponent = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((opp, index) => {
          return (
            <span key={index} className="text-value">
              {opp}
            </span>
          );
        });

      case "checkbox":
        return options.map((opp, index) => {
          return (
            <div key={index} className="form-group-checkbox">
              <input type="checkbox" name="check1" value={opp.value} />
              <label className="text-value-checkbox">{opp.label}</label>
            </div>
          );
        });

      case "price":
        return options.map((opp, index) => {
          return (
            <div key={index} className="form-group-price">
              {opp}
            </div>
          );
        });

      default:
        return {};
    }
  };

  return (
    <div className="wrapper-navbarLeftComp">
      <div className="text-categories">
        <span className="text-label">danh mục</span>
        {renderContent("text", [
          "Tivi",
          "Tủ lạnh",
          "máy giặt",
          "điều hòa",
          "laptop",
          "điện thoại",
          "áo phông",
          "giày",
          "quần jean",
          "kính thời trang",
        ])}
      </div>

      <div className="checkbox-place">
        <span className="text-label">địa điểm</span>
        {renderContent("checkbox", [
          { value: "a", label: "Ha Noi" },
          { value: "b", label: "Thai Binh" },
          { value: "c", label: "Ho Chi Minh" },
        ])}
      </div>

      <div className="text-price">
        <span className="text-label">giá (VND)</span>
        {renderContent("price", [
          "dưới 100.000",
          "từ 100.000 đến 500.000",
          "trên 500.000",
        ])}
      </div>
    </div>
  );
};

export default NavbarLeftComponent;
