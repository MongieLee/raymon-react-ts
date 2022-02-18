import React from "react";
import {User} from "./search-panel";
import {Table} from "antd";

interface Project {
  id: string,
  name: string,
  personId: string,
  organization: string
}

interface ListProps {
  list: Project[],
  users: User[]
}

export const List = ({list, users}: ListProps) => {
  return (
    <Table pagination={false} dataSource={list} rowKey={"id"}
           columns={[
             {
               title: "名称",
               dataIndex: "name",
               sorter: (a, b) => a.name.localeCompare(b.name)
             }, {
               title: "负责人", render(value, project) {
                 return (
                   <span>{users.find((user) => user.id === project.personId)?.name}</span>
                 );
               }
             }
           ]}/>
  );
};