import React from "react";
import { ParamType } from "./index";
import { Form, Input, Select } from "antd";

export interface User {
  id: string;
  username: string;
  avatar: string;
  createAt: string;
}

interface SearchPanelProps {
  users: User[];
  param: ParamType;
  setParam: (params: ParamType) => void;
  // setParam: any;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          style={{ width: `300px` }}
          value={param.userId}
          onChange={(value) => setParam({ ...param, userId: value })}
        >
          <Select.Option value={null}>可选择负责人</Select.Option>
          {users.map((user: any) => (
            <Select.Option value={user.id} key={user.id}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
