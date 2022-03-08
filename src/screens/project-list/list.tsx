import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface Project {
  id: number;
  name: string;
  created: number;
  userId: string;
  createdAt: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {users.find((user) => user.id === project.userId)?.username ||
                "-"}
            </span>
          ),
        },
        {
          title: "创建时间",
          render: (value, project) => (
            <span>
              {project.createdAt
                ? dayjs(project.createdAt).format("YYYY-MM-DD HH:mm")
                : "无"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};
