import { Modal } from "antd";
import React from "react";
import "./ModalComponent.scss";

const ModalComponent = ({ title = "Modal", isOpen = false, width = 200, children, ...rests }) => {
  return (
    <Modal title={title} open={isOpen} width={width} {...rests}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
