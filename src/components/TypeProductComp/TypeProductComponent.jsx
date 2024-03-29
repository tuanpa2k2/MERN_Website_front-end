import React, { useEffect } from "react";
import "./TypeProductComponent.scss";
import { useNavigate } from "react-router-dom";

const TypeProductComponent = ({ name }) => {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // normalize('NFD').replace(/[\u0300-\u036f]/g, '') : có nhiệm vụ bỏ dấu tiếng việt ở url
        ?.replace(/ /g, "_")}`, // .replace(/ /g, '_')} : có nhiệm vụ là thay dấu cách ở url thành dấu gạch dưới '_'
      { state: type }
    );
  };

  useEffect(() => {
    const nameClickButton = document.querySelectorAll(".wrapper-typeProduct");

    nameClickButton.forEach((element) => {
      element.addEventListener("click", () => {
        document.querySelector(".active-Name")?.classList.remove("active-Name");
        element.classList.add("active-Name");
      });
    });
  }, [name]);
  // lấy childen 'name' trong 'HomePage'
  return (
    <div className="wrapper-typeProduct" onClick={() => handleNavigateType(name)}>
      {name}
    </div>
  );
};

export default TypeProductComponent;
