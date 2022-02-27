import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "./components/lib";
import { ReactComponent as Logo } from "assets/logo.svg";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

function usefuck() {
  return {
    logout: () => {},
    user: { name: "fuck" },
  };
}
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo height={"4rem"} width={"4rem"} />
          <Row>Big Project</Row>
          <Row>UserInfo</Row>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi {user?.username}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Main = styled.main`
  height: calc(100vh - 6rem);
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div`
  display: flex;
  overflow: hidden;
`;
