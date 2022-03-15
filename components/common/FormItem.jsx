import { Form, Alert } from "react-bootstrap";

import styles from "./styles/FormItem.module.css";

function FormItem(props) {
  const { data, error, id, type, as, label, placeholder, text, onChange } =
    props;

  // const getValueAttribute = () => {
  //   return (typeof data === 'string') ? {value: data} : null;
  // };

  const getOnChangeAttribute = () => {
    return onChange ? { onChange } : null;
  };

  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        as={as}
        placeholder={placeholder}
        value={data}
        {...getOnChangeAttribute()}
      />
      {text && <Form.Text className="text-muted">{text}</Form.Text>}
      {error && (
        <Alert className={styles.alert} variant="danger">
          {error}
        </Alert>
      )}
    </Form.Group>
  );
}

FormItem.defaultProps = {
  type: "text",
  as: "input",
  //label: "",
  //placeholder: "",
  //error: "",
};

export default FormItem;
