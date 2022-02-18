import {useAuth} from "context/auth-context";
import {Button, Form, Input} from "antd";

export const RegisterScreen = () => {
  const {register} = useAuth();
  const handlerSubmit = (values: { username: string, password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handlerSubmit}>
      <Form.Item name={"username"} rules={[{required: true, message: "请输入账号"}]}>
        <Input placeholder={"账号"}/>
      </Form.Item>
      <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
        <Input placeholder={"密码"}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>注册</Button>
      </Form.Item>
    </Form>
  );
};