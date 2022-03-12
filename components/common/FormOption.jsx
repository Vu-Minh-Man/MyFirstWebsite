import Form from "react-bootstrap/form";

function FormOption(props) {
  const { label, options, optionProps, valid, selected, onChange } = props;

  const getSelectedAttribute = (option) => {
    return option[optionProps.id] === selected ? { selected } : null;
  };

  return (
    valid && (
      <Form.Select onChange={onChange}>
        <optgroup label={label}>
          {options.map((option) => (
            <option
              key={option[optionProps.id]}
              value={option[optionProps.id]}
              {...getSelectedAttribute(option)}
            >
              {option[optionProps.label]}
            </option>
          ))}
        </optgroup>
      </Form.Select>
    )
  );
}

FormOption.defaultProps = {
  optionProps: { id: "_id", label: "label" },
  valid: true,
};

export default FormOption;
