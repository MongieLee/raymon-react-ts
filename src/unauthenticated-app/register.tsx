import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "hooks/useAsync";

export const RegisterScreen = ({
  onError,
  setIsRegister,
}: {
  onError: (error: Error) => void;
  setIsRegister: (isRegister: boolean) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync();
  const handlerSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("两次密码不一致"));
      return;
    }
    run(register(values))
      .then(() => setIsRegister(false))
      .catch(onError);
  };

  return (
    <Form onFinish={handlerSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input placeholder={"账号"} id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type={"password"} placeholder={"密码"} id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type={"password"} placeholder={"确认密码"} id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
