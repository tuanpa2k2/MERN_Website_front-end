import React from "react";
import HeaderComponent from "../HeaderComp/HeaderComponent";
import NewLetterComponent from "../NewLetterComp/NewLetterComponent";
import FooterComponent from "../FooterComp/FooterComponent";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <NewLetterComponent />
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
