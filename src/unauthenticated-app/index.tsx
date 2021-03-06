import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("请登录或注册");

  const togglePage = () => {
    setIsRegister(!isRegister);
    setError(null);
  };

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} setIsRegister={setIsRegister} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={togglePage}>
          {isRegister ? "已经有账号了？立即去登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

UnauthenticatedApp.displayName = "UnauthenticatedApp";

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(97, 104, 115);
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
  // 40rem是中间表单区域的宽度
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
  margin-bottom: 1rem;
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
