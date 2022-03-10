import React from "react";
import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/use-select";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "userId">>;
  setParam: (params: SearchPanelProps["param"]) => void;
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
        <UserSelect
          defaultOptionName="负责人"
          value={param.userId}
          style={{ width: `300px` }}
          onChange={(value) => setParam({ ...param, userId: value })}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
