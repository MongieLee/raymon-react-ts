import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "hooks/useDebonuce";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import styled from "@emotion/styled";
import { useProjectList } from "hooks/useProjectList";
import { useUserList } from "hooks/useUserList";
import { Typography } from "antd";
import { useProjectsSearchParams } from "./util";
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjectList(useDebounce(param, 200));
  const { data: users } = useUserList();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
