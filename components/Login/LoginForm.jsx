import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import FormItem from "../common/FormItem";
import user from "../../services/userService";

function LoginForm() {
  const [userId, setUserId] = useState({
    value: "",
    type: "username",
    error: "",
  });
  const [password, setPassword] = useState("");

  const handleChangeId = (e) => {
    const {
      currentTarget: { value },
    } = e;
    if (value.includes("@")) setUserId({ value, type: "email", error: "" });
    else setUserId({ value, type: "username", error: "" });
  };

  const handleChangePassword = (e) => {
    const {
      currentTarget: { value },
    } = e;
    value = value.replace(/\s/g, "");
    setPassword(value);
    if (userId.error)
      setUserId({ value: userId.value, type: userId.type, error: "" });
  };

  const handleSubmit = (e) => {
    // prevent default submitting action (go to subfix "?" url)
    e.preventDefault();

    loginAsync();
  };

  const loginAsync = async () => {
    try {
      await user.login(userId, password);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data: errorMessage } = error.response;
        setUserId({
          value: userId.value,
          type: userId.type,
          error: errorMessage,
        });
      }
    }
  };

  const isSubmitable = () => {
    return (
      userId.value.length >= 5 &&
      userId.value.length <= 50 &&
      password.length >= 5 &&
      password.length <= 12
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        data={userId.value}
        error={userId.error}
        id="userId"
        type={userId.type === "email" ? "email" : "text"}
        label="Username/Email"
        placeholder="Username/email"
        onChange={handleChangeId}
      />
      <FormItem
        data={password}
        type="password"
        label="Password"
        placeholder="Password"
        onChange={handleChangePassword}
      />
      <Button variant="primary" type="submit" disabled={!isSubmitable()}>
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
