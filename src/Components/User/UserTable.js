import { Button, Table } from "antd";
import React, { useState } from "react";
import { headColumns } from "./Utils.UserManagement";

export default function UserTable({ usersList }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true); // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}>
        <Button
          type='primary'
          onClick={start}
          disabled={!hasSelected}
          loading={loading}>
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowKey={(record) => record.taiKhoan}
        rowSelection={rowSelection}
        columns={headColumns}
        dataSource={usersList}
      />
    </div>
  );
}
