import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormItem from "../common/FormItem";
import user, { signUpSchema as schema } from "../../services/userService";

function SignUpForm() {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeId = (e, setState) => {
    const { currentTarget: input } = e;
    const errorMessage = validateInput(input);
    setState({ value: input.value, error: errorMessage });

    if (!errorMessage) {
      doCheck(input, setState);
    }
  };

  const handleChangePassword = (e) => {
    const { currentTarget: input } = e;
    const errorMessage = validateInput(input);
    setPassword({ value: input.value.replace(/\s/g, ""), error: errorMessage });
  };

  const handleSubmit = (e) => {
    // prevent default submitting action (go to subfix "?" url)
    e.preventDefault();

    // const { errors, isSubmitable } = validate();
    // if (!isSubmitable) {
    //   setUsername({ value: username.value, error: errors[0] });
    //   setEmail({ value: email.value, error: errors[1] });
    //   setPassword({ value: password.value, error: errors[2] });
    //   return;
    // }

    signUpAsync();
  };

  const signUpAsync = async () => {
    try {
      await user.signUp(username.value, email.value, password.value);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        if (errorMessage.toLowerCase().includes("username")) {
          setUsername({ value: username.value, error: errorMessage });
        } else {
          setEmail({ value: email.value, error: errorMessage });
        }
      }
    }
  };

  const doCheck = async (input, setState) => {
    try {
      await user.check[input.id](input.value);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data: errorMessage } = error.response;
        setState({ value: input.value, error: errorMessage });
      }
    }
  };

  const validate = () => {
    const errors = Object.keys(schema).map((key) => {
      const error = schema[key].validate(eval(key).value).error;
      return error ? error.details[0].message : "";
    });

    const isSubmitable = errors.every((v) => !v);

    return { errors, isSubmitable };
  };

  const validateInput = ({ id: key, value }) => {
    const { error } = schema[key].validate(value);
    return error ? error.details[0].message : "";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        data={username.value}
        error={username.error}
        id="username"
        label="Username"
        placeholder="Enter your Username"
        onChange={(e) => handleChangeId(e, setUsername)}
      />
      <FormItem
        data={email.value}
        error={email.error}
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        onChange={(e) => handleChangeId(e, setEmail)}
      />
      <FormItem
        data={password.value}
        error={password.error}
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        onChange={handleChangePassword}
      />
      <Form.Group className="mb-3" controlId="checkbox">
        <Form.Check
          type="checkbox"
          label="I have read and agree to the Terms"
          onChange={(e) => setIsChecked(e.currentTarget.checked)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!(validate().isSubmitable && isChecked)}
      >
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUpForm;
