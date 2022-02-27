import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface Project {
  id: string;
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
          sorter: (a, b) => a.name.localeCompare(b.name),
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
