import React from "react";

// @ts-ignore
export const SearchPanel = ({param, setParam, users}) => {
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