import { Spin } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoadingComponent = ({ children, isLoading, delay = 200 }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div>
      <Spin spinning={isLoading} delay={delay}>
        {children}
      </Spin>
    </div>
  );
};

export default LoadingComponent;
