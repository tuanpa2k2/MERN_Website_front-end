import React, { useState } from "react";
import { Table } from "antd";
import { BsTrash } from "react-icons/bs";
import { AiOutlineExport } from "react-icons/ai";
import LoadingComponent from "../LoadingComp/LoadingComponent";

import "./TableComponent.scss";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  const handleDeleteManyAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  const handleExportExcelFile = () => {
    alert("Chức năng này chưa hoàn thiện, Vui lòng quay lại sau nhé!");
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="actions-table">
        {rowSelectedKeys.length > 0 && (
          <div className="btn-deleteAll" onClick={handleDeleteManyAll}>
            <BsTrash />
            Xóa tất cả
          </div>
        )}
        {rowSelectedKeys.length > 0 && (
          <div className="btn-exportExcel" onClick={handleExportExcelFile}>
            <AiOutlineExport />
            Export to excel
          </div>
        )}
      </div>
      <Table
        className="wrapper-table"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </LoadingComponent>
  );
};

export default TableComponent;
