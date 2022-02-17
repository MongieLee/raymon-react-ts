import React from "react";

// @ts-ignore
export const List = ({list, users}) => {

  return (
    <table>
      <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
      </thead>
      <tbody>
      {
        list.map((project: any) => (
          <tr key={project.id}>
            <td>{project.project.name}</td>
            <td>{users.find((user: any) => user.id === project.personId)?.name}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};