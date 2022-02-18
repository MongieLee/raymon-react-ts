import React from "react";
import {ParamType} from "./index";
import {Form, Input, Select} from "antd";

export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: ParamType,
  setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {
  return (
    <Form>
      <div>
        <Input value={param.name} onChange={evt => setParam({...param, name: evt.target.value})}/>
        <Select value={param.personId} onChange={value => setParam({...param, personId: value})}>
          <Select.Option value={""}>请选择</Select.Option>
          {
            users.map((user: any) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
          }
        </Select>
      </div>
    </Form>
  );
};