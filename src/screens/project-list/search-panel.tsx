import React from "react";
import {ParamType} from "./index";

export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string
}

interface SearchPanelProps {
  users: User[],
  param: ParamType,
  setParam: (param: SearchPanelProps["param"]) => void
}

export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {
  return (
    <form>
      <div>
        <input type="text" value={param.name} onChange={evt => setParam({...param, name: evt.target.value})}/>
        <select onChange={evt => setParam({...param, personId: evt.target.value})}>
          <option value={""}>请选择</option>
          {
            users.map((user: any) => <option value={user.id} key={user.id}>{user.name}</option>)
          }
        </select>
      </div>
    </form>
  );
};